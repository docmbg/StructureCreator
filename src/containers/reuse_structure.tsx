import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import setSites from '../actions/set_sites_action';
import setSitesOrigin from '../actions/set_sites_origin_action';
import { getAllSubSites, transformToUseableSites } from '../api/helperFunctions';
import { readOptions } from '../consts';

class ReuseStructure extends React.Component<any, any> {
    private fileRef = React.createRef<HTMLInputElement>();

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        const sites = new Array();
        Promise.resolve(getAllSubSites(
            'https://dxcportal.sharepoint.com/sites/DOCMNewCo',
            sites, 'https://dxcportal.sharepoint.com/sites/DOCMNewCo', readOptions)).
            then(res => {
                const newSites = transformToUseableSites(sites);
                // two times so we can set it in the past of the reducer, thus making it the default compare value
                // in the compareStructures paramter, look at stage section, past parameter
                // passed to changes section
                this.props.setSites(newSites);
                this.props.setSites(newSites);
                this.props.setSitesOrigin('sharepoint');
            });

    }

    readStructure() {
        let that = this;
        const node = this.fileRef.current;
        if (node) {
            const reader = new FileReader();
            reader.onloadend = function (event: any) {
                const data = JSON.parse(event.target.result);
                console.log(data);
                that.props.setSites(data);
            };
            reader.readAsText(node[`files`][0]);
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <a
                        href={`data:text/plain;charset=UTF-8,${JSON.stringify(this.props.sites.present)}`}
                        download="Sharepoint Structure"
                    >
                        Download Structure
                    </a>
                </div>
                <div className="row">
                    Read structure
                    <input type="file" ref={this.fileRef} />
                    <button onClick={() => this.readStructure()} >Submit</button>
                </div>
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
    return bindActionCreators({ setSites, setSitesOrigin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReuseStructure);