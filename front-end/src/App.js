import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/Home/home-page'
import { getGameState } from './components/Home/data-layer/data';
function App() {
  
  getGameState();
  
  return (
    <>

    <Routes>
        <Route path='/' element={<HomePage />} />
    </Routes>
    </>
  );
}

export default App;
