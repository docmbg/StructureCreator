import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import editSiteContent from '../actions/edit_site_content_action';
import { ISite, buildUrl } from '../api/helperFunctions';
import { mainUrl } from '../consts';

interface IEditSite {
    site: ISite;
    editSiteContent: Function;
    sites: any;
    contentActiveSite: ISite;
}

class SiteEditForm extends React.Component<IEditSite, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            Id: this.props.contentActiveSite.Id,
            Title: this.props.contentActiveSite.info.Title,
            Url: this.props.contentActiveSite.info.Url.split('/')[this.props.contentActiveSite.info.Url.split('/').length - 1],
            WebTemplate: this.props.contentActiveSite.info.WebTemplate,
            parentSite: this.props.contentActiveSite.parentSite
        };
    }

    onInputChange(prop: string, value: any) {
        let that = this;
        this.setState({
            [prop]: value,
        });
        setTimeout(
            function () {
                console.log(buildUrl(that.props.sites, mainUrl, that.state.parentSite, that.state.Url, that.state.Title));
                let site: ISite = {
                    Id: that.state.Id,
                    parentSite: parseInt(that.state.parentSite, 10),
                    mainUrl,
                    requestDigest: '',
                    info: {
                        metadata: { 'type': 'SP.WebCreationInformation' },
                        Title: that.state.Title,
                        Url: buildUrl(that.props.sites, mainUrl, that.state.parentSite, that.state.Url, that.state.Title),
                        WebTemplate: that.state.WebTemplate,
                        UseSamePermissionsAsParentSite: true,
                    }
                };
                if (site.hasOwnProperty(prop)) {
                    site[prop] = value;
                } else {
                    site.info[prop] = value;
                }
                that.props.editSiteContent(site);
            },
            1);

    }

    render() {
        const state = this.state;
        return (
            <div>
                <label>Site Name</label>
                <input
                    value={state.Title}
                    onChange={(e) => this.onInputChange('Title', e.target.value)}
                />
                <br />
                <label>{buildUrl(this.props.sites, mainUrl, this.state.parentSite, this.state.Url, this.state.Title)}</label>

                <input
                    value={state.Url}
                    onChange={(e) => this.onInputChange('Url', e.target.value)}
                />
                <label>Site Template</label>
                <select />
                <label>Parent Site</label>
                <select
                    value={state.parentSite}
                    onChange={(e) => this.onInputChange('parentSite', parseInt(e.target.value, 10))}
                >
                    <option value={1} >
                        Home Level ({this.props.sites.byHash[1] ? this.props.sites.byHash[1].info.Title : ''})
                    </option>
                    {
                        this.props.sites.byId.map((id: number, i: number) => {
                            if (i > 0) {
                                return (
                                    <option
                                        key={i}
                                        value={id}
                                    >
                                        {this.props.sites.byHash[id].info.Title}
                                    </option>
                                );
                            } else {
                                return true;
                            }
                        })
                    }
                </select>
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    let sites = {
        byId: state.sites.present.byId,
        byHash: state.sites.present.byHash
    };
    let contentActiveSite = state.contentActiveSite;
    sites.byId = sites.byId.filter((e: number) => e !== contentActiveSite.Id);
    return {
        sites,
        contentActiveSite
    };
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ editSiteContent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteEditForm);