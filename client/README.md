# MyBlog
A modern blog application built with React, Vite, and other powerful libraries. This project provides a foundation for building a highly interactive and scalable blog platform.

## Table of Contents
Features\
Installation\
Available\
Scripts\
Project\
Structure\
Dependencies\
Dev\
Dependencies\
Usage

# Features
## Fast Development with Vite:
<br/>
Enjoy a rapid development cycle with Vite as your build tool.<br/>
<br/>
<b>Modern UI with MUI & Emotion: </b> Use Material UI components alongside Emotion for styling.<br/> 
<b> User Authentication: </b> Integrated authentication with Clerk.<br/>
<b> Rich Text Editing: </b> Leverage React Quill for blog post creation.<br/>
<b> Image Management: </b> Utilize ImageKit for easy image handling.<br/>
<b> Routing: </b> Client-side routing with React Router DOM.<br/>
<b> Notifications: </b> Real-time feedback using React Toastify.<br/>
<b> Infinite Scrolling: </b> Seamlessly load more content with react-infinite-scroll-component.<br/>

## Installation
#### Clone the repository:
```bash
git clone https://github.com/yourusername/myblog.git
cd myblog
```
### Install dependencies:
```bash
npm install
```
or, if you prefer yarn:
yarn install

### Available Scripts
In the project directory, you can run:

```bash
npm run dev
```
Starts the development server using Vite. Open http://localhost:3000 to view the app in your browser.

```bash
npm run build
```
Builds the app for production, optimizing the output for best performance.
```bash
npm run preview
```
Runs the built application in a local preview environment.

Project Structure A typical file structure might look like:

```html myblog/
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
Customize this structure as your project evolves.

## Dependencies
The core libraries that power MyBlog include: 
<br/>
React & ReactDOM: The foundation for building UI components.<br/>
Vite: Provides a lightning-fast development experience.<br/>
@clerk/clerk-react: For user authentication.<br/>
@emotion/react & @emotion/styled: For styling components.<br/>
@mui/material & @mui/icons-material: Material design components and icons.<br/>
react-quill-new: Rich text editor integration.<br/>
react-router-dom: Client-side routing.<br/>
react-toastify: Notifications.<br/>
react-infinite-scroll-component: Infinite scrolling capability.<br/>
imagekitio-react: For server-side handling and image management.

## Dev Dependencies
For development and build processes, the project uses:<br/>
@vitejs/plugin-react: Enhances React integration within Vite.<br/>
eslint & related plugins: Tools for code quality and consistency.<br/>
tailwindcss, autoprefixer, postcss, style-loader: For enhanced styling and CSS post-processing.<br/>
@tanstack/react-query: Data fetching and caching.<br/>
axios: For making HTTP requests. Additional type definitions for React and ReactDOM, along with globals for cleaner development practices.

## Usage
1. Development:
Run the command npm run dev to start the development server. Make your changes and the server will hot-reload as you update files.

2. Building for Production:
Execute npm run build to compile the project. Preview the built project with npm run preview.

## Linting:
Use npm run lint to run ESLint and ensure code quality. Refer to the scripts section for more detailed commands related to development workflows.
