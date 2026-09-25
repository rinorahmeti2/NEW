# Në Vendlindje

Demo e një platforme për mërgatën: klientët jashtë vendit porosisin punë për shtëpinë
dhe prindërit në Kosovë (pastrim, riparime, blerje ushqimesh, fatura, aeroport etj.),
dhe e shohin punën e kryer me foto para dhe pas.

Hape `index.html` në shfletues. Nuk ka nevojë për instalim.

## Çfarë ka
- **Shërbimet:** 31 shërbime në 8 kategori, me kërkim, filtra dhe porosi me shumë shërbime njëherësh.
- **Porositë e mia:** statusi (E re → E pranuar → Në punë → Përfunduar) dhe fotot para dhe pas.
- **Paneli i pronarit:** ndryshon statusin, cakton punëtorin, ngarkon fotot dhe **shton shërbime ose kategori të reja**.

Të dhënat ruhen në shfletues (localStorage). Për përdorim të vërtetë duhet një server
me databazë, llogari për përdoruesit dhe pagesa online.

## Shërbime të reja në kod
Shërbimet bazë janë te lista `BASE_SERVICES` në `index.html`. Çdo rresht:
`['kategoria', 'Emri', çmimi, 'njësia', 'Përshkrimi', 'Etiketa opsionale']`.
