import NavBar from "../components/Navbar";
import { Outlet } from 'react-router-dom'

export default function IndexPage({ user, handleLogout }) {
    
    return (
        <>
            <NavBar user={user} handleLogout={handleLogout}/>
            <Outlet />
        </>
    )

}