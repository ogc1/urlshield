import React from 'react';

export class MainForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: '',
      longUrl: '',
      newUrl: '',
      expiration: '2022-02-27',
      isHidden: true
    }
    this.handleChangeUrl = this.handleChangeUrl.bind(this);
    this.handleChangeExpiration = this.handleChangeExpiration.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUrl(e) {
    this.setState({url: e.target.value});
  }

  handleChangeExpiration(e) {
    console.log(e.target.value);
    this.setState({expiration: e.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch('https://api64.ipify.org?format=json')
    .then(result => result.json())
    .then(result => result.ip)
    .then(ip => {
      const data = { destination: this.state.url, ip, expiration: this.state.expiration };
      return fetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
    })
    .then(response => response.json())
    .then(info => {
      this.setState({newUrl: info.short_url, globalState: 'post', longUrl: this.state.url});
      this.setState({isHidden: false});
    })
    .catch(e => console.error('Error:', e));
  }

  render () {

    const shieldUrl = 'https://urlshield.io/' + this.state.newUrl;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Enter URL to shorten:</label>
          <input id='url' name="url" type="url" value={this.state.url} onChange={this.handleChangeUrl} required/>
        </div>
        <div>
          <label>Choose expiration date:</label>
          <input type="date" id="expiration" value={this.state.expiration} onChange={this.handleChangeExpiration} name="expiration" required/>
        </div>
        <div>
          <button>Shorten URL!</button>
        </div>
        { !this.state.isHidden && 
        (
          <div id='hidden-until-click'>
          <div>Your Long URL:</div>
          <div><input className='frozen' value={this.state.longUrl} disabled /></div>
          <div>Your New URL:</div>
          <div><input className='frozen' value={shieldUrl} disabled /></div>
        </div>
        )}
        
      </form>
    ) 
  }
    
}