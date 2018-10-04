import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import editSiteContent from '../actions/edit_site_content_action';
import { ISite } from '../api/helperFunctions';

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
            Url: this.props.contentActiveSite.info.Url,
            WebTemplate: this.props.contentActiveSite.info.WebTemlate,
            parentSite: this.props.contentActiveSite.parentSite
        };
    }

    onInputChange(prop: string, value: any) {
        this.setState({
            [prop]: value
        });
        let site: ISite = {
            Id: this.state.Id,
            parentSite: parseInt(this.state.parentSite, 10),
            mainUrl: '',
            requestDigest: '',
            info: {
                metadata: { 'type': 'SP.WebCreationInformation' },
                Title: this.state.Title,
                Url: this.state.Url,
                WebTemlate: this.state.WebTemplate,
                UseSamePermissionsAsParentSite: true,
            }
        };
        if (site.hasOwnProperty(prop)) {
            site[prop] = value;
        } else {
            site.info[prop] = value;
        }
        this.props.editSiteContent(site);
    }

    render() {
        const state = this.state;
        return (
            <div>
                Site Name
                <input
                    value={state.Title}
                    onChange={(e) => this.onInputChange('Title', e.target.value)}
                />
                Site URL
                <br />
                {`https://mainUrl/`}
                <input
                    value={state.Url}
                    onChange={(e) => this.onInputChange('Url', e.target.value)}
                />
                Site Template
                <select />

                Parent Site
                <select
                    value={state.parentSite}
                    onChange={(e) => this.onInputChange('parentSite', parseInt(e.target.value, 10))}
                >
                    <option value={0} >
                        Home Level
                    </option>
                    {
                        this.props.sites.byId.map((id: number, i: number) => {
                            return (
                                <option
                                    key={i}
                                    value={id}
                                >
                                    {this.props.sites.byHash[id].info.Title}
                                </option>
                            );
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