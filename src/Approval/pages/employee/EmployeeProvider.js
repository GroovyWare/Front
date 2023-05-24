import React, { createContext, useState } from "react";

// Context를 생성합니다.
export const EmployeeContext = createContext();

// children에게 이 Context를 전달합니다.
export const EmployeeProvider = ({ children }) => {
    const [approvedEmployees, setApprovedEmployees] = useState([]);
    const [readEmployees, setReadEmployees] = useState([]);

    return (
        <EmployeeContext.Provider value={{ approvedEmployees, setApprovedEmployees, readEmployees, setReadEmployees }}>
            {children}
        </EmployeeContext.Provider>
    );
};