import LoginPage from './pages/LoginPage/LoginPage';
import Crest from './components/crest/Crest';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useParams,
  useLocation
} from "react-router-dom";

function App() {
  return (
    <div>
      <Crest></Crest>
      <LoginPage></LoginPage>
    </div>
  );
}

export default App;
