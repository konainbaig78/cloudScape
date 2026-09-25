import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import LearnPage from './pages/LearnPage'
import QuizzesPage from './pages/QuizzesPage'
import AITutorPage from './pages/AITutorPage'
import ProgressPage from './pages/ProgressPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/learn"
        element={<LearnPage />}
      />

      <Route
        path="/quizzes"
        element={<QuizzesPage />}
      />

      <Route
        path="/ai-tutor"
        element={<AITutorPage />}
      />

      <Route
        path="/progress"
        element={<ProgressPage />}
      />
    </Routes>
  )
}