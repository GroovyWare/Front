import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import ApprovalLayout from './Approval/layouts/ApprovalLayout';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          {/* <Route path="schedule" element={<Schedule/>}/> */}
          
          <Route path="approval" element={<ApprovalLayout/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
