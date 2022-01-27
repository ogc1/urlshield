import React from 'react';
import { Header } from './global/Header.jsx';
import { Footer } from './global/Footer.jsx';
import { Content } from './landingpage/Content.jsx';
import { MyLinks } from './mylinks/MyLinks.jsx';

const MAIN_STATE = 'MAIN_STATE';
const ALT_STATE = 'ALT_STATE';

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { globalState: MAIN_STATE };
    this.switchState = this.switchState.bind(this);
  }

  switchState() {
    if (this.state.globalState === MAIN_STATE) this.setState({ globalState: ALT_STATE });
    else if (this.state.globalState === ALT_STATE) this.setState({ globalState: MAIN_STATE });
  }

  componentDidMount() {
    // set the sessionId browser cookie
    fetch('/api/startSession'); 
  }

  render () {

    let appContent;

    if (this.state.globalState === MAIN_STATE) appContent = <Content switchState={this.switchState} />;
    if (this.state.globalState === ALT_STATE) appContent = <MyLinks switchState={this.switchState} />;

    return (
      <div id='outer-container'>
        <Header switchState={this.switchState} />
        { appContent }
        <Footer />
      </div>
    );
    
  }
    
}