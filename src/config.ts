// Configuration for different deployment environments
const isCloudflare = window.location.hostname.includes('pages.dev');

export const config = {
  // Use root path for Cloudflare Pages, /web for GitHub Pages
  basePath: isCloudflare ? '/' : '/web',
}; 