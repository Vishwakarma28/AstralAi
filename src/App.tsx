import { FormEvent, useEffect, useRef, useState } from "react"

const ASSET = ""
const VIDEO_ASSET = "https://sceneh.ai"

type Film = {
  title: string
  category: string
  poster: string
  video: string
}

const films: Film[] = [
  {
    title: "Goat Grenade",
    category: "Product launch",
    poster: "goat_shot",
    video: "goat_shot",
  },
  {
    title: "Khudse",
    category: "Brand story",
    poster: "khudse",
    video: "khudse",
  },
  {
    title: "Street Seller",
    category: "Small business ad",
    poster: "street_seller",
    video: "street_seller",
  },
  {
    title: "Psychology II",
    category: "Animated explainer",
    poster: "pyschology_2",
    video: "pyschology_2",
  },
  {
    title: "The Duel",
    category: "Animation",
    poster: "animated",
    video: "animated",
  },
  {
    title: "Delulu",
    category: "Brand film",
    poster: "delulu_2",
    video: "delulu_2",
  },
  {
    title: "Ghost Film",
    category: "Short film",
    poster: "ghost_film",
    video: "ghost_film",
  },
  {
    title: "Bed to Bath",
    category: "Product film",
    poster: "bed2bath",
    video: "bed2bath",
  },
  {
    title: "Gelithium 2500",
    category: "Product showcase",
    poster: "inverter_closeup",
    video: "inverter_closeup",
  },
]

const heroFilms = [
  { title: "Product film", name: "Goat Grenade", video: "goat_shot" },
  { title: "Brand story", name: "Khudse", video: "khudse" },
  { title: "Campaign", name: "No Electricity", video: "no_electricity" },
  { title: "Short film", name: "Ghost Film", video: "ghost_film" },
  { title: "Explainer", name: "Psychology I", video: "pyschology_1" },
]

const formats = [
  "Brand ads",
  "Product films",
  "UGC content",
  "Explainers",
  "Trend reels",
  "Cinematic teasers",
  "Founder stories",
  "Social cutdowns",
]

const faqs = [
  {
    q: "What is Astral ai?",
    a: "Astral ai is an AI marketing video officer. You give it one brief and it handles the research, strategy, script, storyboard, voice, edit and QC, then hands you a finished film you can keep directing by chat.",
  },
  {
    q: "Who is it for?",
    a: "Brands, agencies, creators, marketers and studios who need more high-quality video than their team or budget can produce the traditional way.",
  },
  {
    q: "Do I keep creative control?",
    a: "Always. You approve the storyboard before anything renders, and every shot, line, voice and music cue stays editable, even after export.",
  },
  {
    q: "Which languages and formats are supported?",
    a: "Multilingual and regional language support for voiceover and captions, with cuts for every major platform ratio, from 9:16 Reels and Shorts to 16:9 YouTube.",
  },
  {
    q: "When can I get access?",
    a: "Astral ai is in private beta. Join the waitlist and we will reach out as new seats open. Founding teams get lifetime pricing.",
  },
]

function Arrow({ up = false }: { up?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d={up ? "M5 10 10 5l5 5M10 5v10" : "M4 10h12m-4-4 4 4-4 4"} />
    </svg>
  )
}

function Logo() {
  return (
    <a className="brand" href="#top" aria-label="Astral ai home">
      <img src={`${ASSET}/brand/mark.webp`} alt="" />
      {/* <img
        className="brand-word"
        src={`${ASSET}/brand/wordmark.webp`}
        alt="Astral ai"
      /> */}
      <img
        className="brand-word"
        src={`${ASSET}/brand/astral-ai-logo.png`}
        alt="Astral ai"
      />
      
    </a>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>
}

function JoinButton({ label = "Join waitlist" }: { label?: string }) {
  return (
    <a href="#access" className="btn btn-primary">
      <span>{label}</span>
      <Arrow />
    </a>
  )
}

function App() {
  const [intro, setIntro] = useState(true)
  const [menu, setMenu] = useState(false)
  const [hero, setHero] = useState(0)
  const [videoReady, setVideoReady] = useState(false)
  const [showcaseMode, setShowcaseMode] = useState<"grid" | "carousel">("grid")
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setIntro(false), 1700)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (intro || !window.location.hash) return
    const target = document.querySelector(window.location.hash)
    window.requestAnimationFrame(() => {
      const root = document.documentElement
      root.style.scrollBehavior = "auto"
      target?.scrollIntoView()
      root.style.removeProperty("scroll-behavior")
    })
  }, [intro])

  useEffect(() => {
    const timer = window.setInterval(
      () => setHero((value) => (value + 1) % heroFilms.length),
      6500,
    )
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    setVideoReady(false)
    videoRef.current?.play().catch(() => undefined)
  }, [hero])

  useEffect(() => {
    document.body.style.overflow = menu || selectedFilm ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menu, selectedFilm])

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div id="top">
      <div className={`intro ${intro ? "" : "intro-out"}`} aria-hidden={!intro}>
        <img src={`${ASSET}/brand/mark-lg.webp`} alt="" />
        <img
          className="intro-word"
          src={`${ASSET}/brand/astral-ai-logo.png`}
          alt="Astral ai"
        />
        <span />
        <p>AI video production</p>
        <button type="button" onClick={() => setIntro(false)}>
          Skip
        </button>
      </div>

      <header className="nav">
        <div className="nav-inner">
          <Logo />
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#how-it-works">How it works</a>
            <a href="#features">Features</a>
            <a href="#showcase">Showcase</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="nav-actions">
            <JoinButton />
            <button
              className="menu-button"
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
        <div className={`mobile-menu ${menu ? "open" : ""}`}>
          <nav>
            {["How it works", "Features", "Showcase", "FAQ"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replaceAll(" ", "-")}`}
                onClick={() => setMenu(false)}
              >
                {link}
              </a>
            ))}
          </nav>
          <JoinButton label="Join the waitlist" />
        </div>
      </header>

      <main>
        <section className="hero" aria-label="AI marketing videos">
          <img
            className="hero-poster"
            src={`${ASSET}/posters/${heroFilms[hero].video}.webp`}
            alt=""
          />
          <video
            ref={videoRef}
            key={heroFilms[hero].video}
            className={`hero-video ${videoReady ? "ready" : ""}`}
            src={`${VIDEO_ASSET}/videos/${heroFilms[hero].video}.mp4`}
            muted
            loop
            autoPlay
            playsInline
            onCanPlay={() => setVideoReady(true)}
          />
          <div className="hero-shade" />
          <div className="hero-grid" />
          <div className="hero-copy">
            <p className="hero-kicker">
              <span>{String(hero + 1).padStart(2, "0")}</span>
              <i />
              {heroFilms[hero].name}
            </p>
            <h1>
              Astral ai: AI marketing
              <br />
              videos, <em>made from one brief.</em>
            </h1>
            <div className="hero-brief">
              <span>Brief</span>
              <p>Turn one idea into a complete, cinematic campaign.</p>
              <small>
                <i /> Directing…
              </small>
            </div>
          </div>
          <div
            className="hero-tabs"
            role="tablist"
            aria-label="Film categories"
          >
            {heroFilms.map((film, index) => (
              <button
                key={film.title}
                className={hero === index ? "active" : ""}
                onClick={() => setHero(index)}
                role="tab"
                aria-selected={hero === index}
              >
                <span className="tab-line">
                  <i />
                </span>
                <span>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  {film.title}
                </span>
              </button>
            ))}
          </div>
          <img className="hero-mark" src={`${ASSET}/brand/mark.webp`} alt="" />
        </section>

        <section className="marquee" aria-label="Available video formats">
          <p>One brief, every kind of film</p>
          <div className="marquee-window">
            <div className="marquee-track">
              {[...formats, ...formats].map((format, index) => (
                <span key={`${format}-${index}`}>
                  <i>✦</i>
                  {format}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="section workflow">
          <div className="container">
            <header className="section-head">
              <Eyebrow>How it works</Eyebrow>
              <h2>
                From brief to final cut, <em>in three moves.</em>
              </h2>
            </header>

            <div className="steps">
              <article className="step">
                <div className="step-copy">
                  <span className="step-number">01</span>
                  <h3>
                    Drop your <em>brief</em>
                  </h3>
                  <p>
                    A thought, a link or a full campaign doc. Astral ai
                    researches your brand, audience and category, then derives
                    the angle, hook, format and specs.
                  </p>
                </div>
                <div className="product-card strategy-card">
                  <div className="card-top">
                    <span>
                      <i className="live" /> Analyzing brief
                    </span>
                    <span>brief.txt → strategy</span>
                  </div>
                  <small>What are we making?</small>
                  <blockquote>
                    A launch film for a small-batch coffee. Make the morning
                    feel <em>unhurried.</em>
                  </blockquote>
                  <div className="choice-grid">
                    {[
                      "Product story",
                      "Brand film",
                      "Founder story",
                      "Social cut",
                    ].map((x, i) => (
                      <span className={i === 0 ? "selected" : ""} key={x}>
                        {x}
                      </span>
                    ))}
                  </div>
                  <small>Strategy</small>
                  <dl>
                    <div>
                      <dt>Audience</dt>
                      <dd>Slow-morning coffee lovers, 25–40</dd>
                    </div>
                    <div>
                      <dt>Hook</dt>
                      <dd>Steam rising, before the first sip</dd>
                    </div>
                    <div>
                      <dt>Format</dt>
                      <dd>9:16 · 20s · Reels + Shorts</dd>
                    </div>
                    <div>
                      <dt>Tone</dt>
                      <dd>Unhurried, warm, tactile</dd>
                    </div>
                  </dl>
                </div>
              </article>

              <article className="step reverse">
                <div className="step-copy">
                  <span className="step-number">02</span>
                  <h3>
                    Review the <em>storyboard</em>
                  </h3>
                  <p>
                    Every scene is planned: shots, timing, dialogue and CTA.
                    Rewrite any line, swap or regenerate any scene. Full control
                    stays with you.
                  </p>
                </div>
                <div className="product-card">
                  <div className="card-top">
                    <span>
                      <i className="live" /> Scene editor
                    </span>
                    <span>4 shots · 0:18</span>
                  </div>
                  <div className="shots">
                    {[
                      ["delulu_1", "WS · Bedroom"],
                      ["ghost_film", "MS · Booth"],
                      ["street_seller", "CU · Pour"],
                      ["goat_shot", "Insert · Pack"],
                    ].map(([image, label], index) => (
                      <figure
                        className={index === 1 ? "selected" : ""}
                        key={image}
                      >
                        <img
                          src={`${ASSET}/posters/${image}.webp`}
                          alt={label}
                        />
                        <figcaption>
                          0{index + 1} <span>{label}</span>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                  <small>Shot 02 · Dialogue</small>
                  <div className="dialogue">
                    “Not now — the line’s finally connecting.”{" "}
                    <button>Rewrite</button>
                  </div>
                  <div className="timeline">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </article>

              <article className="step">
                <div className="step-copy">
                  <span className="step-number">03</span>
                  <h3>
                    Voice, render, <em>done</em>
                  </h3>
                  <p>
                    On-brand voice with multilingual support, AI-generated
                    scenes, soundtrack and continuity QC, assembled into a
                    finished film.
                  </p>
                </div>
                <div className="product-card">
                  <div className="card-top">
                    <span>
                      <i className="live" /> Final review
                    </span>
                    <span>00:38 / 00:42</span>
                  </div>
                  <div className="player">
                    <img
                      src={`${ASSET}/posters/khudse.webp`}
                      alt="Khudse film preview"
                    />
                    <span>Your story, in sequence</span>
                    <button aria-label="Play film">
                      <Play />
                    </button>
                  </div>
                  <div className="tracks">
                    <span>
                      Video <i style={{ width: "100%" }} />
                    </span>
                    <span>
                      Voice · HI <i style={{ width: "84%" }} />
                    </span>
                    <span>
                      Music <i style={{ width: "93%" }} />
                    </span>
                  </div>
                  <div className="rendered">
                    <span>Voice, music and scenes in sync</span>
                    <b>✓ Rendered</b>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="features" className="section">
          <div className="container">
            <header className="section-head">
              <Eyebrow>Features</Eyebrow>
              <h2>
                Everything a video team does. <em>In one brief.</em>
              </h2>
              <p>
                Strategy, script, storyboard, voice, edit and QC: one AI officer
                that thinks like an agency and ships like a studio.
              </p>
            </header>
            <div className="bento">
              <Feature className="wide" icon="◈" title="Brand-true research">
                Before a single line is written, it studies your brand, audience
                and category to find the angle that will actually land.
                <div className="chips">
                  {[
                    "Brand voice",
                    "Audience",
                    "Competitors",
                    "Platform trends",
                    "Hook",
                  ].map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
              </Feature>
              <Feature icon="文" title="Multilingual & regional">
                Native-sounding voiceover and captions for every market you sell
                in.
                <div className="language">
                  Hello · नमस्ते · Hola · Bonjour · こんにちは
                </div>
              </Feature>
              <Feature icon="▣" title="Every platform format">
                One story, cut for Reels, Shorts, feeds and YouTube without
                re-briefing.
                <div className="ratios">
                  <i>9:16</i>
                  <i>4:5</i>
                  <i>1:1</i>
                  <i>16:9</i>
                </div>
              </Feature>
              <Feature icon="⌁" title="Direct by chat">
                Change shots, voice and music in plain language. No timeline, no
                waiting.
                <div className="mini-chat">
                  <span>Make it warmer, add rain.</span>
                  <b>Grade: warm film · Rain: on</b>
                </div>
              </Feature>
              <Feature icon="☷" title="Script & storyboard">
                Shot-by-shot plans with timing, dialogue and CTA, approved
                before rendering.
                <ol className="mini-list">
                  <li>
                    01 Hook <i>0:03</i>
                  </li>
                  <li>
                    02 Product reveal <i>0:06</i>
                  </li>
                  <li>
                    03 Call to action <i>0:04</i>
                  </li>
                </ol>
              </Feature>
              <Feature className="wide" icon="◎" title="Continuity QC">
                Every cut is checked so faces, products and colour stay
                consistent.
                <div className="qc">
                  {[
                    "Face match",
                    "Product label",
                    "Colour grade",
                    "Audio sync",
                  ].map((x) => (
                    <span key={x}>✓ {x}</span>
                  ))}
                </div>
              </Feature>
            </div>
          </div>
        </section>

        <section className="section direction">
          <div className="container direction-grid">
            <div className="direction-copy">
              <Eyebrow>End-to-end control</Eyebrow>
              <h2>
                AI plans it. <em>You perfect it.</em>
              </h2>
              <p>
                Talk to it like your own video director. Don’t just accept a
                generated output, shape it. Say{" "}
                <b>“make it warmer, add rain”</b> and it’s done.
              </p>
              <ul>
                <li>Scene-level edits without starting over</li>
                <li>Swap voice, language and music instantly</li>
                <li>Every version saved, nothing lost</li>
              </ul>
            </div>
            <div className="director">
              <div className="director-top">
                <span>
                  <i className="live" /> Director
                </span>
                <small>typing</small>
                <b>Online</b>
              </div>
              <div className="director-shots">
                {["delulu_1", "ghost_film", "street_seller", "goat_shot"].map(
                  (image, index) => (
                    <img
                      className={index === 1 ? "selected" : ""}
                      src={`${ASSET}/posters/${image}.webp`}
                      alt=""
                      key={image}
                    />
                  ),
                )}
              </div>
              <div className="messages">
                <p>Make the hook faster. Cut to the product by second 2.</p>
                <div>
                  <b>Scene 1 trimmed → 2.1s</b>Done. Cold-pour macro moved up.
                  Want a warmer colour grade on the whole cut?
                </div>
                <p>Yes, and switch the voice to Hindi, energetic female.</p>
                <div>
                  <b>Grade: warm film · Voice: HI · Aisha</b>Re-rendering 4
                  scenes. Your new cut will be ready in about 40 seconds.
                </div>
              </div>
              <a href="#access">
                Message your video director… <Arrow />
              </a>
            </div>
          </div>
        </section>

        <section id="showcase" className="section showcase">
          <div className="container">
            <header className="section-head split">
              <div>
                <Eyebrow>Showcase</Eyebrow>
                <h2>
                  A few things <em>we made.</em>
                </h2>
              </div>
              <div>
                <p>
                  Product launches, brand stories, explainers and campaigns,
                  each one starting from a single brief.
                </p>
                <div className="view-toggle">
                  <button
                    className={showcaseMode === "grid" ? "active" : ""}
                    onClick={() => setShowcaseMode("grid")}
                  >
                    Grid
                  </button>
                  <button
                    className={showcaseMode === "carousel" ? "active" : ""}
                    onClick={() => setShowcaseMode("carousel")}
                  >
                    Carousel
                  </button>
                </div>
              </div>
            </header>
          </div>
          <div className={`film-grid ${showcaseMode}`}>
            {films.map((film) => (
              <button
                className="film-card"
                key={film.title}
                onClick={() => setSelectedFilm(film)}
              >
                <img src={`${ASSET}/posters/${film.poster}.webp`} alt="" />
                <span className="film-shade" />
                <span className="play">
                  <Play />
                </span>
                <span className="film-meta">
                  <small>{film.category}</small>
                  <b>{film.title}</b>
                </span>
                <img
                  className="watermark"
                  src={`${ASSET}/brand/mark.webp`}
                  alt=""
                />
              </button>
            ))}
          </div>
        </section>

        <section id="faq" className="section faq">
          <div className="container faq-grid">
            <header>
              <Eyebrow>FAQ</Eyebrow>
              <h2>
                Questions, <em>answered.</em>
              </h2>
              <p>
                Anything else? Join the waitlist and tell us what you want to
                make. We read every note.
              </p>
            </header>
            <div>
              {faqs.map((faq) => (
                <details key={faq.q}>
                  <summary>
                    {faq.q}
                    <span>+</span>
                  </summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="access" className="final-cta">
          <div className="cta-glow" />
          <img
            src={`${ASSET}/brand/mark-lg.webp`}
            alt=""
            className="cta-mark"
          />
          <div className="container">
            <Eyebrow>Early access</Eyebrow>
            <h2>
              Your next campaign is <em>one brief away.</em>
            </h2>
            <p>
              Join the waitlist for early access. Founding teams get lifetime
              pricing.
            </p>
            {submitted ? (
              <div className="success">
                You’re on the list. We’ll be in touch.
              </div>
            ) : (
              <form className="email-form" onSubmit={submit}>
                <label className="sr-only" htmlFor="email">
                  Work email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                />
                <button className="btn btn-primary" type="submit">
                  Get early access <Arrow />
                </button>
              </form>
            )}
            <small>No payment details. Just early access.</small>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <Logo />
              <p>AI marketing videos, made from one brief.</p>
            </div>
            <JoinButton label="Join the waitlist" />
          </div>
          <span className="footer-word">Astral ai</span>
          <div className="footer-grid">
            <div>
              <b>Network</b>
              <span>Instagram · Coming soon</span>
              <a href="https://www.linkedin.com/company/sceneh-ai/">LinkedIn</a>
            </div>
            <div>
              <b>Inquiries</b>
              <a href="#access">New Business</a>
              <a href="#access">Press & Media</a>
              <a href="#access">Join the Fun</a>
            </div>
            <div>
              <b>HQ</b>
              <span>Mumbai, India</span>
            </div>
            <div>
              <b>Legal</b>
              <a href="#top">Privacy Policy</a>
              <a href="#top">Terms of Service</a>
            </div>
          </div>
          <div className="footer-base">
            <span>© 2026 Astral ai Labs. All rights reserved.</span>
            <a href="#top">
              Back to top <Arrow up />
            </a>
          </div>
        </div>
      </footer>

      {selectedFilm && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selectedFilm.title}
        >
          <button
            className="lightbox-close"
            onClick={() => setSelectedFilm(null)}
            aria-label="Close video"
          >
            ×
          </button>
          <div>
            <video
              src={`${VIDEO_ASSET}/videos/${selectedFilm.video}.mp4`}
              controls
              autoPlay
              playsInline
            />
            <p>
              <span>{selectedFilm.category}</span>
              {selectedFilm.title}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

function Play() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m7 5 8 5-8 5Z" />
    </svg>
  )
}

function Feature({
  icon,
  title,
  children,
  className = "",
}: {
  icon: string
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <article className={`feature ${className}`}>
      <span className="feature-icon">{icon}</span>
      <h3>{title}</h3>
      <div className="feature-copy">{children}</div>
    </article>
  )
}

export default App
