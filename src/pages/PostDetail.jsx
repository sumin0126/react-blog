import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import CommentList from 'components/list/comment/CommentList';
import img2 from 'assets/image/img2.jpg';
import NewComment from 'components/list/comment/NewComment';
import ConfirmModal from 'components/modal/ConfirmModal';

/**
 * @description 블로그 글 상세정보 컴포넌트
 */
const PostDetail = () => {
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [modalTitle, setModalTitle] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [like, setLike] = useState(0);
  const [isLike, setIsLike] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // 블로그 글 상세 정보를 불러오는 함수
  useEffect(() => {
    const getPostDetail = () => {
      axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
        setPost(res.data);
        setLike(res.data.like);
      });
    };

    // 댓글들의 정보를 불러오는 함수
    const getComments = () => {
      axios
        .get(`http://localhost:3001/comments?postId=${id}`)
        .then((res) => setComments(res.data));
    };

    getPostDetail();
    getComments();
  }, []);

  // 수정 버튼을 클릭하면 수정 페이지로 이동하는 함수
  const handleClickEdit = () => {
    navigate(`/post/${id}/edit`);
  };

  // 서버에 삭제 요청을 보내는 함수
  const deletePost = () => {
    axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
      navigate('/');
    });
  };

  // 삭제 버튼을 클릭하면 모달을 여는 함수
  const handleClickPostCancel = () => {
    setModalTitle('글을 삭제하시겠습니까?');
    setIsOpenModal(true);
  };

  // 하트아이콘을 클릭하면 like와 post 상태를 동시에 업데이트해주고
  // 변경된 좋아요 수를 서버에 업데이트 해주는 함수
  const handleClickLike = () => {
    const newLikeCount = isLike ? like - 1 : like + 1;
    setLike(newLikeCount);
    setPost({ ...post, like: newLikeCount });
    setIsLike(!isLike);

    axios
      .put(`http://localhost:3001/posts/${id}`, {
        ...post,
        like: newLikeCount,
      })
      .then(() => console.log('서버에 좋아요 수가 업데이트 되었습니다 !'));
  };

  // 카테고리를 클릭하면 해당 카테고리 페이지로 이동하는 함수
  const handleClickCategory = () => {
    if (post.category) {
      navigate(`/categories/${post.category}`);
    }
  };

  if (!post || !comments) {
    return;
  }

  return (
    <>
      {isOpenModal && (
        <ConfirmModal
          title={modalTitle}
          confirmText="확인"
          cancelText="취소"
          onClickConfirm={() => {
            deletePost();
            setIsOpenModal(false);
          }}
          onClickCancel={() => setIsOpenModal(false)}
          modalClose={() => setIsOpenModal(false)}
        />
      )}
      {/* 포스트 헤더 영역 */}
      <section className="post-wrapper">
        <section className="post-header">
          <p className="post-category" onClick={handleClickCategory}>
            {post.category}
          </p>
          <h2 className="post-title">{post.title}</h2>

          <div className="post-info">
            <div className="info-left">
              <div className="info-date">{post.date}</div>
              <div className="info-like" onClick={handleClickLike}>
                <i
                  className={`fa-heart ${isLike ? 'fa-solid' : 'fa-regular'}`}
                ></i>
                <div>{post.like}</div>
              </div>
            </div>

            <div className="info-right">
              <button className="info-edit" onClick={handleClickEdit}>
                수정
              </button>
              <button className="info-cancel" onClick={handleClickPostCancel}>
                삭제
              </button>
            </div>
          </div>
        </section>

        {/* 포스트 콘텐트 영역 */}
        <section className="post-content">
          <div className="content-main-img">
            <img src={img2} alt="picture1" width="auto" />
          </div>
          <div className="content-main-text">{post.content}</div>
        </section>

        {/* 댓글 목록 컴포넌트 */}
        <CommentList comments={comments} />

        {/* 새 댓글 컴포넌트 */}
        <NewComment postId={id} />
      </section>
    </>
  );
};

export default PostDetail;
