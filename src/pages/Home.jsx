import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PostList from '../components/list/post/PostList';

const Home = () => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    // 블로그 글 전체 정보를 불러오는 함수
    axios.get('http://localhost:3001/posts').then((res) => {
      setPosts(res.data);
    });
  }, []);

  if (!posts) {
    return;
  }

  return (
    <>
      {/* 블로그 글 목록 */}
      <PostList posts={posts} />
    </>
  );
};

export default Home;
