import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * @description 헤더
 */
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [searchWord, setSearchWord] = useState();

  // 로고를 클릭하면 홈 페이지로 이동하는 함수
  const handleClickLogo = () => {
    navigate('/main');
  };

  // 글쓰기 버튼을 클릭하면 글작성 페이지로 이동하는 함수
  const handleClickWriting = () => {
    navigate('/post/new');
  };

  // 서버에 있는 모든 블로그 글을 불러오는 함수
  // useEffect(() => {
  //   const getPosts = () => {
  //     axios.get('http://localhost:3001/posts').then((res) => {
  //       setPosts(res.data);
  //     });
  //   };

  //   getPosts();
  // }, []);

  // 검색창을 클릭하면 최근검색어 모달이 나오는 함수
  const handleClickSearch = () => {
    if (isOpenSearch === false) {
      setIsOpenSearch(true);
    } else {
      setIsOpenSearch(false);
    }
  };

  // 검색창에 입력한 단어를 저장해주는 함수
  const handleChangeWord = (e) => {
    setSearchWord(e.target.value);
  };

  // 블로그 글 제목 중 검색한 단어를 포함한 글을 골라내는 함수
  // const filteredPosts = () => {
  //   posts.filter((post) =>
  //     post.title.toLowerCase().includes(searchWord.toLowerCase()),
  //   );
  // };

  const isHome = location.pathname === '/main';

  return (
    <header>
      <div className="headerBar">
        <div className="header_left">
          <h2 onClick={handleClickLogo}>smooth.log</h2>
        </div>

        {isHome && (
          <div className="header_right">
            <div className="searchInput" onClick={handleClickSearch}>
              <i className="fa-solid fa-search"></i>
              <input
                placeholder="검색어를 입력하세요"
                value={searchWord}
                onChange={handleChangeWord}
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
