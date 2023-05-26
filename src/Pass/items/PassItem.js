import { useNavigate } from "react-router-dom";
import PassCSS from "../pages/Pass.module.css";
import modifyBtn from "../../Pass/img/modifyBtn.svg";


function PassItem({ pass : { passCode, passAmount, passEtc, passType, passPrice} }) {

    const navigate = useNavigate();

    const onClickPassHandler = () => {
        navigate(`modify/${passCode}`)
    }

    return(
        <>
        <div className={PassCSS.contentWrapRg}>
            <div className={PassCSS.contentDivTitle}> 
                <div className={PassCSS.contentTextRg}>
                    <div className={PassCSS.textRg}>번호</div>
                    <div className={PassCSS.textRg}>{ passCode }</div>  
                </div>
                <div className={PassCSS.contentTextRg}>
                    <div className={PassCSS.textRg}>종류</div>
                    <div className={PassCSS.textRg}>{ passType }</div>
                </div>
                <div className={PassCSS.contentTextRg}>
                    <div className={PassCSS.textRg}>가격</div>
                    <div className={PassCSS.textRg}>{ passPrice }</div>
                </div>
                <div className={PassCSS.contentTextRg}>
                    <div className={PassCSS.textRg}>횟수</div>
                    <div className={PassCSS.textRg}>{ passAmount }</div>
                </div>
                <div className={PassCSS.contentTextRg}>
                    <div className={PassCSS.textRg}>비고</div>
                    <div className={PassCSS.textRg}>{ passEtc}</div>
                </div>
                <div className={PassCSS.modifyBtn}>
                    <button><img src={ modifyBtn } alt={ modifyBtn } onClick={ () => onClickPassHandler(passCode) } />
                    </button>
                </div>
            </div>


        </div>
            
        </>
    );



}

export default PassItem;