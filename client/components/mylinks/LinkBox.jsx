import React from 'react';

export class LinkBox extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {extendedState: false}
  }

  handleClick() {
    this.props.switchStateProp(this.props.linkinfo);
  }

  render () {

    return (
      <div className = 'link-box'>
        <div><strong>{'https://urlshield.io/' + this.props.linkinfo.short_url}</strong></div>
        <div>{this.props.linkinfo.destination_url}</div>
        <div><em>Created: {new Date(this.props.linkinfo.created_on).toUTCString()}</em></div>
        <div><em>Expires: {new Date(this.props.linkinfo.expiration).toUTCString()}</em></div>
        <div>Clicks: </div>
        <div>Unique clicks: </div>
        <button onClick={this.handleClick}>View logs</button>
      </div>
    );
  }
    
}