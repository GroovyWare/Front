import { useNavigate } from "react-router-dom";
import MemberListCSS from "../pages/MemberList.module.css";


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

            <table className={MemberListCSS.itemContentTb}>
                <tr> 
                    <td className={MemberListCSS.contentText}>{ memCode }</td>
                    <td className={MemberListCSS.contentText}>{ memName }</td>
                    <td className={MemberListCSS.contentText}>{ memPhone }</td>
                    <td className={MemberListCSS.contentText}>{ history[0] && history[0].pass.passType }</td>
                    <td className={MemberListCSS.contentText}>{ history[0] && history[0].pass.passAmount }</td>
                    <td className={MemberListCSS.contentText}>{ memStartDate }</td>
                    <td className={MemberListCSS.contentText}>{ memEndDate }</td>
                </tr>

            </table>
            
        </div>
  
        </>
            );
        }
    
        
export default MemberItem;
            
        
            
     