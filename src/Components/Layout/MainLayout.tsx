import React from 'react'
import {Header} from "../Header/Header";
import {Outlet} from "react-router-dom"

export const MainLayout: React.FC = () => {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}
