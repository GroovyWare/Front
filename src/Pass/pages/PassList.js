import PassItem from "../items/PassItem";
import PassModify from "./PassModify";

function PassList({passLists}) {

    return(
        <>
            <div>
                {
                    Array.isArray(passLists.data) 
                    && passLists.data.map(pass => <PassItem key={ pass.passCode } pass={pass}/>)
                }
            </div> 

        </>        
    );

}

export default PassList;