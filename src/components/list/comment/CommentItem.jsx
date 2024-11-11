import { useState } from 'react';
import axios from 'axios';

import ConfirmModal from 'components/modal/ConfirmModal';

/**
 * @description 댓글 아이템 컴포넌트
 *
 * @param id - 댓글 ID
 * @param author - 댓글 작성자
 * @param createdAt - 댓글 만든 날짜
 * @param content - 댓글 내용
 */
const CommentItem = (props) => {
  const { id, author, createdAt, content } = props;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  // 휴지통 버튼을 클릭하면 모달을 띄우는 함수
  const handleClickCommentDelete = () => {
    setIsOpenModal(true);
    setModalTitle('댓글을 삭제하시겠습니까?');
  };

  // 휴지통 버튼을 클릭하면 댓글을 삭제해주는 함수
  const deleteComment = () => {
    axios.delete(`http://localhost:3001/comments/${id}`).then(() => {
      setIsOpenModal(false);
    });
  };

  return (
    <>
      {isOpenModal && (
        <ConfirmModal
          title={modalTitle}
          confirmText="확인"
          cancelText="취소"
          onClickConfirm={deleteComment}
          onClickCancel={() => setIsOpenModal(false)}
          modalClose={() => setIsOpenModal(false)}
        />
      )}
      <section className="post-comments">
        <div className="comment-header">
          <div className="comment-user">
            <div className="comment-user-img"></div>
            <div className="comment-author">{author}</div>
          </div>

          <div className="comment-header-right">
            <div className="comment-createdAt">{createdAt}</div>
            <i class="fa-solid fa-trash" onClick={handleClickCommentDelete}></i>
          </div>
        </div>

        <div className="comment-content">{content}</div>
      </section>
    </>
  );
};

export default CommentItem;
