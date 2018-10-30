import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import setSites from '../actions/set_sites_action';
import setSitesOrigin from '../actions/set_sites_origin_action';
import { getAllSubSites, transformToUseableSites } from '../api/helperFunctions';
import { readOptions } from '../consts';
import { mainUrl } from '../consts';

class ReuseStructure extends React.Component<any, any> {
    private fileRef = React.createRef<HTMLInputElement>();

    constructor(props: any) {
        super(props);
        this.state = {
            hasFile: false,
        };
    }

    componentDidMount() {
        const sites = new Array();
        Promise.resolve(getAllSubSites(
            mainUrl,
            sites, mainUrl, readOptions)).
            then(res => {
                const newSites = transformToUseableSites(sites);
                // two times so we can set it in the past of the reducer, thus making it the default compare value
                // in the compareStructures paramter, look at stage section, past parameter
                // passed to changes section
                this.props.setSitesOrigin('sharepoint');
                this.props.setSites(newSites);
                this.props.setSites(newSites);
            });

    }

    onInputChange() {
        const node = this.fileRef.current;
        this.setState({
            hasFile: node.files.length > 0
        });
    }

    readStructure() {
        let that = this;
        const node = this.fileRef.current;
        if (node) {
            const reader = new FileReader();
            reader.onloadend = function (event: any) {
                const data = JSON.parse(event.target.result);
                // it's important to keep the main site the same name, as well
                // as keeping the mainurl the same, not replacing it by the 
                // incoming structure

                data.byHash[1].info.Title = that.props.sites.byHash[1].info.Title;

                // replace all urls with current first url;
                const toReplace = data.byHash[1].info.Url;
                for (let key of Object.keys(data.byHash)) {
                    data.byHash[key].info.Url =
                        data.byHash[key].info.Url.replace(toReplace, that.props.sites.byHash[1].info.Url);
                    data.byHash[key].mainUrl = mainUrl;
                }
                that.props.setSites(data);
            };
            reader.readAsText(node[`files`][0]);
        }
    }

    render() {
        return (
            <div>
                <div>
                    <form action="#">
                        <div className="file-field input-field">
                            <div className="btn">
                                <span>Pick a Structure File</span>
                                <input type="file" ref={this.fileRef} onChange={() => this.onInputChange()} />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" id="fileNameInput" />
                            </div>
                        </div>
                    </form>
                    <a
                        className={`waves-effect waves-black btn ${this.state.hasFile ? '' : 'disabled'}`}
                        onClick={() => this.readStructure()}
                    >
                        Upload Structure
                    </a>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ sites }: any) {
    return {
        sites: sites.present
    };
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ setSites, setSitesOrigin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReuseStructure);