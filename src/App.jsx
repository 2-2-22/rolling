import { Layout } from './pages/Layout';
import { LandingPage } from './pages/LandingPage';
import { ListPage } from './pages/ListPage';
import { PostCardPage } from './pages/PostCardPage';
import { PostMessagePage } from './pages/PostMessagePage';
import { CardPostListPage } from './pages/CardPostListPage';
import { ErrorPage404 } from './pages/ErrorPage404';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="list" element={<ListPage />} />
          <Route path="post" element={<PostCardPage />} />
          <Route
            path="post/:recipientId/messages"
            element={<PostMessagePage />}
          />
          <Route path="post/:recipientId" element={<CardPostListPage />} />
          <Route path="post/:recipientId/edit" element={<CardPostListPage />} />
        </Route>
        <Route path="*" element={<ErrorPage404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
