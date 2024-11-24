import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { PATHNAME } from 'constants/common';
import { useRecoilState } from 'recoil';
import { searchInputState } from 'stores/search';

/**
 * @description 헤더
 */
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchInput, setSearchInput] = useRecoilState(searchInputState);

  // 로고를 클릭하면 홈 페이지로 이동하는 함수
  const handleClickLogo = () => {
    navigate(PATHNAME.MAIN);
  };

  // 글쓰기 버튼을 클릭하면 글작성 페이지로 이동하는 함수
  const handleClickWriting = () => {
    navigate(PATHNAME.POST_NEW);
  };

  // 화면 클릭 시 최근검색어 창을 닫아주는 함수
  useEffect(() => {
    const closeSearchInput = () => {
      setIsOpenSearch(false);
    };

    document.addEventListener('click', closeSearchInput);

    return () => {
      document.removeEventListener('click', closeSearchInput);
    };
  }, []);

  // 검색창을 클릭하면 최근검색어 모달이 나오는 함수
  const handleClickSearch = (e) => {
    e.stopPropagation();
    setIsOpenSearch(true);
  };

  // 검색창에 입력하는 값을 상태로 업데이트 해주는 함수
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // 검색어 입력 후, 엔터키를 누르면 상태를 업데이트해서 재렌더링 해주는 함수
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchInput(inputValue);
    }
  };

  const isHome = location.pathname === PATHNAME.MAIN;

  return (
    <header>
      <div className="headerBar">
        <div className="header_left">
          <h2 onClick={handleClickLogo}>smooth.log ᴗ̈</h2>
        </div>

        {isHome && (
          <div className="header_right">
            <div className="searchInput" onClick={handleClickSearch}>
              <i className="fa-solid fa-search"></i>
              <input
                placeholder="검색어를 입력하세요"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              ></input>

              {isOpenSearch && (
                <div className="search-dropdown">
                  <p className="info">최근 검색어</p>
                </div>
              )}
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
