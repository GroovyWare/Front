import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import Quill from 'quill';
import { useContext, useEffect, useState } from 'react';
import RequestDetailCSS from "./RequestDetail.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { searchContextAPI } from '../../../api/ApprovalAPICall';
import { EmployeeContext } from '../employee/EmployeeProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchRequestAPI } from '../../../api/ApprovalAPICall';

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
    height: 600px;
    background-color : white;
  }
`;

function RequestDetail(){
    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    const location = useLocation();
    const {apvCode} = location.state;

    const {context} = useSelector(state => state.approvalReducer);
    const [html, setHtml] = useState(context?.apvContext);
   

    /* html 내용이 변할 때 마다 새로 세팅 */
    useEffect(() => {
        setHtml(html);
    }, [html]);

    useEffect(
        () => {
            dispatch(searchContextAPI(apvCode));
        },[apvCode]
    )

    useEffect(
        () => {
            setHtml(context?.apvContext)
        },[context?.apvContext]
    )

    return(
        <div className={RequestDetailCSS.container}>
            <div className={RequestDetailCSS.pageTitle}>
                <div>문서 번호 {apvCode}</div>
            </div>
            <div className={RequestDetailCSS.content}>
        <div className={RequestDetailCSS.wrap}>
            <div className={RequestDetailCSS.editor}>
                <StyledQuill 
                    value={html} 
                    theme="snow"
                    modules={{toolbar:false}}
                    readOnly = "true"
                />
            </div>
            <div className={RequestDetailCSS.detail}>
            </div>
        </div>
        </div>
        </div>
    )
}

export default RequestDetail;