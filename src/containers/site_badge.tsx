import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import editSite from '../actions/edit_site_action';
import editSiteContent from '../actions/edit_site_content_action';
import deleteSite from '../actions/delete_site_action';
import { ISite } from '../api/helperFunctions';
import { Modal, Button } from 'react-materialize';
import SiteEditForm from './site_form_edit';

interface ISIteBadge {
    editSite: Function;
    site: ISite;
    contentActiveSite: ISite;
    editSiteContent: Function;
    deleteSite: Function;
}

class SiteBadge extends React.Component<ISIteBadge, any> {
    constructor(props: ISIteBadge) {
        super(props);
        this.state = {
            modalOpened: false,
            saved: false,
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
                    that.props.editSite(that.props.contentActiveSite);
                }
            },
            10
        );

    }

    onEditClick() {
        this.props.editSiteContent(this.props.site);
        this.setState({
            modalOpened: true
        });
    }

    deleteSite() {
        const result = confirm('This will permanently delete the site and its subsites, are you sure you want to proceed?');
        if (result) {
            this.props.deleteSite(this.props.site);
        }
    }

    render() {
        console.log('new props', this.props.site);
        return (
            <div className="site-badge" id="siteBadge">
                <div className="text">
                    {this.props.site.info.Title}
                </div>
                <div className="actions">
                    <Modal
                        modalOptions={{ dismissible: false }}
                        header={this.props.site.info.Title}
                        open={this.state.modalOpened}
                        actions={
                            <div>
                                <Button onClick={() => this.closeModal(true)}>Save</Button>
                                <Button onClick={() => this.closeModal(false)}>Dismiss</Button>
                            </div>}
                    >
                        {
                            this.state.modalOpened ?
                                <SiteEditForm /> :
                                <div />
                        }
                    </Modal>
                    <div>
                        <i className="material-icons" onClick={() => this.onEditClick()}>
                            edit
                        </i>
                    </div>
                    <div>
                        <i className="material-icons" onClick={() => this.deleteSite()}>
                            delete_forever
                        </i>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ contentActiveSite }: any) {
    return ({
        contentActiveSite
    });
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ editSite, editSiteContent, deleteSite }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteBadge);