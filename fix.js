const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Add lazy loading
html = html.replace(/<img /g, '<img loading="lazy" ');

// Remove inline grid styles that break responsiveness
html = html.replace(/style="display: grid; grid-template-columns: repeat\(\d+, 1fr\); gap: 20px;"/g, '');

fs.writeFileSync('index.html', html);
