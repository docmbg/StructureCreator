import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import editSite from '../actions/edit_site_action';
import { ISitesState } from '../reducers/reducer_sites';
import { ISite } from '../api/helperFunctions';

interface IPropsType {
    sites: ISitesState;
    activeSite: string;
    editSite: Function;
}

class SiteForm extends React.Component<IPropsType, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            siteTitle: '',
            siteURL: '',
            siteTemplate: '',
            parentSite: '',
        };
    }

    onInputChange(prop: string, value: string) {
        this.setState({
            [prop]: value
        });
    }

    onComponentDidMount() {
        const site = this.props.sites.byHash[this.props.activeSite];
        this.setState({
            siteName: site.info.Title,
            siteURL: site.info.siteURL,
            siteTemplate: site.info.siteTemplate,
            parentSite: site.parentSite
        });
    }

    onAddButtonClick() {
        let site: ISite = {
            parentSite: this.state.parentSite,
            mainUrl: '',
            requestDigest: '',
            info: {
                metadata: { 'type': 'SP.WebCreationInformation' },
                Title: this.state.siteName,
                Url: this.state.siteURL,
                WebTemlate: this.state.siteTemplate,
                UseSamePermissionsAsParentSite: true,
            }

        };
        this.props.editSite(site);
    }

    render() {
        const state = this.state;
        return (
            <div>
                Site Name
                <input
                    value={state.siteTitle}
                    onChange={(e) => this.onInputChange('siteTitle', e.target.value)}
                />
                Site URL
                <br />
                {`https://mainUrl/`}
                <input
                    value={state.siteURL}
                    onChange={(e) => this.onInputChange('siteURL', e.target.value)}
                />
                Site Template
                <select />

                Parent Site
                <select
                    value={state.parentSite}
                    onChange={(e) => this.onInputChange('parentSite', e.target.value)}
                >
                    <option value="" />
                    {
                        this.props.sites.byTitle.map((title: string, i: number) => {
                            return (
                                <option
                                    key={i}
                                    value={title}
                                >
                                    {title}
                                </option>
                            );
                        })
                    }
                </select>
                <button onClick={() => this.onAddButtonClick()}>Edit</button>

            </div>
        );
    }
}

function mapStateToProps(state: any) {
    let sites: ISitesState = {
        byTitle: state.sites.byTitle,
        byHash: state.sites.byHash
    };
    return {
        sites,
        activeSite: state.activeSite
    };
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ editSite }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteForm);