import React from 'react';
import { useNavigate } from 'react-router-dom';
import img6 from '../../assets/image/img6.jpg';

const Card = (props) => {
  const navigate = useNavigate();

  const handleClickCard = () => {
    navigate(`/post/${props.id}`);
  };

  return (
    <div className="card-wrapper" onClick={handleClickCard}>
      <div className="card-left">
        <div className="title">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="bottom-box">
          <div className="date">{props.date}</div>
          <div className="like">{props.like}</div>
        </div>
      </div>

      <div className="card-right">
        <div className="thumbnail">
          <img src={img6} alt="picture2" width="auto" />
        </div>
      </div>
    </div>
  );
};

export default Card;
