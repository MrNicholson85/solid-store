// index.jsx
import './index.css';
import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';
import 'solid-devtools';

import App from './App.jsx';
import Home from './pages/Home.jsx';
import Headphones from './pages/Headphones.jsx';
import Speakers from './pages/Speakers.jsx';
import Earphones from './pages/Earphones.jsx';

render(() => (
  <Router root={App}>
    <Route path="/" component={Home} />
    <Route path="/headphones" component={Headphones} />
    <Route path="/speakers" component={Speakers} />
    <Route path="/earphones" component={Earphones} />
  </Router>
), document.getElementById('root'));
