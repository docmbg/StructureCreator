import * as React from 'react';
import SiteForm from '../containers/site_form_create';
// import LibraryForm from '../containers/library_form';

export default class CreateAndEditForm extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            formValue: <SiteForm opened={true} onCloseForm={() => this.onClose()} />,
            form: ''
        };
    }

    onClose() {
        this.setState({
            form: '',
        });
    }

    switchForm(e: any) {
        let formValue;
        switch (e.target.value) {
            case 'subsite':
                formValue = <SiteForm />;
                break;
            // case 'library':
            //     form = <LibraryForm />;
            //     break;
            default:
                formValue = <div />;
        }
        this.setState({
            formValue
        });
    }

    onButtonClick() {
        this.setState({
            form: this.state.formValue
        });
    }

    render() {
        return (
            <div>
                Choose Type:
                <select onChange={(e) => this.switchForm(e)}>
                    <option value="subsite" selected={true}>Subsite</option>
                    {/* <option value="library">Library</option> */}
                </select>
                <button onClick={() => this.onButtonClick()}>Add</button>
                <div>
                    {this.state.form !== '' ? this.state.form : <div />}
                </div>
            </div>
        );
    }
}