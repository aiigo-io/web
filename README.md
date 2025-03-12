# Web

A React-based web application hosted on GitHub Pages.

## Live Demo

Visit the live application at [https://computing-io.github.io/web/](https://computing-io.github.io/web/)

## Getting Started

### Prerequisites

- Node.js (version 18 or later recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/computing-io/web.git
   cd web
   ```

2. Install dependencies:
   ```bash
   npm ci
   ```

3. Start the development server:
   ```bash
   npm start
   ```

This will open the application in your default browser at [http://localhost:3000/web](http://localhost:3000/web).

## Available Scripts

In the project directory, you can run:

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production to the `build` folder
- `npm run eject` - Ejects the create-react-app configuration

## Deployment

This project is configured to deploy automatically to GitHub Pages using GitHub Actions. 

The workflow will:
1. Run on all pushes to the `main` branch
2. Build the React application
3. Deploy to GitHub Pages at [https://computing-io.github.io/web/](https://computing-io.github.io/web/)

### Manual Deployment

You can also manually trigger a deployment from the GitHub Actions tab in the repository by selecting the "Deploy to GitHub Pages" workflow and clicking "Run workflow".

## Project Configuration

- The application is configured with `"homepage": "/web"` in package.json to ensure correct asset paths when hosted at `https://computing-io.github.io/web/`
- The GitHub Actions workflow is defined in `.github/workflows/deploy.yml`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request