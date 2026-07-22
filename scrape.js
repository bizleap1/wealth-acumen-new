import * as cheerio from 'cheerio';
import fs from 'fs';

async function analyzeSite() {
  try {
    const response = await fetch('https://wealthacumen.in/');
    const html = await response.text();
    const $ = cheerio.load(html);
    
    let structure = [];
    
    // Find all headings
    $('h1, h2, h3').each((i, el) => {
      const tag = $(el).prop('tagName').toLowerCase();
      const text = $(el).text().trim().replace(/\s+/g, ' ');
      if (text) {
        structure.push(`${tag}: ${text}`);
      }
    });

    console.log("Site Structure:");
    console.log(structure.join('\n'));
    fs.writeFileSync('site-structure.txt', structure.join('\n'));
  } catch (error) {
    console.error("Error analyzing site:", error);
  }
}

analyzeSite();
