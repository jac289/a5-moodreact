import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import bob from "./bob";
import cathy from "./cathy";
import sam from "./sam";
import './App.css';
import {faSmileBeam} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {faCog} from "@fortawesome/free-solid-svg-icons";
import {faInfo} from "@fortawesome/free-solid-svg-icons";





class ModalSwitch extends React.Component {
 
  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const { location } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    ); 
    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path="/" component={Home} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/img/:id" component={ImageView} />
        </Switch>
        {isModal ? <Route path="/img/:id" component={Modal} /> : null}
      </div>
    );
  }
}

const IMAGES = [
  { id: 0, title: "Dark Orchid", color: "DarkOrchid" },
  { id: 1, title: "Lime Green", color: "LimeGreen" },
  { id: 2, title: "Tomato", color: "Tomato" },
  { id: 3, title: "Seven Ate Nine", color: "#789" },
  { id: 4, title: "Crimson", color: "Crimson" }
];

const Thumbnail = ({ color }) => (
  <div
    style={{
      width: 50,
      height: 50,
      background: color
    }}
  />
);

const Image = ({ color }) => (
  <div
    style={{
      width: "100%",
      height: 400,
      background: color
    }}
  />
);

const Home = () => (
  <div>
  <ul className = "header">
  <h1>Home</h1>
    <Link to="./index.html"> <h4 align = "right"> <FontAwesomeIcon icon= {faInfo} size = "3x"/> </h4> </Link>
          </ul>
<ul className = "pretty">
          <table>

  <tr>
    <td width = "20"><h2> Messages </h2></td><td> <h5> </h5> </td> <td> <h5> </h5> </td> 
    <td ><Link to="./index.html"><h2> Slider </h2></Link></td> 
  </tr>
  <tr>
   <td width = "100%"> <li> <button class ="button button4"> <Link to="/gallery"><span style={{alignSelf:'flex-end',padding: 20}}><FontAwesomeIcon icon= {faSmileBeam} size ="3x"/></span>Bob</Link></button></li></td>
 <td> </td> <td> </td>
    <td> <p align ="right"> 2/1/19 6:30 PM  </p> </td>
 </tr>
  <tr>
    <td>

<li>
<button class ="button button4"> <Link to="/cathy"><span style={{alignSelf:'flex-end',padding: 20}}><FontAwesomeIcon icon= {faSmileBeam} size ="3x"/></span> Cathy</Link></button> </li></td> 
<td> </td> <td> </td>
<td> <p align = "right"> 1/31/19 12:00 PM </p> </td> </tr> 
   <tr>
<td>
      <li>
        <button class ="button button4"> <Link to="./index.html"><span style={{alignSelf:'flex-end',padding: 20}}><FontAwesomeIcon icon= {faSmileBeam} size ="3x"/></span>Sam</Link></button></li></td>
     <td> </td> <td> </td>
   <td> <p align = "right"> 1/30/19 9:00 PM </p> </td>
</tr>
   
      </table>
      </ul>
  <ul className = "footer">
 <table>


        
           <tr>
          <td> <Link to="./index.html"><h3 align = "middle" ><FontAwesomeIcon icon= {faHome} size ="4x" /> </h3></Link></td>
          <td><Link to="./index.html"><h3 align = "middle" > <FontAwesomeIcon icon= {faUserCircle} size ="4x" /> </h3> </Link> </td>
          <td> <Link to="./index.html"><h3 align = "middle" ><FontAwesomeIcon icon= {faPlusSquare} size ="4x" /> </h3> </Link></td>
          <td> <Link to="./index.html"><h3 align = "middle" ><FontAwesomeIcon icon= {faCog} size ="4x" /></h3></Link>  </td>
           </tr> 
          
</table>
</ul>
</div>
);


const Gallery = () => (
  <div>
    {IMAGES.map(i => (
      <Link
        key={i.id}
        to={{
          pathname: `/img/${i.id}`,
          // this is the trick!
          state: { modal: true }
        }}
      >
        <Thumbnail color={i.color} />
        <p>{i.title}</p>
      </Link>
    ))}
  </div>
);

const ImageView = ({ match }) => {
    const image = IMAGES[parseInt(match.params.id, 10)];
  if (!image) {
    return <div>Image not found</div>;
  }

  return (
    <div>
      <h1>{image.title}</h1>
      <Image color={image.color} />
    </div>
  );
};

const Modal = ({ match, history }) => {
  const image = IMAGES[parseInt(match.params.id, 10)];
  if (!image) {
    return null;
  }
  const back = e => {
    e.stopPropagation();
    history.goBack();
  };
  return (
    <div
      onClick={back}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: "rgba(0, 0, 0, 0.15)"
      }}
    >
      <div
        className="modal"
        style={{
          position: "absolute",
          background: "#fff",
          top: 25,
          left: "10%",
          right: "10%",
          padding: 15,
          border: "2px solid #444"
        }}
      >
        <h1>{image.title}</h1>
        <Image color={image.color} />
        <button type="button" onClick={back}>
          Close
        </button>
      </div>
    </div>
  );
};

const ModalGallery = () => (
  <Router>
    <Route component={ModalSwitch} />
  </Router>
);

export default ModalGallery;
