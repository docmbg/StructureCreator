import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import addSite from '../actions/add_site_action';
import { ISite } from '../api/helperFunctions';
import { ISitesState } from '../reducers/reducer_sites';

interface IPropsType {
    sites: ISitesState;
    activeSite: string;
    addSite: Function;
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

    onAddButtonClick() {
        let site: ISite = {
            parentSite: this.state.parentSite,
            mainUrl: '',
            requestDigest: '',
            info: {
                metadata: { 'type': 'SP.WebCreationInformation' },
                Title: this.state.siteTitle,
                Url: this.state.siteURL,
                WebTemlate: this.state.siteTemplate,
                UseSamePermissionsAsParentSite: true,
            }

        };
        this.props.addSite(site, this.state.Title);
        this.setState({
            siteName: '',
            siteURL: '',
            siteTemplate: '',
            parentSite: '',
        });
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
                <button onClick={() => this.onAddButtonClick()}>Add</button>

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
    return bindActionCreators({ addSite }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteForm);