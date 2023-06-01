import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import Schedule from './schedule/Schedule';
import ApvContent from './Approval/pages/ApvContent';
import ApvEmployee from './Approval/pages/employee/ApvEmployee';
import PlayMemberList from './play/PlayMemberList';
import PlayHistory from './play/PlayHistory';
import AnnounceMain from "./Announce/pages/announces/AnnounceMain";
import AnnounceDetail from "./Announce/pages/announces/AnnounceDetail";
import AnnounceRegistration from './Announce/pages/admin/AnnounceRegistration';
import MemberMain from './Member/pages/MemberMain';
import MemberDetail from './Member/pages/MemberDetail';
import MemberRegist from './Member/pages/MemberRegist';
import MemberModify from './Member/pages/MemberModify';
import MemberAddPass from './Member/pages/MemberAddPass.js';
import PassRegist from './Pass/pages/PassRegist';
import PassModify from './Pass/pages/PassModify';
import PassMain from './Pass/pages/PassMain';
import ProtectedRoute from './components/router/ProtectedRoute'
import Login from './login/pages/Login';
import Employee from './employee/pages/Employee';
import EmployeeDetails from './employee/pages/EmployeeDetails';
import Document from './Approval/pages/document/Document';
import 'react-toastify/dist/ReactToastify.css';
import { createGlobalStyle } from 'styled-components';
import AddDocument from './Approval/pages/document/AddDocument';

import { EmployeeProvider } from './Approval/pages/employee/EmployeeProvider';
import EmployeeRegist from './employee/pages/EmployeeRegist';

import AnnounceUpdate from './Announce/pages/admin/AnnounceUpdate';
import RequestList from './Approval/pages/getDocument/RequestList';
import RequestDetail from './Approval/pages/getDocument/RequestDetail';
import RequestWait from './Approval/pages/getDocument/RequestWait';
import ReqeustWaitDetail from './Approval/pages/getDocument/RequestWaitDetail';
import Attendance from './attendance/attendance';
import EquipmentMain from './Equipment/pages/EquipmentMain';
import MemberList from './Member/pages/MemberList';




export const GlobalStyle = createGlobalStyle`
.Toastify__toast-container {
  width: 300px !important;
  max-width: 300px !important;
  position: fixed;
  padding-top: 50px;
  z-index: 9999;
  box-sizing: border-box;
  color: #fff;
  top: 0;
  left: 53%;
  margin : auto;
}
`;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute loginCheck={true}><Layout /></ProtectedRoute>}>

          <Route path="approval">
            <Route index element={<ApvContent />}/>
            <Route path="new" element={<ProtectedRoute loginCheck={true}><ApvContent /></ProtectedRoute>} />
            <Route path="add" element={<ProtectedRoute loginCheck={true}><AddDocument /></ProtectedRoute>} />
            <Route path="employee" element={<ProtectedRoute loginCheck={true}><ApvEmployee /></ProtectedRoute>} />
            <Route path="document" element={<ProtectedRoute loginCheck={true}><Document /></ProtectedRoute>} />
            <Route path="request" element={<ProtectedRoute loginCheck={true}><RequestList/></ProtectedRoute>}/>
            <Route path="detail" element={<ProtectedRoute loginCheck={true}><RequestDetail/></ProtectedRoute>}/>
            <Route path="wait" element={<ProtectedRoute loginCheck={true}><RequestWait/></ProtectedRoute>}/>
            <Route path="waitDetail" element={<ProtectedRoute loginCheck={true}><ReqeustWaitDetail/></ProtectedRoute>}/>
          </Route>

          <Route path="play" element={<PlayMemberList />}>
            <Route index element={<ProtectedRoute loginCheck={true}><PlayMemberList /></ProtectedRoute>} />
            <Route path="history" element={<PlayHistory />} />
          </Route>

          <Route path="/announce">
            <Route index element={<ProtectedRoute loginCheck={true}><AnnounceMain /></ProtectedRoute>} />
            <Route path=":annCode" element={<ProtectedRoute loginCheck={true}><AnnounceDetail /></ProtectedRoute>} />
            <Route path="announce-registration" element={<AnnounceRegistration />} />
            <Route path="announce-update/:annCode" element={<AnnounceUpdate />} />
          </Route>

          <Route path="/equipment">
            <Route index element={<ProtectedRoute loginCheck={true}><EquipmentMain /></ProtectedRoute>} />
          </Route>

          {/* <Route path="/locker">
            <Route index element={<ProtectedRoute loginCheck={true}><LockerMain /></ProtectedRoute>} />
          </Route> */}

          <Route path="schedule" element={<Schedule />} />
          <Route path='attendance' element={<Attendance/>}/>

          <Route path="member">
            <Route index element={<ProtectedRoute loginCheck={true}><MemberMain /></ProtectedRoute>} />
            <Route path="detail/:memCode" element={<ProtectedRoute loginCheck={true}><MemberDetail /></ProtectedRoute>} />
            <Route path="regist" element={<ProtectedRoute loginCheck={true}><MemberRegist /></ProtectedRoute>} />
            <Route path="modify/:memCode" element={<ProtectedRoute loginCheck={true}><MemberModify /></ProtectedRoute>} />
            <Route path="add/:memCode" element={<ProtectedRoute loginCheck={true}><MemberAddPass /></ProtectedRoute>} />
            <Route path="members/search" element={<ProtectedRoute loginCheck={true}><MemberMain /></ProtectedRoute>} />
          </Route>

          <Route path="pass">
            <Route index element={<ProtectedRoute loginCheck={true}><PassMain /></ProtectedRoute>} />
            <Route path="regist" element={<ProtectedRoute loginCheck={true}><PassRegist /></ProtectedRoute>} />
            <Route path="modify/:passCode" element={<ProtectedRoute loginCheck={true}><PassModify /></ProtectedRoute>} />
          </Route>

          <Route path="employee">
            <Route index element={ <Employee/> }/>
            <Route path="regist" element={ <EmployeeRegist/> }/>
          </Route>



        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;