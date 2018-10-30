import * as React from 'react';
import ChangesSection from '../components/changes_section';
import { connect } from 'react-redux';
import {
    compareStructures,
    orderOfRequests,
    addMultipleSites,
    deleteMultipleSites,
    updateMultipleSites
} from '../api/helperFunctions';
import { Modal, Button } from 'react-materialize';

class CreateStructure extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            modalOpened: false
        };
    }

    openModal(value: boolean) {
        this.setState({
            modalOpened: value
        });
    }

    createStructure() {
        let newStructure = compareStructures(this.props.past[1], this.props.sites).sitesInNewStructure;
        async function executeStructure() {
            await deleteMultipleSites(orderOfRequests(newStructure.toDelete, true));
            await addMultipleSites(orderOfRequests(newStructure.toCreate, false));
            await updateMultipleSites(newStructure.toUpdate);
            return 1;
        }

        Promise.resolve(executeStructure()).then(res => {
            console.log(res);
        });
    }

    render() {
        return (
            <div>
                <a
                    className="waves-effect waves-black btn"
                    onClick={() => this.openModal(true)}
                >
                    Show Changes Made
                </a>
                {
                    <Modal
                        header={'Changes to initial Structure'}
                        open={this.state.modalOpened}
                        modalOptions={{ dismissible: false }}
                        actions={
                            <div className="container">
                                <div className="row">
                                    <div className="col s12">
                                        <Button onClick={() => this.openModal(false)}>Close</Button>
                                    </div>
                                </div>
                            </div>
                        }
                    >
                        {this.state.modalOpened ?
                            <div className="container">
                                <ChangesSection
                                    past={this.props.sitesOrigin === 'local' ? this.props.past[0] : this.props.past[1]}
                                    present={this.props.sites}
                                />
                            </div>
                            :
                            <div />
                        }
                    </Modal>
                }
                <a
                    className="waves-effect waves-black btn"
                    onClick={() => this.createStructure()}
                >
                    Save Structure to SharePoint
                </a>
                {this.props.sites.byId.length > 0 ?
                    <a
                        className={`waves-effect waves-black btn  'disabled' : ''}`}
                        href={`data:text/plain;charset=UTF-8,${JSON.stringify(this.props.sites)}`}
                        download="Sharepoint Structure"
                    >
                        Download Structure for later use
                        <i className="material-icons">save_alt</i>
                    </a> :
                    <div />
                }
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    let sites = {
        byId: state.sites.present.byId,
        byHash: state.sites.present.byHash
    };
    let past = state.sites.past;
    return {
        sites,
        past,
        activeSite: state.activeSite,
        sitesOrigin: state.sitesOrign,
    };
}

export default connect(mapStateToProps, null)(CreateStructure);