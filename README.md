# Polish Speedway Simulator

## Wersja 1.02.2

Wersja 1.02.2 rozwija wydanie 1.02.1 o ukryte profile specjalne oraz uporządkowany górny pasek. Zachowuje tutorial, przebudowany team, zróżnicowane zakończenia kariery, zwarte osiągnięcia, finanse turniejowe i wszystkie wcześniejsze poprawki balansu.


### Easter eggi — ukryte profile specjalne

- **Bartosz Zmarzlik + numer 95** aktywuje ukryty profil tylko przy dokładnej kombinacji nazwy i numeru. Startowy OVR wynosi dokładnie **72**, statystyki są za każdym razem inaczej rozłożone, a ośrodek zostaje przeniesiony do Gorzowa.
- **Jakub Woźnik** działa z dowolnym numerem. Startowy OVR wynosi dokładnie **69**, profil ma bardzo wysoki ukryty potencjał i trzy losowane warianty humorystycznej historii startowej.
- **Super Burschi** działa z dowolnym numerem. Startowy OVR wynosi dokładnie **76**, ma najwyższy potencjał i profesjonalizm oraz najłatwiejszą z trzech profili drogę do poziomu 97–99.
- W każdym z profili całkowity OVR jest stały, ale mocne i słabsze strony są ponownie losowane przy każdej nowej karierze.
- Gra nie pokazuje komunikatu „easter egg aktywowany”; specjalny profil ujawnia się naturalnie przez parametry i unikalny opis.

### Górny pasek

- Skrócono oznaczenie wersji do **V 1.02.2**.
- Zachowano logo, znak i napis **POLISH SPEEDWAY SIMULATOR** po lewej stronie w dotychczasowym układzie.
- **Nowa kariera** pozostaje skrajnym prawym przyciskiem na desktopie.
- Eksport i import są kompaktowymi przyciskami **EKSPORT / IMPORT**.
- Natywne szerokie pole „Wybierz plik / Nie wybrano pliku” jest ukryte; po imporcie pojawia się tylko krótki status **IMPORT ✓**.

### Tutorial i przewodnik

- Działa przycisk **PRZEWODNIK** w górnym menu.
- Dodano 5-etapowy onboarding dla nowej kariery, możliwy do pominięcia i ponownego uruchomienia.
- Przewodnik opisuje m.in. OVR, rozwój, ligę, finanse, team, transfery, biegi, turnieje, reprezentację i zdrowie.
- Dodano kontekstowe wskazówki, które można wyłączyć.
- Tutorial nie ujawnia ukrytych wzorów ani jednej optymalnej strategii.

### Punkty rozwoju

- Przycisk ma jednoznaczny format **`+1 • X PR`**.
- `+1 • 5 PR` oznacza: cecha rośnie dokładnie o 1, a koszt wynosi 5 punktów rozwoju.
- Zwiększono czcionkę przycisków na desktopie i poprawiono czytelność na mobile.
- Gdy następny punkt jest kupowany ponad naturalny próg cechy, przycisk jest delikatnie oznaczony na czerwono.
- Przewodnik dokładnie tłumaczy bazowy koszt, miękki próg i wpływ wieku.

### Team i usługi

- Rozwój teamu nie jest już obowiązkową decyzją „albo–albo” przed każdym sezonem.
- **Zarządzaj teamem** jest stałą opcją w centrum kariery.
- Po zakupie modal pozostaje otwarty; saldo i karty aktualizują się w miejscu — bez znikania i ponownego pojawiania się okna.
- Każda karta pokazuje typ (**USŁUGA / INWESTYCJA**), efekt, czas działania, limit i — przy bazie — poziom oraz koszt utrzymania.
- Wczesna kariera dostaje tańsze, realistyczne usługi. Duże inwestycje odblokowują się dopiero przy rozwiniętym teamie.
- Jeśli gracz przez co najmniej dwa sezony ignoruje system teamu, może pojawić się lekkie przypomnienie z opcjami **Zarządzaj teamem** / **Nie, dziękuję**. Po odmowie obowiązuje dwuletni cooldown.
- Brak inwestycji sam w sobie nie jest karą.

### Koniec kariery

- Wymuszone zakończenie kariery nie jest już sprowadzane prawie zawsze do problemów zdrowotnych.
- Gra może zakończyć karierę z powodu realnego, trwałego spadku poziomu sportowego, utraty pozycji na rynku/składzie, wieloletniego przeciążenia, utraty motywacji lub zdrowia.
- Powód jest wybierany tylko wtedy, gdy wspierają go rzeczywiste dane kariery: trend OVR, średnia, liczba biegów, szansa na skład, historia urazów i obciążenie.
- Przy wysokim OVR i dobrych wynikach powód „spadek poziomu” jest blokowany.
- Dodano lekkie, kontekstowe wahania sezonowe wynikające z wyraźnie dobrej/słabej dyspozycji lub fazy kariery, bez niszczenia głównej krzywej rozwoju.
- Pop-up po zakończeniu kariery ma trzy opcje w kolejności: **Przejdź do podsumowania**, **Nowa kariera**, **Postaw kawę**.
- Na stałym ekranie podsumowania nadal pozostają duże CTA **Nowa kariera** i istniejący przycisk z kawą.

### Osiągnięcia w podsumowaniu kariery

- Dla SGP/IMŚ, SGP2/IMŚJ, SEC i IMP podsumowanie pokazuje kompaktowo: liczbę sezonów/startów, liczbę rozegranych rund, zwycięstwa rund i podia rund.
- Dzikie karty SGP/SEC/IMP są wliczane do odpowiednich statystyk rundowych; IMP nie tworzy osobnej karty „dzika karta”.
- DMPJ pokazuje najlepsze miejsce albo najwyższą osiągniętą fazę oraz liczbę/lata powtórzenia najlepszego wyniku.
- MIMP i DME pozostają podsumowane jako pojedyncze turnieje, bez sztucznej statystyki rundowej.
- Opisy pozostają zwarte, żeby sekcja nie rozciągała się niepotrzebnie.

### Kwalifikacje SGP

- Stosowana jest nazwa **Eliminacje SGP Challenge**.
- Eliminacje SGP Challenge i właściwy **Grand Prix Challenge** są rozdzielone w archiwum/podsumowaniu.
- Starsze wpisy z tekstem „eliminacje SGP” są korygowane przy wczytaniu zapisu, gdy da się je bezpiecznie rozpoznać.

### Finanse turniejowe

- Szczegółowe rozliczenie cyklu nie jest już wciskane do natychmiastowego ekranu wyniku zawodów.
- Późniejsza sekcja turniejów pokazuje kompaktowo rundy, zwycięstwa, podia i łączną gratyfikację.
- DMŚJ pozostaje imprezą reprezentacyjną, nie cyklem.
- Obniżono premię DMŚJ do juniorskiego poziomu — srebro przy pięciu biegach to około 19 tys. zł, a nie setki tysięcy.
- Pełne rozliczenie cyklu dotyczy wyłącznie SGP, SEC, SGP2 i wielorundowego IMP.

### Zachowane najważniejsze poprawki 1.02

- Częsty model kariery: **rozwój → peak/plateau → regres**, z możliwością wcześniejszego peaku, późnego rozkwitu, odbudowy, drugiej młodości i wyjątkowej długowieczności.
- Wynik ruletki nie jest zdradzany przed zatrzymaniem animacji.
- Sukces oznacza powodzenie konkretnego manewru/obrony.
- Start ma osobną logikę od dalszych faz biegu.
- Wyjątkowy sukces jest mniejszą częścią całej puli powodzenia.
- Poprawiono ciągłość pozycji, narrację 5:1, zgodność mentora z dostępnymi decyzjami oraz nadmierny bias w stronę krawężnika.
- Dodano Speedway of Nations.
- Zachowano kompaktową tabelę sezon po sezonie na urządzeniach mobilnych.

### Zapis gry

Wersja 1.02.2 używa klucza `pss_v1022`. Przy pierwszym uruchomieniu automatycznie migruje zapis z `pss_v1021`, `pss_v102` oraz obsługiwanych starszych wersji.

### Pliki wydania

Do publikacji potrzebne są:

- `index.html`
- `style.css`
- `app.js`
- `postaw-kawe.jpeg`
- `social-preview.jpg`
- `speedway-emblem.png`

Trzy pliki graficzne nie zostały zmienione i nie są ponownie dołączane do paczki roboczej. Przy aktualizacji istniejącego deploymentu należy pozostawić je na serwerze.

### Publikacja

Gra jest statyczna i nie wymaga procesu buildowania. Może być publikowana bezpośrednio na Vercel, GitHub Pages, Netlify lub Cloudflare Pages.

## Adres projektu

`https://polishspeedway.vercel.app/`
