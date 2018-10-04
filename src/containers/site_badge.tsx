import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import setActiveSite from '../actions/set_active_site_action';
import editSite from '../actions/edit_site_action';
import editSiteContent from '../actions/edit_site_content_action';
<<<<<<< HEAD
import deleteSite from '../actions/delete_site_action';
=======
>>>>>>> 6370b9635fe2f7f6920f0fdb974d855df518bdfb
import { ISite } from '../api/helperFunctions';
import { Modal, Button } from 'react-materialize';
import SiteEditForm from './site_form_edit';

interface ISIteBadge {
    setActiveSite: Function;
    editSite: Function;
    site: ISite;
    contentActiveSite: ISite;
    editSiteContent: Function;
<<<<<<< HEAD
    deleteSite: Function;
=======
>>>>>>> 6370b9635fe2f7f6920f0fdb974d855df518bdfb
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
<<<<<<< HEAD
    }

    deleteSite() {
        const result = confirm('This will permanently delete the site and its subsites, are you sure you want to proceed?');
        if (result) {
            this.props.deleteSite(this.props.site);
        }
=======
>>>>>>> 6370b9635fe2f7f6920f0fdb974d855df518bdfb
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
                        header="Modal Header"
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
<<<<<<< HEAD
                        <i className="material-icons" onClick={() => this.deleteSite()}>
=======
                        <i className="material-icons">
>>>>>>> 6370b9635fe2f7f6920f0fdb974d855df518bdfb
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
<<<<<<< HEAD
    return bindActionCreators({ setActiveSite, editSite, editSiteContent, deleteSite }, dispatch);
=======
    return bindActionCreators({ setActiveSite, editSite, editSiteContent }, dispatch);
>>>>>>> 6370b9635fe2f7f6920f0fdb974d855df518bdfb
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteBadge);