import { renderIntoDocument } from "react-dom/test-utils";
import ApvNavbarCSS from "./ApvNavbar.module.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function ApvNavbar(){

    return(
    <>
        <div className={ApvNavbarCSS.wrap}>
            <div className={ApvNavbarCSS.navbarDiv}>
                <div>
                    <button><NavLink to="/approval/new" style={{textDecoration : "none"}}>새 결재 진행</NavLink></button>
                    <li>자주 쓰는 양식</li>
                    <div></div>
                    <li style={{marginTop:50, marginBottom:10}}>개인</li>
                        <div className={ApvNavbarCSS.liDiv}>결재 요청</div>
                        <div className={ApvNavbarCSS.liDiv}>결재 대기</div>
                    <li style={{marginTop:50, marginBottom:10}}>부서</li>
                        <div className={ApvNavbarCSS.liDiv}>부서참조함</div>
                </div>
            </div>

    </div>
    </>
    )
}

export default ApvNavbar;