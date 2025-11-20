import React from 'react'

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} Virtual Zoo. Educational demo.</p>
        <p>
          Built with React and Tailwind. Images/audio are placeholders.
        </p>
      </div>
    </footer>
  )
}

export default Footer
