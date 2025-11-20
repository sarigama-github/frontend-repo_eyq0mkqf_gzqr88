import React from 'react'
import PropTypes from 'prop-types'

function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form
      role="search"
      aria-label="Search animals"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.()
      }}
      className="w-full"
    >
      <label htmlFor="search" className="sr-only">Search animals</label>
      <input
        id="search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name or species…"
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </form>
  )
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
}

export default SearchBar
