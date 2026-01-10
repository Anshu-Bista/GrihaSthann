import { useState } from "react";
import { Header } from "./components/Header";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  return (
    <>
      {/* Header is shared */}
      <Header />

      {/* Routes */}
      {token && role ? (
        <PrivateRoutes
          token={token}
          role={role}
          setToken={setToken}
        />
      ) : (
        <PublicRoutes
          setToken={setToken}
          setRole={setRole}
        />
      )}
    </>
  );
}

export default App;

// import { useEffect } from "react";

// function App() {
//   useEffect(() => {
//     fetch("http://localhost:5000/api/test")
//       .then(res => res.json())
//       .then(data => console.log(data));
//   }, []);

//   return <h1>React + Node Connected</h1>;
// }

// export default App;
