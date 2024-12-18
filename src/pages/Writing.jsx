import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { getDate } from 'utils/common';
import AlertModal from 'components/modal/AlertModal';
import { REVERSE_CATEGORY } from 'constants/navbar2';
import { CATEGORY } from 'constants/navbar';

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
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [fileName, setFileName] = useState('');
  const titleInputRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // 새 글 등록인지, 수정인지 확인하고 글 상세정보를 불러오는 함수
  useEffect(() => {
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

  // 모달 타이틀을 받아서 상태를 업데이트해주고 모달창을 띄워주는 함수
  const createModal = (title) => {
    setModalTitle(title);
    setIsOpenModal(true);
  };

  // 수정된 글을 서버에 저장해주는 함수
  // 등록된 글을 서버에 전송해주는 함수
  const handleUpload = () => {
    if (post.title === '' || post.content === '') {
      createModal('제목과 내용을 입력하세요 !');
      return null;
    }

    if (!post.category) {
      createModal('카테고리를 선택하세요 !');
      return;
    }

    if (isEdit) {
      axios.put(`http://localhost:3001/posts/${id}`, post).then(() => {
        createModal('수정이 완료되었습니다 !');
      });
    } else {
      axios.post('http://localhost:3001/posts', post).then(() => {
        createModal('등록이 완료되었습니다 !');
      });
    }
  };

  // 썸네일 이미지 업로드해주는 함수
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      setPost({ ...post, thumbnail: fileReader.result });
    };
  };

  // 취소 버튼을 클릭하면 이전 페이지로 돌아가는 함수
  const handleClickCancel = () => {
    navigate(-1);
  };

  // 카테고리 정보를 불러오는 함수
  useEffect(() => {
    axios.get(`http://localhost:3001/categories`).then((res) => {
      setCategories(res.data);
    });
  }, []);

  // 클릭한 카테고리를 새 category로 저장해주는 함수
  const handleChangeCategory = (e) => {
    const newCategory = e.target.textContent;
    setPost({ ...post, category: REVERSE_CATEGORY[newCategory] });
    setSelectedCategory(newCategory);
  };

  // 제목 인풋창에 커서를 활성화 시켜주는 함수
  useEffect(() => {
    titleInputRef.current.focus();
  }, []);

  return (
    <>
      {isOpenModal && (
        <AlertModal
          title={modalTitle}
          completeText="확인"
          onClickComplete={() => {
            setIsOpenModal(false);
            if (modalTitle.includes('수정') || modalTitle.includes('등록')) {
              navigate(-1);
            }
          }}
          modalClose={() => setIsOpenModal(false)}
        />
      )}

      {/* 글쓰기 페이지 전체 래퍼 */}
      <section className="writing-wrapper">
        {/* 텍스트와 사이드를 관리하는 래퍼 */}
        <section className="text-side-wrapper">
          {/* 제목/내용 인풋창 래퍼 */}
          <section className="text-wrapper">
            <input
              className="title"
              placeholder="제목을 입력하세요"
              value={post.title}
              onChange={handleChangeTitle}
              ref={titleInputRef}
            />

            {post.thumbnail && (
              <img
                src={post.thumbnail}
                alt="thumbnail"
                width={200}
                height={200}
              />
            )}

            <textarea
              className="content"
              placeholder="내용을 입력하세요"
              value={post.content}
              onChange={handleChangeContent}
            />
          </section>

          <section className="side-wrapper">
            {/* 카테고리 버튼창 */}
            <div className="category">
              <p className="category-title">카테고리를 선택하세요 !</p>

              <div className="category-list" onClick={handleChangeCategory}>
                {categories
                  .filter((category) => category.categoryName !== 'all')
                  .map((category) => (
                    <div
                      className={`category-list-title
                        ${selectedCategory === CATEGORY[category.categoryName] ? ' active' : ''}`}
                      key={category.id}
                      onClick={(e) => handleChangeCategory(e)}
                    >
                      <i className="fa-regular fa-file category-file-icon"></i>
                      <p className="category-name">
                        {CATEGORY[category.categoryName]}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* 이미지 인풋창 */}
            <div className="image-input">
              <input
                className="file-upload-name"
                value={fileName}
                readOnly
                placeholder="첨부파일"
              />
              <label for="file">파일찾기</label>
              <input
                type="file"
                id="file"
                accept="image/*"
                onChange={handleUploadImage}
              />
            </div>

            {/* 버튼 래퍼 */}
            <section className="btn-wrapper">
              <button className="uploadBtn" onClick={handleUpload}>
                {isEdit ? '수정' : '등록'}
              </button>
              <button className="cancelBtn" onClick={handleClickCancel}>
                취소
              </button>
            </section>
          </section>
        </section>
      </section>
    </>
  );
};

export default Writing;
