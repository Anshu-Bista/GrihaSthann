import { Routes, Route } from 'react-router-dom';

import './App.css'
import { Header } from './components/Header';
import { Registration } from './pages/Registration.jsx';
import { Login } from './pages/Login.jsx';

function App() {
  return(
    <>
      <div className='navbar'>
        <Header/>
      </div>
       <Routes>
        <Route path='/register' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes> 
    </>

  )
}

export default App
