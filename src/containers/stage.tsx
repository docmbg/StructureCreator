import * as React from 'react';
import { connect } from 'react-redux';
import SubsitesSection from '../components/subsitesSection';
import { ISite } from '../api/helperFunctions';

class Stage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <SubsitesSection
                data={this.props.sites.filter((site: ISite) => site.parentSite === this.props.activeSite)}
            />
        );
    }
}

function mapStateToProps({ sites, activeSite }: any) {
    return {
        sites,
        activeSite
    };
}

export default connect(mapStateToProps, null)(Stage);