import React from 'react';
import { useNavigate } from 'react-router-dom';

const Writing = () => {
  const router = useNavigate();

  const handleClickCancel = () => {
    router('/');
  };

  return (
    <>
      <section className="writing-wrapper">
        <div className="text-wrapper">
          <input className="title" placeholder="제목을 입력하세요" />
          <input className="content" placeholder="내용을 입력하세요" />
        </div>

        <div className="btn-wrapper">
          <button className="uploadBtn">등록</button>
          <button className="cancelBtn" onClick={handleClickCancel}>
            취소
          </button>
        </div>
      </section>
    </>
  );
};

export default Writing;
