import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { callAnnounceRegistAPI } from '../../../api/AnnounceAPICalls';
import { useDispatch } from 'react-redux';

const AnnounceRegistration = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  const hasUnsavedChanges = Boolean(title || content || file);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Create a FormData instance
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (file) {
            formData.append('file', file);
        }


        // Dispatch the async action
        const response = await dispatch(callAnnounceRegistAPI(formData));

        console.log('API response:', response); // Add this line

        if (response && response.status === 200) {
            alert('공지사항이 등록되었습니다.');
            setTitle('');
            setContent('');
            setFile(null);
            navigate('/announce', { replace : true });
        } else {
            console.log('API response status is not 200:', response); // Add this line
            alert('공지사항 등록에 실패했습니다. 다시 시도해주세요.');
        }
    } catch (error) {
        console.error('Error during API call:', error); // Add this line
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
      <label>
        첨부 파일:
        <input type="file" onChange={handleFileChange} />
      </label>
      <button type="submit">등록</button>
    </form>
  );
};

export default AnnounceRegistration;
