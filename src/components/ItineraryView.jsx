// =============================================================
// ItineraryView.jsx — Day-by-Day Itinerary Timeline
// =============================================================
// Renders the itinerary as a clean vertical timeline. Each day
// is a card with morning/afternoon/evening activities and an
// estimated daily cost.
// =============================================================

export default function ItineraryView({ itinerary }) {
  return (
    <div className="space-y-6">
      {itinerary.days.map((day) => (
        <div key={day.day} className="relative">
          {/* Day card */}
          <div className="bg-gray-50 rounded-xl p-5">
            {/* Day header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gray-900 text-white text-sm font-medium flex items-center justify-center">
                  {day.day}
                </span>
                <h3 className="font-semibold text-[15px] text-gray-900">
                  {day.title}
                </h3>
              </div>
              {day.estimatedCostUSD && (
                <span className="text-sm text-gray-500">
                  ~${day.estimatedCostUSD}
                </span>
              )}
            </div>

            {/* Activities */}
            <div className="space-y-3 ml-11">
              {day.activities.map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide w-16 flex-shrink-0 pt-0.5">
                    {activity.time}
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Total estimated cost */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-sm font-medium text-gray-900">
          Estimated total ({itinerary.duration} days)
        </span>
        <span className="text-sm font-semibold text-gray-900">
          ~${itinerary.days.reduce((sum, d) => sum + (d.estimatedCostUSD || 0), 0)}
        </span>
      </div>
    </div>
  )
}
