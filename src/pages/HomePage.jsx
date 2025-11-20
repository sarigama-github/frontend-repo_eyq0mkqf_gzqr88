import React from 'react'
import { useZoo, actions, useFilteredAnimals } from '../context/ZooContext'
import AnimalCard from '../components/AnimalCard'
import { Link } from 'react-router-dom'

const habitats = ['All','Savanna','Rainforest','Arctic','Desert','Aquarium','Aviary']
const regions = ['All','Africa','Asia','Antarctica','China','Middle East','Global Oceans','North America','Arctic Circle']
const diets = ['All','Herbivore','Carnivore']
const statuses = ['All','Least Concern','Near Threatened','Vulnerable','Endangered']

function HomePage() {
  const { state, dispatch } = useZoo()
  const animals = useFilteredAnimals()

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="sr-only">Virtual Zoo</h1>

      <div className="grid md:grid-cols-4 gap-4 items-end mb-4">
        <div>
          <label className="block text-xs text-slate-600 mb-1" htmlFor="habitat">Habitat</label>
          <select id="habitat" className="w-full border rounded px-2 py-2" value={state.filters.habitat} onChange={(e)=>dispatch({type:actions.SET_FILTERS, filters:{habitat:e.target.value}})}>
            {habitats.map(h=> <option key={h} value={h}>{h}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-slate-600 mb-1" htmlFor="region">Region</label>
          <select id="region" className="w-full border rounded px-2 py-2" value={state.filters.region} onChange={(e)=>dispatch({type:actions.SET_FILTERS, filters:{region:e.target.value}})}>
            {regions.map(h=> <option key={h} value={h}>{h}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-slate-600 mb-1" htmlFor="diet">Diet</label>
          <select id="diet" className="w-full border rounded px-2 py-2" value={state.filters.diet} onChange={(e)=>dispatch({type:actions.SET_FILTERS, filters:{diet:e.target.value}})}>
            {diets.map(h=> <option key={h} value={h}>{h}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-slate-600 mb-1" htmlFor="status">Status</label>
            <select id="status" className="w-full border rounded px-2 py-2" value={state.filters.status} onChange={(e)=>dispatch({type:actions.SET_FILTERS, filters:{status:e.target.value}})}>
              {statuses.map(h=> <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate-600 mb-1" htmlFor="sort">Sort</label>
            <select id="sort" className="w-full border rounded px-2 py-2" value={state.sort} onChange={(e)=>dispatch({type:actions.SET_SORT, value:e.target.value})}>
              {['A-Z','Species','Popularity'].map(s=> <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-slate-600" aria-live="polite">{animals.length} result{animals.length !== 1 ? 's' : ''}</p>
        <div className="text-sm">
          Browse by habitat:
          {' '} {['Savanna','Rainforest','Arctic','Desert','Aquarium','Aviary'].map(h => (
            <Link key={h} to={`/habitat/${encodeURIComponent(h)}`} className="underline hover:no-underline ml-2">{h}</Link>
          ))}
        </div>
      </div>

      {animals.length === 0 ? (
        <p role="status">No animals match the current search and filters.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" role="list" aria-label="Animal exhibits">
          {animals.map((a) => (
            <div role="listitem" key={a.id}><AnimalCard animal={a} /></div>
          ))}
        </div>
      )}
    </section>
  )
}

export default HomePage
