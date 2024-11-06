import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate('/');
  };

  const handleClickWriting = () => {
    navigate('/post/new');
  };

  return (
    <header>
      <div className="headerBar">
        <h2 onClick={handleClickLogo}>smooth.log</h2>

        <div className="header_right">
          <div className="searchInput">
            <i className="fa-solid fa-search"></i>
            <input placeholder="검색어를 입력하세요"></input>
          </div>

          <div className="writingBtn" onClick={handleClickWriting}>
            ✐ 글쓰기
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
