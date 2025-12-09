// index.jsx
import './index.css';
import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';
import 'solid-devtools';

import App from './App.jsx';
import Home from './pages/Home.jsx';
import Headphones from './pages/Headphones.jsx';
import HeadphonesFromDB from './pages/HeadphonesFromDB.jsx';
import Speakers from './pages/Speakers.jsx';
import SpeakersFromDB from './pages/SpeakersFromDB.jsx';
import Earphones from './pages/Earphones.jsx';
import EarphonesFromDB from './pages/EarphonesFromDB.jsx';

// Product Pages
import Zx9Speaker from './pages/products/Zx9Speaker.jsx';
import Zx7Speaker from './pages/products/Zx7Speaker.jsx';
import DynamicProduct from './pages/products/DynamicProduct.jsx';

// Admin Pages
import Login from './pages/admin/Login.jsx';
import Signup from './pages/admin/Signup.jsx';
import Profile from './pages/admin/Profile.jsx';
import CreateProduct from './pages/admin/CreateProduct.jsx';
import ManageProducts from './pages/admin/ManageProducts.jsx';
import EditProduct from './pages/admin/EditProduct.jsx';

render(() => (
  <Router root={App}>
    <Route path="/" component={Home} />
    <Route path="/headphones" component={HeadphonesFromDB} />
    <Route path="/speakers" component={SpeakersFromDB} />
    <Route path="/earphones" component={EarphonesFromDB} />
    
    {/* Dynamic Product Page */}
    <Route path="/products/:id" component={DynamicProduct} />
    
    {/* Static Product Pages (fallback) */}
    <Route path="/speakers/zx9-speaker" component={Zx9Speaker} />
    <Route path="/speakers/zx7-speaker" component={Zx7Speaker} />
    
    {/* Admin Routes */}
    <Route path="/admin/login" component={Login} />
    <Route path="/admin/signup" component={Signup} />
    <Route path="/admin/profile" component={Profile} />
    <Route path="/admin/products" component={CreateProduct} />
    <Route path="/admin/manage-products" component={ManageProducts} />
    <Route path="/admin/products/edit/:id" component={EditProduct} />
  </Router>
), document.getElementById('root'));
