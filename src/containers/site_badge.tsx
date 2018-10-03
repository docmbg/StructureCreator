import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import setActiveSite from '../actions/set_active_site_action';
import editSite from '../actions/edit_site_action';
import editSiteContent from '../actions/edit_site_content_action';
import { ISite } from '../api/helperFunctions';
import { Modal, Button } from 'react-materialize';
import SiteEditForm from './site_form_edit';

interface ISIteBadge {
    setActiveSite: Function;
    editSite: Function;
    site: ISite;
    contentActiveSite: ISite;
    editSiteContent: Function;
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
                        <i className="material-icons">
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
    return bindActionCreators({ setActiveSite, editSite, editSiteContent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteBadge);