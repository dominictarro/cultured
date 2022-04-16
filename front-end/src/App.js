import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/Home/home-page'

function App() {
  return (
    <>

    <Routes>
        <Route path='/' element={<HomePage />} />
    </Routes>
    </>
  );
}

export default App;
