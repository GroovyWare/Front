import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import ApprovalLayout from './Approval/layouts/ApprovalLayout';
import Schedule from './schedule/Schedule';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          {/* <Route path="schedule" element={<Schedule/>}/> */}
          
          <Route path="approval" element={<ApprovalLayout/>}/>
          <Route path="schedule"  element={<Schedule/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
