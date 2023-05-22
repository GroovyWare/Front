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
import AnnounceList from './Announce/pages/announces/AnnounceList';
import AnnounceItem from './Announce/items/AnnounceItem';
import MemberMain from './Member/pages/MemberMain';
import MemberDetail from './Member/pages/MemberDetail';
import MemberRegist from './Member/pages/MemberRegist';
import PassRegist from './Pass/pages/PassRegist';
import PassMain from './Pass/pages/PassMain';
import ProtectedRoute from './components/router/ProtectedRoute'
import Login from './login/pages/Login';
import Document from './Approval/pages/document/Document';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={ <Login/> }/>
        <Route path="/" element={ <ProtectedRoute loginCheck={ true }><Layout/></ProtectedRoute> }>
          
          <Route path="approval">
            
            <Route index element={<ApprovalLayout/>}/>
            <Route path="new" element={
            <ProtectedRoute loginCheck={true}>
              <ApvContent/>
            </ProtectedRoute>}/>
            <Route path="document" element={<ProtectedRoute loginCheck={true}>
              <Document/>
            </ProtectedRoute>}/>
            <Route path="employee" element={<ProtectedRoute loginCheck={true}>
              <ApvEmployee/>
            </ProtectedRoute>}/>
            
          </Route>

          <Route path="play">
            <Route index element ={
              <ProtectedRoute loginCheck={true}>
                <PlayMemberList/>
              </ProtectedRoute>
              }/>
            <Route path="history" element={<PlayHistory/>}/>
          </Route>

          <Route path="/announce">
            <Route index element={<AnnounceMain />}/>
            <Route path=":annCode" element={<AnnounceDetail />} />
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
