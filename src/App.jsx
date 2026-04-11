// =============================================================
// App.jsx — Root Component
// =============================================================

import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import { BoardsProvider } from './hooks/BoardsContext'
import ExplorePage from './pages/ExplorePage'
import BoardsPage from './pages/BoardsPage'
import DestinationPage from './pages/DestinationPage'
import SharedBoardPage from './pages/SharedBoardPage'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <BoardsProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<ExplorePage />} />
            <Route path="/destination/:id" element={<DestinationPage />} />
            <Route path="/boards" element={<BoardsPage />} />
            <Route path="/shared/:data" element={<SharedBoardPage />} />
          </Routes>
        </Layout>
      </BoardsProvider>
    </BrowserRouter>
  )
}
