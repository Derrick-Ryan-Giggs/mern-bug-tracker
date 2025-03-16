// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary.jsx';
import Navbar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';

// Import pages
import HomePage from './pages/HomePage.jsx';
//import BugsPage from './pages/BugsPage.jsx';
import NewBugPage from './pages/NewBugPage.jsx';
import BugDetailPage from './pages/BugDetailPage.jsx';
import EditBugPage from './pages/EditBugPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import BugListContainer from './pages/BugListContainer.jsx'

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/bugs" element={<BugListContainer />} />
              <Route path="/bugs/new" element={<NewBugPage />} />
              <Route path="/bugs/:id" element={<BugDetailPage />} />
              <Route path="/bugs/:id/edit" element={<EditBugPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;