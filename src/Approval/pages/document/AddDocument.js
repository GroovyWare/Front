import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import Quill from 'quill';
import ApvVacationCSS from './ApvVacation.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addDocumentAPI } from '../../../api/DocumentAPICalls';
import { useNavigate } from 'react-router-dom';

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
    background-color : white
  }
  .ql-container {
    height: 600px;
  }
  
  .ql-editor{
    background-color : white;
  }
`;

function AddDocument(){

    const quillRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [html, setHtml] = useState();
    const [docTitle, setDocTitle] = useState();
    const {add} = useSelector(state => state.documentReducer);

    /* html 내용이 변할 때 마다 새로 세팅 */
    useEffect(() => {
      setHtml(html);
    }, [html]);

    /* 입력한 양식명 사용 */
    const onChangeHandler = (e) => {
        setDocTitle(e.target.value);
    }

    /* 확인 버튼을 눌렀을 경우 양식 저장 */
    const onClickHandler = () => {
        
        const data = {
            docTitle : docTitle,
            docContext : html
        }

        dispatch(addDocumentAPI(data));

        if(add?.status === 200){
            navigate('/approval/add');
        }
    }

    /* 취소 버튼 클릭 시 */
    const onClickCancelHandler = () => {
        navigate('/approval');
    }

    return(
        <div className={ApvVacationCSS.container}>
            <div>
            <input
                type="text"
                className={ApvVacationCSS.text}
                placeholder='양식명을 입력해주세요.'
                onChange={onChangeHandler}
            />
            <div style={{width:700, height : 600, marginLeft : 350}}>
            <StyledQuill 
                ref={quillRef}
                value={html} 
                theme="snow"
                modules={modules}
                onChange={(content, delta, source, editor) => {
                    setHtml(editor.getHTML());
                }}
            />
            </div>
            {/* 확인 버튼 */}
            <button 
                className={ApvVacationCSS.confirm2}
                onClick={onClickHandler}
            >제출</button>
            <button 
                className={ApvVacationCSS.cancel2}
                onClick={onClickCancelHandler}
                >취소</button>
            </div>
        </div>
    )
}

export default AddDocument;