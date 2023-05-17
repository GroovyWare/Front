import { useEffect, useState } from 'react';
import ApvEmployeeCSS from './ApvEmployee.module.css';
import Head from '../pages/employeeList/Head';
import Fitness from '../pages/employeeList/Fitness';
import Filates from '../pages/employeeList/Filates';
import GX from '../pages/employeeList/GX';
import Info from '../pages/employeeList/Info';
import SelectReader from '../pages/person/SelectReader';
import SelectApprove from '../pages/person/SelectApprove';
import { useDispatch } from 'react-redux';

function ApvEmployee(){

    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const onChangeHandler = (e) => {
        setName(e.target.value);
    }

    const onKeyPressHandler = (e) => {
        if (e.key === "Enter") {
            console.log(name);
        }
    }

    return(
        <>
            <div className={ApvEmployeeCSS.wrap}>
                <div className={ApvEmployeeCSS.emp}>
                    <input
                        type="text"
                        placeholder='이름'
                        onChange={onChangeHandler}
                        className={ApvEmployeeCSS.textbox}
                        onKeyPress={onKeyPressHandler}
                    />
                    <div>
                        <Head name = {name}/>
                        <Fitness/>
                        <Filates/>
                        <GX/>
                        <Info/>
                    </div>
                </div>
                    <div>
                        <SelectApprove/>
                        <SelectReader/>
                        <button className={ApvEmployeeCSS.confirm}>확인</button>
                        <button className={ApvEmployeeCSS.cancel}>취소</button>
                    </div>
                </div>
                
        </>
    )
}

export default ApvEmployee;