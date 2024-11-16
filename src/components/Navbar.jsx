import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * @description 네비바 컴포넌트
 */

const Navbar = () => {
  const navigate = useNavigate();

  // 네비바와 네비바 배경을 닫아주는 함수
  const closeNavBar = () => {
    const navBar = document.querySelector('.navbar_wrapper');
    const navBarBg = document.querySelector('.navbarBg');

    navBar.classList.remove('active');
    navBarBg.classList.remove('active');
  };

  // 네비바 배경을 클릭하면 네비바와 배경을 닫는 함수
  const handleClickNavBarBg = () => {
    closeNavBar();
  };

  // 전체보기 카테고리를 클릭하면 홈 페이지로 이동하는 함수
  const handleClickPostAll = () => {
    closeNavBar();
    navigate('/');
  };

  // 그외에 카테고리를 클릭하면 해당 카테고리 페이지로 이동하는 함수
  const handleClickCategory = (e) => {
    const categoryNavBar = e.target.textContent;

    closeNavBar();
    navigate(`/categories/${categoryNavBar}`);
  };

  return (
    <>
      <section className="navbarBg" onClick={handleClickNavBarBg}></section>
      <section className="navbar_wrapper">
        <div className="postAll">
          <i className="fa-regular fa-file file-icon"></i>
          <i className="fa-solid fa-chevron-right arrow-icon"></i>
          <p onClick={handleClickPostAll}>전체보기</p>
        </div>

        <div className="detailPost_wrapper">
          <div className="food" onClick={handleClickCategory}>
            <i className="fa-regular fa-file file-icon"></i>
            <i className="fa-solid fa-chevron-right arrow-icon"></i>
            <p>맛집 탐험</p>
          </div>
          <div className="travel" onClick={handleClickCategory}>
            <i className="fa-regular fa-file file-icon"></i>
            <i className="fa-solid fa-chevron-right arrow-icon"></i>
            <p>국내 여행</p>
          </div>
          <div className="world-travel" onClick={handleClickCategory}>
            <i className="fa-regular fa-file file-icon"></i>
            <i className="fa-solid fa-chevron-right arrow-icon"></i>
            <p>해외 여행</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
