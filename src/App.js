import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import bob from "./bob";
import cathy from "./cathy";
import sam from "./sam";
import placer from "./placer";
import Slider from "./Slider";
import './App.css';
import {faSmileBeam} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {faCog} from "@fortawesome/free-solid-svg-icons";
import {faInfo} from "@fortawesome/free-solid-svg-icons";





class AppIt extends React.Component {
 
  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.app)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const { location } = this.props;
    const isApp = !!(
      location.state &&
      location.state.app &&
      this.previousLocation !== location
    ); 
    return (
      <div>
        <Switch location={isApp ? this.previousLocation : location}>
   <Route exact path="/" component={Home} />
          <Route path="/chat" component={cathy} />
          <Route path ="/gallery" component = {Gallery}/>
          <Route path="/Slider" component={Slider} />
          <Route path ="/placer" component= {placer}/>
        </Switch>
        {isApp ? <Route path="/img/:id" component={App} /> : null}
      </div>
    );
  }
}
const STUFF = [
{ id: 0, title: "Dark Orchid", color: "DarkOrchid" },
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

const Stuff = ({ color }) => (
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
    <td ><Link to="/slider"><h2> Slider </h2></Link></td> 
  </tr>
  <tr>
   <td width = "100%"> <li> <button class ="button button4"> <Link to="/chat"><span style={{alignSelf:'flex-end',padding: 20}}><FontAwesomeIcon icon= {faSmileBeam} size ="3x"/></span>Bob</Link></button></li></td>
 <td> </td> <td> </td>
    <td> <p align ="right"> 2/1/19 6:30 PM  </p> </td>
 </tr>
  <tr>
    <td>

<li>
<button class ="button button4"> <Link to="chat"><span style={{alignSelf:'flex-end',padding: 20}}><FontAwesomeIcon icon= {faSmileBeam} size ="3x"/></span> Cathy</Link></button> </li></td> 
<td> </td> <td> </td>
<td> <p align = "right"> 1/31/19 12:00 PM </p> </td> </tr> 
   <tr>
<td>
      <li>
       <button class ="button button4"> <Link to="chat"><span style={{alignSelf:'flex-end',padding: 20}}><FontAwesomeIcon icon= {faSmileBeam} size ="3x"/></span> Sam</Link></button> </li></td> 
     <td> </td> <td> </td>
   <td> <p align = "right"> 1/30/19 9:00 PM </p> </td>
</tr>
   
      </table>
      </ul>
  <ul className = "footer">
 <table>


        
           <tr>
          <td> <Link to="/placer"><h3 align = "middle" ><FontAwesomeIcon icon= {faHome} size ="4x" /> </h3></Link></td>
          <td><Link to="./placer"><h3 align = "middle" > <FontAwesomeIcon icon= {faUserCircle} size ="4x" /> </h3> </Link> </td>
          <td> <Link to="./placer"><h3 align = "middle" ><FontAwesomeIcon icon= {faPlusSquare} size ="4x" /> </h3> </Link></td>
          <td> <Link to="./placer"><h3 align = "middle" ><FontAwesomeIcon icon= {faCog} size ="4x" /></h3></Link>  </td>
           </tr> 
          
</table>
</ul>
</div>
);



const Gallery= () => (
  <div>
    {STUFF.map(i => (
      <Link
        key={i.id}
        to={{
          pathname: `/stuff`,
          state: { modal: true }
        }}
      >
        <Thumbnail color={i.color} />
        <p>{i.title}</p>
      </Link>
    ))}
  </div>
);
const ImageView= ({ match }) => {
    const stuff = STUFF[parseInt(match.params.id, 10)];
  if (!stuff) {
    return <div> not found</div>;
  }

  return (
    <div>
      <h1>{stuff.title}</h1>
    </div>
  );
};

const App = ({ match, history }) => {
  const stuff = STUFF[parseInt(match.params.id, 10)];
  if (!stuff) {
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
        className="app"
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
        <h1>{stuff.title}</h1> 
        <button type="button" onClick={back}>
          Close
        </button>
      </div>
    </div>
  );
};

const AppDeploy = () => (
  <Router>
    <Route component={AppIt} />
  </Router>
);

export default AppDeploy;
