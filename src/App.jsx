import { Routes, Route } from 'react-router-dom';

import './App.css'
import { Header } from './components/Header';

function App() {
  return(
    <>
      <div className='navbar'>
        <Header/>
      </div>
      {/* <Routes>
        <Route path='/' element={<Register/>}/>
      </Routes> */}
    </>

  )
}

export default App
