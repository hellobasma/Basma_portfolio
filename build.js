const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');
const indexPath = path.join(__dirname, 'index.html');

let html = fs.readFileSync(indexPath, 'utf-8');

function getImages(dirPath) {
    return fs.readdirSync(dirPath).filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });
}

function getDirs(dirPath) {
    return fs.readdirSync(dirPath).filter(file => {
        return fs.statSync(path.join(dirPath, file)).isDirectory();
    });
}

const titles = {
    'posts': 'Educational Social Media Posts',
    'thumbnails': 'Lecture & Course Thumbnails'
};

const preferredCovers = {
    'posts': 'المحاضره-الافتتاحيه.jpg',
    'thumbnails': 'المحاضره-الاولى.jpg'
};

const descriptions = {
    'Compass travelling Brand': 'A complete visual identity and branding strategy for a modern travel agency, focusing on adventure, exploration, and seamless journeys.',
    'Enzi coffee brand': 'A warm and inviting brand identity for a premium coffee shop. The design emphasizes organic aesthetics and a cozy atmosphere.',
    'Hawiya architecture company': 'A sleek, structured, and professional corporate identity for a modern architecture firm, highlighting precision and monumental design.',
    'Masarat': 'A dynamic brand identity designed to reflect progress, pathways, and future-forward vision.',
    'Restaurants': 'A collection of versatile brand identities and marketing materials designed for various restaurants, capturing the unique flavor of each dining experience.',
    'Skyway shipping brand': 'A bold and reliable visual identity for a logistics and shipping company, conveying speed, trust, and global reach.',
    'Venue Hotel Brand': 'An elegant and luxurious brand identity for a premium hotel, focusing on hospitality, comfort, and a memorable guest experience.',
    'Hultprize': 'Engaging social media campaigns and digital content created for the Hult Prize, empowering student entrepreneurs.',
    'insider': 'Creative social media visuals and content strategy for Insider, designed to boost audience engagement and brand awareness.',
    'Nebras': 'A focused digital campaign highlighting product features with high-quality visual assets and clear messaging.',
    'pixology': 'Educational and promotional social media content for Pixology courses, designed to attract and inspire creative students.',
    'problem solving': 'A series of informative and visually engaging social media posts focused on creative problem-solving techniques.',
    'shagani': 'A motivational social media campaign featuring strong typography and impactful messaging to inspire action.',
    'posts': 'Specialized social media designs, promotional campaigns, and announcement graphics crafted for teachers, educators, and tutoring centers to engage students effectively.',
    'thumbnails': 'High-converting YouTube and digital course thumbnails featuring bold typography, dynamic layouts, and clear visual hierarchy for online lessons.',
    'elmothdh_book': 'Complete layout and print design for a comprehensive book, ensuring readability, structural elegance, and visual hierarchy.',
    'Masarat Brochure': 'A professionally designed corporate brochure translating digital brand elements into a tangible, high-quality physical format.',
    'ui ux': 'A collection of intuitive, user-centered interface designs focusing on seamless navigation, accessibility, and modern aesthetics.'
};

const brandColors = {
    'Compass travelling Brand': '#0ea5e9',
    'Enzi coffee brand': '#d97706',
    'Hawiya architecture company': '#9ca3af', // Grey
    'Masarat': '#8b5cf6', // Purple
    'Restaurants': '#facc15', // Yellow
    'Skyway shipping brand': '#22c55e', // Green
    'Venue Hotel Brand': '#881337', // Burgundy
    'Hultprize': '#ec4899',
    'insider': '#1d4ed8', // Dark Blue
    'Nebras': '#7dd3fc', // Light Sky Blue
    'pixology': '#ef4444', // Red
    'problem solving': '#6366f1',
    'shagani': '#ea580c', // Dark Orange
    'posts': '#06b6d4', // Vibrant Cyan
    'thumbnails': '#e11d48', // Vibrant Rose/Red
    'elmothdh_book': '#10b981', // Green
    'Masarat Brochure': '#ffffff', // White
    'ui ux': '#92400e' // Brown
};

let generatedHtml = `
            <div class="works-header">
                <div class="works-title">
                    <span class="sub">Portfolio/</span>
                    <h2>Works</h2>
                    <p class="works-subtitle">Narrative journeys</p>
                </div>
            </div>
`;

// User requested category order
const categoryConfig = [
    { dir: 'pixology social media post', label: 'Social Media Designs' },
    { dir: 'education', label: 'Educational Designs' },
    { dir: 'Branding', label: 'Branding' },
    { dir: 'printed', label: 'Printed' },
    { dir: 'ui ux', label: 'UI UX' }
];

categoryConfig.forEach(catConfig => {
    const cat = catConfig.dir;
    const catPath = path.join(assetsDir, cat);
    if (!fs.existsSync(catPath)) return;
    
    // Add Main Category Header
    generatedHtml += `
            <div class="main-category-header" style="margin-top: 100px; margin-bottom: 50px; padding-bottom: 15px; border-bottom: 1px solid var(--card-border);">
                <h2 style="font-size: clamp(2rem, 8vw, 3.5rem); color: #ffffff; letter-spacing: -1px;">${catConfig.label}</h2>
            </div>
    `;

    const subDirs = getDirs(catPath);
    
    if (subDirs.length > 0) {
        subDirs.forEach(subDir => {
            if (subDir.toLowerCase() === 'problem solving') return; // Skip problem solving section
            
            const subDirPath = path.join(catPath, subDir);
            let images = getImages(subDirPath);
            
            if (images.length > 0) {
                const desc = descriptions[subDir] || 'Professional graphic design and visual storytelling.';
                const color = brandColors[subDir] || '#ffffff';
                const displayTitle = titles[subDir] || subDir.replace(/_/g, ' ');

                let coverImg = preferredCovers[subDir] || images[0];
                if (!images.includes(coverImg)) {
                    coverImg = images[0];
                }
                const remainingImages = images.filter(img => img !== coverImg);
                const coverSrc = `./assets/${cat}/${subDir}/${coverImg}`.replace(/\\/g, '/');
                
                generatedHtml += `
            <!-- Sub Category: ${subDir} -->
            <div class="project-block" style="border-left: 4px solid ${color}; padding-left: 25px; padding-top: 10px; padding-bottom: 30px; border-radius: 12px; background: linear-gradient(90deg, ${color}05 0%, transparent 100%); margin-bottom: 80px;">
                
                <div class="project-hero" style="display: flex; flex-wrap: wrap; gap: 40px; align-items: center; margin-bottom: 40px;">
                    <div class="project-info" style="flex: 1; min-width: 250px;">
                        <h3 style="color: ${color}; text-shadow: 0 0 15px ${color}50; font-size: clamp(1.8rem, 6vw, 2.5rem); margin-bottom: 15px;">${displayTitle}</h3>
                        <p style="color: var(--text-muted); font-size: 1.15rem; line-height: 1.8;">${desc}</p>
                    </div>
                    <div class="project-cover" style="flex: 1.5; min-width: 250px; display: flex; justify-content: flex-end;">
                        <img loading="lazy" src="${coverSrc}" alt="${coverImg} Cover" style="width: auto; max-width: 100%; height: auto; max-height: 450px; display: block; border-radius: 16px; border: 1px solid ${color}30; filter: drop-shadow(0 10px 30px rgba(0,0,0,0.5)); transition: all 0.4s ease;" onmouseover="this.style.filter='drop-shadow(0 15px 40px ${color}60)'; this.style.transform='scale(1.02)';" onmouseout="this.style.filter='drop-shadow(0 10px 30px rgba(0,0,0,0.5))'; this.style.transform='';">
                    </div>
                </div>
`;
                if (remainingImages.length > 0) {
                    const singleColClass = remainingImages.length === 1 ? ' single-column' : '';
                    generatedHtml += `                <div class="dynamic-grid${singleColClass}">\n`;
                    remainingImages.forEach((img) => {
                        const srcPath = `./assets/${cat}/${subDir}/${img}`.replace(/\\/g, '/');
                        generatedHtml += `                    <img loading="lazy" src="${srcPath}" alt="${img}" class="grid-img" style="border: 1px solid ${color}30; width: 100%; height: auto; border-radius: 12px; transition: all 0.4s ease;" onmouseover="this.style.filter='drop-shadow(0 10px 20px ${color}60)'; this.style.borderColor='${color}80'; this.style.transform='translateY(-5px) scale(1.02)';" onmouseout="this.style.filter=''; this.style.borderColor='${color}30'; this.style.transform='';">\n`;
                    });
                    generatedHtml += `                </div>\n`;
                }
                generatedHtml += `            </div>\n`;
            }
        });
    } else {
        // No subdirectories, just images (like ui ux)
        const images = getImages(catPath);
        if (images.length > 0) {
            const desc = descriptions[cat] || 'Professional graphic design and visual storytelling.';
            const color = brandColors[cat] || '#ffffff';
            const displayTitle = titles[cat] || `${catConfig.label} Projects`;

            let coverImg = preferredCovers[cat] || images[0];
            if (!images.includes(coverImg)) {
                coverImg = images[0];
            }
            const remainingImages = images.filter(img => img !== coverImg);
            const coverSrc = `./assets/${cat}/${coverImg}`.replace(/\\/g, '/');
            
            generatedHtml += `
            <!-- Sub Category: ${cat} -->
            <div class="project-block" style="border-left: 4px solid ${color}; padding-left: 25px; padding-top: 10px; padding-bottom: 30px; border-radius: 12px; background: linear-gradient(90deg, ${color}05 0%, transparent 100%); margin-bottom: 80px;">
                
                <div class="project-hero" style="display: flex; flex-wrap: wrap; gap: 40px; align-items: center; margin-bottom: 40px;">
                    <div class="project-info" style="flex: 1; min-width: 250px;">
                        <h3 style="color: ${color}; text-shadow: 0 0 15px ${color}50; font-size: clamp(1.8rem, 6vw, 2.5rem); margin-bottom: 15px;">${displayTitle}</h3>
                        <p style="color: var(--text-muted); font-size: 1.15rem; line-height: 1.8;">${desc}</p>
                    </div>
                    <div class="project-cover" style="flex: 1.5; min-width: 250px; display: flex; justify-content: flex-end;">
                        <img loading="lazy" src="${coverSrc}" alt="${coverImg} Cover" style="width: auto; max-width: 100%; height: auto; max-height: 450px; display: block; border-radius: 16px; border: 1px solid ${color}30; filter: drop-shadow(0 10px 30px rgba(0,0,0,0.5)); transition: all 0.4s ease;" onmouseover="this.style.filter='drop-shadow(0 15px 40px ${color}60)'; this.style.transform='scale(1.02)';" onmouseout="this.style.filter='drop-shadow(0 10px 30px rgba(0,0,0,0.5))'; this.style.transform='';">
                    </div>
                </div>
`;
            if (remainingImages.length > 0) {
                const singleColClass = remainingImages.length === 1 ? ' single-column' : '';
                generatedHtml += `                <div class="dynamic-grid${singleColClass}">\n`;
                remainingImages.forEach((img) => {
                    const srcPath = `./assets/${cat}/${img}`.replace(/\\/g, '/');
                    generatedHtml += `                    <img loading="lazy" src="${srcPath}" alt="${img}" class="grid-img" style="border: 1px solid ${color}30; width: 100%; height: auto; border-radius: 12px; transition: all 0.4s ease;" onmouseover="this.style.filter='drop-shadow(0 10px 20px ${color}60)'; this.style.borderColor='${color}80'; this.style.transform='translateY(-5px) scale(1.02)';" onmouseout="this.style.filter=''; this.style.borderColor='${color}30'; this.style.transform='';">\n`;
                });
                generatedHtml += `                </div>\n`;
            }
            generatedHtml += `            </div>\n`;
        }
    }
});

const startTagRegex = /<!-- Portfolio Works Card -->\s*<section class="card works-card"[^>]*>/;
const endTag = '</section>';

const startIndex = html.search(startTagRegex);
if (startIndex !== -1) {
    const afterStart = html.substring(startIndex);
    const endIndex = startIndex + afterStart.indexOf(endTag) + endTag.length;
    
    const exactStartTag = html.match(startTagRegex)[0];
    
    // Ensure id="works" is preserved on the section tag
    const sectionTagWithId = exactStartTag.includes('id="works"') ? 
        exactStartTag : 
        exactStartTag.replace('<section class="card works-card"', '<section class="card works-card" id="works"');
    
    const newHtml = html.substring(0, startIndex) + 
                    sectionTagWithId + '\n' + 
                    generatedHtml + 
                    '        ' + endTag + 
                    html.substring(endIndex);
                    
    fs.writeFileSync(indexPath, newHtml, 'utf-8');
    console.log("Successfully updated index.html with main categories and proper ordering!");
} else {
    console.log("Could not find works-card section in index.html");
}
