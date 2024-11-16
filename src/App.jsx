import { Routes, Route } from 'react-router-dom';

import Home from 'pages/Home';
import PostDetail from 'pages/PostDetail';
import Writing from 'pages/Writing';
import PostCategory from 'pages/PostCategory';

import LayoutContainer from 'components/layout/LayoutContainer';

import 'styles/main.css';

const App = () => {
  return (
    <LayoutContainer>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/post/new" element={<Writing />} />
        <Route path="/post/:id/edit" element={<Writing />} />
        <Route path="/categories/:category" element={<PostCategory />} />
      </Routes>
    </LayoutContainer>
  );
};

export default App;
