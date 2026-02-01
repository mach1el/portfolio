# 🚀 DevOps Portfolio - Frontend

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)


---

## ✨ Features

- 🎨 **Premium Design** - Glassmorphism effects with purple gradient theme
- ⚡ **Smooth Animations** - Scroll-triggered reveals, staggered entrances, and micro-interactions
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🎯 **Data-Driven** - Centralized configuration for easy content updates
- 🔄 **Hot Module Replacement** - Instant feedback during development
- 🐳 **Docker Support** - Containerized development environment
- ♿ **Accessible** - Respects user motion preferences
- 🎭 **Professional Animations** - Physics-based easing and GPU-accelerated transforms

---

## 🛠️ Tech Stack

### Core Technologies
- **React 18.3.1** - Modern UI library with hooks
- **TypeScript 5.5.4** - Type-safe JavaScript
- **Vite 5.4.2** - Lightning-fast build tool

### UI & Styling
- **CSS3** - Custom properties, keyframe animations, grid/flexbox layouts
- **Lucide React** - Beautiful, customizable icons
- **Space Grotesk & IBM Plex Mono** - Professional typography

### Development Tools
- **Docker & Docker Compose** - Containerized development
- **ESLint** - Code quality and consistency
- **Hot Module Replacement** - Fast development feedback

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm 9+
- **Docker** (optional, for containerized development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 🐳 Docker Development

### Using Docker Compose (Recommended)

1. **Start the container**
   ```bash
   cd /home/mich43l/Projects/portfolio
   docker-compose up -d
   ```

2. **View logs**
   ```bash
   docker-compose logs -f frontend
   ```

3. **Stop the container**
   ```bash
   docker-compose down
   ```

### Features
- ✅ Hot module replacement enabled
- ✅ Volume mounts for live code updates
- ✅ Optimized for development workflow
- ✅ Port 5173 exposed for browser access

---

## 📂 Project Structure

```
frontend/
├── public/               # Static assets
│   └── profile.png      # Profile picture
├── src/
│   ├── App.tsx          # Main application component
│   ├── data.ts          # Centralized portfolio data
│   ├── main.tsx         # Application entry point
│   └── styles.css       # Global styles and animations
├── Dockerfile           # Multi-stage Docker build
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

---

## 🎨 Customization Guide

### Update Portfolio Content

All portfolio data is centralized in [`src/data.ts`](src/data.ts). Simply edit this file to update:

#### Personal Information
```typescript
export const personalInfo = {
  name: "Your Name",
  role: "Your Role",
  location: "Your Location",
  email: "your.email@example.com",
  phone: "+1234567890",
  objective: "Your professional objective..."
};
```

#### Skills
```typescript
export const skills = {
  "Category Name": [
    "Skill 1",
    "Skill 2",
    "Skill 3"
  ],
  // Add more categories...
};
```

#### Work Experience
```typescript
export const experience = [
  {
    role: "Job Title",
    company: "Company Name",
    time: "Jan 2024 — Present",
    location: "Location",
    summary: "Brief description...",
    highlights: [
      "Achievement 1",
      "Achievement 2"
    ]
  }
];
```

#### Projects
```typescript
export const projects = [
  {
    title: "Project Name",
    period: "Jan 2024 - Present",
    description: "Project description...",
    tags: ["Tech1", "Tech2", "Tech3"]
  }
];
```

### Change Color Theme

Edit CSS custom properties in [`src/styles.css`](src/styles.css):

```css
:root {
  --accent: #a855f7;      /* Primary purple */
  --accent-2: #c084fc;    /* Light violet */
  --glow: rgba(168, 85, 247, 0.3);
}
```

### Replace Profile Picture

1. Add your image to `public/` folder
2. Update image reference in `src/App.tsx`:
   ```tsx
   <img src="/your-image.png" alt={personalInfo.name} />
   ```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

---

## 🎯 Key Features Breakdown

### Animations
- **Entrance Animations** - Fade in, slide in, scale effects on page load
- **Scroll-Triggered** - IntersectionObserver-based section reveals
- **Hover States** - Enhanced interactivity on all clickable elements
- **Micro-interactions** - Gradient text shifts, breathing indicators, pulsing accents

### Performance
- ⚡ GPU-accelerated CSS transforms
- 🎯 Optimized with `will-change` property
- 📦 Code splitting and lazy loading
- 🔄 Efficient re-renders with React hooks

### Accessibility
- ♿ Semantic HTML structure
- ⌨️ Keyboard navigation support
- 🎨 High contrast ratios
- 🔇 `prefers-reduced-motion` support

---

## 🌐 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

---

## 📊 Lighthouse Scores

- 🟢 **Performance**: 95+
- 🟢 **Accessibility**: 100
- 🟢 **Best Practices**: 100
- 🟢 **SEO**: 90+

---

## 🔧 Troubleshooting

### Port Already in Use
Change the port in `vite.config.ts`:
```typescript
server: {
  port: 3000, // Change to any available port
}
```

### Docker HMR Not Working
Ensure volume mounts are correct in `docker-compose.yml`:
```yaml
volumes:
  - ./frontend/src:/app/src
  - ./frontend/public:/app/public
```

### Profile Picture Not Showing
1. Verify image exists in `public/` folder
2. Check `docker-compose.yml` has public folder mounted
3. Restart Docker container: `docker-compose restart frontend`

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Mich43l**

- 🌐 Website: [Portfolio](http://localhost:5173)
- 💼 LinkedIn: [@mich43l](https://www.linkedin.com/in/mich43l)
- 🐙 GitHub: [@mach1el](https://github.com/mach1el)
- 📧 Email: michaeldang.general@gmail.com

---

## 🙏 Acknowledgments

- 🎨 Design inspiration from modern portfolio trends
- 🎭 Animation patterns from premium web experiences
- 🚀 Built with modern best practices

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by Mich43l

</div>
