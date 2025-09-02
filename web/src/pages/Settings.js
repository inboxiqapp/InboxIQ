import React, { useState } from 'react';

export default function Settings() {
  const [digestEnabled, setDigestEnabled] = useState(true);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={digestEnabled}
          onChange={() => setDigestEnabled(!digestEnabled)}
        />
        <span>Enable Weekly Digest</span>
      </label>
    </div>
  );
}