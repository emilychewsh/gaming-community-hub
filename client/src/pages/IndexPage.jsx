import React, { useContext } from 'react';
import NavBar from "../components/Navbar";
import { Outlet } from 'react-router-dom'
import { AppContext } from '../AppContext';

export default function IndexPage() {
    const { user, handleLogout } = useContext(AppContext);

    return (
        <>
            <NavBar/>
            <Outlet />
        </>
    )

}