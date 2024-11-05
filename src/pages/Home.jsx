import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PostList from '../components/list/post/PostList';

const Home = () => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    axios.get('http://localhost:3001/posts').then((res) => {
      setPosts(res.data);
    });
  }, []);

  if (!posts) {
    return;
  }

  return (
    <>
      <PostList posts={posts} />
    </>
  );
};

export default Home;
