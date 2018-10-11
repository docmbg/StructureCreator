import * as React from 'react';
import { connect } from 'react-redux';
import ChangesSection from '../components/changes_section';
import SubsitesSection from '../components/subsites_section';
import { compareStructures } from '../api/helperFunctions';

class Stage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            input: '',
            changesDisplay: false,
        };
    }

    onInputChange(value: string) {
        this.setState({
            input: value
        });
    }

    onChangesButtonClick() {
        this.setState({
            changesDisplay: !this.state.changesDisplay
        });
    }

    createStructure() {
        let newStructure = compareStructures(this.props.past[1], this.props.sites).sitesInNewStructure;
        console.log(newStructure, 'new structure');
    }

    render() {
        let data;
        let that = this;
        if (this.props.activeSite === -1) {
            data = Object.keys(this.props.sites.byHash).map((key: string) => {
                if (that.state.input !== '') {
                    return (
                        this.props.sites.byHash[key].info.Title.toLowerCase().includes(that.state.input.toLowerCase()) ?
                            this.props.sites.byHash[key] :
                            false
                    );
                } else {
                    return this.props.sites.byHash[key];
                }

            }).filter((e: any) => typeof (e) !== 'boolean');
            console.log(data, this.props.sites.byHash);
        } else {
            data = Object.keys(this.props.sites.byHash).map((key: string) => {
                return (
                    this.props.sites.byHash[key].parentSite === this.props.activeSite ?
                        this.props.sites.byHash[key] :
                        false
                );
            }).filter((e: any) => typeof (e) !== 'boolean');
        }
        return (
            <div>
                {
                    this.props.activeSite === -1 ?
                        <input onChange={(e: any) => this.onInputChange(e.target.value)} value={this.state.input} /> :
                        <div />
                }
                <SubsitesSection
                    data={data}
                />
                <button onClick={() => this.onChangesButtonClick()}>
                    {this.state.changesDisplay ? 'Hide Changes' : 'Show Changes'}
                </button>
                {
                    this.state.changesDisplay ?
                        <ChangesSection
                            past={this.props.sitesOrigin === 'local' ? this.props.past[0] : this.props.past[1]}
                            present={this.props.sites}
                        /> :
                        <div />
                }
                <button onClick={() => this.createStructure()}>Create new structure</button>
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

export default connect(mapStateToProps, null)(Stage);