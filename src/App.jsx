import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ZooProvider } from './context/ZooContext'
import Header from './components/Header'
import Footer from './components/Footer'

// Code splitting for pages
const HomePage = lazy(() => import('./pages/HomePage'))
const AnimalDetail = lazy(() => import('./pages/AnimalDetail'))
const HabitatPage = lazy(() => import('./pages/HabitatPage'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))

function App() {
  return (
    <ZooProvider>
      <div className="min-h-screen flex flex-col bg-white text-slate-800">
        <Header />
        <main id="main" className="flex-1">
          <Suspense fallback={<div className="p-6" role="status" aria-live="polite">Loading…</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/animal/:id" element={<AnimalDetail />} />
              <Route path="/habitat/:habitat" element={<HabitatPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </ZooProvider>
  )
}

export default App
