import * as React from 'react';
import { compareStructures } from '../api/helperFunctions';

export default class ChangesSection extends React.Component<any, any> {
    render() {
        let changes = compareStructures(this.props.past, this.props.present);
        return (
            <div>
                {
                    changes.map((change: any, i: number) => (
                        <p className={change.type} key={i}>{change.text}</p>
                    ))
                }
            </div>
        );
    }
}