import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import addSite from '../actions/add_site_action';
import { ISite, buildUrl } from '../api/helperFunctions';
import { mainUrl } from '../consts';

interface IPropsType {
    sites: any;
    activeSite: string;
    addSite: Function;
}

class SiteCreatForm extends React.Component<IPropsType, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            Title: '',
            Url: '',
            WebTemplate: '',
            parentSite: 1,
        };
    }

    onInputChange(prop: string, value: any) {
        this.setState({
            [prop]: value
        });
    }

    onAddButtonClick() {
        let that = this;
        const newId = (this.props.sites.byId[this.props.sites.byId.length - 1] + 1) || 1;
        let site: ISite = {
            Id: newId,
            // celta e siteovete bez parent da sa s parentSite NULL; a drugite da s type NUMBER
            parentSite: parseInt(this.state.parentSite, 10),
            mainUrl,
            requestDigest: '',
            info: {
                __metadata: { 'type': 'SP.WebCreationInformation' },
                Title: this.state.Title,
                Url: buildUrl(that.props.sites, mainUrl, that.state.parentSite, that.state.Url, that.state.Title),
                WebTemplate: this.state.WebTemplate,
                UseSamePermissionsAsParentSite: true,
            }

        };
        this.props.addSite(site, this.state.Title);
        this.setState({
            Title: '',
            Url: '',
            WebTemplate: '',
            parentSite: 1,
        });
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
                {mainUrl}
                <input
                    value={state.Url}
                    onChange={(e) => this.onInputChange('Url', e.target.value)}
                />
                Site Permissions
                <select >
                    <option value="true">Inherit</option>
                    <option value="false">Break Inheritance</option>
                </select>

                Parent Site
                <select
                    value={state.parentSite}
                    onChange={(e) => this.onInputChange('parentSite', e.target.value)}
                >
                    <option value={1}>
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
                <button onClick={() => this.onAddButtonClick()}>Add</button>

            </div>
        );
    }
}

function mapStateToProps(state: any) {
    let sites = {
        byId: state.sites.present.byId,
        byHash: state.sites.present.byHash
    };
    return {
        sites,
        activeSite: state.activeSite
    };
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ addSite }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteCreatForm);