// import { Routes, Route } from 'react-router-dom';

// import './App.css'
// import { Header } from './components/Header';
// import { Registration } from './pages/Registration.jsx';
// import { Login } from './pages/Login.jsx';

// function App() {
//   return(
//     <>
//       <div className='navbar'>
//         <Header/>
//       </div>
//        <Routes>
//         <Route path='/register' element={<Registration/>}/>
//         <Route path='/login' element={<Login/>}/>
//       </Routes> 
//     </>

//   )
// }

// export default App

import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);

  return <h1>React + Node Connected</h1>;
}

export default App;
