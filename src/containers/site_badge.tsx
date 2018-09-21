import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import setActiveSite from '../actions/set_active_site_action';
import { ISite } from '../api/helperFunctions';

interface ISIteBadge {
    setActiveSite: FunctionConstructor;
    site: ISite;
}

class SiteBadge extends React.Component<ISIteBadge, any> {
    constructor(props: ISIteBadge) {
        super(props);
    }

    onDivClick() {
        this.props.setActiveSite(this.props.site.info.Title);
    }

    render() {
        return (
            <div onClick={() => this.onDivClick()}>
                <p>{this.props.site.info.Title}</p>
                <div>{this.props.site.info.Url}</div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ setActiveSite }, dispatch);
}

export default connect(null, mapDispatchToProps)(SiteBadge);