import React from 'react';

import PostItem from 'components/list/post/PostItem';

const PostList = (props) => {
  const { posts } = props;

  return (
    <>
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
    </>
  );
};

export default PostList;
