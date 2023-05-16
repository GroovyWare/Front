import SelectCSS from "./Select.module.css";

function SelectReader(){

    return(
        <>
            <div className={SelectCSS.wrap}>
                <div className={SelectCSS.title}>
                    열람권자
                </div>
            </div>
        </>
    )
}

export default SelectReader;