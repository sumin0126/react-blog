import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { CATEGORY } from 'constants/navbar';

/**
 * @description 네비바 컴포넌트
 *
 * @param category -  Home 컴포넌트에서 받아오는 카테고리 데이터
 */
const Navbar = (props) => {
  const { category } = props;

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // 카테고리 정보를 불러오는 함수
  useEffect(() => {
    axios.get(`http://localhost:3001/categories`).then((res) => {
      setCategories(res.data);
    });

    if (category) {
      setSelectedCategory(category);
    }
  }, []);

  // 원하는 카테고리 클릭 시 해당 카테고리 게시물들만 보여주는 함수
  const handleClickCategory = (name) => {
    setSelectedCategory(name);
    navigate(`/main?category=${name}`);
  };

  return (
    <section className="navbar_container">
      <div className="navbar_wrapper">
        {/* 전체보기 카테고리 */}
        <div
          className={`postAll${selectedCategory === 'all' ? ' active' : ''}`}
        >
          <i className="fa-regular fa-file file-icon"></i>
          <i className="fa-solid fa-chevron-right arrow-icon"></i>
          <p onClick={() => handleClickCategory('all')}>전체보기</p>
        </div>

        <div className="detailPost_wrapper">
          {categories.map((category) => {
            if (category.categoryName === 'all') {
              return null;
            }

            return (
              // 그 외 나머지 카테고리
              <div
                className={`category-wrapper${selectedCategory === category.categoryName ? ' active' : ''}`}
                onClick={() => handleClickCategory(category.categoryName)}
                key={category.id}
              >
                <i className="fa-regular fa-file file-icon"></i>
                <i className="fa-solid fa-chevron-right arrow-icon"></i>
                <p>{CATEGORY[category.categoryName]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
