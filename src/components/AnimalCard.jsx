import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useZoo, actions } from '../context/ZooContext'

function StatusBadge({ status }) {
  const color = {
    'Least Concern': 'bg-emerald-100 text-emerald-800',
    'Near Threatened': 'bg-yellow-100 text-yellow-800',
    Vulnerable: 'bg-orange-100 text-orange-800',
    Endangered: 'bg-red-100 text-red-800',
    Critically: 'bg-red-200 text-red-900',
  }[status] || 'bg-slate-100 text-slate-800'

  return (
    <span className={`inline-block text-xs px-2 py-1 rounded ${color}`} title="Conservation status">
      {status}
    </span>
  )
}

StatusBadge.propTypes = { status: PropTypes.string.isRequired }

function AnimalCard({ animal }) {
  const { state, dispatch } = useZoo()
  const isFav = state.favorites.includes(animal.id)

  return (
    <article className="group rounded-lg border border-slate-200 overflow-hidden bg-white focus-within:ring-2 focus-within:ring-blue-500">
      <Link to={`/animal/${animal.id}`} className="block">
        <img
          src={animal.images.thumb}
          alt={`${animal.commonName} thumbnail`}
          className="w-full h-44 object-cover group-hover:opacity-95 transition-opacity"
          loading="lazy"
        />
      </Link>
      <div className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">
              <Link to={`/animal/${animal.id}`}>{animal.commonName}</Link>
            </h3>
            <p className="text-xs text-slate-500 italic">{animal.scientificName}</p>
          </div>
          <button
            aria-pressed={isFav}
            aria-label={`Toggle favorite: ${isFav ? 'Remove from' : 'Add to'} favorites`}
            onClick={() => dispatch({ type: actions.TOGGLE_FAVORITE, id: animal.id })}
            className={`shrink-0 w-9 h-9 rounded-full border transition-colors ${isFav ? 'bg-yellow-400 border-yellow-400' : 'bg-white hover:bg-slate-50 border-slate-200'}`}
            title="Toggle favorite"
          >
            <span aria-hidden>★</span>
          </button>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span>{animal.habitat}</span>
          <StatusBadge status={animal.conservationStatus} />
        </div>
      </div>
    </article>
  )
}

AnimalCard.propTypes = {
  animal: PropTypes.shape({
    id: PropTypes.string.isRequired,
    commonName: PropTypes.string.isRequired,
    scientificName: PropTypes.string.isRequired,
    images: PropTypes.object.isRequired,
    habitat: PropTypes.string.isRequired,
    conservationStatus: PropTypes.string.isRequired,
  }).isRequired,
}

export default AnimalCard
