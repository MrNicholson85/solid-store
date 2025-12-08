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

// Product Pages
import Zx9Speaker from './pages/products/Zx9Speaker.jsx';
import Zx7Speaker from './pages/products/Zx7Speaker.jsx';

render(() => (
  <Router root={App}>
    <Route path="/" component={Home} />
    <Route path="/headphones" component={Headphones} />
    <Route path="/speakers" component={Speakers} />
    <Route path="/earphones" component={Earphones} />
    
    {/* Individual Product Pages */}
    <Route path="/speakers/zx9-speaker" component={Zx9Speaker} />
    <Route path="/speakers/zx7-speaker" component={Zx7Speaker} />
  </Router>
), document.getElementById('root'));
