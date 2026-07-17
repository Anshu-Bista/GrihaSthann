import { Toaster } from "react-hot-toast";
import { AppRoutes } from "./AppRoutes.jsx";
function App() {
    return(
        <>
         <Toaster position="top-right" />
        <AppRoutes/>
        </>
    )
    
}

export default App;
