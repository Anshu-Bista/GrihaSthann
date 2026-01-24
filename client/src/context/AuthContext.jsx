import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  // Load from localStorage first
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });


  const login = (token, user) => {

    // Save to storage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // Save to state
    setToken(token);
    setUser(user); 
  };


  const logout = () => {
    localStorage.clear();

    setToken(null);
    setUser(null);  
  };


  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
