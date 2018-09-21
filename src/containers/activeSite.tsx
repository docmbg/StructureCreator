import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import setActiveSite from '../actions/set_active_site_action';
import { ISite } from '../api/helperFunctions';

class ActiveSite extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    onInputChange(value: string) {
        this.props.setActiveSite(value);
    }

    render() {
        return (
            <div>
            Current Site:
            <select
                // value={this.props.activeSite}
                onChange={(e) => this.onInputChange(e.target.value)}
            >
                <option value="" />
                {
                    this.props.sites.map((site: ISite, i: number) => {
                        return <option key={i} value={site.info.Title}>{site.info.Title}</option>;
                    })
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