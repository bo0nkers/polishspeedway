# Polish Speedway Simulator

## Wersja 1.00

- Utworzono grę **Polish Speedway Simulator**.

## Aktualizacja 1.01

- przebudowano system rozwoju kariery: najwyższy poziom zawodnika nie powinien już regularnie przypadać na ostatni sezon;
- naturalny szczyt formy najczęściej przypada na wiek **27–34 lata**, ale możliwe są także rzadkie wczesne fenomeny, późni rozkwitający zawodnicy oraz bardzo długowieczne kariery;
- dodano ukryte fazy rozwoju kariery: przełom, mocny impuls, stagnację, dołek, odbudowę i drugą młodość; fazy mogą utrzymywać się przez więcej niż jeden sezon i powodować realne fluktuacje OVR;
- zwiększono różnorodność przebiegu kariery — możliwe są szybkie skoki na początku, późniejsze plateau, regres, odbudowa, późny skok formy i falowanie poziomu sportowego;
- przebudowano kontuzje na kilka poziomów: drobne, umiarkowane, ciężkie i bardzo ciężkie; ciężkie urazy są rzadsze, a bardzo ciężkie wyjątkowe i mogą wpływać na dalszy potencjał kariery;
- ograniczono ryzyko ciężkich urazów podczas pojedynczych interaktywnych biegów i całych sezonów;
- zbalansowano rozwój z wydarzeń losowych: bonusy nie powinny już seryjnie pompować jednej cechy (np. ustawień sprzętu), a część wzrostu może przechodzić na słabiej rozwijane parametry;
- zachowano pełną fazę zasadniczą 16 zawodników / 20 biegów / 5 startów w IMP, SEC i SGP, także przy dzikich kartach;
- doprecyzowano punktację: **SGP 20-18-16-14-12-11-10-9-8-7-6-5-4-3-2-1 za końcowe miejsce rundy**; w SEC i IMP liczą się punkty z fazy zasadniczej oraz finału, a punkty z barażu nie są doliczane;
- poprawiono kolejność celebracji osiągnięć — najpierw wyświetlają się fajerwerki/awans, a dopiero po kliknięciu „PRZEJDŹ DALEJ” zwykły komunikat z wynikiem;
- rozbudowano komunikaty o awansach ligowych wynikających z sukcesji miejsc: gra informuje, gdy wyżej sklasyfikowane miejsce zajął klub zagraniczny **bez prawa awansu** oraz wskazuje, czy awans był bezpośredni, czy po barażu;
- zapis gry korzysta z klucza `pss_v101` i automatycznie migruje zapis z wersji 1.00 (`pss_v100`).

## Publikacja

Gra jest statyczna. Do działania wystarczą pliki z katalogu wydania:

- `index.html`
- `style.css`
- `app.js`
- `postaw-kawe.jpeg`
- `social-preview.jpg`
- `speedway-emblem.png`

Projekt można opublikować bez procesu buildowania, m.in. na Vercel, GitHub Pages, Netlify lub Cloudflare Pages.

## Adres projektu

- `https://polishspeedway.vercel.app/`
