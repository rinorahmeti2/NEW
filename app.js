// Bërthama e aplikacionit: regjistron modulet, i shfaq dhe u jep mjete të përbashkëta.
const App = (() => {
  const modules = [];
  let current = null;
  let cleanup = null;

  const $ = (sel) => document.querySelector(sel);

  // Ruajtje e thjeshtë në localStorage, e ndarë për çdo modul.
  function storageFor(id) {
    const key = (k) => `hapesira:${id}:${k}`;
    return {
      get(k, fallback) {
        try {
          const v = localStorage.getItem(key(k));
          return v === null ? fallback : JSON.parse(v);
        } catch { return fallback; }
      },
      set(k, value) {
        try { localStorage.setItem(key(k), JSON.stringify(value)); } catch {}
      },
    };
  }

  let toastTimer;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2000);
  }

  // Ndihmës për të krijuar elemente HTML: h('button', { class: 'btn', onclick }, 'Tekst')
  function h(tag, attrs = {}, ...children) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else if (k === 'class') el.className = v;
      else el.setAttribute(k, v);
    }
    for (const c of children.flat()) el.append(c instanceof Node ? c : String(c));
    return el;
  }

  function register(mod) {
    if (!mod.id || !mod.title || typeof mod.render !== 'function') {
      console.error('Moduli duhet të ketë id, title dhe render()', mod);
      return;
    }
    modules.push({ icon: '•', description: '', ...mod });
  }

  function open(id) {
    const mod = modules.find((m) => m.id === id) || modules[0];
    if (!mod) return;
    if (typeof cleanup === 'function') cleanup();
    current = mod;
    $('#module-title').textContent = mod.title;
    $('#module-desc').textContent = mod.description;
    const root = $('#module-root');
    root.replaceChildren();
    cleanup = mod.render(root, { storage: storageFor(mod.id), toast, h });
    location.hash = mod.id;
    renderNav();
  }

  function renderNav() {
    $('#nav').replaceChildren(...modules.map((m) =>
      h('button', { class: 'nav-item' + (m === current ? ' active' : ''), onclick: () => open(m.id) },
        h('span', { class: 'nav-icon' }, m.icon), m.title)
    ));
  }

  // Paleta e komandave (Ctrl+K)
  function setupPalette() {
    const pal = $('#palette'), input = $('#palette-input'), list = $('#palette-list');
    let sel = 0, results = [];

    const draw = () => {
      const q = input.value.toLowerCase();
      results = modules.filter((m) => (m.title + ' ' + m.description).toLowerCase().includes(q));
      sel = Math.min(sel, Math.max(results.length - 1, 0));
      list.replaceChildren(...results.map((m, i) =>
        h('li', { class: i === sel ? 'sel' : '', onclick: () => choose(m) }, h('span', {}, m.icon), m.title)
      ));
    };
    const show = () => { pal.hidden = false; input.value = ''; sel = 0; draw(); input.focus(); };
    const hide = () => { pal.hidden = true; };
    const choose = (m) => { hide(); open(m.id); };

    $('#open-palette').addEventListener('click', show);
    pal.addEventListener('click', (e) => { if (e.target === pal) hide(); });
    input.addEventListener('input', () => { sel = 0; draw(); });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { sel = Math.min(sel + 1, results.length - 1); draw(); e.preventDefault(); }
      if (e.key === 'ArrowUp') { sel = Math.max(sel - 1, 0); draw(); e.preventDefault(); }
      if (e.key === 'Enter' && results[sel]) choose(results[sel]);
      if (e.key === 'Escape') hide();
    });
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        pal.hidden ? show() : hide();
      }
    });
  }

  function setupTheme() {
    const store = storageFor('app');
    const apply = (t) => document.documentElement.setAttribute('data-theme', t);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let theme = store.get('theme', prefersDark ? 'dark' : 'light');
    apply(theme);
    $('#theme-toggle').addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      apply(theme);
      store.set('theme', theme);
    });
  }

  function start() {
    setupTheme();
    setupPalette();
    open(location.hash.slice(1));
  }

  return { register, start, h, toast };
})();
