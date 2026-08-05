const fs = require('fs'); 
const icons = [
    {slug:'adobephotoshop', color:'31A8FF'}, 
    {slug:'adobeillustrator', color:'FF9A00'}, 
    {slug:'adobeindesign', color:'FF3366'}, 
    {slug:'canva', color:'00C4CC'}, 
    {slug:'microsoftexcel', color:'217346'}, 
    {slug:'figma', color:'F24E1E'}
]; 
const dir = './assets/icons'; 
if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive:true}); 

Promise.all(icons.map(async i => { 
    const res = await fetch('https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/' + i.slug + '.svg'); 
    let text = await res.text(); 
    text = text.replace('<svg ', '<svg fill="#' + i.color + '" '); 
    fs.writeFileSync(dir + '/' + i.slug + '.svg', text); 
})).then(() => console.log('Done!'));
