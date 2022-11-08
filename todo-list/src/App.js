
import './App.css';
import Dashboard from './pages/Dashboard';
import NavBar from './components/NavBar';
import ActivityDetail from './pages/ActivityDetail';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
         
          <Route path='/detail/:detailId' element={
            <ActivityDetail />} />
             <Route path='/' element={
            <Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
