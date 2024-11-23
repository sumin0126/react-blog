import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import axios from 'axios';

const PageNation = () => {
  const [posts, setPosts] = useState();
  // const { id } = useParams();

  useEffect(() => {
    const getPostDetail = () => {
      axios.get(`http://localhost:3001/posts`).then((res) => {
        setPosts(res.data);
      });
    };

    getPostDetail();
  }, []);

  const handleClickButton = () => {
    console.log(posts);
  };

  return (
    <>
      <button onClick={handleClickButton}>페이지네이션</button>
      <button className="prev">이전</button>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <button className="next">다음</button>
    </>
  );
};

export default PageNation;
