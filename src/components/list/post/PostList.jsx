import React from 'react';

import PostItem from 'components/list/post/PostItem';

/**
 * @description 포스트 카드 목록 컴포넌트
 *
 * @param posts - 포스트 카드 목록
 */
const PostList = (props) => {
  const { posts } = props;

  return (
    <div className="card">
      {posts.map((post) => {
        return (
          <PostItem
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            date={post.date}
            like={post.like}
          />
        );
      })}
    </div>
  );
};

export default PostList;
