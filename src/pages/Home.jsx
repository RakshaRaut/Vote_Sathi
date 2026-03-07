import { useEffect, useRef, useState } from "react";
import CandidateCard from "../components/CandidateCard";
import NewsCard from "../components/NewsCard";

const heroCandidates = [
  {
    name: "Rama Sharma",
    party: "Democratic Party · Pokhara-1",
    percent: 42,
    color: "#e63946",
    initials: "RS",
  },
  {
    name: "Bikash Thapa",
    party: "Unity Alliance · Pokhara-1",
    percent: 35,
    color: "#f4a823",
    initials: "BT",
  },
  {
    name: "Priya Gurung",
    party: "Progressive Front · Pokhara-1",
    percent: 23,
    color: "#7b9af7",
    initials: "PG",
  },
];

const statsData = [
  { target: 1200, suffix: "+", label: "Candidates Listed" },
  { target: 340, suffix: "+", label: "Facts Verified" },
  { target: 850, suffix: "+", label: "Polling Locations" },
  { target: 100, suffix: "%", label: "Verified Sources Only" },
];

const featureData = [
  {
    icon: "👤",
    iconClass: "icon-r",
    title: "Candidate Profiles",
    desc: "Complete biography, education history, achievements, party affiliation, and full manifesto in one place.",
  },
  {
    icon: "⚖️",
    iconClass: "icon-g",
    title: "Manifesto Comparison",
    desc: "Compare any two candidates side-by-side on economy, education, healthcare, and infrastructure.",
  },
  {
    icon: "📰",
    iconClass: "icon-b",
    title: "Verified News Feed",
    desc: "Social-style feed with verified election news, candidate announcements, and debate highlights.",
  },
  {
    icon: "🔍",
    iconClass: "icon-gr",
    title: "Fact-Check Engine",
    desc: "Report suspicious claims. Teams and AI review and publish trusted labels quickly.",
  },
  {
    icon: "📍",
    iconClass: "icon-r",
    title: "Polling Finder",
    desc: "Find nearest polling station with map distance, voting hours, and required documents.",
  },
  {
    icon: "💬",
    iconClass: "icon-g",
    title: "Discussion Groups",
    desc: "Join local civic groups for healthy political conversation and policy discussion.",
  },
  {
    icon: "🔔",
    iconClass: "icon-b",
    title: "Election Reminders",
    desc: "Stay updated on registration deadlines, debates, and election day notifications.",
  },
  {
    icon: "❓",
    iconClass: "icon-gr",
    title: "Candidate Q&A",
    desc: "Ask candidates questions directly and track public responses for accountability.",
  },
];

const stepsData = [
  {
    num: "01",
    title: "Create Your Profile",
    desc: "Sign up, enter your constituency, and get a personalised dashboard for local candidates.",
  },
  {
    num: "02",
    title: "Explore Candidates",
    desc: "Browse detailed profiles and compare candidates on issues that matter to you.",
  },
  {
    num: "03",
    title: "Verify & Discuss",
    desc: "Check facts, follow verified news, and join community discussions.",
  },
  {
    num: "04",
    title: "Vote Confidently",
    desc: "Use polling finder and reminders to cast your vote with complete clarity.",
  },
];

const factCheckData = [
  {
    tagClass: "tag-false",
    tagLabel: "✗ False",
    claim: '"Unemployment has doubled under the current government."',
    verdict:
      "Official CBS data shows unemployment rose by 1.2%, not doubled. The claim conflates underemployment with unemployment.",
    source: "Source: Central Bureau of Statistics, 2024",
  },
  {
    tagClass: "tag-true",
    tagLabel: "✓ Verified",
    claim: '"Over 2 million Nepalis voted in the last local election."',
    verdict:
      "Confirmed. Election Commission data shows 2.3 million votes cast in the 2022 local elections.",
    source: "Source: Election Commission Nepal, 2022",
  },
  {
    tagClass: "tag-partial",
    tagLabel: "~ Partial",
    claim: '"The candidate built 50 schools during their last term."',
    verdict:
      "Partially true. 32 schools were constructed; 18 were renovations of existing structures.",
    source: "Source: Ministry of Education Records, 2023",
  },
];

const compareTabs = [
  "Economy",
  "Education",
  "Healthcare",
  "Infrastructure",
  "Environment",
];

function Home() {
  const [barWidths, setBarWidths] = useState([0, 0, 0]);
  const [stats, setStats] = useState([0, 0, 0, 0]);
  const [activeTab, setActiveTab] = useState("Economy");
  const statsRef = useRef(null);
  const hasAnimatedStatsRef = useRef(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setBarWidths((prev) => [42, prev[1], prev[2]]), 300),
      setTimeout(() => setBarWidths((prev) => [prev[0], 35, prev[2]]), 500),
      setTimeout(() => setBarWidths((prev) => [prev[0], prev[1], 23]), 700),
    ];

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), index * 80);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    const animateCount = (index, target, duration) => {
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        setStats((previous) => {
          const next = [...previous];
          next[index] = value;
          return next;
        });
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimatedStatsRef.current) {
          hasAnimatedStatsRef.current = true;
          animateCount(0, 1200, 1400);
          animateCount(1, 340, 1200);
          animateCount(2, 850, 1300);
          animateCount(3, 100, 1000);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    return () => statsObserver.disconnect();
  }, []);

  return (
    <>
      <section id="hero">
        <div className="hero-bg" aria-hidden="true">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
          <div className="hero-grid" />
        </div>

        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            Nepal&apos;s Voter Awareness Platform
          </div>

          <h1 className="hero-title">
            Vote <span className="accent-r">Informed.</span>
            <br />
            Vote <span className="accent-g">Right.</span>
          </h1>

          <p className="hero-sub">
            VoteSathi brings candidates, manifestos, verified news, and your
            polling location together — so every citizen can make a decision
            they&apos;re proud of.
          </p>

          <div className="hero-actions">
            <a href="#" className="btn-primary">
              🗳️ Create Voter Profile
            </a>
            <a href="#features" className="btn-secondary">
              Explore Features →
            </a>
          </div>

          <div className="hero-stats" ref={statsRef}>
            {statsData.map((item, index) => (
              <div className="stat-item" key={item.label}>
                <div className="stat-num">
                  {stats[index]}
                  <span>{item.suffix}</span>
                </div>
                <div className="stat-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="ballot-card">
            <div className="ballot-header">
              <span>Live Poll Tracker</span>
              <div className="ballot-live">
                <span className="live-dot" /> Live
              </div>
            </div>

            <div role="list" aria-label="Candidate standings">
              {heroCandidates.map((candidate, index) => (
                <CandidateCard
                  key={candidate.initials}
                  name={candidate.name}
                  party={candidate.party}
                  percent={candidate.percent}
                  color={candidate.color}
                  initials={candidate.initials}
                  barWidth={barWidths[index]}
                />
              ))}
            </div>

            <div className="fact-check-pill">✓ All candidate data verified</div>
          </div>
        </div>
      </section>

      <section id="features">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-tag">Everything You Need</div>
            <h2 className="section-title">
              Built for the
              <br />
              Informed Voter
            </h2>
            <p className="section-sub">
              Every feature is designed to help citizens understand their
              choices, verify information, and participate with confidence.
            </p>
          </div>

          <div className="features-grid reveal">
            {featureData.map((item) => (
              <div className="feature-card" key={item.title}>
                <div className={`feature-icon ${item.iconClass}`}>{item.icon}</div>
                <div className="feature-title">{item.title}</div>
                <p className="feature-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how">
        <div className="section-inner">
          <div className="reveal how-header">
            <div className="section-tag section-tag-centered">Simple Process</div>
            <h2 className="section-title">
              From Signup to
              <br />
              Informed Vote
            </h2>
            <p className="section-sub section-sub-centered">
              Four steps to becoming a fully informed voter on election day.
            </p>
          </div>

          <div className="steps-container reveal">
            {stepsData.map((step) => (
              <div className="step-card" key={step.num}>
                <div className="step-num">{step.num}</div>
                <div className="step-title">{step.title}</div>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="compare">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-tag">Manifesto Comparison</div>
            <h2 className="section-title">
              Compare Candidates
              <br />
              Side by Side
            </h2>
            <p className="section-sub">
              No spin. Just facts. Pick any two candidates and see where they
              stand on the issues you care about.
            </p>
          </div>

          <div className="compare-preview reveal">
            <div className="compare-tabs">
              {compareTabs.map((tab) => (
                <button
                  key={tab}
                  className={`compare-tab${activeTab === tab ? " active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                  type="button"
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="compare-body">
              <div className="compare-col">
                <div className="compare-col-header">
                  <div
                    className="cand-avatar compare-avatar"
                    style={{ background: "rgba(230,57,70,0.15)", color: "#e63946" }}
                  >
                    RS
                  </div>
                  <div>
                    <div className="compare-name">Rama Sharma</div>
                    <span className="cand-tag cand-tag-r">Democratic Party</span>
                  </div>
                </div>

                <div className="compare-item">
                  <div className="compare-label">GDP Growth Target</div>
                  <div className="compare-value">
                    8% annual growth through foreign investment and tech sector
                    expansion.
                  </div>
                  <div className="compare-bar-row">
                    <div className="compare-bar-bg">
                      <div
                        className="compare-bar-fill"
                        style={{ width: "80%", background: "var(--crimson)" }}
                      />
                    </div>
                    <span className="compare-percent">8%</span>
                  </div>
                </div>

                <div className="compare-item">
                  <div className="compare-label">Job Creation</div>
                  <div className="compare-value">
                    50,000 new jobs via SME grants and startup ecosystem.
                  </div>
                </div>

                <div className="compare-item">
                  <div className="compare-label">Tax Reform</div>
                  <div className="compare-value">
                    Reduce income tax for middle class; increase corporate
                    accountability.
                  </div>
                </div>
              </div>

              <div className="compare-col">
                <div className="compare-col-header">
                  <div
                    className="cand-avatar compare-avatar"
                    style={{ background: "rgba(244,168,35,0.15)", color: "#f4a823" }}
                  >
                    BT
                  </div>
                  <div>
                    <div className="compare-name">Bikash Thapa</div>
                    <span className="cand-tag cand-tag-g">Unity Alliance</span>
                  </div>
                </div>

                <div className="compare-item">
                  <div className="compare-label">GDP Growth Target</div>
                  <div className="compare-value">
                    6% steady growth focusing on agricultural modernisation and
                    exports.
                  </div>
                  <div className="compare-bar-row">
                    <div className="compare-bar-bg">
                      <div
                        className="compare-bar-fill"
                        style={{ width: "60%", background: "var(--gold)" }}
                      />
                    </div>
                    <span className="compare-percent">6%</span>
                  </div>
                </div>

                <div className="compare-item">
                  <div className="compare-label">Job Creation</div>
                  <div className="compare-value">
                    40,000 new rural jobs via agriculture and tourism
                    development.
                  </div>
                </div>

                <div className="compare-item">
                  <div className="compare-label">Tax Reform</div>
                  <div className="compare-value">
                    Flat tax simplification and zero tax for farmers earning
                    under NPR 5 lakh.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="factcheck">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-tag">Fact-Check Centre</div>
            <h2 className="section-title">
              Truth in Every
              <br />
              Claim
            </h2>
            <p className="section-sub">
              Our team reviews political claims daily using verified sources.
              Here&apos;s what&apos;s been checked recently.
            </p>
          </div>

          <div className="factcheck-grid reveal">
            {factCheckData.map((item) => (
              <NewsCard
                key={item.claim}
                tagClass={item.tagClass}
                tagLabel={item.tagLabel}
                claim={item.claim}
                verdict={item.verdict}
                source={item.source}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="cta">
        <div className="cta-inner reveal">
          <h2>
            Your Vote is Your
            <br />
            <span className="cta-highlight">Voice.</span>
          </h2>
          <p>
            Join thousands of Nepali citizens using VoteSathi to cut through
            noise, understand candidates, and vote with confidence.
          </p>

          <div className="cta-buttons">
            <a href="#" className="btn-gold">
              🗳️ Get Started Free
            </a>
            <a href="#" className="btn-secondary">
              Learn More →
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <a className="nav-logo" href="#">
              <div className="logo-badge footer-logo-badge">🗳️</div>
              Vote<span>Sathi</span>
            </a>
            <p>
              Empowering Nepal&apos;s voters with verified information,
              transparent candidate profiles, and civic engagement tools.
            </p>
          </div>

          <div className="footer-col">
            <h4>Platform</h4>
            <a href="#">Candidate Profiles</a>
            <a href="#">Compare Tool</a>
            <a href="#">News Feed</a>
            <a href="#">Fact Check</a>
          </div>

          <div className="footer-col">
            <h4>Civic</h4>
            <a href="#">Polling Finder</a>
            <a href="#">Discussion Groups</a>
            <a href="#">Reminders</a>
            <a href="#">Candidate Q&amp;A</a>
          </div>

          <div className="footer-col">
            <h4>About</h4>
            <a href="#">Our Mission</a>
            <a href="#">Methodology</a>
            <a href="#">Contact</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2025 VoteSathi. Built for a more informed democracy.</span>
          <div className="footer-bottom-links">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;