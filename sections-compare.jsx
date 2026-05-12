// sections-compare.jsx — Before/After workflow comparison + Live product preview

/* BEFORE / AFTER — visual side-by-side */
function BeforeAfter() {
  const before = {
    label: 'BEFORE',
    sub: 'Manual workflow',
    duration: '3 days',
    durationSub: '4 humans · 19 hand-offs',
    steps: [
      { t: 'Mon', d: 'RFQ lands in inbox' },
      { t: 'Tue', d: 'Ops chases supplier prices' },
      { t: 'Wed', d: 'Quote drafted in Excel' },
      { t: 'Thu', d: 'Quote sent · 32% margin' },
    ],
    metrics: [
      { v: '3 days',   k: 'Turnaround' },
      { v: '32%',      k: 'Margin' },
      { v: '4.2 hrs',  k: 'Founder time' },
    ],
    accent: false,
  };
  const after = {
    label: 'WITH BRILLIANTOS',
    sub: 'Autopilot',
    duration: '6 min',
    durationSub: '1 tap to approve',
    steps: [
      { t: '09:14', d: 'Autopilot parses RFQ + supplier prices' },
      { t: '09:17', d: 'Quote drafted at 38% margin' },
      { t: '09:18', d: 'You approve from phone' },
      { t: '09:20', d: 'Sent · filed in CRM · follow-up armed' },
    ],
    metrics: [
      { v: '6 min',   k: 'Turnaround' },
      { v: '38%',     k: 'Margin' },
      { v: '0.1 hr',  k: 'Founder time' },
    ],
    accent: true,
  };
  return (
    <section className="section" style={{ background: 'var(--bg-2)' }}>
      <div className="container">
        <div style={{ marginBottom: 48 }}>
          <Reveal><div className="eyebrow" style={{ marginBottom: 20 }}>04 / Before & after</div></Reveal>
          <Reveal delay={80}>
            <h2 className="display h2" style={{ margin: 0, maxWidth: '20ch' }}>
              The same RFQ.<br/>
              <span className="italic" style={{ color: 'var(--accent)' }}>One Monday morning.</span>
            </h2>
          </Reveal>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'stretch'
        }}>
          <Reveal><BeforeAfterCard data={before} /></Reveal>
          <Reveal delay={120}><BeforeAfterCard data={after} /></Reveal>
        </div>

        <Reveal delay={240}>
          <div style={{
            marginTop: 24,
            padding: '28px 32px',
            background: 'var(--ink)',
            color: 'var(--bg)',
            borderRadius: 16,
            display: 'grid', gridTemplateColumns: 'auto 1fr 1fr 1fr',
            gap: 32, alignItems: 'center'
          }}>
            <div className="mono tiny" style={{ letterSpacing: '.14em', color: 'oklch(0.85 0.13 65)' }}>
              ● NET RESULT
            </div>
            <Multiplier v="720×" k="faster" />
            <Multiplier v="140×" k="cheaper" />
            <Multiplier v="+6 pts" k="margin" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BeforeAfterCard({ data }) {
  return (
    <div className="card" style={{
      padding: 0, overflow: 'hidden', height: '100%',
      display: 'flex', flexDirection: 'column',
      background: data.accent ? 'var(--bg)' : 'var(--bg)',
      borderColor: data.accent ? 'var(--accent)' : 'var(--rule)',
      borderWidth: data.accent ? '1px' : '0.5px',
    }}>
      {/* Header — label + giant duration */}
      <div style={{
        padding: '32px 32px 28px',
        borderBottom: '0.5px solid var(--rule)',
        background: data.accent ? 'var(--accent-soft)' : 'var(--bg-2)'
      }}>
        <div className="mono tiny" style={{
          letterSpacing: '.14em',
          color: data.accent ? 'var(--accent)' : 'var(--muted)',
          marginBottom: 12
        }}>● {data.label}</div>
        <div className="display" style={{
          fontSize: 72,
          lineHeight: 1,
          color: data.accent ? 'var(--accent)' : 'var(--ink-2)',
          letterSpacing: '-0.025em'
        }}>{data.duration}</div>
        <div className="small" style={{
          marginTop: 10,
          color: 'var(--muted)'
        }}>{data.durationSub}</div>
      </div>

      {/* Timeline — 4 dots on a vertical line */}
      <div style={{ padding: '24px 32px 12px', flex: 1 }}>
        <div style={{ position: 'relative', paddingLeft: 24 }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: 5, top: 8, bottom: 8,
            width: 1,
            background: data.accent ? 'var(--accent)' : 'var(--rule-2)',
            opacity: data.accent ? 0.4 : 0.8
          }}></div>
          {data.steps.map((s, i) => (
            <div key={i} style={{
              position: 'relative',
              padding: '10px 0',
            }}>
              <div style={{
                position: 'absolute', left: -24, top: 14,
                width: 11, height: 11, borderRadius: '50%',
                background: data.accent ? 'var(--accent)' : 'var(--muted)',
                boxShadow: `0 0 0 4px ${data.accent ? 'var(--bg)' : 'var(--bg)'}`,
              }}></div>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                gap: 16
              }}>
                <span style={{ fontSize: 14, color: 'var(--ink-2)' }}>{s.d}</span>
                <span className="mono tiny" style={{
                  color: 'var(--muted)', letterSpacing: '.04em', whiteSpace: 'nowrap'
                }}>{s.t}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics — 3 hero numbers */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        borderTop: '0.5px solid var(--rule)',
      }}>
        {data.metrics.map((m, i) => (
          <div key={m.k} style={{
            padding: '22px 12px',
            textAlign: 'center',
            borderRight: i < 2 ? '0.5px solid var(--rule)' : 'none',
          }}>
            <div className="display" style={{
              fontSize: 28,
              color: data.accent ? 'var(--accent)' : 'var(--ink-2)',
              lineHeight: 1
            }}>{m.v}</div>
            <div className="mono tiny" style={{
              marginTop: 8,
              color: 'var(--muted)',
              letterSpacing: '.06em',
              textTransform: 'uppercase'
            }}>{m.k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Multiplier({ v, k }) {
  return (
    <div>
      <div className="display" style={{
        fontSize: 44, lineHeight: 1,
        color: 'oklch(0.85 0.13 65)',
        letterSpacing: '-0.02em'
      }}>{v}</div>
      <div className="mono tiny" style={{
        marginTop: 6,
        color: 'oklch(0.75 0.012 75)',
        letterSpacing: '.08em',
        textTransform: 'uppercase'
      }}>{k}</div>
    </div>
  );
}

/* LIVE PRODUCT PREVIEW — mini interactive ERP/CRM widget */
function LivePreview() {
  const [tab, setTab] = useState('inbox');
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 820px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener ? mq.addEventListener('change', update) : mq.addListener(update);
    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', update) : mq.removeListener(update);
    };
  }, []);
  return (
    <section className="section" id="preview">
      <div className="container">
        <div style={{ marginBottom: 56 }}>
          <Reveal><div className="eyebrow" style={{ marginBottom: 20 }}>05 / Product preview</div></Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 60, alignItems: 'end' }}>
            <Reveal delay={80}>
              <h2 className="display h2" style={{ margin: 0 }}>
                Your business,<br/>
                <span className="italic" style={{ color: 'var(--accent)' }}>in one pane.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="lede">
                A single approval surface for every autopiloted workflow. Click around.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={200}>
          {isMobile ? (
            /* MOBILE: phone-shaped frame, mobile-friendly demo */
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center'
            }}>
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: 380,
                borderRadius: 36,
                padding: 10,
                background: 'var(--ink)',
                boxShadow: '0 30px 80px -30px rgba(0,0,0,.45), 0 0 0 1px rgba(0,0,0,.08)'
              }}>
                {/* speaker / camera notch */}
                <div style={{
                  position: 'absolute',
                  top: 16, left: '50%', transform: 'translateX(-50%)',
                  width: 90, height: 6, borderRadius: 4,
                  background: 'oklch(0.10 0.01 80)',
                  zIndex: 2
                }}></div>
                <iframe
                  src="erp-demo-mobile.html"
                  title="BrilliantOS interactive demo (mobile)"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 680,
                    border: 'none',
                    borderRadius: 28,
                    background: 'var(--bg)'
                  }}
                ></iframe>
              </div>
              <div style={{
                marginTop: 24,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                textAlign: 'center'
              }}>
                <div className="mono tiny muted" style={{ letterSpacing: '.08em' }}>
                  ↑ TAP ANY TAB · EVERY SCREEN IS LIVE
                </div>
                <a href="erp-demo-mobile.html" target="_blank" rel="noopener" className="btn" style={{
                  fontSize: 13, padding: '10px 18px'
                }}>Open demo full-screen <span className="arrow">→</span></a>
              </div>
            </div>
          ) : (
            /* DESKTOP: browser chrome + wide iframe */
            <>
              <div style={{
                border: '1px solid var(--rule-2)',
                borderRadius: 16,
                overflow: 'hidden',
                background: 'var(--bg)',
                boxShadow: '0 30px 80px -40px rgba(0,0,0,.25)',
                position: 'relative'
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '12px 16px',
                  borderBottom: '1px solid var(--rule)',
                  background: 'var(--bg-2)'
                }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'oklch(0.85 0.01 250)' }}></span>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'oklch(0.85 0.01 250)' }}></span>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'oklch(0.85 0.01 250)' }}></span>
                  <div style={{
                    flex: 1, margin: '0 14px', padding: '6px 12px',
                    background: 'var(--bg)',
                    border: '1px solid var(--rule)',
                    borderRadius: 6,
                    fontSize: 12,
                    color: 'var(--muted)',
                    fontFamily: 'var(--mono)'
                  }}>app.brilliantos.co / acme-studio</div>
                  <span className="chip"><span className="dot"></span>Autopilot on</span>
                </div>
                <iframe
                  src="erp-demo.html"
                  title="BrilliantOS interactive demo"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 760,
                    border: 'none',
                    background: 'var(--bg)'
                  }}
                ></iframe>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginTop: 20, gap: 20, flexWrap: 'wrap'
              }}>
                <div className="mono tiny muted" style={{ letterSpacing: '.08em' }}>
                  ↑ INTERACTIVE — CLICK ANY SIDEBAR ITEM. EVERY SCREEN IS LIVE.
                </div>
                <a href="erp-demo.html" target="_blank" rel="noopener" className="btn" style={{
                  fontSize: 13, padding: '10px 18px'
                }}>Open demo in new tab <span className="arrow">→</span></a>
              </div>
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function AppChrome({ tab }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '12px 16px',
      borderBottom: '0.5px solid var(--rule)',
      background: 'var(--bg-2)'
    }}>
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'oklch(0.85 0.01 75)' }}></span>
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'oklch(0.85 0.01 75)' }}></span>
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'oklch(0.85 0.01 75)' }}></span>
      <div style={{
        flex: 1, margin: '0 14px', padding: '6px 12px',
        background: 'var(--bg)',
        border: '0.5px solid var(--rule)',
        borderRadius: 6,
        fontSize: 12,
        color: 'var(--muted)',
        fontFamily: 'var(--mono)'
      }}>app.brilliantos.co / {tab}</div>
      <span className="chip"><span className="dot"></span>Autopilot on</span>
    </div>
  );
}

function Sidebar({ tab, onTab }) {
  const items = [
    { id: 'inbox',   label: 'Inbox',         count: 7 },
    { id: 'quotes',  label: 'Quotes',        count: 3 },
    { id: 'crm',     label: 'CRM',           count: 24 },
    { id: 'erp',     label: 'Inventory',     count: null },
    { id: 'finance', label: 'Finance',       count: null },
  ];
  return (
    <div style={{ padding: '20px 16px', background: 'var(--bg-2)' }}>
      <div className="mono tiny muted" style={{ letterSpacing: '.1em', padding: '0 8px 12px' }}>WORKSPACE</div>
      <div style={{ display: 'grid', gap: 2 }}>
        {items.map(it => (
          <button key={it.id} onClick={() => onTab(it.id)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 12px',
              borderRadius: 8,
              border: 0,
              background: tab === it.id ? 'var(--bg)' : 'transparent',
              color: tab === it.id ? 'var(--ink)' : 'var(--ink-2)',
              fontSize: 13,
              textAlign: 'left'
            }}>
            <span>{it.label}</span>
            {it.count && <span className="mono tiny muted">{it.count}</span>}
          </button>
        ))}
      </div>
      <div className="mono tiny muted" style={{ letterSpacing: '.1em', padding: '24px 8px 12px' }}>AGENTS</div>
      <div style={{ display: 'grid', gap: 10, padding: '0 8px' }}>
        {['Quoter', 'Reconciler', 'Outbound', 'PM-bot'].map(a => (
          <div key={a} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--ink-2)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'oklch(0.68 0.11 150)' }}></span>
            {a}
          </div>
        ))}
      </div>
    </div>
  );
}

function PaneHead({ title, count, action }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '20px 28px', borderBottom: '0.5px solid var(--rule)'
    }}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'baseline' }}>
        <h4 className="display" style={{ fontSize: 28, margin: 0 }}>{title}</h4>
        {count != null && <span className="mono tiny muted">{count} items</span>}
      </div>
      {action}
    </div>
  );
}

function InboxPane() {
  const rows = [
    { from: 'Northgate Holdings', subj: 'RFQ — civil works package',     ai: 'Draft quote · 14 SKUs · 38% margin', tag: 'Quote', acc: 'Approve' },
    { from: 'Acme Joinery',       subj: 'Invoice INV-2840 attached',     ai: 'Coded to 5210 · matched PO-118',     tag: 'Finance', acc: 'Post' },
    { from: 'B. Cartwright',      subj: 'Re: revised scope',             ai: 'Logged as variation · $4,200',       tag: 'Project', acc: 'Send' },
    { from: 'Hartline Civil',     subj: 'Tender clarification',          ai: 'Drafted reply · awaiting tone check', tag: 'Quote', acc: 'Review' },
    { from: 'Stripe',             subj: 'Payout reconciled',             ai: 'Auto-posted to GL',                  tag: 'Finance', acc: '✓ Done' },
  ];
  return (
    <div>
      <PaneHead title="Inbox" count={rows.length} action={
        <span className="chip"><span className="dot"></span>5 drafted overnight</span>
      } />
      <div>
        {rows.map((r, i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '180px 1fr 280px 90px 96px',
            gap: 20,
            padding: '18px 28px',
            borderBottom: '0.5px solid var(--rule)',
            alignItems: 'center'
          }}>
            <div className="small">{r.from}</div>
            <div style={{ fontSize: 14, color: 'var(--ink-2)' }}>{r.subj}</div>
            <div className="small" style={{ color: 'var(--ink-2)', display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }}></span>
              {r.ai}
            </div>
            <span className="mono tiny muted">{r.tag}</span>
            <button className="btn secondary" style={{ padding: '8px 14px', fontSize: 12 }}>{r.acc}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuotesPane() {
  const rows = [
    { c: 'Northgate Holdings', v: '$48,200', m: '38%', s: 'Awaiting approval', t: 'Drafted 6 min ago' },
    { c: 'Foundry Build',      v: '$112,400', m: '34%', s: 'Sent',              t: 'Yesterday' },
    { c: 'Penrose & Sons',     v: '$22,800',  m: '41%', s: 'Won',               t: '3 days ago', won: true },
  ];
  return (
    <div>
      <PaneHead title="Quotes" count={rows.length} action={<button className="btn secondary" style={{padding:'8px 14px',fontSize:12}}>+ New</button>} />
      <div>
        {rows.map((r, i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '1fr 120px 80px 1fr 160px',
            gap: 20, padding: '20px 28px',
            borderBottom: '0.5px solid var(--rule)',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: 15 }}>{r.c}</div>
            <div className="display" style={{ fontSize: 22 }}>{r.v}</div>
            <div className="mono small" style={{ color: 'var(--ink-2)' }}>{r.m}</div>
            <div className="small" style={{
              color: r.won ? 'var(--accent)' : 'var(--ink-2)',
              fontWeight: r.won ? 500 : 400
            }}>{r.s}</div>
            <div className="mono tiny muted">{r.t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ERPPane() {
  const items = [
    { sku: 'CEM-42.5N', name: 'Cement 42.5N · 25kg',     v: '$8.40',  d: '+2.1%', oos: false },
    { sku: 'RBR-12-6m', name: 'Rebar Y12 · 6m',          v: '$11.20', d: '-0.4%', oos: false },
    { sku: 'AGG-20mm',  name: 'Aggregate 20mm · m³', v: '$48.00', d: '+0.0%', oos: false },
    { sku: 'TIM-90X45', name: 'Pine 90x45 H3 · m',       v: '$6.75',  d: '+5.8%', oos: true  },
  ];
  return (
    <div>
      <PaneHead title="Inventory · live prices" count={items.length} action={
        <span className="chip"><span className="dot"></span>Last sync 2m ago</span>
      } />
      <div>
        {items.map((it, i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '140px 1fr 100px 100px 120px',
            gap: 20, padding: '18px 28px',
            borderBottom: '0.5px solid var(--rule)',
            alignItems: 'center'
          }}>
            <div className="mono small muted">{it.sku}</div>
            <div className="small">{it.name}</div>
            <div className="display" style={{ fontSize: 22 }}>{it.v}</div>
            <div className="mono small" style={{ color: it.d.startsWith('+') && it.d !== '+0.0%' ? 'var(--warn)' : it.d.startsWith('-') ? 'var(--ok)' : 'var(--muted)' }}>{it.d}</div>
            <span className="mono tiny" style={{ color: it.oos ? 'var(--warn)' : 'var(--ok)' }}>
              {it.oos ? '● Out of stock' : '● In stock'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FinancePane() {
  return (
    <div>
      <PaneHead title="Finance · 13-week forecast" action={<span className="chip"><span className="dot"></span>Rebuilt 6:02am</span>} />
      <div style={{ padding: '28px 28px 36px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          {[
            { k: 'Cash on hand',  v: '$214k' },
            { k: 'AR outstanding', v: '$96k' },
            { k: 'AR at risk',    v: '$12k' },
            { k: 'Forecast 13w',  v: '$382k' },
          ].map(s => (
            <div key={s.k} style={{ padding: 18, background: 'var(--bg-2)', borderRadius: 10, border: '0.5px solid var(--rule)' }}>
              <div className="mono tiny muted" style={{ letterSpacing: '.1em' }}>{s.k}</div>
              <div className="display" style={{ fontSize: 30, marginTop: 6 }}>{s.v}</div>
            </div>
          ))}
        </div>
        <ForecastChart />
      </div>
    </div>
  );
}

function ForecastChart() {
  const weeks = [180, 195, 210, 220, 205, 230, 250, 265, 280, 305, 330, 360, 382];
  const max = 400;
  return (
    <div>
      <div className="mono tiny muted" style={{ letterSpacing: '.1em', marginBottom: 12 }}>CASH POSITION · 13 WEEKS</div>
      <svg viewBox="0 0 600 180" style={{ width: '100%', height: 200 }}>
        <defs>
          <linearGradient id="fg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25"/>
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
          </linearGradient>
        </defs>
        {[0, 100, 200, 300, 400].map((g, i) => (
          <line key={i} x1="0" x2="600" y1={180 - (g/max)*160} y2={180 - (g/max)*160} stroke="var(--rule)" strokeDasharray="2 4"/>
        ))}
        <path
          d={`M 0 ${180 - (weeks[0]/max)*160} ` +
             weeks.map((w, i) => `L ${(i/(weeks.length-1))*600} ${180 - (w/max)*160}`).join(' ')}
          fill="none" stroke="var(--accent)" strokeWidth="2"/>
        <path
          d={`M 0 ${180 - (weeks[0]/max)*160} ` +
             weeks.map((w, i) => `L ${(i/(weeks.length-1))*600} ${180 - (w/max)*160}`).join(' ') +
             ` L 600 180 L 0 180 Z`}
          fill="url(#fg)"/>
        {weeks.map((w, i) => (
          <circle key={i} cx={(i/(weeks.length-1))*600} cy={180 - (w/max)*160} r="3" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5"/>
        ))}
      </svg>
    </div>
  );
}

function CRMPane() {
  const stages = [
    { name: 'New',         n: 14, v: '$184k' },
    { name: 'Qualified',   n: 8,  v: '$220k' },
    { name: 'Proposal',    n: 5,  v: '$312k' },
    { name: 'Negotiation', n: 3,  v: '$148k' },
    { name: 'Won',         n: 2,  v: '$84k'  },
  ];
  return (
    <div>
      <PaneHead title="Pipeline" action={<span className="chip"><span className="dot"></span>Auto-stage on</span>} />
      <div style={{ padding: '28px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
        {stages.map((s, i) => (
          <div key={s.name} style={{
            padding: 18, borderRadius: 10,
            background: i === 4 ? 'var(--accent-soft)' : 'var(--bg-2)',
            border: '0.5px solid var(--rule)'
          }}>
            <div className="mono tiny muted" style={{ letterSpacing: '.08em' }}>{s.name.toUpperCase()}</div>
            <div className="display" style={{ fontSize: 30, marginTop: 8 }}>{s.n}</div>
            <div className="small muted" style={{ marginTop: 4 }}>{s.v}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '0 28px 28px' }}>
        {[
          { c: 'Northgate Holdings',  s: 'Proposal',    n: 'Quote sent · awaiting' },
          { c: 'Hartline Civil',      s: 'Qualified',   n: 'Discovery booked Thu 2pm' },
          { c: 'Cobalt Health',       s: 'Negotiation', n: 'Counter offered $98k' },
        ].map((r, i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '1fr 120px 1fr 80px',
            padding: '14px 0',
            borderBottom: '0.5px solid var(--rule)',
            alignItems: 'center',
            gap: 16
          }}>
            <div className="small">{r.c}</div>
            <div className="mono tiny muted">{r.s}</div>
            <div className="small muted">{r.n}</div>
            <div className="mono tiny accent">auto</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { BeforeAfter, LivePreview });
