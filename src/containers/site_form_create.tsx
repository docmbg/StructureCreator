import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import addSite from '../actions/add_site_action';
import { ISite, buildUrl } from '../api/helperFunctions';
import { mainUrl } from '../consts';
import { Modal, Button } from 'react-materialize';

interface IPropsType {
    sites: any;
    activeSite: string;
    addSite: Function;
    opened: boolean;
    onCloseForm: Function;
}

class SiteCreateForm extends React.Component<IPropsType, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            Title: '',
            UseSamePermissionsAsParentSite: 1,
            parentSite: 1,
            Url: '',
            modalOpened: this.props.opened
        };
    }

    closeModal(save: boolean) {
        const that = this;
        this.setState({
            modalOpened: false
        });
        setTimeout(
            function () {
                if (save) {
                    const newId = (that.props.sites.byId[that.props.sites.byId.length - 1] + 1) || 1;
                    let site: ISite = {
                        Id: newId,
                        // celta e siteovete bez parent da sa s parentSite NULL; a drugite da s type NUMBER
                        parentSite: parseInt(that.state.parentSite, 10),
                        mainUrl,
                        requestDigest: '',
                        info: {
                            __metadata: { 'type': 'SP.WebCreationInformation' },
                            Title: that.state.Title,
                            Url: buildUrl(that.props.sites, mainUrl, that.state.parentSite, that.state.Url, that.state.Title),
                            WebTemplate: 'STS#0',
                            UseSamePermissionsAsParentSite: parseInt(that.state.UseSamePermissionsAsParentSite, 10) === 1,
                        }

                    };
                    console.log(site);
                    that.props.addSite(site, that.state.Title);
                    that.props.onCloseForm();
                } else {
                    that.props.onCloseForm();

                }
            },
            10
        );

    }

    onInputChange(prop: any, value: any) {
        this.setState({
            [prop]: value
        });
    }

    render() {
        const state = this.state;
        return (
            <Modal
                modalOptions={{ dismissible: false }}
                header={'New Site'}
                open={this.state.modalOpened}
                actions={
                    <div>
                        <Button onClick={() => this.closeModal(true)}>Save</Button>
                        <Button onClick={() => this.closeModal(false)}>Dismiss</Button>
                    </div>}
            >
                {
                    this.state.modalOpened ?

                        <div>
                            Site Name
                            <input
                                value={state.Title}
                                onChange={(e) => this.onInputChange('Title', e.target.value)}
                            />
                            Site URL
                            <br />
                            {buildUrl(this.props.sites, mainUrl, this.state.parentSite, '', '')}
                            <input
                                value={state.Url}
                                onChange={(e) => this.onInputChange('Url', e.target.value)}
                            />
                            Site Permissions
                            <select  onChange={(e) => this.onInputChange('UseSamePermissionsAsParentSite', e.target.value)}>
                                <option value={1}>Inherit</option>
                                <option value={0}>Break Inheritance</option>
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

                        </div> :
                        <div />
                }
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(SiteCreateForm);