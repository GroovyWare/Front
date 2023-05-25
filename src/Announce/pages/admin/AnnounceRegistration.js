import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { callAnnounceRegistAPI } from '../../../api/AnnounceAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const AnnounceRegistration = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const titleRef = useRef();
  const { regist } = useSelector(state => state.announceReducer);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          loader.file.then((file) => {
            formData.append("file", file);

            axios
              .post("http://localhost:8059/imgs/", formData)
              .then((res) => {
                resolve({
                  default: res.data.data.uri,
                });
              })
              .catch((err) => reject(err));
          });
        });
      },
    };
  };

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  };

  const handleSubmit = async () => {
    if (title.length < 1) {
      titleRef.current.focus();
      return;
    };
  
    const data = {
      title,
      content,
    };
  
    try {
      const res = await axios.post("http://localhost:8059/announce-registration", data); // 게시글 등록 엔드포인트
      if (res.status === 200) {
        navigate("/", { replace: true });
        return;
      } else {
        alert("업로드 실패.");
        return;
      }
    } catch (error) {
      console.error(error);
      alert("네트워크 오류: " + error.message);
      return;
    }
  };
  
  /* 글 등록 후 regist 값이 확인 되면 목록으로 이동 */
  useEffect(
    () => {
        if(regist?.status === 200) {
            alert('게시글 등록이 완료 되었습니다.');
            navigate('/announce', { replace : true });
        }
    },
    [regist]
  );

  //  /* 파일 첨부 버튼 클릭 이벤트 */
  //  const onClickFileUpload = () => {
  //   fileInput.current.click();
  // }

  // /* 파일 첨부 시 동작하는 이벤트 */
  // const onChangeFileUpload = (e) => {
  //   setFile(e.target.files[0]);
  // }

  /* 입력 양식의 값이 변경 될 때 */
  const onChangeHandler = (e) => {
    setHasUnsavedChanges(true); // 변경사항이 있음을 표시

    setForm({
        ...form,
        [e.target.name] : e.target.value
    });
  }


  /* 등록 버튼 클릭 이벤트 */
  const onClickAnnounceRegistrationHandler = () => {

    if (!form.annTitle || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    /* 서버로 전달할 FormData 형태의 객체 설정 */
    const formData = new FormData();
    formData.append("annTitle", form.annTitle);
    formData.append("annContent", content);

    if(file) {
        formData.append("files", file);
    }

    dispatch(callAnnounceRegistAPI(formData));
    
    setHasUnsavedChanges(false); // 등록 완료 후 변경사항 없음을 표시
  }

  return (
    <div className="Editor">
      <section>
        <div className="title-wrapper">
        <td><input name='annTitle' type="text" onChange={ onChangeHandler } /></td>
        </div>
      </section>
      <section>
        <CKEditor
          name='annContent'
          editor={ClassicEditor}
          data=""
          config={{ extraPlugins: [uploadPlugin] }}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            setContent(editor.getData());
            console.log({ event, editor, content });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </section>
      <section>
        <div className="control-box">
          <div className="cancel-btn-wrapper">
            <button
              text={"취소"}
              onClick={() => navigate(-1, { replace: true })}
            >취소</button>
          </div>
          <div className="submit-btn-wrapper">
            <button text={"완료"} type="black" onClick={onClickAnnounceRegistrationHandler}>등록</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnnounceRegistration;
