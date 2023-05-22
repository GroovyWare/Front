import logo from "../common/img/logo.png";
import HeaderCSS from "./Header1.module.css";

function Header1() {
    
    

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

export default Header1;