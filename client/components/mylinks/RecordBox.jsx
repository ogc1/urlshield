import React from 'react';

export class RecordBox extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {

    return (
      <div className = 'record-box'>
        <div>Timestamp: {new Date(this.props.recordInfo.log_timestamp).toLocaleString()}</div>
        <div>Country: {this.props.recordInfo.country_name}</div>
        <div>City: {this.props.recordInfo.city}</div>
        <div>Region: {this.props.recordInfo.region_name}</div>
        <div>Zip: {this.props.recordInfo.zip}</div>
        <div>IP address: {this.props.recordInfo.ip_address}</div>
        <div>GPS coordinates: {'(' + this.props.recordInfo.latitude +  ', ' + this.props.recordInfo.longitude + (')')}</div>
        <div>OS: {`${this.props.recordInfo.os} ${this.props.recordInfo.osversion}`}</div>
        <div>Browser info: {`${this.props.recordInfo.browser_name} ${this.props.recordInfo.browser_version}`}</div>
        <div>Languages: {`${this.props.recordInfo.language_id} (${this.props.recordInfo.languages_str})`}</div>
        <div>Incognito Mode: {String(this.props.recordInfo.incognito)}</div>
        <div>VPN: {String(this.props.recordInfo.vpn)}</div>
        <div>Tor: {String(this.props.recordInfo.tor)}</div>
        <div>Proxy: {String(this.props.recordInfo.proxy)}</div>
        <div>Relay: {String(this.props.recordInfo.relay)}</div>
        <div>Mobile: {String(this.props.recordInfo.mobile)}</div>
        <div>Screen size: {`${this.props.recordInfo.screen_width} x ${this.props.recordInfo.screen_height} (Pixel ratio: ${this.props.recordInfo.pixel_ratio}, pixel depth: ${this.props.recordInfo.pixel_depth}, color depth: ${this.props.recordInfo.color_depth})`} </div>
        <div>Unique Visitor ID (fingerprint): {this.props.recordInfo.visitor_id}</div>
        <div>User agent: {this.props.recordInfo.useragent}</div>
        <div>Time zone: {this.props.recordInfo.timezone}</div>
        <div>ISP: {this.props.recordInfo.isp}</div>
        <div>ASN: {this.props.recordInfo.asn}</div>
        <div>Device memory: {this.props.recordInfo.device_mem}</div>
        <div>Hardware Concurrency: {this.props.recordInfo.hardware_concurrency}</div>
        <div>Platform: {String(this.props.recordInfo.plaform)}</div>
      </div>
    );
  }
    
}