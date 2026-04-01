'use client';

export default function LineChart({ data, title }: { data: { label: string; value: number }[]; title: string }) {
  const max = Math.max(...data.map(d => d.value), 1);
  const min = Math.min(...data.map(d => d.value));
  const w = 400, h = 200, px = 40, py = 20;
  const points = data.map((d, i) => ({ x: px + (i / (data.length - 1)) * (w - 2 * px), y: py + (1 - (d.value - min) / (max - min || 1)) * (h - 2 * py) }));
  const polyline = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div>
      <h4 className="font-semibold mb-4">{title}</h4>
      <svg viewBox={`0 0 ${w} ${h + 30}`} className="w-full">
        {/* 网格线 */}
        {[0, 0.25, 0.5, 0.75, 1].map((r, i) => (
          <line key={i} x1={px} y1={py + r * (h - 2 * py)} x2={w - px} y2={py + r * (h - 2 * py)} stroke="#e5e7eb" strokeWidth="1" />
        ))}
        {/* 折线 */}
        <polyline fill="none" stroke="#f97316" strokeWidth="2.5" points={polyline} />
        {/* 数据点 */}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill="#f97316" stroke="white" strokeWidth="2" />
            <text x={p.x} y={p.y - 10} textAnchor="middle" className="text-xs" fill="#666" fontSize="10">{data[i].value}</text>
            <text x={p.x} y={h + 15} textAnchor="middle" fill="#999" fontSize="9">{data[i].label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}
