import PassItem from "../items/PassItem";

function PassList({passLists}) {

    return(
        <>
            <div>
                {
                    Array.isArray(passLists) 
                    && passLists.map(pass => <PassItem key={ pass.passCode } pass={pass}/>)
                }
            </div> 

        </>        
    );

}

export default PassList;