import React, { useState, useEffect, useRef, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import Quill from 'quill';
import ApvDocumentCSS from './ApvDocument.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registDoc, selectPersonAPICall } from '../../../api/ApprovalAPICall';
import { EmployeeContext } from '../employee/EmployeeProvider';

const Parchment = Quill.import('parchment');

const config = {
  scope: Parchment.Scope.BLOCK,
};

const AlignClass = new Parchment.Attributor.Class('align', 'ql-align', config);
Quill.register(AlignClass, true);

const AlignStyle = new Parchment.Attributor.Style('align', 'text-align', config);
Quill.register(AlignStyle, true);

const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],
  
      [{ 'header': 1 }, { 'header': 2 }], // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }], // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }], // outdent/indent
      [{ 'direction': 'rtl' }], // text direction
  
      [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
      [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
  
      ['clean'], 
      ['align', ['align']],
    ]
  };
  
  const StyledQuill = styled(ReactQuill)`
  .ql-toolbar {
    height: 50px;
  }
  .ql-container {
    height: 550px;
    background-color : white;
  }
`;

function Document() {
  const {approvedEmployees, readEmployees, setApprovedEmployees, setReadEmployees} = useContext(EmployeeContext);

  const quillRef = useRef(null);

  const location = useLocation();
  const {docTitle, startDate, endDate } = location.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {employee} = useSelector(state => state.approvalReducer);
  const {setDocument} = useSelector(state => state.documentReducer);

  const [html, setHtml] = useState(setDocument?.data?.docContext);

  /* html 내용이 변할 때 마다 새로 세팅 */
  useEffect(() => {
    setHtml(html);
  }, [html]);

  /* 기안서 작성자 및 부서 알아오기 */
  useEffect(
    () => {
      dispatch(selectPersonAPICall());
    },[]
  )
  
  /* 결재 요청 보내기 */
  const onClickDocHandler = () => {
    if (quillRef.current) {
      var quillInstance = quillRef.current.getEditor();
      var html = quillInstance.root.innerHTML;
  
      const formData = new FormData();
      formData.append("apvStatus", '진행중')
      formData.append("apvContext", html);

      if(startDate){
        formData.append("vacStartDate", new Date(startDate));
      }
      if(endDate){
        formData.append("vacEndDate", new Date(endDate));
      }

      approvedEmployees.forEach((employee, index) => {
        formData.append(`approveLine[${index}].apvCode`, 0);
        formData.append(`approveLine[${index}].empCode`, employee.code);
        formData.append(`approveLine[${index}].aplNum`, index + 1);
        formData.append(`approveLine[${index}].aplStatus`, '진행중')
      });

      readEmployees.forEach((reader, index) => {
        formData.append(`readerLine[${index}].apvCode`, 0);
        formData.append(`readerLine[${index}].empCode`, reader.code);
      });

      dispatch(registDoc(formData, docTitle));

      navigate('/approval', {replace : true});
    }
  }

  /* 취소 버튼 클릭 시 */
  const onClickCancelHandler = () => {
    navigate("/approval/new", {replace:true});
  }

  return (
    <div className={ApvDocumentCSS.container}>
      <div className={ApvDocumentCSS.wrap}>
        <div className={ApvDocumentCSS.editor}>
          <StyledQuill 
              ref={quillRef}
              value={html} 
              theme="snow"
              modules={{toolbar:false}}
          />
          {/* 확인 버튼 */}
          <button 
              className={ApvDocumentCSS.confirm}
              onClick={onClickDocHandler}
          >제출</button>
          <button 
            className={ApvDocumentCSS.cancel}
            onClick={onClickCancelHandler}
            >취소</button>
        </div>

          <div>
            {/* 결재권자 표시 */}
              {
                approvedEmployees && approvedEmployees.map((approvedEmployee) => (
                  <div className={ApvDocumentCSS.authors}>
                    <div className={ApvDocumentCSS.author}>
                      <div className={ApvDocumentCSS.authorPosition}>
                        {approvedEmployee.position}
                        <hr/>
                      </div>
                      <div className={ApvDocumentCSS.authorName}>
                        {approvedEmployee.name}
                      </div>
                    </div>
                  </div>
                ))
              } 
          </div>

            {/* 상세 정보 */}
            <div className={ApvDocumentCSS.detail}>
                    <div style={{display:"flex"}}>
                      <table style={{fontFamily:"LINESeedKR-Bd",fontSize: 22, color:"#505050"}}>
                        <tbody>
                          <tr>
                            <th className={ApvDocumentCSS.details}>제목</th>
                            <td className={ApvDocumentCSS.details2}>{docTitle}</td>
                          </tr>
                          <tr style={{marginBottom : 30}}>
                            <th className={ApvDocumentCSS.details}>보존일</th>
                            <td className={ApvDocumentCSS.details2}>90일</td>
                          </tr>
                          {employee && employee.data.map((row) => (
                            <tr>
                              <th className={ApvDocumentCSS.details}>기안자</th>
                                <td className={ApvDocumentCSS.details2}>
                                  {row.empName}
                                </td>
                            </tr>
                          ))}
                          {employee && employee.data.map((row) => (
                            <tr>
                              <th className={ApvDocumentCSS.details}>부서</th>
                                <td className={ApvDocumentCSS.details2}>
                                  {row.dept.deptTitle}
                                </td>
                            </tr>
                          ))}
                          {
                            docTitle === '휴가신청서' ?
                            <tr>
                              <th className={ApvDocumentCSS.details}>기간</th>
                              <td className={ApvDocumentCSS.details2}>[{startDate}] ~ [{endDate}]</td>
                            </tr> : null
                          }
                            <tr>
                              <th className={ApvDocumentCSS.details}>열람권자</th>
                              <div className={ApvDocumentCSS.details2}>
                            {
                              readEmployees && readEmployees.map(reader => (
                                  <div style={{marginRight : 10}}>{reader.name}</div>
                              ))
                            }
                            </div>
                           </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
       </div>
    </div>
  );
}

export default Document;