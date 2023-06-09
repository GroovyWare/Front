import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import Quill from 'quill';
import { useEffect, useState } from 'react';
import RequestDetailCSS from "./RequestDetail.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { searchContextAPI } from '../../../api/ApprovalAPICall';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchApproveLineAPI } from '../../../api/ApprovalAPICall';
import { acceptApprovalAPI } from '../../../api/ApprovalAPICall';
import { toast } from 'react-toastify';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';

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

function ReqeustWaitDetail(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const {apvCode} = location.state;

    const {context, waitList, line, accept} = useSelector(state => state.approvalReducer);
    const [html, setHtml] = useState(context?.apvContext);
    const empcodes = waitList?.data.data.flatMap(row => row.approveLine.map(row => row.empCode));
    const person = context?.approveLine.map(row => row.empCode);
    const lines = line?.data.map(row => row.empCode);
    const matchingElements = person?.filter(element => lines?.includes(element));

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

    useEffect(() => {
        dispatch(searchApproveLineAPI(empcodes));
    }, [])

    const onClickOkHandler = (e) => {

       

            confirmAlert({
                title: `${e.target.dataset.value} 하시겠습니까?`,
                buttons: [
                  {
                    label: '네',
                    onClick: () => {
                        const form = {
                            'apvCode' : apvCode,
                            'approveLine' : [{
                                'aplStatus' : e.target.dataset.value,
                                'aplDate' : new Date
                            }]
                        }
                
                        dispatch(acceptApprovalAPI(form));

                        navigate('/approval', {replace : true})
                    }  
                  },
                  {
                    label: '아니오',
                    onClick: () => navigate('/approval/wait', {replace : true})
                  }
                ]
              });
    }

    return(
        <div className={RequestDetailCSS.container}>
        <div className={RequestDetailCSS.pageTitle}>
            <div>문서 번호 {apvCode}</div>
        </div>
        <div className={RequestDetailCSS.content}>
            <div className={RequestDetailCSS.button}>
                <div className={RequestDetailCSS.ok} onClick={onClickOkHandler} data-value="승인"><img src='../images/ok.png'></img>승인</div>
                <div className={RequestDetailCSS.no} onClick={onClickOkHandler} data-value="반려"><img src='../images/no.png'></img>반려</div>

                <table className={RequestDetailCSS.approveLinecss}>
                <tr>
                {
                    line?.data.map(row => (
                       matchingElements.includes(row.empCode) ? <th>{row.empName}<hr/></th> : null
                    ))
                }
                </tr>
                <tr className={RequestDetailCSS.approve}>
                    {
                        context?.approveLine.map(row => <td>{row.aplStatus}</td>)
                    }
                </tr>
            </table>
            </div>
            <div className={RequestDetailCSS.wrap}>
                    <div className={RequestDetailCSS.contents}>
                        <div className={RequestDetailCSS.editor2}>
                            <StyledQuill 
                                value={html} 
                                theme="snow"
                                modules={{toolbar:false}}
                                readOnly = "true"
                            />
                        </div>
                        <div className={RequestDetailCSS.info}>
                            
                        </div>
                    </div>
            </div>
        </div>
        </div>
    )
}

export default ReqeustWaitDetail;