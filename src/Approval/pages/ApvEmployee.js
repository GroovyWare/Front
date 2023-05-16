import { useEffect, useState } from 'react';
import ApvEmployeeCSS from './ApvEmployee.module.css';
import Head from './employeeList/Head';
import Fitness from './employeeList/Fitness';
import Filates from './employeeList/Filates';
import GX from './employeeList/GX';
import Info from './employeeList/Info';

function ApvEmployee(){

    return(
        <>
            <div className={ApvEmployeeCSS.wrap}>
                <div className={ApvEmployeeCSS.emp}>
                    <input
                        type="text"
                        placeholder='이름/사원번호'
                        className={ApvEmployeeCSS.textbox}
                    />
                    <Head/>
                    <Fitness/>
                    <Filates/>
                    <GX/>
                    <Info/>
                </div>
            </div>
        </>
    )
}

export default ApvEmployee;