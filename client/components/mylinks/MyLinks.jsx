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
      currentUrl: 'chosenurl' 
    };
    this.fetchNewList = this.fetchNewList.bind(this);
    this.fetchDetailsList = this.fetchDetailsList.bind(this);
    this.switchStateOnClick = this.switchStateOnClick.bind(this);
    this.updateClickCounts = this.updateClickCounts.bind(this);
  }

  updateClickCounts() {
    
  }
  
  switchStateOnClick(chosenUrl) {
    if (this.state.globalState = DEFAULT_STATE) this.setState({globalState: LOG_STATE});
    else this.state.globalState = DEFAULT_STATE;
    this.setState({currentUrl: chosenUrl});
    this.fetchDetailsList(chosenUrl);
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
      console.log(rows);
      this.setState({ specificLogs: rows }) ;
    })
    .catch(e => console.log(e));
  }

  componentDidUpdate() {
    //this.fetchNewList();
  }

  componentDidMount() {
    this.fetchNewList();
    // this.updateClickCounts();
    // this.intervalID = setInterval(this.fetchNewList, 10000);
  }

  componentWillUnmount() {
    // clearInterval(this.intervalID);
  }

  render () {
    let header;
    let dynamicContent;
    if (this.state.globalState === DEFAULT_STATE) {
      header = <h2>My URLs</h2>;
      dynamicContent = this.state.myList.map(item => <LinkBox key={item.short_url} switchStateProp={this.switchStateOnClick} id={item.short_url} linkinfo={item} />);
    } else {
      let clicks = this.state.specificLogs.length;
      let uniqueClicks = new Set(this.state.specificLogs.map(item => item.visitor_id)).size;
      header = (
        <div className='addspace'>
          <h2>URL Logs:</h2>
          <h3>{ 'https://urlshield.io/' + this.state.currentUrl.short_url  + ' -> ' +  this.state.currentUrl.destination_url}</h3>
          <h3>Clicks: {clicks} (unique: {uniqueClicks})</h3>
        </div>
      );
      dynamicContent = this.state.specificLogs.map(item => <RecordBox key={item._id} id={item._id} recordInfo={item} />);
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