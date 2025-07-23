# MyBlog
A modern blog application built with React, Vite, and other powerful libraries. This project provides a foundation for building a highly interactive and scalable blog platform.

# Table of Contents
Features
Installation
Available Scripts
Project Structure
Dependencies
Dev Dependencies
Usage


# Features
Fast Development with Vite: Enjoy a rapid development cycle with Vite as your build tool.
Modern UI with MUI & Emotion: Use Material UI components alongside Emotion for styling.
User Authentication: Integrated authentication with Clerk.
Rich Text Editing: Leverage React Quill for blog post creation.
Image Management: Utilize ImageKit for easy image handling.
Routing: Client-side routing with React Router DOM.
Notifications: Real-time feedback using React Toastify.
Infinite Scrolling: Seamlessly load more content with react-infinite-scroll-component.

# Installation
## Clone the repository:

```bash
git clone https://github.com/yourusername/myblog.git
cd myblog
```
## Install dependencies:

```bash
npm install
```
### or, if you prefer yarn:

```bash
yarn install
```
# Available Scripts
In the project directory, you can run:
```bash 
npm run dev
```

Starts the development server using Vite. Open http://localhost:3000 to view the app in your browser.

```bash 
npm run build
```
# Builds the app for production, optimizing the output for best performance.

```bash
npm run preview
```
Runs the built application in a local preview environment.

Project Structure
A typical file structure might look like:

``` pgsql
myblog/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── README.md
└── vite.config.js
```
# Customize this structure as your project evolves.

# Dependencies
The core libraries that power MyBlog include:
React & ReactDOM: The foundation for building UI components.
Vite: Provides a lightning-fast development experience.
@clerk/clerk-react: For user authentication.
@emotion/react & @emotion/styled: For styling components.
@mui/material & @mui/icons-material: Material design components and icons.
react-quill-new: Rich text editor integration.
react-router-dom: Client-side routing.
react-toastify: Notifications.
react-infinite-scroll-component: Infinite scrolling capability.
cors, imagekitio-react: For server-side handling and image management.

# Dev Dependencies
## For development and build processes, the project uses:
@vitejs/plugin-react: Enhances React integration within Vite.
eslint & related plugins: Tools for code quality and consistency.
tailwindcss, autoprefixer, postcss, style-loader: For enhanced styling and CSS post-processing.
@tanstack/react-query: Data fetching and caching.
axios: For making HTTP requests.
Additional type definitions for React and ReactDOM, along with globals for cleaner development practices.

# Usage
### 1. Development:
  Run the command npm run dev to start the development server.
  Make your changes and the server will hot-reload as you update files.
### 2. Building for Production:
  Execute npm run build to compile the project.
  Preview the built project with npm run preview.

## Linting:
Use npm run lint to run ESLint and ensure code quality.
Refer to the scripts section for more detailed commands related to development workflows.
