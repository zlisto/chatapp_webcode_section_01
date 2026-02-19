import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const WITH_COLOR = '#00ff41';    // Matrix green
const WITHOUT_COLOR = '#00cc33'; // Matrix green dim

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(10, 10, 10, 0.95)',
      borderRadius: 10,
      padding: '0.65rem 0.9rem',
      fontSize: '0.82rem',
      fontFamily: 'Inter, sans-serif',
      color: '#00ff41',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(0,255,65,0.15)',
      border: '1px solid rgba(0,255,65,0.3)',
    }}>
      <p style={{ margin: '0 0 0.4rem', fontWeight: 700, color: '#00ff41' }}>{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ margin: '0.15rem 0', color: p.fill }}>
          {p.name}: <strong>{p.value.toLocaleString()}</strong>
          {p.payload[p.dataKey === 'withKeyword' ? 'withCount' : 'withoutCount'] !== undefined && (
            <span style={{ opacity: 0.55, marginLeft: 6 }}>
              (n={p.payload[p.dataKey === 'withKeyword' ? 'withCount' : 'withoutCount']})
            </span>
          )}
        </p>
      ))}
    </div>
  );
}

export default function EngagementChart({ data, metricColumn = 'Favorite Count' }) {
  console.log('[EngagementChart] render called, data:', data);
  if (!data?.length) {
    console.warn('[EngagementChart] no data — chart will not render');
    return null;
  }

  return (
    <div className="engagement-chart-wrap">
      <p className="engagement-chart-label">
        Mean {metricColumn} — with vs without keyword
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 8, right: 16, left: 0, bottom: 64 }}
          barCategoryGap="30%"
          barGap={4}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(0,255,65,0.3)"
            vertical={false}
            strokeOpacity={0.5}
          />
          <XAxis
            dataKey="name"
            tick={{ fill: 'rgba(0,255,65,0.8)', fontSize: 11, fontFamily: 'Inter,sans-serif' }}
            axisLine={{ stroke: 'rgba(0,255,65,0.4)' }}
            tickLine={false}
            angle={-30}
            textAnchor="end"
            interval={0}
          />
          <YAxis
            tick={{ fill: 'rgba(0,255,65,0.7)', fontSize: 11, fontFamily: 'Inter,sans-serif' }}
            axisLine={false}
            tickLine={false}
            width={55}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,255,65,0.05)' }} />
          <Legend
            wrapperStyle={{
              paddingTop: 12,
              fontSize: 12,
              fontFamily: 'Inter,sans-serif',
              color: 'rgba(0,255,65,0.9)',
            }}
          />
          <Bar dataKey="withKeyword" name="With keyword" fill={WITH_COLOR} radius={[8, 8, 0, 0]} />
          <Bar dataKey="withoutKeyword" name="Without keyword" fill={WITHOUT_COLOR} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
