import * as React from 'react';
import SiteForm from '../containers/site_form_create';
import LibraryForm from '../containers/library_form';

export default class CreateAndEditForm extends React.Component<any, any> {
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