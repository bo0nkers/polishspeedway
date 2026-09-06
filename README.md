# Polish Speedway Simulator

## Wersja 1.03.3 — 6.09.2026

Wersja 1.03.3 rozwija przede wszystkim **wariancję ścieżek kariery**. Poziom startowy nadal ma duże znaczenie, ale nie powinien już w tak dużym stopniu wyznaczać końcowego pułapu zawodnika. Najsłabszy profil startowy może w wyjątkowej, dobrze poprowadzonej karierze dojść do światowej czołówki, a wysoki poziom początkowy nie jest gwarancją medali, SGP ani mistrzostwa świata.

### Najważniejsze zmiany 1.03.3

#### Duże zdarzenia kariery

Dodano nową warstwę rzadkich **dużych zdarzeń**, które mogą realnie zmienić trajektorię kariery. Ich zasada jest inna niż w zwykłych losowych wydarzeniach:

**faktyczny trigger w symulacji → informacje dla gracza → decyzja → częściowa losowość → długofalowa konsekwencja**.

Duże zdarzenie nie powinno samo wymyślać faktu, który wcześniej nie wystąpił. Przykładowo zdarzenie po kontuzji wymaga rzeczywistego urazu zapisanego przez grę, a kryzys po ważnym meczu wymaga rzeczywiście rozegranego lub świadomie zasymulowanego kluczowego spotkania.

W 1.03.3 dostępne są m.in.:

- eksperymentalny program silnikowy;
- odejście kluczowego mechanika;
- przebudowa stylu po poważnej kontuzji;
- przeciążony kalendarz wynikający z faktycznego workloadu;
- reakcja na realnie zawalony ważny mecz ligowy;
- rywalizacja o miejsce w składzie przy rzeczywiście niepewnej pozycji;
- przełom treningowy z wyborem konkretnego obszaru rozwoju;
- całkowita przebudowa przygotowań;
- późne zrozumienie żużla / możliwa „druga młodość”;
- sponsor z mierzalnym celem sportowym i wypłatą dopiero po jego wykonaniu;
- decyzja o tempie powrotu po ciężkim urazie;
- bardzo rzadki fenomenalny okres/sezon, który może stać się punktem zwrotnym kariery.

Skutki są rozłożone w czasie. System częściej zmienia tempo rozwoju, profil umiejętności, momentum, odporność na regres lub miękki pułap kariery niż przyznaje natychmiastowe, arbitralne punkty OVR.

Starsze losowe wersje kilku sytuacji, które dublowały nowy system (np. eksperymentalny silnik, sztuczny uraz przed ważnym meczem czy przypadkowy konflikt o rolę), zostały wyłączone z puli zwykłych eventów.

#### Większe nakładanie się trajektorii karier

Ukryty model potencjału nowych karier ma teraz mocniej zachodzące na siebie rozkłady. Profile startowe nadal pozostają takie jak w ekranie tworzenia zawodnika:

- **Szkółka od zera** — 15 lat, OVR ok. 36–43;
- **Zwykły adept** — 15 lat, OVR ok. 40–48;
- **Po licencji Ż** — 16 lat, OVR ok. 46–54;
- **Talent szkółki** — 16 lat, OVR ok. 53–61;
- **Rezerwowy junior** — 17 lat, OVR ok. 49–57.

Różnica polega na tym, że start jest teraz mocniej traktowany jako **przewaga lub utrudnienie na początku**, a nie jako niemal gotowa odpowiedź na pytanie o przyszły peak. Pozytywne punkty zwrotne mają trochę większą wartość dla zawodników, którzy zaczynali nisko i mają dużo przestrzeni do rozwoju; z kolei zawodnik już znajdujący się blisko elity ma mniej łatwych rezerw i może więcej stracić przy negatywnym ciągu zdarzeń.

#### Prognoza jazdy i realne biegi

Przebudowano powiązanie prognozy jazdy z faktycznym wykorzystaniem zawodnika w lidze.

- procent widoczny przy kontrakcie jest teraz bezpośrednio używany przy ustalaniu obecności w składzie na poszczególne mecze;
- 5–8% prognozy oznacza sporadyczne występy, a nie kilkadziesiąt biegów w sezonie;
- liczba biegów w meczu zależy od realnej roli: rezerwa, walka o skład, rotacja, podstawowy zawodnik lub lider;
- dobra sytuacja w trakcie kariery nadal może zmienić szanse na jazdę przez istniejące mechanizmy formy, rozwoju i decyzji klubowych.

#### PGE Ekstraliga — bardziej wiarygodny rynek

Niski OVR nie dostał sztywnego zakazu wejścia do PGE Ekstraligi, ale takie transfery są teraz znacznie bardziej wyjątkowe.

- bardzo młody zawodnik z wysokim ukrytym potencjałem może sporadycznie trafić do PGE jako głęboka rezerwa / projekt rozwojowy;
- niski OVR nie powinien dostawać obietnicy regularnej jazdy tylko dlatego, że algorytm wylosował mocny klub;
- pod uwagę nadal brane są wiek, status junior/U24/senior, OVR, potencjał, siła kadry, dopasowanie i faktyczna rola.

#### SEC od 2026 i równoległe SGP + SEC

Ujednolicono ścieżkę Speedway Euro Championship:

- **TOP 6 SEC** zachowuje miejsce w kolejnym sezonie;
- **TOP 6 SEC Challenge** awansuje do cyklu;
- SEC Challenge ma 16 zawodników;
- w modelu cyklu pozostają 3 stałe dzikie karty oraz lokalna dzika karta na rundę;
- kwalifikacja do SGP nie blokuje już SEC;
- zawodnik posiadający miejsce w SEC może świadomie zdecydować, czy z niego korzysta;
- zawodnik SGP może zgłosić się do eliminacji SEC, jeśli otrzyma taką możliwość;
- jazda SGP + SEC jednocześnie zwiększa faktyczne obciążenie, utrudnia regenerację i podnosi ryzyko urazu, ale daje też więcej ekspozycji na mocną stawkę i niewielki dodatkowy bodziec rozwojowy.

#### Sponsor z celem

Duża premia sponsora nie jest już „pieniędzmi z góry”. Jeśli wydarzenie sponsorskie się pojawi, gra proponuje cele dopasowane do rzeczywistych rozgrywek i poziomu zawodnika — np. konkretną średnią ligową lub miejsce w SGP/SEC. Gracz wybiera cel rozsądny, ambitny albo odrzuca propozycję. Premia jest wypłacana dopiero po zakończeniu sezonu, jeżeli warunek został spełniony.

#### Koszty dużych decyzji

Wydatki w nowych dużych zdarzeniach korzystają ze skalowania do poziomu finansowego kariery, ale mają również stałe minimum. Dzięki temu mechanik, projekt silnikowy czy profesjonalna regeneracja pozostają realnym kosztem zarówno dla młodego zawodnika, jak i gwiazdy zarabiającej wielokrotnie więcej.

### Zapis gry

Aktualny zapis używa klucza:

`pss_v1033`

Przy pierwszym uruchomieniu 1.03.3 gra automatycznie odczytuje i migruje zapis z `pss_v1032` oraz wcześniejszych obsługiwanych wersji.

**Ważne:** istniejąca kariera zachowuje swoje wcześniej wylosowane DNA/potencjał, aby aktualizacja nie przepisała wstecz całej jej historii. Nowy, szerzej rozłożony model startowej trajektorii jest w pełni stosowany do nowych karier; stare zapisy mogą natomiast korzystać z nowych dużych zdarzeń i ich wpływu na dalszą trajektorię.

### Uruchomienie

Gra nie wymaga instalacji ani serwera. Otwórz `index.html` w nowoczesnej przeglądarce. Dane kariery są przechowywane lokalnie w `localStorage` przeglądarki.

---

# Historia wersji

Poniższa historia została odtworzona z README 1.03.2, komentarzy wersjonujących i kolejnych warstw patchy znajdujących się w kodzie. Dla najstarszych wersji 1.00–1.01 nie zachował się w paczce 1.03.2 osobny pełny changelog, dlatego opis tych dwóch wydań jest rekonstrukcją najważniejszych zmian widocznych w kodzie.

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

## Założenie projektu po 1.03.3

**Talent daje prawdopodobieństwo, nie gwarancję wyniku.**

Poziom startowy ma nadal realnie zmieniać trudność pierwszych lat, ale najciekawsze kariery powinny być definiowane przez połączenie rozwoju, decyzji gracza, dostępnych okazji, zdrowia, sprzętu, teamu, kalendarza i kilku dużych punktów zwrotnych. Dwie kariery zaczynające z podobnym OVR nie powinny automatycznie kończyć się w tym samym miejscu.
