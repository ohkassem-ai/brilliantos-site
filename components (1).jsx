// components.jsx — shared primitives for BrilliantOS site

const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* In-view hook */
function useInView(opts = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const ob = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setSeen(true); });
    }, opts);
    ob.observe(ref.current);
    return () => ob.disconnect();
  }, [seen]);
  return [ref, seen];
}

/* Reveal wrapper */
function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const [ref, seen] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal ${seen ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* Brand mark + wordmark */
function Brand({ size = 22 }) {
  return (
    <a href="index.html" className="brand">
      <span className="brand-mark" style={{ width: size, height: size }}></span>
      <span>BrilliantOS</span>
    </a>
  );
}

/* Sticky top nav */
function Nav({ current = 'home' }) {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Brand />
        <nav className="nav-links" aria-label="primary">
          <a href="index.html#automate" data-active={current === 'home'}>Automate</a>
          <a href="use-cases.html" data-active={current === 'use-cases'}>Use cases</a>
          <a href="index.html#how">How it works</a>
          <a href="pricing.html" data-active={current === 'pricing'}>Pricing</a>
        </nav>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <a href="book.html" className="small muted" style={{ marginRight: 6 }}>Sign in</a>
          <a href="book.html" className="btn primary">
            Book a call <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </header>
  );
}

/* Footer */
function Footer() {
  return (
    <footer className="section tight" style={{ borderTop: '0.5px solid var(--rule)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
          gap: 40,
          alignItems: 'start'
        }}>
          <div>
            <Brand />
            <p className="muted small" style={{ marginTop: 16, maxWidth: 320 }}>
              Autopilot for your business. Bespoke AI operating systems for founders
              who want to grow without growing headcount.
            </p>
            <div style={{ marginTop: 20, display: 'flex', gap: 8 }}>
              <span className="chip"><span className="dot"></span> Accepting Q3 cohort</span>
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Product</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }} className="small">
              <li><a href="use-cases.html">Use cases</a></li>
              <li><a href="index.html#preview">Product preview</a></li>
              <li><a href="index.html#roi">ROI calculator</a></li>
              <li><a href="pricing.html">Pricing</a></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Company</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }} className="small">
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Get in touch</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }} className="small">
              <li><a href="book.html">Book a discovery call →</a></li>
              <li className="muted"><a href="mailto:omar@brilliantdevcorp.com">omar@brilliantdevcorp.com</a></li>
            </ul>
          </div>
        </div>
        <div style={{
          marginTop: 80,
          paddingTop: 24,
          borderTop: '0.5px solid var(--rule)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }} className="tiny mono muted">
          <span>© 2026 BrilliantOS — Built for founders who'd rather build.</span>
          <span>v2.6 · {new Date().toISOString().slice(0,10)}</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { useInView, Reveal, Brand, Nav, Footer });
