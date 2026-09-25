# Hapësira Ime

Një aplikacion web personal i ndërtuar me **module**. Çdo funksion (detyrat, shënimet,
pomodoro, fjalëkalimet…) është një skedar i vetëm në `modules/`, dhe ti mund të shtosh
sa të duash pa prekur pjesën tjetër.

Nuk ka nevojë për instalim apo build — vetëm HTML, CSS dhe JavaScript.

## Si ta hapësh

Hape `index.html` direkt në shfletues, ose nise me një server të vogël:

```bash
python3 -m http.server 8000
# pastaj hap http://localhost:8000
```

## Çfarë ka brenda

| Moduli       | Çfarë bën                                   |
|--------------|---------------------------------------------|
| Detyrat      | Listë detyrash me shenjë “e kryer”          |
| Shënime      | Bllok shënimesh me ruajtje automatike       |
| Pomodoro     | Kohëmatës 25/5 minuta për fokus             |
| Fjalëkalime  | Gjenerues fjalëkalimesh të sigurta          |

Plus: temë e errët/e çelët, dhe **Ctrl+K** për të kërkuar shpejt çdo modul.
Të dhënat ruhen në shfletuesin tënd (localStorage).

## Si të shtosh një funksion të ri

1. Krijo një skedar të ri, p.sh. `modules/numeruesi.js`:

```js
App.register({
  id: 'numeruesi',          // emër unik, pa hapësira
  title: 'Numëruesi',       // shfaqet në menu
  icon: '#',                // një emoji ose simbol
  description: 'Një numërues i thjeshtë.',
  render(root, { storage, toast, h }) {
    let n = storage.get('n', 0);
    const show = h('h2', {}, n);
    const plus = () => { n++; storage.set('n', n); show.textContent = n; };

    root.append(h('div', { class: 'card' },
      show,
      h('button', { class: 'btn', onclick: plus }, '+1')));
  },
});
```

2. Shto një rresht në `index.html`, para `App.start()`:

```html
<script src="modules/numeruesi.js"></script>
```

3. Rifresko faqen — moduli yt shfaqet në menu. Gati!

### Mjetet që merr çdo modul

- `root` — elementi ku vizaton modulin.
- `storage.get(çelësi, vleraFillestare)` / `storage.set(çelësi, vlera)` — ruan të dhëna që mbeten pas rifreskimit.
- `toast('mesazh')` — shfaq një njoftim të vogël.
- `h(tag, atributet, ...fëmijët)` — krijon elemente HTML shpejt.
- Nëse `render` kthen një funksion, ai thirret kur largohesh nga moduli (p.sh. për të ndalur kohëmatës).

Klasat CSS të gatshme: `card`, `row`, `input`, `btn`, `btn ghost`, `btn danger`, `muted`.
