# Polish Speedway Simulator

## Wersja 1.02

Pełne wydanie 1.02 z przebudowanym modelem progresji kariery, poprawkami interaktywnych biegów i finansów oraz nowym systemem pomocy dla początkujących. Bazą techniczną jest ostatnia poprawiona gałąź 1.02.1, dlatego zachowana została kompatybilność z jej zapisami.

### Tutorial i przewodnik

- Dodano stały przycisk **PRZEWODNIK** w górnym menu.
- Przewodnik ma rozdziały dotyczące: początku kariery, OVR i umiejętności, punktów rozwoju, trajektorii kariery, ligi, finansów, teamu, transferów, biegów interaktywnych, turniejów, reprezentacji oraz zdrowia.
- Dodano opcjonalną **Karierę z tutorialem**: pięcioetapowy onboarding przy rozpoczęciu nowej kariery.
- Dodano jednorazowe, kontekstowe wskazówki przy pierwszym zetknięciu z wybranymi systemami.
- Podpowiedzi można wyłączyć oraz uruchomić tutorial ponownie z poziomu Przewodnika.
- Tutorial tłumaczy mechaniki i konsekwencje, ale nie ujawnia ukrytych wzorów ani jednej „optymalnej” strategii.

### Punkty rozwoju — poprawiony interfejs

- Przycisk rozwoju pokazuje teraz jednoznacznie **`+1 • koszt PR`**.
- Np. `+1 • 11 PR` oznacza, że wydajesz 11 punktów rozwoju i podnosisz umiejętność dokładnie o 1.
- Gdy kolejny punkt przekracza aktualny naturalny próg cechy i koszt jest podwyższony, przycisk jest delikatnie oznaczony na czerwono.
- Przewodnik zawiera tabelę bazowych kosztów oraz wyjaśnienie miękkiego progu, wieku i naturalnego rozwoju.

### Team i wydawanie pieniędzy

- Usunięto obowiązkowy sezonowy modal „Jak wykorzystujesz zgromadzony kapitał?”.
- Rozwój teamu jest teraz **stałą sekcją dostępną z centrum kariery**.
- Zakupy nie działają jako „albo–albo”: można kupić kilka różnych usług w sezonie albo nie kupować nic.
- We wczesnej karierze wyświetlane są głównie relatywnie tanie usługi jednorazowe, zamiast inwestycji za kilkaset tysięcy złotych.
- Duże, stałe inwestycje w bazę odblokowują się wraz z poziomem sportowym, reputacją i skalą finansów.
- Brak zakupu nie jest osobną decyzją i nie powoduje kary.

### Zachowane poprawki 1.02 / 1.02.1

- Naturalniejsze trajektorie: częsty układ **rozwój → peak / plateau → regres**, ale nadal możliwe są wcześniejszy peak, późny rozkwit, druga młodość, odbudowa i wyjątkowa długowieczność.
- Wynik ruletki w biegu nie jest ujawniany przed końcem animacji.
- Sukces decyzji oznacza sportowe powodzenie konkretnego zamiaru; ograniczono paradoksy typu „niepowodzenie → najlepszy rezultat”.
- Start ma osobną logikę od dalszych faz biegu.
- Wyjątkowy sukces jest mniejszym podzbiorem całej puli powodzenia.
- Poprawiono ciągłość pozycji w biegu, narrację 5:1, zgodność mentora z dostępnymi decyzjami i nadmierny bias w stronę krawężnika.
- DMŚJ jest imprezą reprezentacyjną, a nie fikcyjnym wielorundowym cyklem; usunięto absurdalne premie finansowe.
- Tylko SGP, SEC, SGP2 i wielorundowy IMP korzystają z pełnego rozliczenia cyklu.
- Dodano Speedway of Nations w formacie trzyosobowej kadry i siedmiu reprezentacji w finale.
- Zachowano gratyfikacje finansowe za zawody pozaligowe oraz późniejsze rozliczenia cykli.
- Na końcu kariery pozostają stałe przyciski „Nowa kariera” i „Postaw kawę” oraz automatyczny pop-up z obiema opcjami.

### Zapis gry

Dla zachowania kompatybilności z ostatnią poprawioną gałęzią 1.02 gra nadal używa wewnętrznego klucza zapisu `pss_v1021` i migruje starsze zapisy 1.02 / 1.01 oraz obsługiwane historyczne wersje.

### Pliki wydania

Do publikacji potrzebne są:

- `index.html`
- `style.css`
- `app.js`
- `postaw-kawe.jpeg`
- `social-preview.jpg`
- `speedway-emblem.png`

Trzy pliki graficzne nie zostały zmienione i nie są dołączane ponownie do tej paczki roboczej. Przy aktualizacji obecnego deploymentu należy pozostawić je na serwerze i podmienić `index.html`, `style.css`, `app.js` oraz opcjonalnie `README.md`.

### Publikacja

Gra jest statyczna i nie wymaga procesu buildowania. Może być publikowana bezpośrednio na Vercel, GitHub Pages, Netlify lub Cloudflare Pages.

## Adres projektu

- `https://polishspeedway.vercel.app/`
