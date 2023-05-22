import { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';


const StyledQuill = styled(ReactQuill)`
  .ql-toolbar {
    height: 50px;
  }
`;

const Editor = ({ placeholder }) => {

    const html = '<p>hello</p>';

    const quillRef = useRef(null);

    const handleClick = () => {
    const quill = quillRef.current.getEditor();
    const htmlContent = quill.root.innerHTML;
    console.log(htmlContent); // 저장할 HTML 텍스트 출력
  };

  const [editorHtml, setEditorHtml] = useState(html);

  const toolbarStyle = {
    height: '800px',
  };

  const handleChange = (html) => {
    setEditorHtml(html);
    console.log(html);
  };

  return (
    <div>
    <StyledQuill
      onChange={handleChange}
      value={editorHtml}
      modules={Editor.modules}
      formats={Editor.formats}
      bounds={'#root'}
      placeholder={placeholder}
      style={toolbarStyle}
      ref={quillRef}
    />
    <button onClick={handleClick}>Save as HTML</button>
    </div>
  );
};

Editor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['clean']
  ]
};

Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
];

export default Editor;
