// =============================================================
// SearchForm.jsx — Filter Bar (Airbnb style)
// =============================================================
// A row of filter chips that open dropdown panels when clicked.
// Each panel lets the user select a filter value. Clicking
// outside or selecting a value closes the panel.
//
// REACT CONCEPT: "useState" for managing open/closed state
// Each filter chip tracks whether its dropdown is open. We use
// a single state variable (activeFilter) to ensure only one
// dropdown is open at a time.
//
// REACT CONCEPT: "useRef" + "useEffect" for click-outside
// We detect clicks outside the dropdown to close it — a very
// common pattern in real-world React apps.
// =============================================================

import { useState, useRef, useEffect } from 'react'
import { REGIONS, ACTIVITIES, CLIMATES, TRAVEL_STYLES } from '../utils/constants'

// Month names for the date filter
const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
]

// Budget presets — predefined budget tiers
const BUDGETS = [
  { value: 30, label: 'Under $30/day' },
  { value: 50, label: 'Under $50/day' },
  { value: 75, label: 'Under $75/day' },
  { value: 100, label: 'Under $100/day' },
  { value: 150, label: 'Under $150/day' },
  { value: 250, label: 'Under $250/day' },
]

export default function SearchForm({ filters, onFilterChange }) {
  // Which dropdown is currently open (null = all closed)
  const [activeFilter, setActiveFilter] = useState(null)
  const barRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (barRef.current && !barRef.current.contains(e.target)) {
        setActiveFilter(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Helper: update a single filter field
  function setFilter(key, value) {
    onFilterChange({ ...filters, [key]: value })
    // Close the dropdown after selection (except for multi-select)
    if (key !== 'activities') {
      setActiveFilter(null)
    }
  }

  // Helper: toggle an activity in the activities array
  function toggleActivity(activity) {
    const current = filters.activities || []
    const next = current.includes(activity)
      ? current.filter((a) => a !== activity)
      : [...current, activity]
    onFilterChange({ ...filters, activities: next })
  }

  // Helper: clear a specific filter
  function clearFilter(key) {
    const resetValue = key === 'activities' ? [] : null
    onFilterChange({ ...filters, [key]: resetValue })
    setActiveFilter(null)
  }

  // Determine the display label for each chip
  const budgetLabel = filters.budgetPerDay
    ? BUDGETS.find((b) => b.value === filters.budgetPerDay)?.label || `$${filters.budgetPerDay}/day`
    : null
  const monthLabel = filters.month
    ? MONTHS.find((m) => m.value === filters.month)?.label
    : null
  const climateLabel = filters.climate
    ? CLIMATES.find((c) => c.value === filters.climate)?.label
    : null
  const styleLabel = filters.travelStyle
    ? TRAVEL_STYLES.find((s) => s.value === filters.travelStyle)?.label
    : null
  const regionLabel = filters.region
    ? REGIONS.find((r) => r.value === filters.region)?.label
    : null
  const activityCount = filters.activities?.length || 0

  return (
    <div ref={barRef} className="flex items-center gap-2.5 overflow-x-auto sm:flex-wrap scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
      {/* Budget filter */}
      <FilterChip
        label={budgetLabel || 'Budget'}
        isActive={!!filters.budgetPerDay}
        isOpen={activeFilter === 'budget'}
        onClick={() => setActiveFilter(activeFilter === 'budget' ? null : 'budget')}
        onClear={() => clearFilter('budgetPerDay')}
      >
        <DropdownPanel>
          {BUDGETS.map((b) => (
            <DropdownOption
              key={b.value}
              label={b.label}
              isSelected={filters.budgetPerDay === b.value}
              onClick={() => setFilter('budgetPerDay', b.value)}
            />
          ))}
        </DropdownPanel>
      </FilterChip>

      {/* Month filter */}
      <FilterChip
        label={monthLabel || 'When'}
        isActive={!!filters.month}
        isOpen={activeFilter === 'month'}
        onClick={() => setActiveFilter(activeFilter === 'month' ? null : 'month')}
        onClear={() => clearFilter('month')}
      >
        <DropdownPanel>
          <div className="grid grid-cols-3 gap-1">
            {MONTHS.map((m) => (
              <button
                key={m.value}
                onClick={() => setFilter('month', m.value)}
                className={`px-3 py-2 rounded-lg text-sm text-left transition-colors cursor-pointer ${
                  filters.month === m.value
                    ? 'bg-gray-900 text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {m.label.slice(0, 3)}
              </button>
            ))}
          </div>
        </DropdownPanel>
      </FilterChip>

      {/* Activities filter (multi-select) */}
      <FilterChip
        label={activityCount > 0 ? `${activityCount} activit${activityCount === 1 ? 'y' : 'ies'}` : 'Activities'}
        isActive={activityCount > 0}
        isOpen={activeFilter === 'activities'}
        onClick={() => setActiveFilter(activeFilter === 'activities' ? null : 'activities')}
        onClear={() => clearFilter('activities')}
      >
        <DropdownPanel>
          {ACTIVITIES.map((a) => (
            <DropdownOption
              key={a.value}
              label={a.label}
              isSelected={(filters.activities || []).includes(a.value)}
              onClick={() => toggleActivity(a.value)}
              isCheckbox
            />
          ))}
        </DropdownPanel>
      </FilterChip>

      {/* Climate filter */}
      <FilterChip
        label={climateLabel || 'Climate'}
        isActive={!!filters.climate}
        isOpen={activeFilter === 'climate'}
        onClick={() => setActiveFilter(activeFilter === 'climate' ? null : 'climate')}
        onClear={() => clearFilter('climate')}
      >
        <DropdownPanel>
          {CLIMATES.map((c) => (
            <DropdownOption
              key={c.value}
              label={c.label}
              isSelected={filters.climate === c.value}
              onClick={() => setFilter('climate', c.value)}
            />
          ))}
        </DropdownPanel>
      </FilterChip>

      {/* Travel Style filter */}
      <FilterChip
        label={styleLabel || 'Style'}
        isActive={!!filters.travelStyle}
        isOpen={activeFilter === 'style'}
        onClick={() => setActiveFilter(activeFilter === 'style' ? null : 'style')}
        onClear={() => clearFilter('travelStyle')}
      >
        <DropdownPanel>
          {TRAVEL_STYLES.map((s) => (
            <DropdownOption
              key={s.value}
              label={s.label}
              isSelected={filters.travelStyle === s.value}
              onClick={() => setFilter('travelStyle', s.value)}
            />
          ))}
        </DropdownPanel>
      </FilterChip>

      {/* Region filter */}
      <FilterChip
        label={regionLabel || 'Region'}
        isActive={!!filters.region}
        isOpen={activeFilter === 'region'}
        onClick={() => setActiveFilter(activeFilter === 'region' ? null : 'region')}
        onClear={() => clearFilter('region')}
      >
        <DropdownPanel>
          {REGIONS.map((r) => (
            <DropdownOption
              key={r.value}
              label={r.label}
              isSelected={filters.region === r.value}
              onClick={() => setFilter('region', r.value)}
            />
          ))}
        </DropdownPanel>
      </FilterChip>

      {/* Clear all — only shown when filters are active */}
      {(filters.budgetPerDay || filters.month || activityCount > 0 || filters.climate || filters.travelStyle || filters.region) && (
        <button
          onClick={() => onFilterChange({
            budgetPerDay: null,
            month: null,
            activities: [],
            climate: null,
            travelStyle: null,
            region: null,
          })}
          className="flex-shrink-0 px-3 py-2.5 text-sm font-semibold text-gray-900 underline underline-offset-2 hover:text-gray-600 transition-colors cursor-pointer"
        >
          Clear all
        </button>
      )}
    </div>
  )
}

// =============================================================
// FilterChip — A single filter button in the bar
// =============================================================
// Shows the label, and when clicked, reveals a dropdown panel.
// When a filter is active (user made a selection), it gets a
// dark border and an X button to clear it.
// =============================================================

function FilterChip({ label, isActive, isOpen, onClick, onClear, children }) {
  return (
    <div className="relative flex-shrink-0">
      <div className="flex items-center">
        <button
          onClick={onClick}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
            isActive
              ? 'border-2 border-gray-900 text-gray-900 bg-white'
              : isOpen
                ? 'border border-gray-900 text-gray-900 bg-white'
                : 'border border-gray-300 text-gray-700 bg-white hover:border-gray-900'
          }`}
        >
          {label}
          {/* Chevron icon */}
          <svg
            className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Clear button — only when filter is active */}
        {isActive && (
          <button
            onClick={(e) => { e.stopPropagation(); onClear(); }}
            className="ml-1 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown panel — positioned below the chip */}
      {isOpen && children}
    </div>
  )
}

// =============================================================
// DropdownPanel — Container for dropdown content
// =============================================================

function DropdownPanel({ children }) {
  return (
    <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-2 min-w-[200px] z-50">
      {children}
    </div>
  )
}

// =============================================================
// DropdownOption — A single selectable item in a dropdown
// =============================================================

function DropdownOption({ label, isSelected, onClick, isCheckbox }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-left transition-colors cursor-pointer ${
        isSelected && !isCheckbox
          ? 'bg-gray-100 font-medium text-gray-900'
          : 'hover:bg-gray-50 text-gray-700'
      }`}
    >
      {isCheckbox && (
        <span className={`flex items-center justify-center w-4.5 h-4.5 rounded border ${
          isSelected ? 'bg-gray-900 border-gray-900' : 'border-gray-300'
        }`}>
          {isSelected && (
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </span>
      )}
      {label}
    </button>
  )
}
