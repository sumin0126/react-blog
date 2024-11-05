import React from 'react';

import CommentItem from 'components/list/comment/CommentItem';

/**
 * @description 댓글 목록 컴포넌트
 *
 * @param comments - 댓글 목록
 */
const CommentList = (props) => {
  const { comments } = props;

  return (
    <section>
      {comments.map((comment) => {
        return (
          <CommentItem
            key={comment.id}
            author={comment.author}
            content={comment.content}
            createdAt={comment.createdAt}
          />
        );
      })}
    </section>
  );
};

export default CommentList;
