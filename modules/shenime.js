App.register({
  id: 'shenime',
  title: 'Shënime',
  icon: '✎',
  description: 'Një bllok shënimesh që ruhet ndërsa shkruan.',
  render(root, { storage, h }) {
    const area = h('textarea', {
      class: 'input',
      style: 'width:100%;min-height:360px;resize:vertical;line-height:1.6',
      placeholder: 'Shkruaj këtu…',
    });
    area.value = storage.get('text', '');
    const info = h('p', { class: 'muted', style: 'margin:10px 0 0;font-size:.9rem' });
    const count = () => {
      const words = area.value.trim().split(/\s+/).filter(Boolean).length;
      info.textContent = `${words} fjalë · ${area.value.length} karaktere`;
    };
    area.addEventListener('input', () => { storage.set('text', area.value); count(); });
    count();
    root.append(h('div', { class: 'card' }, area, info));
  },
});
