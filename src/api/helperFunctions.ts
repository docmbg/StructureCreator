import { postOptions } from '../consts';
import { ISitesState } from '../reducers/reducer_sites';

export interface ISiteInfo {
    metadata: any; // { 'type': 'SP.WebCreationInformation' }
    Title: string;
    Url: string;
    WebTemplate: string;
    UseSamePermissionsAsParentSite: boolean;
}

export interface INavNodeInfo {
    metadata: any; // { type: "SP.NavigationNode" }
    IsExternal: boolean;
    Title: string;
    Url: string;
    nodeId?: number;
}

export interface IInfo {
    mainUrl: string;
    requestDigest: string;
    parentSite: number;
    Id: number;
}

export interface ISite extends IInfo {
    info: ISiteInfo;
}

export interface ITopNavNode extends IInfo {
    info: INavNodeInfo;
}

export function transformToUseableSites(sites: any) {
    console.log(sites);
    let readyToUseSites = {
        byId: new Array(),
        byHash: {},
    };
    sites = sites.map((e: any, i: number) => { e.Id = i + 1; return e; });
    for (var site of sites) {

        for (var siteSecond of sites) {
            site.parentSite = siteSecond.children.includes(site.url) ? siteSecond.Id : 0;
            if (site.parentSite !== 0) {
                break;
            }
        }
        readyToUseSites.byId.push(site.Id);
        readyToUseSites.byHash[site.Id] = {
            Id: site.Id,
            parentSite: site.parentSite,
            mainUrl: '',
            requestDigest: '',
            info: {
                metadata: { 'type': 'SP.WebCreationInformation' },
                Title: site.title,
                Url: site.url,
                WebTemplate: site.WebTemplate,
                UseSamePermissionsAsParentSite: true,

            }
        };
    }
    return readyToUseSites;
}

export async function getAllSubSites(url: string, arr: Array<Object>, mainUrl: string, options: any) {
    let promises: any = [];
    let fetchUrl = url !== mainUrl ? url : `${mainUrl}/_api/Web/webs?$expand=webs`;
    if (arr.length === 0) {
        let mainSite = await fetch(`${mainUrl}/_api/web?$expand=webs`, options)
            .then(res => res.json())
            .then(res => res);
        arr.push({
            url: mainUrl,
            title: mainSite.d.Title,
            children: mainSite.d.Webs.results.map((e: any) => e.Url),
            WebTemplate: mainSite.d.WebTemplate,
        });
    }
    await fetch(fetchUrl, options).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            response.d.results.map((e: any) => {
                arr.push({
                    url: e.Url,
                    title: e.Title,
                    children: e.Webs.results.map((child: any) => child.Url),
                    WebTemplate: e.WebTemplate,
                });
                promises.push(getAllSubSites(`${e[`__metadata`][`uri`]}/webs?$expand=webs`, arr, mainUrl, options));

            });
        });
    return Promise.all(promises).then(res => res);
}

export async function getAllLists(url: string, options: any, libsOnly: boolean) {
    const getListsUrl = `${url}/_api/Web/Lists/?$expand=Fields, RootFolder, WorkflowAssociations`;
    const lists = await fetch(getListsUrl, options)
        .then(res => {
            console.log(res.ok, res.status, res.statusText);
            if (!res.ok) {
                console.log(res.statusText);
            }
            return res.json();
        }
        )
        .catch(error => console.log('Error:', error))
        .then(response => {
            if (response.hasOwnProperty('d')) {
                if (libsOnly) {
                    return response.d.results.filter((e: Object) => e[`BaseTemplate`] === 101);
                } else {
                    return response.d.results;
                }
            } else {
                return false;
            }
        });
    // let promises = [];
    // for (let list of lists) {
    //     if (list !== false) {
    //         promises.push(fetch(`${list.__metadata.id}/HasUniqueRoleAssignments`, options)
    //             .then(res => res.json()).then(res => res.d.HasUniqueRoleAssignments));
    //     }
    // }
    // const roleassignments = await Promise.all(promises);
    // let counter = 0;
    // for (let list of lists) {
    //     list.uniquePermissions = roleassignments[counter];
    //     counter++;
    // }
    return lists;
}

// export function deleteFolder(url: string, postOptions: any, mainUrl: string) {
//     postOptions.headers[`X-HTTP-Method`] = 'DELETE';
//     return fetch(`${mainUrl}/_api/web/GetFolderByServerRelativeUrl('${url}')`, postOptions)
//         .then(res => res.text()).then(res => res);
// }

export function getMainUrl(param: string) {
    let urlParts = window.location.href.split(`${param}/`);
    let result = `${urlParts[0]}${param}/${urlParts[1].split('/')[0]}`;
    return result;
}

export async function updateDigest(url: string) {
    let digest = await fetch(`${url}/_api/contextinfo`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Accept': 'application/json; odata=verbose' },
    })
        .then(res => res.json())
        .then(res => res.d.GetContextWebInformation.FormDigestValue);
    return digest;
}

export async function getTopNavigationNodes(mainUrl: string, readOptions: any) {
    const nodes = await fetch(`${mainUrl}/_api/web/navigation/TopNavigationbar`, readOptions).
        then(res => res.json()).then(res => res.d.results);
    return nodes;
}

export async function addNodeTopNavigation(config: ITopNavNode) {
    const postInfo = createPostInfo(config.info, config.requestDigest, 'nav');
    const endPoint = config.info.nodeId ? `GetNodeById(${config.info.nodeId})/children` : `TopNavigationbar`;
    const node = await fetch(`${config.mainUrl}/_api/web/navigation/${endPoint}`, postInfo).
        then(res => res.json()).then(res => res.d);
    return node;
}

export async function addSite(config: ISite) {
    const postInfo = createPostInfo(config.info, config.requestDigest, 'site');
    const site = await fetch(`${config.mainUrl}/_api/web/webs/add`, postInfo).
        then(res => true);
    return site;
}

function createPostInfo(body: any, requestDigest: string, type: string) {
    const postInfo = postOptions;
    postInfo.headers[`X-RequestDigest`] = requestDigest;
    postInfo[`body`] = type === 'site' ? JSON.stringify({ parameters: body }) : JSON.stringify(body);
    postInfo[`credentials`] = 'include';
    return postInfo;
}

export function compareStructures(oldStructure: ISitesState, newStructure: ISitesState) {
    let changes = [];
    const sitesInNewStructure = {
        toCreate: new Array(),
        toUpdate: new Array(),
        toDelete: new Array()
    };
    let flagChange = 0;
    for (let newId of newStructure.byId) {
        // inspect for updates;
        flagChange = 0;
        if (oldStructure.byId.includes(newId)) {
            if (oldStructure.byHash[newId].info.Title !== newStructure.byHash[newId].info.Title) {
                changes.push(
                    {
                        type: 'action edit',
                        text: `Site '${oldStructure.byHash[newId].info.Title}' renamed to '${newStructure.byHash[newId].info.Title}'`
                    }
                );
                flagChange = 1;
            }
            if (oldStructure.byHash[newId].info.Url !== newStructure.byHash[newId].info.Url) {
                changes.push(
                    {
                        type: 'action edit',
                        text: `Site URL of '${oldStructure.byHash[newId].info.Title}' changed to '${newStructure.byHash[newId].info.Url}'`
                    }
                );
                flagChange = 1;
            }
            if (flagChange === 1) {
                sitesInNewStructure.toUpdate.push(newStructure.byHash[newId]);
            }
        } else {
            changes.push(
                {
                    type: 'action add',
                    text: `New site named: '${newStructure.byHash[newId].info.Title}'`
                }
            );
            sitesInNewStructure.toCreate.push(newStructure.byHash[newId]);
        }
    }
    // inspect for deleted items;
    for (let oldId of oldStructure.byId) {
        if (!newStructure.byId.includes(oldId)) {
            changes.push(
                {
                    type: 'action delete',
                    text: `Removed a site named: '${oldStructure.byHash[oldId].info.Title}'`
                }
            );
            sitesInNewStructure.toDelete.push(oldStructure.byHash[oldId]);
        }
    }
    if (changes.length === 0) {
        changes = [{ text: 'You made no changes to the initial structure', type: 'none' }];
    }
    return {
        changes,
        sitesInNewStructure,
    };
}

export function buildUrl(sites: ISitesState, mainUrl: string, parentSite: number, userInput: string, siteTitle: string) {
    let finalUrl = '';
    console.log(`Userinput: ${userInput}, sitetitle: ${siteTitle}, parentSite: ${parentSite}`);
    if (sites.byHash[parentSite]) {
        if (userInput === '') {
            console.log('+title');
            finalUrl = `${sites.byHash[parentSite].info.Url}/${siteTitle}`;
        } else {
            finalUrl = `${sites.byHash[parentSite].info.Url}/${userInput}`;
        }
    } else {
        if (userInput === '') {
            finalUrl = `${mainUrl}/${userInput}`;
        } else {
            finalUrl = `${mainUrl}/${siteTitle}`;
        }
    }

    return finalUrl;
}

/* API functions to be created
- get all list templates `https://dxcportal.sharepoint.com/sites/DOCMNewCo/_api/web/listtemplates`;
- get all site templates `https://dxcportal.sharepoint.com/sites/DOCMNewCo/_api/web/
getavailablewebtemplates(lcid=1033, doincludecrosslanguage=true)`
- add a library 
executor.executeAsync({
  url: "<app web url>/_api/SP.AppContextSite(@target)/web/lists
    ?@target='<host web url>'",
  method: "POST",
  body: "{ '__metadata': { 'type': 'SP.List' }, 'AllowContentTypes': true, 'BaseTemplate': 100,
    'ContentTypesEnabled': true, 'Description': 'My list description', 'Title': 'Test title' }",
  headers: { "content-type": "application/json;odata=verbose" },
  success: successHandler,
  error: errorHandler
});

- delete a library
executor.executeAsync({
  url: "<app web url>/_api/SP.AppContextSite(@target)/web
    /lists(guid'51925dd7-2108-481a-b1ef-4bfa4e69d48b')
    ?@target='<host web url>'",
  method: "POST",
  headers: { 
    "IF-MATCH”: "*",
    "X-HTTP-Method": "DELETE"
  },
  success: successHandler,
  error: errorHandler
});

- delete navigation
var deleteOptions = {
            method: 'POST', // or 'PUT'
            credentials: 'include',
            headers: {
            "X-HTTP-Method": "DELETE",
                "X-RequestDigest": document.getElementById('__REQUESTDIGEST').value
            },
        }
fetch(`https://dxcportal.sharepoint.com/sites/DOCMNewCo/_api/Web/Navigation/GetNodeById(2078)`, deleteOptions).
then(res=> res.json()).then(res=> console.log(res));
       
- delete site

 url: "http://<site url>/_api/web",
  type: "POST",
  headers: { 
    "X-RequestDigest": <form digest value>,
    "X-HTTP-Method": "DELETE"
  },
  success: successHandler,
  error: errorHandler

-update site.!!! CAN CHANGE EVEN URL

var postOptions = {
    method: 'POST', // or 'PUT'
    headers: {
        'Accept': 'application/json; odata=verbose',
        'content-type': 'application/json;odata=verbose',
		'X-RequestDigest': digest,
    "X-HTTP-Method": "MERGE"

    },
	body: JSON.stringify({ '__metadata': { 'type': 'SP.Web' }, 'ServerRelativeUrl': '/sites/DOCMNewCo/Mad/test' }),
}
undefined
fetch(`https://dxcportal.sharepoint.com/sites/DOCMNewCo/Calendars/test/_api/web`, 
postOptions).then(res=>res.json()).then(res=>console.log(res))

*/