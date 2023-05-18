import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import ApprovalLayout from './Approval/layouts/ApprovalLayout';
import Schedule from './schedule/Schedule';
import ApvContent from './Approval/pages/ApvContent';
import ApvVacation from './Approval/pages/document/ApvVacation';
import ApvResign from "./Approval/pages/document/ApvResign";
import ApvReason from "./Approval/pages/document/ApvReason";
import ApvEmployee from './Approval/employee/ApvEmployee';
import PlayMemberList from './play/PlayMemberList';
import PlayHistory from './play/PlayHistory';
import AnnounceMain from "./Announce/pages/announces/AnnounceMain";
import AnnounceDetail from "./Announce/pages/announces/AnnounceDetail";
import AnnounceList from './Announce/pages/announces/AnnounceList';
import AnnounceItem from './Announce/items/AnnounceItem';
import MemberMain from './Member/pages/MemberMain';
import MemberDetail from './Member/pages/MemberDetail';
import MemberRegist from './Member/pages/MemberRegist';
import PassRegist from './Pass/pages/PassRegist';
import PassMain from './Pass/pages/PassMain';
import ProtectedRoute from './components/router/ProtectedRoute'
import Login from './login/pages/Login';
import TestEditorForm from './Editor';
import Test2 from './Test2';




function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={ <Login/> }/>
        <Route path="/" element={ <ProtectedRoute loginCheck={ true }><Layout/></ProtectedRoute> }>
          
          <Route path="approval">
            <Route index element={<ApprovalLayout/>}/>
            <Route path="new" element={<ApvContent/>}/>
            <Route path="vacation" element={<ApvVacation/>}/>
            <Route path="resignation" element={<ApvResign/>}/>
            <Route path="reason" element={<ApvReason/>}/>
            <Route path="employee" element={<ApvEmployee/>}/>
          </Route>

          <Route path="play">
            <Route index element ={
              <ProtectedRoute loginCheck={true}>
                <PlayMemberList/>
              </ProtectedRoute>
              }/>
            <Route path="history" element={<PlayHistory/>}/>
          </Route>

          <Route path="/announce" element={<AnnounceMain />}>
            <Route path="/announce/:announceCode" element={<AnnounceDetail />} />
          </Route>

          <Route path="schedule"  element={<Schedule/>}/>

          <Route path="member">
            <Route index element={ <MemberMain/> }/>
            <Route path="detail/:memCode" element={<MemberDetail/>} />
            <Route path="regist" element={<MemberRegist/>} />
          </Route>

          <Route path="pass">
            <Route index element={ <PassMain/> }/>
            <Route path="regist" element={<PassRegist/>} />
          </Route>

          <Route path="document">
            <Route index element={<Test2/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
