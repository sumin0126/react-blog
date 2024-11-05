import { Routes, Route } from 'react-router-dom';

import Home from 'pages/Home';
import PostDetail from 'pages/PostDetail';
import Writing from 'pages/Writing';

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
      </Routes>
    </LayoutContainer>
  );
};

export default App;
