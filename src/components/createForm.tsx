import * as React from 'react';
import SiteForm from '../containers/siteForm';
import LibraryForm from '../containers/libraryForm';

export default class CreateForm extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            form: <SiteForm />,
        };
    }

    switchForm(e: any) {
        let form;
        switch (e.target.value) {
            case 'subsite':
                form = <SiteForm />;
                break;
            case 'library':
                form = <LibraryForm />;
                break;
            default:
                form = <div />;
        }
        this.setState({
            form
        });
    }

    render() {
        return (
            <div>
                Add a:
                <select onChange={(e) => this.switchForm(e)}>
                    <option value="subsite" selected={true}>Subsite</option>
                    <option value="library">Library</option>
                </select>
                <div>
                    {this.state.form}
                </div>
            </div>
        );
    }
}