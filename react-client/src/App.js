import React, { Component } from 'react';
import './App.css';
import socketIOClient from 'socket.io-client';

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:3000"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.emit('customevent', { data: 'some sample data' });
    socket.on("FromAPI", data => {
      this.setState({ response: data.data })
    });
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          The current time from socket backend is <b>{this.state.response}</b>.
        </p>
      </div>
    );
  }
}

export default App;
