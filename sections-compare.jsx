// sections-compare.jsx — Before/After workflow toggle + Live product preview

/* BEFORE / AFTER toggle on a real workflow (quote request) */
function BeforeAfter() {
  const [mode, setMode] = useState('after');
  return (
    <section className="section" style={{ background: 'var(--bg-2)' }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end',
          gap: 40, marginBottom: 56
        }}>
          <div>
            <Reveal><div className="eyebrow" style={{ marginBottom: 20 }}>04 / Before & after</div></Reveal>
            <Reveal delay={80}>
              <h2 className="display h2" style={{ margin: 0 }}>
                The same RFQ.<br/>
                <span className="italic" style={{ color: 'var(--accent)' }}>Two different days.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <div style={{
              display: 'inline-flex',
              padding: 4,
              borderRadius: 999,
              border: '0.5px solid var(--rule-2)',
              background: 'var(--bg)'
            }}>
              {['before', 'after'].map(m => (
                <button key={m} onClick={() => setMode(m)}
                  style={{
                    padding: '10px 22px',
                    borderRadius: 999,
                    border: 0,
                    background: mode === m ? 'var(--ink)' : 'transparent',
                    color: mode === m ? 'var(--bg)' : 'var(--ink-2)',
                    fontFamily: 'var(--mono)',
                    fontSize: 12,
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                  }}>
                  {m === 'before' ? 'Before BrilliantOS' : 'With BrilliantOS'}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
        }}>
          <Reveal>
            <Timeline mode={mode} />
          </Reveal>
          <Reveal delay={100}>
            <MetricsPanel mode={mode} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Timeline({ mode }) {
  const before = [
    { d: 'Mon 09:14', who: 'Inbox',        what: 'RFQ from Northgate lands. Owner is in a meeting.' },
    { d: 'Mon 16:40', who: 'Owner',        what: 'Forwards to ops lead with “can you look”.' },
    { d: 'Tue 11:02', who: 'Ops lead',     what: 'Pings supplier for current pricing on 14 SKUs.' },
    { d: 'Wed 09:30', who: 'Supplier',     what: 'Returns price sheet. 3 SKUs out of stock.' },
    { d: 'Wed 15:50', who: 'Ops lead',     what: 'Drafts quote in Excel. Margin checked manually.' },
    { d: 'Thu 10:20', who: 'Owner',        what: 'Reviews, fixes line items, signs off.' },
    { d: 'Thu 14:00', who: 'Sales',        what: 'Quote sent.' },
    { d: '—',     who: 'Pipeline',    what: 'CRM still says “new lead”.', muted: true },
  ];
  const after = [
    { d: 'Mon 09:14', who: 'BrilliantOS',  what: 'Detects RFQ. Parses 14 SKUs + delivery window.' },
    { d: 'Mon 09:15', who: 'BrilliantOS',  what: 'Queries live supplier prices via ERP. Flags 3 OOS, swaps to alternates.' },
    { d: 'Mon 09:17', who: 'BrilliantOS',  what: 'Drafts quote at 38% margin in your voice.' },
    { d: 'Mon 09:18', who: 'Owner',        what: 'Single tap to approve from phone.' },
    { d: 'Mon 09:20', who: 'BrilliantOS',  what: 'Sends quote, files in CRM, moves stage → Proposal.' },
    { d: 'Mon 09:21', who: 'BrilliantOS',  what: 'Schedules a follow-up nudge for Thursday 10am.' },
    { d: 'Thu 10:00', who: 'BrilliantOS',  what: 'Sends warm follow-up. Reply received.' },
    { d: 'Thu 10:12', who: 'Outcome',      what: 'Quote accepted. $48,200 booked.', emph: true },
  ];
  const items = mode === 'before' ? before : after;
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{
        padding: '14px 20px', borderBottom: '0.5px solid var(--rule)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <span className="mono tiny" style={{ letterSpacing: '.12em', textTransform: 'uppercase' }}>
          {mode === 'before' ? 'Workflow · manual' : 'Workflow · autopilot'}
        </span>
        <span className="mono tiny muted">
          {mode === 'before' ? '3 days, 4 humans' : '6 minutes, 1 tap'}
        </span>
      </div>
      <div style={{ padding: '6px 0' }}>
        {items.map((it, i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '90px 110px 1fr',
            gap: 18,
            padding: '14px 20px',
            borderTop: i === 0 ? 'none' : '0.5px dashed var(--rule)',
            alignItems: 'baseline',
            opacity: it.muted ? .55 : 1
          }}>
            <span className="mono tiny" style={{ color: 'var(--muted)' }}>{it.d}</span>
            <span className="small" style={{
              color: it.who === 'BrilliantOS' ? 'var(--accent)' : 'var(--ink-2)',
              fontWeight: 500
            }}>{it.who}</span>
            <span className="small" style={{
              color: it.emph ? 'var(--ink)' : 'var(--ink-2)',
              fontWeight: it.emph ? 500 : 400
            }}>{it.what}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricsPanel({ mode }) {
  const data = mode === 'before'
    ? { time: '3 days', taps: 19, margin: '32%', cost: '$420', humanHrs: '4.2 hrs' }
    : { time: '6 min',  taps: 1,  margin: '38%', cost: '$3',   humanHrs: '0.1 hr'  };
  return (
    <div className="card" style={{ padding: 32, background: 'var(--bg)' }}>
      <div className="mono tiny muted" style={{ letterSpacing: '.1em' }}>SAME RFQ · DIFFERENT OUTCOME</div>
      <div style={{ marginTop: 28, display: 'grid', gap: 0 }}>
        <Metric label="Time to sent quote"   value={data.time}     mode={mode}/>
        <Metric label="Human touch-points"   value={data.taps}     mode={mode}/>
        <Metric label="Realised gross margin" value={data.margin}  mode={mode}/>
        <Metric label="Cost to produce quote" value={data.cost}    mode={mode}/>
        <Metric label="Founder + ops hours"  value={data.humanHrs} mode={mode}/>
      </div>
      <div style={{
        marginTop: 36, padding: 18,
        borderRadius: 12,
        background: mode === 'before' ? 'transparent' : 'var(--accent-soft)',
        border: '0.5px solid var(--rule)'
      }}>
        <div className="mono tiny muted" style={{ letterSpacing: '.1em' }}>NET</div>
        <div className="display" style={{
          fontSize: 30, marginTop: 6,
          color: mode === 'before' ? 'var(--ink-2)' : 'var(--accent-2)'
        }}>
          {mode === 'before'
            ? 'A quote that costs more to make than it makes.'
            : '720× faster. 140× cheaper. 6 points more margin.'}
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, mode }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      alignItems: 'baseline',
      padding: '16px 0',
      borderBottom: '0.5px solid var(--rule)',
      gap: 16
    }}>
      <span className="small muted">{label}</span>
      <span className="display" style={{
        fontSize: 28,
        color: mode === 'before' ? 'var(--ink)' : 'var(--accent)',
        fontVariantNumeric: 'tabular-nums'
      }}>{value}</span>
    </div>
  );
}

/* LIVE PRODUCT PREVIEW — mini interactive ERP/CRM widget */
function LivePreview() {
  const [tab, setTab] = useState('inbox');
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)');
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
