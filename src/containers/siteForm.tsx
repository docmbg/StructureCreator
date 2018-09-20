import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import addSite from '../actions/add_site_action';
import { ISite } from '../api/helperFunctions';

class SiteForm extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            siteName: '',
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
                Title: this.state.siteName,
                Url: this.state.siteURL,
                WebTemlate: this.state.siteTemplate,
                UseSamePermissionsAsParentSite: true,
            }

        };
        this.props.addSite(site);
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
                    value={state.siteName} 
                    onChange={(e) => this.onInputChange('siteName', e.target.value)} 
                />
                Site URL
                <br/>
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
                    <option value=""/>
                    {
                        this.props.sites.map((site: ISite, i: number) => {
                            return <option key={i} value={site.info.Title}>{site.info.Title}</option>;
                        })
                    }
                </select>
                <button onClick={() => this.onAddButtonClick()}>Add</button>

            </div>
        );
    }
}

function mapStateToProps({ sites }: any) {
    return {
        sites
    };
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ addSite }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteForm);