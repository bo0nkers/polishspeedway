# Polish Speedway Simulator

## Wersja 1.02.4

Wersja 1.02.4 rozwija 1.02.3-HOTFIX. Skupia się na pełnym formacie Speedway of Nations, czytelności podsumowań sezonu, prawidłowej kolejności celebracji, logice dzikich kart oraz ochronie młodych zawodników przed sztucznym regresem.

### Najważniejsze zmiany

#### Speedway of Nations
- DPŚ jest rozgrywany co 3 lata z kotwicą 2023 / 2026 / 2029 / 2032 itd.
- W sezonach bez DPŚ główną seniorską imprezą światową jest Speedway of Nations.
- SoN ma 7 reprezentacji i 21 biegów fazy zasadniczej; każdy jedzie z każdym dokładnie raz.
- Sześć biegów Polski jest rozłożonych na przestrzeni całego turnieju zamiast kumulować się na początku.
- Po 21 biegach działa pełna faza medalowa: 1. miejsce bezpośrednio do Grand Final, 2.–3. do Grand Final Qualifier, następnie Grand Final.
- Złoto nie jest już przyznawane po samych sześciu biegach Polski.
- Polskie biegi są rozgrywane pełnym, wieloetapowym silnikiem: start i pierwszy łuk → pierwsze okrążenie → końcówka → wynik.
- Decyzje uwzględniają partnera i specyfikę jazdy parowej; punktacja pozostaje 4–3–2–0.
- Na ekranie powołania pokazywany jest także średni OVR Polski oraz średnie OVR wszystkich pozostałych kadr.
- Pozostałe 15 biegów fazy zasadniczej jest symulowane w tle pomiędzy polskimi startami.
- Medal SoN nadal uruchamia celebrację/fajerwerki.

#### Wyniki zawodów i celebracje
- Przy awansie z kwalifikacji SGP2 najpierw pojawia się celebracja, a dopiero potem szczegółowy popup wyniku.
- Ta sama kolejność jest zachowywana przez centralny ekran wyniku: ważny sukces → fajerwerk → szczegóły.
- W podsumowaniach cykli pierwsza linia z miejscem/medalem pozostaje pogrubiona, a druga linia ze statystykami rund jest zwykłą czcionką.
- Dzikie karty IMP/SEC nie pokazują już sztucznego tekstu „około X. miejsca”.
- Popup rundy dzikiej karty pokazuje wyłącznie wynik tej rundy i informację, że punkty liczą się do generalki.
- Po kliknięciu dalej pojawia się osobny ekran z dokładnym miejscem w klasyfikacji generalnej i liczbą punktów.

#### Podsumowanie sezonu
- „Dodatkowe rozgrywki” nie są już jednym długim, nieczytelnym akapitem.
- Wyniki są prezentowane jako kompaktowe wiersze: nazwa imprezy | wynik i punkty | nagroda finansowa.
- Wydarzenia są sortowane prestiżem, z grupami: mistrzostwa świata i reprezentacja, mistrzostwa krajowe i juniorskie, kwalifikacje, turnieje prestiżowe.
- Usunięto powtórzenia punktów i zbędne „0 zł”.

#### Rozwój młodych zawodników
- Zawodnik przed swoim indywidualnym peakiem nie traci już statystyk tylko dlatego, że wyprzedził target krzywej kariery.
- Wyprzedzenie krzywej ma przede wszystkim hamować dalszy rozwój / prowadzić do plateau, a nie odbierać już zdobyte punkty.
- Przed peakiem trwały minus może wynikać z realnego negatywnego stanu, np. kryzysu formy.
- Jest to szczególnie istotne dla profilu Super Burschi, który ma rozwijać się wyjątkowo dobrze w młodym wieku.

### Kompatybilność zapisu
Wersja 1.02.4 używa klucza `pss_v1024`. Przy pierwszym uruchomieniu automatycznie migruje zapis z `pss_v1023`, a następnie z obsługiwanych starszych wersji.

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
