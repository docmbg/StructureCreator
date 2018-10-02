import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import setActiveSite from '../actions/set_active_site_action';
import { ISite } from '../api/helperFunctions';
// import { Badge } from 'react-materialize';

interface ISIteBadge {
    setActiveSite: Function;
    site: ISite;
}

class SiteBadge extends React.Component<ISIteBadge, any> {
    constructor(props: ISIteBadge) {
        super(props);
    }

    onDivClick() {
        this.props.setActiveSite(this.props.site.Id);
    }

    render() {
        return (
            <div className="site-badge" onClick={() => this.onDivClick()}>
                <div className="text">
                    {this.props.site.info.Title}
                </div>
                <div className="actions">
                    <i className="material-icons">
                        edit
                    </i>
                    <i className="material-icons">
                        delete_forever
                    </i>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ setActiveSite }, dispatch);
}

export default connect(null, mapDispatchToProps)(SiteBadge);