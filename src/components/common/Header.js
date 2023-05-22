import HeaderCSS from "./Header.module.css";
import logo from "../common/img/logo.png";

function Header() {
    return (
        <div className={ HeaderCSS.container }>
           <div className={ HeaderCSS.logoDiv }>
             <img src={ logo } alt={ logo }className={ HeaderCSS.logo }/>
           </div>
           <div className={ HeaderCSS.titleDiv }>
             <div className={ HeaderCSS.text1 }>groovy</div>
             <div className={ HeaderCSS.text2 }>groupware</div>
           </div>
        </div>
    )
}

export default Header;