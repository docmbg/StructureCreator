import * as React from 'react';
import { ISite } from '../api/helperFunctions';
import SiteBadge from '../containers/site_badge';

export default class SubsitesContainer extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div id="siteBadge">
                {
                    this.props.data.map((site: ISite, i: number) => {
                        return (
                            <SiteBadge key={i} site={site} />
                        );
                    })
                }
            </div>
        );
    }
}