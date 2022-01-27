import React from 'react';
import { LinkBox } from './LinkBox.jsx';
import { RecordBox } from './RecordBox.jsx';

const DEFAULT_STATE = 'DEFAULT_STATE';
const LOG_STATE = 'LOG_MODE';

export class MyLinks extends React.Component {

  constructor(props) {
    super(props);
    this.state = 
    { 
      myList: [], 
      specificLogs: [],
      globalState: DEFAULT_STATE,
      currentUrl: '' 
    };
    this.fetchNewList = this.fetchNewList.bind(this);
    this.fetchDetailsList = this.fetchDetailsList.bind(this);
    this.switchStateOnClick = this.switchStateOnClick.bind(this);
    this.updateClickCounts = this.updateClickCounts.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  updateClickCounts() {
    
  }

  resetState() {
    this.setState({ 
      myList: [], 
      specificLogs: [],
      globalState: DEFAULT_STATE,
      currentUrl: '' 
    });
    this.fetchNewList();
  }
  
  switchStateOnClick(chosenUrl) {
    if (this.state.globalState = DEFAULT_STATE) {
      this.setState({globalState: LOG_STATE});
      this.setState({currentUrl: chosenUrl});
      this.fetchDetailsList(chosenUrl);
    } 
    else this.setState({globalState: DEFAULT_STATE});
  }

  fetchNewList() {
    fetch('/api/myLinks')
    .then(response => response.json())
    .then(urls => { this.setState({ myList: urls }) })
    .catch(e => console.log(e));
  }

  fetchDetailsList(thisurl) {
    fetch('/api/logs/extended/' + thisurl.short_url)
    .then(response => response.json())
    .then(rows => { 
      this.setState({ specificLogs: rows }) ;
    })
    .catch(e => console.log(e));
  }

  componentDidMount() {
    this.fetchNewList();
    this.intervalID = setInterval(this.fetchNewList, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render () {
    let header;
    let dynamicContent;
    if (this.state.globalState === DEFAULT_STATE) {
      header = (
      <div className='addspace'>
        <h2>My URLs</h2>
        <div><button onClick={this.props.switchState}>Back to Homepage</button></div>
      </div>);
      dynamicContent = this.state.myList.map(item => <LinkBox key={item.short_url} switchStateProp={this.switchStateOnClick} id={item.short_url} linkinfo={item} />);
    } else {
      let clicks = this.state.specificLogs.length;
      let uniqueClicks = new Set(this.state.specificLogs.map(item => item.visitor_id)).size;
      header = (
        <div className='addspace'>
          <h2>URL Logs:</h2>
          <h3>{ 'https://urlshield.io/' + this.state.currentUrl.short_url  + ' -> ' +  this.state.currentUrl.destination_url}</h3>
          <h3>Clicks: {clicks} (unique: {uniqueClicks})</h3>
          <div><button onClick={this.resetState}>Go back to my URL list</button></div>
        </div>
      );
      dynamicContent = this.state.specificLogs.map(item => <RecordBox fetchNewInfo={this.fetchDetailsList} key={item.log_id} id={item.log_id} recordInfo={item} />);
    };

    return (
      <div id ='my-links'>
        <div id='my-links-header'>
          { header }
        </div>
        <div id='my-links-dynamic'>
          { dynamicContent }
        </div>
      </div>
    );
  }
    
}