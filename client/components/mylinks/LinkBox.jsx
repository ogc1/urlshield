import React from 'react';

export class LinkBox extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {extendedState: false, clicks: 0, uniqueclicks: 0};
    this.fetchNewClicks = this.fetchNewClicks.bind(this);
  }

  fetchNewClicks() {
    fetch('/api/logs/clicks/' + this.props.linkinfo.short_url)
    .then(response => response.json())
    .then(clickCount => { 
      // console.log(clickCount);
      this.setState({ clicks: clickCount }) ;
    })
    .catch(e => console.log(e));

    fetch('/api/logs/unique/' + this.props.linkinfo.short_url)
    .then(response => response.json())
    .then(clickCount => { 
      // console.log(clickCount);
      this.setState({ uniqueclicks: clickCount }) ;
    })
    .catch(e => console.log(e));
  }

  componentDidMount() {
    this.fetchNewClicks();
    this.intervalID = setInterval(this.fetchNewClicks, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  handleClick() {
    this.props.switchStateProp(this.props.linkinfo);
  }

  render () {

    return (
      <div className = 'link-box fade-in-elem'>
        <div><strong>{'https://urlshield.io/' + this.props.linkinfo.short_url}</strong></div>
        <div>{this.props.linkinfo.destination_url}</div>
        <div><em>Created: {new Date(this.props.linkinfo.created_on).toUTCString()}</em></div>
        <div><em>Expires: {new Date(this.props.linkinfo.expiration).toUTCString()}</em></div>
        <div>Clicks: {this.state.clicks}</div>
        <div>Unique clicks: {this.state.uniqueclicks}</div>
        <button onClick={this.handleClick}>View logs</button>
      </div>
    );
  }
    
}