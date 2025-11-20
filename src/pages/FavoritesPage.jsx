import React, { useMemo, useState } from 'react'
import { useZoo, actions } from '../context/ZooContext'
import animals from '../../data/animals.json'

function FavoritesPage(){
  const { state, dispatch } = useZoo()
  const [dragIndex, setDragIndex] = useState(null)

  const favs = useMemo(() => {
    const ordered = (state.tourOrder.length ? state.tourOrder : state.favorites)
      .filter(id => state.favorites.includes(id))
    return ordered.map(id => animals.find(a => a.id === id)).filter(Boolean)
  }, [state.favorites, state.tourOrder])

  const onDragStart = (index) => setDragIndex(index)
  const onDragOver = (e, index) => {
    e.preventDefault()
    if (dragIndex === null || dragIndex === index) return
    const newOrder = [...favs.map(f=>f.id)]
    const [moved] = newOrder.splice(dragIndex, 1)
    newOrder.splice(index, 0, moved)
    dispatch({ type: actions.SET_TOUR, order: newOrder })
    setDragIndex(index)
  }

  const exportTour = () => {
    const data = favs.map(a => ({ id: a.id, name: a.commonName }))
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'virtual-zoo-tour.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">My Tour</h1>
      {favs.length === 0 ? (
        <p>You have no favorites yet. Add some from the homepage.</p>
      ) : (
        <>
          <ul className="space-y-2" aria-label="Favorite animals">
            {favs.map((a, i) => (
              <li key={a.id} draggable onDragStart={() => onDragStart(i)} onDragOver={(e)=>onDragOver(e,i)} className="p-3 border rounded bg-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={a.images.thumb} alt="" className="w-12 h-12 object-cover rounded" />
                  <div>
                    <p className="font-medium">{a.commonName}</p>
                    <p className="text-xs text-slate-500 italic">{a.scientificName}</p>
                  </div>
                </div>
                <button onClick={() => dispatch({ type: actions.TOGGLE_FAVORITE, id: a.id })} className="text-sm px-2 py-1 border rounded">Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={exportTour} className="mt-4 px-3 py-2 border rounded">Export as JSON</button>
        </>
      )}
    </section>
  )
}

export default FavoritesPage
