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
            <Route path="employee" element={<ApvEmployee/>}/>
          </Route>

          <Route path="play">
            <Route index element ={
                <PlayMemberList/>
              }/>
            <Route path="history" element={<PlayHistory/>}/>
          </Route>

          <Route path="announce" element={<AnnounceMain/>}>
            <Route index element={<AnnounceList/>}/>
            <Route path=":announceCode" element={<AnnounceItem/>}/>
          </Route>

          <Route path="schedule"  element={<Schedule/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
