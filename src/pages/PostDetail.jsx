import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import CommentList from 'components/list/comment/CommentList';
import NewComment from 'components/list/comment/NewComment';
import ConfirmModal from 'components/modal/ConfirmModal';
import { CATEGORY } from 'constants/navbar';
import { PATHNAME } from 'constants/common';

/**
 * @description 블로그 글 상세정보 컴포넌트
 */
const PostDetail = () => {
  const [post, setPost] = useState();
  const [user, setUser] = useState([]);
  const [comments, setComments] = useState([]);
  const [modalTitle, setModalTitle] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [like, setLike] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();

  const isLiked = user[0]?.likedPost.includes(id);

  // 댓글들의 정보를 불러오는 함수
  const getComments = () => {
    axios
      .get(`http://localhost:3001/comments?postId=${id}`)
      .then((res) => setComments(res.data));
  };

  // 블로그 글 상세 정보, 좋아요 수, 유저 정보를 불러오는 함수
  useEffect(() => {
    const getPostDetail = () => {
      axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
        setPost(res.data);
        setLike(res.data.like);
      });
    };

    const getUserInfo = () => {
      axios.get('http://localhost:3001/users').then((res) => setUser(res.data));
    };

    getPostDetail();
    getUserInfo();
    getComments();
  }, [like]);

  // 수정 버튼을 클릭하면 수정 페이지로 이동하는 함수
  const handleClickEdit = () => {
    navigate(`/post/${id}/edit`);
  };

  // 서버에 삭제 요청을 보내는 함수
  const deletePost = () => {
    axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
      navigate(PATHNAME.MAIN);
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
    const newLikeCount = isLiked ? like - 1 : like + 1;
    setLike(newLikeCount);

    axios
      .put(`http://localhost:3001/posts/${id}`, {
        ...post,
        like: newLikeCount,
      })
      .then(() => console.log('서버에 좋아요 수가 업데이트 되었습니다 !'));

    likePostUpdate();
  };

  // 좋아요 누른 포스트 아이디를 서버에 업데이트 해주는 함수
  const likePostUpdate = () => {
    let newLikedPost;
    const userId = user[0].id;

    // isLiked가 참이면 -> id를 좋아요 목록에서 제거
    // isLiked가 거짓이면 -> id를 좋아요 목록에 추가
    if (isLiked) {
      newLikedPost = user[0].likedPost.filter((post) => post !== id);
    } else {
      newLikedPost = user[0].likedPost.concat(id);
    }

    axios.put(`http://localhost:3001/users/${userId}`, {
      ...user[0],
      likedPost: newLikedPost,
    });
  };

  // 카테고리 클릭 시 해당 카테고리의 게시물만 보여주는 함수
  const handleClickCategory = (name) => {
    if (post.category) {
      navigate(`/main?category=${name}`);
    }
  };

  if (!post) {
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
          <p
            className="post-category"
            onClick={() => handleClickCategory(post.category)}
          >
            {CATEGORY[post.category]}
          </p>

          <h2 className="post-title">{post.title}</h2>

          <div className="post-info">
            <div className="info-left">
              <div className="info-date">{post.date}</div>
              <div className="info-like" onClick={handleClickLike}>
                <i
                  className={`fa-heart ${isLiked ? 'fa-solid' : 'fa-regular'}`}
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

        {/* 포스트 콘텐츠 영역 */}
        <section className="post-content">
          <div className="content-main-img">
            <img src={post.thumbnail} alt="picture1" width="auto" />
          </div>
          <div className="content-main-text">{post.content}</div>
        </section>

        {/* 댓글 목록 컴포넌트 */}
        <CommentList comments={comments} getComments={getComments} />

        {/* 새 댓글 컴포넌트 */}
        <NewComment postId={id} getComments={getComments} />
      </section>
    </>
  );
};

export default PostDetail;
