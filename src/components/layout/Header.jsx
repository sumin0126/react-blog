import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * @description 헤더
 */
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickLogo = () => {
    navigate('/');
  };

  const handleClickWriting = () => {
    navigate('/post/new');
  };

  const isHome = location.pathname === '/';

  return (
    <header>
      <div className="headerBar">
        <h2 onClick={handleClickLogo}>smooth.log</h2>
        {isHome && (
          <div className="header_right">
            <div className="searchInput">
              <i className="fa-solid fa-search"></i>
              <input placeholder="검색어를 입력하세요"></input>
            </div>

            <div className="writingBtn" onClick={handleClickWriting}>
              ✐ 글쓰기
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
