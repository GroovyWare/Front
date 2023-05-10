import React, { useState } from 'react';
import ApprovalCSS from './Approval.module.css';

function Approval() {
  const [formList, setFormList] = useState([]);

  const handleClick = () => {
    const id = new Date().getTime(); // 각 폼에 고유한 ID 부여
    setFormList(formList.concat({ id, component: <Form id={id} onDelete={handleDelete} /> }));
  }

  const handleDelete = (id) => {
    setFormList(formList.filter(form => form.id !== id));
  }

  return (
    <div className="App" style={ApprovalCSS.APP}>
      <button onClick={handleClick}>DATE</button>
      {formList.map((form, index) => (
        <div key={form.id}>{form.component}</div>
      ))}
    </div>
  );
}

function Form({ id, onDelete }) {
  return (
    <div>
      <form>
        <label>
          일정: <input type="DATE" name="schedule" />
          ~ <input type="DATE" name="schedule" />
        </label>
      </form>
      <button onClick={() => onDelete(id)}>삭제</button>
    </div>
  )
}

export default Approval;