import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import ApprovalLayout from './Approval/layouts/ApprovalLayout';
import Schedule from './schedule/Schedule';
import ApvContent from './Approval/pages/ApvContent';
import ApvEmployee from './Approval/employee/ApvEmployee';
import PlayMemberList from './play/PlayMemberList';
import PlayHistory from './play/PlayHistory';
import AnnounceMain from "./Announce/pages/announces/AnnounceMain";
import AnnounceDetail from "./Announce/pages/announces/AnnounceDetail";
import AnnounceRegistration from './Announce/pages/admin/AnnounceRegistration';
import AnnounceList from './Announce/pages/announces/AnnounceList';
import AnnounceItem from './Announce/items/AnnounceItem';
import MemberMain from './Member/pages/MemberMain';
import MemberDetail from './Member/pages/MemberDetail';
import MemberRegist from './Member/pages/MemberRegist';
import PassRegist from './Pass/pages/PassRegist';
import PassMain from './Pass/pages/PassMain';
import ProtectedRoute from './components/router/ProtectedRoute'
import Login from './login/pages/Login';
import Employee from './employee/pages/Employee';
import EmployeeDetails from './employee/pages/EmployeeDetails';
import Document from './Approval/pages/document/Document';
import 'react-toastify/dist/ReactToastify.css';
import { createGlobalStyle } from 'styled-components';
import AddDocument from './Approval/pages/document/AddDocument';
import { EmployeeProvider } from './Approval/employee/EmployeeProvider';

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
  transform: translateX(-50%);
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
          </Route>

          <Route path="play" element={<PlayMemberList />}>
            <Route index element={<ProtectedRoute loginCheck={true}><PlayMemberList /></ProtectedRoute>} />
            <Route path="history" element={<PlayHistory />} />
          </Route>

          <Route path="/announce">
              <Route index element={<ProtectedRoute loginCheck={true}><AnnounceMain /></ProtectedRoute>} />
              <Route path=":annCode" element={<ProtectedRoute loginCheck={true}><AnnounceDetail /></ProtectedRoute>} />
              <Route path="announce-registration" element={<AnnounceRegistration />} />
          </Route>

          <Route path="schedule" element={<Schedule />} />

          <Route path="member" element={<MemberMain />}>
            <Route index element={<MemberMain />} />
            <Route path="detail/:memCode" element={<MemberDetail />} />
            <Route path="regist" element={<MemberRegist />} />
          </Route>

          <Route path="pass" element={<PassMain />}>
            <Route index element={<PassMain />} />
            <Route path="regist" element={<PassRegist />} />
          </Route>

          <Route path="employee">
            <Route index element={ <Employee/> }/>
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;