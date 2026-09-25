App.register({
  id: 'detyrat',
  title: 'Detyrat',
  icon: '✓',
  description: 'Lista e gjërave për të bërë. Ruhet automatikisht.',
  render(root, { storage, h }) {
    let items = storage.get('items', []);
    const save = () => storage.set('items', items);

    const input = h('input', { class: 'input', placeholder: 'Shto një detyrë…' });
    const list = h('div', { style: 'margin-top:16px;display:flex;flex-direction:column;gap:6px' });
    const stats = h('p', { class: 'muted', style: 'margin:14px 0 0;font-size:.9rem' });

    const add = () => {
      const text = input.value.trim();
      if (!text) return;
      items.push({ id: Date.now(), text, done: false });
      input.value = '';
      save(); draw();
    };
    input.addEventListener('keydown', (e) => e.key === 'Enter' && add());

    function draw() {
      list.replaceChildren(...items.map((it) => {
        const cb = h('input', { type: 'checkbox' });
        cb.checked = it.done;
        cb.addEventListener('change', () => { it.done = cb.checked; save(); draw(); });
        return h('label', { class: 'row', style: 'padding:8px 4px;border-bottom:1px solid var(--border)' },
          cb,
          h('span', { style: `flex:1;${it.done ? 'text-decoration:line-through;opacity:.5' : ''}` }, it.text),
          h('button', { class: 'btn danger', onclick: () => { items = items.filter((x) => x !== it); save(); draw(); } }, '✕'));
      }));
      const done = items.filter((i) => i.done).length;
      stats.textContent = items.length ? `${done} nga ${items.length} të përfunduara` : 'Asnjë detyrë ende.';
    }

    root.append(h('div', { class: 'card' },
      h('div', { class: 'row' }, input, h('button', { class: 'btn', onclick: add }, 'Shto')),
      list, stats));
    draw();
    input.focus();
  },
});
