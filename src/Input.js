import {Component} from "react";
import React from "react";

class Input extends Component {
  
  state = {
    text: ""
  }

  onChange(e) {
    this.setState({text: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({text: ""});
    if (this.state.text.trim() === '') {
      alert("Poruka je prazna, unesite tekst.");
    } else {
      this.props.onSendMessage(this.state.text);
    }
  }

  render() {
    return (
      <div className="Input">
        <form onSubmit={e => this.onSubmit(e)}>
          <input
            onChange={e => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Napiši poruku i stisni ENTER"
            autoFocus={true}
            name="unos"
          />
          <button>Pošalji</button>
        </form>
      </div>
    );
  }
}

export default Input;