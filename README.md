# Polish Speedway Simulator

## Wersja 1.02.1

Poprawkowe wydanie bazujące na przebudowanej wersji 1.02. Zachowuje nowy model progresji kariery, interaktywne biegi, finanse turniejowe i pozostałe mechanizmy 1.02, a naprawia błędy ujawnione podczas kolejnych pełnych karier testowych.

### Najważniejsze poprawki 1.02.1

- **DMŚJ nie jest cyklem.** Drużynowe Mistrzostwa Świata Juniorów są traktowane jako impreza reprezentacyjna z ewentualnymi eliminacjami i finałem. Nie pojawia się już fikcyjne „10/10” czy „12/12 rund”, liczba podiów w cyklu ani premia za klasyfikację końcową cyklu.
- Naprawiono klasyfikację nazw zawodów: konkretne imprezy juniorskie i drużynowe są rozpoznawane przed ogólnym określeniem „Mistrzostwa Świata”. Dzięki temu **DMŚJ nie może zostać pomylone z SGP**.
- **Obniżono gratyfikacje DMŚJ** do poziomu juniorskiej imprezy reprezentacyjnej. Przykładowo srebro przy pięciu startach daje około 22 tys. zł przed ewentualnym niewielkim bonusem sponsora, a nie setki tysięcy złotych.
- Dodano twardą listę cykli finansowych: tylko **SGP, SEC, IMP i SGP2** mogą korzystać z rozliczenia sezonowego X/Y rund, podiów, zwycięstw i premii końcowej.
- Na końcu kariery ponownie pojawia się **automatyczny pop-up z dwiema opcjami: „Nowa kariera” i „Postaw kawę”**. Te same dwa wybory pozostają również na stałym ekranie podsumowania kariery.
- Na desktopie delikatnie zwiększono rozmiar tekstu przycisku **„Nowa kariera”** przy końcowym podsumowaniu.
- Usunięto wyraźny **bias podpowiedzi mentora w stronę krawężnika**. Techniczny tor lub wymagający pierwszy łuk nie są już automatycznie utożsamiane z jazdą po wewnętrznej, a wybór linii mocniej zależy od realnych cech zawodnika i aktualnego stanu toru.
- Neutralne motywy `balanced`, `safe` i podobne nie wpadają już automatycznie w krawężnik jako domyślny fallback. Linia wewnętrzna i szeroka są wybierane kontekstowo dla danej fazy biegu.
- Poprawiono **narrację przy układzie 5:1**. Jeśli po pierwszym łuku gracz jedzie drugi za partnerem i drużyna ma podwójne prowadzenie, gra nie mówi już, że „start nie układa się po twojej myśli”.
- Ograniczono powtarzanie tej samej informacji o pozycji i układzie biegu w nagłówku, opisie i kolejnym zdaniu.
- Na rynku transferowym rola zawodnika jest mocniej powiązana z **prognozą jazdy**. Oferta pozostania może nadal wynikać z lojalności i dobrej relacji z klubem, ale prognoza rzędu kilku procent nie powinna być opisana jako pewna rola „Podstawowego zawodnika”.
- Zachowano przebudowany model progresji z 1.02: częste kariery mają naturalny układ **rozwój → peak / plateau → regres**, ale nadal możliwe są późny rozkwit, wcześniejszy szczyt, długa stabilizacja, odbudowa, druga młodość i wyjątkowa długowieczność.

### Zapis gry

Wersja 1.02.1 używa klucza `pss_v1021` i automatycznie migruje zapis z `pss_v102`, `pss_v101` oraz starszych obsługiwanych wersji.

### Pliki wydania

Do publikacji potrzebne są:

- `index.html`
- `style.css`
- `app.js`
- `postaw-kawe.jpeg`
- `social-preview.jpg`
- `speedway-emblem.png`

Trzy pliki graficzne nie zostały zmienione. Przy aktualizacji istniejącego deploymentu wystarczy pozostawić je na serwerze i podmienić `index.html`, `style.css`, `app.js` oraz opcjonalnie `README.md`.

### Publikacja

Gra jest statyczna i nie wymaga procesu buildowania. Może być publikowana m.in. na Vercel, GitHub Pages, Netlify lub Cloudflare Pages.

## Adres projektu

- `https://polishspeedway.vercel.app/`
