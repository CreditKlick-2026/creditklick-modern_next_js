const http = require('http');

function checkUrl(url) {
  http.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(url, 'status:', res.statusCode);
      console.log('  Includes 1st:', data.includes('1st'));
      console.log('  Includes CreditKlick:', data.includes('CreditKlick'));
    });
  }).on('error', err => console.error(err));
}

checkUrl('http://localhost:3001/animations/SDDesktopBanner_v2.json');
checkUrl('http://localhost:3001/animations/SDDesktopBanner.json');
checkUrl('http://localhost:3001/animations/SDMobileBanner_v2.json');
checkUrl('http://localhost:3001/animations/SDMobileBanner.json');
