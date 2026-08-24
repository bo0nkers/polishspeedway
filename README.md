# Polish Speedway Simulator

## Wersja 1.02

Aktualizacja 1.02 skupia się przede wszystkim na zróżnicowaniu przebiegu kariery oraz logice interaktywnych biegów.

### Najważniejsze zmiany

- mocno przebudowano długoterminowy rozwój OVR i statystyk: typowy przebieg ma teraz częściej przypominać wzrost → szczyt/plateau → regres, zamiast stałego wzrostu do ostatniego sezonu;
- zwiększono różnorodność karier: możliwe są wcześniejsze i późniejsze peaki, szybki wybuch formy, stagnacja, długie plateau, dołki, odbudowy, falowanie poziomu i rzadka druga młodość;
- dodano dziesięć warunkowych wydarzeń rozwojowych, które mogą przyspieszać, zatrzymywać lub cofać rozwój zależnie od przebiegu kariery;
- ograniczono nienaturalne pompowanie Kondycji do 99 i większą część bonusów skierowano do pozostałych umiejętności;
- poprawiono eksploatację juniorów i liczbę przydzielanych im biegów;
- przebudowano interaktywne biegi: prawdopodobieństwa uwzględniają m.in. OVR gracza i rywali, właściwe statystyki, formę dnia, sprzęt, ustawienia, odczytanie toru, team/mechanika, mentora i aktualną pozycję;
- sukces ofensywnej decyzji oznacza teraz realne powodzenie sportowe — np. udany atak faktycznie daje awans o pozycję;
- logicznie przebudowano warianty decyzji dla P1/P2/P3/P4, tak aby zawodnik jadący ostatni nie dostawał opcji typu „broń wyniku”;
- w walce o dziką kartę IMP pokazuje się OVR gracza i anonimowego rywala, a trzy strategie są wyraźniej zróżnicowane;
- wydarzenie kojarzące się z finałem IMP 2023 zastąpiono ogólnym wydarzeniem „Kalendarz nie odpuszcza”;
- po rozpoczęciu kariery strona automatycznie przewija się na samą górę;
- mobilne podsumowanie kariery jest ponownie zwarte i tabelaryczne, aby dało się objąć większą część historii na 1–2 screenshotach;
- po zakończeniu kariery widoczne są dwa wybory: „Nowa kariera” oraz istniejący przycisk/grafika „Postaw kawę”.

### Zapis gry

Wersja 1.02 zapisuje stan pod kluczem `pss_v102`. Przy pierwszym uruchomieniu automatycznie migruje zapis z `pss_v101` (wersja 1.01) oraz starszych obsługiwanych wersji.

## Pliki wydania

Gra jest statyczna i nie wymaga procesu buildowania. Do publikacji potrzebne są:

- `index.html`
- `style.css`
- `app.js`
- `postaw-kawe.jpeg`
- `social-preview.jpg`
- `speedway-emblem.png`

Trzy pliki graficzne nie zmieniły się w wydaniu 1.02. Jeśli podmieniasz istniejący deployment, wystarczy pozostawić je bez zmian i wgrać nowe `index.html`, `style.css`, `app.js` oraz `README.md`.

## Publikacja

Projekt można opublikować jako statyczną stronę m.in. na Vercel, GitHub Pages, Netlify lub Cloudflare Pages.

## Adres projektu

- `https://polishspeedway.vercel.app/`
