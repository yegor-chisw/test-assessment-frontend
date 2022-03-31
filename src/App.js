import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MainPage } from './pages/main';
import { PricesPage } from './pages/prices';
import { CheckoutPage } from './pages/checkout';
import { ErrorPage } from './pages/error';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={ <MainPage /> } />
            <Route path="/:tid" element={ <PricesPage /> } />
            <Route path="/:tid/:pid" element={ <CheckoutPage /> } />
            <Route path="*" element={ <ErrorPage /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;