// sections-roi.jsx — ROI calculator + case studies + pricing + CTA

/* ROI calculator with sliders */
function ROICalculator() {
  const [rev, setRev] = useState(4);          // $M annual
  const [headcount, setHc] = useState(12);
  const [opsPct, setOps] = useState(35);      // % of team on ops work

  // Naive model
  const avgFully = 95000; // fully-loaded ops $
  const opsHeads = headcount * (opsPct / 100);
  const opsCost = opsHeads * avgFully;
  const opsRecovered = opsCost * 0.62; // BrilliantOS replaces ~62% of pure ops work
  const marginGain = rev * 1_000_000 * 0.04;  // 4 pts realised margin
  const speedGain = rev * 1_000_000 * 0.08;   // 8% pipeline conversion improvement
  const total = opsRecovered + marginGain + speedGain;
  const fee = Math.max(60000, Math.min(180000, total * 0.18));
  const net = total - fee;

  return (
    <section className="section" id="roi" style={{ background: 'var(--bg-2)' }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60,
          alignItems: 'end', marginBottom: 56
        }}>
          <div>
            <Reveal><div className="eyebrow" style={{ marginBottom: 20 }}>06 / Return on Autopilot</div></Reveal>
            <Reveal delay={80}>
              <h2 className="display h2" style={{ margin: 0 }}>
                Run the<br/>
                <span className="italic" style={{ color: 'var(--accent)' }}>math.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <p className="lede">
              Three sliders. Honest assumptions. Most clients see payback in 90 days
              and 4–7x annual return in year one. Tune it for your business.
            </p>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="card" style={{ padding: 0, overflow: 'hidden', background: 'var(--bg)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr' }}>
              {/* Inputs */}
              <div style={{ padding: 40, borderRight: '0.5px solid var(--rule)' }}>
                <div className="mono tiny muted" style={{ letterSpacing: '.12em' }}>YOUR BUSINESS</div>

                <ROISlider
                  label="Annual revenue"
                  value={rev}
                  min={0.2} max={50} step={0.1}
                  unit="$M"
                  display={rev < 1 ? `$${(rev*1000).toFixed(0)}k` : `$${rev.toFixed(1)}M`}
                  onChange={setRev}
                />
                <ROISlider
                  label="Total headcount"
                  value={headcount}
                  min={2} max={120} step={1}
                  display={`${headcount} people`}
                  onChange={setHc}
                />
                <ROISlider
                  label="% of team doing ops & admin"
                  value={opsPct}
                  min={5} max={80} step={1}
                  display={`${opsPct}%`}
                  onChange={setOps}
                />

                <div style={{
                  marginTop: 32, paddingTop: 24,
                  borderTop: '0.5px solid var(--rule)',
                  display: 'grid', gap: 10
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="small muted">Effective ops headcount</span>
                    <span className="mono small">{opsHeads.toFixed(1)} FTE</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="small muted">Fully-loaded ops spend</span>
                    <span className="mono small">${(opsCost/1000).toFixed(0)}k / yr</span>
                  </div>
                </div>
              </div>

              {/* Output */}
              <div style={{ padding: 40, background: 'var(--bg-2)' }}>
                <div className="mono tiny muted" style={{ letterSpacing: '.12em' }}>YEAR 1 IMPACT</div>

                <div style={{ marginTop: 24 }}>
                  <ROIRow label="Ops capacity recovered"    value={`+$${fmt(opsRecovered)}`}/>
                  <ROIRow label="Realised margin lift (+4pts)" value={`+$${fmt(marginGain)}`}/>
                  <ROIRow label="Pipeline conversion (+8%)"  value={`+$${fmt(speedGain)}`}/>
                  <ROIRow label="BrilliantOS investment"     value={`−$${fmt(fee)}`} neg/>
                </div>

                <div style={{
                  marginTop: 28,
                  padding: 28,
                  background: 'var(--bg)',
                  borderRadius: 14,
                  border: '0.5px solid var(--rule)'
                }}>
                  <div className="mono tiny muted" style={{ letterSpacing: '.1em' }}>NET YEAR 1</div>
                  <div className="display" style={{ fontSize: 56, marginTop: 6, color: 'var(--accent)' }}>
                    +${fmt(net)}
                  </div>
                  <div style={{
                    marginTop: 14, display: 'grid',
                    gridTemplateColumns: '1fr 1fr', gap: 16
                  }}>
                    <div>
                      <div className="mono tiny muted">PAYBACK</div>
                      <div className="display" style={{ fontSize: 24, marginTop: 2 }}>
                        ~{Math.max(1, Math.round((fee / total) * 12))} months
                      </div>
                    </div>
                    <div>
                      <div className="mono tiny muted">RETURN ON FEE</div>
                      <div className="display" style={{ fontSize: 24, marginTop: 2 }}>
                        {(total / fee).toFixed(1)}x
                      </div>
                    </div>
                  </div>
                </div>

                <p className="tiny muted" style={{ marginTop: 16 }}>
                  Estimates only. We’ll rebuild this against your actuals in week 1
                  of discovery, with sources.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FAItem({ k, v, sub }) {
  return (
    <div>
      <div className="mono tiny" style={{ letterSpacing: '.1em', color: 'oklch(0.65 0.012 75)' }}>{k.toUpperCase()}</div>
      <div className="display" style={{ fontSize: 32, color: 'var(--bg)', marginTop: 4, lineHeight: 1 }}>{v}</div>
      <div style={{ fontSize: 12, color: 'oklch(0.70 0.012 75)', marginTop: 4 }}>{sub}</div>
    </div>
  );
}

function fmt(n) {
  if (n >= 1_000_000) return `${(n/1_000_000).toFixed(2)}M`;
  if (n >= 1000) return `${(n/1000).toFixed(0)}k`;
  return n.toFixed(0);
}

function ROISlider({ label, value, min, max, step, display, onChange }) {
  return (
    <div style={{ marginTop: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <span className="small">{label}</span>
        <span className="display" style={{ fontSize: 22, color: 'var(--accent)' }}>{display}</span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: '100%',
          appearance: 'none',
          height: 4,
          background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${((value-min)/(max-min))*100}%, var(--rule) ${((value-min)/(max-min))*100}%, var(--rule) 100%)`,
          borderRadius: 999,
          outline: 'none'
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }} className="mono tiny muted">
        <span>{min}</span><span>{max}</span>
      </div>
    </div>
  );
}

function ROIRow({ label, value, neg }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between',
      padding: '14px 0', borderBottom: '0.5px solid var(--rule)'
    }}>
      <span className="small muted">{label}</span>
      <span className="display" style={{
        fontSize: 22,
        color: neg ? 'var(--ink-2)' : 'var(--ink)'
      }}>{value}</span>
    </div>
  );
}

/* WHY BRILLIANTOS — differentiation vs SaaS + AI agencies */
const PRINCIPLES = [
  {
    n: '01',
    h: 'Custom-built, not configured.',
    b: 'Most SaaS asks you to bend your process to its data model. Most AI tools are wrappers around the same generic playbook. We build agents around your workflow, your vocabulary, your edge cases — and rewrite them as you grow. The tool fits you, not the other way around.'
  },
  {
    n: '02',
    h: 'You work with the builders.',
    b: 'No account managers translating between you and a faceless team. The engineer who wrote your agent is the one who picks up when it misbehaves. You get a direct Slack channel into the people shipping your system — not a ticket queue.'
  },
  {
    n: '03',
    h: 'Fixed price. No seat tax.',
    b: 'Per-seat SaaS punishes you every time you hire. Enterprise tools charge you for the procurement theatre. We scope, we ship, we charge a flat fee — your team grows, your tools don\'t cost more. One bill, not ten.'
  },
  {
    n: '04',
    h: 'Paid on outcomes, not access.',
    b: 'We agree the three numbers that matter before week one — quote turnaround, AR days, founder hours back. Miss them by month three and we refund Build in full. You keep what we shipped. No other tool will sign that.'
  },
  {
    n: '05',
    h: 'AI-native, not retrofitted.',
    b: 'Most "AI" SaaS bolts a chatbot onto a 15-year-old database and raises its price. BrilliantOS was built agent-first: every screen, every record, every event is something an agent can read, write, and reason over. The AI isn\'t a feature — it is the product.'
  },
  {
    n: '06',
    h: 'One brain, not ten dashboards.',
    b: 'Stop paying for CRM + ERP + Quotes + PM + Accounting + chat — and stop watching your team copy-paste between them. One system reading from one shared model of your business, so the agents handling sales know what ops, finance, and project work are doing in real time.'
  },
  {
    n: '07',
    h: 'A live model of your business, updated daily.',
    b: 'BrilliantOS ingests every email, record, quote, invoice, and conversation across your business — and rebuilds its understanding of how you actually operate every night. The longer it runs, the sharper the agents get: prices, lead-times, customer quirks, the way your team really works. It is not a tool you configure once. It is a system that learns you.'
  },
];

function CaseStudies() {
  return (
    <section className="section" id="cases">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'end', marginBottom: 56 }}>
          <div>
            <Reveal><div className="eyebrow" style={{ marginBottom: 20 }}>07 / Why BrilliantOS</div></Reveal>
            <Reveal delay={80}>
              <h2 className="display h2" style={{ margin: 0 }}>
                Not another SaaS.<br/>
                <span className="italic" style={{ color: 'var(--accent)' }}>Not another agency.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <p className="lede">
              Seven things we do that the other ten tabs in your browser don't.
              We're built to be measured, replaceable, and aimed at your numbers —
              not your IT budget.
            </p>
          </Reveal>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
          border: '0.5px solid var(--rule)', borderRadius: 16, overflow: 'hidden',
          background: 'var(--bg-2)'
        }}>
          {PRINCIPLES.map((p, i) => {
            const isLast = i === PRINCIPLES.length - 1;
            return (
            <Reveal key={p.n} delay={i * 60} style={{
              padding: 40,
              gridColumn: isLast ? '1 / -1' : 'auto',
              background: isLast ? 'var(--ink)' : 'transparent',
              color: isLast ? 'var(--bg)' : 'inherit',
              borderRight: !isLast && i % 2 === 0 ? '0.5px solid var(--rule)' : 'none',
              borderBottom: !isLast ? '0.5px solid var(--rule)' : 'none',
            }}>
              <div className="mono tiny" style={{ letterSpacing: '.1em', color: isLast ? 'oklch(0.78 0.13 65)' : 'var(--accent)' }}>{p.n}</div>
              <h3 className="display" style={{ fontSize: isLast ? 36 : 28, margin: '14px 0 14px', maxWidth: isLast ? '36ch' : '20ch', lineHeight: 1.15 }}>{p.h}</h3>
              <p style={{ maxWidth: isLast ? '70ch' : '44ch', margin: 0, color: isLast ? 'oklch(0.82 0.012 75)' : 'var(--muted)' }}>{p.b}</p>
            </Reveal>
            );
          })}
        </div>

        <div style={{
          marginTop: 32, padding: '28px 32px',
          border: '0.5px solid var(--rule)', borderRadius: 14,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: 24, flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <span className="chip"><span className="dot"></span>Founding cohort open</span>
            <span className="small muted">3 of 5 seats remaining · cohort pricing locked for life · closes Q3 2026</span>
          </div>
          <a href="book.html?cohort=1" className="btn primary">Apply to the cohort <span className="arrow">→</span></a>
        </div>
      </div>
    </section>
  );
}

/* PRICING / engagement model */
function Pricing() {
  const tiers = [
    {
      n: 'I', name: 'Map',
      price: '$2.5k', cohort: 'Free', sub: 'fixed · 2 weeks',
      tagline: 'Workflow audit + bottleneck graph',
      what: [
        'Founder & ops interviews',
        'Tool + data audit',
        'Bottleneck graph + ROI model',
        'Recommended autopilot scope'
      ],
      cta: 'Start with Map',
      ghost: false,
    },
    {
      n: 'II', name: 'Build',
      price: 'from $35k', cohort: '$5k', sub: 'fixed · 4–6 weeks',
      tagline: 'Your first autopilot, shipped',
      what: [
        'Bespoke agents + integrations',
        'Approval surface (web + mobile)',
        'Migrated data + parallel run',
        'Team training + handover'
      ],
      cta: 'Plan a Build',
      ghost: false,
      featured: true,
    },
    {
      n: 'III', name: 'Operate',
      price: 'from $6k / mo', cohort: '$1k / mo', sub: 'ongoing',
      tagline: 'We run it with you',
      what: [
        'On-call engineer + SLA',
        'Monthly tuning + new agents',
        'Quarterly business review',
        'Unlimited workflow expansion*'
      ],
      cta: 'Talk about Operate',
      ghost: true,
    },
  ];

  return (
    <section className="section" id="pricing">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'end', marginBottom: 56 }}>
          <div>
            <Reveal><div className="eyebrow" style={{ marginBottom: 20 }}>08 / Engagement</div></Reveal>
            <Reveal delay={80}>
              <h2 className="display h2" style={{ margin: 0 }}>
                Three phases.<br/>
                <span className="italic" style={{ color: 'var(--accent)' }}>One commercial path.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <p className="lede">
              Fixed fees, no per-seat tax, no enterprise procurement theatre. You
              can stop at any phase — most clients move all the way through.
            </p>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div style={{
            marginBottom: 0,
            padding: '18px 24px',
            borderRadius: '16px 16px 0 0',
            background: 'var(--ink)',
            color: 'var(--bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            position: 'relative',
            overflow: 'hidden',
            borderBottom: '0.5px solid var(--ink)'
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, width: 3, height: '100%',
              background: 'oklch(0.85 0.13 65)'
            }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <span className="mono tiny" style={{ letterSpacing: '.14em', color: 'oklch(0.85 0.13 65)' }}>● FOUNDING COHORT · 2 OF 5 SEATS LEFT</span>
              <span style={{ fontSize: 14, color: 'oklch(0.85 0.012 75)' }}>
                Cohort pricing shown on each tier. Locked at these rates for life.
              </span>
            </div>
            <a href="book.html?cohort=1" className="btn" style={{
              background: 'oklch(0.85 0.13 65)', color: 'var(--ink)', fontWeight: 600, whiteSpace: 'nowrap', fontSize: 13, padding: '8px 16px'
            }}>
              Claim a seat <span className="arrow">→</span>
            </a>
          </div>
        </Reveal>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          border: '0.5px solid var(--rule)', borderRadius: '0 0 16px 16px', overflow: 'hidden',
          background: 'var(--bg)', borderTop: 'none'
        }}>
          {tiers.map((t, i) => (
            <div key={t.n} style={{
              padding: 36,
              borderRight: i < 2 ? '0.5px solid var(--rule)' : 'none',
              background: t.featured ? 'var(--bg-2)' : 'transparent',
              position: 'relative',
            }}>
              {t.featured && (
                <div style={{
                  position: 'absolute', top: 16, right: 16,
                  fontSize: 10, letterSpacing: '.12em',
                  fontFamily: 'var(--mono)', textTransform: 'uppercase',
                  color: 'var(--accent)'
                }}>● Most chosen</div>
              )}
              <div className="tier-roman mono" style={{ color: 'var(--accent)' }}>{t.n}</div>
              <h3 className="display" style={{ fontSize: 36, margin: '12px 0 4px' }}>{t.name}</h3>
              <p className="small muted" style={{ marginBottom: 28 }}>{t.tagline}</p>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6, flexWrap: 'wrap' }}>
                <span className="display" style={{ fontSize: 40, color: 'var(--accent)' }}>{t.cohort}</span>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: 18,
                  color: 'var(--muted)', textDecoration: 'line-through',
                  textDecorationColor: 'oklch(0.65 0.10 28)', textDecorationThickness: '1.5px'
                }}>{t.price}</span>
              </div>
              <div className="mono tiny" style={{
                letterSpacing: '.10em', textTransform: 'uppercase', color: 'var(--accent)',
                marginBottom: 6
              }}>● Founding cohort price</div>
              <div className="small muted" style={{ marginBottom: 28 }}>{t.sub}</div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 10 }} className="small">
                {t.what.map(w => (
                  <li key={w} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'var(--ink-2)' }}>
                    <span style={{
                      marginTop: 7,
                      width: 6, height: 6, borderRadius: '50%',
                      background: t.featured ? 'var(--accent)' : 'var(--ink)',
                      flexShrink: 0
                    }}></span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>

              <a href="book.html" className={`btn ${t.featured ? 'primary' : 'secondary'}`} style={{ width: '100%', justifyContent: 'center' }}>
                {t.cta} <span className="arrow">→</span>
              </a>
            </div>
          ))}
        </div>

        <p className="tiny muted" style={{ marginTop: 16, textAlign: 'center' }}>
          *Within agreed scope. Net new platforms quoted on entry.
        </p>
      </div>
    </section>
  );
}

/* FINAL CTA */
function FinalCTA() {
  return (
    <section className="section" id="cta" style={{ background: 'var(--ink)', color: 'var(--bg)', borderTop: 'none' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div className="eyebrow" style={{ marginBottom: 24, color: 'oklch(0.85 0.06 60)' }}>
          09 / Book a call
        </div>
        <Reveal>
          <h2 className="display" style={{
            fontSize: 'clamp(56px, 9vw, 144px)',
            margin: 0, lineHeight: .98,
            color: 'var(--bg)'
          }}>
            Win your<br/>
            <span className="italic" style={{ color: 'oklch(0.85 0.13 65)' }}>market.</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p style={{
            fontSize: 20, color: 'oklch(0.82 0.012 75)',
            maxWidth: '46ch', marginTop: 32
          }}>
            30-minute discovery. We’ll walk one of your real workflows together and
            tell you, honestly, whether autopilot fits. No deck.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div style={{ display: 'flex', gap: 14, marginTop: 40, flexWrap: 'wrap' }}>
            <a href="book.html" className="btn" style={{
              background: 'oklch(0.85 0.13 65)', color: 'var(--ink)',
              fontWeight: 600
            }}>
              Book a discovery call <span className="arrow">→</span>
            </a>
            <a href="use-cases.html" className="btn" style={{
              background: 'transparent', color: 'var(--bg)',
              border: '0.5px solid oklch(0.45 0.012 75)'
            }}>
              See all use cases
            </a>
          </div>
        </Reveal>
        <div style={{
          marginTop: 80, paddingTop: 32,
          borderTop: '0.5px solid oklch(0.30 0.012 75)',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40
        }} className="small">
          <div>
            <div className="mono tiny" style={{ color: 'oklch(0.65 0.012 75)', letterSpacing: '.1em' }}>WHAT YOU GET</div>
            <div style={{ marginTop: 10, color: 'oklch(0.86 0.012 75)' }}>
              A walked-through workflow, a written diagnosis, and a fit verdict.
            </div>
          </div>
          <div>
            <div className="mono tiny" style={{ color: 'oklch(0.65 0.012 75)', letterSpacing: '.1em' }}>HOW LONG</div>
            <div style={{ marginTop: 10, color: 'oklch(0.86 0.012 75)' }}>30 minutes. One founder + us. No sales engineer.</div>
          </div>
          <div>
            <div className="mono tiny" style={{ color: 'oklch(0.65 0.012 75)', letterSpacing: '.1em' }}>COST</div>
            <div style={{ marginTop: 10, color: 'oklch(0.86 0.012 75)' }}>Free. We only sell if it earns 4x in year one.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ROICalculator, CaseStudies, Pricing, FinalCTA });
