import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function AppRegist() {
    //useNavigate를 통해 item 마다 적합한 기안서 내용을 가진 컴포넌트로 이동
    const navigate = useNavigate();
    const location = useLocation();
    //useLocation을 통해 state 객체로 전달 된 데이터를 사용 가능
    const { item, startDate, endDate } = location.state;

    useEffect(
        () => {
            if(item === '휴가신청서'){
                navigate("/approval/Vacation", {state : { startDate : startDate, endDate : endDate}});
            }else if(item === '사직서'){
                navigate("/approval/resignation", {state : { startDate : startDate, endDate : endDate }});
            }else if(item === '시말서'){
                navigate("/approval/reason", {state : { startDate : startDate, endDate : endDate }});
            }else if(item === '구매품의서'){
                navigate("/approval/purchase", {state : { startDate : startDate, endDate : endDate }});
            }
        }
    )

    return(
        <>
        </>
    )    
}

export default AppRegist;