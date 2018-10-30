import * as React from 'react';
import '../sass/App.css';
import CreateAndEditForm from '../components/create_and_edit_form';
import Stage from './stage';
import ReuseStructure from './reuse_structure';
import CreateStructure from './create_structure';
import ActiveSite from './activeSite';
import UndoRedo from './undo_redo';
import { Card } from 'react-materialize';

export default class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s3">
            <div className="row">
              <Card className="#b2ff59 light-green accent-2" title="Basic Controls and Site Options">
                <div className="row">
                  <ActiveSite />
                </div>
                <div className="row">
                  <CreateAndEditForm />
                </div>
                <div className="row">
                  <UndoRedo />
                </div>
              </Card>
            </div>
            <div className="row">
              <Card className="#b2ff59 light-green accent-2" title="Upload a new structure">
                <ReuseStructure />
              </Card>
            </div>
            {/* <div className="row">
              
            </div> */}
            <div className="row">
              <Card className="#b2ff59 light-green accent-2" title="Look up changes and create new structure">
                <CreateStructure />
              </Card>
            </div>
          </div>
          <div className="col s9">
            <Stage />
          </div>
        </div>
      </div >
    );
  }
}
