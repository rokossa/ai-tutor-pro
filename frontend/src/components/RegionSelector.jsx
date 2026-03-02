import React from 'react';

export default function RegionSelector({ selectedRegion, onSelect }) {
  const regions = {
    "Canada": ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland", "Nova Scotia", "Ontario", "PEI", "Quebec", "Saskatchewan"],
    "USA": ["California", "Florida", "New York", "Texas", "Washington", "Other States (Common Core)"]
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-800">Where does your child go to school?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(regions).map(([country, states]) => (
          <div key={country} className="space-y-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">{country}</p>
            {states.map((state) => (
              <button
                key={state}
                onClick={() => onSelect({ country, state })}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  selectedRegion?.state === state 
                  ? 'bg-indigo-50 border-[#4338CA] text-[#4338CA] font-bold shadow-sm' 
                  : 'bg-white border-slate-100 text-slate-600 hover:border-slate-300'
                }`}
              >
                {state}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
