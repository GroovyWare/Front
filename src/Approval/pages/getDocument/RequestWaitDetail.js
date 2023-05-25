import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import Quill from 'quill';
import { useContext, useEffect, useState } from 'react';
import RequestDetailCSS from "./RequestDetail.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { searchContextAPI } from '../../../api/ApprovalAPICall';
import { useLocation } from 'react-router-dom';

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
  }
`;

function ReqeustWaitDetail(){
    
    const dispatch = useDispatch();
    const location = useLocation();
    const {apvCode} = location.state;

    const {context, waitList} = useSelector(state => state.approvalReducer);
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

    console.log('wait', waitList)

    return(
        <div className={RequestDetailCSS.wrap}>
            <div className={RequestDetailCSS.editor2}>
                <StyledQuill 
                    value={html} 
                    theme="snow"
                    modules={{toolbar:false}}
                    readOnly = "true"
                />
            </div>
            <div className={RequestDetailCSS.info}>
                <table>
                    <tr>
                        <th>열람권자</th>
                        {waitList && waitList.data.data.map((wait, index) => (
                            <div key={index}>{wait.readerLine.map(
                                (reader, index2) => (
                                   apvCode === reader.apvCode ? <td key={index2}>{reader.empCode}</td> : null
                                )
                            )}</div>
                        ))}
                        <td></td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default ReqeustWaitDetail;