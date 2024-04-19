function Percentage({ value }) {
  const percentageValue = value || 0;

  return (
    <div>
      <div className="flex justify-between mb-1">
        <div>
          <span className="text-sm font-medium text-blue-700">
            {percentageValue}%
          </span>
        </div>

        <div className="w-11/12 bg-gray-200 rounded-full h-2.5 my-auto">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${percentageValue}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Percentage;
