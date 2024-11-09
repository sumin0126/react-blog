import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { getDate } from 'utils/common';

/**
 * @description - 글 수정 및 등록 컴포넌트
 */
const Writing = () => {
  const [isEdit, setIsEdit] = useState();
  const [post, setPost] = useState({
    title: '',
    content: '',
    date: getDate(),
    like: 0,
    thumbnail: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // 새로운 글 등록인지, 수정인지 확인하고 글 상세정보를 불러오는 함수
    if (window.location.pathname === '/post/new') {
      setIsEdit(false);
    } else {
      setIsEdit(true);
      axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
        setPost(res.data);
      });
    }
  }, []);

  // title 인풋창에 입력된 값을 새 title로 저장해주는 함수
  const handleChangeTitle = (e) => {
    const newTitle = e.target.value;
    setPost({ ...post, title: newTitle });
  };

  // content 인풋창에 입력된 값을 새 content로 저장해주는 함수
  const handleChangeContent = (e) => {
    const newContent = e.target.value;
    setPost({ ...post, content: newContent });
  };

  // 수정된 글을 저장하고 알림창을 띄워준 뒤, 이전 페이지로 돌아가는 함수
  // 등록된 글을 server에 보내고 알림창을 띄워준 뒤, 이전 페이지로 돌아가는 함수
  const handleUpload = () => {
    if (post.title === '' || post.content === '') {
      alert('제목과 내용을 입력하세요 !');
      return null;
    }

    if (isEdit) {
      axios.put(`http://localhost:3001/posts/${id}`, post).then(() => {
        alert('수정이 완료 되었습니다 !');
        navigate(-1);
      });
    } else {
      axios.post('http://localhost:3001/posts', post).then(() => {
        alert('등록이 완료 되었습니다 !');
        navigate(-1);
      });
    }
  };

  const handleClickCancel = () => {
    // 취소 버튼을 클릭하면 이전 페이지로 돌아가는 함수
    navigate(-1);
  };

  return (
    <>
      <section className="writing-wrapper">
        <div className="text-wrapper">
          <input
            className="title"
            placeholder="제목을 입력하세요"
            value={post.title}
            onChange={handleChangeTitle}
          />
          <input
            className="content"
            placeholder="내용을 입력하세요"
            value={post.content}
            onChange={handleChangeContent}
          />
        </div>

        <div className="btn-wrapper">
          <button className="uploadBtn" onClick={handleUpload}>
            {isEdit ? '수정' : '등록'}
          </button>
          <button className="cancelBtn" onClick={handleClickCancel}>
            취소
          </button>
        </div>
      </section>
    </>
  );
};

export default Writing;
