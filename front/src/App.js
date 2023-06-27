import React from 'react';
import { Routes, Switch, Route } from 'react-router-dom';
import { BrowserRouter} from 'react-router-dom';

import Menu from './components/layout/Menu';
import Header from './components/layout/Header';
import Home from './components/Home';
import Login from './components/Login';
import Inscription from './components/Inscription';

const App = () => {
  return (
      <div className="overflow-hidden">
        <Header />
        <div className="row justify-content-center layout">
          <div className="col-2">
            <Menu />
          </div>
          <div className="col-7">
          <BrowserRouter>
            <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="*" element={<Home/>} />
            <Route path="/inscription" element={<Inscription/>} />
            <Route path="/login" element={<Login/>} />
            </Routes>
          </BrowserRouter>
          </div>
          <div className="col-3 position-relative">
            Salut
            <button className="btn btn-primary position-absolute bottom-0 end-0 m-3">
              Mon bouton
            </button>
          </div>
        </div>
      </div>
  );
}

export default App;
