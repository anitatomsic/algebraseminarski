import React, { Component } from 'react';
import './App.css';
import Messages from "./Messages";
import Input from "./Input";
import getAvatar from './services/getAvatar';

function randomName() {
  const adjectives = [
    "lukava", "spretna", "pametna", "mlada", "mala", "velika", "mudra", "vesela",
    "smiješna", "mokra", "luda", "otkačena", "tužna", "pokisla", "visoka", "draga", "stara",
    "strpljiva", "hladna", "ponosna", "dražesna", "sramežljiva", "plaha", "crvena",
    "crna", "žuta", "zelena", "plava", "smrznuta", "duga"
  ];
  const nouns = [
    "lisica", "mačka", "koka", "mama", "mišica", "kora", "sova", "žaba",
    "riba", "krpa", "teta", "kornjača", "vrba", "faca", "žirafa", "prijateljica",
    "baba", "mišica", "ptica", "voda", "magla", "šuma", "srna", "zvijezda",
    "rupa", "ruža", "trava", "tišina", "vidra", "tikva"
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

class App extends Component {

  state = {
    messages: [],
    member: {
      username: randomName(),
      bckg: getAvatar()
    }
  }
  
  componentDidMount() {
    this.initializeDrone();
  }

    initializeDrone = () => {
    
    if (this.drone) return; 

    this.drone = new window.Scaledrone("ivmZz3dyb6p8gWqX", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });
  };

   render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Moja Chat Aplikacija</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input
          onSendMessage={this.onSendMessage}
        />
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

}

export default App;