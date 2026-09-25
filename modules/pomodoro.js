App.register({
  id: 'pomodoro',
  title: 'Pomodoro',
  icon: '◷',
  description: 'Punë e fokusuar 25 minuta, pastaj pushim 5 minuta.',
  render(root, { h, toast }) {
    const MODES = { pune: 25 * 60, pushim: 5 * 60 };
    let mode = 'pune', left = MODES[mode], timer = null;

    const display = h('div', { style: 'font-size:clamp(3rem,12vw,5.5rem);font-weight:700;font-variant-numeric:tabular-nums;text-align:center;margin:10px 0' });
    const label = h('p', { class: 'muted', style: 'text-align:center;margin:0' });
    const startBtn = h('button', { class: 'btn', onclick: toggle }, 'Fillo');

    function draw() {
      const m = String(Math.floor(left / 60)).padStart(2, '0');
      const s = String(left % 60).padStart(2, '0');
      display.textContent = `${m}:${s}`;
      label.textContent = mode === 'pune' ? 'Koha për punë' : 'Koha për pushim';
      startBtn.textContent = timer ? 'Pauzë' : 'Fillo';
    }
    function tick() {
      left--;
      if (left <= 0) {
        mode = mode === 'pune' ? 'pushim' : 'pune';
        left = MODES[mode];
        toast(mode === 'pushim' ? 'Bravo! Bëj një pushim.' : 'Kthehu në punë!');
      }
      draw();
    }
    function toggle() {
      if (timer) { clearInterval(timer); timer = null; }
      else timer = setInterval(tick, 1000);
      draw();
    }
    function reset() {
      clearInterval(timer); timer = null;
      mode = 'pune'; left = MODES[mode]; draw();
    }

    root.append(h('div', { class: 'card' }, label, display,
      h('div', { class: 'row', style: 'justify-content:center' },
        startBtn, h('button', { class: 'btn ghost', onclick: reset }, 'Rifillo'))));
    draw();

    // Funksioni që kthehet thirret kur largohesh nga moduli.
    return () => clearInterval(timer);
  },
});
