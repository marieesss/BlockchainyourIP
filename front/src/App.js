import React from 'react';
import { Routes, Switch, Route } from 'react-router-dom';
import { BrowserRouter} from 'react-router-dom';

import Menu from './components/layout/Menu';
import Header from './components/layout/Header';
import Home from './components/Home';
import Login from './components/Login';
import Inscription from './components/Inscription';
import Guides from './components/Guides';
import Formations from './components/Formations';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="row justify-content-center layout">
          <div className="col-2">
            <Menu />
          </div>
          <div className="col-9">
        
            <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="*" element={<Home/>} />
            <Route path="/inscription" element={<Inscription/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/guides" element={<Guides/>} />
            <Route path="/formation" element={<Formations/>} />
            </Routes>
          </div>
            <div class="col-1">
            </div>
        
        </div>
      </div>
      </BrowserRouter>

  );
}

export default App;
