import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import ApprovalLayout from './Approval/layouts/ApprovalLayout';
import Schedule from './schedule/Schedule';
import ApvContent from './Approval/pages/ApvContent';

import ApvVacation from './Approval/pages/document/ApvVacation';
import ApvResign from "./Approval/pages/document/ApvResign";
import ApvReason from "./Approval/pages/document/ApvReason";
import ApvEmployee from './Approval/pages/ApvEmployee';
import PlayMemberList from './play/PlayMemberList';
import PlayHistory from './play/PlayHistory';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          
          <Route path="approval">
            <Route index element={<ApprovalLayout/>}/>
            <Route path="new" element={<ApvContent/>}/>
            <Route path="vacation" element={<ApvVacation/>}/>
            <Route path="resignation" element={<ApvResign/>}/>
            <Route path="reason" element={<ApvReason/>}/>
            {/* <Route path="employee" element={<ApvEmployee/>}/> */}
          </Route>

          <Route path="play">
            <Route index element ={<PlayMemberList/>}/>
            <Route path="history" element={<PlayHistory/>}/>
          </Route>
          {/* <Route path="schedule"  element={<Schedule/>}/> */}

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
