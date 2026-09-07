# Polish Speedway Simulator

## Wersja 1.04.2 — mocniejsze kadry ligowe, bezpieczny rozwój i szybsza ruletka

**Data buildu: 7.09.2026**

1.04.2 jest aktualizacją balansującą system klubowy po testach 1.04.1. Najważniejsza zmiana dotyczy kadr ligowych: ich siła nie jest już pośrednio zaniżana przez status zawodnika gracza. PGE Ekstraliga została wyraźnie wzmocniona jako najlepsza liga świata, a Metalkas 2. Ekstraliga i KLŻ dostały osobne, nakładające się rozkłady poziomu.

### 1. Siła kadr niezależna od statusu gracza

Generator kadry nie korzysta już z progu wejścia do składu przeznaczonego dla gracza. Status `junior / U24 / senior` wpływa na **szansę gracza na jazdę**, ale nie obniża OVR rywali w całej drużynie.

Orientacyjny model po zmianie:

- top PGE: liderzy najczęściej w okolicach 87–92 OVR, mocny trzon 82–89;
- dół PGE / beniaminek: lider zwykle 83–89, trzon około 78–85;
- top Metalkas 2. Ekstraligi: lider zwykle 80–86, trzon 74–82;
- dół Metalkas: lider najczęściej 76–82, trzon 69–78;
- top KLŻ: liderzy około 72–80, trzon 64–74;
- dół KLŻ: liderzy około 67–75, trzon 58–69.

To nie są twarde limity. Ligi nadal się nakładają, więc czołowy zawodnik niższej ligi może być mocniejszy od części zawodników szczebel wyżej. Juniorzy mają znacznie szerszy rozrzut.

Status finansowy klubu wpływa na poziom kadry: projekt `NOWY INWESTOR / PROJECT ALL-IN` realnie wzmacnia górną część składu, a kryzys budżetowy może ją osłabić. Spadkowicz zachowuje część sportowej bezwładności po zmianie ligi.

### 2. Składy maksymalnie wykorzystują regulamin

Podstawowa piątka seniorska jest budowana sportowo: najpierw spełniane jest wymagane minimum polskich licencji oraz pozycja U24, a pozostałe otwarte miejsca częściej trafiają do szerszej puli zagranicznej. Dzięki temu klub nie tworzy bez potrzeby nadmiaru polskich seniorów, gdy regulamin pozwala wystawić mocniejszych obcokrajowców. Polski zawodnik nadal może być liderem — narodowość nie obniża jego OVR.

Szeroka kadra może zawierać dodatkowych Polaków, juniorów i rezerwowych, ale meczowy trzon ma wykorzystywać przepisy możliwie efektywnie.

### 3. Punkty rozwoju nie znikają na limicie

Naprawiono przypadek, w którym np. Kondycja 95 przy aktualnym progu 94 pozwalała zapłacić PR za próbę wejścia na 96, po czym system przywracał 95.

Od 1.04.2 koszt jest pobierany wyłącznie wtedy, gdy wzrost może zostać faktycznie zapisany. Po osiągnięciu aktualnego twardego limitu przycisk rozwoju jest blokowany i pokazuje `LIMIT`. Jeśli pułap rozwoju później wzrośnie, możliwość dalszego rozwoju wraca.

### 4. „Pomiń” przy ruletce

Każda animowana ruletka ma teraz przycisk `Pomiń`. Wynik jest ustalany dokładnie tak samo jak wcześniej — przycisk nie losuje ponownie i nie zmienia prawdopodobieństw. Jedynie natychmiast kończy animację na już wybranym wyniku.

Poprzednie podświetlanie aktywnego kafelka pozostaje bez zmian.

### 5. Zapis gry

Aktualny klucz zapisu: `pss_v1042`. Gra automatycznie przejmuje zapis z 1.04.1 i wcześniejszych obsługiwanych wersji. Przy migracji do 1.04.2 stare, zaniżone cache kadr klubowych są czyszczone i generowane ponownie według nowego modelu.

### 6. Hotfix 1.04.2 — SEC i poprawki po testach

Numer wersji pozostaje **1.04.2**. W poprawce wdrożeniowej dopięto:

- poprawne przenoszenie TOP 6 SEC na kolejny sezon również przy cyklu prowadzonym runda po rundzie i przy pełnej symulacji;
- przy równoległej jeździe w SGP zawodnik z bezpośrednim miejscem w SEC wybiera wyłącznie, czy chce połączyć oba cykle; nie trafia ponownie do eliminacji;
- zawodnik bez bezpośredniego miejsca może przejść przez eliminacje SEC albo zrezygnować z kwalifikacji i liczyć na jedną z trzech stałych dzikich kart;
- eliminacje SEC i SEC Challenge dają standardowy wybór: rozegrać własne pięć biegów albo zasymulować turniej;
- nagłówek kwalifikacji został uproszczony do `Eliminacje SEC`, bez numerowania `Turniej 1/4`;
- naprawiono przycisk `Pomiń` przy ruletce: natychmiast przechodzi do wcześniej ustalonego wyniku bez ponownego losowania;
- dodano transakcyjne zabezpieczenie PR — jeżeli wzrost cechy nie zostanie faktycznie zapisany, punkty rozwoju nie są tracone;
- ponownie czyszczony jest cache starych, zaniżonych kadr klubowych, aby save korzystał z aktualnego modelu siły lig;
- `Rozwiń wszystkie` i `Pokaż siłę stawki` są utrzymywane w jednym wierszu, o ile pozwala na to szerokość ekranu.

---

## Wersja 1.04.1 — stabilizacja 1.04.0, spójniejsze obsady i sezon ligowy

**Data buildu: 7.09.2026**

1.04.1 jest aktualizacją stabilizującą dużą przebudowę z 1.04.0. Nie dodaje kolejnej warstwy przypadkowych systemów — porządkuje te elementy, które po pierwszych testach wymagały dopracowania: ciągłość obsad między sezonami, faktyczną liczbę meczów klubu, prognozę jazdy, obsady IMP, ruletkę, DMPJ, urazy oraz semantykę „wyjątkowego sukcesu” w interaktywnych biegach.

Najważniejsza zasada pozostaje bez zmian: **świat gry ma być względnie stabilny i przyczynowo spójny, ale kariery — zarówno gracza, jak i anonimowych rywali — mają się rozwijać, zatrzymywać, eksplodować i wygasać w różnym tempie.**

### 1. Ciągłość obsad i rozwój rywali

Anonimowi rywale nie są już jednorazową pulą losowaną od początku przy każdym turnieju. Każdy NPC otrzymuje trwałe wewnętrzne ID oraz własny profil:

- narodowość;
- wiek;
- aktualny OVR;
- ukryty potencjał / miękki pułap rozwoju;
- sezonową formę;
- indywidualne tempo rozwoju i odporność;
- status juniora/seniora;
- historię udziału w najważniejszych cyklach i kwalifikacjach;
- najważniejsze anonimowe osiągnięcia używane do opisów stawki.

Co sezon świat jest aktualizowany. Juniorzy rozwijają się najbardziej nierówno i mogą zaliczać breakouty lub stagnacje; starsi zawodnicy wchodzą w plateau, regres, sporadyczną drugą młodość i ostatecznie kończą kariery. Co roku do puli dochodzi nowa fala zawodników po licencji.

Ten sam anonimowy zawodnik może więc pojawić się jako `🇩🇰 DEN — wyróżniający się talent`, rok później zakwalifikować się do SGP2, po wyjściu z wieku juniora trafić do eliminacji SEC, a kilka lat później znaleźć się w otoczeniu SGP. **W interfejsie nadal nigdy nie pojawiają się nazwiska NPC.**

Dodatkowo zawodnik nie może w tym samym sezonie wystąpić równolegle w kilku różnych rundach kwalifikacyjnych tego samego szczebla. Pule kwalifikacji zachowują ciągłość i rozłączność, a Challenge korzysta z zawodników, którzy faktycznie przeszli wcześniejszy etap.

### 2. Faktyczna liczba meczów klubu zamiast przybliżenia

Prognoza jazdy pozostaje procentową oceną sytuacji **przed sezonem**, a nie twardym limitem występów. Od 1.04.1 faktyczna liczba możliwych meczów gracza jest korygowana po rozstrzygnięciu sezonu klubowego.

Model uwzględnia:

- 14 spotkań rundy zasadniczej w ośmiozespołowej lidze;
- rzeczywiście osiągnięty etap play-off;
- rzeczywiście osiągnięty etap play-down;
- finał i — w PGE Ekstralidze — dwumecz o 3. miejsce;
- dwumecz o utrzymanie;
- baraż PGE Ekstraliga / Metalkas 2. Ekstraliga, jeśli klub faktycznie jest jego uczestnikiem;
- krótszą ścieżkę klubów odpadających wcześniej.

Przykładowo klub może zakończyć sezon na 14, 16, 18 albo 20 meczach — zależnie od poziomu ligi i faktycznej ścieżki w fazie finałowej.

### 3. Prognoza jazdy liczona mecz po meczu

Pokazywane w kontrakcie np. `30%`, `55%` czy `90%` jest bazową szansą wejścia do składu na pojedyncze spotkanie. System zachowuje tę samą wygenerowaną sytuację kadrową przez cały sezon zamiast ponownie losować ją przy każdym przeliczeniu.

W trakcie roku sytuację mogą zmienić m.in.:

- kontuzja bezpośredniego konkurenta;
- wykorzystanie otwartej szansy i przesunięcie w hierarchii;
- forma zawodnika;
- spadek pozycji w składzie;
- dłuższy sezon wynikający z play-off/play-down/barażu.

Dzięki temu 30% zazwyczaj oznacza mało jazdy, ale po kontuzji konkurenta może zamienić się w długą serię startów. Analogicznie wysoka prognoza nie jest gwarancją pełnego sezonu.

### 4. Obsady IMP i IMP Challenge

Komponent `Pokaż obsadę` został rozszerzony również na:

- eliminacyjne turnieje IMP;
- IMP Challenge.

Polska stawka korzysta z tej samej rozwijającej się puli rywali co eliminacje SGP, SEC i SGP2. Rywale pozostają anonimowi, ale ich ukryty OVR, wiek i profil są konkretne i powtarzalne.

### 5. Ruletka — powrót do podświetlania faktycznego kafelka

Wycofano rozwiązanie z jasnym polem/poświatą sprawiającą wrażenie elementu jadącego razem z paskiem. Przywrócono wcześniejszy model:

- kafelek aktualnie przechodzący pod markerem rozjaśnia się o ok. 13%;
- wyróżnienie przeskakuje z segmentu na segment;
- po zatrzymaniu zwycięski segment pozostaje wyróżniony;
- mechanika hamowania i czas animacji pozostają bez zmian.

Nadal obowiązuje zasada 1.04.0: **każdy różny rezultat jednej ruletki ma własny, unikalny kolor**.

### 6. Rynek transferowy — bardziej kompaktowa kadra

Blok `KADRA KLUBU` w ofertach został zmniejszony pionowo:

- mniejsze marginesy i padding;
- niższy nagłówek zwijanej kadry;
- ciaśniejsze wiersze zawodników;
- zachowane flagi, role i dokładny OVR;
- poprawiony układ mobilny.

Usunięto również samotną kropkę pojawiającą się wcześniej pod rozwijanym blokiem kadry.

### 7. DMPJ — indywidualne biegi i średnia w podsumowaniu

W sezonowych podsumowaniach DMPJ nie jest już sprowadzane do surowej sumy punktów typu `89 pkt.`. Najważniejsza informacja indywidualna to teraz:

`liczba biegów • średnia biegopunktowa • osiągnięty etap drużyny`

Np. `34 biegi • średnia 2,059 • ćwierćfinały`.

Pełny model DMPJ z 1.04.0 pozostaje wieloetapowy: eliminacje → ćwierćfinały → półfinały → cztery turnieje finałowe.

### 8. Zdrowie — czytelniejsze powtarzające się urazy

Jeżeli w jednym sezonie wystąpią dwa urazy tego samego rodzaju, podsumowanie nie wyświetla już bezkontekstowo `stłuczenie barku, stłuczenie barku`.

Przykład:

`stłuczenie barku ×2 (bez przerwy + 1 tyg.)`

Każdy odnotowany uraz pokazuje teraz informację o pauzie — również wtedy, gdy zawodnik nie opuścił startów (`bez przerwy`). Generator dodatkowo stara się nie losować dokładnie tego samego urazu ponownie w bardzo krótkim odstępie, jeśli dostępne są logiczne alternatywy.

### 9. „Wyjątkowy sukces” w interaktywnych biegach

Naprawiono sprzeczność, w której ruletka mogła pokazać `WYJĄTKOWY SUKCES`, a opis informował, że zamiaru nie udało się wykonać.

Od 1.04.1:

- **niepowodzenie** — zamiar może nie dojść do skutku;
- **sukces** — wybrana intencja zostaje zrealizowana;
- **wyjątkowy sukces** — intencja zostaje zrealizowana i, jeśli sytuacja torowa na to pozwala, pojawia się dodatkowy korzystny efekt.

Jeżeli dodatkowy awans jest fizycznie niemożliwy, wyjątkowy sukces nadal gwarantuje prawidłową realizację podstawowego zamiaru.

### 10. Kolejne poprawki QA w tym samym buildzie 1.04.1

Do 1.04.1 scalono także poprawki wynikające z dalszych testów:

- `Pokaż kadrę` jest niezależnym elementem od wyboru klubu, więc rozwinięcie kadry nie podpisuje kontraktu; sam ekran ofert jest bardziej zwarty.
- W podglądzie stawki zawodnik gracza jest zawsze uwzględniony, a po otwarciu `Pokaż siłę stawki` można użyć `Rozwiń wszystkie / Zwiń wszystkie`.
- Krajowe zawody korzystają z opisów pasujących do krajowego kontekstu. Z interfejsu usunięto techniczne komentarze o sposobie działania systemu rywali.
- Po zakończeniu turnieju dostępne są `Pełne wyniki`, oparte na dokładnie tym samym zapisie, który rozstrzyga awans, historię i premie — bez ponownego losowania. Wielorundowe cykle korzystają analogicznie z jednej końcowej klasyfikacji.
- Przy awansie z SEC Challenge celebracja pojawia się przed szerszym komunikatem.
- W trybie przechodzenia przez cykl runda po rundzie zasymulowanie ostatniej rundy zachowuje płynne odsłonięcie jej wyniku i zmiany w generalce przed podsumowaniem. Nie dotyczy to opcji symulacji całego cyklu naraz.
- Liczba możliwych meczów ligowych jest wyprowadzana z faktycznie rozegranych dwumeczów play-off/play-down oraz barażu, jeżeli klub jest jego uczestnikiem; procent jazdy pozostaje bazową szansą na pojedynczy mecz.

### 11. Zapis gry i migracja

Aktualny klucz zapisu 1.04.1:

`pss_v1041`

Gra automatycznie próbuje przejąć zapis z `pss_v1040` oraz wcześniejszych obsługiwanych wersji. Przy pierwszym uruchomieniu starego zapisu budowana jest pula rywali używana przez obsady 1.04.1. Do benchmarków rozwoju i równoległego świata nadal rekomendowana jest nowa kariera.

---

## Wersja 1.04.0 — świat zawodników, realne obsady i większa różnorodność karier

**Data buildu: 7.09.2026**

1.04.0 to duża aktualizacja systemowa. Jej głównym celem jest odejście od kariery rozgrywanej przeciw abstrakcyjnym progom OVR. Kluby, rynek transferowy, reprezentacja oraz najważniejsze turnieje korzystają teraz z anonimowych zawodników NPC posiadających własny ukryty poziom sportowy, narodowość, wiek i status. Gra nadal nie używa nazwisk realnych ani fikcyjnych rywali.

Najważniejsze założenie pozostaje bez zmian: **poziom startowy daje przewagę lub utrudnienie, ale nie determinuje końca kariery**. Szczególnie w wieku 15–21 lat rozwój ma mieć dużo większą wariancję: możliwe są stagnacje, breakouty, nietypowo szybki progres, słabsze okresy i kariery, które niespodziewanie zmieniają trajektorię.

### 1. Anonimowy świat zawodników NPC

Każdy zawodnik używany w nowych obsadach ma w tle konkretny OVR, narodowość i wiek. W interfejsie **nie pojawiają się nazwiska**.

W turniejach rywale są przedstawiani jako flaga + kod kraju + krótki kontekst sportowy, np.:

- `🇩🇰 DEN — uczestnik SGP`;
- `🇵🇱 POL — mistrz kraju`;
- `🇨🇿 CZE — solidny zawodnik międzynarodowy`;
- `🇬🇧 GBR — doświadczony reprezentant`;
- `🇫🇷 FRA — debiutant w eliminacjach`;
- `🇮🇹 ITA — lokalna dzika karta`.

Opisy są dobierane zgodnie z poziomem i rolą zawodnika. Nie pokazujemy dokładnego OVR pojedynczego rywala w turnieju.

### 2. Pięć grup siły stawki

Obsady najważniejszych zawodów można rozwinąć przed startem. Zawodnicy są pogrupowani według przybliżonego poziomu.

#### Seniorzy

- **ELITA — OVR 88+**;
- **WYSOKI POZIOM — OVR 82–87**;
- **SOLIDNY MIĘDZYNARODOWY — OVR 76–81**;
- **ŚREDNI POZIOM — OVR 70–75**;
- **OUTSIDERZY — OVR <70**.

#### SGP2 / juniorzy

Skala juniorska jest celowo niższa i dopasowana do realnych możliwości rozwoju w grze:

- **ELITA — OVR 78+**;
- **WYSOKI POZIOM — OVR 72–77**;
- **SOLIDNY MIĘDZYNARODOWY — OVR 66–71**;
- **ŚREDNI POZIOM — OVR 60–65**;
- **OUTSIDERZY — OVR <60**.

Junior 85+ jest bardzo mocny, a 90+ ma być ekstremalnie rzadkim fenomenem, ale pozostaje możliwy także dla zawodnika gracza przy wyjątkowej ścieżce rozwoju.

### 3. Obsady są częścią symulacji, a nie dekoracją

Eliminacje nie są generowane jako jednolite grupy rywali o podobnym OVR. Jedna runda może być bardzo mocna, druga wyraźnie korzystniejsza. OVR nadal ma duże znaczenie, ale jednodniowy turniej zachowuje losowość formy i możliwość sensacji.

Od 1.04.0 pule Challenge są budowane z anonimowych kwalifikantów z poprzednich rund, a nie z osobnego, niezależnego generatora:

- eliminacje SGP → kwalifikanci → Grand Prix Challenge;
- eliminacje SEC → kwalifikanci → SEC Challenge;
- eliminacje SGP2 → kwalifikanci → cykl SGP2.

### 4. Grand Prix — pełna ścieżka kwalifikacyjna

Dla polskiego zawodnika sama wartość OVR nie daje automatycznie miejsca w światowych eliminacjach.

Krajowa nominacja uwzględnia przede wszystkim:

- wynik Złotego Kasku;
- aktualną średnią i formę;
- poziom ligi;
- reputację;
- ograniczoną uznaniowość PZM.

Po nominacji zawodnik trafia do jednej z trzech anonimowych światowych eliminacji. Model 1.04.0 zakłada **TOP 5 z każdej eliminacji**, a pozostałe miejsce w 16-osobowym Grand Prix Challenge może przypaść gospodarzowi. **TOP 4 Grand Prix Challenge awansuje do SGP następnego sezonu.**

SGP ma zdecydowanie najwyższą koncentrację elity, ale incydentalnie może trafić tam słabszy zawodnik po wyjątkowych kwalifikacjach lub dzięki odpowiedniej ścieżce wildcard.

### 5. SEC — widoczne eliminacje i poprawna stała piętnastka

Ścieżka SEC została przebudowana tak, aby każdy etap był widoczny dla gracza.

- w sezonie występują **3 albo 4 turnieje eliminacyjne**;
- przy 3 eliminacjach: **TOP 5 z każdej** + miejsce gospodarza tworzy 16-osobowy SEC Challenge;
- przy 4 eliminacjach: **TOP 4 z każdej** tworzy 16-osobowy SEC Challenge;
- **TOP 6 SEC Challenge** zdobywa miejsce w SEC;
- **TOP 6 poprzedniego SEC** utrzymuje się;
- do stałej piętnastki dochodzą **3 stałe dzikie karty**;
- każdą rundę uzupełnia **1 lokalna dzika karta gospodarza**.

Jeśli zawodnik nie jedzie SGP, posiadane miejsce w SEC jest wykorzystywane automatycznie, a brak miejsca prowadzi bez zbędnego pytania do kwalifikacji. Jeśli zawodnik jest jednocześnie uczestnikiem SGP, gra pyta, czy chce połączyć oba cykle. Równoległe SGP + SEC zwiększa workload, doświadczenie i ryzyko przeciążenia.

### 6. SGP2 — kwalifikacje i cykl w tym samym sezonie

Ścieżka juniorska różni się od seniorskiego SGP:

- kwalifikacje odbywają się **w tym samym roku co cykl SGP2**;
- są **3 rundy eliminacyjne**;
- z każdej awansuje **TOP 4** = 12 kwalifikantów;
- do stałej piętnastki dochodzą **3 stałe dzikie karty**;
- na każdą rundę finałową dochodzi **1 lokalna dzika karta gospodarza**.

Polska nominacja do eliminacji SGP2 bierze pod uwagę przede wszystkim:

- Srebrny Kask;
- MIMP;
- formę ligową;
- aktualny poziom sportowy;
- decyzję PZM / trenera kadry;
- zmienny limit miejsc przysługujących federacji.

Sukces nie wymaga juniorsko absurdalnego OVR. Dobrze rozwinięty zawodnik może wykorzystać dobry dzień i korzystną obsadę, a nawet faworyt może odpaść w pojedynczych kwalifikacjach.

### 7. Mobile-first podgląd obsad

Pełna obsada nie zajmuje stale ekranu. W modalu zawodów znajduje się rozwijana sekcja **OBSADA**.

Na telefonie:

- grupy poziomu są osobnymi accordionami;
- każdy zawodnik zajmuje krótki, maksymalnie dwuwierszowy wpis;
- nie ma szerokiej tabeli ani wymuszonego przewijania poziomego;
- użytkownik może nie rozwijać obsady i od razu przejść do zawodów.

Układ był projektowany dla wąskich ekranów mobilnych i nie wymaga desktopowej szerokości.

### 8. Kadry klubów z flagami i OVR

Przy ofertach transferowych można rozwinąć anonimową kadrę klubu. W przeciwieństwie do turniejów tutaj OVR rywali jest jawny, ponieważ służy do świadomego oceniania szans na skład.

Przykładowe wpisy:

- `🇵🇱 Polski senior — OVR 72`;
- `🇩🇰 Zagraniczny senior — OVR 75`;
- `🇵🇱 Polski U24 — OVR 66`;
- `🇨🇿 Zagraniczny junior — OVR 57`;
- `🇵🇱 Polski junior — OVR 54`.

Kadra może być szersza niż podstawowa siódemka: klub może mieć dodatkowych juniorów, seniorów oraz rezerwowego U23.

Generator nie zakłada, że polski senior musi być słabszy od zagranicznego. Polska licencja sama w sobie może jednak podnosić wartość sportową zawodnika dla konkretnego klubu, ponieważ pomaga zbudować regulaminowy skład.

Możliwy jest również **zagraniczny junior**, jeżeli cały skład meczowy nadal spełnia wymogi dotyczące zawodników z polską licencją oraz pozycji U24.

### 9. Prognoza jazdy oparta na realnej konkurencji

Procent przy ofercie jest teraz liczony na tle wygenerowanej kadry klubu i pozycji zawodnika. Ten sam kontekst jest używany do późniejszej symulacji wykorzystania zawodnika.

Prognoza **nie jest sztywnym limitem liczby meczów**. To bazowa przedsezonowa szansa wejścia do składu.

W trakcie sezonu rzeczywistość może się zmienić przez:

- kontuzję bezpośredniego konkurenta;
- dobrą lub złą serię zawodnika;
- zmianę hierarchii;
- wzrost formy;
- wykorzystanie zastępstwa i przejęcie miejsca w składzie.

Dlatego 30% nadal najczęściej oznacza ograniczoną jazdę, ale wyjątkowo może zamienić się w dużą część sezonu. 80–95% oznacza bardzo silną pozycję, ale również nie jest absolutną gwarancją.

### 10. Rynek słabszego juniora

Przy niskim OVR junior dostaje mniej ofert, ale system mocniej preferuje kluby, w których istnieje realna ścieżka do jazdy. Ma to ograniczyć sportowo-finansowy soft-lock profili „Szkółka od zera” i „Zwykły adept”.

Najniższa liga ma być naturalnym miejscem zbierania biegów i rozwoju, a nie kolejnym poziomem, na którym słaby junior przez kilka lat nie otrzymuje szansy.

### 11. Większa wariancja rozwoju

Zachowano i rozszerzono rozwiązania z 1.03.4:

- sezonowy puls rozwojowy;
- największą wariancję w wieku 15–21 lat;
- rzadkie juniorskie breakouty;
- stagnacje i słabsze okresy;
- możliwość późnego przełomu i drugiej młodości;
- lekko podniesione miękkie limity umiejętności;
- klubowe wsparcie podstawowego rozwoju juniora;
- wcześniejszy „pełny profesjonalizm” dla wyjątkowo mocnego młodego zawodnika.

Duże zdarzenia nie są jednorazowym `+5 OVR`. Zmieniają tempo rozwoju, miękki sufit, formę, warunki treningowe, obciążenie albo długofalową trajektorię.

### 12. Duże zdarzenia kariery

System zawiera wszystkie główne ustalone punkty zwrotne, m.in.:

- eksperymentalny program silnikowy;
- odejście kluczowego mechanika;
- zmianę stylu po realnej kontuzji;
- ryzykowny powrót po urazie;
- przeciążenie rzeczywistym kalendarzem;
- kryzys po realnie ważnym meczu;
- konflikt / rywalizację o miejsce w składzie;
- przełom treningowy z wyborem kierunku pracy;
- przebudowę przygotowań;
- późne zrozumienie żużla / drugą młodość;
- sponsora stawiającego mierzalny cel;
- bardzo rzadki fenomenalny sezon;
- juniorski wystrzał.

Częstotliwość została podniesiona względem wcześniejszych buildów, ale event nadal musi spełniać swój trigger. Gra nie tworzy kontuzji, porażki czy konfliktu tylko po to, żeby uruchomić wydarzenie.

### 13. Naturalne schodki średniej ligowej

Schodki **nie dotyczą automatycznego spadku OVR**.

Dotyczą przede wszystkim średniej biegopunktowej:

- pierwszy seniorski sezon w wieku **22 lat** — koniec biegów juniorskich;
- sezon w wieku **25 lat** — utrata statusu U24;
- przejście do mocniejszej lub słabszej ligi.

OVR może rosnąć, podczas gdy średnia chwilowo spada ze względu na trudniejszą rolę i rywali. Dodano również osobną sezonową fluktuację wynikową, aby średnia nie rosła mechanicznie linią prostą wraz z OVR.

### 14. DMPJ jako pełne rozgrywki juniorskie

DMPJ nie jest już traktowane jak pojedynczy turniej.

Model obejmuje:

- eliminacje;
- ćwierćfinały;
- półfinały;
- finał składający się z czterech turniejów.

Gra liczy indywidualnie biegi i punkty zawodnika. W sekcji TURNIEJE najważniejszą informacją jest teraz np.:

`18 biegów • śr. 2,11 • półfinał`

Średnia juniorska jest naturalnie wyższa od ligowej u mocnych juniorów, ale zależy od OVR, wieku, jakości polskiej stawki i etapu rozgrywek. Późniejsze fazy są trudniejsze.

### 15. Skrócona historia kariery

Dla każdego sezonu skrót historii pokazuje:

`Klub • Liga • OVR • Średnia ligowa • Średnia juniorska`

Średnia juniorska jest wyświetlana tylko do 21. roku życia i jest liczona jako średnia ważona realną liczbą biegów w odpowiednich zawodach młodzieżowych.

### 16. Cele sponsora

Cele średniej ligowej są zaokrąglane do naturalnych progów co `0,05`, np. 1,90 / 1,95 / 2,00 / 2,05.

Cel na nowy sezon uwzględnia nie tylko poprzednią średnią, ale również:

- zmianę poziomu ligi;
- aktualny OVR;
- utratę statusu juniora/U24;
- rolę w klubie;
- prognozę jazdy.

Rozsądny cel jest ustawiany blisko prognozowanego poziomu, a ambitny wymaga wyraźnego overperformance. Premia trafia do budżetu dopiero po faktycznym spełnieniu warunku.

### 17. Reprezentacja

Powołania do seniorskiej kadry zostały ograniczone.

- **DME** pozostaje niższą rangą i ma szerszą rotację;
- **DPŚ** i **Speedway of Nations** są znacznie bardziej elitarne;
- OVR około 80 może czasem dać powołanie, ale nie powinien robić tego regularnie przy silnej konkurencji krajowej;
- selekcja bierze pod uwagę OVR, średnią, poziom ligi, formę i reputację.

### 18. Ruletka zdarzeń

Każdy różny rezultat jednej ruletki ma własny kolor. Nie ma sztywnego ograniczenia do trzech kolorów — przy czterech wynikach pojawiają się cztery rozróżnialne warianty itd.

Naprawiono przypadki, w których:

- kara była przedstawiana zielonym wynikiem;
- korzystny rezultat był czerwony;
- dwie różne gałęzie miały identyczny kolor.

Podświetlenie pola pozostaje subtelne, ale animacja została uproszczona: pasek porusza się wyłącznie przez `transform`, a marker ma lekką nieruchomą poświatę obejmującą aktualny segment. Eliminuje to kosztowne przełączanie filtrów i klas kafelków w każdej klatce.

### 19. Osiągnięcia i nazewnictwo

- usunięto etykiety `max`;
- dla pozycji używane jest **Najwyższe miejsce**;
- dla rozgrywek etapowych można używać **Najwyższy etap**;
- nazwy klubów w interfejsie transferowym są wyświetlane w mianowniku i nie są przypadkowo odmieniane przez mechanizm fleksji miejscowości.

### 20. Zapis gry i migracja

Aktualny klucz zapisu:

`pss_v1040`

1.04.0 automatycznie próbuje przejąć zapis z 1.03.4 i wcześniejszych obsługiwanych wersji. Nowe elementy świata NPC, kadr i obsad są dobudowywane do starego save'a podczas dalszej gry.

Przy dużych zmianach systemowych do testów balansu rekomendowana jest jednak **nowa kariera**, ponieważ tylko wtedy wszystkie nowe pule i zależności powstają od początku w modelu 1.04.0.

### Uruchomienie

Projekt jest statyczny. Do działania wystarczą:

- `index.html`;
- `style.css`;
- `app.js`.

Można uruchomić lokalnie przez prosty serwer HTTP albo wdrożyć jako stronę statyczną.

---

# Historia zmian

## 1.03.4 — scalony build testowy 7.09.2026

- zwiększono wariancję rozwoju, szczególnie w wieku 15–21 lat, oraz dodano ukryty sezonowy puls rozwojowy;
- dodano rzadki juniorski breakout i lekko podniesiono miękkie limity umiejętności;
- klub mocniej wspiera podstawowy rozwój juniora, a bardzo mocny junior może wcześniej wejść w pełny profesjonalizm;
- przy niskim OVR rynek daje mniej, ale lepiej dopasowanych ofert rozwojowych;
- prognoza jazdy została sprzężona z faktycznym udziałem w meczach: rzeczywista liczba występów jest losowana blisko procentu pokazanego w ofercie, z ograniczoną wariancją;
- rola juniorskiego zawodnika określa liczbę biegów po wejściu do składu;
- średnia biegopunktowa dostała osobną sezonową fluktuację, niezależną od wzrostu OVR;
- wzmocniono naturalny schodek średniej w wieku 22 lat po utracie statusu juniora oraz mniejszy schodek w wieku 25 lat po utracie U24;
- zachowano osobne schodki średniej przy zmianach poziomu ligi;
- zwiększono kadencję dużych zdarzeń w długich karierach, ale nadal mogą uruchamiać się tylko wtedy, gdy spełniony jest realny trigger;
- zwiększono realną szansę juniorskim wystrzałom na pojawienie się w pełnej karierze;
- cele sponsora są zaokrąglane do naturalnych progów co 0,05 i bazują na prognozie kolejnego sezonu, z uwzględnieniem ligi, roli oraz progów 22/25 lat;
- SEC: dodano widoczne 3 lub 4 turnieje eliminacyjne, podział 16 miejsc do Challenge (4/4/4/4 albo 5/5/6), 16-osobowy SEC Challenge i awans TOP 6;
- stała piętnastka SEC składa się z TOP 6 poprzedniego cyklu, TOP 6 Challenge i 3 stałych dzikich kart; każdą rundę uzupełnia osobna lokalna dzika karta gospodarza;
- bez równoległego SGP stałe miejsce SEC uruchamia cykl automatycznie, a nominacja uruchamia od razu eliminacje; przy SGP gracz sam decyduje, czy łączy oba cykle;
- ograniczono częstotliwość powołań do reprezentacji: DME ma szerszą rotację, SoN i DPŚ wymagają znacznie mocniejszej pozycji sportowej;
- każdy różny wynik jednej ruletki ma unikalny kolor; przy czterech wynikach używane są cztery kolory;
- poprawiono płynność ruletki: usunięto kosztowne przełączanie filtrów na kafelkach w każdej klatce, zachowując subtelne podświetlenie pola pod markerem;
- naprawiono pozytywne/negatywne gałęzie wydarzeń, w tym „Oszczędzaj siły, dopracuj sprzęt” i „Nie komentować”;
- poprawiono odmianę nazw klubów na rynku;
- w osiągnięciach usunięto `max`, wprowadzając „Najwyższe miejsce” lub „Najwyższy etap”;
- numer wersji i klucz zapisu pozostają **1.03.4 / `pss_v1034`**, aby wszystkie poprawki były testowane jako jeden scalony build.

## 1.03.3 — 6.09.2026

- nowy system dużych, stanowych zdarzeń kariery;
- większa wariancja końcowych trajektorii i mocniej nakładające się rozkłady potencjału między profilami startowymi;
- decyzje w dużych eventach wpływają długoterminowo na rozwój, miękki peak, profil umiejętności, momentum i regres;
- eventy kontuzjowe wymagają realnego urazu, a event po ważnym meczu opiera się na faktycznym wyniku kluczowego spotkania;
- koszty mechanika, silników i regeneracji skalują się z finansami kariery;
- sponsor może postawić mierzalny cel i wypłaca premię dopiero po jego wykonaniu;
- prognoza jazdy i późniejsza liczba występów korzystają ze spójniejszego modelu;
- ograniczono niewiarygodne transfery niskiego OVR do regularnej roli w PGE Ekstralidze;
- SEC: TOP 6 cyklu utrzymuje miejsce, TOP 6 SEC Challenge awansuje;
- usunięto blokadę SEC dla zawodników SGP i dodano świadomy wybór łączenia obu cykli;
- SGP + SEC generuje dodatkowy workload, ryzyko i koszt regeneracyjny zamiast prostego sztucznego debuffa;
- zapis przeniesiono na `pss_v1033` z automatyczną migracją starszych save'ów.

## 1.03.2

- ustabilizowano system wielorundowych cykli wprowadzony w 1.03.x;
- manualne SGP, SEC, SGP2 i IMP korzystają z tej samej roadmapy co symulacja;
- wyniki rund i pozycja w generalce odsłaniają się stopniowo w istniejącej karcie cyklu;
- każda zakończona runda dostała rozwijane „Szczegóły rundy”;
- wynik ręcznie rozegranej rundy jest źródłem prawdy dla punktów, generalnej, awansów do LCQ/finału i osiągnięć;
- uporządkowano centralne rozpoznawanie imprez i celebracje;
- poprawiono ruletkę: stały środkowy wskaźnik i nieregularne zatrzymanie w zwycięskim segmencie;
- historia kariery dostała dwa poziomy zwijania: etapy i poszczególne lata;
- leaderboard został świadomie odłożony na późniejszą wersję;
- zapis: `pss_v1032`.

## 1.03.1

- ujednolicono obsługę cykli wielorundowych;
- poprawiono UX roadmapy;
- poprawki językowe i narracyjne;
- kolejne korekty progresji i spójności danych między symulacją a trybem ręcznym;
- zapis/znacznik wersji 1.03.1.

## 1.03.0 — „przełomowa wersja cykli”

- nowa roadmapa wielorundowych imprez;
- daty, urazy i szczegóły rund w SGP, SEC, SGP2 i IMP;
- urazy są osadzane na osi konkretnego cyklu/rundy zamiast dopisywane dopiero po całej imprezie;
- wspólny model rund i urazów;
- SGP i SGP2 dostały spójniejszy format rund z LCQ/finałem;
- przy ręcznej grze decyzja o rozegraniu kluczowej rundy pojawia się dopiero wtedy, gdy cykl faktycznie do niej dochodzi;
- ujednolicone celebracje i nazewnictwo;
- dokładniejsza generalka dla pojedynczych dzikich kart IMP/SEC.

## 1.02.6 TEST

- eksperymentalna historia cyklu / roadmapa;
- po ostatniej rundzie najpierw pokazywana jest droga przez sezon, a dopiero później końcowy wynik;
- dokładna pozycja w generalce po każdej rundzie, jeśli symulacja ma pełną stawkę;
- zapisywanie roadmapy również do archiwum kariery;
- krótsze celebracje i uporządkowana narracja sukcesów.

## 1.02.5

- kompaktowa tabela historii kariery na urządzeniach mobilnych;
- poprawki czytelności długiej kariery na małym ekranie.

## 1.02.4

- kalendarz drużynowych rozgrywek: DPŚ co trzy lata (2023, 2026, 2029...), SoN w pozostałych latach;
- korekta progresji młodych zawodników — brak niewidzialnego regresu przed naturalnym peakem;
- lżejsza typografia wyników i uporządkowane komunikaty dzikich kart;
- bardziej zwarte podsumowanie sezonu i sortowanie osiągnięć prestiżem;
- pełniejszy Speedway of Nations: 21 biegów, Grand Final Qualifier i Grand Final.

## 1.02.3

- poprawki języka, interpunkcji i odmiany nazw miejscowości;
- celebracje dla kolejnych imprez juniorskich i drużynowych;
- narracja interaktywnych biegów lepiej powiązana z faktycznym wynikiem, linią toru i defektami;
- realniejszy rating turniejowy oraz korekty balansu IMP;
- pełna ścieżka SGP2: nominacja → kwalifikacje → cykl;
- rozbudowana selekcja do reprezentacji seniorów i juniorów oraz liczba startów w kadrze;
- Speedway of Nations: 7 reprezentacji, 21 biegów, punktacja 4–3–2–0;
- uporządkowano kolejki reprezentacji i najważniejszych zawodów;
- dzikie karty IMP/SEC liczą się do generalnej;
- poprawki watchdogu sezonu i podsumowania kariery.

## 1.02.2

- dodano serię rzadkich easter eggów i wydarzeń specjalnych;
- przebudowano header na bardziej kompaktowy;
- poprawki prezentacji importu/migracji zapisu.

## 1.02.1

- tutorial i pomoc po utworzeniu nowej kariery;
- czytelniejsze koszty punktów rozwoju;
- przebudowany ekran usług teamu: stała oferta, jasne efekty i poprawiona obsługa zakupów;
- dokładniejsze archiwum kwalifikacji i rund;
- bogatsze, ale bardziej zwarte podsumowanie osiągnięć;
- zakończenie kariery lepiej wynika z rzeczywistego stanu zawodnika;
- trzy warianty decyzji w końcowej fazie kariery;
- kolejne poprawki UI i migracji zapisów.

## 1.02 — rebuild 25.08.2026

- duża rewizja trajektorii kariery: peak ma być szczytem, a nie automatycznym końcem wysokiego poziomu;
- ograniczono zbyt długie plateau jako domyślny scenariusz, pozostawiając je jako możliwy wyjątek;
- poprawiono model regresu i długowieczności;
- interaktywne biegi zachowują stan sytuacji zamiast przeliczać całą czwórkę od zera po każdej decyzji;
- procent decyzji jest bliżej rzeczywistej szansy powodzenia zamiaru;
- ujednolicono zachowanie ruletki i opisu wyniku;
- dodano/rozbudowano nagrody finansowe w zawodach pozaligowych i cyklach;
- rozwinięto Speedway of Nations;
- dodano drogie inwestycje i usługi profesjonalnego teamu jako sposób wykorzystania nadwyżek finansowych bez prostego „kupowania OVR”.

## 1.02 — pierwsza aktualizacja balansu 24.08.2026

- przebudowano długoterminową progresję i krzywe kariery;
- mocniej powiązano OVR z rzeczywistym profilem ośmiu umiejętności;
- ograniczono automatyczne pompowanie Kondycji przez bazę treningową;
- dodano wydarzenia rozwojowe i fazy kariery: m.in. impuls, przełom, stagnację, dołek, drugą młodość i odbudowę po urazie;
- poprawiono realistyczne wykorzystanie juniora w lidze;
- przebudowano sportowe prawdopodobieństwa w interaktywnych biegach;
- rozwinięto ścieżkę walki o dziką kartę IMP;
- poprawki startu kariery, końca kariery i mobile.

## 1.01

- większość naturalnych szczytów kariery przesunięto w realistyczne okolice 27–34 lat;
- pozostawiono rzadkich wczesnych fenomenów, późno rozwijających się zawodników, odbudowy i wyjątkową długowieczność;
- rozwinięto ukryte DNA kariery: typ krzywej, tempo wzrostu, peak, plateau, regres, odporność, presję i adaptację;
- dalsze prace nad płynną ruletką i sposobem prezentacji losowania;
- kolejne poprawki balansujące rozwój juniora i przejście do wieku seniorskiego.

## 1.00

- pierwsza kompletna wersja Polish Speedway Simulator;
- tworzenie zawodnika i kilka profili startowych;
- osiem rozwijanych umiejętności i OVR;
- kariera od szkolenia/juniora przez polskie ligi do poziomu międzynarodowego;
- kontrakty, transfery, role w składzie i wynagrodzenia;
- liga, fazy finałowe, awanse/spadki i najważniejsze zawody indywidualne;
- podstawowy system finansów, sprzętu, reputacji, morale, relacji z klubem, kontuzji i zdarzeń losowych;
- historia kariery, statystyki i lokalny zapis gry.

---

## Założenie projektu po 1.04.2

**Talent daje prawdopodobieństwo, nie gwarancję wyniku.**

Poziom startowy ma nadal realnie zmieniać trudność pierwszych lat, ale najciekawsze kariery powinny być definiowane przez połączenie rozwoju, decyzji gracza, dostępnych okazji, zdrowia, sprzętu, teamu, kalendarza, konkretnej konkurencji w klubie oraz kilku dużych punktów zwrotnych. Dwie kariery zaczynające z podobnym OVR nie powinny automatycznie kończyć się w tym samym miejscu. Od 1.04.1 obsady zachowują ciągłość między sezonami: rywale starzeją się, rozwijają, regresują, awansują między poziomami i kończą kariery. Kadry i obsady tworzą dzięki temu nie tylko kontekst dla pojedynczego turnieju, ale równoległą historię sportową całego save'a.
