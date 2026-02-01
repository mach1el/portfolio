import { useEffect, useRef, useState } from "react";
import { Download, Linkedin, Github, Mail, Shield, Heart, QrCode, CreditCard } from "lucide-react";
import {
  personalInfo,
  socialLinks,
  highlights,
  experience,
  projects,
  skills,
  availability,
  donations,
  currentYear,
} from "./data";

export default function App() {
  const [inViewSections, setInViewSections] = useState<Set<string>>(new Set());
  const [qrVisible, setQrVisible] = useState(false);
  const [donationOpen, setDonationOpen] = useState(false);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});
  const donationRef = useRef<HTMLDivElement | null>(null);
  const skillEntries = Object.entries(skills);
  const topSkillsCount = Math.min(
    skillEntries.length,
    Math.floor(skillEntries.length / 2) + 1
  );
  const topSkills = skillEntries.slice(0, topSkillsCount);
  const bottomSkills = skillEntries.slice(topSkillsCount);

  // IntersectionObserver for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section-id");
            if (id) {
              setInViewSections((prev) => new Set(prev).add(id));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    Object.values(sectionsRef.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (!donationRef.current) return;
      if (!donationRef.current.contains(event.target as Node)) {
        setDonationOpen(false);
        setQrVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const containers = Array.from(
      document.querySelectorAll<HTMLElement>(".skill-tags, .tag-row")
    );

    const cleanup: Array<() => void> = [];

    containers.forEach((el) => {
      let isDragging = false;
      let startX = 0;
      let scrollLeft = 0;

      const onPointerDown = (event: PointerEvent) => {
        if (event.button !== 0) return;
        isDragging = true;
        startX = event.clientX;
        scrollLeft = el.scrollLeft;
        el.classList.add("is-dragging");
        el.setPointerCapture(event.pointerId);
      };

      const onPointerMove = (event: PointerEvent) => {
        if (!isDragging) return;
        const delta = event.clientX - startX;
        el.scrollLeft = scrollLeft - delta;
      };

      const onPointerEnd = (event: PointerEvent) => {
        if (!isDragging) return;
        isDragging = false;
        el.classList.remove("is-dragging");
        el.releasePointerCapture(event.pointerId);
      };

      el.addEventListener("pointerdown", onPointerDown);
      el.addEventListener("pointermove", onPointerMove);
      el.addEventListener("pointerup", onPointerEnd);
      el.addEventListener("pointercancel", onPointerEnd);
      el.addEventListener("pointerleave", onPointerEnd);

      cleanup.push(() => {
        el.removeEventListener("pointerdown", onPointerDown);
        el.removeEventListener("pointermove", onPointerMove);
        el.removeEventListener("pointerup", onPointerEnd);
        el.removeEventListener("pointercancel", onPointerEnd);
        el.removeEventListener("pointerleave", onPointerEnd);
      });
    });

    return () => cleanup.forEach((fn) => fn());
  }, []);

  // Scroll tracking for scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = maxScroll > 0 ? scrolled / maxScroll : 0;
      document.documentElement.style.setProperty("--scroll-progress", scrollProgress.toString());
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isInView = (sectionId: string) => inViewSections.has(sectionId);

  return (
    <>
      <div className="scroll-progress" />
      <div className="page">
      <header className="hero">
        <div className="hero-left will-animate animate-fade-in-up">
          <p className="eyebrow">DevOps Engineer · {currentYear}</p>
          <h1>{personalInfo.objective}</h1>
          <p className="lede">
            Specializing in Kubernetes, AWS, CI/CD automation, and infrastructure
            as code. Building scalable, secure systems that drive business value.
          </p>
          <div className="hero-actions">
            <a
              href="/home/mich43l/Documents/DANG-BAO-PHONG-TopCV.vn-010226.150753.pdf"
              download
              style={{ textDecoration: "none" }}
            >
              <button className="primary">
                <Download size={18} />
                Download Resume
              </button>
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              style={{ textDecoration: "none" }}
            >
              <button className="ghost">
                <Mail size={18} />
                Get in Touch
              </button>
            </a>
          </div>
        </div>
        <div className="hero-right will-animate animate-slide-in-right delay-200">
          <div className="profile-card">
            <div className="profile-header">
              <div className="avatar">
                <img
                  src="/profile.png"
                  alt={personalInfo.name}
                  className="avatar-image"
                />
              </div>
              <div className="profile-info">
                <div>
                  <h2>{personalInfo.name}</h2>
                  <p>
                    {personalInfo.role} · {personalInfo.location}
                  </p>
                </div>
                <div className="profile-body">
                  <div>
                    <span>Contact</span>
                    <p>
                      <a href={`mailto:${personalInfo.email}`}>
                        {personalInfo.email}
                      </a>
                    </p>
                  </div>
                  <div>
                    <span>Phone</span>
                    <p>{personalInfo.phone}</p>
                  </div>
                  <div className="availability">
                    <span>Status</span>
                    <p>{availability.status}</p>
                  </div>
                </div>
                <div className="profile-footer">
                  {socialLinks.map((link) => {
                    const Icon =
                      link.icon === "Linkedin"
                        ? Linkedin
                        : link.icon === "Github"
                        ? Github
                        : link.icon === "Shield"
                        ? Shield
                        : Mail;
                    return (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        <div className="pill">
                          <Icon size={14} />
                          {link.name}
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section
        ref={(el) => (sectionsRef.current["metrics"] = el)}
        data-section-id="metrics"
        className={`metrics ${isInView("metrics") ? "section-in-view" : ""}`}
      >
        {highlights.map((item, index) => (
          <div
            key={item.label}
            className={`metric-card will-animate animate-scale-in delay-${
              300 + index * 100
            }`}
          >
            <p className="metric-label">{item.label}</p>
            <h3>{item.value}</h3>
            <p className="metric-detail">{item.detail}</p>
          </div>
        ))}
      </section>

      <section
        ref={(el) => (sectionsRef.current["about"] = el)}
        data-section-id="about"
        className={`split ${isInView("about") ? "section-in-view" : ""}`}
      >
        <div>
          <h2>Core Expertise</h2>
          <p>
            Specialized in cloud infrastructure, Kubernetes orchestration, and
            CI/CD automation. Proven track record of improving system performance,
            reducing deployment times, and building scalable solutions for
            enterprise clients.
          </p>
        </div>
        <div className="callout">
          <p className="callout-title">Career Goal</p>
          <p>
            Progressing toward Solutions Architect responsibilities, focusing on
            end-to-end solution design, mentoring teams, and driving technical
            excellence.
          </p>
        </div>
      </section>

      <section
        ref={(el) => (sectionsRef.current["projects"] = el)}
        data-section-id="projects"
        className={`section ${isInView("projects") ? "section-in-view" : ""}`}
      >
        <div className="section-header">
          <h2>Key Projects</h2>
          <span className="eyebrow">{projects.length} deliveries</span>
        </div>
        <div className="grid">
          {projects.map((project) => (
            <article key={project.title} className="project-card">
              <div className="project-accent" />
              <div className="project-header">
                <h3>{project.title}</h3>
                <span className="project-period">{project.period}</span>
              </div>
              <p>{project.description}</p>
              <div className="tag-row">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        ref={(el) => (sectionsRef.current["experience"] = el)}
        data-section-id="experience"
        className={`section ${isInView("experience") ? "section-in-view" : ""}`}
      >
        <div className="section-header">
          <h2>Work Experience</h2>
          <span className="eyebrow">{highlights[0].value} years</span>
        </div>
        <div className="timeline">
          {experience.map((role) => (
            <article key={role.company} className="timeline-item">
              <div className="timeline-header">
                <div>
                  <h3>{role.role}</h3>
                  <p className="muted">{role.company}</p>
                </div>
                <p className="muted timeline-time">{role.time}</p>
              </div>
              <p>{role.summary}</p>
              {role.highlights && role.highlights.length > 0 && (
                <ul className="timeline-highlights">
                  {role.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      <section
        ref={(el) => (sectionsRef.current["skills"] = el)}
        data-section-id="skills"
        className={`section ${isInView("skills") ? "section-in-view" : ""}`}
      >
        <div className="section-header">
          <h2>Technical Skills</h2>
          <span className="eyebrow">60+ technologies</span>
        </div>
        <div className="skills-grid">
          <div className="skills-row skills-row-top">
            {topSkills.map(([category, techs]) => (
              <div key={category} className="skill-category">
                <h3 className="skill-category-title">{category}</h3>
                <div className="skill-tags">
                  {techs.map((tech) => (
                    <span key={tech} className="skill-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {bottomSkills.length > 0 && (
            <div className="skills-row skills-row-bottom">
              {bottomSkills.map(([category, techs]) => (
                <div key={category} className="skill-category">
                  <h3 className="skill-category-title">{category}</h3>
                  <div className="skill-tags">
                    {techs.map((tech) => (
                      <span key={tech} className="skill-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section
        ref={(el) => (sectionsRef.current["contact"] = el)}
        data-section-id="contact"
        className={`contact ${isInView("contact") ? "section-in-view" : ""}`}
      >
        <div>
          <h2>Let&apos;s build scalable infrastructure together</h2>
          <p>
            Open to DevOps/SRE opportunities, consulting projects, and Solutions
            Architect roles. Let's discuss how I can help scale your
            infrastructure.
          </p>
        </div>
        <a
          href={`mailto:${personalInfo.email}`}
          style={{ textDecoration: "none" }}
        >
          <button className="primary">
            <Mail size={18} />
            Contact Me
          </button>
        </a>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p>
            © {currentYear} {personalInfo.name}.
          </p>
          <div className="footer-links">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Floating Donation Widget */}
      <div
        ref={donationRef}
        className={`floating-donation-widget ${donationOpen ? "is-open" : ""}`}
      >
        <button
          type="button"
          className="donation-mascot"
          onClick={() =>
            setDonationOpen((prev) => {
              const next = !prev;
              if (!next) setQrVisible(false);
              return next;
            })
          }
          aria-expanded={donationOpen}
          aria-label="Toggle donation panel"
        >
          <Heart className="mascot-heart" size={32} />
        </button>
        <div className="donation-tooltip">
          <span className="donation-tooltip-text">Touch here ^_^</span>
        </div>
        <div className="donation-popup">
          <div className="donation-popup-header">
            <Heart size={20} className="heart-icon" />
            <span>Support My Work</span>
          </div>
          <div className="donation-popup-buttons">
            {donations.map((donation) => {
              const Icon = donation.icon === "QrCode" ? QrCode : CreditCard;

              if (donation.type === "qr") {
                return (
                  <div key={donation.name} className="donation-popup-btn-wrapper">
                    <button
                      onClick={() => setQrVisible(!qrVisible)}
                      className="donation-popup-btn"
                      title={donation.description}
                      type="button"
                    >
                      <Icon size={18} />
                      <span>{donation.name}</span>
                    </button>
                    <div className={`qr-code-preview ${qrVisible ? "qr-visible" : ""}`}>
                      <img
                        src={donation.url}
                        alt="QR Code"
                        className="qr-code-image"
                      />
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={donation.name}
                  href={donation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="donation-popup-btn"
                  title={donation.description}
                >
                  <Icon size={18} />
                  <span>{donation.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
