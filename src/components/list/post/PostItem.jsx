import React from 'react';
import { useNavigate } from 'react-router-dom';

import img6 from 'assets/image/img6.jpg';

/**
 * @description 포스트 카드 컴포넌트
 *
 * @param title - 포스트 제목
 * @param content - 포스트 내용
 * @param date - 작성 날짜
 * @param like - 좋아요 개수
 */
const PostItem = (props) => {
  const { title, content, date, like } = props;

  const navigate = useNavigate();

  // 클릭하면 포스트 본문 페이지로 이동하는 함수
  const handleClickPost = () => {
    navigate(`/post/${props.id}`);
  };

  return (
    <div className="card-wrapper" onClick={handleClickPost}>
      <div className="card-left">
        <div className="title">{title}</div>
        <div className="content">{content}</div>
        <div className="bottom-box">
          <div className="date">{date}</div>
          <div className="like">♥ {like}</div>
        </div>
      </div>

      <div className="card-right">
        <div className="thumbnail">
          <img src={img6} alt="picture2" width="auto" />
        </div>
      </div>
    </div>
  );
};

export default PostItem;
