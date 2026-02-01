/**
 * Portfolio Data Configuration
 *
 * Update this file to change portfolio content without touching component code.
 * All information is centralized here for easy maintenance.
 */

export const personalInfo = {
  name: "Đặng Bảo Phong",
  role: "DevOps Engineer",
  location: "Bien Hoa, Dong Nai",
  email: "michaeldang.general@gmail.com",
  phone: "+84937375404",
  objective:
    "DevOps Engineer with strong coding, automation, and systems skills, looking to design and operate scalable, secure infrastructure while mentoring teams—progressing toward Solutions Architect responsibilities in end-to-end solution design.",
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
];

export const highlights = [
  {
    label: "Years Experience",
    value: "6+",
    detail: "DevOps & Infrastructure",
  },
  {
    label: "Key Projects",
    value: "8+",
    detail: "Production deployments",
  },
  {
    label: "Focus",
    value: "Cloud + K8s",
    detail: "AWS & Kubernetes expert",
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
      "Engineered middleware solutions integrating Genesys with Zalo OA. Implemented GitOps workflows and built CCSS self-service portal with React + TypeScript and Python microservices.",
    highlights: [
      "Built CallCraft automation service using Genesys SDK platform",
      "Designed CCSS portal enabling business users to manage tasks without IT",
      "Optimized containerization of Genesys components for scalability",
    ],
  },
  {
    role: "Operation Engineer",
    company: "INCEPTIONLABS",
    time: "May 2022 — Oct 2024",
    location: "Vietnam",
    summary:
      "Orchestrated microservices on Amazon EKS achieving 99.95% availability. Automated infrastructure with Terraform/Ansible reducing deployment time by 70%.",
    highlights: [
      "Improved node/pod utilization +20%, reduced CPU -25%, memory -17%",
      "Cut EKS scale-up time from 30min → 7min (-76%)",
      "Centralized logging for 100+ workloads with Fluent Bit + Loki",
    ],
  },
  {
    role: "Sysadmin/Ops",
    company: "PLS Integrated Technology Services JSC",
    time: "Dec 2018 — Jan 2023",
    location: "Vietnam",
    summary:
      "Replaced Asterisk with OpenSIPS-based SIP proxy optimizing performance. Led call center infrastructure for major clients including VPBank and FEcredit.",
    highlights: [
      "Reduced dev env spin-up from 1 hour → 5 min (-91%)",
      "Server provisioning from 40 min → 8 min (-80%)",
      "Zero config drift with Ansible automation",
    ],
  },
];

export const projects = [
  {
    title: "CallCraft",
    period: "Jan 2025 - Present",
    description:
      "Custom Genesys automation platform with hybrid microservices architecture. Full-stack development with React + TypeScript, Java Spring Boot, and FastAPI.",
    tags: ["React", "TypeScript", "Java", "FastAPI", "Keycloak"],
    tech: "React + TypeScript, Java Spring Boot, FastAPI, Keycloak",
  },
  {
    title: "CCSS Portal",
    period: "May 2025 - Present",
    description:
      "Self-service operations portal for contact-center teams. Enables business users to manage tasks without IT involvement, improving operational throughput.",
    tags: ["React", "Node.js", "Python", "PostgreSQL"],
    tech: "React + TypeScript, Node.js, Python, PostgreSQL, Keycloak, F5",
  },
  {
    title: "Zalo-Genesys Integration",
    period: "Mar 2025 - Dec 2025",
    description:
      "Middleware solution bridging Zalo platform and Genesys contact center. Containerized eService deployment ensuring scalable chat workflow.",
    tags: ["Node.js", "Docker", "Genesys", "Redis"],
    tech: "Docker, Genesys Components, Node.js, Redis",
  },
  {
    title: "Kubernetes Migration",
    period: "Jul 2023 - Oct 2024",
    description:
      "Migrated traditional services to EKS with full GitOps implementation. Automated provisioning with Terraform/Ansible and implemented comprehensive observability.",
    tags: ["AWS", "Kubernetes", "Terraform", "GitLab CI"],
    tech: "AWS EKS, Terraform, Ansible, Helm, Argo CD, Prometheus, Grafana",
  },
  {
    title: "VPBank Call Center",
    period: "Apr 2020 - May 2022",
    description:
      "Provisioned SIP proxy with OpenSIPS for enhanced QoS. Integrated custom Prometheus metrics and Grafana dashboards for proactive monitoring.",
    tags: ["OpenSIPS", "Prometheus", "Grafana"],
    tech: "Linux, OpenSIPS, PostgreSQL, Prometheus, Grafana, Homer",
  },
  {
    title: "FE Credit Call Center",
    period: "Jun 2019 - May 2022",
    description:
      "Replaced Asterisk with OpenSIPS achieving 40% better performance. Containerized SIP proxy components reducing deployment time significantly.",
    tags: ["OpenSIPS", "Docker", "Ansible"],
    tech: "OpenSIPS, Docker-compose, Ansible, Prometheus, Grafana",
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
