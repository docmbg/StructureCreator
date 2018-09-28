import * as React from 'react';
import '../sass/App.css';
import CreateAndEditForm from '../components/create_and_edit_form';
import Stage from './stage';
import ReuseStructure from './reuse_structure';
import ActiveSite from './activeSite';

export default class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s2">
            <ActiveSite />
          </div>
        </div>
        <div className="row">
          <div className="col s2">
            <CreateAndEditForm />
          </div>
          <div className="col s10">
            <Stage />
          </div>
        </div>
        <ReuseStructure />
      </div>
    );
  }
}
