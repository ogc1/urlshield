import React from 'react';
import { MainForm } from './MainForm.jsx';

export class Content extends React.Component {

  render () {
    return (
      <div id='content'>
        <div id='content-group'>
          <div id='content-form'>
            <MainForm />
          </div>
          <div id='content-features'>
            <p>Shorten URLs now to enjoy:</p>
            <ul>
              <li>Easy Link Shortening With Expiration</li>
              <li>Protection Against Malicious URLs</li>
              <li>Detailed Link Analytics</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
    
}