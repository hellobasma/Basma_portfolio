const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const assetsDir = path.join(__dirname, 'assets');

async function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            await processDirectory(fullPath);
        } else if (file.match(/\.(jpg|jpeg|png)$/i)) {
            try {
                // If the file is already small (under 200kb), we can skip or just optimize it.
                // But let's just resize everything to max 1200px width.
                const tempPath = fullPath + '.tmp';
                await sharp(fullPath)
                    .resize(1200, null, { withoutEnlargement: true }) // Max 1200px width
                    .jpeg({ quality: 75, force: false }) // compress JPEG
                    .png({ quality: 75, force: false }) // compress PNG
                    .toFile(tempPath);
                
                // Replace original with compressed
                fs.renameSync(tempPath, fullPath);
                console.log(`Compressed: ${fullPath}`);
            } catch (err) {
                console.error(`Failed to compress ${fullPath}:`, err);
            }
        }
    }
}

processDirectory(assetsDir).then(() => {
    console.log('All images compressed successfully!');
});
