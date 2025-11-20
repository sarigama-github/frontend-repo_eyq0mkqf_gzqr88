import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useZoo, actions } from '../context/ZooContext'
import SearchBar from './SearchBar'

function Header() {
  const { state, dispatch } = useZoo()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
          <img src="/assets/zoo-logo.svg" alt="Virtual Zoo" className="w-8 h-8" />
          <span className="font-bold text-lg">Virtual Zoo</span>
        </Link>

        <div className="ml-auto flex-1 max-w-md">
          <SearchBar
            value={state.search}
            onChange={(val) => dispatch({ type: actions.SET_SEARCH, value: val })}
            onSubmit={() => navigate('/')}
          />
        </div>

        <nav aria-label="Primary" className="flex items-center gap-3">
          <NavLink to="/favorites" className={({isActive}) => `px-3 py-2 rounded hover:bg-slate-100 ${isActive? 'font-semibold' : ''}`}>Favorites</NavLink>
          <NavLink to="/admin" className={({isActive}) => `px-3 py-2 rounded hover:bg-slate-100 ${isActive? 'font-semibold' : ''}`}>Admin</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
