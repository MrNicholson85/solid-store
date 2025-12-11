// index.jsx
import './index.css';
import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';
import 'solid-devtools';

// Layout and Pages
import App from './App.jsx';
import Home from './pages/Home.jsx';
import HeadphonesFromDB from './pages/HeadphonesFromDB.jsx';
import SpeakersFromDB from './pages/SpeakersFromDB.jsx';
import EarphonesFromDB from './pages/EarphonesFromDB.jsx';

// Product Pages
import DynamicProduct from './pages/products/DynamicProduct.jsx';

// Checkout
import Checkout from './pages/Checkout.jsx';

// Admin Pages
import Login from './pages/admin/Login.jsx';
import Signup from './pages/admin/Signup.jsx';
import Profile from './pages/admin/Profile.jsx';
import CreateProduct from './pages/admin/CreateProduct.jsx';
import ManageProducts from './pages/admin/ManageProducts.jsx';
import EditProduct from './pages/admin/EditProduct.jsx';

// Render the application
render(() => (
  <Router root={App}>
    <Route path="/" component={Home} />
    <Route path="/headphones" component={HeadphonesFromDB} />
    <Route path="/speakers" component={SpeakersFromDB} />
    <Route path="/earphones" component={EarphonesFromDB} />
    
    {/* Dynamic Product Page */}
    <Route path="/products/:id" component={DynamicProduct} />
    
    {/* Checkout */}
    <Route path="/checkout" component={Checkout} />
    
    {/* Admin Routes */}
    <Route path="/admin/login" component={Login} />
    <Route path="/admin/signup" component={Signup} />
    <Route path="/admin/profile" component={Profile} />
    <Route path="/admin/products" component={CreateProduct} />
    <Route path="/admin/manage-products" component={ManageProducts} />
    <Route path="/admin/products/edit/:id" component={EditProduct} />
  </Router>
), document.getElementById('root'));
