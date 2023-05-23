import React, { useState } from 'react';
import axios from 'axios';

const AnnounceRegistration = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/your-api-endpoint', {
        title,
        content
      });

      if (response.status === 200) {
        alert('공지사항이 등록되었습니다.');
        setTitle('');
        setContent('');
      } else {
        alert('공지사항 등록에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        제목:
        <input type="text" value={title} onChange={handleTitleChange} />
      </label>
      <label>
        내용:
        <textarea value={content} onChange={handleContentChange} />
      </label>
      <button type="submit">공지사항 등록</button>
    </form>
  );
};

export default AnnounceRegistration;
