
import React, { Component } from "react";
import { render } from "react-dom";
import { MDBRow, MDBContainer, MDBCard, MDBCol, MDBCardBody, MDBCardTitle, MDBCardImage, MDBIcon} from "mdbreact";
import Slider from 'react-rangeslider';
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./keyboard.css";
import "./App.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSmileBeam} from "@fortawesome/free-solid-svg-icons";
import {faFrown} from "@fortawesome/free-solid-svg-icons";
 
class cathy extends Component {
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
          <h1>Friend</h1>
          </ul>
      <div class="container">
  <p align = "center" > How Are You Feeling?</p>
</div>
<div>

                    <div className="my-5">
      <input type="range" className="custom-range" id="customRange1" />
        <table>
 <td> <h4 align = "left" ><FontAwesomeIcon icon= {faFrown} size ="4x" /> </h4></td>
          <td><h4 align = "middle" > </h4>  </td>
          <td> <h4 align = "middle" > </h4> </td>
          <td> <h4 align = "right" ><FontAwesomeIcon icon= {faSmileBeam} size ="4x" /></h4>  </td>
</table>

    </div>

        <input
          value={this.state.input}
          placeholder={"Start checking up on your friend!"}
          onChange={e => this.onChangeInput(e)}
        />
        <Keyboard
          ref={r => (this.keyboard = r)}
          layoutName={this.state.layoutName}
          onChange={input => this.onChange(input)}
          onKeyPress={button => this.onKeyPress(button)}
        />
      </div>
</div>

      
    );
  }
}
 
render(<cathy/>, document.getElementById("root"));
export default cathy;
