import * as React from 'react';
import { ISite, splitIntoBatches } from '../api/helperFunctions';
import SiteBadge from '../containers/site_badge';

export default class SubsitesContainer extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            batchSize: 10,
        };
    }

    render() {

        let data = splitIntoBatches(this.props.data, 10);
        return (
            <div id="siteBadge">
                {
                    data.map((batch: any, i: number) => {
                        return (
                            <div className="batch" key={i}>
                                {
                                    batch.map((site: ISite) => {
                                        return (
                                            <SiteBadge key={site.Id} site={site} />
                                        );
                                    })
                                }
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}