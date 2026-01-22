export default function Onboarding() {
  const totalSteps = 10;
  const completedSteps = 10;
  const progressPercent = 21;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-sm p-6 w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800">
            Onboarding Progress
          </h3>
          <span className="text-gray-700 font-medium">
            {progressPercent}%
          </span>
        </div>

        {/* Steps */}
        <div className="text-sm text-gray-500 mb-3">
          Steps:{" "}
          <span className="font-semibold text-gray-800">
            {completedSteps}/{totalSteps}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
