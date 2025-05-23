import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Stagewise toolbar integration - development only
if (process.env.NODE_ENV === 'development') {
  import('@stagewise/toolbar-react').then(({ StagewiseToolbar }) => {
    const stagewiseConfig = {
      plugins: []
    };

    // Create a separate DOM element for the toolbar
    const toolbarContainer = document.createElement('div');
    toolbarContainer.id = 'stagewise-toolbar';
    document.body.appendChild(toolbarContainer);

    // Create a separate React root for the toolbar
    const toolbarRoot = ReactDOM.createRoot(toolbarContainer);
    toolbarRoot.render(
      React.createElement(StagewiseToolbar, { config: stagewiseConfig })
    );
  }).catch((error) => {
    console.warn('Stagewise toolbar could not be loaded:', error);
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); 