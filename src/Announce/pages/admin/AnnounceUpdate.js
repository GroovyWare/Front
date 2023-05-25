import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from 'axios';

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
        } else {
            console.error('Unexpected response structure:', res);
        }
    })
    .catch(err => {
        console.error(err);
        alert('게시글 불러오기 실패');
    });
  }, [annCode]);

  const handleSubmit = async () => {
    if (title.length < 1) {
      alert("제목을 입력해주세요.");
      return;
    };

    const data = {
        annTitle: title,
        annContent: content,
    };

    try {
      const res = await axios.put(`http://localhost:8059/announce/${annCode}`, data); // 게시글 수정 엔드포인트
      if (res.status === 200) {
        alert("수정이 완료되었습니다.");
        navigate(`/announce/${annCode}`, { replace: true });
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

  return (
    <div className="Editor">
      <section>
        <div className="title-wrapper">
          <input 
            name='annTitle' 
            type="text" 
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
      </section>
      <section>
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
        <div className="control-box">
          <div className="cancel-btn-wrapper">
            <button
              text={"취소"}
              onClick={() => navigate(-1, { replace: true })}
            >취소</button>
          </div>
          <div className="submit-btn-wrapper">
            <button text={"완료"} type="black" onClick={handleSubmit}>수정</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnnounceUpdate;
