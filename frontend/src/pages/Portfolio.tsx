import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import { projects, personalInfo, currentYear } from "../data";

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [inViewSections, setInViewSections] = useState<Set<string>>(new Set());
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  // Scroll tracking for scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = maxScroll > 0 ? scrolled / maxScroll : 0;
      document.documentElement.style.setProperty(
        "--scroll-progress",
        scrollProgress.toString()
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProject]);

  // Close modal on escape key, navigate images with arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
        return;
      }
      if (selectedProject !== null) {
        const project = projects[selectedProject];
        if (e.key === "ArrowLeft") {
          if (project.images.length > 1) {
            navigateImage(-1);
          }
        }
        if (e.key === "ArrowRight") {
          if (project.images.length > 1) {
            navigateImage(1);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, currentImageIndex]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const navigateImage = (direction: number) => {
    if (selectedProject === null) return;
    const project = projects[selectedProject];
    const newIndex =
      (currentImageIndex + direction + project.images.length) %
      project.images.length;
    setCurrentImageIndex(newIndex);
  };

  const projectsWithImages = projects.filter((p) => p.images.length > 0);
  const isInView = (sectionId: string) => inViewSections.has(sectionId);

  return (
    <>
      <div className="page portfolio-page">
        {/* Header */}
        <header className="portfolio-header will-animate animate-fade-in-up">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <div className="portfolio-hero">
            <p className="eyebrow">Project Showcase</p>
            <h1>My Portfolio</h1>
            <p className="portfolio-subtitle">
              A visual journey through the projects I've built and contributed to.
              Click on any project to view it in detail.
            </p>
          </div>
        </header>

        {/* Portfolio Gallery - Only projects with images */}
        <section
          ref={(el) => (sectionsRef.current["gallery"] = el)}
          data-section-id="gallery"
          className={`section ${isInView("gallery") ? "section-in-view" : ""}`}
        >
          {projectsWithImages.length > 0 ? (
            <>
              <div className="section-header">
                <h2>Project Gallery</h2>
                <span className="eyebrow">{projectsWithImages.length} projects</span>
              </div>
              <div className="portfolio-grid">
                {projectsWithImages.map((project, idx) => {
                  const originalIndex = projects.findIndex(
                    (p) => p.title === project.title
                  );
                  return (
                    <article
                      key={project.title}
                      className="portfolio-card"
                      onClick={() => setSelectedProject(originalIndex)}
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="portfolio-card-image">
                        <img src={project.images[0]} alt={project.title} />
                        <div className="portfolio-card-overlay">
                          <ExternalLink size={32} />
                          <span>
                            {project.images.length > 1
                              ? `View ${project.images.length} Images`
                              : "View Project"}
                          </span>
                        </div>
                        {project.images.length > 1 && (
                          <div className="image-count-badge">
                            {project.images.length}
                          </div>
                        )}
                      </div>
                      <div className="portfolio-card-content">
                        <div className="portfolio-card-header">
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
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <p>No project images yet. Add images to your projects in data.ts to showcase them here.</p>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <p>
              © {currentYear} {personalInfo.name}.
            </p>
            <Link to="/" className="footer-home-link">
              Back to Home
            </Link>
          </div>
        </footer>
      </div>

      {/* Lightbox Modal */}
      {selectedProject !== null && projects[selectedProject].images.length > 0 && (
        <div className="lightbox-overlay" onClick={() => setSelectedProject(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {projects[selectedProject].images.length > 1 && (
              <>
                <button
                  className="lightbox-nav lightbox-prev"
                  onClick={() => navigateImage(-1)}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  className="lightbox-nav lightbox-next"
                  onClick={() => navigateImage(1)}
                  aria-label="Next image"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            <div className="lightbox-image-container">
              <img
                src={projects[selectedProject].images[currentImageIndex]}
                alt={`${projects[selectedProject].title} - Image ${currentImageIndex + 1}`}
                className="lightbox-image"
              />
              {projects[selectedProject].images.length > 1 && (
                <div className="lightbox-image-counter">
                  {currentImageIndex + 1} / {projects[selectedProject].images.length}
                </div>
              )}
            </div>

            <div className="lightbox-info">
              <div className="lightbox-header">
                <h2>{projects[selectedProject].title}</h2>
                <span className="project-period">
                  {projects[selectedProject].period}
                </span>
              </div>
              <p>{projects[selectedProject].description}</p>
              <div className="lightbox-tech">
                <span className="tech-label">Technologies:</span>
                <span>{projects[selectedProject].tech}</span>
              </div>
              <div className="tag-row">
                {projects[selectedProject].tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
