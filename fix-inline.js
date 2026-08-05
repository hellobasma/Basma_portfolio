const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix min-width inline styles that break mobile
html = html.replace(/min-width:\s*300px;/g, 'min-width: 250px;');
html = html.replace(/font-size:\s*3\.5rem;/g, 'font-size: clamp(2rem, 8vw, 3.5rem);');
html = html.replace(/font-size:\s*2\.5rem;/g, 'font-size: clamp(1.8rem, 6vw, 2.5rem);');

fs.writeFileSync('index.html', html);
console.log('index.html updated successfully.');
