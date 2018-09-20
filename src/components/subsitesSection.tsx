import * as React from 'react';
import { ISite } from '../api/helperFunctions';

export default class SubsitesContainer extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                {
                    this.props.data.map((site: ISite, i: number) => {
                        return (
                            <div key={i}>
                                <p>{site.info.Title}</p>
                                <p>{site.info.Url}</p>
                            </div>

                        );
                    })
                }
            </div>
        );
    }
}