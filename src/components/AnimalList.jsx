import React from 'react'
import PropTypes from 'prop-types'
import AnimalCard from './AnimalCard'

function AnimalList({ animals }) {
  if (!animals.length) return <p role="status">No animals match the current search and filters.</p>
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" role="list" aria-label="Animal exhibits">
      {animals.map((a) => (
        <div role="listitem" key={a.id}>
          <AnimalCard animal={a} />
        </div>
      ))}
    </div>
  )
}

AnimalList.propTypes = {
  animals: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default AnimalList
