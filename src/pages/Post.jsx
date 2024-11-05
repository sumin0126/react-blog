import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import CommentCard from '../components/card/comment/CommentCard';
import img2 from '../assets/image/img2.jpg';

const Post = () => {
  const [post, setPost] = useState();

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
      setPost(res.data);
    });
  }, []);

  if (!post) {
    return;
  }

  return (
    <>
      <section className="post-header">
        <h2 className="post-title">{post.title}</h2>
        <div className="post-date-like">
          <div className="post-date">{post.date}</div>
          <div className="post-like">좋아요 : {post.like}</div>
        </div>
      </section>

      <section className="post-content">
        <div className="content-main-img">
          <img src={img2} alt="picture1" width="auto" />
        </div>
        <div className="content-main-text">{post.content}</div>
      </section>

      <section>
        {post.comments.map((comment) => {
          return (
            <CommentCard
              author={comment.author}
              content={comment.content}
              createdAt={comment.createdAt}
            />
          );
        })}
      </section>
    </>
  );
};

export default Post;
