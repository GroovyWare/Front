import HeaderCSS from "./Header.module.css";

function Header(){
    return(
            <div className={HeaderCSS.headerDiv}>
                <div>
                    <img className={HeaderCSS.logoImg} src="images/Group 35.png"/>
                </div>
            </div>
    )
}

export default Header;