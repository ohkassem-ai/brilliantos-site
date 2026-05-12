// sections-hero.jsx — Hero + animated terminal + client marquee

const { useState: useStateH, useEffect: useEffectH, useRef: useRefH } = React;

/* Animated terminal that types out an autopilot run */
function AutopilotTerminal() {
  const lines = [
  { t: 'cmd', text: 'brilliantos run --pipeline=quotes-to-cash' },
  { t: 'sys', text: 'Reading inbox · 14 new threads' },
  { t: 'sys', text: 'Classifying intent · 9 RFQs · 3 invoices · 2 status' },
  { t: 'ok', text: '✓ Drafted quote for Northgate Holdings — $48,200' },
  { t: 'ok', text: '✓ Updated CRM stage: Acme Co. → Negotiation' },
  { t: 'ok', text: '✓ Reconciled 6 invoices to GL (Xero)' },
  { t: 'sys', text: 'Building weekly cash-flow forecast…' },
  { t: 'json', text: `{ "pipeline": 312400, "won_mtd": 84500, "ar_at_risk": 12100 }` },
  { t: 'ok', text: '✓ Posted Slack digest to #ops' },
  { t: 'cmd', text: 'autopilot · idle · listening' }];


  const [out, setOut] = useStateH([]);
  const [typing, setTyping] = useStateH('');
  useEffectH(() => {
    let cancel = false;
    let i = 0,j = 0;
    function tick() {
      if (cancel) return;
      if (i >= lines.length) {
        setTimeout(() => {setOut([]);setTyping('');i = 0;j = 0;tick();}, 3200);
        return;
      }
      const line = lines[i];
      if (j < line.text.length) {
        j++;
        setTyping(line.text.slice(0, j));
        const speed = line.t === 'cmd' ? 22 : line.t === 'ok' ? 8 : 6;
        setTimeout(tick, speed + Math.random() * 12);
      } else {
        setOut((prev) => [...prev, line]);
        setTyping('');
        i++;j = 0;
        setTimeout(tick, line.t === 'cmd' ? 520 : 280);
      }
    }
    tick();
    return () => {cancel = true;};
  }, []);

  function render(line, key, withCursor) {
    const T = line.text;
    if (line.t === 'cmd') {
      return (
        <div key={key}>
          <span className="prompt">brilliant</span> <span className="dim">~</span> <span>$</span> {T}
          {withCursor && <span className="cursor"></span>}
        </div>);

    }
    if (line.t === 'ok') return <div key={key}><span className="ok">{T}</span>{withCursor && <span className="cursor"></span>}</div>;
    if (line.t === 'json') {
      // colorize JSON
      const colored = T.replace(/"([^"]+)":/g, '<span class="key">"$1"</span>:').
      replace(/: ?(\d+)/g, ': <span class="str">$1</span>');
      return <div key={key} dangerouslySetInnerHTML={{ __html: colored + (withCursor ? '<span class="cursor"></span>' : '') }} />;
    }
    return <div key={key} className="dim">{T}{withCursor && <span className="cursor"></span>}</div>;
  }

  const live = typing ? { t: out.length < lines.length ? lines[out.length].t : 'sys', text: typing } : null;

  return (
    <div className="terminal">
      <div className="terminal-head">
        <span className="dot r"></span>
        <span className="dot y"></span>
        <span className="dot g"></span>
        <span className="dim" style={{ marginLeft: 10, fontSize: 11 }}>brilliantos · autopilot.log</span>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center' }} className="dim">
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'oklch(0.72 0.11 150)' }}></span>
          <span style={{ fontSize: 11 }}>live</span>
        </span>
      </div>
      <div className="terminal-body">
        {out.map((l, i) => render(l, i, false))}
        {live && render(live, 'live', true)}
        {!live && out.length === lines.length &&
        <div><span className="prompt">brilliant</span> <span className="dim">~</span> <span>$</span> <span className="cursor"></span></div>
        }
      </div>
    </div>);

}

function Hero() {
  return (
    <section className="section no-rule" style={{ position: 'relative', paddingTop: 80, paddingBottom: 80, overflow: 'hidden' }}>
      <div className="grid-lines"></div>
      <div className="container" style={{ position: 'relative' }}>
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 28 }}>BrilliantOS · v2.6 · Q3 2026 cohort</div>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="display h1" style={{ margin: '0 0 32px' }}>
            Autopilot<br />
            for your <span className="italic" style={{ color: 'var(--accent)' }}>business</span>.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="lede" style={{ maxWidth: '52ch' }}>
            We design and operate the AI systems that run the rest of your company —
            quotes, CRM, finance, project ops, HR — so your team can focus on what you
            actually sell. <span className="italic" style={{ color: 'var(--ink)' }}>Win more. Deliver for less.</span>
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div style={{ display: 'flex', gap: 12, marginTop: 40, flexWrap: 'wrap' }}>
            <a href="book.html" className="btn primary">Book a discovery call <span className="arrow">→</span></a>
            <a href="#preview" className="btn secondary">See it run</a>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div style={{
            marginTop: 80,
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: 48,
            alignItems: 'center'
          }}>
            <AutopilotTerminal />
            <div>
              <div className="eyebrow" style={{ marginBottom: 18 }}>01 / Under the hood</div>
              <h3 className="display h3" style={{ margin: '0 0 16px', maxWidth: '18ch' }}>
                A swarm of agents. <span className="italic" style={{ color: 'var(--accent)' }}>One shared brain.</span>
              </h3>
              <p className="muted" style={{ maxWidth: '40ch' }}>Specialised agents for sales, ops, finance, and project work — all reading from the same live model of your business. They ingest every email, record, and update so they understand how your company actually runs, then close the loops an ops hire would, only faster and at 3am.





              </p>
              <div style={{ marginTop: 28, display: 'grid', gap: 14, fontSize: 14 }}>
                <Stat k="Tools connected" v="14" sub="email · CRM · QuickBooks · Xero · Slack" />
                <Stat k="Time recovered" v="22 hrs/wk" sub="across founder + ops lead" />
                <Stat k="Cost saved" v="$14k / mo" sub="ops + tooling combined" />
                <Stat k="Quote → sent" v="6 min" sub="down from 6 days" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>);

}

function Stat({ k, v, sub }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      alignItems: 'baseline',
      gap: 16,
      paddingBottom: 12,
      borderBottom: '0.5px solid var(--rule)'
    }}>
      <div>
        <div className="mono tiny" style={{ color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{k}</div>
        <div className="small muted" style={{ marginTop: 4 }}>{sub}</div>
      </div>
      <div className="display" style={{ fontSize: 30, color: 'var(--ink)' }}>{v}</div>
    </div>);

}

function ClientMarquee() {
  const labels = [
  'Northgate Holdings', 'Acme Joinery', 'Sherwood Logistics',
  'Hartline Civil', 'Mosaic Studios', 'Granite Bay Co.',
  'Penrose & Sons', 'Cobalt Health', 'Foundry Build',
  'Truelane Consulting'];

  const row = [...labels, ...labels];
  return (
    <section className="section tight" style={{ padding: '40px 0' }}>
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 20, justifyContent: 'center', display: 'flex' }}>
          Running autopilot at
        </div>
        <div className="marquee">
          <div className="marquee-track">
            {row.map((l, i) =>
            <span key={i} className="display" style={{ fontSize: 28, color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                {l}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>);

}

Object.assign(window, { Hero, ClientMarquee, AutopilotTerminal });