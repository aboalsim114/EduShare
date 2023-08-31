import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PrivateRoute from "./utils/PrivateRoute"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Connexion from './Composants/Connexion/Connexion.jsx';
import Profile from './Composants/Profile/Profile.jsx';
import Inscription from './Composants/Inscription/Inscription.jsx';
import Logout from './Composants/Logout/Logout.jsx';
import Cours from './Composants/Cours/Cours.jsx';
import Cour from './Composants/Cours/Cour/Cour.jsx';
import Dashboard from './Composants/Admin/Dashboard.jsx';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Router>
     
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route path='/connexion' element={<Connexion />}  />
          <Route path='/inscription' element={<Inscription />}  />
          <Route element={<PrivateRoute/>}>
          <Route path='/profile/:userid' element={<Profile />}  />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/cours/:userid" element={<Cours />} />
          <Route path="/cour/:cour_id" element={<Cour />} />
          <Route path="/admin/:userid" element={<Dashboard />} />
          </Route>

       </Routes>
      
    </Router>
  </React.StrictMode>
);


reportWebVitals();
