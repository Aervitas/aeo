import LoginPage from './pages/LoginPage/LoginPage';
import Crest from './components/crest/Crest';
import Home from './pages/home/home';
import Main from './pages/main';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { AuthProvider } from './components/AuthContext';
import {HeaderBar} from './components/HeaderBar/HeaderBar';

function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <HeaderBar/>
          <div className="content">
            <Routes>
              <Route exact path="/" element={ <Main />} />
              <Route exact path="/login" element={
                <>
                  <LoginPage></LoginPage>
                </>
              } />
              <Route exact path="/home" element={<Home />} />   
            </Routes>
            <Crest></Crest>
          </div>
        </div>
      
      </Router>
    </AuthProvider>
  );
}

export default App;
