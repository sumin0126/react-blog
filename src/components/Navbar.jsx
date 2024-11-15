import React from 'react';

const Navbar = () => {
  return (
    <section className="navbar_wrapper">
      <div className="postAll">
        <i className="fa-regular fa-file file-icon"></i>
        <i className="fa-solid fa-chevron-right arrow-icon"></i>
        <p>전체보기</p>
      </div>

      <div className="detailPost_wrapper">
        <div className="food">
          <i className="fa-regular fa-file file-icon"></i>
          <i className="fa-solid fa-chevron-right arrow-icon"></i>
          <p>맛집 탐험</p>
        </div>
        <div className="travel">
          <i className="fa-regular fa-file file-icon"></i>
          <i className="fa-solid fa-chevron-right arrow-icon"></i>
          <p>국내 여행</p>
        </div>
        <div className="world-travel">
          <i className="fa-regular fa-file file-icon"></i>
          <i className="fa-solid fa-chevron-right arrow-icon"></i>
          <p>해외 여행</p>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
