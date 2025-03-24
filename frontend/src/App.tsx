import './App.css';
import Registration from './component/registration';
import Login from './component/login';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Registration />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
