import * as React from 'react';
import { connect } from 'react-redux';
import SubsitesSection from '../components/subsites_section';
// import { ISite } from '../api/helperFunctions';

class Stage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            input: '',
        };
    }

    onInputChange(value: string) {
        this.setState({
            input: value
        });
    }

    render() {
        let data;
        let that = this;
        if (this.props.activeSite === -1) {
            data = Object.keys(this.props.sites.byHash).map((key: string) => {
                if (that.state.input !== '') {
                    return (
                        this.props.sites.byHash[key].info.Title.includes(that.state.input) ?
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
            </div>

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

export default connect(mapStateToProps, null)(Stage);