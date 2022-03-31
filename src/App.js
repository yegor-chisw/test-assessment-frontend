import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import { MainPage } from './pages/main';
import { ErrorPage } from './pages/error';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={ <MainPage /> } />
            <Route path="*" element={ <ErrorPage /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
