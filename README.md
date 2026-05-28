<div align="center">
  <h1>🎬 CineSearch (Movie Search App)</h1>
  <p>
    <strong>A high-performance, responsive movie discovery platform built with modern web technologies.</strong>
  </p>
  <p>
    <a href="https://movie-search-site-pi.vercel.app/">Live Demo</a>
    ·
    <a href="#features">Features</a>
    ·
    <a href="#tech-stack">Tech Stack</a>
    ·
    <a href="#getting-started">Getting Started</a>
  </p>
</div>

<br />

## 📖 Overview

CineSearch is an intuitive and responsive movie search application designed to provide users with an immersive experience for discovering movies. By integrating with the **TMDb (The Movie Database) API**, it offers real-time search capabilities, popular movie curation, detailed movie profiles, and streaming provider information.

Built with **React** and **Vite**, the application emphasizes performance, clean architecture, and fluid user interfaces leveraging libraries like **Framer Motion**, **GSAP**, and **OGL** for advanced animations and rendering.

---

## ✨ Features

- **Real-Time Search**: Instantaneous movie discovery as you type.
- **Popular Movies**: Explore trending and highly-rated movies globally.
- **Detailed Movie Profiles**: Access comprehensive data including synopses, release dates, ratings, and streaming availability.
- **Streaming Providers**: Quickly find where to watch your favorite movies (powered by JustWatch / TMDb).
- **Fluid Animations**: Smooth transitions and micro-interactions powered by Framer Motion and GSAP.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewports.

---

## 🛠 Tech Stack

### Frontend Core
- **[React 19](https://react.dev/)**: Component-based UI library.
- **[Vite 6](https://vitejs.dev/)**: Next-generation, blazing fast frontend tooling.
- **[React Router 7](https://reactrouter.com/)**: Declarative routing for React.

### Animation & Graphics
- **[Framer Motion](https://www.framer.com/motion/)**: Production-ready declarative animations.
- **[GSAP](https://gsap.com/)**: Professional-grade animation library.
- **[OGL](https://github.com/oframe/ogl)**: Minimalist WebGL library.

### UI & Styling
- **[Lucide React](https://lucide.dev/)**: Beautiful & consistent iconography.

### External Services
- **[TMDb API](https://developer.themoviedb.org/docs)**: Movie data and imagery.

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- **Node.js**: `v18.0.0` or higher recommended.
- **npm**: `v9.0.0` or higher.
- A **TMDb API Key**. You can get one by registering at [The Movie Database](https://www.themoviedb.org/documentation/api).

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/movie-search-site.git
   cd movie-search-site/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the `frontend` directory and add your TMDb API key:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```

### Running the Development Server

Start the Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
The application will be accessible at `http://localhost:5173`.

---

## 🏗 Scripts & Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server |
| `npm run build` | Bundles the app into static files for production |
| `npm run preview` | Serves the production build locally for testing |
| `npm run lint` | Runs ESLint to check for code quality and style issues |

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
