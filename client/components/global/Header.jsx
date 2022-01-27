import React from 'react';

export class Header extends React.Component {

  render () {
    return (
      <header>
        <div><h1><strong><a href='/'>URLSHIELD</a></strong> <span id='subtitle'>beta v2.0</span></h1></div>
        <div id='switch-button' onClick={this.props.switchState}>My Links</div>
      </header>
    );
  }
    
}