import React from 'react';

import CommentItem from 'components/list/comment/CommentItem';

/**
 * @description 댓글 목록 컴포넌트
 *
 * @param comments - 댓글 목록
 * @param getComments - 댓글들
 */
const CommentList = (props) => {
  const { comments, getComments } = props;

  return (
    <section>
      {comments.map((comment) => {
        return (
          <CommentItem
            key={comment.id}
            id={comment.id}
            author={comment.author}
            content={comment.content}
            createdAt={comment.createdAt}
            getComments={getComments}
          />
        );
      })}
    </section>
  );
};

export default CommentList;
