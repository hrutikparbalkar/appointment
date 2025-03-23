import { createContext,useState,useEffect, useContext } from "react";
export const AuthContext = createContext();
export const AuthProvider=({children})=>{
    const intialUser = localStorage.getItem('user');
    const doctorLginData = localStorage.getItem('doctor');
    const adminLoginData = localStorage.getItem('admin')
    const [doctorInfo,setDoctorInfo]=useState(
        doctorLginData?JSON.parse(doctorLginData):null
    )
    const [authUser,setAuthUser] =useState(
        intialUser?JSON.parse(intialUser):null
    );
    const [adminUser,setAdminUser] =useState(
        adminLoginData?JSON.parse(adminLoginData):null
    );
    // console.log(doctorInfo);
    // console.log(adminUser);
    useEffect(() => {
        const interval = setInterval(() => {
          const storedAdmin = localStorage.getItem("admin");
          setAdminUser(storedAdmin ? JSON.parse(storedAdmin) : null);
        }, 1000);  // Check every 500ms
      
        return () => clearInterval(interval);  // Cleanup on unmount
      }, []);
      
    
    return (
        <AuthContext.Provider value={[authUser,setAuthUser,doctorInfo,setDoctorInfo,adminUser,setAdminUser]}>
            {children}
        </AuthContext.Provider>
    )

}
export const useAuth = ()=>useContext(AuthContext);