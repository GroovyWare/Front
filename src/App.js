import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import ApprovalLayout from './Approval/layouts/ApprovalLayout';
import Schedule from './schedule/Schedule';
import ApvContent from './Approval/pages/ApvContent';
import ApvRegist from "./Approval/pages/ApvRegist";
import ApvVacation from './Approval/pages/document/ApvVacation';
import ApvResign from "./Approval/pages/document/ApvResign";
import ApvPurchase from "./Approval/pages/document/ApvPurchase";
import ApvReason from "./Approval/pages/document/ApvReason";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          
          <Route path="approval">
            <Route index element={<ApprovalLayout/>}/>
            <Route path="new" element={<ApvContent/>}/>
            <Route path="regist" element={<ApvRegist/>}/>
            <Route path="vacation" element={<ApvVacation/>}/>
            <Route path="resignation" element={<ApvResign/>}/>
            <Route path="purchase" element={<ApvPurchase/>}/>
            <Route path="reason" element={<ApvReason/>}/>
          </Route>
          {/* <Route path="schedule"  element={<Schedule/>}/> */}

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
