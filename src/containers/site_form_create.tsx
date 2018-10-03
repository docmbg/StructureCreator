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

class SiteCreatForm extends React.Component<IPropsType, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            siteTitle: '',
            siteURL: '',
            siteTemplate: '',
            parentSite: undefined,
        };
    }

    onInputChange(prop: string, value: string) {
        this.setState({
            [prop]: value
        });
    }

    onAddButtonClick() {
        const newId = (this.props.sites.byId[this.props.sites.byId.length - 1] + 1) || 0;
        let site: ISite = {
            Id: newId,
            parentSite: parseInt(this.state.parentSite, 10),
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
                <button onClick={() => this.onAddButtonClick()}>Add</button>

            </div>
        );
    }
}

function mapStateToProps(state: any) {
    let sites: ISitesState = {
        byId: state.sites.byId,
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

export default connect(mapStateToProps, mapDispatchToProps)(SiteCreatForm);