# Polish Speedway Simulator

## Wersja 1.02.3

Wersja 1.02.3 rozwija wydanie 1.02.2 przede wszystkim w czterech obszarach: kwalifikacje i reprezentacja, Speedway of Nations, spójność biegów interaktywnych oraz podsumowanie kariery. Zachowuje tutorial, easter eggi, przebudowany team, ekonomię i model progresji z poprzednich wydań.

### Kwalifikacje i cykle

- Dodano rzeczywistą ścieżkę **SGP2: nominacja krajowa → kwalifikacje SGP2 → trzyrundowy cykl SGP2**.
- Kwalifikacje SGP2 są 20-biegowym turniejem 16 zawodników; **TOP 4** awansuje do cyklu.
- Bardzo mocny junior, np. 17-latek OVR 76, ma bardzo wysoką szansę otrzymania nominacji, ale awans nadal trzeba wywalczyć na torze.
- Kwalifikacje SGP2 są rozdzielone od właściwego SGP2 w historii i podsumowaniu kariery.
- Zbalansowano **eliminacje IMP**: zwykle słabsza stawka niż w IMP Challenge, bo polscy uczestnicy SGP i SEC mają miejsce w IMP z urzędu.
- OVR 78–82 powinien być mocnym kandydatem do przejścia eliminacji, a zawodnicy 72–75 mogą awansować przy dobrym turnieju.
- **IMP Challenge** pozostaje trudniejszy, ale nie jest już „mini-SGP”; OVR 85 powinien być mocnym kandydatem do awansu.
- Zwiększono wagę nominalnego OVR w efektywnym ratingu turniejowym.

### Reprezentacja

- Nominacje do seniorskiej reprezentacji zależą przede wszystkim od realnego poziomu sportowego: OVR, średniej, poziomu ligi i aktualnej formy. Reputacja jest tylko dodatkiem.
- Młody zawodnik może dostać seniorskie powołanie, ale musi być rzeczywiście konkurencyjny wobec seniorów.
- Powołanie nie oznacza już automatycznie pięciu startów: rola w kadrze może dać 2–5 biegów.
- Słabszy indywidualny występ przy medalu drużyny jest opisywany osobno, a bonusy reputacji/rozwoju zależą również od osobistego wkładu.
- Obniżono siłę rywali U21 w DMŚJ. Większość mocnych juniorów mieści się teraz w realistyczniejszym zakresie, a OVR 87+ jest rzadki; 89–90 to skrajny wyjątek.
- Siła juniora uwzględnia także wiek — 20–21-latek może być naturalnie mocniejszy od 17-latka.

### Speedway of Nations

- SoN jest pełnoprawnym turniejem: **7 reprezentacji, 21 biegów fazy zasadniczej, każda para spotyka każdą raz**.
- Punktacja SoN to **4–3–2–0**, więc jazda parą ma realne znaczenie.
- Po fazie zasadniczej rozgrywany jest **Grand Final Qualifier**, a następnie **Grand Final**.
- Rywale Polski są losowani z puli współczesnych mocnych nacji żużlowych; każda reprezentacja ma generowaną trzyosobową kadrę i wyświetlany średni OVR.
- Ekran powołania pokazuje tor, sześciu rywali, średnią siłę kadr oraz rolę zawodnika — bez zbędnego tłumaczenia całego regulaminu.
- Polskie biegi można rozgrywać kolejno; pozostałe biegi są symulowane.
- Medal Speedway of Nations uruchamia ekran celebracyjny z fajerwerkami.

### PGE Ekstraliga

- W podglądzie fazy finałowej dodano brakujący **dwumecz o 3. miejsce**.

### Biegi interaktywne

- Kolor ruletki jest nadrzędnym źródłem wyniku narracyjnego:
  - fioletowy = wyjątkowy sukces,
  - zielony = sukces,
  - pomarańczowy = niepowodzenie,
  - czerwony = incydent.
- Zielony lub fioletowy wynik nie może już generować tekstu „decyzja nie wychodzi”.
- Przy decyzjach taktycznych sukces może nie zmienić pozycji, ale narracja jasno mówi, że sam plan został wykonany dobrze.
- Dopuszczono rzadkie większe zmiany pozycji: awans o dwie pozycje oraz większy spadek po poważnym błędzie.
- Dodano małą szansę **defektu**. Ryzyko maleje wraz z jakością sprzętu i zaplecza technicznego.
- Jeśli zawodnik jedzie 2., 3. lub 4. i bezpośrednio przed nim jest rywal, generator pilnuje dostępności realnej opcji ataku.
- Krawężnik nie jest już domyślnym fallbackiem dla neutralnej taktyki; preferowana linia wynika z umiejętności i warunków toru.
- Po jawnej zmianie warunków toru mentor nie może bez uzasadnienia sugerować linii sprzecznej z wyświetloną informacją.
- Ograniczono powtarzanie pozycji i tych samych informacji w jednym ekranie biegu.
- Dodano globalną normalizację interpunkcji w dynamicznie składanych tekstach.

### Dzika karta IMP i SEC

- Po wygranej rywalizacji o dziką kartę IMP ekran jednoznacznie mówi, że zawodnik **został wybrany**, zamiast nadal nazywać go „jednym z kandydatów”.
- Start z dziką kartą IMP jest pełnoprawnym startem rundy: zdobyte punkty liczą się do klasyfikacji generalnej całego cyklu.
- Analogicznie pojedynczy start z dziką kartą SEC daje miejsce w generalce, jeśli zawodnik zdobył punkty.
- Podsumowanie kariery scala wszystkie starty IMP niezależnie od sposobu kwalifikacji.

### Wyniki cykli

- Końcowy popup SGP, SEC, IMP i SGP2 pokazuje kompaktowo:
  - udział w rundach X/Y,
  - liczbę zwycięstw rund,
  - liczbę podiów,
  - najlepszy wynik rundy,
  - sumę punktów.
- Szczegółowe finanse nadal są pokazywane później, a nie w natychmiastowym ekranie wyniku.

### Osiągnięcia i podsumowanie kariery

- Poprawiono dane „ostatnio” — karta pokazuje rzeczywisty ostatni wynik zawodów, a nie powód nominacji.
- Grand Prix Challenge nie pobiera już jako ostatniego wyniku rezultatu wcześniejszych eliminacji SGP Challenge.
- Kwalifikacje nie używają ikon medalowych jak imprezy mistrzowskie; zamiast tego pokazują wygrane, podia i najlepsze miejsce.
- **DMPJ** ma czytelniejszy zapis najlepszego miejsca/fazy oraz lat powtórzenia wyniku.
- SEC jest opisane jako **Indywidualne Mistrzostwa Europy — SEC**.
- Dodano kartę **Kwalifikacje SGP2**.
- Dzikie karty SEC/IMP są uwzględniane w generalce i statystykach odpowiedniego cyklu.

### Celebracje

- Podium **Brązowego Kasku** i **Srebrnego Kasku** uruchamia fajerwerki.
- Medal SGP2 oraz medal Speedway of Nations również są celebrowane.
- Ujednolicono zapis punktów: po liczbie jest zawsze **`pkt.`**, nigdy `Pkt.`.

### Odmiana miejscowości

- Rozszerzono centralny słownik odmiany miast, m.in. **w Krośnie, w Grudziądzu, we Wrocławiu, w Pardubicach**.
- Dynamiczne komunikaty korzystają z jednej warstwy normalizacji, aby ograniczyć formy typu „w Wrocław”.

### Stabilność przepływu sezonu

- Watchdog sezonu nie uruchamia już fałszywego recovery po prawidłowym rozliczeniu sezonu.
- Po rozliczeniu sezonu stan przechodzi do jawnego etapu `post-season`, a watchdog zostaje wyłączony.
- Awaryjne odblokowanie nie powinno już proponować ponownego rozegrania sezonu, który został już rozliczony.

### Zachowane elementy 1.02.2

- Easter eggi: Bartosz Zmarzlik #95, Jakub Woźnik, Super Burschi.
- Stały OVR specjalnych profili przy losowanym rozkładzie statystyk.
- Kompaktowy header z logo po lewej i przyciskiem **Nowa kariera** po prawej.
- Tutorial, Przewodnik i kontekstowe podpowiedzi.
- System teamu/usług oraz przypomnienie o niewykorzystywanym zapleczu.
- Model kariery: rozwój → peak/plateau → regres z wyjątkami i różnymi przyczynami zakończenia kariery.

### Zapis gry

Wersja 1.02.3 używa klucza `pss_v1023`. Przy pierwszym uruchomieniu automatycznie migruje zapis z `pss_v1022`, `pss_v1021`, `pss_v102` oraz obsługiwanych starszych wersji.

### Pliki wydania

Do publikacji potrzebne są:

- `index.html`
- `style.css`
- `app.js`
- `postaw-kawe.jpeg`
- `social-preview.jpg`
- `speedway-emblem.png`

Trzy pliki graficzne nie zostały zmienione i nie są ponownie dołączane do paczki. Przy aktualizacji istniejącego deploymentu należy pozostawić je na serwerze.

### Publikacja

Gra jest statyczna i nie wymaga procesu buildowania. Może być publikowana bezpośrednio na Vercel, GitHub Pages, Netlify lub Cloudflare Pages.

## Adres projektu

`https://polishspeedway.vercel.app/`
