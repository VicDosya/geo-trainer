import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Trainer } from './components/Trainer';

function App() {
  return (
    <Routes>
      <Route path='/' element={ <Home /> }></Route>
      <Route path='trainer' element={ <Trainer /> }></Route>
    </Routes>
  );
}

export default App;
