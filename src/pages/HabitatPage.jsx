import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import animals from '../../data/animals.json'
import AnimalCard from '../components/AnimalCard'

function HabitatPage(){
  const { habitat } = useParams()
  const list = useMemo(() => animals.filter(a => a.habitat.toLowerCase() === decodeURIComponent(habitat).toLowerCase()), [habitat])

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">Habitat: {decodeURIComponent(habitat)}</h1>
      {list.length === 0 ? (
        <p>No animals in this habitat.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {list.map(a => <AnimalCard key={a.id} animal={a} />)}
        </div>
      )}
    </section>
  )
}

export default HabitatPage
