import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Navbar1 from "../common/Navbar1";
import LayoutCSS from "../layouts/Layout.module.css";
import Header1 from "../common/Header1";



function Layout(){
    return(
            <div className={ LayoutCSS.container }>
                    <Header1/>
                <div className={ LayoutCSS.content}>
                    <Navbar1/>
                    <Outlet className={ LayoutCSS.contentBg }/>
                </div>
            </div>

    )
}

export default Layout;