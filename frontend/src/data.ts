/**
 * Portfolio Data Configuration
 *
 * Update this file to change portfolio content without touching component code.
 * All information is centralized here for easy maintenance.
 */

// Career start date for calculating years of experience
const CAREER_START_YEAR = 2018;
const CAREER_START_MONTH = 12; // December

// Calculate years of experience dynamically
const calculateYearsOfExperience = (): string => {
  const now = new Date();
  const startDate = new Date(CAREER_START_YEAR, CAREER_START_MONTH - 1);
  const diffInMs = now.getTime() - startDate.getTime();
  const years = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365.25));
  return `${years}+`;
};

// Export current year for use in footer and other places
export const currentYear = new Date().getFullYear();

export const personalInfo = {
  name: "Đặng Bảo Phong",
  role: "Cloud Architect & Automation Expert",
  location: "Bien Hoa, Dong Nai",
  email: "michaeldang.general@gmail.com",
  phone: "+84937375404",
  resumeUrl: "/resume.pdf",
  objective:
    "Visionary Cloud Architect and Automation Expert dedicated to designing highly resilient, scalable systems and eliminating operational toil. Passionate about orchestrating zero-touch automation pipelines, driving enterprise-level architectural transformations, and building secure, future-proof infrastructures.",
};

export const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/mich43l",
    icon: "Linkedin",
  },
  {
    name: "GitHub",
    url: "https://github.com/mach1el",
    icon: "Github",
  },
  {
    name: "HackTheBox",
    url: "https://app.hackthebox.com/users/83903",
    icon: "Shield",
  },
  {
    name: "Email",
    url: "mailto:michaeldang.general@gmail.com",
    icon: "Mail",
  },
  {
    name: "Telegram",
    url: "https://t.me/st_mich43l",
    icon: "Send",
  },
];

export const highlights = [
  {
    label: "Years Experience",
    value: calculateYearsOfExperience(),
    detail: "Architecture & Automation",
  },
  {
    label: "Key Projects",
    value: "8+",
    detail: "Enterprise Architectures",
  },
  {
    label: "Core Focus",
    value: "Zero-Touch",
    detail: "Infrastructure as Code",
  },
];

export const skills = {
  "Languages & Scripting": [
    "Python",
    "Go (Golang)",
    "Bash",
    "Node.js",
    "TypeScript",
    "Java",
  ],
  "Container & Orchestration": [
    "Docker",
    "Docker Swarm",
    "Kubernetes",
    "Rancher",
    "Helm",
    "Argo CD",
  ],
  "CI/CD & Automation": [
    "GitLab CI/CD",
    "Jenkins",
    "Terraform",
    "Ansible",
    "Vagrant",
    "Git",
  ],
  "Cloud Platforms": [
    "AWS",
    "AWS EKS",
    "AWS ECR",
    "AWS EFS",
    "AWS VPC",
  ],
  "Monitoring & Observability": [
    "Prometheus",
    "Grafana",
    "Fluent Bit",
    "Loki",
    "kube-state-metrics",
    "Homer",
    "Heplify",
  ],
  "Web Servers & Proxies": [
    "NGINX",
    "Apache",
    "F5",
    "Cloudflare",
  ],
  "Databases": [
    "PostgreSQL",
    "MySQL",
    "NoSQL",
    "Redis",
  ],
  "Frameworks & APIs": [
    "Django",
    "FastAPI",
    "Flask",
    "Spring Boot",
    "React",
    "REST API",
  ],
  "Telephony & VoIP": [
    "Asterisk",
    "OpenSIPS",
    "Kamailio",
    "RTPProxy",
    "Genesys SDK",
  ],
  "Security & Testing": [
    "Keycloak",
    "CEH",
    "Penetration Testing",
    "Selenium",
    "DevSecOps",
  ],
  "Operating Systems": [
    "Linux",
    "Debian",
    "Ubuntu",
    "CentOS",
  ],
  "Networking & Protocols": [
    "TCP/IP",
    "SIP",
    "HTTP/HTTPS",
    "DNS",
    "VPN",
  ],
};

export const experience = [
  {
    role: "DevOps Engineer",
    company: "Home Credit Viet Nam",
    time: "Oct 2024 — Present",
    location: "Vietnam",
    summary:
      "Drove GitOps methodologies and engineered scalable self-service, omnichannel middleware, and telephony automation solutions.",
    highlights: [
      "Architected CCSS self-service portal (React/TypeScript/Python), empowering business teams to manage operations independently",
      "Boosted operational throughput by 70% and reduced IT support tickets by 90% via self-service automation",
      "Developed CallCraft GitOps automation engine for Genesys, cutting testing and deployment cycles by 65%",
      "Established comprehensive GitLab CI/CD pipelines to treat complex telephony environments as code",
      "Engineered omnichannel middleware integrating Genesys Chat with Zalo OA, unlocking a seamless digital customer service pipeline",
    ],
  },
  {
    role: "Operation Engineer",
    company: "INCEPTIONLABS",
    time: "May 2022 — Oct 2024",
    location: "Vietnam",
    summary:
      "Orchestrated highly available AWS EKS microservices environments and instituted GitOps and zero-downtime CI/CD practices.",
    highlights: [
      "Architected secure AWS infrastructure (EKS, VPC, ECR) with Terraform and Ansible, reducing manual setup time by 75%",
      "Implemented zero-downtime GitOps continuous delivery via ArgoCD, Rancher Fleet, and GitLab CI/CD across 100+ microservices",
      "Optimized Kubernetes workloads, improving resource utilization by 20% and reducing overall CPU/memory consumption by up to 25%",
      "Streamlined EKS cluster autoscaling, slashing scale-up time from 30 minutes to 7 minutes (a 76% reduction)",
      "Built a centralized observability stack (PGAK, Fluent Bit, Loki), accelerating root-cause analysis (RCA) by 90%",
      "Optimized edge routing and security using Cloudflare Workers and custom Page Rules",
    ],
  },
  {
    role: "Sysadmin/Ops",
    company: "PLS Integrated Technology Services JSC",
    time: "Dec 2018 — Jan 2023",
    location: "Vietnam",
    summary:
      "Modernized enterprise telephony infrastructure, migrating to high-performance OpenSIPS platforms while ensuring 99.99% SLA for major financial clients.",
    highlights: [
      "Headed the migration from Asterisk to high-performance OpenSIPS proxy engine, seamlessly handling 2,000+ concurrent calls/CPS",
      "Managed mission-critical infrastructure for enterprise clients (VPBank, FE Credit, Sacombank), ensuring 99.99% system availability",
      "Automated bare-metal and server provisioning using Ansible, eliminating configuration drift and cutting setup time by 50%",
      "Dockerized OpenSIPS and microservices, orchestrating deployments across Docker Swarm via dynamic Jenkins CI/CD pipelines",
      "Architected end-to-end observability stack using Prometheus, Grafana, and Homer SIP Capture for real-time signaling analysis",
      "Engineered custom Python/Flask RESTful APIs and Selenium test suites to automate complex background workflows and data extraction",
    ],
  },
];

export const projects = [
  {
    title: "CallCraft",
    period: "Jan 2026 - Present",
    description:
      "Custom Genesys automation platform with hybrid microservices architecture. Full-stack development with React + TypeScript, Java Spring Boot, and FastAPI.",
    tags: ["React", "TypeScript", "Java", "FastAPI", "Python", "Keycloak"],
    tech: "React + TypeScript, Java Spring Boot, FastAPI, Python, Keycloak",
    images: [], // Add screenshots when available
  },
  {
    title: "CCSS Portal",
    period: "May 2025 - Present",
    description:
      "Self-service operations portal for contact-center teams. Enables business users to manage tasks without IT involvement, improving operational throughput.",
    tags: ["React", "Node.js", "PostgreSQL", "Keycloak", "F5"],
    tech: "React + TypeScript, Node.js, PostgreSQL, Keycloak, F5",
    images: ["/hcvn_ccss.png", "/CCSS_diagram.png"],
  },
  {
    title: "Zalo-Genesys Integration",
    period: "Mar 2025 - Dec 2025",
    description:
      "Middleware solution bridging Zalo platform and Genesys contact center. Containerized eService deployment ensuring scalable chat workflow.",
    tags: ["Node.js", "Docker", "Genesys", "Redis"],
    tech: "Docker, Genesys Components, Node.js, Redis",
    images: ["/ZaloChatWF.png"],
  },
  {
    title: "Kubernetes Migration",
    period: "Jul 2023 - Oct 2024",
    description:
      "Migrated traditional services to EKS with full GitOps implementation. Managed clusters via Rancher for unified visibility. Automated provisioning with Terraform/Ansible and implemented comprehensive observability.",
    tags: ["AWS", "Kubernetes", "Terraform", "GitLab CI", "Rancher"],
    tech: "AWS EKS, Rancher, Terraform, Ansible, Helm, Argo CD, Prometheus, Grafana",
    images: ["/migrateEKS.png"],
  },
  {
    title: "VPBank Call Center",
    period: "Apr 2020 - May 2022",
    description:
      "Provisioned SIP proxy with OpenSIPS for enhanced QoS. Integrated custom Prometheus metrics and Grafana dashboards for proactive monitoring.",
    tags: ["OpenSIPS", "Prometheus", "Grafana", "Homer"],
    tech: "Linux, OpenSIPS, PostgreSQL, Prometheus, Grafana, Homer",
    images: [], // Add screenshots when available
  },
  {
    title: "FE Credit Call Center",
    period: "Jun 2019 - May 2022",
    description:
      "Replaced Asterisk with OpenSIPS achieving 40% better performance. Containerized SIP proxy components reducing deployment time significantly.",
    tags: ["OpenSIPS", "Docker", "Ansible", "Homer"],
    tech: "OpenSIPS, Docker-compose, Ansible, Prometheus, Grafana",
    images: ["/opensips_architecture.drawio.png"],
  },
];

export const education = [
  {
    institution: "University of Science Center",
    degree: "Python Programming",
    period: "Feb 2018 - Aug 2018",
    details: ["Basic & Advanced Python programming", "Web deployment with Django"],
  },
  {
    institution: "Dong Nai Technical College",
    degree: "Information Technology",
    period: "Aug 2016 - Feb 2018",
    details: [],
  },
];

export const certificates = [
  {
    name: "Python Django Web Development Basic",
    year: "2018",
  },
  {
    name: "Python Django Web Development Advanced",
    year: "2018",
  },
];

export const awards = [
  {
    title: "Best Performance of Year",
    organization: "PLS Integrated Technology Services",
    year: "2021",
  },
];

export const availability = {
  status: "Open for opportunities",
  note: "Solutions Architect track",
};

export const donations = [
  {
    name: "Bank QR",
    type: "qr",
    icon: "QrCode",
    url: "/myQR.jpg",
    description: "Scan QR code to donate",
  },
  {
    name: "PayPal",
    type: "paypal",
    icon: "CreditCard",
    url: "https://paypal.me/stmichael01",
    description: "Donate via PayPal",
  },
];
