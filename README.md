# Polish Speedway Simulator

## Wersja 1.02 — przebudowana

Ta paczka ponownie używa numeru **1.02**, ale zawiera pełną przebudowę najważniejszych mechanizmów zgłoszonych podczas testów kariery i biegów interaktywnych.

### Najważniejsze zmiany

- **Przebudowana trajektoria kariery** — typowa kariera znacznie częściej ma układ: rozwój → szczyt / plateau → regres. Peak na samym końcu kariery ma być wyjątkiem, a nie regułą. Nadal możliwe są wcześni fenomeni, późny rozkwit, stagnacja, odbudowa i rzadka druga młodość.
- **Mocniejsza biologiczna korekta po peaku** działa na konkretne statystyki, a nie przez sztuczne odejmowanie OVR. Rozwój po szczycie jest dużo trudniejszy, a bardzo mocna regularna konkurencja częściej pomaga utrzymać poziom niż dalej bez końca go podnosić.
- **Jakość rywali wpływa na rozwój** — regularna jazda przeciw mocniejszym zawodnikom daje lepszy bodziec niż identyczna liczba biegów w słabszej stawce. Liczy się jednak również faktyczna liczba startów, więc ławka w wyższej lidze nie jest automatycznie lepsza od regularnej jazdy poziom niżej.
- **Kondycja nie pompuje się automatycznie do 99**. Baza treningowa i drogie zaplecze rozkładają korzyści również na start, technikę, dystans, ustawienia i psychikę.
- Zachowano i dopracowano **warunkowe wydarzenia rozwojowe**: przełom techniczny, złapany rytm, ściana rozwoju, przebudowa stylu, zgranie z mechanikiem, kryzys pewności siebie, adaptacja po kontuzji, późne zrozumienie żużla, przeciążenie kalendarzem i wpływ nowego środowiska po transferze.

### Interaktywne biegi

- **Procent przy decyzji oznacza realną szansę powodzenia konkretnego zamiaru.** Udany atak daje awans, udana obrona utrzymuje pozycję, a niepowodzenie nie może normalnie przynieść lepszego skutku niż sukces.
- Szanse są liczone z uwzględnieniem m.in. OVR gracza i rywali, właściwych umiejętności, formy dnia, toru, ustawień, sprzętu, teamu/mechanika, mentora, aktualnej pozycji i charakteru decyzji.
- **Wyjątkowy sukces jest częścią całej puli powodzenia** i nie może być częstszy od zwykłego sukcesu.
- **Start ma osobną logikę**: wszyscy ruszają równocześnie, więc wynik startu dopiero ustala kolejność po pierwszym łuku. Nie ma narracji typu „spadasz z 2. na 3.” względem pola startowego.
- Usunięto paradoksy typu **niepowodzenie najbezpieczniejszej strategii → P1** bez wyraźnego zdarzenia po stronie rywali.
- Stan biegu jest **ciągły między kolejnymi decyzjami** — pozycje nie są losowane od zera po każdym etapie. Duża nagła zmiana układu wymaga rzeczywistego, opisanego incydentu.
- **Mentor poleca tylko dostępne strategie**. Jeśli sensowna rekomendacja nie mieści się w podstawowych trzech wariantach, gra może dodać czwartą opcję.
- **Wynik ruletki nie jest zdradzany przed końcem animacji**. Etykieta rezultatu, opis sportowego skutku i przycisk „Kontynuuj” pojawiają się dopiero po pełnym zatrzymaniu losowania.
- Narracja meczowa uwzględnia **wynik dwumeczu i liczbę pozostałych biegów**, zamiast automatycznie sugerować zbliżające się zwycięstwo.

### Turnieje i reprezentacja

- Dodano okresową możliwość startu w **Speedway of Nations**: 3 zawodników w kadrze, 7 reprezentacji w finale, a zawodnik podstawowej pary może pojechać **6 biegów** — po jednym przeciw każdemu z sześciu rywali narodowych.
- Wszystkie ważniejsze zawody pozaligowe otrzymały **gratyfikacje finansowe** dopasowane do prestiżu, etapu i wyniku. Stawki są celowo umiarkowane, żeby kontrakt ligowy pozostał głównym źródłem dochodu.
- Dla cykli **SGP, SEC, IMP i SGP2** późniejszy ekran wyniku pokazuje rozliczenie: udział w rundach X/Y, zwycięstwa, podia, nagrody za rundy, premię końcową, ewentualny bonus sponsora i łączną kwotę.
- Pełne rozliczenie finansowe cyklu **nie pojawia się na ekranie celebracji/„wybuchającym”**, tylko w spokojnym późniejszym ekranie informacyjnym.

### Finanse i team

- Dodano droższe sposoby wykorzystania nadwyżek budżetowych: program tunerski i silnik rezerwowy, prywatne testy torowe, regenerację premium oraz pełny program profesjonalnego teamu.
- Są to **money sinki z malejącą korzyścią**, a nie możliwość kupienia sobie OVR 99.

### UI

- Po rozpoczęciu kariery widok wraca na samą górę strony.
- Mobilne podsumowanie „Sezon po sezonie” pozostaje **zwartą tabelą**, aby łatwiej zmieścić historię kariery na 1–2 zrzutach ekranu.
- Na końcu kariery pozostają dwa wyraźne wybory: **„Nowa kariera”** oraz istniejący przycisk/grafika **„Postaw kawę”**.

## Zapis gry

Wersja 1.02 używa klucza `pss_v102`. Gra zachowuje migrację z `pss_v101` oraz starszych obsługiwanych zapisów.

## Pliki wydania

Do publikacji potrzebne są:

- `index.html`
- `style.css`
- `app.js`
- `postaw-kawe.jpeg`
- `social-preview.jpg`
- `speedway-emblem.png`

Trzy pliki graficzne nie zostały zmienione. Jeśli podmieniasz istniejący deployment, pozostaw je na serwerze i wgraj nowe `index.html`, `style.css`, `app.js` oraz `README.md`.

## Publikacja

Gra jest statyczna i nie wymaga procesu buildowania. Może być publikowana m.in. na Vercel, GitHub Pages, Netlify lub Cloudflare Pages.

## Adres projektu

- `https://polishspeedway.vercel.app/`
