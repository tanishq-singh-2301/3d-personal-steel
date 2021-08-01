import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './views/Home';
import Name from './views/Name';
import Light from './views/Light';
import HauntedHouse from './views/HauntedHouse';
import Points from './views/Points';
import GalaxyGenerator from './views/GalaxyGenerator';
import Review from './views/Review';
import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/"><Home db="db" /></Route>
      <Route path="/name"><Name /></Route>
      <Route path="/light"><Light /></Route>
      <Route path="/hauntedhouse"><HauntedHouse /></Route>
      <Route path="/points"><Points /></Route>
      <Route path="/galaxygenerator"><GalaxyGenerator /></Route>
      <Route path="/review/:page" component={Review} />
    </BrowserRouter>,
  </React.StrictMode>,
  document.getElementById('root')
);
