import * as React from 'react';
import '../sass/App.css';

export default class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      chislo: 100
    };
  }

  onButtonClick() {
    let chislo = this.state.chislo + 1;
    this.setState({
      chislo
    });
  }

  render() {
    return (
      <div>
        One Structure Creator {this.state.chislo + 1}
        <button onClick={() => this.onButtonClick()}>Add</button>
      </div>
    );
  }
}
