import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import './index.css';
import App from './App';
import { Logo } from './components/Logo';
import GameOfLife from './components/GameOfLife/src/App.js';
import WeatherApp from './components/WeatherApp/src/App.js';

import registerServiceWorker from './registerServiceWorker';


// class WeatherApp extends Component {
//   render() {
//     return (
//       <div>
//         <h1>This is the Weather App!</h1>
//       </div>
//     );
//   }
// }

class FullStackApps extends Component {
  render() {
    return (
      <div>
        <h1>These are the Full Stack Applications!</h1>
      </div>
    )
  }
}

const componentRoutingInfo = [
  { text: "Game Of Life", component: GameOfLife, path: "gameoflife" },
  { text: "Weather App", component: WeatherApp, path: "weatherapp" },
  { text: "Full Stack Applications", component: FullStackApps, path: "fullstackapps" },
]

// Presentational component
class ComponentLink extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Link to={"/" + this.props.path}>{this.props.text}</Link>
      </div>
    );
  }
}
class ComponentRoute extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Route path={"/" + this.props.path} component={this.props.component}/>
      </div>
    );
  }
}


class Navigation extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <ul>
          {this.props.componentRoutingInfo.map(link => <li><ComponentLink path={link.path} text={link.text} component={link.component}/></li> )}
        </ul>
      </div>
    );
  }
}

const routes = componentRoutingInfo.map(link => 
  <ComponentRoute path={link.path} component={link.component} />
)

ReactDOM.render(
  <BrowserRouter className="App">
    <div>
      <Logo />
      <Navigation componentRoutingInfo={componentRoutingInfo}/>
      {routes}
    </div>
  </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();
