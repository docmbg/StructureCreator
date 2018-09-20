import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import addSite from '../actions/add_site_action';

class ReuseStructure extends React.Component<any, any> {
    private fileRef = React.createRef<HTMLInputElement>();

    constructor(props: any) {
        super(props);
    }

    readStructure() {
        let that = this;
        const node = this.fileRef.current;
        if (node) {
            const reader = new FileReader();
            reader.onloadend = function (event: any) {
                const data = JSON.parse(event.target.result);
                for (let site of data) {
                    that.props.addSite(site);
                }
            };
            reader.readAsText(node[`files`][0]);
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <a
                        href={`data:text/plain;charset=UTF-8,${JSON.stringify(this.props.sites)}`}
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
    return bindActionCreators({ addSite }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReuseStructure);