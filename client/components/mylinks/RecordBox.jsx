import React from 'react';

export class RecordBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {showMore: false};
    this.toggleLogs = this.toggleLogs.bind(this);
  }

  toggleLogs () {
    const newVal = !this.state.showMore;
    this.setState({showMore: newVal});
  }

  componentDidMount() {
    this.props.fetchNewInfo(this.props.recordInfo);
    this.intervalID = setInterval(() => this.props.fetchNewInfo(this.props.recordInfo), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render () {

    const extra = (
      <div id='see-more'>
        <hr />
        <div><strong>GPS coordinates:</strong> {'(' + this.props.recordInfo.latitude +  ', ' + this.props.recordInfo.longitude + (')')}</div>
        <div><strong>Languages:</strong> {`${this.props.recordInfo.language_id} (${this.props.recordInfo.languages_str})`}</div>
        <div><strong>Incognito Mode:</strong> {String(this.props.recordInfo.incognito)}</div>
        <div><strong>VPN:</strong> {String(this.props.recordInfo.vpn)}</div>
        <div><strong>Tor:</strong> {String(this.props.recordInfo.tor)}</div>
        <div><strong>Proxy:</strong> {String(this.props.recordInfo.proxy)}</div>
        <div><strong>Relay:</strong> {String(this.props.recordInfo.relay)}</div>
        <div><strong>Mobile:</strong> {String(this.props.recordInfo.mobile)}</div>
        <div><strong>Screen size:</strong> {`${this.props.recordInfo.screen_width} x ${this.props.recordInfo.screen_height} (Pixel ratio: ${this.props.recordInfo.pixel_ratio}, pixel depth: ${this.props.recordInfo.pixel_depth}, color depth: ${this.props.recordInfo.color_depth})`} </div>
        <div><strong>Unique Visitor ID (fingerprint):</strong> {this.props.recordInfo.visitor_id}</div>
        <div><strong>User agent:</strong> {this.props.recordInfo.useragent}</div>
        <div><strong>Time zone:</strong> {this.props.recordInfo.timezone}</div>
        <div><strong>ISP:</strong> {this.props.recordInfo.isp}</div>
        <div><strong>ASN:</strong> {this.props.recordInfo.asn}</div>
        <div><strong>Device memory:</strong> {this.props.recordInfo.device_mem}</div>
        <div><strong>Hardware Concurrency:</strong> {this.props.recordInfo.hardware_concurrency}</div>
        <div><strong>Platform:</strong> {String(this.props.recordInfo.plaform)}</div>
      </div>);

    return (
      <div className = 'record-box fade-in-elem'>
        
        <div><strong>Timestamp:</strong> {new Date(this.props.recordInfo.log_timestamp).toLocaleString()}</div>
        <div><strong>Country:</strong> {this.props.recordInfo.country_name}</div>
        <div><strong>City:</strong> {this.props.recordInfo.city}</div>
        <div><strong>Region:</strong> {this.props.recordInfo.region_name}</div>
        <div><strong>Zip:</strong> {this.props.recordInfo.zip}</div>
        <div><strong>IP address:</strong> {this.props.recordInfo.ip_address}</div>
        <div><strong>OS:</strong> {`${this.props.recordInfo.os} ${this.props.recordInfo.osversion}`}</div>
        <div><strong>Browser info:</strong> {`${this.props.recordInfo.browser_name} ${this.props.recordInfo.browser_version}`}</div>
        { this.state.showMore && extra }
        <button onClick={this.toggleLogs}>Show more/less</button>
      </div>
    );
  }
    
}