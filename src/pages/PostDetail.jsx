import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import CommentList from '../components/list/comment/CommentList';
import img2 from '../assets/image/img2.jpg';

const PostDetail = () => {
  const [post, setPost] = useState();
  const [comments, setComments] = useState();

  const { id } = useParams();

  useEffect(() => {
    // 블로그 글 상세 정보를 불러오는 함수
    const getPostDetail = () => {
      axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
        setPost(res.data);
      });
    };

    // 댓글들의 정보를 불러오는 함수
    const getComments = () => {
      axios
        .get(`http://localhost:3001/comments?postId=${id}`)
        .then((res) => setComments(res.data));
    };

    getPostDetail();
    getComments();
  }, []);

  if (!post || !comments) {
    return;
  }

  return (
    <>
      {/* 포스트 헤더 영역 */}
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

      {/* 댓글 목록 */}
      <CommentList comments={comments} />
    </>
  );
};

export default PostDetail;
