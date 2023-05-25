import './App.css';
import Home from './components/Home';
import CanvasComp from './components/Canvas';
import { Route, BrowserRouter, Routes} from "react-router-dom";


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>     
      <Route path='/canvas' element={<CanvasComp/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
