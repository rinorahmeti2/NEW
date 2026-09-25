App.register({
  id: 'fjalekalim',
  title: 'Fjalëkalime',
  icon: '🔑',
  description: 'Gjenero fjalëkalime të forta dhe të rastësishme.',
  render(root, { h, toast }) {
    const SETS = {
      shkronja: 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
      numra: '23456789',
      simbole: '!@#$%&*?-_=+',
    };
    const opts = { numra: true, simbole: true };
    let length = 16;

    const out = h('input', { class: 'input', readonly: '', style: 'font-family:monospace;font-size:1.1rem' });
    const lenLabel = h('span', {}, length);
    const slider = h('input', { type: 'range', min: '8', max: '48', value: String(length), style: 'flex:1' });
    slider.addEventListener('input', () => { length = +slider.value; lenLabel.textContent = length; gen(); });

    function gen() {
      const chars = SETS.shkronja + (opts.numra ? SETS.numra : '') + (opts.simbole ? SETS.simbole : '');
      const rnd = crypto.getRandomValues(new Uint32Array(length));
      out.value = Array.from(rnd, (n) => chars[n % chars.length]).join('');
    }
    const toggle = (key, text) => {
      const cb = h('input', { type: 'checkbox' });
      cb.checked = opts[key];
      cb.addEventListener('change', () => { opts[key] = cb.checked; gen(); });
      return h('label', { class: 'row' }, cb, text);
    };
    const copy = async () => {
      try { await navigator.clipboard.writeText(out.value); toast('U kopjua!'); }
      catch { out.select(); toast('Shtyp Ctrl+C për ta kopjuar'); }
    };

    root.append(h('div', { class: 'card', style: 'display:flex;flex-direction:column;gap:16px' },
      h('div', { class: 'row' }, out,
        h('button', { class: 'btn', onclick: copy }, 'Kopjo'),
        h('button', { class: 'btn ghost', onclick: gen }, '↻')),
      h('div', { class: 'row' }, h('span', { class: 'muted' }, 'Gjatësia:'), slider, lenLabel),
      h('div', { class: 'row', style: 'gap:20px' }, toggle('numra', 'Numra'), toggle('simbole', 'Simbole'))));
    gen();
  },
});
