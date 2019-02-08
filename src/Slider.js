
import React, { Component } from "react";
import { render } from "react-dom";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./keyboard.css";
import "./App.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSmileBeam} from "@fortawesome/free-solid-svg-icons";
import {faFrown} from "@fortawesome/free-solid-svg-icons";
 
class Slider extends Component {
constructor(props, context) {
    super(props, context)
    this.state = {
      volume: 0
    }
  }
 
  handleOnChange = (value) => {
    this.setState({
      volume: value
    })
  }
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
    let { volume } = this.state
    return ( 
<div>
     
          <ul className="header">
          <h1>Toggle the Slider to Track Your Emotions</h1>
          </ul>
      <div class="container">
<h3 align = "middle" > </h3> 
<div>

                    <div className="my-5">
      <label htmlFor="customRange1">How Are You Feeling?</label>
      <input type="range" className="custom-range" id="customRange1" />
    </div>
  <table>
 <td> <h4 align = "left" ><FontAwesomeIcon icon= {faFrown} size ="4x" /> </h4></td>
          <td><h4 align = "middle" > </h3>  </td>
          <td> <h4 align = "middle" > </h3> </td>
          <td> <h4 align = "right" ><FontAwesomeIcon icon= {faSmileBeam} size ="4x" /></h4>  </td>
</table>
</div>
      </div>
</div>

      
    );
  }
}
 
render(<Slider/>, document.getElementById("root"));
export default Slider;