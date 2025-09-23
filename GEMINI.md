# GEMINI.md

## Project Overview

This is a web application for music management, likely for students and instructors. It's built with React, TypeScript, and Vite, using Tailwind CSS for styling. The application features user authentication, different user roles (Instructor, Student, Admin), and various functionalities like a dashboard, user management, profile editing, class planning, task management, and more.

## Building and Running

### Development

To run the application in a development environment, use the following command:

```bash
npm run dev
```

This will start a development server with hot-reloading.

### Build

To build the application for production, use the following command:

```bash
npm run build
```

This will create a `dist` folder with the optimized and minified files.

### Lint

To check the code for linting errors, use the following command:

```bash
npm run lint
```

### Preview

To preview the production build locally, use the following command:

```bash
npm run preview
```

## Development Conventions

*   **State Management:** The project uses Zustand for state management, with different stores for authentication, user data, class plans, etc.
*   **Routing:** Routing is handled by `react-router-dom`, with protected routes based on user roles.
*   **API Communication:** The application communicates with a backend API using `axios`. The API base URL is configured in `src/lib/api.ts` and can be set via the `VITE_API_URL` environment variable.
*   **Styling:** The project uses Tailwind CSS for styling, with a custom theme and components.
*   **Component Library:** The project uses a custom component library located in `src/components/ui`.
*   **PWA:** The project is configured as a Progressive Web App (PWA).
