import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Navbar from "../common/Navbar";
import LayoutCSS from "../layouts/Layout.module.css";



function Layout(){
    return(
            <div className={ LayoutCSS.container }>
                    <Header/>
                <div className={ LayoutCSS.content}>
                    <Navbar/>
                    <div className={ LayoutCSS.contentBg }>
                        <Outlet/>
                    </div>
                </div>
            </div>

    )
}

export default Layout;