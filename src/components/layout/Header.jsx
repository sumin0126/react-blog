import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Navbar from 'components/Navbar';

/**
 * @description 헤더
 */
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openNavbar, setOpenNavbar] = useState(false);

  // 로고를 클릭하면 홈 페이지로 이동하는 함수
  const handleClickLogo = () => {
    navigate('/');
  };

  // 글쓰기 버튼을 클릭하면 글작성 페이지로 이동하는 함수
  const handleClickWriting = () => {
    navigate('/post/new');
  };

  // 메뉴 버튼을 클릭하면 네비게이션바가 열리고 닫히는 함수
  const handleClickBars = () => {
    const navBar = document.querySelector('.navbar_wrapper');
    const navBarBg = document.querySelector('.navbarBg');

    if (openNavbar === false) {
      navBar.classList.add('active');
      navBarBg.classList.add('active');
      setOpenNavbar(true);
    } else {
      navBar.classList.remove('active');
      navBarBg.classList.remove('active');
      setOpenNavbar(false);
    }
  };

  const isHome = location.pathname === '/';

  return (
    <header>
      <div className="headerBar">
        <div className="header_left">
          {isHome && (
            <i className="fa-solid fa-bars" onClick={handleClickBars}></i>
          )}
          <h2 onClick={handleClickLogo}>smooth.log</h2>
        </div>

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
      <Navbar />
    </header>
  );
};

export default Header;
