// =============================================================
// ShareModal.jsx — Share Board Link
// =============================================================
// A small popover that generates a shareable URL for a board
// and lets the user copy it to their clipboard.
// =============================================================

import { useState } from 'react'
import { getShareUrl, copyToClipboard } from '../utils/sharing'

export default function ShareModal({ board, onClose }) {
  const [copied, setCopied] = useState(false)
  const shareUrl = getShareUrl(board)

  async function handleCopy() {
    const success = await copyToClipboard(shareUrl)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Share this board</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Anyone with this link can view "{board.name}" in read-only mode.
        </p>

        {/* URL display + copy button */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-600 truncate"
          />
          <button
            onClick={handleCopy}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              copied
                ? 'bg-green-600 text-white'
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  )
}
