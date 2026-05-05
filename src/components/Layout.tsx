import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { DEMO_URL, DOCS_URL, FULLSCREEN_URL } from "../constants";
import logoPng from "../../silvershop-logo.png";
import { DocumentHead } from "./DocumentHead";
import { useGoogleAnalyticsPageviews } from "../hooks/useGoogleAnalyticsPageviews";
import { useRevealOnView } from "../hooks/useRevealOnView";

function useMobileNav() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  return { open, toggle, close };
}

export function Layout() {
  const location = useLocation();
  const { open, toggle, close } = useMobileNav();
  const overlayId = useId();
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useRevealOnView(!reduceMotion.current, location.pathname + location.hash);
  useGoogleAnalyticsPageviews();

  useEffect(() => {
    close();
  }, [location.pathname, close]);

  const onOverlayPointerDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <>
      <DocumentHead />
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="container site-header__inner">
          <Link className="site-logo" to="/">
            <img
              className="site-logo__mark"
              src={logoPng}
              alt=""
              width={32}
              height={32}
              decoding="async"
            />
            <span className="site-logo__wordmark">SilverShop</span>
          </Link>
          <nav className="site-nav--desktop" aria-label="Primary">
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/features">Features</NavLink>
            <NavLink to="/support">Support</NavLink>
            <a href={DOCS_URL} className="site-nav__link--external">
              Documentation
              <i className="icon-link-square site-nav__external-icon" aria-hidden="true"></i>
            </a>
            <div className="site-nav__cta-group">
              <a href={DEMO_URL} className="btn btn--header-secondary">
                <i className="icon-monitor icon-before" aria-hidden="true"></i>
                Demo
              </a>
              <NavLink to="/download" className="btn btn--header-download">
                <i className="icon-document-download icon-before" aria-hidden="true"></i>
                Download
              </NavLink>
            </div>
          </nav>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls={overlayId}
            onClick={toggle}
          >
            Menu
            <span className="nav-toggle__bars" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </header>

      <main id="main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container">
          <ul className="footer-nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/features">Features</Link>
            </li>
            <li>
              <a href={DEMO_URL}>Demo</a>
            </li>
            <li>
              <Link to="/support">Support</Link>
            </li>
            <li>
              <a href={DOCS_URL}>Documentation</a>
            </li>
            <li>
              <Link to="/download">Download</Link>
            </li>
          </ul>
          <p className="site-footer__legal">
            © SilverShop {new Date().getFullYear()}. SilverShop is built by a team of{" "}
            <a href="https://github.com/silvershop/silvershop-core/graphs/contributors">volunteers</a>. Premium support
            is available via <a href={FULLSCREEN_URL}>Fullscreen</a>.
          </p>
        </div>
      </footer>

      <div
        id={overlayId}
        className={`nav-overlay${open ? " is-open" : ""}`}
        aria-hidden={!open}
        onMouseDown={onOverlayPointerDown}
      >
        <nav aria-label="Mobile">
          <ul>
            <li>
              <NavLink to="/features" onClick={close}>
                <i className="icon-shopping-cart icon-before" aria-hidden="true"></i> Features
              </NavLink>
            </li>
            <li>
              <NavLink to="/support" onClick={close}>
                <i className="icon-heart icon-before" aria-hidden="true"></i> Support
              </NavLink>
            </li>
            <li>
              <a href={DEMO_URL} onClick={close}>
                <i className="icon-monitor icon-before" aria-hidden="true"></i> Demo
              </a>
            </li>
            <li>
              <a href={DOCS_URL} onClick={close}>
                <i className="icon-document-text icon-before" aria-hidden="true"></i>
                Documentation
                <i className="icon-link-square site-nav__external-icon" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <NavLink to="/download" onClick={close}>
                <i className="icon-document-download icon-before" aria-hidden="true"></i> Download
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
