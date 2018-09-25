import * as React from 'react';
import { connect } from 'react-redux';
import SubsitesSection from '../components/subsites_section';
import { ISite } from '../api/helperFunctions';
import { ISitesState } from '../reducers/reducer_sites';

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

function mapStateToProps(state: any) {
    let sites: ISitesState = {
        byId: state.sites.byId,
        byHash: state.sites.byHash
    };
    return {
        sites,
        activeSite: state.activeSite
    };
}

export default connect(mapStateToProps, null)(Stage);