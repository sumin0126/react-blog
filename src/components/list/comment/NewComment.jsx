import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

/**
 * @description 새 댓글 컴포넌트
 */
const NewComment = () => {
  const [comment, setComment] = useState({
    author: '',
    content: '',
    createdAt: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const handleClickCommentCancel = () => {
    // 댓글 취소 버튼을 클릭하면 comment 상태를 초기화시켜주는 함수
    setComment({ author: '', content: '' });
  };

  const handleClickCommentUpload = () => {
    // 댓글 등록 버튼을 클릭하면 데이터를 server에 전송해주는 함수
    axios.post('http://localhost:3001/comments', comment).then(() => {
      alert('댓글 등록이 완료 되었습니다 !');
      navigate(`/post/${id}`);
      setComment({ author: '', content: '' });
    });
  };

  const handleChangeAuthor = (e) => {
    // userName 창에 텍스트를 입력하면 comment 상태에 저장해주는 함수
    const newAuthor = e.target.value;
    setComment({ ...comment, author: newAuthor });
  };

  const handleChangeCommentContent = (e) => {
    // content 창에 텍스트를 입력하면 comment 상태에 저장해주는 함수
    const newCommentContent = e.target.value;
    setComment({ ...comment, content: newCommentContent });
  };

  return (
    <>
      <div className="newCommentBox">
        <div className="user">
          <div className="userImg"></div>
          <input
            type="text"
            className="userName"
            placeholder="이름을 입력하세요."
            value={comment.author}
            onChange={handleChangeAuthor}
          ></input>
        </div>

        <textarea
          className="content"
          placeholder="댓글 내용을 입력하세요."
          value={comment.content}
          onChange={handleChangeCommentContent}
        ></textarea>

        <div className="btnWrapper">
          <button
            className="commentUploadBtn"
            onClick={handleClickCommentUpload}
          >
            등록
          </button>
          <button
            className="commentCancelBtn"
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
