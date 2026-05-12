// sections-automate.jsx — What we automate (use case grid) + How it works

const USE_CASES = [
  {
    id: 'erp',
    n: '01',
    name: 'ERP & Inventory',
    sub: 'Supplier prices, stock, costing',
    body: 'A live inventory + supplier-price OS. Reads vendor PDFs, reconciles SKUs, flags margin erosion, and rebuilds your cost basis without an analyst.',
    tags: ['Pricing', 'BOM', 'COGS', 'Vendors']
  },
  {
    id: 'quotes',
    n: '02',
    name: 'Quotes & Estimates',
    sub: 'RFQ in, signed quote out',
    body: 'Reads the inbound brief, pulls the right items at the right margin, drafts the proposal in your voice, and chases approvals.',
    tags: ['RFQ', 'Proposal', 'Margin', 'E-sign']
  },
  {
    id: 'crm',
    n: '03',
    name: 'CRM & Pipeline',
    sub: 'Leads enriched, stages moved',
    body: 'Every email, call, and form becomes a clean record. Stages move themselves. You stop being your own SDR.',
    tags: ['Enrichment', 'Stages', 'Cadence']
  },
  {
    id: 'finance',
    n: '04',
    name: 'Accounting & Finance',
    sub: 'AR, AP, GL, cash forecast',
    body: 'Sits between Xero / QuickBooks and your bank. Reconciles, codes, chases AR, and rebuilds the 13-week forecast every morning.',
    tags: ['Xero', 'AR', 'Forecast']
  },
  {
    id: 'pm',
    n: '05',
    name: 'Project Management',
    sub: 'Plans, RFIs, daily logs',
    body: 'Turns scope into a schedule, schedule into daily ops. Auto-drafts RFIs, status reports and variation requests from job-site data.',
    tags: ['Gantt', 'RFI', 'Daily log']
  },
  {
    id: 'hr',
    n: '06',
    name: 'HR & People Ops',
    sub: 'Hiring, onboarding, payroll prep',
    body: 'Job-spec to signed offer, with the right policies, the right paperwork, and the right reminders, without a People person on payroll yet.',
    tags: ['ATS', 'Onboarding', 'Policy']
  },
  {
    id: 'leads',
    n: '07',
    name: 'Lead Generation',
    sub: 'Sourced, scored, sequenced',
    body: 'Identifies your ICP across the open web, enriches contacts, and runs warm outbound that sounds like a human you actually employ.',
    tags: ['ICP', 'Outbound', 'Scoring']
  },
  {
    id: 'custom',
    n: '08',
    name: 'Your workflow',
    sub: 'The one we haven’t met yet',
    body: 'We build the bespoke autopilot for whatever’s eating your week. Show us the spreadsheet, the inbox, or the meeting it replaces.',
    tags: ['Bespoke']
  }
];

function AutomateGrid() {
  const [active, setActive] = useState(0);
  const c = USE_CASES[active];
  return (
    <section className="section" id="automate">
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          alignItems: 'start',
          marginBottom: 60
        }}>
          <div>
            <Reveal>
              <div className="eyebrow" style={{ marginBottom: 20 }}>02 / What we automate</div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display h2" style={{ margin: 0 }}>
                Eight systems.<br/>
                One <span className="italic" style={{ color: 'var(--accent)' }}>operating layer.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <p className="lede" style={{ marginTop: 12 }}>
              You don’t need eight different SaaS tools and an ops hire to glue them
              together. BrilliantOS is one operator, custom-built around the workflows
              you already run.
            </p>
          </Reveal>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderTop: '0.5px solid var(--rule)',
          borderLeft: '0.5px solid var(--rule)',
        }}>
          {USE_CASES.map((u, i) => (
            <button
              key={u.id}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className="uc-cell"
              data-active={active === i}
              style={{
                background: active === i ? 'var(--bg-2)' : 'transparent',
                border: 0,
                borderRight: '0.5px solid var(--rule)',
                borderBottom: '0.5px solid var(--rule)',
                padding: '28px 24px 32px',
                textAlign: 'left',
                color: 'inherit',
                position: 'relative',
                minHeight: 200,
                transition: 'background .2s ease',
              }}
            >
              <div className="mono tiny muted" style={{ letterSpacing: '.1em' }}>{u.n}</div>
              <div className="display" style={{ fontSize: 28, marginTop: 18, letterSpacing: '-0.02em' }}>{u.name}</div>
              <div className="small muted" style={{ marginTop: 6 }}>{u.sub}</div>
              {active === i && (
                <div style={{
                  position: 'absolute',
                  left: 0, top: 0, width: 2, height: '100%',
                  background: 'var(--accent)'
                }}></div>
              )}
            </button>
          ))}
        </div>

        <div style={{
          marginTop: 40,
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 60,
          alignItems: 'start'
        }}>
          <div>
            <div className="mono tiny muted" style={{ letterSpacing: '.1em' }}>{c.n} · DETAIL</div>
            <h3 className="display" style={{ fontSize: 44, margin: '14px 0 18px' }}>{c.name}</h3>
            <p style={{ fontSize: 18, lineHeight: 1.5, color: 'var(--ink-2)', maxWidth: '52ch' }}>{c.body}</p>
            <div style={{ marginTop: 24, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {c.tags.map(t => <span key={t} className="chip"><span className="dot"></span>{t}</span>)}
            </div>
            <a href="use-cases.html" className="small" style={{ marginTop: 28, display: 'inline-block', color: 'var(--accent)' }}>
              See full workflow →
            </a>
          </div>
          <UseCaseDiagram id={c.id} />
        </div>
      </div>
    </section>
  );
}

/* Small diagrammatic illustration per use case */
function UseCaseDiagram({ id }) {
  const flows = {
    erp:     ['Vendor PDF', 'Parser', 'Cost basis', 'Margin alert'],
    quotes:  ['Inbound RFQ', 'Drafted quote', 'Approval', 'Signed'],
    crm:     ['Lead event', 'Enriched', 'Stage moved', 'Cadence sent'],
    finance: ['Bank feed', 'Coded', 'AR chase', 'Forecast'],
    pm:      ['Scope', 'Schedule', 'Daily log', 'RFI / variation'],
    hr:      ['Job spec', 'Posted', 'Screened', 'Onboarded'],
    leads:   ['ICP signal', 'Enriched', 'Scored', 'Sequenced'],
    custom:  ['Your trigger', 'Your data', 'Your rules', 'Your KPI'],
  };
  const steps = flows[id] || flows.erp;
  return (
    <div className="card" style={{ padding: 24, background: 'var(--bg-2)' }}>
      <div className="mono tiny muted" style={{ letterSpacing: '.1em', marginBottom: 18 }}>FLOW</div>
      <div style={{ display: 'grid', gap: 12 }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '24px 1fr auto',
            alignItems: 'center',
            gap: 14,
            padding: '14px 16px',
            background: 'var(--bg)',
            border: '0.5px solid var(--rule)',
            borderRadius: 10
          }}>
            <span className="mono tiny muted">{String(i+1).padStart(2,'0')}</span>
            <span style={{ fontSize: 15 }}>{s}</span>
            <span className="mono tiny" style={{ color: i === steps.length-1 ? 'var(--accent)' : 'var(--faint)' }}>
              {i === steps.length-1 ? '● done' : '○ auto'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* How it works */
function HowItWorks() {
  const phases = [
    {
      n: 'I',
      title: 'Map',
      span: '1–2 weeks',
      body: 'We sit with you and your team for a week. Map every workflow, every tool, every “wait, that’s a person doing that?” moment.',
      bullets: ['Workflow audit', 'Tool inventory', 'Bottleneck graph']
    },
    {
      n: 'II',
      title: 'Build',
      span: '3–6 weeks',
      body: 'We build the operating layer — agents, integrations, dashboards — bespoke to your business. You stay in your day job.',
      bullets: ['Agents + tools', 'Integrations', 'Approval surface']
    },
    {
      n: 'III',
      title: 'Operate',
      span: 'Ongoing',
      body: 'We run it with you. Monthly tuning, quarterly expansion, an on-call engineer when reality changes. Not a hand-off, a partnership.',
      bullets: ['SLA + on-call', 'Monthly tuning', 'Quarterly expansion']
    },
  ];
  return (
    <section className="section" id="how">
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          alignItems: 'end',
          marginBottom: 72
        }}>
          <div>
            <Reveal><div className="eyebrow" style={{ marginBottom: 20 }}>03 / How it works</div></Reveal>
            <Reveal delay={80}>
              <h2 className="display h2" style={{ margin: 0 }}>
                Not a tool.<br/>
                A <span className="italic" style={{ color: 'var(--accent)' }}>partnership.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <p className="lede" style={{ marginBottom: 6 }}>
              We don’t sell you software and disappear. We embed for six weeks, ship
              your operating layer, then run it with you for as long as it earns its keep.
            </p>
          </Reveal>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 0,
          borderTop: '0.5px solid var(--rule)'
        }}>
          {phases.map((p, i) => (
            <Reveal key={p.n} delay={i * 100} className="phase-cell"
              style={{
                padding: '40px 32px 36px',
                borderRight: i < 2 ? '0.5px solid var(--rule)' : 'none',
                position: 'relative'
              }}>
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                marginBottom: 24
              }}>
                <span className="display italic" style={{ fontSize: 52, color: 'var(--accent)' }}>{p.n}</span>
                <span className="mono tiny muted">{p.span}</span>
              </div>
              <h3 className="display" style={{ fontSize: 36, margin: '0 0 14px' }}>{p.title}</h3>
              <p className="muted" style={{ maxWidth: '32ch' }}>{p.body}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '28px 0 0', display: 'grid', gap: 8 }} className="small">
                {p.bullets.map(b => (
                  <li key={b} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--ink)' }}></span>
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { AutomateGrid, HowItWorks, USE_CASES });
