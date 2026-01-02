import { Routes, Route } from 'react-router-dom';

import './App.css'
import { Header } from './components/Header';
import { Registration } from './pages/Registration.jsx';

function App() {
  return(
    <>
      <div className='navbar'>
        <Header/>
      </div>
       <Routes>
        <Route path='/register' element={<Registration/>}/>
      </Routes> 
    </>

  )
}

export default App
