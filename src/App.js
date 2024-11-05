import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import Writing from './pages/Writing';
import './styles/layout.css';
import './styles/post.css';
import './styles/writing.css';
import LayoutContainer from './components/layout/LayoutContainer';

const App = () => {
  return (
    <BrowserRouter>
      <LayoutContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/writing" element={<Writing />} />
        </Routes>
      </LayoutContainer>
    </BrowserRouter>
  );
};

export default App;
