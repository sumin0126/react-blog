import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../components/card/Card';

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
      {posts.map((post) => {
        return (
          <Card
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

export default Home;
