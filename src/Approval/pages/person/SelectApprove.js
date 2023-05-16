import SelectCSS from "./Select.module.css";

function SelectApprove(){

    return(
        <>
            <div className={SelectCSS.wrap}>
                <div className={SelectCSS.title}>
                    결재권자
                </div>
            </div>
        </>
    )
}

export default SelectApprove;