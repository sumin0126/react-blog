import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import PostList from 'components/list/post/PostList';
import Navbar from 'components/Navbar';
import { searchInputState } from 'stores/search';

/**
 * @description 홈 컴포넌트
 */
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const searchInput = useRecoilValue(searchInputState);

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

  // 검색창에 입력한 키워드로 게시글 타이틀을 필터링해주는 함수
  // 검색어가 변경될때마다 재렌더링됨
  useEffect(() => {
    const newPosts = posts.filter((post) => {
      return post.title.includes(searchInput);
    });
    console.log(newPosts);
    setPosts(newPosts);
  }, [searchInput]);

  if (!posts) {
    return;
  }

  return (
    <>
      {/* 네비바 */}
      <Navbar category={category} />

      {/* 블로그 글 목록 */}
      <PostList posts={posts} />
    </>
  );
};

export default Home;
