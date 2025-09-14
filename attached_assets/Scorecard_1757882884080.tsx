import React from 'react';

type PeriodStats = { winRate:number; medianTimeMinutes:number; volume:number };
type Scorecard = {
  merchantId:string; displayName:string; category:string;
  period:{ last30:PeriodStats; last90:PeriodStats };
  metrics:{ successByChannel:Record<string,number>; escalationRate:number; refundRate:number; evidenceCompletenessPct:number };
  frictionFlags:string[]; channels:string[]; difficulty:number; evidenceBadges:string[];
  howWeCancel?:string[]; recentUpdates?:string[]; notes?:string;
};

export function Scorecard({ data }: { data: Scorecard }) {
  const pct = (n:number)=> `${Math.round(n*100)}%`;
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">{data.displayName}</h1>
        <p className="text-sm text-muted-foreground">{data.category}</p>
      </header>

      <section className="grid grid-cols-2 gap-4">
        <div className="rounded border p-4">
          <h2 className="font-medium mb-1">Last 30 Days</h2>
          <div>Win rate: <b>{pct(data.period.last30.winRate)}</b></div>
          <div>Median time: <b>{data.period.last30.medianTimeMinutes}m</b></div>
          <div>Volume: <b>{data.period.last30.volume}</b></div>
        </div>
        <div className="rounded border p-4">
          <h2 className="font-medium mb-1">Last 90 Days</h2>
          <div>Win rate: <b>{pct(data.period.last90.winRate)}</b></div>
          <div>Median time: <b>{data.period.last90.medianTimeMinutes}m</b></div>
          <div>Volume: <b>{data.period.last90.volume}</b></div>
        </div>
      </section>

      <section className="rounded border p-4">
        <h2 className="font-medium mb-2">Channels & Metrics</h2>
        <div className="text-sm">Preferred channels: {data.channels.join(' • ')}</div>
        <div className="text-sm mt-1">Success by channel:</div>
        <ul className="list-disc list-inside">
          {Object.entries(data.metrics.successByChannel).map(([k,v]) => (
            <li key={k}>{k}: {pct(v)}</li>
          ))}
        </ul>
        <div className="text-sm mt-2">Escalation: {pct(data.metrics.escalationRate)} • Refund: {pct(data.metrics.refundRate)} • Evidence completeness: {pct(data.metrics.evidenceCompletenessPct)}</div>
      </section>

      <section className="rounded border p-4">
        <h2 className="font-medium mb-2">Friction & Difficulty</h2>
        <div className="text-sm">Difficulty: {data.difficulty}/5</div>
        <ul className="list-disc list-inside">
          {data.frictionFlags.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
      </section>

      <section className="rounded border p-4">
        <h2 className="font-medium mb-2">Evidence & How We Cancel</h2>
        <div className="text-sm">Badges: {data.evidenceBadges.join(' • ')}</div>
        {data.howWeCancel && (
          <ol className="list-decimal list-inside mt-2">
            {data.howWeCancel.map((s,i)=><li key={i}>{s}</li>)}
          </ol>
        )}
      </section>

      {data.recentUpdates && data.recentUpdates.length > 0 && (
        <section className="rounded border p-4">
          <h2 className="font-medium mb-2">Recent Updates</h2>
          <ul className="list-disc list-inside">
            {data.recentUpdates.map((u,i)=><li key={i}>{u}</li>)}
          </ul>
        </section>
      )}

      {data.notes && <p className="text-sm text-muted-foreground">{data.notes}</p>}
    </div>
  );
}
