import { useState, useEffect } from 'react';

import PostItem from 'components/list/post/PostItem';

/**
 * @description 포스트 카드 목록 컴포넌트
 *
 * @param posts - 포스트 카드 목록
 */
const PostList = (props) => {
  const [isMorePost, setIsMorePost] = useState(false);
  const [currentPosts, setCurrentPosts] = useState(5);

  const { posts } = props;

  // 게시글의 총 수가 5개 이상일때만, 더보기버튼을 화면에 보여주는 함수
  useEffect(() => {
    setIsMorePost(posts.length > 5 ? true : false);
  }, [posts]);

  useEffect(() => {
    if (currentPosts >= posts.length) {
      setIsMorePost(false);
    }
  }, [currentPosts, posts]);

  // 더보기 버튼을 클릭하면 현재 게시글의 상태를 업데이트해주는 함수
  const handleClickMorePosts = () => {
    setCurrentPosts(currentPosts + 5);
  };

  // 현재 페이지에서만 보여줄 게시글의 개수
  const displayPosts = posts.slice(0, currentPosts);

  return (
    <div className="card">
      {displayPosts.map((post) => {
        return (
          <PostItem
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            date={post.date}
            like={post.like}
            thumbnail={post.thumbnail}
          />
        );
      })}

      {isMorePost && (
        <div className="more-post-wrapper">
          <button className="morePostBtn" onClick={handleClickMorePosts}>
            <p>더보기</p>
            <i className="fa-solid fa-chevron-down"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default PostList;
