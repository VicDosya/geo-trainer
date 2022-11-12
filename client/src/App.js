import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Trainer } from './components/Trainer';
import { CapitalTrainer } from './components/CapitalTrainer'
import { ShapeTrainer } from './components/ShapeTrainer';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/trainer' element={<Trainer />}></Route>
      <Route path='/capitaltrainer' element={<CapitalTrainer />}></Route>
      <Route path='/shapetrainer' element={<ShapeTrainer />}></Route>
    </Routes>
  );
}

export default App;
