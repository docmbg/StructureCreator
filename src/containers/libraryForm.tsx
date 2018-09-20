import * as React from 'react';

export default class LibraryForm extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div >
                 Name<input />
                 URL<input />
            </div>
        );
    }
}
