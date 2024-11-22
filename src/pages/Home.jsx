import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

import PostList from 'components/list/post/PostList';
import Navbar from 'components/Navbar';

/**
 * @description 홈 컴포넌트
 */
const Home = () => {
  const [posts, setPosts] = useState();
  const [searchParams] = useSearchParams();

  const category = searchParams.get('category');

  // 블로그 글 전체 정보를 불러오는 함수
  useEffect(() => {
    let url = category
      ? `http://localhost:3001/posts?category=${category}`
      : `http://localhost:3001/posts`;

    if (category === 'all') {
      url = 'http://localhost:3001/posts';
    }

    axios.get(url).then((res) => {
      setPosts(res.data);
    });
  }, [category]);

  if (!posts) {
    return;
  }

  return (
    <>
      <Navbar />

      {/* 블로그 글 목록 */}
      <PostList posts={posts} />
    </>
  );
};

export default Home;
