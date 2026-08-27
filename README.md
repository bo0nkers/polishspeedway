# Polish Speedway Simulator

## Wersja 1.02.5

Drobne wydanie rozwijające 1.02.4. Główna zmiana dotyczy czytelności tabeli **„Sezon po sezonie”** w podsumowaniu kariery na telefonach.

### Zmiany 1.02.5
- Mobilna historia kariery pozostaje zwartą tabelą, zamiast przechodzić w wysokie kafelki.
- Skrócono nagłówki na telefonach: `SEZ.`, `W`, `OVR`, `KLUB`, `LIGA`, `B`, `ŚR`, `WYN.`.
- Skrócono nazwy lig wyłącznie w wersji mobilnej:
  - `PGE Ekstraliga` → `PGE`,
  - `Metalkas 2. Ekstraliga` → `M2E`,
  - `Krajowa Liga Żużlowa` → `KLŻ`.
- Wynik sezonu na telefonie ma krótki zapis, np. `5. m.`, `1. m. ↑`, `8. m. ↓`.
- Rok, wiek, OVR, liczba biegów, średnia i wynik nie łamią się już pionowo na kilka linii.
- Więcej szerokości przeznaczono na nazwę klubu; tylko dłuższe nazwy klubów mogą naturalnie przechodzić do kolejnej linii.
- Desktop zachowuje pełne nazwy lig, pełne opisy wyników i dotychczasowy wygląd tabeli.

### Kompatybilność zapisu
Wersja 1.02.5 używa klucza `pss_v1025` i automatycznie migruje zapis z `pss_v1024` oraz obsługiwanych wcześniejszych wersji.

### Pliki do publikacji
Podmień:
- `index.html`
- `style.css`
- `app.js`
- `README.md`

Grafiki pozostają bez zmian:
- `speedway-emblem.png`
- `postaw-kawe.jpeg`
- `social-preview.jpg`
