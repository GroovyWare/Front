import React, { useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDispatch, useSelector } from 'react-redux';
import { searchDocumentList } from './api/ApprovalAPICall';
import Test2CSS from "./Test2.module.css";

const EditorBox = () => {

    const dispatch = useDispatch();
    const {document} = useSelector(state => state.approvalReducer);


  useEffect(() => {
    dispatch(searchDocumentList());
  }, []);

  const htmlString = '<button>확인</button>';


  return (
    <>
    {document && 
         <div className="EditorBox">
         <CKEditor
           editor={ ClassicEditor }
           data = {htmlString}
           onReady={ editor => {
             console.log( 'Editor is ready to use!', editor );
           }}
         />
       </div>
    }
    </>
  );
}

export default EditorBox;