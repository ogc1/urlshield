import React from 'react';

export class Header extends React.Component {

  render () {
    return (
      <header>
        <h1><strong>URLSHIELD</strong></h1>
        <div id='switch-button' onClick={this.props.switchState}>My Links</div>
      </header>
    );
  }
    
}