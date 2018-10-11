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
                Display :
                <select
                    value={this.props.activeSite}
                    onChange={(e) => this.onInputChange(e.target.value)}
                >
                    <option value={-1}>
                        All Sites
                    </option>
                    <option value={1}>
                        Home Level ({this.props.sites.byHash[1] ? this.props.sites.byHash[1].info.Title : ''})
                    </option>
                    {
                        this.props.sites.byId.map((id: number, i: number) => {
                            if (i > 0) {
                                return (
                                    <option
                                        key={i}
                                        value={id}
                                    >
                                        {this.props.sites.byHash[id].info.Title}
                                    </option>
                                );
                            } else {
                                return true;
                            }
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
        sites: sites.present
    };
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ setActiveSite }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveSite);