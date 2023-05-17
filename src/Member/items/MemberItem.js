import { useNavigate } from "react-router-dom";
import MemberCSS from "./MemberItem.module.css"


function MemberItem({ member : { memCode, memName, memPhone, memStartDate, memEndDate, 
    history} }) {
    
    const navigate = useNavigate();

    const onClickMemberHandler = () => {
        navigate(`detail/${memCode}`)
    }

    return(
        <>

        <div
        onClick={ () => onClickMemberHandler(memCode) }
        >
            <div className={ MemberCSS.listDiv }>
                <tr> 
                <div className={ MemberCSS.contentWrap }>  
                    <div><th>{ memCode }</th></div>
                    <div><th>{ memName }</th></div>
                    <div><th>{ memPhone }</th></div> 
                    <div><th>{ history[0] && history[0].pass.passType }</th></div>
                    <div><th>{ history[0] && history[0].pass.passAmount }</th></div>
                    <div><th>{ memStartDate }</th></div>
                    <div><th>{ memEndDate }</th></div>
                </div>
                </tr>
            </div>
        
        </div>
        </>
            );
        }
    
        
export default MemberItem;
            
     