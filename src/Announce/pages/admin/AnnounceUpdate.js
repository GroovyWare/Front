import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from 'axios';
import AnnounceUpdateCSS from './AnnounceUpdate.module.css';
import { toast } from 'react-toastify';

const AnnounceUpdate = () => {
  const navigate = useNavigate();
  const { annCode } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // When the component is mounted, fetch the post data
  useEffect(() => {
    axios.get(`http://localhost:8059/announce/${annCode}`)
    .then(res => {
        if (res.data && res.data.data && res.data.data.annTitle && res.data.data.annContent) {
            setTitle(res.data.data.annTitle);
            setContent(res.data.data.annContent);
        }
    })
    .catch(err => {
        toast.error('게시글 불러오기 실패');
    });
  }, [annCode]);

  const handleSubmit = async () => {
    if (title.length < 1) {
      toast.error("제목을 입력해주세요.");
      return;
    };

    const data = {
        annTitle: title,
        annContent: content,
    };

    try {
      const res = await axios.put(`http://localhost:8059/announce/${annCode}`, data); // 게시글 수정 엔드포인트
      if (res.status === 200) {
        toast.success("수정이 완료되었습니다.");
        navigate(`/announce/${annCode}`, { replace: true });
        return;
      } else {
        toast.error("업로드 실패.");
        return;
      }
    } catch (error) {
      toast.error("네트워크 오류: " + error.message);
      return;
    }
  };

  return (
    <div className={ AnnounceUpdateCSS.container }>
      <style jsx>{`
      .ck.ck-editor__editable {
          min-height: 500px;
          max-height: 500px;
      }
    `}</style>
      <section>
        <div>
        <td className={ AnnounceUpdateCSS.title } align="center">제목 : </td>
        <td><input 
            name='annTitle' 
            type="text" 
            value={title}
            className={ AnnounceUpdateCSS.titleWrapper }
            onChange={e => setTitle(e.target.value)}
          /></td>
        </div>
      </section>
      <section className={ AnnounceUpdateCSS.content }>
        <CKEditor
          name='annContent'
          editor={ClassicEditor}
          data={content}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
        />
      </section>
      <section>
        <div className={ AnnounceUpdateCSS.registBtn }>
          <button
            onClick={() => {
              if(window.confirm("게시글 수정을 취소하시겠습니까?")) {
                navigate(-1, { replace: true });
              }
            }}
          >취소</button>
          <button text={"완료"} type="black" onClick={handleSubmit}>수정</button>
        </div>
      </section>
    </div>
  );
};

export default AnnounceUpdate;
