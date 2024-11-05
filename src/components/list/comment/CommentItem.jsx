/**
 * @description 댓글 아이템 컴포넌트
 *
 * @param author - 댓글 작성자
 * @param createdAt - 댓글 만든 날짜
 * @param content - 댓글 내용
 */
const CommentItem = (props) => {
  const { author, createdAt, content } = props;

  return (
    <section className="post-comments">
      <div className="comment-header">
        <div className="comment-user">
          <div className="comment-user-img"></div>
          <div className="comment-author">{author}</div>
        </div>
        <div className="comment-createdAt">{createdAt}</div>
      </div>

      <div className="comment-content">{content}</div>
    </section>
  );
};

export default CommentItem;