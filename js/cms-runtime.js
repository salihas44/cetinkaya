
async function fetchJSON(url){
  const res = await fetch(url, {cache:'no-store'});
  if(!res.ok) throw new Error('fetch failed '+url);
  return res.json();
}

// Global state filled before app.js runs
window.CMS_DATA = { site: null, products: [] };

(async()=>{
  try{
    const base = (window.APP_CONFIG && window.APP_CONFIG.baseDataUrl) || "";
    const site = await fetchJSON(`${base}/site.json`);
    window.CMS_DATA.site = site;

    // Apply site info
    const nameEl = document.getElementById('footerName');
    if(nameEl) nameEl.textContent = site.title || 'Moto Çetinkaya';

    const addrEl = document.getElementById('footerAddress');
    if(addrEl) addrEl.textContent = site.address || '';

    const phoneEl = document.getElementById('footerPhone');
    if(phoneEl) phoneEl.textContent = (site.phone || '').trim();

    const waFloat = document.getElementById('waFloat');
    const waNum = (site.whatsapp || site.phone || '').replace(/[^0-9]/g,'');
    if(waFloat && waNum){ waFloat.href = `https://wa.me/${waNum}`; }

    // Load products index & items
    const index = await fetchJSON(`${base}/products/index.json`).catch(()=>({items:[]}));
    const items = index.items || [];
    const prods = [];
    for(const it of items){
      try{
        const p = await fetchJSON(`${base}/products/${it.file}`);
        prods.push(p);
      }catch(e){ console.warn('product load failed', it, e); }
    }
    window.CMS_DATA.products = prods;

    // If app.js has render hook, call it
    if(typeof window.renderProductsFromCMS === 'function'){
      window.renderProductsFromCMS(prods);
    }
  }catch(err){
    console.error('CMS runtime error', err);
  }
})();
