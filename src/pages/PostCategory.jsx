import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import PostList from 'components/list/post/PostList';

/**
 * @description 카테고리 컴포넌트
 */
const PostCategory = () => {
  const [posts, setPosts] = useState();
  const { category } = useParams();

  // 해당 카테고리에 글의 정보를 불러오는 함수
  useEffect(() => {
    axios
      .get(`http://localhost:3001/posts?category=${category}`)
      .then((res) => {
        setPosts(res.data);
      });
  }, []);

  if (!posts) {
    return;
  }

  return (
    <>
      <p>{category} 페이지</p>
      <PostList posts={posts} />
    </>
  );
};

export default PostCategory;
