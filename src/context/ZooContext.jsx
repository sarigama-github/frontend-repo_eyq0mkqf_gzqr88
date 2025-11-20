import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import animalsData from '../../data/animals.json'
import { loadFromStorage, saveToStorage } from '../utils/storage'

// Actions
const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'
const SET_TOUR = 'SET_TOUR'
const SET_SEARCH = 'SET_SEARCH'
const SET_FILTERS = 'SET_FILTERS'
const SET_SORT = 'SET_SORT'

const initialState = {
  animals: animalsData,
  search: '',
  filters: {
    habitat: 'All',
    region: 'All',
    diet: 'All',
    status: 'All',
  },
  sort: 'A-Z',
  favorites: loadFromStorage('favorites', []),
  tourOrder: loadFromStorage('tourOrder', []),
}

function reducer(state, action) {
  switch (action.type) {
    case TOGGLE_FAVORITE: {
      const exists = state.favorites.includes(action.id)
      const favorites = exists
        ? state.favorites.filter((i) => i !== action.id)
        : [...state.favorites, action.id]
      return { ...state, favorites }
    }
    case SET_TOUR:
      return { ...state, tourOrder: action.order }
    case SET_SEARCH:
      return { ...state, search: action.value }
    case SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.filters } }
    case SET_SORT:
      return { ...state, sort: action.value }
    default:
      return state
  }
}

const ZooContext = createContext(null)

export function ZooProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Persist favorites and tour
  useEffect(() => {
    saveToStorage('favorites', state.favorites)
  }, [state.favorites])

  useEffect(() => {
    saveToStorage('tourOrder', state.tourOrder)
  }, [state.tourOrder])

  const value = useMemo(() => ({ state, dispatch }), [state])
  return <ZooContext.Provider value={value}>{children}</ZooContext.Provider>
}

export function useZoo() {
  const ctx = useContext(ZooContext)
  if (!ctx) throw new Error('useZoo must be used within ZooProvider')
  return ctx
}

// Selectors / helpers
export function useFilteredAnimals() {
  const { state } = useZoo()
  const { animals, search, filters, sort } = state

  let list = animals

  if (search) {
    const q = search.toLowerCase()
    list = list.filter(
      (a) =>
        a.commonName.toLowerCase().includes(q) ||
        a.scientificName.toLowerCase().includes(q) ||
        a.habitat.toLowerCase().includes(q)
    )
  }

  if (filters.habitat !== 'All') list = list.filter((a) => a.habitat === filters.habitat)
  if (filters.region !== 'All') list = list.filter((a) => a.region === filters.region)
  if (filters.diet !== 'All') list = list.filter((a) => a.diet === filters.diet)
  if (filters.status !== 'All') list = list.filter((a) => a.conservationStatus === filters.status)

  switch (sort) {
    case 'A-Z':
      list = [...list].sort((a, b) => a.commonName.localeCompare(b.commonName))
      break
    case 'Species':
      list = [...list].sort((a, b) => a.scientificName.localeCompare(b.scientificName))
      break
    case 'Popularity':
      list = [...list].sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      break
    default:
      break
  }

  return list
}

export const actions = {
  TOGGLE_FAVORITE,
  SET_TOUR,
  SET_SEARCH,
  SET_FILTERS,
  SET_SORT,
}
