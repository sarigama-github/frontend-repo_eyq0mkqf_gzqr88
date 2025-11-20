import React, { useMemo, useState } from 'react'
import animalsData from '../../data/animals.json'

// Demo-only admin that edits a local working copy; does not persist to files
function AdminPage(){
  const [animals, setAnimals] = useState(animalsData)
  const [form, setForm] = useState({
    id: '', commonName: '', scientificName: '', habitat: 'Savanna', region: '', diet: 'Herbivore', lifespan: '', conservationStatus: 'Least Concern', images: {thumb: '', hero: '', rangeMap: ''}, audioClip: ''
  })

  const habitats = ['Savanna','Rainforest','Arctic','Desert','Aquarium','Aviary']

  const submit = (e) => {
    e.preventDefault()
    if (!form.id || !form.commonName) return
    setAnimals(prev => {
      const exists = prev.some(a => a.id === form.id)
      if (exists) return prev.map(a => a.id === form.id ? { ...a, ...form } : a)
      return [...prev, { ...form, funFacts: form.funFacts || [] }]
    })
    setForm({id:'', commonName:'', scientificName:'', habitat:'Savanna', region:'', diet:'Herbivore', lifespan:'', conservationStatus:'Least Concern', images:{thumb:'',hero:'',rangeMap:''}, audioClip:''})
  }

  const filtered = useMemo(()=> animals.sort((a,b)=> a.commonName.localeCompare(b.commonName)), [animals])

  return (
    <section className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">Admin Demo</h1>
      <p className="text-sm text-slate-600 mb-4">This page lets you add or edit animals in a temporary, in-memory list for demo purposes.</p>

      <form onSubmit={submit} className="grid md:grid-cols-2 gap-4 p-4 border rounded bg-white">
        <div>
          <label className="block text-xs mb-1">ID</label>
          <input className="w-full border rounded px-2 py-1" value={form.id} onChange={e=>setForm({...form, id:e.target.value})} required />
        </div>
        <div>
          <label className="block text-xs mb-1">Common Name</label>
          <input className="w-full border rounded px-2 py-1" value={form.commonName} onChange={e=>setForm({...form, commonName:e.target.value})} required />
        </div>
        <div>
          <label className="block text-xs mb-1">Scientific Name</label>
          <input className="w-full border rounded px-2 py-1" value={form.scientificName} onChange={e=>setForm({...form, scientificName:e.target.value})} />
        </div>
        <div>
          <label className="block text-xs mb-1">Habitat</label>
          <select className="w-full border rounded px-2 py-1" value={form.habitat} onChange={e=>setForm({...form, habitat:e.target.value})}>{habitats.map(h=> <option key={h}>{h}</option>)}</select>
        </div>
        <div>
          <label className="block text-xs mb-1">Region</label>
          <input className="w-full border rounded px-2 py-1" value={form.region} onChange={e=>setForm({...form, region:e.target.value})} />
        </div>
        <div>
          <label className="block text-xs mb-1">Diet</label>
          <input className="w-full border rounded px-2 py-1" value={form.diet} onChange={e=>setForm({...form, diet:e.target.value})} />
        </div>
        <div>
          <label className="block text-xs mb-1">Lifespan</label>
          <input className="w-full border rounded px-2 py-1" value={form.lifespan} onChange={e=>setForm({...form, lifespan:e.target.value})} />
        </div>
        <div>
          <label className="block text-xs mb-1">Conservation</label>
          <input className="w-full border rounded px-2 py-1" value={form.conservationStatus} onChange={e=>setForm({...form, conservationStatus:e.target.value})} />
        </div>
        <div className="md:col-span-2 grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs mb-1">Thumb URL</label>
            <input className="w-full border rounded px-2 py-1" value={form.images.thumb} onChange={e=>setForm({...form, images:{...form.images, thumb:e.target.value}})} />
          </div>
          <div>
            <label className="block text-xs mb-1">Hero URL</label>
            <input className="w-full border rounded px-2 py-1" value={form.images.hero} onChange={e=>setForm({...form, images:{...form.images, hero:e.target.value}})} />
          </div>
          <div>
            <label className="block text-xs mb-1">Range Map URL</label>
            <input className="w-full border rounded px-2 py-1" value={form.images.rangeMap} onChange={e=>setForm({...form, images:{...form.images, rangeMap:e.target.value}})} />
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs mb-1">Audio Clip URL</label>
          <input className="w-full border rounded px-2 py-1" value={form.audioClip} onChange={e=>setForm({...form, audioClip:e.target.value})} />
        </div>
        <div className="md:col-span-2">
          <button className="px-3 py-2 border rounded">Save</button>
        </div>
      </form>

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {filtered.map(a => (
          <div key={a.id} className="p-3 border rounded bg-white flex gap-3 items-center">
            <img src={a.images.thumb} alt="" className="w-16 h-16 object-cover rounded" />
            <div>
              <p className="font-medium">{a.commonName}</p>
              <p className="text-xs text-slate-500 italic">{a.scientificName}</p>
              <p className="text-xs text-slate-600">{a.habitat}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AdminPage
