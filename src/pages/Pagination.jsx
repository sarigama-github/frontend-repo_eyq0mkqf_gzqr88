import React from 'react'
import PropTypes from 'prop-types'

// Simple client-side pagination component
function Pagination({ page, total, pageSize, onChange }) {
  const pages = Math.ceil(total / pageSize)
  if (pages <= 1) return null
  const items = Array.from({ length: pages }, (_, i) => i + 1)

  return (
    <nav className="mt-4 flex items-center justify-center gap-1" aria-label="Pagination">
      {items.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          aria-current={p === page ? 'page' : undefined}
          className={`px-3 py-1 rounded border text-sm ${p === page ? 'bg-slate-900 text-white border-slate-900' : 'bg-white hover:bg-slate-50'}`}
        >
          {p}
        </button>
      ))}
    </nav>
  )
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Pagination
