import * as React from 'react';
import { connect } from 'react-redux';
import SubsitesSection from '../components/subsites_section';
// import { ISite } from '../api/helperFunctions';

class Stage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <SubsitesSection
                data={Object.keys(this.props.sites.byHash).map((key: string) => {
                    return (
                        this.props.sites.byHash[key].parentSite === this.props.activeSite ?
                            this.props.sites.byHash[key] :
                            false
                    );
                }).filter((e: any) => typeof (e) !== 'boolean')}
            />
        );
    }
}

function mapStateToProps(state: any) {
    let sites = {
        byId: state.sites.present.byId,
        byHash: state.sites.present.byHash
    };
    return {
        sites,
        activeSite: state.activeSite
    };
}

export default connect(mapStateToProps, null)(Stage);