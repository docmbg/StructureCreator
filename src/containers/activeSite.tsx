import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import setActiveSite from '../actions/set_active_site_action';

class ActiveSite extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    onInputChange(value: string) {
        this.props.setActiveSite(parseInt(value, 10));
    }

    render() {
        return (
            <div>
            Current Site:
            <select
                value={this.props.activeSite}
                onChange={(e) => this.onInputChange(e.target.value)}
            >
                <option value={0}>
                    Home Level
                </option>
                {
                    this.props.sites.present.byId.map((id: number, i: number) => {
                        return (
                            <option
                                key={i}
                                value={id}
                            >
                                {this.props.sites.present.byHash[id].info.Title}
                            </option>
                        );
                    })
                }
                }
            </select>
            </div>
        );
    }
}

function mapStateToProps({ activeSite, sites }: any) {
    return {
        activeSite,
        sites
    };
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ setActiveSite }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveSite);