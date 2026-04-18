// @ts-nocheck
import React from 'react';


// ===== data.jsx =====
// Shared data + helpers for Aiigo landing

const TICKER_ROWS = [
  { sku: 'H100-80G-SXM', region: 'us-west', price: 1.84, delta: -0.12, live: 142 },
  { sku: 'A100-40G', region: 'eu-central', price: 0.92, delta: +0.03, live: 318 },
  { sku: 'RTX-4090', region: 'ap-south', price: 0.31, delta: +0.08, live: 2104 },
  { sku: 'RTX-3090', region: 'us-east', price: 0.18, delta: -0.01, live: 3812 },
  { sku: 'M2-Ultra-64', region: 'ap-east', price: 0.11, delta: +0.02, live: 587 },
  { sku: 'MI300X-192G', region: 'us-west', price: 2.41, delta: +0.31, live: 28 },
  { sku: 'L40S-48G', region: 'eu-west', price: 0.64, delta: -0.04, live: 211 },
  { sku: 'T4-16G', region: 'sa-east', price: 0.06, delta: +0.00, live: 1940 },
  { sku: 'CPU-EPYC-9654', region: 'eu-north', price: 0.04, delta: +0.01, live: 4310 },
];

const NAV_ITEMS = [
  { label: 'Market', href: '#market' },
  { label: 'Sell', href: '#sell' },
  { label: 'Buy', href: '#buy' },
  { label: 'Network', href: '#network' },
  { label: 'Docs', href: '#docs' },
];

// Deterministic pseudo-random for consistent server/client
function seed(n) {
  let s = n;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

// 24h price walk
function walk(start, points, volatility, seedN) {
  const r = seed(seedN);
  const out = [start];
  for (let i = 1; i < points; i++) {
    out.push(Math.max(0.02, out[i - 1] + (r() - 0.5) * volatility));
  }
  return out;
}

const HERO_SERIES = walk(1.72, 96, 0.09, 42);

const NODE_DOTS = (() => {
  const r = seed(7);
  // Rough continental lat/long cluster centers mapped to % of a 1000x460 canvas
  const clusters = [
    { cx: 180, cy: 180, n: 42, hot: 0.6 }, // NA west
    { cx: 300, cy: 200, n: 38, hot: 0.8 }, // NA east
    { cx: 475, cy: 170, n: 55, hot: 0.9 }, // EU
    { cx: 525, cy: 230, n: 18, hot: 0.4 }, // ME
    { cx: 720, cy: 230, n: 48, hot: 0.7 }, // Asia
    { cx: 820, cy: 320, n: 22, hot: 0.5 }, // SE Asia / AU
    { cx: 340, cy: 330, n: 14, hot: 0.3 }, // SA
    { cx: 510, cy: 320, n: 11, hot: 0.2 }, // Africa
  ];
  const dots = [];
  clusters.forEach((c, ci) => {
    for (let i = 0; i < c.n; i++) {
      const a = r() * Math.PI * 2;
      const rad = Math.sqrt(r()) * 60;
      dots.push({
        x: c.cx + Math.cos(a) * rad,
        y: c.cy + Math.sin(a) * rad,
        hot: r() < c.hot,
        size: r() < 0.1 ? 3 : r() < 0.4 ? 2 : 1.3,
        id: `${ci}-${i}`
      });
    }
  });
  return dots;
})();

const PARTNERS = [
  'Modal', 'Replicate', 'Hugging Face', 'Anyscale', 'Weights & Biases',
  'Together', 'LangChain', 'Runpod', 'Lightning AI', 'Vast',
  'Northern Data', 'CoreWeave-ish', 'Akash', 'Render', 'Fluence',
];

const PROVIDER_STORIES = [
  {
    name: 'Jules M.',
    loc: 'Lyon, FR',
    rig: '2× RTX 4090',
    month: 412,
    quote: 'Runs overnight, pays my colocation bill, no babysitting.',
  },
  {
    name: 'Kenji T.',
    loc: 'Osaka, JP',
    rig: 'M2 Ultra 64GB',
    month: 88,
    quote: 'I didn\'t even know my Mac was earning until the first payout hit.',
  },
  {
    name: 'Sofía R.',
    loc: 'Mexico City, MX',
    rig: '4× RTX 3090 rig',
    month: 714,
    quote: 'Replaced my old proof-of-work miner. Same hardware, 3x the yield.',
  },
  {
    name: 'Henley DC',
    loc: 'Frankfurt, DE',
    rig: '18× H100 cluster',
    month: 24210,
    quote: 'Wholesale SLA tier. Fills 62% of our off-peak capacity.',
  },
];

const BUYER_STORIES = [
  { who: 'Orbit Labs', use: 'Protein folding screens', saved: 71 },
  { who: 'A small ML team', use: 'Fine-tuning 70B weights', saved: 64 },
  { who: 'Indie game studio', use: 'Overnight render queue', saved: 82 },
  { who: 'Climate researcher', use: 'Ensemble weather sims', saved: 58 },
];



// ===== atoms.jsx =====
// Reusable atoms & small components

const LiveDot = ({ color = 'bg-accent', size = 'h-1.5 w-1.5' }) => (
  <span className="relative inline-flex">
    <span className={`absolute inline-flex rounded-full ${size} ${color} opacity-60 animate-ping`}></span>
    <span className={`relative inline-flex rounded-full ${size} ${color}`}></span>
  </span>
);

const Eyebrow = ({ children, className = '' }) => (
  <div className={`font-mono text-[10px] tracking-[0.18em] uppercase text-ink-400 ${className}`}>
    {children}
  </div>
);

// Simple sparkline
const Sparkline = ({ data, width = 120, height = 32, stroke = 'currentColor', strokeWidth = 1.2, fill = false }) => {
  if (!data?.length) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const pad = 2;
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (width - pad * 2);
    const y = pad + (1 - (v - min) / range) * (height - pad * 2);
    return [x, y];
  });
  const path = 'M ' + pts.map(p => p.join(',')).join(' L ');
  const area = path + ` L ${pts[pts.length - 1][0]},${height} L ${pts[0][0]},${height} Z`;
  return (
    <svg width={width} height={height} className="overflow-visible" viewBox={`0 0 ${width} ${height}`}>
      {fill && <path d={area} fill={stroke} opacity="0.12" />}
      <path d={path} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
};

// Plain button
const Btn = ({ children, variant = 'primary', size = 'md', as: As = 'button', className = '', ...rest }) => {
  const base = 'inline-flex items-center gap-2 font-medium transition-all duration-150 whitespace-nowrap';
  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2.5',
    lg: 'text-[15px] px-5 py-3',
  };
  const variants = {
    primary: 'bg-accent text-ink-950 hover:brightness-95 active:brightness-90',
    ghost: 'text-ink-100 hover:bg-white/5 border border-white/10',
    outline: 'border border-ink-100/90 text-ink-100 hover:bg-ink-100 hover:text-ink-950',
    dark: 'bg-ink-950 text-ink-50 hover:bg-ink-800 border border-white/10',
    paper: 'bg-ink-950 text-paper hover:bg-ink-800',
  };
  return (
    <As className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </As>
  );
};

// Kbd
const Kbd = ({ children }) => (
  <kbd className="inline-flex items-center justify-center h-5 min-w-[1.25rem] px-1.5 rounded border border-white/15 bg-white/5 text-[10px] font-mono text-ink-200">
    {children}
  </kbd>
);

// Arrow
const Arrow = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
    <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" />
  </svg>
);

// Corner markers
const CornerMarks = ({ color = 'border-ink-200/20' }) => (
  <>
    <span className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${color}`}></span>
    <span className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${color}`}></span>
    <span className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l ${color}`}></span>
    <span className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${color}`}></span>
  </>
);

// Row of stat
const StatRow = ({ label, value, suffix, className = '' }) => (
  <div className={`flex items-baseline justify-between gap-3 py-2.5 border-b border-white/5 ${className}`}>
    <span className="text-[11px] font-mono uppercase tracking-wider text-ink-400">{label}</span>
    <span className="text-sm font-mono tnum text-ink-100">{value}<span className="text-ink-400 ml-1">{suffix}</span></span>
  </div>
);



// ===== nav.jsx =====
// Top nav + ticker tape

function TickerTape() {

  const items = [...TICKER_ROWS, ...TICKER_ROWS, ...TICKER_ROWS];
  return (
    <div className="relative overflow-hidden border-b hair-b bg-ink-900">
      <div className="flex items-stretch">
        <div className="shrink-0 flex items-center gap-2 px-4 py-2 border-r hair-r bg-ink-950">
          <LiveDot />
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-300">Spot</span>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="marquee-track font-mono text-[11px] py-2">
            {items.map((r, i) => (
              <div key={i} className="flex items-center gap-2 px-5 border-r border-white/5 whitespace-nowrap">
                <span className="text-ink-300">{r.sku}</span>
                <span className="text-ink-500">·</span>
                <span className="text-ink-400">{r.region}</span>
                <span className="text-ink-100 tnum">${r.price.toFixed(2)}/hr</span>
                <span className={`tnum ${r.delta >= 0 ? 'text-signal-green' : 'text-signal-red'}`}>
                  {r.delta >= 0 ? '▲' : '▼'}{Math.abs(r.delta).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Nav() {

  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="sticky top-0 z-40">
      <TickerTape />
      <header className={`border-b hair-b transition-colors ${scrolled ? 'bg-ink-950/90 backdrop-blur' : 'bg-ink-950'}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center h-14">
          <a href="#" className="flex items-center gap-2 group">
            <img src={`${process.env.PUBLIC_URL || ''}/web-app-manifest-192x192.png`} width="22" height="22" alt="aiigo logo" className="rounded-sm" />
            <span className="font-mono font-semibold tracking-tight text-ink-100 text-[15px]">AIIGO</span>
          </a>

          <nav className="hidden md:flex items-center gap-1 ml-10">
            {NAV_ITEMS.map(i => (
              <a key={i.label} href={i.href}
                className="px-3 py-1.5 text-[13px] text-ink-300 hover:text-ink-50 hover:bg-white/5 rounded-sm transition">
                {i.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-2 px-3 h-8 border hair rounded-sm text-[12px] text-ink-400 font-mono bg-ink-900/60">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor"><circle cx="6" cy="6" r="4.5" strokeWidth="1.3" /><path d="M9.5 9.5 L12.5 12.5" strokeWidth="1.3" /></svg>
              <span>Search SKU, region…</span>
              <span className="ml-6 flex gap-1"><Kbd>⌘</Kbd><Kbd>K</Kbd></span>
            </div>
            <Btn variant="ghost" size="sm" as="a" href="#sell">Start earning</Btn>
            <Btn variant="primary" size="sm" as="a" href="#buy">Rent compute <Arrow size={12} /></Btn>
          </div>
        </div>
      </header>
    </div>
  );
}



// ===== hero.jsx =====
// Hero — market-first, editorial

function Hero() {


  return (
    <section className="relative border-b hair-b overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 relative">
        <div className="grid grid-cols-12 gap-0">
          {/* Left: headline */}
          <div className="col-span-12 lg:col-span-7 py-20 lg:py-28 lg:pr-16 lg:border-r hair">
            <div className="flex items-center gap-3 mb-10">
              <LiveDot />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-300">
                Live market · 8,412 nodes online
              </span>
              <span className="hidden md:inline font-mono text-[11px] text-ink-500">
                updated {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
              </span>
            </div>

            <h1 className="font-sans font-light text-[52px] md:text-[76px] lg:text-[88px] leading-[0.95] tracking-[-0.035em] text-ink-50">
              The world's idle<br />
              silicon, <span className="font-serif text-accent">priced by</span><br />
              the <span className="font-serif">second.</span>
            </h1>

            <p className="max-w-xl mt-10 text-[17px] leading-[1.55] text-ink-300">
              Aiigo is a decentralized compute exchange. Hardware owners list their spare
              GPU and CPU cycles. Builders of AI and simulation workloads buy them — live,
              by the second, at 60–80% below hyperscaler rates.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Btn variant="primary" size="lg" as="a" href="#buy">
                Rent compute <Arrow size={14} />
              </Btn>
              <Btn variant="outline" size="lg" as="a" href="#sell">
                Start earning →
              </Btn>
              <span className="font-mono text-[11px] text-ink-500 ml-2">No signup · pay-as-you-go · USDC or card</span>
            </div>

            {/* Mini metrics row */}
            <div className="mt-16 grid grid-cols-3 gap-0 border-t hair pt-6">
              {[
                { k: 'Active nodes', v: '8,412', hint: '+214 today' },
                { k: 'Filled jobs (24h)', v: '71.4k', hint: '98.7% SLA' },
                { k: 'Avg savings', v: '73%', hint: 'vs AWS p5' },
              ].map((m, i) => (
                <div key={i} className={`px-4 ${i > 0 ? 'border-l hair' : ''}`}>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-ink-400 mb-2">{m.k}</div>
                  <div className="font-light text-3xl text-ink-50 tnum tracking-tight">{m.v}</div>
                  <div className="font-mono text-[11px] text-ink-500 mt-1">{m.hint}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: live price panel */}
          <aside className="col-span-12 lg:col-span-5 py-10 lg:py-28 lg:pl-10 flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <Eyebrow>Index · 24h</Eyebrow>
              <div className="flex items-center gap-1 font-mono text-[10px] text-ink-400">
                {['1H', '24H', '7D', '30D'].map((t, i) => (
                  <button key={t} className={`px-2 py-1 rounded-sm ${i === 1 ? 'bg-white/10 text-ink-50' : 'hover:bg-white/5'}`}>{t}</button>
                ))}
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-light text-5xl tnum tracking-tight text-ink-50">$1.72</span>
              <span className="font-mono text-sm text-signal-green">▲ 0.18 (11.7%)</span>
              <span className="font-mono text-[10px] text-ink-500 ml-auto">H100-80G · us-west · /hr</span>
            </div>

            {/* Chart */}
            <div className="mt-6 relative h-56 border hair bg-ink-900/50">
              <CornerMarks color="border-ink-500" />
              <div className="absolute inset-0 grid-bg opacity-25"></div>
              <svg viewBox="0 0 400 200" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                {/* grid lines */}
                {[40, 80, 120, 160].map(y => (
                  <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="rgba(255,255,255,0.04)" strokeDasharray="2,3" />
                ))}
                {(() => {
                  const min = Math.min(...HERO_SERIES), max = Math.max(...HERO_SERIES), rng = max - min || 1;
                  const pts = HERO_SERIES.map((v, i) => [
                    (i / (HERO_SERIES.length - 1)) * 400,
                    190 - ((v - min) / rng) * 170
                  ]);
                  const path = 'M ' + pts.map(p => p.join(',')).join(' L ');
                  const area = path + ` L 400,200 L 0,200 Z`;
                  return (
                    <>
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.32" />
                          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d={area} fill="url(#chartGrad)" />
                      <path d={path} fill="none" stroke="var(--accent)" strokeWidth="1.3" />
                      {/* Cursor */}
                      <line x1={pts[70][0]} y1="10" x2={pts[70][0]} y2="190" stroke="rgba(255,255,255,0.22)" strokeDasharray="2,3" />
                      <circle cx={pts[70][0]} cy={pts[70][1]} r="3" fill="var(--accent)" stroke="#0A0B0D" strokeWidth="1.5" />
                    </>
                  );
                })()}
              </svg>
              <div className="absolute top-3 left-3 font-mono text-[10px] text-ink-400">
                <div>$1.94 <span className="text-ink-600">high</span></div>
              </div>
              <div className="absolute bottom-3 left-3 font-mono text-[10px] text-ink-400">
                <div>$1.51 <span className="text-ink-600">low</span></div>
              </div>
            </div>

            {/* Order book-ish mini rows */}
            <div className="mt-5 border hair">
              <div className="flex items-center justify-between px-3 py-2 border-b hair">
                <Eyebrow>Top spot offers</Eyebrow>
                <a href="#market" className="font-mono text-[11px] text-accent hover:underline">see all →</a>
              </div>
              {[
                { sku: 'RTX 4090', reg: 'ap-south', p: 0.28, n: 2104 },
                { sku: 'A100 80G', reg: 'eu-central', p: 1.14, n: 216 },
                { sku: 'H100 80G', reg: 'us-west', p: 1.72, n: 142 },
              ].map((r, i) => (
                <div key={i} className="flex items-center justify-between px-3 py-2 border-b hair last:border-b-0 hover:bg-white/[0.03] cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-ink-400 w-10">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[13px] text-ink-100">{r.sku}</span>
                    <span className="font-mono text-[10px] text-ink-500">{r.reg}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[11px] text-ink-400 tnum">{r.n.toLocaleString()} avail</span>
                    <span className="font-mono text-[13px] text-accent tnum">${r.p.toFixed(2)}/hr</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}



// ===== market.jsx =====
// Market table section

function MarketTable() {

  const [tab, setTab] = React.useState('all');
  const [sort, setSort] = React.useState('price');

  const rows = [
    ...TICKER_ROWS,
    { sku: 'RTX-4080', region: 'us-east', price: 0.22, delta: -0.02, live: 1488 },
    { sku: 'A6000-48G', region: 'eu-west', price: 0.48, delta: +0.04, live: 340 },
    { sku: 'V100-32G', region: 'ap-east', price: 0.14, delta: -0.01, live: 522 },
    { sku: 'M3-Max-36', region: 'ap-south', price: 0.08, delta: +0.01, live: 411 },
  ];

  const tabs = [
    { id: 'all', label: 'All', n: rows.length },
    { id: 'gpu', label: 'GPU', n: rows.length - 2 },
    { id: 'apple', label: 'Apple Silicon', n: 2 },
    { id: 'cpu', label: 'CPU / RAM', n: 1 },
    { id: 'edge', label: 'Edge / IoT', n: 0 },
  ];

  return (
    <section id="market" className="relative border-b hair-b bg-ink-950">
      <div className="max-w-[1400px] mx-auto px-6 py-24">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <div>
            <Eyebrow className="mb-4">§01 · Live market</Eyebrow>
            <h2 className="font-light text-4xl md:text-5xl leading-[1.05] tracking-tight text-ink-50 max-w-2xl">
              Every SKU in the network,<br />
              <span className="font-serif text-ink-300">priced in real time.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[14px] text-ink-400 leading-relaxed">
            The Aiigo order book aggregates every listing into a single global market.
            Prices update per second, settle per second, refund on failure.
          </p>
        </div>

        {/* Tab strip */}
        <div className="flex items-center border-b hair mb-0">
          <div className="flex">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 py-3 text-[13px] font-mono border-r hair ${tab === t.id ? 'text-ink-50 bg-white/5' : 'text-ink-400 hover:text-ink-200'
                  }`}
              >
                {t.label} <span className="text-ink-500 ml-1">{t.n}</span>
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2 pr-2 font-mono text-[11px] text-ink-400">
            <span>Sort</span>
            <select
              value={sort} onChange={e => setSort(e.target.value)}
              className="bg-transparent border hair px-2 py-1 rounded-sm text-ink-100"
            >
              <option value="price">price ↑</option>
              <option value="live">availability ↓</option>
              <option value="delta">24h move</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="font-mono text-[10px] uppercase tracking-wider text-ink-400 border-b hair">
                {['#', 'SKU', 'Region', 'Spot /hr', '24h', 'Available', 'Depth', 'Action'].map((h, i) => (
                  <th key={i} className="text-left px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const depth = Math.min(r.live / 40, 100);
                return (
                  <tr key={i} className="border-b hair hover:bg-white/[0.03] group cursor-pointer">
                    <td className="px-4 py-3.5 font-mono text-ink-500 tnum w-10">{String(i + 1).padStart(2, '0')}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className={`w-1.5 h-1.5 rounded-full ${r.live > 1000 ? 'bg-signal-green' : r.live > 100 ? 'bg-accent' : 'bg-amber-warn'}`}></span>
                        <span className="text-ink-100 font-medium">{r.sku}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[12px] text-ink-300">{r.region}</td>
                    <td className="px-4 py-3.5 font-mono tnum text-ink-50">${r.price.toFixed(2)}</td>
                    <td className={`px-4 py-3.5 font-mono tnum ${r.delta >= 0 ? 'text-signal-green' : 'text-signal-red'}`}>
                      {r.delta >= 0 ? '+' : ''}{r.delta.toFixed(2)}
                    </td>
                    <td className="px-4 py-3.5 font-mono tnum text-ink-200">{r.live.toLocaleString()}</td>
                    <td className="px-4 py-3.5 w-48">
                      <div className="h-1.5 bg-white/5 relative overflow-hidden">
                        <div className="h-full bg-accent" style={{ width: `${depth}%` }}></div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <button className="opacity-0 group-hover:opacity-100 transition text-[12px] font-mono text-accent hover:underline">
                        rent →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex items-center justify-between flex-wrap gap-3">
          <p className="font-mono text-[11px] text-ink-500">
            Showing 13 of 94 SKUs · prices refresh every 1.0s
          </p>
          <Btn variant="ghost" size="sm">Open full market <Arrow size={12} /></Btn>
        </div>
      </div>
    </section>
  );
}



// ===== how.jsx =====
// How it works — two columns: sellers + buyers, on paper bg

function HowItWorks() {
  return (
    <section id="sell" className="relative bg-paper text-ink-950 border-b hair-b">
      <div className="absolute inset-0 grid-bg-paper opacity-60 pointer-events-none"></div>
      <div className="max-w-[1400px] mx-auto px-6 py-28 relative">
        <div className="grid grid-cols-12 gap-10 mb-14">
          <div className="col-span-12 md:col-span-5">
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink-500 mb-4">§02 · How it works</div>
            <h2 className="font-light text-4xl md:text-6xl leading-[1.0] tracking-tight text-ink-950">
              Two sides.<br />
              <span className="font-serif text-ink-700">One exchange.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7 md:pt-6">
            <p className="text-[17px] leading-[1.55] text-ink-700 max-w-xl">
              Sellers install a 12MB agent; it benchmarks the hardware, publishes a listing,
              and accepts jobs while the machine is idle. Buyers hit an HTTPS endpoint with a
              container image and a budget. The exchange handles verification, routing,
              escrow, and settlement.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-0 border hair-dark bg-paper2/60">
          {/* Sellers */}
          <div id="sell" className="col-span-12 lg:col-span-6 p-10 border-b lg:border-b-0 lg:border-r hair-dark">
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center justify-center w-6 h-6 border border-ink-950 font-mono text-[11px]">A</span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink-500">For providers · hardware owners</span>
            </div>
            <h3 className="font-light text-3xl md:text-4xl tracking-tight mb-3">
              Earn while you sleep.<br />
              <span className="font-serif">Literally.</span>
            </h3>
            <p className="text-[15px] text-ink-700 mb-8 max-w-md">
              Any CUDA-capable GPU, Apple Silicon, or x86 box can earn. Payouts in USDC or
              local fiat, daily. No middleman markup — you keep 92%.
            </p>

            <ol className="space-y-4">
              {[
                ['Install', 'curl aiigo.sh | sh — or grab the desktop app. 12MB agent, sandboxed, rootless.'],
                ['Benchmark', 'We run a 90-second PoW pass, sign your capabilities, list them on the exchange.'],
                ['Earn', 'Your box takes jobs only when idle. Pause from the menubar. Daily auto-payout.']
              ].map(([k, v], i) => (
                <li key={k} className="flex gap-5 pb-4 border-b hair-dark last:border-b-0">
                  <span className="font-mono text-[11px] text-ink-500 pt-1 w-8">0{i + 1}</span>
                  <div className="flex-1">
                    <div className="font-medium text-ink-950">{k}</div>
                    <div className="text-[14px] text-ink-700 mt-0.5 leading-relaxed">{v}</div>
                  </div>
                </li>
              ))}
            </ol>

            {/* Code block */}
            <div className="mt-8 bg-ink-950 text-paper font-mono text-[12px] leading-relaxed">
              <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between">
                <span className="text-ink-400">~ $ install aiigo</span>
                <span className="text-ink-500 text-[10px]">bash · macOS / linux</span>
              </div>
              <pre className="px-4 py-4 text-paper/90"><span className="text-ink-500"># one-liner</span>{"\n"}
                <span className="text-accent">$ </span>curl -fsSL get.aiigo.org | sh{"\n"}
                <span className="text-ink-500"># → detected: 2× RTX 4090</span>{"\n"}
                <span className="text-ink-500"># → est. earnings: $14.20/day</span>{"\n"}
                <span className="text-accent">$ </span>aiigo start --auto-pause-on-use</pre>
            </div>

            <div className="mt-6 flex gap-3">
              <Btn variant="dark" size="md" as="a" href="#">Download agent <Arrow size={12} /></Btn>
              <a href="#" className="text-[13px] font-medium underline underline-offset-4 text-ink-700 hover:text-ink-950 self-center">Earnings calculator →</a>
            </div>
          </div>

          {/* Buyers */}
          <div id="buy" className="col-span-12 lg:col-span-6 p-10">
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center justify-center w-6 h-6 border border-ink-950 font-mono text-[11px]">B</span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink-500">For buyers · AI & simulation teams</span>
            </div>
            <h3 className="font-light text-3xl md:text-4xl tracking-tight mb-3">
              Compute at spot prices.<br />
              <span className="font-serif">Docker-native.</span>
            </h3>
            <p className="text-[15px] text-ink-700 mb-8 max-w-md">
              Submit an OCI image with a budget ceiling. The router finds the cheapest
              qualifying nodes, streams logs back, and bills per second of actual use.
            </p>

            <ol className="space-y-4">
              {[
                ['Push image', 'Any Docker image with CUDA, ROCm, or MLX. We cache regionally.'],
                ['Set budget', 'Max $/hr or $/job. Specify SLA tier: wholesale, standard, or spot.'],
                ['Run', 'HTTPS/gRPC endpoint. Cryptographic receipts. Pause, resume, migrate.']
              ].map(([k, v], i) => (
                <li key={k} className="flex gap-5 pb-4 border-b hair-dark last:border-b-0">
                  <span className="font-mono text-[11px] text-ink-500 pt-1 w-8">0{i + 1}</span>
                  <div className="flex-1">
                    <div className="font-medium text-ink-950">{k}</div>
                    <div className="text-[14px] text-ink-700 mt-0.5 leading-relaxed">{v}</div>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 bg-ink-950 text-paper font-mono text-[12px] leading-relaxed">
              <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between">
                <span className="text-ink-400">~ $ submit job</span>
                <span className="text-ink-500 text-[10px]">aiigo-cli · v2.4</span>
              </div>
              <pre className="px-4 py-4 text-paper/90"><span className="text-accent">$ </span>aiigo run ./train.yaml \{"\n"}
                --sku h100-80g --max $2.00/hr \{"\n"}
                --replicas 8 --region any{"\n"}
                <span className="text-ink-500"># → matched 8 nodes in 1.3s</span>{"\n"}
                <span className="text-ink-500"># → streaming logs… </span><span className="text-accent">●</span></pre>
            </div>

            <div className="mt-6 flex gap-3">
              <Btn variant="primary" size="md" as="a" href="#">Get API key <Arrow size={12} /></Btn>
              <a href="#" className="text-[13px] font-medium underline underline-offset-4 text-ink-700 hover:text-ink-950 self-center">Read the docs →</a>
            </div>
          </div>
        </div>

        {/* Guarantees row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 mt-0 border-l border-r border-b hair-dark">
          {[
            ['Per-second billing', 'No 15-minute rounding'],
            ['Cryptographic receipts', 'PoW + PoDC proofs'],
            ['Auto-refund', 'Failed job = zero charge'],
            ['Open protocol', 'Self-host the matcher'],
          ].map(([k, v], i) => (
            <div key={k} className={`p-6 ${i > 0 ? 'border-l hair-dark' : ''} ${i >= 2 ? 'border-t lg:border-t-0' : ''}`}>
              <div className="flex items-start gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" className="mt-1 text-ink-950"><path d="M3 7L6 10L11 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" /></svg>
                <div>
                  <div className="font-medium text-[14px] text-ink-950">{k}</div>
                  <div className="text-[12px] text-ink-700 mt-0.5">{v}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



// ===== network.jsx =====
// Network map + live activity feed

function NetworkMap() {

  const [feed, setFeed] = React.useState([
    { t: '16:42:11', ev: 'job.match', n: 'H100 · eu-central', amt: '$1.68/hr' },
    { t: '16:42:09', ev: 'node.online', n: 'RTX 4090 · ap-south', amt: '' },
    { t: '16:42:08', ev: 'settle', n: 'payout 0.041 USDC', amt: '' },
    { t: '16:42:05', ev: 'job.complete', n: '72B fine-tune · 2h14m', amt: '$184.40' },
    { t: '16:42:01', ev: 'node.online', n: 'M2 Ultra · ap-east', amt: '' },
  ]);

  React.useEffect(() => {
    const skus = ['H100', 'A100', '4090', 'M2 Ultra', 'L40S', 'MI300X', '3090'];
    const regs = ['us-west', 'eu-central', 'ap-south', 'us-east', 'ap-east', 'sa-east'];
    const evs = ['job.match', 'node.online', 'settle', 'job.complete', 'bid.win'];
    const id = setInterval(() => {
      const now = new Date();
      const t = now.toLocaleTimeString('en-US', { hour12: false });
      const ev = evs[Math.floor(Math.random() * evs.length)];
      const sku = skus[Math.floor(Math.random() * skus.length)];
      const reg = regs[Math.floor(Math.random() * regs.length)];
      const price = (Math.random() * 2 + 0.1).toFixed(2);
      const next = {
        t, ev,
        n: ev === 'settle' ? `payout ${(Math.random() * 0.2).toFixed(3)} USDC`
          : ev === 'job.complete' ? `job · ${Math.floor(Math.random() * 4 + 1)}h${Math.floor(Math.random() * 59)}m`
            : `${sku} · ${reg}`,
        amt: ev === 'job.match' || ev === 'bid.win' ? `${price}/hr` : ev === 'job.complete' ? `${(price * 10).toFixed(2)}` : '',
      };
      setFeed(f => [next, ...f.slice(0, 9)]);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="network" className="relative bg-ink-950 border-b hair-b">
      <div className="max-w-[1400px] mx-auto px-6 py-24">
        <div className="grid grid-cols-12 gap-10 mb-12">
          <div className="col-span-12 md:col-span-6">
            <Eyebrow className="mb-4">§03 · Network</Eyebrow>
            <h2 className="font-light text-4xl md:text-5xl leading-[1.05] tracking-tight text-ink-50">
              8,412 nodes.<br />
              <span className="font-serif text-accent">94 countries.</span><br />
              One routing layer.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:pt-8">
            <p className="text-[15px] text-ink-300 max-w-md">
              Nodes join and leave in seconds. The matcher places each job on the cheapest
              compliant node within latency targets. Workload never leaves the encrypted
              sandbox; weights never touch the disk.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-0 border hair">
          {/* Map */}
          <div className="col-span-12 lg:col-span-8 relative aspect-[1000/460] bg-ink-900/40 overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30"></div>
            <svg viewBox="0 0 1000 460" className="absolute inset-0 w-full h-full">
              {/* Very rough continent outlines as light shapes */}
              <g fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5">
                {/* N America */}
                <path d="M100,120 Q120,80 180,100 L280,90 Q340,110 360,180 L340,240 L260,260 L200,240 L150,220 L110,200 Z" />
                {/* S America */}
                <path d="M290,290 L340,290 L360,340 L340,400 L300,410 L280,370 L270,320 Z" />
                {/* Europe */}
                <path d="M440,110 L520,100 L560,130 L540,180 L460,190 L430,160 Z" />
                {/* Africa */}
                <path d="M470,200 L540,210 L560,290 L520,360 L470,340 L450,280 Z" />
                {/* Asia */}
                <path d="M560,100 L760,110 L820,150 L830,220 L760,250 L680,240 L600,210 L560,160 Z" />
                {/* Australia */}
                <path d="M780,300 L860,300 L880,340 L830,360 L780,340 Z" />
              </g>

              {/* Latitude lines */}
              {[115, 230, 345].map(y => (
                <line key={y} x1="0" x2="1000" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" strokeDasharray="2,4" />
              ))}

              {/* Connecting arcs */}
              {[
                ['M 180,180 Q 340,60 475,170', 0],
                ['M 475,170 Q 600,100 720,230', 0.4],
                ['M 300,200 Q 550,40 720,230', 0.8],
                ['M 180,180 Q 250,350 340,330', 1.2],
              ].map((a, i) => (
                <path key={i} d={a[0]} fill="none" stroke="var(--accent)" strokeWidth="0.7" opacity="0.4" strokeDasharray="3,4">
                  <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="3s" repeatCount="indefinite" />
                </path>
              ))}

              {/* Dots */}
              {NODE_DOTS.map(d => (
                <circle key={d.id} cx={d.x} cy={d.y} r={d.size}
                  fill={d.hot ? 'var(--accent)' : 'rgba(198,255,63,0.35)'}
                  className={d.hot ? '' : ''}>
                  {d.hot && <animate attributeName="opacity" values="1;0.5;1" dur={`${2 + Math.random() * 2}s`} repeatCount="indefinite" />}
                </circle>
              ))}
            </svg>

            {/* Map overlays */}
            <div className="absolute top-4 left-4 flex items-center gap-3 font-mono text-[10px] text-ink-300">
              <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-accent rounded-full"></span> active (4,812)</div>
              <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-accent/40 rounded-full"></span> online (3,600)</div>
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[10px] text-ink-400">
              mercator · real-time
            </div>

            {/* Region callouts */}
            {[
              { x: '32%', y: '48%', label: 'us-west · 1,212' },
              { x: '50%', y: '36%', label: 'eu-central · 2,140' },
              { x: '74%', y: '48%', label: 'ap-east · 1,840' },
            ].map((c, i) => (
              <div key={i} className="absolute font-mono text-[10px] text-ink-50 bg-ink-950/80 border hair px-2 py-1" style={{ left: c.x, top: c.y }}>
                {c.label}
              </div>
            ))}
          </div>

          {/* Feed */}
          <div className="col-span-12 lg:col-span-4 border-t lg:border-t-0 lg:border-l hair flex flex-col">
            <div className="px-4 py-3 border-b hair flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LiveDot />
                <span className="font-mono text-[11px] uppercase tracking-wider text-ink-300">Network feed</span>
              </div>
              <span className="font-mono text-[10px] text-ink-500">tail -f</span>
            </div>
            <div className="flex-1 font-mono text-[11px] overflow-hidden">
              {feed.map((f, i) => (
                <div key={`${f.t}-${i}`}
                  className="px-4 py-2 border-b hair flex items-start gap-3"
                  style={{ opacity: 1 - i * 0.06 }}>
                  <span className="text-ink-500 tnum">{f.t}</span>
                  <span className={`w-[82px] ${f.ev.startsWith('job') ? 'text-accent' :
                    f.ev === 'settle' ? 'text-signal-green' :
                      f.ev === 'bid.win' ? 'text-amber-warn' :
                        'text-ink-300'
                    }`}>{f.ev}</span>
                  <span className="text-ink-200 flex-1">{f.n}</span>
                  {f.amt && <span className="text-ink-400">{f.amt}</span>}
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t hair flex items-center justify-between font-mono text-[10px] text-ink-500">
              <span>events/sec · 284</span>
              <a href="#" className="text-accent hover:underline">open explorer →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



// ===== earnings.jsx =====
// Earnings calculator + economics panel

function EarningsCalc() {
  const [gpu, setGpu] = React.useState('rtx4090');
  const [count, setCount] = React.useState(2);
  const [hrs, setHrs] = React.useState(18);

  const rates = {
    rtx3090: { label: 'RTX 3090', hourly: 0.18 },
    rtx4080: { label: 'RTX 4080', hourly: 0.22 },
    rtx4090: { label: 'RTX 4090', hourly: 0.31 },
    a6000: { label: 'A6000 48G', hourly: 0.48 },
    a100: { label: 'A100 80G', hourly: 0.92 },
    h100: { label: 'H100 80G', hourly: 1.72 },
    m2u: { label: 'M2 Ultra 64G', hourly: 0.11 },
  };

  const r = rates[gpu];
  const daily = r.hourly * hrs * count * 0.92;
  const monthly = daily * 30;
  const yearly = daily * 365;

  return (
    <section id="earn-calc" className="relative bg-ink-950 border-b hair-b">
      <div className="max-w-[1400px] mx-auto px-6 py-24">
        <div className="grid grid-cols-12 gap-10 mb-12">
          <div className="col-span-12 md:col-span-7">
            <Eyebrow className="mb-4">§04 · Economics</Eyebrow>
            <h2 className="font-light text-4xl md:text-5xl leading-[1.05] tracking-tight text-ink-50 max-w-3xl">
              Your electricity is already running.<br />
              <span className="font-serif text-ink-300">Make it pay rent.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:pt-6">
            <p className="text-[15px] text-ink-300">
              At US grid averages a 2× 4090 rig earns roughly 3.4× its idle cost. Estimates below use rolling 7-day median spot prices minus a conservative fill-rate assumption of 62%.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-0 border hair">
          {/* Controls */}
          <div className="col-span-12 lg:col-span-5 p-8 border-b lg:border-b-0 lg:border-r hair">
            <Eyebrow className="mb-6">Configure your rig</Eyebrow>

            <div className="mb-6">
              <div className="font-mono text-[11px] uppercase text-ink-400 mb-2">Hardware</div>
              <div className="grid grid-cols-2 gap-1">
                {Object.entries(rates).map(([k, v]) => (
                  <button key={k}
                    onClick={() => setGpu(k)}
                    className={`text-left px-3 py-2 text-[13px] border hair ${gpu === k ? 'bg-accent text-ink-950 border-accent' : 'bg-ink-900/40 text-ink-200 hover:bg-white/5'
                      }`}>
                    <div className="font-mono text-[11px] opacity-70">{k}</div>
                    <div>{v.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] uppercase text-ink-400">Units</span>
                <span className="font-mono text-[13px] text-accent tnum">×{count}</span>
              </div>
              <input type="range" min="1" max="16" value={count} onChange={e => setCount(+e.target.value)}
                className="w-full accent-lime" />
              <div className="flex justify-between font-mono text-[10px] text-ink-500 mt-1"><span>1</span><span>16</span></div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] uppercase text-ink-400">Hours idle / day</span>
                <span className="font-mono text-[13px] text-accent tnum">{hrs}h</span>
              </div>
              <input type="range" min="1" max="24" value={hrs} onChange={e => setHrs(+e.target.value)}
                className="w-full accent-lime" />
              <div className="flex justify-between font-mono text-[10px] text-ink-500 mt-1"><span>1h</span><span>24h</span></div>
            </div>
          </div>

          {/* Output */}
          <div className="col-span-12 lg:col-span-7 p-8 bg-ink-900/30 relative">
            <CornerMarks color="border-ink-500/40" />
            <Eyebrow className="mb-6">Projected earnings · after 8% network fee</Eyebrow>

            <div className="grid grid-cols-3 gap-0 border hair divide-x divide-white/10 mb-8">
              {[
                ['Daily', daily],
                ['Monthly', monthly],
                ['Yearly', yearly],
              ].map(([k, v]) => (
                <div key={k} className="p-5">
                  <div className="font-mono text-[10px] uppercase text-ink-400 mb-2">{k}</div>
                  <div className="font-light text-3xl tnum text-ink-50">
                    ${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="font-mono text-[10px] text-ink-500 mt-1">USDC</div>
                </div>
              ))}
            </div>

            {/* Bar chart — monthly earnings by hardware */}
            <div>
              <Eyebrow className="mb-3">Monthly earnings · comparison</Eyebrow>
              <div className="space-y-2">
                {Object.entries(rates).map(([k, v]) => {
                  const m = v.hourly * hrs * count * 0.92 * 30;
                  const max = rates.h100.hourly * hrs * count * 0.92 * 30;
                  const pct = (m / max) * 100;
                  const active = k === gpu;
                  return (
                    <div key={k} className="flex items-center gap-3 text-[12px]">
                      <div className={`w-28 font-mono ${active ? 'text-accent' : 'text-ink-400'}`}>{v.label}</div>
                      <div className="flex-1 h-5 bg-white/[0.03] border hair relative">
                        <div className={`absolute inset-y-0 left-0 ${active ? 'bg-accent' : 'bg-ink-300'}`} style={{ width: `${pct}%`, opacity: active ? 1 : 0.35 }}></div>
                      </div>
                      <div className={`w-24 text-right font-mono tnum ${active ? 'text-ink-50' : 'text-ink-400'}`}>
                        ${m.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Fee / payout chip */}
        <div className="mt-6 flex flex-wrap items-center gap-6 font-mono text-[11px] text-ink-400">
          <span><span className="text-accent">●</span> 92% · provider keeps</span>
          <span><span className="text-ink-300">●</span> 6% · router + escrow</span>
          <span><span className="text-ink-500">●</span> 2% · treasury / slashing pool</span>
          <span className="ml-auto text-ink-500">daily USDC payouts · zero lockup</span>
        </div>
      </div>
    </section>
  );
}



// ===== providers.jsx =====
// Provider stories + buyer logos + CTA

function Providers() {


  return (
    <>
      <section className="relative bg-ink-950 border-b hair-b">
        <div className="max-w-[1400px] mx-auto px-6 py-24">
          <div className="grid grid-cols-12 gap-10 mb-14">
            <div className="col-span-12 md:col-span-6">
              <Eyebrow className="mb-4">§05 · Who is on the network</Eyebrow>
              <h2 className="font-light text-4xl md:text-5xl leading-[1.05] tracking-tight text-ink-50 max-w-xl">
                From bedroom rigs to <span className="font-serif text-ink-300">data-center floors.</span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-6 md:pt-8">
              <p className="text-[15px] text-ink-300 max-w-md">
                Aiigo works the same for a solo builder with one 3090 as it does for a
                colocation operator with 18 H100s. Different SLA tiers, same market, same rails.
              </p>
            </div>
          </div>

          {/* Provider cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-t hair">
            {PROVIDER_STORIES.map((p, i) => (
              <div key={p.name} className="border-r border-b hair p-6 hover:bg-white/[0.02] transition">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <div className="font-medium text-ink-50">{p.name}</div>
                    <div className="font-mono text-[11px] text-ink-400 mt-0.5">{p.loc}</div>
                  </div>
                  <div className="font-mono text-[10px] text-ink-500 border hair px-2 py-0.5">#{String(i + 1).padStart(3, '0')}</div>
                </div>
                <div className="py-4 border-y hair">
                  <Eyebrow className="mb-1">Rig</Eyebrow>
                  <div className="text-[13px] text-ink-200">{p.rig}</div>
                </div>
                <div className="pt-4">
                  <Eyebrow className="mb-1">Last 30 days</Eyebrow>
                  <div className="font-light text-3xl tnum text-accent">
                    ${p.month.toLocaleString()}
                  </div>
                </div>
                <p className="text-[13px] text-ink-300 mt-5 leading-relaxed border-t hair pt-4">
                  <span className="text-ink-50 font-serif text-lg">“</span>{p.quote}
                </p>
              </div>
            ))}
          </div>

          {/* Buyer side */}
          <div className="mt-14 grid grid-cols-12 gap-0 border hair">
            <div className="col-span-12 lg:col-span-4 p-8 border-b lg:border-b-0 lg:border-r hair">
              <Eyebrow className="mb-4">Buyer side · savings</Eyebrow>
              <h3 className="font-light text-2xl md:text-3xl tracking-tight text-ink-50 mb-4">
                Same workload. <span className="font-serif text-accent">Smaller bill.</span>
              </h3>
              <p className="text-[14px] text-ink-300">
                Median cost reduction versus the closest AWS / GCP / Azure SKU across the
                last 10,000 settled jobs.
              </p>
            </div>
            {BUYER_STORIES.map((b, i) => (
              <div key={b.who} className={`col-span-12 md:col-span-6 lg:col-span-2 p-6 border-b md:border-b-0 ${i > 0 ? 'md:border-l hair' : ''} ${i % 2 === 1 ? 'border-l md:border-l hair' : ''} lg:border-l hair`}>
                <div className="font-mono text-[10px] text-ink-500 mb-2">{String(i + 1).padStart(2, '0')}</div>
                <div className="text-[13px] text-ink-100 mb-1">{b.who}</div>
                <div className="text-[11px] text-ink-400 mb-6">{b.use}</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-accent text-3xl font-light tnum">{b.saved}</span>
                  <span className="text-accent text-sm">%</span>
                </div>
                <div className="font-mono text-[10px] text-ink-500 mt-1">saved</div>
              </div>
            ))}
          </div>

          {/* Partners */}
          <div className="mt-14">
            <Eyebrow className="mb-5">Integrates with</Eyebrow>
            <div className="border-y hair py-6 overflow-hidden">
              <div className="marquee-track">
                {[...PARTNERS, ...PARTNERS].map((p, i) => (
                  <div key={i} className="px-8 font-serif text-xl text-ink-400 hover:text-ink-100 transition whitespace-nowrap">
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative bg-paper text-ink-950 border-b hair-b">
        <div className="absolute inset-0 grid-bg-paper opacity-60 pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto px-6 py-28 relative">
          <div className="grid grid-cols-12 gap-10 items-end">
            <div className="col-span-12 lg:col-span-8">
              <Eyebrow className="text-ink-500 mb-6">§06 · The ask</Eyebrow>
              <h2 className="font-light text-5xl md:text-7xl lg:text-[96px] leading-[0.95] tracking-[-0.035em] text-ink-950">
                Join 8,412<br />
                people turning <span className="font-serif text-ink-700">silicon<br /></span>
                into <span className="font-serif">second income.</span>
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:pb-4">
              <p className="text-[15px] text-ink-700 mb-8 max-w-sm">
                Takes 90 seconds to set up. Pauses automatically when you need your machine.
                No credit card to start earning.
              </p>
              <div className="flex flex-col gap-3">
                <Btn variant="dark" size="lg" className="justify-between w-full" as="a" href="#">
                  <span className="flex items-center gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    Download for macOS
                  </span>
                  <Arrow size={14} />
                </Btn>
                <Btn variant="dark" size="lg" className="justify-between w-full" as="a" href="#">
                  <span className="flex items-center gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5.5 L10.5 4.3 L10.5 11.5 L3 11.5 Z M11.5 4.15 L21 2.75 L21 11.5 L11.5 11.5 Z M3 12.5 L10.5 12.5 L10.5 19.7 L3 18.5 Z M11.5 12.5 L21 12.5 L21 21.25 L11.5 19.85 Z" /></svg>
                    Download for Windows
                  </span>
                  <Arrow size={14} />
                </Btn>
                <Btn variant="outline" size="lg" className="justify-between w-full border-ink-950 text-ink-950 hover:bg-ink-950 hover:text-paper" as="a" href="#">
                  <span className="flex items-center gap-3 font-mono text-[13px]">
                    curl -fsSL get.aiigo.org | sh
                  </span>
                  <Arrow size={14} />
                </Btn>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}



// ===== footer.jsx =====
// Footer

function FooterBlock() {
  const columns = [
    {
      title: 'Market',
      links: ['Live prices', 'Full order book', 'SKU catalog', 'Regions', 'Historical data'],
    },
    {
      title: 'Build',
      links: ['Docs', 'CLI', 'Python SDK', 'gRPC / HTTP API', 'Examples', 'Status'],
    },
    {
      title: 'Earn',
      links: ['Download agent', 'Earnings calculator', 'Setup guide', 'Payout schedule', 'Ambassador'],
    },
    {
      title: 'Protocol',
      links: ['Whitepaper', 'Verification (PoDC)', 'Matcher', 'Slashing & SLAs', 'Audits', 'Governance'],
    },
    {
      title: 'Company',
      links: ['About', 'Careers', 'Press', 'Blog', 'Contact'],
    },
  ];

  return (
    <footer className="relative bg-ink-950 text-ink-200">
      <div className="max-w-[1400px] mx-auto px-6 pt-24 pb-12">
        <div className="grid grid-cols-12 gap-10 mb-16">
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-2 mb-6">
              <svg width="26" height="26" viewBox="0 0 22 22" className="text-accent">
                <rect x="1" y="1" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M6 15 L11 5 L16 15 M8 11 L14 11" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="square" />
              </svg>
              <span className="font-mono font-semibold text-ink-50 text-lg">aiigo</span>
            </div>
            <p className="font-serif text-2xl leading-tight text-ink-50 max-w-xs mb-6">
              Idle silicon,<br />priced by the second.
            </p>
            <div className="flex items-center gap-2 mb-8">
              <input type="email" placeholder="you@domain.com"
                className="flex-1 bg-ink-900 border hair px-3 py-2.5 text-[13px] text-ink-100 placeholder:text-ink-500 focus:outline-none focus:border-accent" />
              <button className="bg-accent text-ink-950 px-4 py-2.5 text-[13px] font-medium hover:brightness-95">
                Subscribe
              </button>
            </div>
            <div className="flex gap-2">
              {['X', 'GH', 'TG', 'DC'].map(s => (
                <a key={s} href="#" className="w-9 h-9 border hair flex items-center justify-center font-mono text-[11px] text-ink-400 hover:border-accent hover:text-accent">
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 grid grid-cols-2 md:grid-cols-5 gap-8">
            {columns.map(col => (
              <div key={col.title}>
                <div className="font-mono text-[10px] uppercase tracking-widest text-ink-400 mb-4 pb-2 border-b hair">
                  {col.title}
                </div>
                <ul className="space-y-2.5">
                  {col.links.map(l => (
                    <li key={l}>
                      <a href="#" className="text-[13px] text-ink-200 hover:text-accent transition">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Big display aiigo */}
        <div className="border-t hair pt-12 pb-8">
          <div className="font-light tracking-[-0.04em] text-ink-900 leading-none select-none"
            style={{ fontSize: 'clamp(96px, 22vw, 320px)' }}>
            aiigo<span className="text-accent">.</span>
          </div>
        </div>

        <div className="border-t hair pt-6 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-ink-500">
          <div>© {new Date().getFullYear()} Aiigo Labs · Not financial advice · Open protocol</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-ink-200">Privacy</a>
            <a href="#" className="hover:text-ink-200">Terms</a>
            <a href="#" className="hover:text-ink-200">Security</a>
            <a href="#" className="hover:text-ink-200">status.aiigo.org</a>
          </div>
        </div>
      </div>
    </footer>
  );
}



// ===== tweaks.jsx =====
// Tweaks panel — lets users toggle aesthetic variants

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#C6FF3F",
  "density": "comfortable",
  "heroLine": "serif",
  "gridBg": true
}/*EDITMODE-END*/;

function TweaksPanel({ values, setValues }) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode') setVisible(true);
      if (e.data?.type === '__deactivate_edit_mode') setVisible(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const update = (k, v) => {
    const next = { ...values, [k]: v };
    setValues(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
  };

  if (!visible) return null;

  const accents = [
    { val: '#C6FF3F', label: 'Lime' },
    { val: '#F7B955', label: 'Amber' },
    { val: '#6FE7D8', label: 'Mint' },
    { val: '#FF7A5C', label: 'Coral' },
    { val: '#B794F6', label: 'Lavender' },
    { val: '#E6E9ED', label: 'Paper' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 tweaks-panel bg-ink-950/95 border hair w-72 font-mono text-[11px]">
      <div className="px-4 py-3 border-b hair flex items-center justify-between">
        <span className="uppercase tracking-widest text-ink-200">Tweaks</span>
        <span className="text-ink-500">aiigo/v1</span>
      </div>
      <div className="p-4 space-y-5">
        <div>
          <div className="uppercase text-ink-400 mb-2 text-[10px] tracking-widest">Accent</div>
          <div className="grid grid-cols-3 gap-1">
            {accents.map(a => (
              <button key={a.val}
                onClick={() => update('accent', a.val)}
                className={`flex items-center gap-2 px-2 py-1.5 border hair hover:bg-white/5 text-left ${values.accent === a.val ? 'border-ink-100' : ''}`}>
                <span className="w-3 h-3 rounded-sm" style={{ background: a.val }}></span>
                <span className="text-[10px] text-ink-200">{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="uppercase text-ink-400 mb-2 text-[10px] tracking-widest">Hero serif words</div>
          <div className="grid grid-cols-2 gap-1">
            {['serif', 'sans'].map(s => (
              <button key={s} onClick={() => update('heroLine', s)}
                className={`px-2 py-1.5 border hair hover:bg-white/5 text-ink-200 ${values.heroLine === s ? 'bg-white/10 text-ink-50' : ''}`}>
                {s === 'serif' ? 'Italic serif' : 'All sans'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="uppercase text-ink-400 mb-2 text-[10px] tracking-widest">Density</div>
          <div className="grid grid-cols-2 gap-1">
            {['comfortable', 'compact'].map(d => (
              <button key={d} onClick={() => update('density', d)}
                className={`px-2 py-1.5 border hair hover:bg-white/5 text-ink-200 ${values.density === d ? 'bg-white/10 text-ink-50' : ''}`}>
                {d}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="uppercase text-ink-400 mb-2 text-[10px] tracking-widest">Grid background</div>
          <button onClick={() => update('gridBg', !values.gridBg)}
            className={`w-full px-2 py-1.5 border hair hover:bg-white/5 ${values.gridBg ? 'bg-white/10 text-ink-50' : 'text-ink-200'}`}>
            {values.gridBg ? 'On' : 'Off'}
          </button>
        </div>
      </div>
    </div>
  );
}



// ===== app.jsx =====
export default function App() {
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent', tweaks.accent);
    // dimmed version
    root.style.setProperty('--accent-dim', tweaks.accent);

    // hero serif toggle: swap class on body
    document.body.classList.toggle('all-sans', tweaks.heroLine === 'sans');
    document.body.classList.toggle('compact', tweaks.density === 'compact');
    document.body.classList.toggle('no-grid', !tweaks.gridBg);
  }, [tweaks]);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <MarketTable />
        <HowItWorks />
        <NetworkMap />
        <EarningsCalc />
        <Providers />
      </main>
      <FooterBlock />
      <TweaksPanel values={tweaks} setValues={setTweaks} />
    </>
  );
}



