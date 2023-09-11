import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppContextProvider from './contexts/AppContext';
import CustomerCheckoutPage from './pages/CustomerCheckoutPage';
import CustomerOrderDetailPage from './pages/CustomerOrderDetailPage';
import CustomerOrdersPage from './pages/CustomerOrdersPage';
import SellerOrdersPage from './pages/SellerOrdersPage';
import CustomerProductsPage from './pages/CustomerProductsPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SellerOrderDetailPage from './pages/SellerOrderDetailPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <AppContextProvider>
        <Routes>
          <Route exact path="/" element={ <LandingPage /> } />
          <Route exact path="/login" element={ <LoginPage /> } />
          <Route exact path="/register" element={ <RegisterPage /> } />
          <Route exact path="/customer/products" element={ <CustomerProductsPage /> } />
          <Route exact path="/customer/checkout" element={ <CustomerCheckoutPage /> } />
          <Route exact path="/customer/orders" element={ <CustomerOrdersPage /> } />
          <Route exact path="/seller/orders" element={ <SellerOrdersPage /> } />
          <Route exact path="/admin/manage" element={ <AdminPage /> } />
          <Route
            exact
            path="/customer/orders/:id"
            element={ <CustomerOrderDetailPage /> }
          />
          <Route
            exact
            path="/seller/orders/:id"
            element={ <SellerOrderDetailPage /> }
          />
        </Routes>
      </AppContextProvider>
    </Router>
  );
}

export default App;
