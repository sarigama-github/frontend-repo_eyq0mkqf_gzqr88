import React, { useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import animals from '../../data/animals.json'
import { useZoo, actions } from '../context/ZooContext'

function DetailRow({ label, value }) {
  return (
    <p className="text-sm"><span className="font-semibold">{label}: </span>{value}</p>
  )
}

function AnimalDetail() {
  const { id } = useParams()
  const { state, dispatch } = useZoo()
  const animal = useMemo(() => animals.find(a => a.id === id), [id])
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  if (!animal) return <div className="p-6">Animal not found.</div>

  const isFav = state.favorites.includes(animal.id)

  const handlePlay = () => {
    const el = audioRef.current
    if (!el) return
    if (playing) {
      el.pause()
      setPlaying(false)
    } else {
      el.play().then(()=> setPlaying(true)).catch(()=>{})
    }
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-6 grid lg:grid-cols-2 gap-6">
      <div>
        <picture>
          <source srcSet={animal.images.hero} type="image/jpg" />
          <img src={animal.images.hero} alt={`${animal.commonName} hero image`} className="w-full h-auto rounded-lg border" />
        </picture>
        <img src={animal.images.rangeMap} alt={`${animal.commonName} range map`} className="mt-3 w-full h-auto rounded border" />
      </div>
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{animal.commonName}</h1>
            <p className="italic text-slate-600">{animal.scientificName}</p>
          </div>
          <button
            aria-pressed={isFav}
            aria-label={`Toggle favorite: ${isFav ? 'Remove from' : 'Add to'} favorites`}
            onClick={() => dispatch({ type: actions.TOGGLE_FAVORITE, id: animal.id })}
            className={`px-3 py-2 rounded border ${isFav ? 'bg-yellow-400 border-yellow-400' : 'bg-white hover:bg-slate-50'}`}
          >
            {isFav ? '★ Favorited' : '☆ Add to favorites'}
          </button>
        </div>

        <div className="mt-4 space-y-2">
          <DetailRow label="Habitat" value={animal.habitat} />
          <DetailRow label="Region" value={animal.region} />
          <DetailRow label="Diet" value={animal.diet} />
          <DetailRow label="Lifespan" value={animal.lifespan} />
          <DetailRow label="Conservation" value={animal.conservationStatus} />
        </div>

        <p className="mt-4 text-slate-700">{animal.description}</p>

        <div className="mt-4">
          <h2 className="font-semibold mb-2">Fun Facts</h2>
          <ul className="list-disc list-inside space-y-1">
            {animal.funFacts.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <button onClick={handlePlay} className="px-3 py-2 rounded border bg-white hover:bg-slate-50">{playing ? 'Pause' : 'Play'} audio</button>
          <audio ref={audioRef} src={animal.audioClip} onEnded={()=>setPlaying(false)} aria-label={`${animal.commonName} audio clip`} />
        </div>
      </div>
    </section>
  )
}

export default AnimalDetail
