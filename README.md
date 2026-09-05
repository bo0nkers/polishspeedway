# Polish Speedway Simulator

## Wersja 1.03.2

Aktualizacja stabilizująca przełomowy system cykli wprowadzony w 1.03.x.

Najważniejsze zmiany:
- manualnie rozgrywane cykle SGP, SEC, SGP2 i IMP korzystają z tej samej roadmapy co pełna symulacja;
- po rozegraniu lub symulacji rundy wynik i pozycja w generalce odsłaniają się stopniowo w istniejącej karcie;
- każda zakończona runda ma rozwijane „Szczegóły rundy” zgodne z regulaminem danego cyklu;
- wynik ręcznie rozegranej rundy jest źródłem prawdy dla punktów, generalnej, awansów do LCQ/finału i końcowych osiągnięć;
- poprawiono centralne rozpoznawanie imprez i celebracje — rozdzielone są m.in. SGP, SGP2, DMŚJ, DME, DPŚ, SoN, IMP i MIMP;
- poprawiono ruletkę: biała kreska pozostaje na środku, a zwycięski segment zatrzymuje się nieregularnie pod wskaźnikiem;
- historia kariery ma dwa poziomy zwijania: etapy oraz poszczególne lata, z krótkim wyciągiem najważniejszych wydarzeń;
- leaderboard nie jest częścią tej wersji — zostanie opracowany osobno.

Zapis gry używa klucza `pss_v1032` i automatycznie migruje zapis z `pss_v1031` oraz wcześniejszych obsługiwanych wersji.
