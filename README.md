# AIIGo Web Project

This is the web frontend for the AIIGo platform, built with React, TypeScript, and Tailwind CSS.

## Project Structure

The project follows a standard React application structure:

```
src/
  ├── components/     # React components
  ├── styles/         # Global styles
  ├── lib/            # Utility functions and helpers
  ├── App.tsx         # Main application component
  └── index.tsx       # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/computing-io/web.git
   cd web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Create React App

## Project Conversion

This project was converted from JavaScript (JSX) to TypeScript (TSX) and from CSS Modules to Tailwind CSS. The conversion process included:

1. Adding TypeScript dependencies
2. Creating TypeScript configuration
3. Converting JSX components to TSX
4. Implementing Tailwind CSS for styling
5. Removing CSS modules

## License

ISC

## Live Demo

Visit the live application at [https://aiigo-io.github.io/](https://aiigo-io.github.io/)

## Deployment

This project is configured to deploy automatically to GitHub Pages using GitHub Actions. 

The workflow will:
1. Run on all pushes to the `main` branch
2. Build the React application
3. Deploy to GitHub Pages at [https://aiigo-io.github.io/](https://aiigo-io.github.io/)

### Manual Deployment

You can also manually trigger a deployment from the GitHub Actions tab in the repository by selecting the "Deploy to GitHub Pages" workflow and clicking "Run workflow".

## Project Configuration

- The application is configured with `"homepage": "/"` in package.json to ensure correct asset paths
- The GitHub Actions workflow is defined in `.github/workflows/deploy.yml`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request