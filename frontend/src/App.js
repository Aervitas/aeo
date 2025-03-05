import LoginPage from './pages/LoginPage/LoginPage';
import Crest from './components/crest/Crest';
import Home from './pages/home/home';
import Main from './pages/main';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import { AuthProvider, useAuth } from './components/AuthContext';
import {HeaderBar} from './components/HeaderBar/HeaderBar';
import Logins from './pages/logins/logins';
import Account from './pages/account/account';

function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <HeaderBar/>
          <div className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route exact path="/login" element={
                <>
                  <LoginPage></LoginPage>
                </>
              } />

              <Route exact path="/home" element={<Home />} />   
              <Route exact path="/brotherLogins" element={<Logins />} />
              <Route exact path="/account" element={<Account />} />
            </Routes>
          </div>
        </div>
      
      </Router>
    </AuthProvider>
  );
}

export default App;
