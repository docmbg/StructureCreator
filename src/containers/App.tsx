import * as React from 'react';
import '../sass/App.css';
import CreateForm from '../components/createForm';
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
            <CreateForm />
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
