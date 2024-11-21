import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { getDate } from 'utils/common';
import AlertModal from 'components/modal/AlertModal';

/**
 * @description - 글 수정 및 등록 컴포넌트
 */
const Writing = () => {
  const [isEdit, setIsEdit] = useState();
  const [post, setPost] = useState({
    category: '',
    title: '',
    content: '',
    date: getDate(),
    like: 0,
    thumbnail: '',
  });
  const [modalTitle, setModalTitle] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    // 새로운 글 등록인지, 수정인지 확인하고 글 상세정보를 불러오는 함수
    if (location.pathname === '/post/new') {
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

  // 클릭한 카테고리를 새 category로 저장해주는 함수
  const handleChangeCategory = (e) => {
    const newCategory = e.target.textContent;
    setPost({ ...post, category: newCategory });
  };

  // 수정된 글 저장 및 완료 모달 띄워주는 함수
  // 등록된 글 전송 및 완료 모달 띄워주는 함수
  const handleUpload = () => {
    if (post.title === '' || post.content === '') {
      setModalTitle('제목과 내용을 입력하세요 !');
      setIsOpenModal(true);
      return null;
    }

    if (isEdit) {
      axios.put(`http://localhost:3001/posts/${id}`, post).then(() => {
        setModalTitle('수정이 완료 되었습니다 !');
        setIsOpenModal(true);
      });
    } else {
      axios.post('http://localhost:3001/posts', post).then(() => {
        setModalTitle('등록이 완료 되었습니다 !');
        setIsOpenModal(true);
      });
    }
  };

  // 취소 버튼을 클릭하면 이전 페이지로 돌아가는 함수
  const handleClickCancel = () => {
    navigate(-1);
  };

  // 카테고리 버튼을 누르면 카테고리 메뉴가 열리고 닫히는 함수
  const handleClickCategory = () => {
    if (isOpenCategory === false) {
      setIsOpenCategory(true);
    } else {
      setIsOpenCategory(false);
    }
  };

  // 카테고리 메뉴에서 원하는 카테고리를 선택하면 화면에 보여주는 함수
  const handleClickSelectCategory = (e) => {
    const selectCategory = e.target.textContent;
    const category = document.querySelector('.category-title');

    category.textContent = selectCategory;
    setIsOpenCategory(false);
  };

  return (
    <>
      {isOpenModal && (
        <AlertModal
          title={modalTitle}
          completeText="확인"
          onClickComplete={() => {
            setIsOpenModal(false);
            navigate(-1);
          }}
          modalClose={() => setIsOpenModal(false)}
        />
      )}
      <section className="writing-wrapper">
        <div className="category" onClick={handleClickCategory}>
          <p className="category-title">카테고리</p>
          <i className="fa-solid fa-sort-down bottom-arrow"></i>
        </div>

        {isOpenCategory && (
          <div className="category-dropdown" onClick={handleChangeCategory}>
            <div className="food" onClick={handleClickSelectCategory}>
              <i className="fa-regular fa-file file-icon"></i>
              <p>맛집 탐험</p>
            </div>
            <div className="travel" onClick={handleClickSelectCategory}>
              <i className="fa-regular fa-file file-icon"></i>
              <p>국내 여행</p>
            </div>
            <div className="world-travel" onClick={handleClickSelectCategory}>
              <i className="fa-regular fa-file file-icon"></i>
              <p>해외 여행</p>
            </div>
          </div>
        )}

        <div className="text-wrapper">
          <input
            className="title"
            placeholder="제목을 입력하세요"
            value={post.title}
            onChange={handleChangeTitle}
          />

          <textarea
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
