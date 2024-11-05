import React from 'react';

const CommentCard = (props) => {
  return (
    <section className="post-comments">
      <div className="comment-header">
        <div className="comment-user">
          <div className="comment-user-img"></div>
          <div className="comment-author">{props.author}</div>
        </div>
        <div className="comment-createdAt">{props.createdAt}</div>
      </div>

      <div className="comment-content">{props.content}</div>
    </section>
  );
};

export default CommentCard;
