import React from 'react';
import { Routes, Switch, Route } from 'react-router-dom';
import { BrowserRouter} from 'react-router-dom';
import { useContext } from 'react';

import Menu from './components/layout/Menu';
import Header from './components/layout/Header';
import Home from './components/Home';
import Login from './components/Login';
import Inscription from './components/Inscription';
import Guides from './components/guides/Guides';
import Formations from './components/formations/Formations';
import Calendrier from './components/calendrier/Calendrier';
import { UserContext } from './useContext/UserContext';
const App = () => {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="row justify-content-center layout">
          <div className="col-2">
            <Menu />
          </div>
          <div className="col-10">
        
            <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="*" element={<Home/>} />
            <Route path="/inscription" element={<Inscription/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/guides" element={<Guides/>} />
            <Route path="/formation" element={<Formations/>} />
            </Routes>
          </div>

        
        </div>
      </div>
      </BrowserRouter>

  );
}

export default App;
