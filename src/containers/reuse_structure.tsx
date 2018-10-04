import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import setSites from '../actions/set_sites_action';

class ReuseStructure extends React.Component<any, any> {
    private fileRef = React.createRef<HTMLInputElement>();

    constructor(props: any) {
        super(props);
    }

    // componentDidMount() {
    //     // for faster testing
    //     this.props.setSites(JSON.parse(localStorage.getItem('structure')));
    // }

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
    return bindActionCreators({ setSites }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReuseStructure);