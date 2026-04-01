'use client';

export default function BarChart({ data, title, color = '#f97316' }: { data: { label: string; value: number }[]; title: string; color?: string }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div>
      <h4 className="font-semibold mb-4">{title}</h4>
      <div className="space-y-3">
        {data.map((d, i) => (
          <div key={i} className="flex items-center space-x-3">
            <span className="text-xs text-gray-600 w-16 text-right truncate">{d.label}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700 flex items-center px-2" style={{ width: `${(d.value / max) * 100}%`, backgroundColor: color }}>
                <span className="text-xs text-white font-medium">{d.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
