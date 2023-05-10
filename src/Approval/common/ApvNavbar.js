import ApvNavbarCSS from "./ApvNavbar.module.css";

function ApvNavbar(){
    return(
    <>
        <div className={ApvNavbarCSS.navbarDiv}>
            <div>
                <button>새 결재 진행</button>
                <li>자주 쓰는 양식</li>
                <div></div>
                <li style={{marginTop:50, marginBottom:10}}>개인</li>
                    <div className={ApvNavbarCSS.liDiv}>결재 요청</div>
                    <div className={ApvNavbarCSS.liDiv}>결재 대기</div>
                <li style={{marginTop:50, marginBottom:10}}>부서</li>
                    <div className={ApvNavbarCSS.liDiv}>부서참조함</div>
            </div>
        </div>

        <div className={ApvNavbarCSS.centerDiv}>
                dfad
                fasdfadfsa
                asdfasdfasd
                asdfafdsfa
                adfasdfadsfads
        </div>
    </>
    )
}

export default ApvNavbar;