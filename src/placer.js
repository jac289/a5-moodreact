import React, { Component } from "react";
import { render } from "react-dom";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./keyboard.css";
import "./App.css";
 
class cathy extends Component {
state = {
    layoutName: "default",
    input: ""
  };

  onChange = input => {
    this.setState({
      input: input
    });
    console.log("Input changed", input);
  };

  onKeyPress = button => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  handleShift = () => {
    let layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default"
    });
  };

  onChangeInput = event => {
    let input = event.target.value;
    this.setState(
      {
        input: input
      },
      () => {
        this.keyboard.setInput(input);
      }
    );
  };

  render() {
    return ( 
<div>
     
          <ul className="header">
          <h1>PLACEHOLDER</h1>
          </ul>
      <div class="container">
  <p>PLACEHOLDER!?</p>
  <span class="time-right">11:00</span>
</div>

</div>

      
    );
  }
}
 
render(<cathy/>, document.getElementById("root"));
export default cathy;
