import React, { Suspense }  from "react";
import { Navigate, Route, Routes } from "react-router-dom"


const UserHome = React.lazy(()=> import('./pages/private/Home.jsx'));
const UserLogin = React.lazy(()=> import('./pages/public/Login.jsx'));
const UserRegister = React.lazy(()=> import('./pages/public/Registration.jsx'));
export const AppRoutes=()=>{
    return(
        <>
            <Suspense fallback={<div> Loading ........</div>}>
                <Routes>
                    {/* redirect root "/" to login */}
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route element={<PublicRoute/>}>
                        <Route path="*" element={<Navigate to ="/login" replace/>}/>
                        <Route path="/login" element={<UserLogin />} />
                        <Route path="/register" element={<UserRegister />} />

                    </Route>
                    <Route element={<PrivateRoute/>}>
                        <Route path="/home" element={<UserHome />} />
                    </Route>
                </Routes>
            </Suspense>
        </>
    )
}