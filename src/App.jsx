import { Routes, Route } from 'react-router-dom';

import Home from 'pages/Home';
import PostDetail from 'pages/PostDetail';
import Writing from 'pages/Writing';

import LayoutContainer from 'components/layout/LayoutContainer';
import { PATHNAME } from 'constants/common';

import 'styles/main.css';

const App = () => {
  return (
    <LayoutContainer>
      <Routes>
        <Route path={PATHNAME.MAIN} element={<Home />} />
        <Route path={`${PATHNAME.POST}/:id`} element={<PostDetail />} />
        <Route path={PATHNAME.POST_NEW} element={<Writing />} />
        <Route path={PATHNAME.POST_EDIT} element={<Writing />} />
      </Routes>
    </LayoutContainer>
  );
};

export default App;
