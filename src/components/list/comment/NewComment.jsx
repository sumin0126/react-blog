import React, { useState } from 'react';
import axios from 'axios';

import { getDate } from 'utils/common';
import AlertModal from 'components/modal/AlertModal';

/**
 * @description 새 댓글 컴포넌트
 *
 * @param postId - 포스트 id
 * @param getComments - 댓글들
 */
const NewComment = (props) => {
  const { postId, getComments } = props;

  const [modalTitle, setModalTitle] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [comment, setComment] = useState({
    author: '',
    content: '',
  });

  // 댓글 취소 버튼을 클릭하면 comment 상태를 초기화시켜주는 함수
  const handleClickCommentCancel = () => {
    setComment({ author: '', content: '' });
  };

  // 댓글 등록 버튼을 클릭하면 데이터를 server에 전송해주는 함수
  const handleClickCommentUpload = () => {
    if (comment.author !== '' && comment.content !== '') {
      const commentInfo = {
        postId: postId,
        author: comment.author,
        content: comment.content,
        createdAt: getDate(),
      };

      axios
        .post(`http://localhost:3001/comments?postId=${postId}`, commentInfo)
        .then(() => {
          setModalTitle('댓글 등록이 완료 되었습니다 !');
          setIsOpenModal(true);
          setComment({ author: '', content: '' });
          getComments();
        });
    } else {
      setModalTitle('이름과 내용을 입력하세요 !');
      setIsOpenModal(true);
    }
  };

  // 이름을 입력하면 comment 상태에 저장해주는 함수
  const handleChangeAuthor = (e) => {
    const newAuthor = e.target.value;
    setComment({ ...comment, author: newAuthor });
  };

  // 내용을 입력하면 comment 상태에 저장해주는 함수
  const handleChangeCommentContent = (e) => {
    const newCommentContent = e.target.value;
    setComment({ ...comment, content: newCommentContent });
  };

  return (
    <>
      {isOpenModal && (
        <AlertModal
          title={modalTitle}
          completeText="확인"
          onClickComplete={() => setIsOpenModal(false)}
          modalClose={() => setIsOpenModal(false)}
        />
      )}
      <div className="new-comment-box">
        <div className="top">
          <div className="user">
            <div className="user-img"></div>
            <input
              type="text"
              className="user-name"
              placeholder="이름을 입력하세요."
              value={comment.author}
              onChange={handleChangeAuthor}
            ></input>
          </div>
          <div className="date">{getDate()}</div>
        </div>

        <textarea
          className="content"
          placeholder="댓글 내용을 입력하세요."
          value={comment.content}
          onChange={handleChangeCommentContent}
        ></textarea>

        <div className="btn-wrapper">
          <button
            className="comment-upload-btn"
            onClick={handleClickCommentUpload}
          >
            등록
          </button>
          <button
            className="comment-cancel-btn"
            onClick={handleClickCommentCancel}
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default NewComment;
