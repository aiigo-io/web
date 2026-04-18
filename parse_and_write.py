import re

html_path = ".cache/Aiigo Landing Page (standalone).html"
out_path = "src/App.tsx"

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# Extract script content
match = re.search(r'<script type="text/babel" data-presets="react">(.*?)</script>', html, re.DOTALL)
if not match:
    print("Script not found")
    exit(1)

content = match.group(1)

# Remove Object.assign(window, ...)
content = re.sub(r'Object\.assign\(window,\s*\{.*?\}\);', '', content, flags=re.DOTALL)

# Remove window.AiigoData assignments
content = re.sub(r'window\.AiigoData\s*=\s*\{.*?\};', '', content, flags=re.DOTALL)

# Remove destructuring from window.AiigoData
content = re.sub(r'const\s*\{.*?\}\s*=\s*window\.AiigoData;', '', content)

# Remove ReactDOM.createRoot line
content = re.sub(r'ReactDOM\.createRoot.*?render\(<App />\);', '', content)

# The tweaks style injection
style_injection = r"""
// Small global style for tweaks
const s = document.createElement('style');
s.textContent = `
  body.all-sans .font-serif { font-family: 'IBM Plex Sans', sans-serif !important; font-style: normal !important; }
  body.compact section { padding-top: 4.5rem !important; padding-bottom: 4.5rem !important; }
  body.no-grid .grid-bg, body.no-grid .grid-bg-paper { background-image: none !important; }
`;
document.head.appendChild(s);
"""
content = content.replace(style_injection, "")

# Change "function App() {" to "export default function App() {"
content = content.replace("function App() {", "export default function App() {")

# Replace window.TWEAK_DEFAULTS with TWEAK_DEFAULTS
content = content.replace("window.TWEAK_DEFAULTS", "TWEAK_DEFAULTS")

header = """// @ts-nocheck
import React from 'react';
"""

with open(out_path, "w", encoding="utf-8") as f:
    f.write(header + content)

print("Done writing to App.tsx")
