const $=id=>document.getElementById(id);
const clamp=(v,a=0,b=100)=>Math.max(a,Math.min(b,v));
const rand=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const pick=a=>a[rand(0,a.length-1)];
const money=n=>new Intl.NumberFormat("pl-PL").format(Math.round(n))+" zł";
const avg=(p,b,h)=>h?((p+b)/h).toFixed(3).replace(".",","):"0,000";

const LEAGUES=[
 {id:1,name:"PGE Ekstraliga",level:1,teams:[
  ["PRES Grupa Deweloperska Toruń",86],["ORLEN OIL Motor Lublin",88],["Betard Sparta Wrocław",87],["BAYERSYSTEM GKM Grudziądz",80],
  ["Stelmet Falubaz Zielona Góra",79],["FOGO Unia Leszno",82],["KRONO-PLAST Włókniarz Częstochowa",76],["GEZET Stal Gorzów",77]
 ]},
 {id:2,name:"Metalkas 2. Ekstraliga",level:2,teams:[
  ["Abramczyk Polonia Bydgoszcz",75],["Cellfast Wilki Krosno",74],["INNPRO ROW Rybnik",72],["Dakar Development Stal Rzeszów",68],
  ["Hunters PSŻ Poznań",67],["H. Skrzydlewska Orzeł Łódź",65],["Polonia Piła",63],["Moonfin Magnus Ostrów Wielkopolski",64]
 ]},
 {id:3,name:"Krajowa Liga Żużlowa",level:3,teams:[
  ["Wybrzeże Gdańsk",61],["ULTRAPUR Start Gniezno",60],["TRANS MF Landshut Devils",59],["OK Kolejarz Opole",55],
  ["LVBET Lokomotiv Daugavpils",57],["Speedway Kraków",49],["Śląsk Świętochłowice",48]
 ]}
];


const TRACK_PROFILES={
 "PRES Grupa Deweloperska Toruń":{label:"szybki, szeroki tor",skill:"distance",bonus:"jazda na dystansie"},
 "ORLEN OIL Motor Lublin":{label:"techniczny tor z wymagającym pierwszym łukiem",skill:"corner",bonus:"pierwszy łuk"},
 "Betard Sparta Wrocław":{label:"długi i płynny tor",skill:"distance",bonus:"jazda na dystansie"},
 "BAYERSYSTEM GKM Grudziądz":{label:"krótki, techniczny tor",skill:"technique",bonus:"technika"},
 "Stelmet Falubaz Zielona Góra":{label:"tor premiujący start i pierwszy łuk",skill:"starts",bonus:"start"},
 "FOGO Unia Leszno":{label:"szybki tor do ścigania",skill:"overtaking",bonus:"wyprzedzanie"},
 "KRONO-PLAST Włókniarz Częstochowa":{label:"tor wymagający dobrych ustawień",skill:"setup",bonus:"ustawienia sprzętu"},
 "GEZET Stal Gorzów":{label:"krótki, bardzo techniczny tor",skill:"technique",bonus:"technika"},
 "Abramczyk Polonia Bydgoszcz":{label:"długi tor premiujący jazdę na dystansie",skill:"distance",bonus:"jazda na dystansie"},
 "Cellfast Wilki Krosno":{label:"techniczny tor, na którym ważny jest pierwszy łuk",skill:"corner",bonus:"pierwszy łuk"},
 "INNPRO ROW Rybnik":{label:"tor z dużym znaczeniem startu",skill:"starts",bonus:"start"},
 "Dakar Development Stal Rzeszów":{label:"długi tor premiujący prędkość na dystansie",skill:"distance",bonus:"jazda na dystansie"},
 "Hunters PSŻ Poznań":{label:"równy tor wymagający dobrego setupu",skill:"setup",bonus:"ustawienia sprzętu"},
 "H. Skrzydlewska Orzeł Łódź":{label:"techniczny tor z ciasnym pierwszym łukiem",skill:"corner",bonus:"pierwszy łuk"},
 "Polonia Piła":{label:"tor sprzyjający odważnej jeździe i wyprzedzaniu",skill:"overtaking",bonus:"wyprzedzanie"},
 "Moonfin Magnus Ostrów Wielkopolski":{label:"szybki tor, na którym liczy się dystans",skill:"distance",bonus:"jazda na dystansie"},
 "Wybrzeże Gdańsk":{label:"techniczny tor wymagający dobrego prowadzenia motocykla",skill:"technique",bonus:"technika"},
 "ULTRAPUR Start Gniezno":{label:"tor premiujący dobry start",skill:"starts",bonus:"start"},
 "TRANS MF Landshut Devils":{label:"szybki i szeroki tor",skill:"distance",bonus:"jazda na dystansie"},
 "OK Kolejarz Opole":{label:"krótki tor techniczny",skill:"technique",bonus:"technika"},
 "LVBET Lokomotiv Daugavpils":{label:"długi tor wymagający jazdy na dystansie",skill:"distance",bonus:"jazda na dystansie"},
 "Speedway Kraków":{label:"tor, na którym duże znaczenie ma pierwszy łuk",skill:"corner",bonus:"pierwszy łuk"},
 "Śląsk Świętochłowice":{label:"krótki tor premiujący technikę",skill:"technique",bonus:"technika"}
};

const LOCAL_MENTORS={
 "PRES Grupa Deweloperska Toruń":[
  {name:"Wojciech Żabiałowicz",tier:"local",cost:22000,desc:"starty i prowadzenie motocykla na szybkich torach",effects:{starts:2,distance:2,corner:1}},
  {name:"Jacek Krzyżaniak",tier:"local",cost:26000,desc:"pierwszy łuk, regularność i jazda meczowa",effects:{corner:2,mental:2,starts:1}},
  {name:"Robert Sawina",tier:"regional",cost:31000,desc:"taktyka, przygotowanie mentalne i analiza rywali",effects:{mental:3,technique:1},pro:2}
 ],
 "ORLEN OIL Motor Lublin":[
  {name:"Marek Kępa",tier:"local",cost:22000,desc:"podstawy startowe i odnajdywanie się w drużynie",effects:{starts:2,corner:1,mental:1},pro:1},
  {name:"Dariusz Śledź",tier:"regional",cost:30000,desc:"taktyka meczowa i praca pod presją",effects:{mental:3,corner:2},pro:2},
  {name:"Hans Nielsen",tier:"star",cost:80000,desc:"mistrzowska regularność, start i czytanie toru",effects:{starts:5,distance:4,mental:4},pro:5,minRep:55,minOverall:75}
 ],
 "Betard Sparta Wrocław":[
  {name:"Piotr Baron",tier:"local",cost:25000,desc:"ustawienia sprzętu, analiza toru i przygotowanie meczowe",effects:{setup:3,technique:2},pro:2},
  {name:"Dariusz Śledź",tier:"local",cost:27000,desc:"psychika, taktyka i zarządzanie trudnym spotkaniem",effects:{mental:3,corner:2},pro:2},
  {name:"Sławomir Drabik",tier:"regional",cost:36000,desc:"odważna jazda i wyprzedzanie na dystansie",effects:{overtaking:3,distance:3,mental:1}}
 ],
 "BAYERSYSTEM GKM Grudziądz":[
  {name:"Robert Kempiński",tier:"local",cost:23000,desc:"technika na krótkim torze i praca nad pierwszym łukiem",effects:{technique:3,corner:2}},
  {name:"Krzysztof Buczkowski",tier:"regional",cost:33000,desc:"regularność, przygotowanie fizyczne i jazda ligowa",effects:{fitness:2,distance:2,mental:2}},
  {name:"Tomasz Gollob",tier:"star",cost:90000,desc:"czytanie toru, dystans i wyprzedzanie na najwyższym poziomie",effects:{distance:5,overtaking:5,mental:3},minRep:65,minOverall:80}
 ],
 "Stelmet Falubaz Zielona Góra":[
  {name:"Andrzej Huszcza",tier:"local",cost:25000,desc:"regularność, profesjonalizm i przywiązanie do klubu",effects:{mental:2,fitness:2},pro:3},
  {name:"Piotr Protasiewicz",tier:"regional",cost:39000,desc:"ustawienia, start i techniczna jazda",effects:{setup:3,starts:2,technique:2},pro:2},
  {name:"Rafał Dobrucki",tier:"regional",cost:36000,desc:"pierwszy łuk i rozwój młodego zawodnika",effects:{corner:3,starts:2,mental:2},pro:2}
 ],
 "FOGO Unia Leszno":[
  {name:"Roman Jankowski",tier:"local",cost:25000,desc:"jazda na dystansie, płynność i doświadczenie ligowe",effects:{distance:3,technique:2}},
  {name:"Damian Baliński",tier:"local",cost:27000,desc:"waleczność, wyprzedzanie i jazda w kontakcie",effects:{overtaking:3,mental:2,distance:1}},
  {name:"Adam Skórnicki",tier:"regional",cost:34000,desc:"taktyka, start i przygotowanie do turniejów",effects:{starts:2,mental:3,corner:1},pro:2}
 ],
 "KRONO-PLAST Włókniarz Częstochowa":[
  {name:"Sławomir Drabik",tier:"local",cost:28000,desc:"odwaga, dystans i atakowanie rywali",effects:{distance:3,overtaking:3}},
  {name:"Sebastian Ułamek",tier:"local",cost:27000,desc:"start, pierwszy łuk i techniczna regularność",effects:{starts:2,corner:2,technique:2}},
  {name:"Grzegorz Walasek",tier:"regional",cost:34000,desc:"doświadczenie ligowe, ustawienia i psychika",effects:{setup:2,mental:3,distance:1}}
 ],
 "GEZET Stal Gorzów":[
  {name:"Piotr Świst",tier:"local",cost:26000,desc:"wyprzedzanie, waleczność i prędkość na dystansie",effects:{overtaking:3,distance:3}},
  {name:"Jerzy Rembas",tier:"local",cost:24000,desc:"technika, pierwszy łuk i konsekwentna jazda",effects:{technique:2,corner:2,mental:1}},
  {name:"Stanisław Chomski",tier:"regional",cost:35000,desc:"taktyka drużynowa i przygotowanie do najważniejszych biegów",effects:{mental:3,corner:2},pro:3}
 ],
 "Abramczyk Polonia Bydgoszcz":[
  {name:"Jacek Gollob",tier:"local",cost:30000,desc:"start, pierwszy łuk i agresywna jazda meczowa",effects:{starts:3,corner:2,overtaking:1}},
  {name:"Piotr Protasiewicz",tier:"regional",cost:38000,desc:"ustawienia sprzętu i regularność",effects:{setup:3,technique:2,mental:2},pro:2},
  {name:"Tomasz Gollob",tier:"star",cost:95000,desc:"mistrzowskie czytanie toru, dystans i wyprzedzanie",effects:{distance:6,overtaking:5,mental:3},minRep:60,minOverall:78}
 ],
 "Cellfast Wilki Krosno":[
  {name:"Grzegorz Kłopot",tier:"local",cost:19000,desc:"pierwszy łuk, podstawy ligowe i praca na technicznym torze",effects:{corner:2,technique:2,starts:1}},
  {name:"Rafał Wilk",tier:"local",cost:21000,desc:"psychika, profesjonalizm i odbudowa po niepowodzeniach",effects:{mental:3,fitness:1},pro:2},
  {name:"Janusz Ślączka",tier:"regional",cost:29000,desc:"taktyka ligowa, ustawienia i walka o skład",effects:{setup:2,mental:2,corner:2},pro:2}
 ],
 "INNPRO ROW Rybnik":[
  {name:"Eugeniusz Skupień",tier:"local",cost:22000,desc:"start, technika i tradycyjna szkoła rybnicka",effects:{starts:2,technique:3}},
  {name:"Adam Pawliczek",tier:"local",cost:24000,desc:"pierwszy łuk i regularna jazda ligowa",effects:{corner:3,mental:2}},
  {name:"Andrzej Wyglenda",tier:"star",cost:72000,desc:"mistrzowska technika i przygotowanie mentalne",effects:{technique:5,mental:4,corner:3},minRep:50,minOverall:72}
 ],
 "Dakar Development Stal Rzeszów":[
  {name:"Grzegorz Kuźniar",tier:"local",cost:21000,desc:"start, odwaga i charakter rzeszowskiego toru",effects:{starts:2,distance:2,mental:1}},
  {name:"Janusz Stachyra",tier:"local",cost:24000,desc:"technika, ustawienia i doświadczenie ligowe",effects:{technique:2,setup:2,mental:1}},
  {name:"Maciej Kuciapa",tier:"regional",cost:31000,desc:"pierwszy łuk, praca ze sprzętem i profesjonalizm",effects:{corner:3,setup:2},pro:2}
 ],
 "Hunters PSŻ Poznań":[
  {name:"Daniel Pytel",tier:"local",cost:20000,desc:"starty, rozwój młodzieżowy i jazda na Golęcinie",effects:{starts:2,corner:2,fitness:1}},
  {name:"Adam Skórnicki",tier:"regional",cost:32000,desc:"taktyka, psychika i przygotowanie turniejowe",effects:{mental:3,starts:2},pro:2},
  {name:"Tomasz Bajerski",tier:"regional",cost:33000,desc:"ustawienia i wydobywanie prędkości ze sprzętu",effects:{setup:3,distance:2},equipment:1}
 ],
 "H. Skrzydlewska Orzeł Łódź":[
  {name:"Janusz Ślączka",tier:"local",cost:23000,desc:"taktyka ligowa, pierwszy łuk i walka o skład",effects:{corner:2,mental:2,setup:1},pro:2},
  {name:"Piotr Świderski",tier:"regional",cost:29000,desc:"technika i przygotowanie fizyczne",effects:{technique:3,fitness:2}},
  {name:"Adam Skórnicki",tier:"regional",cost:32000,desc:"starty, psychika i prowadzenie meczu",effects:{starts:2,mental:3},pro:2}
 ],
 "Polonia Piła":[
  {name:"Rafał Dobrucki",tier:"local",cost:26000,desc:"pierwszy łuk i rozwój młodego zawodnika",effects:{corner:3,starts:2,mental:1}},
  {name:"Jarosław Hampel",tier:"regional",cost:42000,desc:"start, płynność i zachowanie spokoju",effects:{starts:3,distance:2,mental:2}},
  {name:"Hans Nielsen",tier:"star",cost:85000,desc:"regularność i mistrzowskie przygotowanie do zawodów",effects:{starts:5,mental:4,distance:4},pro:4,minRep:60,minOverall:78}
 ],
 "Moonfin Magnus Ostrów Wielkopolski":[
  {name:"Mariusz Staszewski",tier:"local",cost:24000,desc:"ustawienia, praca szkoleniowa i przygotowanie meczowe",effects:{setup:3,technique:2},pro:2},
  {name:"Sebastian Ułamek",tier:"regional",cost:30000,desc:"starty i techniczna jazda",effects:{starts:3,corner:2,technique:1}},
  {name:"Peter Karlsson",tier:"regional",cost:37000,desc:"dystans, profesjonalizm i długowieczność kariery",effects:{distance:3,fitness:2,mental:2},pro:2}
 ],
 "Wybrzeże Gdańsk":[
  {name:"Mirosław Berliński",tier:"local",cost:22000,desc:"technika, pierwszy łuk i historia gdańskiego toru",effects:{technique:3,corner:2}},
  {name:"Krzysztof Cegielski",tier:"regional",cost:30000,desc:"psychika, profesjonalizm i świadome prowadzenie kariery",effects:{mental:3,fitness:1},pro:3},
  {name:"Renat Gafurow",tier:"regional",cost:33000,desc:"waleczność, dystans i regularność",effects:{distance:3,overtaking:2,mental:1}}
 ],
 "ULTRAPUR Start Gniezno":[
  {name:"Tomasz Fajfer",tier:"local",cost:22000,desc:"start, pierwszy łuk i gnieźnieńska szkoła jazdy",effects:{starts:3,corner:2}},
  {name:"Krzysztof Jabłoński",tier:"local",cost:25000,desc:"technika, dystans i doświadczenie turniejowe",effects:{technique:2,distance:2,mental:1}},
  {name:"Adam Fajfer",tier:"local",cost:21000,desc:"regularność i przygotowanie fizyczne",effects:{fitness:2,mental:2,starts:1}}
 ],
 "TRANS MF Landshut Devils":[
  {name:"Martin Smolinski",tier:"local",cost:33000,desc:"starty, sprzęt i jazda na szybkich torach",effects:{starts:3,setup:2,distance:2},equipment:1},
  {name:"Gerd Riss",tier:"star",cost:65000,desc:"technika, balans i mistrzowska kontrola motocykla",effects:{technique:5,mental:3,fitness:2},minRep:45,minOverall:70},
  {name:"Erik Riss",tier:"regional",cost:39000,desc:"nowoczesna technika i prędkość na dystansie",effects:{technique:3,distance:3}}
 ],
 "OK Kolejarz Opole":[
  {name:"Wojciech Załuski",tier:"local",cost:20000,desc:"technika i przygotowanie do krótkiego toru",effects:{technique:3,corner:1}},
  {name:"Piotr Żyto",tier:"local",cost:22000,desc:"taktyka, psychika i ustawienia",effects:{mental:2,setup:2},pro:2},
  {name:"Marian Spychała",tier:"regional",cost:28000,desc:"szkolenie, start i regularność",effects:{starts:2,fitness:2,mental:1},pro:1}
 ],
 "LVBET Lokomotiv Daugavpils":[
  {name:"Nikołaj Kokin",tier:"local",cost:21000,desc:"szkolenie, technika i znajomość długiego toru",effects:{technique:2,distance:2,setup:1},pro:1},
  {name:"Maksim Bogdanow",tier:"local",cost:24000,desc:"starty i agresywna jazda na dystansie",effects:{starts:2,distance:3}},
  {name:"Andrzej Lebiediew",tier:"regional",cost:40000,desc:"prędkość, psychika i przygotowanie międzynarodowe",effects:{distance:3,mental:3,fitness:1}}
 ],
 "Speedway Kraków":[
  {name:"Rafał Trojanowski",tier:"local",cost:20000,desc:"jazda ligowa, pierwszy łuk i walka na dystansie",effects:{corner:2,distance:2,mental:1}},
  {name:"Paweł Staszek",tier:"local",cost:21000,desc:"technika, start i doświadczenie na różnych torach",effects:{technique:2,starts:2,fitness:1}},
  {name:"Janusz Ślączka",tier:"regional",cost:29000,desc:"taktyka, ustawienia i rozwój młodego zawodnika",effects:{mental:2,setup:2,corner:2},pro:2}
 ],
 "Śląsk Świętochłowice":[
  {name:"Krzysztof Bas",tier:"local",cost:19000,desc:"technika krótkiego toru i pierwszy łuk",effects:{technique:2,corner:2,starts:1}},
  {name:"Marek Mróz",tier:"local",cost:20000,desc:"regularność, przygotowanie fizyczne i walka w kontakcie",effects:{fitness:2,mental:2,overtaking:1}},
  {name:"Sebastian Ułamek",tier:"regional",cost:30000,desc:"start i techniczna jazda na śląskich torach",effects:{starts:3,technique:2,corner:1}}
 ]
};

const NATIONAL_MENTORS=[
 {name:"Marek Cieślak",tier:"elite",cost:52000,desc:"taktyka meczowa i profesjonalne prowadzenie kariery",effects:{mental:3,corner:2},pro:4,minRep:28,minOverall:66},
 {name:"Rafał Dobrucki",tier:"elite",cost:50000,desc:"praca z młodym zawodnikiem, pierwszy łuk i psychika",effects:{corner:3,starts:2,mental:2},pro:2,minRep:24,minOverall:63},
 {name:"Greg Hancock",tier:"star",cost:90000,desc:"starty, profesjonalizm i odporność mentalna",effects:{starts:5,mental:5},pro:6,minRep:62,minOverall:79},
 {name:"Tony Rickardsson",tier:"star",cost:95000,desc:"technika, ustawienia i analiza sprzętu",effects:{technique:5,setup:5},equipment:3,minRep:67,minOverall:81},
 {name:"Jason Crump",tier:"star",cost:88000,desc:"jazda pod presją i przygotowanie do wielkich turniejów",effects:{distance:4,mental:5,overtaking:2},minRep:58,minOverall:77},
 {name:"Sam Ermolenko",tier:"star",cost:78000,desc:"wyprzedzanie, pewność siebie i agresywna jazda",effects:{overtaking:5,mental:3,distance:2},minRep:52,minOverall:74}
];


const REGION_CLUBS={
 "Dolnośląskie":["Betard Sparta Wrocław","Moonfin Magnus Ostrów Wielkopolski"],
 "Kujawsko-pomorskie":["PRES Grupa Deweloperska Toruń","Abramczyk Polonia Bydgoszcz","BAYERSYSTEM GKM Grudziądz"],
 "Lubelskie":["ORLEN OIL Motor Lublin","Dakar Development Stal Rzeszów"],
 "Lubuskie":["Stelmet Falubaz Zielona Góra","GEZET Stal Gorzów"],
 "Łódzkie":["H. Skrzydlewska Orzeł Łódź","Moonfin Magnus Ostrów Wielkopolski"],
 "Małopolskie":["Speedway Kraków","Cellfast Wilki Krosno"],
 "Mazowieckie":["H. Skrzydlewska Orzeł Łódź","Abramczyk Polonia Bydgoszcz","Speedway Kraków"],
 "Opolskie":["OK Kolejarz Opole","Śląsk Świętochłowice"],
 "Podkarpackie":["Cellfast Wilki Krosno","Dakar Development Stal Rzeszów"],
 "Podlaskie":["LVBET Lokomotiv Daugavpils","Abramczyk Polonia Bydgoszcz"],
 "Pomorskie":["Wybrzeże Gdańsk","Polonia Piła"],
 "Śląskie":["KRONO-PLAST Włókniarz Częstochowa","INNPRO ROW Rybnik","Śląsk Świętochłowice"],
 "Świętokrzyskie":["Speedway Kraków","Dakar Development Stal Rzeszów","KRONO-PLAST Włókniarz Częstochowa"],
 "Warmińsko-mazurskie":["Wybrzeże Gdańsk","PRES Grupa Deweloperska Toruń"],
 "Wielkopolskie":["FOGO Unia Leszno","Hunters PSŻ Poznań","Polonia Piła","ULTRAPUR Start Gniezno","Moonfin Magnus Ostrów Wielkopolski"],
 "Zachodniopomorskie":["Polonia Piła","Wybrzeże Gdańsk","Hunters PSŻ Poznań"]
};
const FOREIGN_POLISH_LEAGUE_CLUBS=new Set(["Landshut Devils","Lokomotiv Daugavpils","MSC Wölfe Wittstock","AMK Zlatá Přilba Pardubice"]);
function isForeignPolishLeagueClub(name){return FOREIGN_POLISH_LEAGUE_CLUBS.has(clubBaseName(name))}
const EXPANSION_CLUBS=[
 {name:"Unia Tarnów",city:"Tarnów",strength:52,type:"reaktywacja"},
 {name:"Rawicz Speedway",city:"Rawicz",strength:48,type:"reaktywacja"},
 {name:"Victoria Machowa",city:"Machowa",strength:43,type:"reaktywacja"},
 {name:"Silesia Katowice",city:"Katowice",strength:46,type:"nowa sekcja"},
 {name:"Warszawski Klub Żużlowy",city:"Warszawa",strength:50,type:"nowa sekcja"},
 {name:"Gryfy Szczecin",city:"Szczecin",strength:44,type:"nowa sekcja"},
 {name:"Kielce Speedway",city:"Kielce",strength:43,type:"nowa sekcja"},
 {name:"Podlasie Białystok",city:"Białystok",strength:42,type:"nowa sekcja"},
 {name:"MSC Wölfe Wittstock",city:"Wittstock",strength:52,type:"powrót zagraniczny"},
 {name:"AMK Zlatá Přilba Pardubice",city:"Pardubice",strength:55,type:"dołączenie zagraniczne"}
];
function snapshotWorld(){
 return LEAGUES.map(l=>({id:l.id,name:l.name,level:l.level,teams:l.teams.map(t=>[t[0],t[1]])}));
}
function restoreWorld(){
 if(!S?.worldLeagues)return;
 S.worldLeagues.forEach(saved=>{
  const league=LEAGUES.find(l=>l.id===saved.id);
  if(league)league.teams=saved.teams.map(t=>[t[0],t[1]]);
 });
}
function syncWorld(){
 S.worldLeagues=snapshotWorld();
}
function clubLeagueName(club){
 const base=clubBaseName(club);
 const found=LEAGUES.find(l=>l.teams.some(t=>clubBaseName(t[0])===base));
 return found?.name||null;
}
function refreshAcademyChoices(){
 const region=$("region")?.value||"Podkarpackie";
 const select=$("academyClub");if(!select)return;
 const available=(REGION_CLUBS[region]||[]).filter((name,i,a)=>a.indexOf(name)===i);
 select.innerHTML=available.map((name,i)=>`<option value="${name}">${i===0?"Najbliższa opcja: ":""}${name}</option>`).join("");
}

const ARCH={
 starter:{name:"Startowiec",skills:{starts:6,corner:4,distance:-2},other:{}},
 fighter:{name:"Walczak",skills:{distance:5,mental:3,overtaking:3},other:{injuryRisk:4}},
 technician:{name:"Technik",skills:{technique:6,setup:3,starts:-2},other:{}},
 mechanic:{name:"Sprzętowiec",skills:{setup:7},other:{equipment:6,media:-3}},
 talent:{name:"Naturalny talent",skills:{technique:4,distance:4,starts:2},other:{professionalism:-5}}
};
const SKILLS={starts:"Start",corner:"Pierwszy łuk",distance:"Jazda na dystansie",technique:"Technika",fitness:"Kondycja",setup:"Ustawienia sprzętu",mental:"Psychika",overtaking:"Wyprzedzanie"};

const EVENTS=[
 ["Stary mistrz pokazuje ci zapis swoich startów.","Materiał wygląda jak kurs sztuki, której nie da się już odtworzyć.",15,40,[
  ["Oglądam do końca","20% → technika +3 • 80% → bez zmian",[[20,{skill:["technique",3]}],[80,{}]]],
  ["Idę trenować po swojemu","100% → profesjonalizm +5",[[100,{professionalism:5}]]]
 ]],
 ["Robi się o tobie głośno. Duży portal prosi o wywiad.","Po dobrym występie zaczynasz być rozpoznawalny poza własnym regionem.",16,40,[
  ["Udzielam wywiadu","70% → medialność +12 • 30% → niefortunny cytat, relacja z klubem -7",[[70,{media:12,reputation:4}],[30,{media:7,clubRelation:-7}]]],
  ["Trzymam się z boku","Profesjonalizm +4",[[100,{professionalism:4}]]]
 ]],
 ["Tuner proponuje eksperymentalny silnik.","Jednostka jest szybka, ale nie była jeszcze sprawdzona w lidze.",17,40,[
  ["Biorę go na sezon","65% → sprzęt +9 • 35% → awaryjność i koszty",[[65,{equipment:9}],[35,{equipment:-3,budget:-12000}]]],
  ["Zostaję przy sprawdzonym sprzęcie","Profesjonalizm +3 • sprzęt +1",[[100,{professionalism:3,equipment:1}]]]
 ]],
 ["Masz możliwość dodatkowych startów w lidze zagranicznej.","Więcej jazdy oznacza rozwój i pieniądze, ale też przemęczenie.",18,38,[
  ["Podpisuję kontrakt","70% → rozwój +2 i 20 000 zł • 30% → uraz",[[70,{randomSkill:2,budget:20000,reputation:5}],[30,{injuryRisk:8,morale:-6,budget:8000}]]],
  ["Odpuszczam","Ryzyko urazu -3 • morale +2",[[100,{injuryRisk:-3,morale:2}]]]
 ]],
 ["Menedżer publicznie krytykuje twoją postawę.","Twierdzi, że oczekiwał od ciebie większej odpowiedzialności.",16,40,[
  ["Odpowiadam w mediach","50% → reputacja +8 • 50% → wypadasz ze składu",[[50,{reputation:8,media:8}],[50,{clubRelation:-15,chance:-15}]]],
  ["Rozmawiam prywatnie","70% → relacja +8 • 30% → bez efektu",[[70,{clubRelation:8,professionalism:3}],[30,{}]]],
  ["Przepraszam drużynę","Lojalność +5 • morale -2",[[100,{loyalty:5,morale:-2}]]]
 ]],
 ["Sponsor chce umieścić wielkie logo na twoim kevlarze.","Oferta jest dobra finansowo, lecz firma budzi mieszane reakcje kibiców.",17,40,[
  ["Przyjmuję","80% → 30 000 zł • 20% → reputacja -8",[[80,{budget:30000,media:5}],[20,{budget:30000,reputation:-8}]]],
  ["Odrzucam","Reputacja +3 • lojalność +2",[[100,{reputation:3,loyalty:2}]]]
 ]],
 ["Mechanik chce podwyżki.","Twierdzi, że przy obecnej liczbie startów nie jest w stanie dalej pracować za dotychczasową stawkę.",18,40,[
  ["Płacę 15 000 zł","Relacja z teamem i sprzęt +5",[[100,{budget:-15000,equipment:5,professionalism:2}]]],
  ["Odmawiam","50% → zostaje • 50% → sprzęt -7",[[50,{}],[50,{equipment:-7,morale:-4}]]]
 ]],
 ["Na treningu dochodzi do ostrego spięcia z kolegą z drużyny.","Obaj uważacie, że to wam należy się lepszy numer startowy.",16,40,[
  ["Odpuść dla dobra zespołu","Lojalność +6 • szansa na skład -3",[[100,{loyalty:6,chance:-3}]]],
  ["Walczę o swoje","60% → szansa +8 • 40% → relacja z klubem -8",[[60,{chance:8,morale:4}],[40,{clubRelation:-8}]]]
 ]],
 ["Dostajesz dziką kartę do prestiżowego turnieju.","Możesz pojechać bez presji albo zainwestować w specjalnie przygotowany silnik.",17,40,[
  ["Inwestuję 12 000 zł","55% → reputacja +12 • 45% → brak sukcesu",[[55,{budget:-12000,reputation:12,media:6}],[45,{budget:-12000,morale:-2}]]],
  ["Jadę na obecnym sprzęcie","35% → reputacja +8 • 65% → bez zmian",[[35,{reputation:8}],[65,{}]]]
 ]],
 ["Klub prosi cię o udział w akcji dla młodych kibiców.","Wydarzenie odbywa się dzień przed ważnym meczem.",16,40,[
  ["Jadę na spotkanie","Medialność +7 • lojalność +4 • 20% → gorsza dyspozycja",[[80,{media:7,loyalty:4}],[20,{media:7,loyalty:4,morale:-3}]]],
  ["Odmawiam i odpoczywam","Profesjonalizm +3 • medialność -3",[[100,{professionalism:3,media:-3}]]]
 ]],
 ["Na lotnisku ginie skrzynia z częściami.","Do meczu zostało kilkanaście godzin.",18,40,[
  ["Kupuję części na miejscu","Budżet -18 000 zł • sprzęt bez zmian",[[100,{budget:-18000}]]],
  ["Pożyczam od rywala","70% → sprzęt -2 • 30% → sprzęt +3 i nowy kontakt",[[70,{equipment:-2}],[30,{equipment:3,reputation:3}]]]
 ]],
 ["Trener proponuje zmianę techniki startu.","Efekt może być przełomowy, ale pierwsze tygodnie będą trudne.",15,28,[
  ["Pracuję nad zmianą","60% → start +4 • 40% → start -2 w tym sezonie",[[60,{skill:["starts",4]}],[40,{skill:["starts",-2],morale:-2}]]],
  ["Nie ruszam tego","Profesjonalizm -1 • bez ryzyka",[[100,{professionalism:-1}]]]
 ]],
 ["W internecie pojawia się fala krytyki.","Kibice zarzucają ci brak ambicji po słabym meczu.",16,40,[
  ["Odpowiadam rzeczowo","70% → medialność +5 • 30% → reputacja -4",[[70,{media:5,reputation:2}],[30,{media:4,reputation:-4}]]],
  ["Wyłączam komentarze","Morale +5 • medialność -4",[[100,{morale:5,media:-4}]]]
 ]],
 ["Dostajesz propozycję zmiany tunera.","Nowy warsztat ma świetną opinię, ale żąda dużej zaliczki.",18,40,[
  ["Płacę 25 000 zł","75% → sprzęt +8 • 25% → tylko +2",[[75,{budget:-25000,equipment:8}],[25,{budget:-25000,equipment:2}]]],
  ["Zostaję przy obecnym","Lojalność +3",[[100,{loyalty:3}]]]
 ]],
 ["Przed ważnym meczem czujesz ból nadgarstka.","Lekarz zaleca przerwę, ale klub liczy na twój start.",16,40,[
  ["Jadę mimo bólu","60% → bez konsekwencji • 40% → uraz i koszty",[[60,{loyalty:5}],[40,{injuryRisk:12,budget:-10000,chance:-8}]]],
  ["Odpuszczam mecz","Profesjonalizm +5 • lojalność -2",[[100,{professionalism:5,loyalty:-2}]]]
 ]],
 ["Producent kasków proponuje kampanię reklamową.","Sesja może zwiększyć twoją rozpoznawalność.",17,40,[
  ["Biorę udział","70% → 15 000 zł i medialność +8 • 30% → krytyka za gwiazdorzenie",[[70,{budget:15000,media:8}],[30,{budget:15000,media:5,reputation:-4}]]],
  ["Rezygnuję","Profesjonalizm +3",[[100,{professionalism:3}]]]
 ]],
 ["Prezes sugeruje obniżkę stawki za punkt.","Klub ma problemy finansowe, ale chce zatrzymać obecny skład.",18,40,[
  ["Zgadzam się","Lojalność +8 • stawka -10%",[[100,{loyalty:8,salaryMult:.9}]]],
  ["Odmawiam","50% → klub ustępuje • 50% → relacja -10",[[50,{}],[50,{clubRelation:-10}]]]
 ]],
 ["Kolega prosi o pożyczenie silnika.","Jego podstawowa jednostka uległa awarii przed ważnym spotkaniem.",17,40,[
  ["Pożyczam","Lojalność +6 • 15% → awaria twojego silnika",[[85,{loyalty:6}],[15,{loyalty:6,equipment:-5,budget:-8000}]]],
  ["Odmawiam","Sprzęt bezpieczny • lojalność -4",[[100,{loyalty:-4}]]]
 ]],
 ["Możesz zatrudnić dietetyka i trenera przygotowania.","Pakiet na sezon kosztuje sporo, ale poprawia kondycję.",16,38,[
  ["Płacę 20 000 zł","Kondycja +4 • ryzyko urazu -3",[[100,{budget:-20000,skill:["fitness",4],injuryRisk:-3}]]],
  ["Trenuję sam","50% → kondycja +2 • 50% → bez zmian",[[50,{skill:["fitness",2]}],[50,{}]]]
 ]],
 ["Po meczu sędzia wpisuje do protokołu twoje zachowanie.","Grozi ci kara finansowa lub zawieszenie.",17,40,[
  ["Składam wyjaśnienia","Komisja przyjmuje wyjaśnienia i odstępuje od kary • Otrzymujesz niewielką karę • Komisja zaostrza sankcję",[[48,{professionalism:3,reputation:3}],[37,{budget:-3000}],[15,{budget:-9000,chance:-7,reputation:-2}]]],
  ["Publicznie przepraszam","Pewna kara 4 000 zł • reputacja +2 • medialność +2 • morale -1",[[100,{budget:-4000,media:2,reputation:2,morale:-1}]]]
 ]],
 ["Znany zawodnik proponuje wspólne treningi.","Musisz pokryć koszty toru i logistyki.",15,30,[
  ["Wchodzę w to za 10 000 zł","70% → losowa umiejętność +3 • 30% → +1",[[70,{budget:-10000,randomSkill:3}],[30,{budget:-10000,randomSkill:1}]]],
  ["Nie stać mnie","Bez zmian",[[100,{}]]]
 ]],
 ["Klub organizuje testy nowych tłumików.","Zmiana może wpłynąć na charakterystykę motocykla.",16,40,[
  ["Testuję intensywnie","55% → ustawienia +4 • 45% → sprzęt -2",[[55,{skill:["setup",4]}],[45,{equipment:-2}]]],
  ["Trzymam się z boku","Profesjonalizm -1",[[100,{professionalism:-1}]]]
 ]],
 ["Dostajesz ofertę od bukmachera na kampanię wizerunkową.","Pieniądze są duże, ale część kibiców może odebrać to źle.",18,40,[
  ["Podpisuję","60% → 35 000 zł • 40% → reputacja -7",[[60,{budget:35000,media:5}],[40,{budget:35000,reputation:-7,media:5}]]],
  ["Odrzucam","Reputacja +4",[[100,{reputation:4}]]]
 ]],
 ["Przed sezonem możesz kupić dwa używane silniki.","Cena jest atrakcyjna, ale nie znasz ich pełnej historii.",17,40,[
  ["Kupuję za 28 000 zł","65% → sprzęt +7 • 35% → sprzęt +1",[[65,{budget:-28000,equipment:7}],[35,{budget:-28000,equipment:1}]]],
  ["Nie ryzykuję","Budżet bez zmian",[[100,{}]]]
 ]],
 ["Młody mechanik prosi o szansę w twoim teamie.","Ma małe doświadczenie, lecz świetne rekomendacje.",16,32,[
  ["Zatrudniam go","60% → sprzęt +5 • 40% → sprzęt -3",[[60,{equipment:5,budget:-8000}],[40,{equipment:-3,budget:-8000}]]],
  ["Wybieram doświadczenie","Budżet -15 000 zł • sprzęt +3",[[100,{budget:-15000,equipment:3}]]]
 ]],
 ["Zostajesz zaproszony na trening reprezentacji.","Selekcjoner chce sprawdzić cię na trudnym torze.",17,32,[
  ["Jadę agresywnie","45% → reputacja +10 • 55% → ryzyko urazu +5",[[45,{reputation:10,media:5}],[55,{injuryRisk:5,morale:-2}]]],
  ["Jadę zachowawczo","Profesjonalizm +4 • reputacja +2",[[100,{professionalism:4,reputation:2}]]]
 ]],
 ["Dziennikarz publikuje nieprawdziwą informację o twoim transferze.","Klub oczekuje szybkiej reakcji.",17,40,[
  ["Dementuję natychmiast","Lojalność +4 • medialność +3",[[100,{loyalty:4,media:3}]]],
  ["Milczę","50% → zainteresowanie innych klubów • 50% → relacja -8",[[50,{reputation:6,media:5}],[50,{clubRelation:-8,media:5}]]]
 ]],
 ["Masz szansę wystartować w zawodach na lodzie.","To świetna zabawa i trening balansu, ale także ryzyko.",18,35,[
  ["Startuję","60% → technika +3 • 40% → uraz",[[60,{skill:["technique",3],media:3}],[40,{injuryRisk:8,morale:-5}]]],
  ["Odpuszczam","Profesjonalizm +2",[[100,{professionalism:2}]]]
 ]],
 ["Rodzinny sponsor kończy działalność.","Tracisz ważną część budżetu przed sezonem.",15,40,[
  ["Szukam nowego partnera","55% → 20 000 zł • 45% → medialność +3, bez pieniędzy",[[55,{budget:20000,media:4}],[45,{media:3}]]],
  ["Tnę koszty teamu","Sprzęt -4 • profesjonalizm +3",[[100,{equipment:-4,professionalism:3}]]]
 ]],
 ["W parkingu ktoś proponuje ci nielegalną modyfikację sprzętu.","Zapewnia, że kontrola niczego nie wykryje.",16,40,[
  ["Odmowa bez dyskusji","Profesjonalizm +10 • reputacja +2",[[100,{professionalism:10,reputation:2}]]],
  ["Ryzykuję","75% → sprzęt +6 • 25% → dyskwalifikacja, reputacja -20",[[75,{equipment:6}],[25,{reputation:-20,chance:-20,budget:-15000}]]]
 ]],
 ["Po świetnym meczu kibice proszą cię o dodatkowe okrążenie honorowe.","Team chce szybko pakować sprzęt i ruszać w drogę.",16,40,[
  ["Zostaję z kibicami","Medialność +6 • lojalność +3",[[100,{media:6,loyalty:3}]]],
  ["Wracam do parkingu","Profesjonalizm +2 • medialność -2",[[100,{professionalism:2,media:-2}]]]
 ]],
 ["Masz możliwość udziału w płatnym campie startowym.","Prowadzi go specjalista znany z pracy z mistrzami świata.",15,28,[
  ["Płacę 18 000 zł","80% → start +4 • 20% → start +1",[[80,{budget:-18000,skill:["starts",4]}],[20,{budget:-18000,skill:["starts",1]}]]],
  ["Rezygnuję","Bez zmian",[[100,{}]]]
 ]],
 ["Twój klub zmienia trenera.","Nie wiadomo, jak nowy szkoleniowiec oceni dotychczasową hierarchię.",16,40,[
  ["Od razu proszę o rozmowę","65% → relacja +7 • 35% → bez zmian",[[65,{clubRelation:7,professionalism:2}],[35,{}]]],
  ["Czekam na rozwój sytuacji","50% → szansa +5 • 50% → szansa -5",[[50,{chance:5}],[50,{chance:-5}]]]
 ]],
 ["Na treningu ustanawiasz świetny czas.","Klub rozważa wystawienie cię w pierwszym meczu.",15,25,[
  ["Dociskam jeszcze mocniej","65% → szansa +8 • 35% → drobny uraz",[[65,{chance:8,morale:4}],[35,{injuryRisk:5,chance:-3}]]],
  ["Kończę trening na tym","Szansa +4 • profesjonalizm +2",[[100,{chance:4,professionalism:2}]]]
 ]]
];

// Pakiet „Afery i parking”
EVENTS.push(...[["Azjatycka ofensywa kibicowska","W głosowaniu o dziką kartę w godzinę dostajesz dziesiątki tysięcy reakcji z kont obserwujących głównie sprzedaż garnków w Wietnamie.",17,50,[["Odciąć się od podejrzanych głosów","70% uczciwość doceniona • 30% tracisz dziką kartę",[[70,{"reputation":6,"media":5,"professionalism":5}],[30,{"reputation":4,"morale":-3}]]],["Udawać, że niczego nie zauważyłeś","45% dzika karta • 55% anulowanie głosowania",[[45,{"reputation":8,"media":10}],[55,{"reputation":-10,"media":6,"professionalism":-5}]]],["„Mam najlepszych kibiców na świecie”","40% mem • 60% postępowanie organizatora",[[40,{"media":14,"reputation":4}],[60,{"media":10,"reputation":-6}]]]],{"id":"bot_vote","weight":0.08,"cooldown":99,"once":true}],["Wrzaski w parkingu","Partner twierdzi, że zamknąłeś mu ścieżkę. Ty uważasz, że pojechał tak szeroko, iż prawie zamówił hot doga na trybunie.",16,50,[["Przeprosić i przeanalizować bieg","Relacja +6 • profesjonalizm +3",[[100,{"clubRelation":6,"professionalism":3,"morale":2}]]],["Odpowiedzieć równie głośno","50% oczyszczenie atmosfery • 50% nagranie w telewizji",[[50,{"morale":5}],[50,{"clubRelation":-10,"media":7,"reputation":-4}]]],["Obejrzeć powtórkę","70% psychika +2 • 30% kłótnia w zwolnionym tempie",[[70,{"skill":["mental",2],"clubRelation":5}],[30,{"clubRelation":-5,"morale":-3}]]]],{"id":"parking_row","weight":1.2,"cooldown":7,"once":false}],["Tor wygląda jak grządka po wykopkach","Kilku zawodników uważa tor za niebezpieczny. Kierownik zapewnia, że za piętnaście minut będzie beton.",16,50,[["Poprzeć odmowę jazdy","65% profesjonalizm +4 • 35% reputacja -4",[[65,{"professionalism":4,"injuryRisk":-3}],[35,{"professionalism":3,"reputation":-4}]]],["Zadeklarować gotowość","20% świetny występ • 80% ryzyko urazu +11",[[20,{"loyalty":6,"reputation":7}],[80,{"loyalty":4,"injuryRisk":11}]]],["Dodatkowa próba toru","65% zawody ruszają • 35% patrzycie na traktor",[[65,{"professionalism":5,"clubRelation":3}],[35,{"morale":-2}]]]],{"id":"bad_track","weight":0.75,"cooldown":8,"once":false}],["Upadek taktyczny","Rywal przewraca się bez wyraźnego kontaktu. Sędzia pyta, co widziałeś.",17,50,[["Powiedzieć prawdę","Profesjonalizm +6 • trwały konflikt z rywalem",[[100,{"professionalism":6,"reputation":2,"rivalConflict":1}]]],["Bronić kolegi","35% pomaga drużynie • 65% kara",[[35,{"loyalty":8,"clubRelation":6}],[65,{"budget":-12000,"reputation":-5}]]],["Poprawiałem gogle","Mem „nic nie widziałem”",[[100,{"media":5,"professionalism":-2}]]]],{"id":"tactical_fall","weight":0.65,"cooldown":9,"once":false}],["Przelew już wyszedł","Prezes zapewnia, że przelew już wyszedł. Sądząc po tempie, jedzie do ciebie busem przez Uzbekistan.",18,50,[["Pojechać mimo zaległości","60% pieniądze wpływają • 40% zaległość rośnie",[[60,{"loyalty":8,"budget":45000}],[40,{"budget":-20000,"clubRelation":-7}]]],["Odmówić startu","70% część należności • 30% eskalacja",[[70,{"budget":30000,"clubRelation":-8}],[30,{"clubRelation":-15,"chance":-12}]]],["Upublicznić sprawę","55% klub płaci • 45% wojna komunikatów",[[55,{"budget":50000,"media":12}],[45,{"media":15,"reputation":-4}]]]],{"id":"late_payment","weight":0.7,"cooldown":8,"once":false}],["Pieniądze zwrócone, ale nie dotarły","Mówisz, że oddałeś środki. Klub publikuje komunikat: „Na koncie nie ma ani złotówki”.",18,50,[["Pokazać potwierdzenie","75% oczyszczenie • 25% stare konto i zamrożone środki",[[75,{"reputation":6,"professionalism":4}],[25,{"budget":-30000,"clubRelation":-6}]]],["Zajmuje się tym księgowy","50% cisza • 50% kontrola i kara",[[50,{"professionalism":1}],[50,{"budget":-22000,"reputation":-6}]]],["Nie komentować","40% wygasa • 60% wraca przy transferze",[[40,{"professionalism":2}],[60,{"reputation":-5,"media":6}]]]],{"id":"returned_money","weight":0.35,"cooldown":12,"once":false}],["Wpis po pominięciu w składzie","Po świetnych sparingach nie ma cię w składzie. Instagram sam otwiera pole „Co słychać?”.",16,50,[["Napisać emocjonalny post","40% presja kibiców • 60% konflikt z klubem",[[40,{"media":10,"chance":8}],[60,{"clubRelation":-13,"chance":-6}]]],["Porozmawiać z menedżerem","60% szansa +8 • 40% „sezon jest długi”",[[60,{"professionalism":5,"chance":8}],[40,{"professionalism":4,"morale":-2}]]],["Zdjęcie z treningu: „praca trwa”","Reputacja +3 • profesjonalizm +4",[[100,{"reputation":3,"professionalism":4}]]]],{"id":"lineup_post","weight":1.1,"cooldown":6,"once":false}],["Alkomat przed meczem","Jeden z juniorów nie przechodzi badania. Drużyna zostaje bez zawodnika młodzieżowego.",18,50,[["Publicznie potępić","Profesjonalizm +5",[[100,{"professionalism":5,"morale":-2}]]],["Nie komentować","Klub sam prowadzi sprawę",[[100,{"chance":-3,"morale":-2}]]],["Pomóc po zawieszeniu","Reputacja +4 • lojalność +3",[[100,{"reputation":4,"loyalty":3}]]]],{"id":"breathalyzer","weight":0.18,"cooldown":99,"once":true}],["Stoper działa według czasu letniego","Przegrywasz kwalifikacje o 0,03 sekundy. System przypisał ci czas z poprzedniego przejazdu.",17,50,[["Awantura w parku maszyn","40% korekta • 60% kara",[[40,{"reputation":7,"media":8}],[60,{"budget":-9000,"media":7}]]],["Oficjalny protest","65% korekta • 35% odrzucenie",[[65,{"budget":-6000,"professionalism":5}],[35,{"budget":-6000,"morale":-2}]]],["Radziecki stoper mojego dziadka — on nigdy nie zawodzi","Medialność +8 • 15% kampania sponsora",[[85,{"media":8,"reputation":3}],[15,{"media":12,"budget":18000}]]]],{"id":"stopwatch","weight":0.45,"cooldown":10,"once":false}],["Kibice wchodzą na tor","Po przedwczesnym końcu meczu kibice wchodzą na tor. Mechanik pyta, czy chować klucze do busa.",17,50,[["Wyjść do kibiców","50% uspokajasz • 50% piwo i medialność -2",[[50,{"reputation":8,"media":6}],[50,{"media":-2,"morale":-3}]]],["Zostać w parkingu","Bezpiecznie • reputacja -2",[[100,{"professionalism":2,"reputation":-2}]]],["Nagrać apel","Medialność +5 • relacja +4",[[100,{"media":5,"clubRelation":4}]]]],{"id":"fans_track","weight":0.2,"cooldown":99,"once":true}],["Butelka z trybun","Po wygranym biegu leci butelka. Autor ma celność niższą niż twoja skuteczność ze startu.",17,50,[["Wyrzucić ją do kosza","Reputacja +5 • medialność +8",[[100,{"reputation":5,"media":8}]]],["Odpowiedzieć gestem","30% zachwyt • 70% kara",[[30,{"reputation":6,"media":9}],[70,{"budget":-8000,"reputation":-5}]]],["Zejść do parkingu","Profesjonalizm +2",[[100,{"professionalism":2}]]]],{"id":"bottle","weight":0.35,"cooldown":12,"once":false}],["Telewizja chce przełożyć mecz","Nadawca chce przesunąć spotkanie na inny termin. Klub protestuje, bo kibice mają już bilety, zawodnicy ustalony kalendarz, a organizacja meczu jest dopięta. Dziennikarz pyta cię o stanowisko.",17,50,[["Staję po stronie klubu","Lojalność +5 • relacja z klubem +4 • medialność -2",[[100,{"loyalty":5,"clubRelation":4,"media":-2}]]],["Nie komentuję decyzji","Profesjonalizm +2",[[100,{"professionalism":2}]]],["Rozumiem interes telewizji","Medialność +4 • reputacja +2 • lojalność -3",[[100,{"media":4,"reputation":2,"loyalty":-3}]]]],{"id":"tv_schedule","weight":0.45,"cooldown":9,"once":false}],["Telefon do ojca sędziego","Działacz zapowiada telefon tam, gdzie trzeba. Ma na myśli ojca arbitra.",18,50,[["Odciąć się","Profesjonalizm +5 • relacja -3",[[100,{"professionalism":5,"clubRelation":-3}]]],["Wewnętrzna sprawa klubu","30% nagłówki",[[30,{"media":7,"reputation":-3}],[70,{"professionalism":1}]]],["Może zadzwonić też do mojej mamy?","Medialność +7 • relacja -5",[[100,{"media":7,"morale":2,"clubRelation":-5}]]]],{"id":"ref_father","weight":0.18,"cooldown":99,"once":true}],["Obustronny walkower","Obie drużyny chcą jechać, sędzia twierdzi, że obie odmówiły. Przegrali wszyscy.",18,50,[["Wspólne oświadczenie","50% kara cofnięta • 50% grzywna",[[50,{"reputation":5,"professionalism":4}],[50,{"budget":-14000,"media":6}]]],["Nie angażować się","Profesjonalizm +1 • lojalność -3",[[100,{"professionalism":1,"loyalty":-3}]]],["Zażądać nagrań","40% nowe fakty • 60% długa sprawa",[[40,{"media":8,"reputation":6}],[60,{"media":6,"morale":-4}]]]],{"id":"double_walkover","weight":0.1,"cooldown":99,"once":true}],["Zawody dzień po wielkim finale","Ważny turniej jest kilkanaście godzin po występie w reprezentacji. Ciało głosuje za łóżkiem.",18,50,[["Pojechać","40% dobry wynik • 60% przemęczenie",[[40,{"reputation":8,"morale":5}],[60,{"morale":-8,"injuryRisk":7,"skill":["fitness",-2]}]]],["Poprosić o przełożenie","50% zgoda",[[50,{"professionalism":4,"morale":3}],[50,{"media":3,"morale":-3}]]],["Oddać miejsce rezerwowemu","Reputacja +3 • ryzyko -3",[[100,{"reputation":3,"injuryRisk":-3}]]]],{"id":"day_after_final","weight":0.5,"cooldown":8,"once":false}],["Motocykl jest za lekki","Kontroler waży motocykl trzy razy. Mechanik upiera się, że rano wszystko się zgadzało.",17,50,[["Ponowne ważenie","60% błąd urządzenia • 40% wykluczenie",[[60,{"professionalism":4,"reputation":3}],[40,{"reputation":-3,"chance":-4}]]],["Przyjąć karę","Profesjonalizm +2 • tracisz wynik",[[100,{"professionalism":2,"morale":-4}]]],["Paliwo, wilgotność, faza księżyca i nisko osiadający ozon","Medialność +6 • profesjonalizm -2",[[90,{"media":6,"professionalism":-2}],[10,{"media":9,"budget":-5000}]]]],{"id":"underweight_bike","weight":0.55,"cooldown":8,"once":false}],["Tajemniczy tuner z internetu","„Doktor Prędkość” za 40 tysięcy obiecuje silnik, który sam jedzie.",16,50,[["Zapłacić","35% sprzęt +8 • 65% używany gaźnik i naklejka Racing",[[35,{"budget":-40000,"equipment":8}],[65,{"budget":-40000,"equipment":-1}]]],["Poprosić o referencje","30% specjalista • 70% znika",[[30,{"budget":-12000,"equipment":5}],[70,{"professionalism":3}]]],["Zablokować","Profesjonalizm +2",[[100,{"professionalism":2}]]]],{"id":"internet_tuner","weight":0.8,"cooldown":7,"once":false}],["Sponsor chce dziwnej reklamy","Po każdym zwycięstwie masz udawać wilka, rekina albo koziołka.",16,50,[["Zgodzić się","25% viral • 75% pieniądze i lekki wstyd",[[25,{"budget":45000,"media":14}],[75,{"budget":30000,"media":8}]]],["Normalny gest","Budżet +18 000 zł • profesjonalizm +2",[[100,{"budget":18000,"professionalism":2}]]],["Odmówić","Reputacja +1",[[100,{"reputation":1}]]]],{"id":"weird_sponsor","weight":1,"cooldown":6,"once":false}],["Mechanik pomylił busy","Silniki pojechały trzysta kilometrów dalej z teamem zawodnika o podobnym nazwisku.",16,50,[["Pożyczyć sprzęt","20% sensacja • 60% przeciętnie • 20% trzy defekty",[[20,{"reputation":9,"equipment":3}],[60,{"equipment":-2}],[20,{"equipment":-8,"morale":-7}]]],["Wysłać kierowcę","50% docierają • 50% po zawodach",[[50,{"budget":-5000,"professionalism":2}],[50,{"budget":-5000,"equipment":-6}]]],["Jednostka treningowa","Sprzęt -7 • profesjonalizm +3",[[100,{"equipment":-7,"professionalism":3}]]]],{"id":"wrong_van","weight":0.7,"cooldown":7,"once":false}]]);

let S=null;

EVENTS.push(...[["Mechanik zaczął pakować za wcześnie","Po meczu nowy mechanik ładuje motocykle do busa. Kilkanaście minut później komisja przypomina, że maszyny nie mogły jeszcze opuścić parku maszyn przed kontrolą.",17,50,[["Natychmiast zawrócić busa","70% → kontrola odbywa się prawidłowo • 30% → kara za opóźnienie",[[70,{"professionalism":3,"budget":-3000}],[30,{"budget":-12000,"reputation":-3,"professionalism":2}]]],["Wziąć odpowiedzialność","Profesjonalizm +4 • kara finansowa",[[100,{"professionalism":4,"budget":-9000,"morale":-2}]]],["Obwinić mechanika","Relacja z teamem -8 • 35% → mechanik odchodzi",[[65,{"clubRelation":-8,"professionalism":-2}],[35,{"clubRelation":-10,"equipment":-4,"professionalism":-3}]]]],{"id":"packed_too_early","weight":0.12,"once":true,"cooldown":99}],["Samolot odleciał dwie minuty za wcześnie","Masz wystąpić w ważnym meczu, ale nie zdążasz na lot. Według ciebie zabrakło dwóch minut, według linii lotniczej — siedmiu.",18,50,[["Kupić bilet na inne lotnisko","65% → docierasz na czas • 35% → przyjeżdżasz w połowie meczu",[[65,{"budget":-18000,"professionalism":3}],[35,{"budget":-26000,"chance":-6,"morale":-4}]]],["Wynająć samochód i jechać nocą","45% → zdążysz • 55% → przemęczenie",[[45,{"budget":-9000,"loyalty":4}],[55,{"budget":-9000,"morale":-6,"injuryRisk":4,"skill":["fitness",-1]}]]],["Zadzwonić do prezesa","Klub organizuje transport, ale zapamiętuje sytuację",[[100,{"clubRelation":-7,"loyalty":-3,"budget":-5000}]]]],{"id":"missed_flight","weight":0.28,"once":false,"cooldown":12}],["Defekt na ostatniej prostej","Prowadzisz przez cały bieg. Na ostatniej prostej motocykl gaśnie, a rywale mijają cię niemal na linii mety.",16,50,[["Spokojnie przeanalizować awarię","Ustawienia +1 • profesjonalizm +3 • koszt remontu",[[100,{"skill":["setup",1],"professionalism":3,"budget":-12000,"morale":-3}]]],["Wypchnąć motocykl do mety","40% → zdobywasz jeszcze punkt • 60% → bez punktów",[[40,{"reputation":4,"skill":["fitness",-1]}],[60,{"morale":-4,"skill":["fitness",-2]}]]],["Kopać motocykl","Medialność +7 • profesjonalizm -5 • 20% → kara",[[80,{"media":7,"professionalism":-5}],[20,{"media":8,"professionalism":-6,"budget":-6000}]]]],{"id":"last_straight_failure","weight":0.55,"once":false,"cooldown":8}],["Kask poleciał dalej niż motocykl","Awaria pozbawia cię zwycięstwa w wielkim finale. W przypływie złości kopiesz motocykl, a kask ląduje niepokojąco blisko trybun.",18,50,[["Natychmiast przeprosić","Profesjonalizm +3 • medialność +4 • niewielka kara",[[100,{"professionalism":3,"media":4,"budget":-4000}]]],["Sprzęt też musi czuć presję","Medialność +10 • profesjonalizm -6 • sponsor techniczny niezadowolony",[[100,{"media":10,"professionalism":-6,"equipment":-2}]]],["Nie komentować","Morale -5 • 30% → postępowanie komisji",[[70,{"morale":-5}],[30,{"morale":-5,"budget":-9000,"reputation":-3}]]]],{"id":"helmet_throw","weight":0.22,"once":true,"cooldown":99}],["Banda odmawia dalszej współpracy","Po groźnym upadku uszkodzona jest nie tylko dmuchana banda, ale też element konstrukcji stadionu. Naprawa może potrwać kilkanaście minut albo pół dnia.",16,50,[["Czekać na naprawę","65% → mecz jest kontynuowany • 35% → zawody zostają zakończone",[[65,{"professionalism":2,"morale":-1}],[35,{"morale":-3,"media":3}]]],["Poprzeć zakończenie spotkania","Profesjonalizm +4 • część kibiców niezadowolona",[[100,{"professionalism":4,"reputation":-2,"injuryRisk":-2}]]],["Pomóc ekipie technicznej","Medialność +6 • profesjonalizm +2 • 5% → zdjęcie z młotkiem trzymanym odwrotnie",[[95,{"media":6,"professionalism":2}],[5,{"media":11,"professionalism":1}]]]],{"id":"broken_barrier","weight":0.42,"once":false,"cooldown":9}],["Rekord toru czy źle ustawiony pomiar?","Po świetnym biegu spiker ogłasza rekord toru. Po pięciu minutach system pokazuje czas wolniejszy o prawie sekundę.",17,50,[["Domagać się sprawdzenia fotokomórki","50% → rekord uznany • 50% → czas poprawiony",[[50,{"reputation":6,"professionalism":2,"media":5}],[50,{"professionalism":2,"morale":-2}]]],["Od razu wrzucić grafikę REKORDZISTA","40% → rekord zostaje • 60% → trzeba usuwać grafikę",[[40,{"media":8,"reputation":5}],[60,{"media":7,"reputation":-3}]]],["Najważniejsze są trzy punkty","Profesjonalizm +4 • medialność -1",[[100,{"professionalism":4,"media":-1}]]]],{"id":"track_record_measurement","weight":0.48,"once":false,"cooldown":10}],["Klub organizuje prezentację na rynku","Sponsor chce, żebyś wjechał motocyklem przez dekoracyjną bramę, której szerokość ktoś zmierzył na oko.",16,50,[["Wjechać motocyklem","70% → świetna prezentacja • 20% → przewracasz reklamę • 10% → klinujesz się w bramie",[[70,{"media":8,"reputation":3}],[20,{"media":7,"budget":-4000}],[10,{"media":12,"morale":-3,"equipment":-1}]]],["Wejść pieszo","Profesjonalizm +2 • sponsor lekko rozczarowany",[[100,{"professionalism":2,"media":-1}]]],["Zaproponować pokaz startu","Medialność +10 • 15% → mandat",[[85,{"media":10,"reputation":3,"equipment":-1}],[15,{"media":11,"budget":-3000,"equipment":-1}]]]],{"id":"market_presentation","weight":0.72,"once":false,"cooldown":7}],["Pożyczony motocykl okazuje się szybszy","Po awarii własnego parku maszyn jedziesz na motocyklu kolegi z drużyny i zdobywasz komplet punktów.",17,50,[["Odkupić jednostkę","Świetny zakup • Przeciętny zakup • Przepłacasz za jednostkę",[[35,{"budget":-30000,"equipment":6,"morale":5}],[45,{"budget":-55000,"equipment":4,"morale":4}],[20,{"budget":-80000,"equipment":2,"morale":1}]]],["Zaproponować wymianę silników","40% → kolega się zgadza • 60% → odpowiada śmiejącą się emotikoną",[[40,{"equipment":3,"loyalty":3}],[60,{"media":2,"morale":-1}]]],["Uznać, że to przypadek","Profesjonalizm +1 • mechanik przypomina wynik przez miesiąc",[[100,{"professionalism":1,"morale":2}]]]],{"id":"borrowed_bike_faster","weight":0.46,"once":false,"cooldown":10}],["Nocna kontrola hałasu","Po treningu pod stadion przyjeżdża patrol. Mieszkańcy skarżą się, że próby silników trwały długo po zakończeniu zajęć.",16,50,[["Przyjąć mandat","Budżet -2–8 tys. zł • profesjonalizm +1",[[100,{"budget":-5000,"professionalism":1}]]],["To był generator prądu","30% → sprawa się kończy • 70% → mandat jest wyższy",[[30,{"media":2}],[70,{"budget":-10000,"reputation":-2}]]],["Zaproponować mieszkańcom bilety","Koszt organizacyjny • reputacja lokalna +5",[[100,{"budget":-2500,"reputation":5,"media":3}]]]],{"id":"noise_control","weight":0.65,"once":false,"cooldown":8}],["Motocykl przeszedł kontrolę, ale nie ten","Po meczu komisja prosi o motocykl z właściwym numerem plomb. Mechanik pokazuje inną maszynę i dopiero po chwili orientuje się, że prawidłowa stoi głęboko w busie.",17,50,[["Natychmiast wyjąć właściwy motocykl","70% → kontrola bez problemów • 30% → kara za opóźnianie",[[70,{"professionalism":3}],[30,{"professionalism":2,"budget":-7000}]]],["Upierać się, że to właściwa maszyna","20% → komisja się myli • 80% → dyskwalifikacja",[[20,{"reputation":4,"media":4}],[80,{"reputation":-8,"chance":-7,"budget":-11000}]]],["Przyznać się do pomyłki","Profesjonalizm +4 • kara finansowa • wynik pozostaje",[[100,{"professionalism":4,"budget":-5000}]]]],{"id":"wrong_bike_control","weight":0.22,"once":true,"cooldown":99}]]);

const INDIVIDUAL_EVENTS=[
 {name:"Młodzieżowe Indywidualne Mistrzostwa Polski",short:"MIMP",minAge:16,maxAge:21,minOverall:48,prestige:4},
 {name:"Indywidualne Mistrzostwa Świata Juniorów — SGP2",short:"SGP2",minAge:16,maxAge:21,minOverall:56,prestige:7},
 {name:"Srebrny Kask",short:"Srebrny Kask",minAge:16,maxAge:21,minOverall:46,prestige:3},
 {name:"Brązowy Kask",short:"Brązowy Kask",minAge:15,maxAge:19,minOverall:43,prestige:2},
 {name:"Indywidualne Mistrzostwa Polski",short:"IMP",minAge:17,maxAge:40,minOverall:62,prestige:6},
 {name:"Złoty Kask",short:"Złoty Kask",minAge:18,maxAge:40,minOverall:64,prestige:5},
 {name:"Memoriał Edwarda Jancarza",short:"Memoriał Jancarza",minAge:18,maxAge:40,minOverall:66,prestige:4},
 {name:"Memoriał Alfreda Smoczyka",short:"Memoriał Smoczyka",minAge:17,maxAge:40,minOverall:61,prestige:3},
 {name:"Kryterium Asów Polskich Lig Żużlowych",short:"Kryterium Asów",minAge:18,maxAge:40,minOverall:68,prestige:4},
 {name:"Grand Prix Challenge",short:"GP Challenge",minAge:19,maxAge:40,minOverall:78,prestige:8},
 {name:"Indywidualne Mistrzostwa Świata",short:"Speedway Grand Prix",minAge:20,maxAge:40,minOverall:84,prestige:10}
];

const DMPJ_ROUNDS=["eliminacje","ćwierćfinały","półfinały","finał"];

const FACILITY_DEFS={
 technical:{name:"Zaplecze techniczne",maxLevel:3,baseCost:520000,maintenance:105000,desc:"Warsztat, silniki, niezawodność sprzętu i ograniczenie defektów.",effect:["sprzęt +3/poziom","ustawienia +1/poziom","mniejsze zużycie i ryzyko awarii"]},
 training:{name:"Trening i analiza",maxLevel:3,baseCost:430000,maintenance:82000,desc:"Tor treningowy, telemetria, analiza wideo i szybszy rozwój.",effect:["+2 pkt rozwoju/poziom","kondycja +1/poziom","wyższy próg rozwoju i premia meczowa"]},
 recovery:{name:"Regeneracja i zdrowie",maxLevel:3,baseCost:360000,maintenance:70000,desc:"Fizjoterapia, odnowa, krótsza rehabilitacja i profilaktyka ciężkich urazów.",effect:["ryzyko urazu -4 p.p./poziom","morale +3/poziom","krótsza przerwa po ciężkim urazie"]},
 operations:{name:"Logistyka i sponsoring",maxLevel:3,baseCost:410000,maintenance:90000,desc:"Transport teamu, niższe koszty operacyjne i obsługa partnerów.",effect:["utrzymanie bazy do -22%","większy przychód sponsorski","medialność +1/poziom"]}
};
function facilityLevel(key){
 return S.facilities?.[key]||0;
}
function facilityBuildCost(key){
 const def=FACILITY_DEFS[key],level=facilityLevel(key);
 return Math.round(def.baseCost*(1+level*1.05));
}
function facilityMaintenance(){
 const gross=Object.entries(FACILITY_DEFS).reduce((sum,[key,def])=>sum+facilityLevel(key)*def.maintenance,0);
 const operations=facilityLevel("operations"),discount=[0,.07,.14,.22][operations]||0;
 return Math.round(gross*(1-discount));
}
function sponsorFacilityIncome(){
 const level=facilityLevel("operations");
 if(!level)return 0;
 const base=rand(45000,70000)*level,mediaMult=.75+(S.media||0)/100*.65;
 return Math.round(base*mediaMult);
}
function applyFacilityPreseasonEffects(){
 const technical=facilityLevel("technical"),training=facilityLevel("training"),recovery=facilityLevel("recovery"),operations=facilityLevel("operations");
 if(technical){S.skills.setup+=technical;S.equipment+=technical*3;S.injuryRisk-=technical}
 if(training){S.devPoints+=training*2;S.skills.fitness+=training;if(training>=2)S.skills.technique+=1;if(training>=3)S.skills.mental+=1}
 if(recovery){S.injuryRisk-=recovery*4;applyMetaDelta("morale",recovery*3)}
 if(operations)S.media+=operations;
 normalize();
}
function buildFacility(key){
 const def=FACILITY_DEFS[key],level=facilityLevel(key),cost=facilityBuildCost(key);
 if(level>=def.maxLevel)return false;
 if(S.budget<0){alert("Zadłużenie blokuje inwestycje.");return false}
 if(S.budget<cost){alert("Nie masz wystarczających środków.");return false}
 S.budget-=cost;
 S.facilities[key]=level+1;
 addHistory(`Inwestycja: ${def.name}`,`Rozbudowujesz zaplecze do poziomu ${level+1}. Koszt: ${money(cost)}.`);
 normalize();
 return true;
}
function availableFacilityOffers(count=3){
 const entries=Object.keys(FACILITY_DEFS)
  .filter(key=>facilityLevel(key)<FACILITY_DEFS[key].maxLevel)
  .sort(()=>Math.random()-.5);
 return entries.slice(0,count);
}
function budgetManagement(next){
 if(S.budgetManagementCompletedYear===S.year){next();return}
 if(S.league==="Etap szkolenia"||S.budget<55000){
  S.budgetManagementCompletedYear=S.year;
  next();
  return
 }
 const offers=availableFacilityOffers(3);
 if(!offers.length){next();return}
 const options=offers.map(key=>{
  const def=FACILITY_DEFS[key],level=facilityLevel(key),cost=facilityBuildCost(key);
  return {
   title:`${def.name} — poziom ${level+1} — ${money(cost)}`,
   desc:`${def.desc} ${def.effect.join(" • ")} • utrzymanie: ${money(def.maintenance)} za poziom/sezon`,
   action:()=>{
    if(buildFacility(key)){
     S.budgetManagementCompletedYear=S.year;
     save();
     closeModal();
     deferSeasonStep(next);
    }else{
     document.querySelectorAll("#modalOptions .option").forEach(button=>{button.disabled=false;button.dataset.busy="0"});
    }
   }
  };
 });
 options.push({
  title:"Nie inwestuję w zaplecze",
  desc:"Zachowujesz środki. Oferta inwestycyjna wróci w kolejnym sezonie.",
  action:()=>{
   S.budgetManagementCompletedYear=S.year;
   save();
   closeModal();
   deferSeasonStep(next);
  }
 });
 showModal(
  "ROZWÓJ TEAMU",
  "Jak wykorzystujesz zgromadzony kapitał?",
  `Budżet: ${money(S.budget)}. Inwestycje są trwałe, ale zwiększają coroczne koszty utrzymania.`,
  options
 );
}


function drawContractYears({young=false,star=false}={}){
 const roll=Math.random()*100;
 // Roczne umowy dominują. Dwuletnie są rzadsze, ale częstsze przy juniorach,
 // zawodnikach U24 i największych gwiazdach. Trzyletnie pozostają wyjątkiem.
 const twoYearChance=young?30:star?24:17;
 const threeYearChance=young?4:star?3:1;
 if(roll<threeYearChance)return 3;
 if(roll<threeYearChance+twoYearChance)return 2;
 return 1;
}
function contractYearLabel(years){
 return years===1?"roczny":years===2?"dwuletni":"trzyletni";
}

const RIDER_FIRST_NAMES=["Jakub","Mateusz","Oskar","Kacper","Wiktor","Bartosz","Maksym","Patryk","Dominik","Antoni","Leon","Mikkel","Frederik","Rasmus","Oliver","William","Luke","Jack","Daniel","Anders"];
const RIDER_LAST_NAMES=["Kowalski","Nowicki","Wysocki","Zieliński","Mazur","Król","Sikora","Borkowski","Larsen","Jensen","Pedersen","Andersen","Nilsson","Karlsson","Hansen","Thomsen","Douglas","Becker","Fricke","Lambert"];

const LEAGUE_RIDER_RANGES={
 1:{min:76,mode:84,max:95},
 2:{min:64,mode:73,max:88},
 3:{min:52,mode:62,max:78}
};
const SGP_PLACE_POINTS=[20,18,16,14,12,11,10,9,8,7,6,5,4,3,2,1];


const INTERNATIONAL_QUALIFIER_TRACKS={
 primary:[
  {city:"Krosno",country:"Polska",w:4},{city:"Bydgoszcz",country:"Polska",w:4},{city:"Gdańsk",country:"Polska",w:3},
  {city:"Gniezno",country:"Polska",w:3},{city:"Gorzów Wielkopolski",country:"Polska",w:4},{city:"Grudziądz",country:"Polska",w:3},
  {city:"Leszno",country:"Polska",w:4},{city:"Lublin",country:"Polska",w:4},{city:"Łódź",country:"Polska",w:3},
  {city:"Poznań",country:"Polska",w:3},{city:"Rzeszów",country:"Polska",w:3},{city:"Toruń",country:"Polska",w:4},
  {city:"Zielona Góra",country:"Polska",w:4},
  {city:"Pardubice",country:"Czechy",w:4},{city:"Praga",country:"Czechy",w:3},{city:"Slaný",country:"Czechy",w:2},
  {city:"Žarnovica",country:"Słowacja",w:4},
  {city:"Abensberg",country:"Niemcy",w:4},{city:"Güstrow",country:"Niemcy",w:3},{city:"Stralsund",country:"Niemcy",w:4},{city:"Landshut",country:"Niemcy",w:3},
  {city:"Holsted",country:"Dania",w:4},{city:"Vojens",country:"Dania",w:4},{city:"Slangerup",country:"Dania",w:2},
  {city:"Lonigo",country:"Włochy",w:4},{city:"Terenzano",country:"Włochy",w:4},
  {city:"Mureck",country:"Austria",w:4},{city:"Lamothe-Landerron",country:"Francja",w:4},
  {city:"Debrecen",country:"Węgry",w:3},{city:"Daugavpils",country:"Łotwa",w:3},{city:"Krško",country:"Słowenia",w:3},
  {city:"Manchester",country:"Wielka Brytania",w:4},{city:"Glasgow",country:"Wielka Brytania",w:4},
  {city:"Sheffield",country:"Wielka Brytania",w:4},{city:"King's Lynn",country:"Wielka Brytania",w:3},
  {city:"Ipswich",country:"Wielka Brytania",w:3},{city:"Poole",country:"Wielka Brytania",w:3},
  {city:"Oxford",country:"Wielka Brytania",w:3},{city:"Leicester",country:"Wielka Brytania",w:3}
 ],
 secondary:[
  {city:"Ludwigslust",country:"Niemcy"},{city:"Brokstedt",country:"Niemcy"},{city:"Olching",country:"Niemcy"},
  {city:"Nagyhalász",country:"Węgry"},{city:"Mâcon",country:"Francja"},{city:"Elgane",country:"Norwegia"},
  {city:"Varkaus",country:"Finlandia"},{city:"Västervik",country:"Szwecja"},{city:"Målilla",country:"Szwecja"},
  {city:"Brăila",country:"Rumunia"},{city:"Berwick",country:"Wielka Brytania"},{city:"Redcar",country:"Wielka Brytania"},
  {city:"Scunthorpe",country:"Wielka Brytania"},{city:"Edinburgh",country:"Wielka Brytania"}
 ],
 exotic:[
  {city:"Machowa",country:"Polska"},{city:"Rawicz",country:"Polska"},{city:"Marmande",country:"Francja"}
 ]
};

const CITY_LOCATIVE={
 "Krosno":"Krośnie","Bydgoszcz":"Bydgoszczy","Gdańsk":"Gdańsku","Gniezno":"Gnieźnie",
 "Gorzów Wielkopolski":"Gorzowie Wielkopolskim","Grudziądz":"Grudziądzu","Leszno":"Lesznie",
 "Lublin":"Lublinie","Łódź":"Łodzi","Poznań":"Poznaniu","Rzeszów":"Rzeszowie","Toruń":"Toruniu",
 "Zielona Góra":"Zielonej Górze","Opole":"Opolu","Kraków":"Krakowie","Częstochowa":"Częstochowie",
 "Piła":"Pile","Rybnik":"Rybniku","Tarnów":"Tarnowie","Świętochłowice":"Świętochłowicach",
 "Ostrów Wielkopolski":"Ostrowie Wielkopolskim","Rawicz":"Rawiczu","Machowa":"Machowej",
 "Warszawa":"Warszawie","Szczecin":"Szczecinie","Kielce":"Kielcach","Białystok":"Białymstoku",
 "Pardubice":"Pardubicach","Praga":"Pradze","Stralsund":"Stralsundzie","Manchester":"Manchesterze",
 "Oxford":"Oksfordzie","Leicester":"Leicesterze","Edinburgh":"Edynburgu","Cardiff":"Cardiff",
 "Vojens":"Vojens","Malilla":"Malilli","Riga":"Rydze","Landshut":"Landshut","Lublana":"Lublanie",
 "Güstrow":"Güstrow","Daugavpils":"Daugavpils","Debreczyn":"Debreczynie"
};
function cityLocative(city){return CITY_LOCATIVE[city]||city}
function leagueGenitive(name){
 if(name==="PGE Ekstraliga")return "PGE Ekstraligi";
 if(name==="Metalkas 2. Ekstraliga")return "Metalkas 2. Ekstraligi";
 if(name==="Krajowa Liga Żużlowa")return "Krajowej Ligi Żużlowej";
 return name;
}
function leagueLocative(name){
 if(name==="PGE Ekstraliga")return "PGE Ekstralidze";
 if(name==="Metalkas 2. Ekstraliga")return "Metalkas 2. Ekstralidze";
 if(name==="Krajowa Liga Żużlowa")return "Krajowej Lidze Żużlowej";
 return name;
}
function capitalizeSentence(text){
 const s=String(text||"").trim();
 return s?s.charAt(0).toLocaleUpperCase("pl")+s.slice(1):s;
}

function normalizeOrdinalPlaceCase(text){
 return String(text??"")
  .replace(/(\d+)\.\s+Miejsce\b/g,"$1. miejsce")
  .replace(/(\d+)\.\s+Miejsca\b/g,"$1. miejsca")
  .replace(/(\d+)\.\s+Miejscu\b/g,"$1. miejscu");
}

function capitalizeFirstText(text){
 let s=normalizeOrdinalPlaceCase(String(text??"").trim());
 if(!s)return s;
 // „5. miejsce” pozostaje małą literą; kapitalizujemy pierwsze realne słowo w zwykłym zdaniu.
 if(/^\s*(?:<[^>]+>\s*)*\d+\.\s+[a-ząćęłńóśźż]/i.test(s))return s;
 return s.replace(/^(\s*(?:<[^>]+>\s*)*[^A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]*)([a-ząćęłńóśźż])/,(_,p,c)=>p+c.toUpperCase());
}
function ensureSentence(text){
 let s=capitalizeFirstText(normalizeOrdinalPlaceCase(String(text??"").trim()))
  .replace(/([.!?])(?=[A-ZĄĆĘŁŃÓŚŹŻ])/g,"$1 ")
  .replace(/\s{2,}/g," ");
 if(!s)return s;
 if(!/[.!?…]["')\]]?$/.test(s))s+=".";
 return normalizeOrdinalPlaceCase(s);
}
function joinSentences(...parts){
 return parts.flat().filter(Boolean).map(ensureSentence).join(" ");
}

function cleanGeneratedText(text){
 let s=normalizeOrdinalPlaceCase(String(text??""))
  .replace(/([.!?])(?=[A-ZĄĆĘŁŃÓŚŹŻ])/g,"$1 ")
  .replace(/([a-ząćęłńóśźż0-9])(?=<(?:b|strong|span|small|br)\b)/gi,"$1 ")
  .replace(/>(?=[A-ZĄĆĘŁŃÓŚŹŻ])/g,"> ")
  .replace(/\s{2,}/g," ");
 // Generator biegu potrafił skleić tę samą informację o pozycji z dwóch modułów.
 s=s.replace(/\b(Jedziesz\s+[1-4]\.)\s+\1/gi,"$1");
 s=s.replace(/\b(Twój kolega(?: z drużyny)? jedzie\s+[1-4]\.)\s+\1/gi,"$1");
 if(!/^\s*(?:<[^>]+>\s*)*\d+\.\s+[a-ząćęłńóśźż]/i.test(s))
  s=s.replace(/^(\s*(?:<[^>]+>\s*)*)([a-ząćęłńóśźż])/,(_,prefix,c)=>prefix+c.toUpperCase());
 return normalizeOrdinalPlaceCase(s);
}

function weightedQualifierTrack(list){
 const total=list.reduce((s,x)=>s+(x.w||1),0);
 let roll=Math.random()*total;
 for(const x of list){roll-=x.w||1;if(roll<=0)return x}
 return list[list.length-1];
}
function internationalQualifierTrack(){
 const roll=Math.random();
 return weightedQualifierTrack(roll<.005?INTERNATIONAL_QUALIFIER_TRACKS.exotic:roll<.055?INTERNATIONAL_QUALIFIER_TRACKS.secondary:INTERNATIONAL_QUALIFIER_TRACKS.primary);
}
function internationalNominationChance(series,basePph){
 const level=leagueByName(S.league)?.level||3,avg=Number(basePph||S.season?.avg)||0;
 const score=overall()+(level===1?8:level===2?3:-3)+(avg-1.3)*12+(S.reputation-40)*.035;
 const threshold=series==="SGP"?78:74;
 if(overall()<70)return overall()>=67&&avg>=2.15&&S.reputation>=75?.012:0;
 let chance=clamp(.07+(score-threshold)*.032,.02,.82);
 if(overall()>=86&&avg>=1.85)chance=Math.max(chance,series==="SEC"?.48:.34);
 if(overall()>=90&&avg>=2.05)chance=Math.max(chance,series==="SEC"?.62:.45);
 return chance;
}
function simulateInternationalQualifier(series,basePph){
 const track=internationalQualifierTrack();
 const mean=series==="SGP"?84:81;
 const field=Array.from({length:15},()=>mean+rand(-8,8));
 const power=overall()*.70+currentFormRating()*.12+S.equipment*.05+S.skills.mental*.05+Number(basePph||1.3)*3+(leagueByName(S.league)?.level===1?2:0)+rand(-7,7);
 const points=simulateFiveRideScore(power,mean);
 const rivalScores=field.map(r=>simulateFiveRideScore(r+rand(-3,3),mean));
 const place=ordinalPlaceByScore(points,rivalScores);
 const qualifyingSpots=Math.random()<.32?3:4;
 const advanced=place<=qualifyingSpots;
 const name=series==="SGP"?"eliminacje do SGP":"eliminacje do SEC";
 addHistory(series==="SGP"?"Kwalifikacje SGP":"Kwalifikacje SEC",
  `${place}. miejsce w ${name} w ${cityLocative(track.city)} (${track.country}) — ${points} pkt • ${advanced?`awans (${qualifyingSpots} miejsca premiowane)`:`bez awansu (${qualifyingSpots} miejsca premiowane)`}.`);
 return {series,track,place,points,advanced,qualifyingSpots};
}
function simulateSECChallengeQualification(basePph){
 const track=internationalQualifierTrack(),key="SEC";
 const field=buildCompetitionField(key,15),mean=field.reduce((s,r)=>s+r.rating,0)/field.length;
 const power=overall()*.70+currentFormRating()*.12+S.equipment*.05+S.skills.mental*.05+Number(basePph||1.3)*3+rand(-6,6);
 const points=simulateFiveRideScore(power,mean);
 const rivals=field.map(r=>simulateFiveRideScore(r.rating+rand(-3,3),mean));
 const place=ordinalPlaceByScore(points,rivals),advanced=place<=5;
 addHistory("SEC Challenge",`${place}. miejsce w SEC Challenge w ${cityLocative(track.city)} (${track.country}) — ${points} pkt${advanced?" • awans do cyklu SEC":" • bez awansu"}.`);
 return {track,place,points,advanced};
}
function internationalQualificationReason(type,data){
 if(type==="SEC")return `${data.challenge.place}. miejsce w SEC Challenge w ${cityLocative(data.challenge.track.city)}`;
 if(type==="SGP")return `${data.qualifier.place}. miejsce w eliminacjach SGP w ${cityLocative(data.qualifier.track.city)} — awans do Grand Prix Challenge`;
 return "";
}

const COMPETITION_FIELD_PROFILES={
 "Speedway Grand Prix":{buckets:[{min:92,max:96,w:.14},{min:88,max:92,w:.30},{min:84,max:88,w:.34},{min:80,max:84,w:.17},{min:77,max:81,w:.05}]},
 "IMP":{buckets:[{min:87,max:92,w:.17},{min:82,max:87,w:.31},{min:78,max:83,w:.34},{min:73,max:79,w:.18}]},
 "Złoty Kask":{buckets:[{min:86,max:91,w:.15},{min:81,max:86,w:.31},{min:77,max:82,w:.35},{min:72,max:78,w:.19}]},
 "Memoriał Jancarza":{buckets:[{min:86,max:92,w:.16},{min:81,max:87,w:.32},{min:77,max:83,w:.34},{min:72,max:79,w:.18}]},
 "Memoriał Smoczyka":{buckets:[{min:84,max:90,w:.14},{min:79,max:85,w:.31},{min:75,max:81,w:.36},{min:70,max:77,w:.19}]},
 "Kryterium Asów":{buckets:[{min:86,max:92,w:.15},{min:82,max:87,w:.31},{min:78,max:83,w:.35},{min:73,max:79,w:.19}]},
 "SEC":{buckets:[{min:87,max:93,w:.14},{min:83,max:88,w:.31},{min:79,max:84,w:.37},{min:74,max:80,w:.18}]},
 "GP Challenge":{buckets:[{min:87,max:93,w:.18},{min:83,max:88,w:.34},{min:79,max:84,w:.34},{min:74,max:80,w:.14}]},
 "MIMP":{buckets:[{min:78,max:86,w:.15},{min:73,max:80,w:.34},{min:68,max:75,w:.35},{min:63,max:70,w:.16}]},
 "SGP2":{buckets:[{min:82,max:89,w:.14},{min:77,max:84,w:.34},{min:72,max:79,w:.36},{min:67,max:74,w:.16}]}
};
function competitionProfileKey(key){
 if(key==="Indywidualne Mistrzostwa Polski")return "IMP";
 if(key==="Indywidualne Mistrzostwa Świata")return "Speedway Grand Prix";
 return key;
}
function drawCompetitionRating(key){
 const profile=COMPETITION_FIELD_PROFILES[competitionProfileKey(key)];
 if(!profile){
  const cfg=COMPETITION_LEVELS[key]||{mean:80,spread:7};
  return clamp(Math.round(cfg.mean+rand(-cfg.spread,cfg.spread)),55,97);
 }
 let roll=Math.random(),bucket=profile.buckets[profile.buckets.length-1];
 for(const b of profile.buckets){roll-=b.w;if(roll<=0){bucket=b;break}}
 return rand(bucket.min,bucket.max);
}
function buildCompetitionField(key,count=15){
 return Array.from({length:count},(_,i)=>({id:`r${i}`,rating:drawCompetitionRating(key)}));
}

const COMPETITION_LEVELS={
 "Brązowy Kask":{mean:58,spread:7,field:16},
 "Srebrny Kask":{mean:66,spread:7,field:16},
 "MIMP":{mean:68,spread:7,field:16},
 "SGP2":{mean:76,spread:7,field:16},
 "IMP":{mean:87,spread:7,field:16},
 "Złoty Kask":{mean:84,spread:7,field:16},
 "Memoriał Jancarza":{mean:85,spread:8,field:16},
 "Memoriał Smoczyka":{mean:83,spread:8,field:16},
 "Kryterium Asów":{mean:86,spread:7,field:16},
 "SEC Challenge":{mean:86,spread:7,field:16},
 "SEC":{mean:89,spread:6,field:16},
 "GP Challenge":{mean:91,spread:6,field:16},
 "Speedway Grand Prix":{mean:92,spread:5,field:16}
};

function triangular(min,mode,max){
 const u=Math.random(),f=(mode-min)/(max-min);
 return u<f ? min+Math.sqrt(u*(max-min)*(mode-min)) : max-Math.sqrt((1-u)*(max-min)*(max-mode));
}
function leagueRiderRating(leagueName,teamStrength=65,seed=0){
 const level=leagueByName(leagueName)?.level||3;
 const r=LEAGUE_RIDER_RANGES[level];
 const clubAdj=(teamStrength-leagueBaseline(leagueName))*.22;
 return clamp(Math.round(triangular(r.min,r.mode,r.max)+clubAdj+rand(-2,2)+(seed%3-1)),r.min-4,r.max);
}
function careerDnaRange(startProfile){
 const ranges={
  raw:[72,86,93],
  academy:[74,87,94],
  license:[75,87,93],
  talent:[82,91,97],
  reserve:[77,88,95]
 };
 return ranges[startProfile]||ranges.academy;
}
function createCareerDNA(startProfile="academy"){
 const [min,mode,max]=careerDnaRange(startProfile),potential=Math.round(triangular(min,mode,max)),roll=Math.random();
 let curveType,peakAge,peakWidth,declineRate,growthAdjust=0;
 // 1.01: większość żużlowców osiąga naturalny szczyt między 27. a 34. rokiem życia,
 // ale nadal istnieją rzadcy fenomeni, późni rozkwitający i bardzo długowieczni zawodnicy.
 if(roll<.03){curveType="phenom";peakAge=rand(21,25);peakWidth=rand(2,4);declineRate=.98+Math.random()*.16;growthAdjust=.12}
 else if(roll<.10){curveType="early";peakAge=rand(24,27);peakWidth=rand(3,5);declineRate=.98+Math.random()*.16;growthAdjust=.07}
 else if(roll<.18){curveType="boomBust";peakAge=rand(25,30);peakWidth=rand(2,4);declineRate=1.08+Math.random()*.20;growthAdjust=.10}
 else if(roll<.32){curveType="volatile";peakAge=rand(27,33);peakWidth=rand(3,5);declineRate=.98+Math.random()*.18;growthAdjust=.01}
 else if(roll<.45){curveType="underachiever";peakAge=rand(27,34);peakWidth=rand(3,5);declineRate=1.00+Math.random()*.16;growthAdjust=-.06}
 else if(roll<.63){curveType="steady";peakAge=rand(29,34);peakWidth=rand(4,7);declineRate=.91+Math.random()*.13}
 else if(roll<.82){curveType="classic";peakAge=rand(27,33);peakWidth=rand(4,6);declineRate=.94+Math.random()*.14}
 else if(roll<.93){curveType="late";peakAge=rand(34,38);peakWidth=rand(3,6);declineRate=.91+Math.random()*.13;growthAdjust=-.07}
 else{curveType="resurgence";peakAge=rand(29,34);peakWidth=rand(4,6);declineRate=.90+Math.random()*.12;growthAdjust=-.01}
 const lateBloom=curveType==="late",earlyPeak=["early","phenom","boomBust"].includes(curveType),exceptionalLongevity=Math.random()<(curveType==="resurgence"?.22:.075);
 const growthRate=Math.round((triangular(.80,1.00,1.22)+growthAdjust)*100)/100;
 const consistency=Math.round(triangular(curveType==="volatile"?.42:.58,curveType==="volatile"?.66:.79,.96)*100)/100,
       pressure=Math.round(triangular(.60,.82,1.06)*100)/100,
       durability=Math.round(triangular(.60,.86,1.10)*100)/100,
       adaptability=Math.round(triangular(.60,.82,1.08)*100)/100;
 const stagnationAge=curveType==="early"?rand(24,29):lateBloom?rand(25,31):rand(22,31);
 const breakoutChance=lateBloom?.18:curveType==="underachiever"?.07:curveType==="volatile"?.13:Math.round(triangular(.04,.08,.14)*100)/100;
 const jr=Math.random(),juniorGift=curveType==="phenom"?Math.max(1.24,jr<.35?1.38:1.27):jr<.015?1.28:jr<.06?1.16:jr<.22?1.07:jr<.84?1:.94,juniorPhenomenon=juniorGift>=1.24;
 const capOffsets={};for(const key of Object.keys(SKILLS))capOffsets[key]=rand(-5,5);
 return {
  potential,growthRate,peakAge,peakWidth,declineRate,curveType,consistency,pressure,durability,adaptability,
  stagnationAge,lateBloom,earlyPeak,exceptionalLongevity,juniorGift,juniorPhenomenon,breakoutChance,capOffsets,
  momentum:0,decisionQuality:0,lastBreakoutYear:null,careerType:null,
  phaseYear:null,phaseState:null,phaseAnnouncedYear:null,trajectoryOffsets:{},majorInjuryShock:null,modelVersion:2
 };
}
function careerDNA(){
 if(!S.careerDNA)S.careerDNA=createCareerDNA(S.startProfile||"academy");
 const dna=S.careerDNA;
 if(!dna.curveType)dna.curveType=dna.juniorPhenomenon?"phenom":dna.lateBloom?"late":dna.earlyPeak?"early":"classic";
 if(!dna.modelVersion){
  if(["classic","steady","underachiever"].includes(dna.curveType))dna.peakAge=clamp(dna.peakAge||31,27,34);
  else if(dna.curveType==="late")dna.peakAge=clamp(dna.peakAge||35,33,38);
  dna.modelVersion=2;
 }
 if(!dna.peakWidth)dna.peakWidth=rand(4,6);
 if(!dna.declineRate)dna.declineRate=.96;
 if(!dna.trajectoryOffsets)dna.trajectoryOffsets={};
 if(dna.phaseYear===undefined)dna.phaseYear=null;
 if(dna.phaseState===undefined)dna.phaseState=null;
 if(dna.phaseAnnouncedYear===undefined)dna.phaseAnnouncedYear=null;
 if(S.startAge===undefined)S.startAge=Math.max(15,S.age-(S.careerStats?.seasons?.length||0));
 if(S.startOverall===undefined)S.startOverall=S.careerStats?.seasons?.[0]?.overallValue||overall();
 if(S.sgpQualified===true&&!S.sgpQualifiedYear)S.sgpQualifiedYear=S.year;
 if(S.sgpQualifiedYear===undefined)S.sgpQualifiedYear=null;
 if(S.sgpQualificationReason===undefined)S.sgpQualificationReason=null;
 return dna;
}
const CAREER_PHASE_DEFS={
 normal:{growth:1,target:0,decay:0,label:"normalny rytm rozwoju",history:"Rozwój przebiega bez wyraźnego przełomu ani kryzysu."},
 surge:{growth:1.34,target:1.6,decay:-.25,label:"mocny impuls",history:"Trening i jazda zaczynają składać się w całość. Przez pewien czas rozwijasz się szybciej niż zwykle."},
 breakthrough:{growth:1.72,target:3.2,decay:-.45,label:"przełom",history:"Coś wyraźnie kliknęło. Sztab widzi wyjątkowy okres rozwojowy i znacznie szybsze przyswajanie nowych elementów."},
 stagnation:{growth:.48,target:-1.2,decay:.25,label:"stagnacja",history:"Rozwój wyhamował. Nawet dobre przygotowanie nie daje teraz tak szybkich efektów jak wcześniej."},
 slump:{growth:.38,target:-2.4,decay:.85,label:"dołek",history:"Wpadasz w sportowy dołek. Część parametrów może się cofnąć, zanim odzyskasz wcześniejszy rytm."},
 secondWind:{growth:1.48,target:2.5,decay:-.40,label:"druga młodość",history:"Łapiesz drugą młodość. Doświadczenie, motywacja i dobre przygotowanie znów wyraźnie pchają cię do przodu."},
 recovery:{growth:.62,target:-.8,decay:.35,label:"odbudowa po urazie",history:"Po poważnym urazie organizm potrzebuje czasu. Rozwój jest ograniczony, ale odzyskanie wcześniejszego poziomu pozostaje możliwe."}
};
function weightedCareerPhase(options){
 const total=options.reduce((sum,x)=>sum+x.w,0);let r=Math.random()*total;
 for(const option of options){r-=option.w;if(r<=0)return option.type}
 return "normal";
}
function careerPhaseState(){
 const dna=careerDNA();
 if(dna.phaseYear===S.year&&dna.phaseState)return dna.phaseState;
 if(dna.phaseState?.remaining>1){
  dna.phaseState={...dna.phaseState,remaining:dna.phaseState.remaining-1};
  dna.phaseYear=S.year;
  return dna.phaseState;
 }
 // Uraz może wymusić fazę odbudowy w kolejnym sezonie.
 if(dna.majorInjuryShock&&dna.majorInjuryShock.untilYear>=S.year){
  dna.phaseState={type:"recovery",remaining:Math.max(1,dna.majorInjuryShock.untilYear-S.year+1),...CAREER_PHASE_DEFS.recovery};
  dna.phaseYear=S.year;
  return dna.phaseState;
 }
 const age=S.age,type=dna.curveType;
 let breakthrough=.006,surge=.045,stagnation=.055,slump=.018,secondWind=0;
 if(type==="phenom"){breakthrough+=age<=23?.028:.004;surge+=.030}
 if(type==="early"){breakthrough+=age<=26?.015:0;slump+=age>=29?.022:0}
 if(type==="boomBust"){breakthrough+=age<=27?.025:.004;surge+=.020;slump+=age>=dna.peakAge?.045:.010}
 if(type==="volatile"){breakthrough+=.008;surge+=.025;stagnation+=.025;slump+=.025}
 if(type==="underachiever"){stagnation+=.040;slump+=.012;breakthrough-=.003}
 if(type==="late"){stagnation+=age<28?.030:0;breakthrough+=age>=29?.018:0;surge+=age>=29?.020:0}
 if(type==="resurgence")secondWind+=age>=33?.065:0;
 if(age>=32)secondWind+=.005+(dna.exceptionalLongevity?.010:0);
 if(age>=38&&!dna.exceptionalLongevity){breakthrough*=.45;surge*=.60;slump+=.020}
 const options=[
  {type:"breakthrough",w:Math.max(.004,breakthrough)},
  {type:"surge",w:Math.max(.01,surge)},
  {type:"stagnation",w:stagnation},
  {type:"slump",w:slump},
  {type:"secondWind",w:Math.max(0,secondWind)}
 ];
 const specialTotal=options.reduce((sum,x)=>sum+x.w,0);
 options.push({type:"normal",w:Math.max(.30,1-specialTotal)});
 const chosen=weightedCareerPhase(options),def=CAREER_PHASE_DEFS[chosen]||CAREER_PHASE_DEFS.normal;
 const remaining=chosen==="normal"?1:chosen==="breakthrough"?rand(1,2):chosen==="secondWind"?rand(1,2):chosen==="stagnation"?rand(1,3):chosen==="slump"?rand(1,2):rand(1,2);
 dna.phaseState={type:chosen,remaining,...def};dna.phaseYear=S.year;
 return dna.phaseState;
}
function announceCareerPhase(){
 const dna=careerDNA(),phase=careerPhaseState();
 if(dna.phaseAnnouncedYear===S.year||phase.type==="normal")return phase;
 dna.phaseAnnouncedYear=S.year;
 addHistory("Faza rozwoju",phase.history);
 return phase;
}
function careerTrajectoryOffset(){
 const dna=careerDNA();
 if(dna.trajectoryOffsets[S.year]===undefined){
  const volatile=dna.curveType==="volatile"||dna.curveType==="boomBust";
  const spread=volatile?2.4:1.4;
  let offset=(Math.random()+Math.random()+Math.random()-1.5)*spread;
  if(dna.curveType==="underachiever")offset-=.35;
  dna.trajectoryOffsets[S.year]=Math.round(offset*10)/10;
 }
 return dna.trajectoryOffsets[S.year];
}
function careerCurveTargetOverall(){
 const dna=careerDNA(),age=S.age,phase=careerPhaseState();
 const startAge=S.startAge??Math.max(15,age-(S.careerStats?.seasons?.length||0));
 const startOverall=S.startOverall??S.careerStats?.seasons?.[0]?.overallValue??overall();
 const peak=dna.peakAge||31,potential=dna.potential||84,plateau=Math.max(2,Math.min(6,dna.peakWidth||4));
 let target;
 if(age<=peak){
  const years=Math.max(5,peak-startAge),progress=clamp((age-startAge)/years,0,1);
  const exponent=dna.curveType==="late"?1.42:dna.curveType==="underachiever"?1.30:dna.curveType==="phenom"?.88:dna.curveType==="boomBust"?.94:1.13;
  target=startOverall+(potential-startOverall)*(1-Math.pow(1-progress,exponent));
 }else{
  const after=age-peak,plateauYears=Math.min(after,plateau),declineYears=Math.max(0,after-plateau);
  const lateAgePressure=age>=39?(age-38)*.16:0;
  const declineBase=dna.exceptionalLongevity?.56:1;
  target=potential-plateauYears*.10-declineYears*(.82*(dna.declineRate||1)*declineBase)-Math.max(0,declineYears-4)*.40*declineBase-lateAgePressure*declineBase;
 }
 if(dna.curveType==="underachiever")target-=age<peak?1.8:1.2;
 if(dna.curveType==="phenom")target+=age<=27?1.2:.4;
 if(dna.curveType==="boomBust"&&age>peak+1)target-=Math.min(4,(age-peak-1)*.55);
 if(dna.curveType==="resurgence"&&age>=34)target+=1.0;
 if(dna.exceptionalLongevity&&age>=37)target+=1.8;
 target+=Number(phase.target||0)+careerTrajectoryOffset();
 target+=clamp((dna.decisionQuality||0)*.085,-4,5)+clamp((S.professionalism-50)*.020,-1.2,1.2);
 return clamp(target,44,99);
}
function eliteSkillGrowthMultiplier(value){
 if(value<80)return 1;
 if(value<90)return .78;
 if(value<95)return .48;
 if(value===95)return .24;
 if(value===96)return .13;
 if(value===97)return .065;
 if(value>=98)return .025;
 return 1;
}
function curvePressureOnGrowth(){
 const diff=overall()-careerCurveTargetOverall();
 if(diff<=-5)return 1.22;
 if(diff<=0)return 1.05;
 if(diff<=3)return .62;
 return .28;
}
function curveDrivenSkillDecay(){
 const dna=careerDNA(),target=careerCurveTargetOverall(),current=overall(),after=S.age-(dna.peakAge||30);
 const plateau=Math.max(2,Math.min(5,dna.peakWidth||4));
 const tolerance=after<=1?1.5:after<=plateau?.65:0;
 if(current<=target+tolerance)return;
 const excess=current-target,keys=Object.keys(S.skills).filter(k=>S.skills[k]>45);
 const attempts=Math.min(7,Math.max(1,Math.round(excess/1.15)+(after>plateau?1:0)));
 for(let i=0;i<attempts;i++){
  const key=pick(keys);if(!key)break;
  const physical=["starts","distance","fitness","overtaking"].includes(key);
  let chance=.42+Math.min(.48,excess*.10);
  if(after>plateau)chance+=physical?.18:.08;
  if(after>plateau+4)chance+=.08;
  if(dna.exceptionalLongevity)chance-=.13;
  if(Math.random()<clamp(chance,.18,.96))S.skills[key]-=1;
 }
}
function careerCurveReport(){
 const dna=careerDNA(),target=Math.round(careerCurveTargetOverall()),diff=overall()-target;
 if(S.age<=21&&dna.juniorPhenomenon)return "Rozwijasz się wyjątkowo szybko jak na swój wiek. Sztab widzi potencjał na bardzo wczesne sukcesy.";
 if(dna.curveType==="late"&&S.age<28)return "Rozwój jest spokojniejszy, ale sztab nadal widzi rezerwy na późniejszy skok formy.";
 if(dna.curveType==="underachiever"&&S.age<25)return "Masz potencjał na solidnego ligowca, ale bez regularnych startów i dobrych decyzji łatwo utknąć w miejscu.";
 if(diff>=4)return "Rozwój wyprzedza naturalną trajektorię. Kolejne punkty będą coraz trudniejsze do zdobycia i utrzymania.";
 if(diff<=-5)return "Tempo rozwoju jest poniżej oczekiwań. Regularna jazda i właściwe decyzje mogą jeszcze zmienić przebieg kariery.";
 if(S.age>(dna.peakAge||32)+3)return "Sztab widzi pierwsze oznaki schodzenia ze szczytu formy.";
 return "Rozwój przebiega blisko aktualnej trajektorii kariery.";
}

function skillSoftTarget(key){
 const dna=careerDNA(),target=careerCurveTargetOverall();
 const professionalismLift=Math.round((S.professionalism-50)*.05);
 const decisionLift=Math.round(clamp(dna.decisionQuality||0,-20,30)*.07);
 const facilitiesLift=Math.min(3,facilityLevel("training"));
 let cap=target+(dna.capOffsets?.[key]||0)+professionalismLift+decisionLift+facilitiesLift;
 if(dna.curveType==="phenom")cap+=2;
 const yearsAfterPeak=S.age-(dna.peakAge||31);
 if(yearsAfterPeak>2&&!dna.exceptionalLongevity)cap-=Math.min(7,Math.floor((yearsAfterPeak-1)*.50));
 if(S.age>=40&&!dna.exceptionalLongevity)cap-=Math.min(4,Math.floor((S.age-39)*.28));
 if(cap>=98&&dna.potential<96)cap=97;
 if(cap>=99&&dna.potential<98)cap=98;
 return clamp(Math.round(cap),52,99);
}
function skillSoftCap(key){
 // W interfejsie próg nigdy nie wygląda jak "limit 62", gdy zawodnik ma już 65.
 return Math.max(skillSoftTarget(key),Math.round(S.skills[key]||0));
}
function ageGrowthCurve(){
 const dna=careerDNA(),age=S.age,peak=dna.peakAge||31,after=age-peak;
 if(age>=48)return dna.exceptionalLongevity?.08:.012;
 if(age>=45)return dna.exceptionalLongevity?.16:.028;
 if(after>=9)return dna.exceptionalLongevity?.22:.035;
 if(after>=6)return dna.exceptionalLongevity?.34:.075;
 if(after>=3)return dna.exceptionalLongevity?.48:.16;
 if(after>=1)return .40;
 if(after>=-2)return .74;
 if(dna.lateBloom&&age<24)return .78;
 if(age<19)return 1.20;
 if(age<23)return 1.12;
 if(age<27)return 1.06;
 return 1;
}
function careerDecisionFactor(){
 const dna=careerDNA();
 const riding=Math.min(1,(S.season?.heats||0)/45);
 const professionalism=(S.professionalism-45)/80;
 const morale=(S.morale-45)/110;
 return clamp(.72+riding*.25+professionalism+morale+(dna.decisionQuality||0)/120,.45,1.35);
}
function careerVolatility(){
 const dna=careerDNA();
 return Math.round((1-dna.consistency)*24+4);
}
function agePerformanceAdjustment(){
 const dna=careerDNA(),age=S.age;
 const distance=age-dna.peakAge;
 if(distance<-7)return -0.07;
 if(distance<-3)return -0.025;
 if(distance<=3)return 0.035;
 if(distance<=6)return -0.035;
 let decline=-(distance-5)*.035;
 if(dna.exceptionalLongevity)decline*=.55;
 return clamp(decline,-.48,.04);
}
function lateCareerPphCap(){
 const dna=careerDNA(),age=S.age;
 if(age<=38)return 2.90;
 const longevity=dna.exceptionalLongevity?.12:0;
 if(age<=41)return 2.72+longevity;
 if(age<=44)return 2.56+longevity;
 if(age<=46)return 2.43+longevity;
 if(age<=48)return 2.30+longevity;
 return 2.18+longevity;
}
function competitionAgeAdjustment(){
 const age=S.age,dna=careerDNA();
 if(age>=48)return dna.exceptionalLongevity?-5:-11;
 if(age>=45)return dna.exceptionalLongevity?-2:-8;
 if(age>=42)return dna.exceptionalLongevity?0:-5;
 if(age>=39)return -2;
 if(age>=28&&age<=36)return 2;
 return 0;
}

function careerPerformanceModifier({important=false}={}){
 const dna=careerDNA(),phase=careerPhaseState();
 const volatility=rand(-careerVolatility(),careerVolatility())/100;
 const pressure=important?(dna.pressure-.82)*.32:0;
 const momentum=clamp(dna.momentum||0,-12,12)/100;
 const adaptation=S.lastTransferYear===S.year-1?(dna.adaptability-.82)*.24:0;
 const phaseForm=phase.type==="breakthrough"?.055:phase.type==="surge"?.028:phase.type==="secondWind"?.035:phase.type==="slump"?-.050:phase.type==="stagnation"?-.018:phase.type==="recovery"?-.028:0;
 return volatility+pressure+momentum+adaptation+phaseForm+agePerformanceAdjustment();
}
function injuryDnaMultiplier(){
 const dna=careerDNA();
 return clamp(1.55-dna.durability,.55,1.15);
}
const GUIDANCE_REPORTS={
 juniorElite:[
  "Rozwijasz się szybciej niż niemal wszyscy zawodnicy w twoim wieku. Regularne starty mogą otworzyć drogę do MIMP i SGP2.",
  "Sztab widzi w tobie wyjątkowy talent młodzieżowy. Największym błędem byłby teraz kontrakt bez gwarancji jazdy.",
  "Twoje tempo nauki przypomina najlepszych juniorów rocznika. Warto szukać klubu, który wystawi cię w DMPJ.",
  "Mimo młodego wieku nie odstajesz od starszych juniorów. Dobrze dobrany mentor może przyspieszyć wejście na poziom międzynarodowy.",
  "Trenerzy zaczynają mówić o tobie jak o kandydacie do medali młodzieżowych. Nie zaniedbuj regeneracji i liczby biegów."
 ],
 juniorGood:[
  "Rozwijasz się nieco szybciej od przeciętnego zawodnika w swoim wieku. Regularność może zamienić ten potencjał w sukcesy.",
  "Sztab jest zadowolony z postępów. Najwięcej zyskasz teraz przez jazdę, nie przez siedzenie w mocniejszym klubie.",
  "Ostatnie decyzje treningowe dają efekt. Kolejny krok to większa liczba startów przeciwko starszym rywalom.",
  "Twój profil juniorski wygląda obiecująco, ale wciąż potrzebujesz doświadczenia meczowego.",
  "Jesteś na dobrej drodze do krajowej czołówki juniorów. Pilnuj, aby sprzęt nie odstawał od umiejętności."
 ],
 noRides:[
  "Za mało startujesz. Nawet duży potencjał nie przełoży się na rozwój bez regularnych biegów.",
  "Sztab ostrzega, że obecny klub nie daje ci wystarczająco dużo jazdy. Rozważ słabszą ligę lub inną rolę.",
  "Tempo rozwoju spadło przez brak startów. Trening nie zastąpi rywalizacji meczowej.",
  "Twoja pozycja w składzie hamuje karierę. Oferta z niższej ligi może być sportowo lepsza niż ławka.",
  "Masz zbyt mało biegów, by utrzymać rytm. Priorytetem powinien być klub gwarantujący realną rywalizację."
 ],
 stagnation:[
  "Rozwój wyhamował. Potrzebujesz zmiany bodźca: innego treningu, mentora albo większej liczby biegów.",
  "Sztab nie widzi ostatnio postępu. Sprawdź, czy inwestujesz w cechy, które rzeczywiście ograniczają twoją jazdę.",
  "Wchodzisz w okres stagnacji. Dobre decyzje mogą go skrócić, ale samo przeklikiwanie sezonów nie wystarczy.",
  "Twoje wyniki stoją w miejscu. Być może poziom ligi jest źle dopasowany do aktualnych możliwości.",
  "Trener sugeruje bardziej wyspecjalizowany program rozwoju zamiast równomiernego podnoszenia wszystkiego."
 ],
 goodPath:[
  "Regularna jazda i dobre przygotowanie zaczynają się przekładać na wyniki. Obrany kierunek wygląda rozsądnie.",
  "Sztab wysoko ocenia sposób prowadzenia kariery. Utrzymuj balans między sprzętem, treningiem i regeneracją.",
  "Ostatni sezon potwierdził, że klub i liga są dobrze dobrane do twojego poziomu.",
  "Podejmowane decyzje pomagają wykorzystywać potencjał. Nie musisz teraz ryzykować gwałtownej zmiany klubu.",
  "Twoja kariera rozwija się stabilnie. Kolejny poziom wymaga jednak lepszej rywalizacji i mocniejszego zaplecza."
 ],
 badFinances:[
  "Zadłużenie zaczyna wpływać na morale i przygotowanie. Najpierw ustabilizuj finanse, potem planuj kosztowne inwestycje.",
  "Koszty teamu są za wysokie względem zarobków. Rozważ tańszy pakiet przygotowań.",
  "Budżet ogranicza rozwój bardziej niż umiejętności. Potrzebujesz kontraktu z realną liczbą startów.",
  "Sztab ostrzega, że kolejne wydatki mogą pogłębić dług bez wyraźnego efektu sportowego.",
  "Finanse wymagają korekty. Droższy silnik nie rozwiąże problemu małej liczby biegów."
 ],
 injury:[
  "Ryzyko urazu jest podwyższone. Regeneracja może dać więcej niż kolejny intensywny obóz.",
  "Organizm źle reaguje na obciążenia. Warto ograniczyć ryzykowne treningi i zadbać o fizjoterapię.",
  "Sztab medyczny sugeruje spokojniejszy okres przygotowań. Kontuzja może zatrzymać dobrze rozwijającą się karierę.",
  "Kondycja nie nadąża za kalendarzem. Zadbaj o regenerację przed kolejnymi zawodami.",
  "Masz coraz mniej marginesu zdrowotnego. Nie każda okazja startowa jest warta dodatkowego ryzyka."
 ],
 ageing:[
  "Wchodzisz w schyłkową fazę kariery. Trening służy teraz częściej utrzymaniu poziomu niż dalszemu wzrostowi.",
  "Parametry fizyczne zaczynają spadać. Technika i doświadczenie mogą jeszcze częściowo zrekompensować regres.",
  "Sztab zaleca ograniczenie liczby intensywnych przygotowań i większy nacisk na regenerację.",
  "Twoja pozycja w składzie zależy już nie tylko od nazwiska, ale od aktualnej średniej i dyspozycji.",
  "Końcówka kariery wymaga ostrożniejszych decyzji. Pojedynczy świetny sezon jest możliwy, lecz ogólny trend będzie spadkowy."
 ]
};
function guidanceCategory(){
 const heats=S.season?.heats||0,avgValue=S.season?.avg||0,dna=careerDNA();
 if(S.age<=21&&dna.juniorGift>=1.20)return "juniorElite";
 if(S.age<=21&&dna.juniorGift>=1.07)return "juniorGood";
 if(heats>0&&heats<22)return "noRides";
 if(S.budget<0)return "badFinances";
 if(S.injuryRisk>=20)return "injury";
 if(S.age>=37)return "ageing";
 if((dna.momentum||0)<=-3||avgValue>0&&avgValue<.9)return "stagnation";
 return "goodPath";
}
function guidanceReport({force=false}={}){
 if(!S.showGuidance)return null;
 if(!S.guidanceMemory)S.guidanceMemory={used:[],lastYear:null};
 if(!force&&S.guidanceMemory.lastYear===S.year)return null;
 const category=guidanceCategory(),pool=GUIDANCE_REPORTS[category]||GUIDANCE_REPORTS.goodPath;
 let available=pool.filter(text=>!S.guidanceMemory.used.includes(text));
 if(!available.length){S.guidanceMemory.used=S.guidanceMemory.used.slice(-12);available=pool.filter(text=>!S.guidanceMemory.used.includes(text))}
 const text=pick(available.length?available:pool);
 S.guidanceMemory.used.push(text);S.guidanceMemory.used=S.guidanceMemory.used.slice(-20);S.guidanceMemory.lastYear=S.year;
 addHistory("Raport sztabu",text);
 return {category,text};
}
function appendGuidanceToSeasonSummary(){
 const report=guidanceReport();
 if(!report)return;
 $("newsBox").innerHTML+=`<div class="guidance-report"><span>RAPORT SZTABU</span><p>${report.text}</p></div>`;
}

function careerDevelopmentHint(){
 const dna=careerDNA();
 if(S.age>=(dna.peakAge||32)+3)return careerCurveReport();
 if(dna.curveType==="resurgence")return "Sztab widzi profil, który może długo utrzymywać poziom, a nawet złapać późniejszą drugą młodość.";
 if(dna.curveType==="volatile"||dna.curveType==="boomBust")return "Masz potencjał do gwałtownych skoków, ale rozwój może przebiegać falami zamiast po prostej linii.";
 if(dna.lateBloom)return "Sztab widzi rezerwy, ale ostrzega, że rozwój może wymagać cierpliwości.";
 if(dna.earlyPeak)return "Trenerzy widzą szybkie tempo nauki, ale ważne będzie uniknięcie wczesnej stagnacji.";
 if(dna.growthRate>1.12)return "Szybko przyswajasz nowe elementy, o ile regularnie startujesz.";
 if(dna.durability<.70)return "Fizjoterapeuta zwraca uwagę, że organizm źle znosi przeciążenia.";
 if(dna.consistency<.67)return "Masz duże możliwości, ale forma może mocno falować.";
 return "Sztab ocenia profil jako zrównoważony; regularna jazda będzie kluczowa.";
}
function updateCareerTrajectory({pph=0,matches=0,heats=0,injured=false}={}){
 const dna=careerDNA(),phase=careerPhaseState();
 const regularity=Math.min(1,heats/50);
 const performance=(pph-1.35)*4;
 const decisions=(S.professionalism-50)/18+(S.morale-50)/30+regularity*3;
 dna.decisionQuality=clamp((dna.decisionQuality||0)*.72+decisions+performance-(injured?1.5:0),-25,35);
 dna.momentum=clamp((dna.momentum||0)*.55+(pph-1.45)*5+(matches>=8?1.5:-1)-(injured?2:0),-12,12);
 if(phase.type==="breakthrough")dna.momentum=clamp(dna.momentum+3,-12,12);
 if(phase.type==="slump")dna.momentum=clamp(dna.momentum-3,-12,12);
 if(dna.lateBloom&&S.age>=dna.stagnationAge&&S.age<=dna.peakAge+1&&dna.lastBreakoutYear!==S.year){
  const chance=dna.breakoutChance*(.65+careerDecisionFactor()*.45);
  if(Math.random()<chance){
   dna.lastBreakoutYear=S.year;
   dna.momentum=clamp(dna.momentum+6,-12,12);
   S.devPoints+=rand(2,4);
   addHistory("Przełom w rozwoju","Po latach spokojnego progresu sztab zauważa wyraźny skok jakości jazdy.");
  }
 }
}
function classifyCareerPath(){
 const archive=S.careerStats?.competitionArchive||[];
 const worldTitles=archive.filter(r=>canonicalCompetitionKey(r)==="SGP"&&r.place===1).length;
 const worldMedals=archive.filter(r=>canonicalCompetitionKey(r)==="SGP"&&r.place<=3).length;
 const euroTitles=archive.filter(r=>canonicalCompetitionKey(r)==="SEC"&&r.place===1).length;
 const polishTitles=archive.filter(r=>canonicalCompetitionKey(r)==="IMP"&&r.place===1).length;
 const best=S.careerStats?.bestOverall||overall(),dna=careerDNA();
 if(worldTitles>=3)return "Legenda światowego żużla";
 if(worldTitles>=1)return "Mistrz świata";
 if(worldMedals>=3)return "Gwiazda światowej czołówki";
 if(worldMedals>=1||euroTitles>=2||best>=88)return "Zawodnik klasy światowej";
 if(polishTitles>=2||best>=83)return "Czołowy zawodnik krajowy";
 if(S.national==="Polska"||best>=78)return "Reprezentant i solidny ligowiec";
 if(best>=70)return "Solidny ligowiec";
 if(dna.potential>=88)return "Niespełniony talent";
 return "Rzemieślnik ligowy";
}

function performanceIndex(basePph){
 const level=leagueByName(S.league)?.level||3;
 const leagueFactor=level===1?5:level===2?1:-3;
 const samplePenalty=S.season.matches<6?-4:0;
 return overall()*.58+currentFormRating()*.16+S.equipment*.08+S.skills.mental*.08+basePph*8+leagueFactor+samplePenalty;
}
function competitionField(key){
 const cfg=COMPETITION_LEVELS[key];
 return Array.from({length:cfg.field-1},(_,i)=>({
  name:`Rywal ${i+1}`,
  rating:clamp(Math.round(cfg.mean+rand(-cfg.spread,cfg.spread)),45,98)
 }));
}
function simulatedRoundScore(playerPower,fieldMean,maxHeats=5){
 const diff=playerPower-fieldMean;
 let pts=0;
 for(let i=0;i<maxHeats;i++){
  const heatPower=diff+rand(-12,12);
  pts+=heatPower>=10?3:heatPower>=2?2:heatPower>=-7?1:0;
 }
 return pts;
}
function ordinalPlaceByScore(playerScore,opponentScores){
 return 1+opponentScores.filter(x=>x>playerScore).length;
}
function leagueFinancialRange(level){
 return level===1?{min:4500,max:10000}:level===2?{min:2500,max:6000}:{min:1200,max:3500};
}

const SPONSOR_POOLS={
 local:[
  "Marma Polskie Folie","Bazarek Rymanów","Walbud",
  "Panel-Bet","Hydro-Mix","Agro-Piorun","Budomax","Trans-Kar","Dach-System",
  "Okno-Serwis","Moto-Centrum","Bruk-Max","Instal-Pro","Stal-Met","Domex",
  "Filar Development","Eko-Term","Geo-Bud","Podkarpacki Beton","Kres-Bud",
  "Pol-Dach","Auto-Partner","Tech-Masz","Meblo-Styl","Rol-Masz"
 ],
 national:[
  "ORLEN Oil","Enea","PGE","Tauron","Energa","PKO Bank Polski","LOTTO",
  "InPost","Allegro","Żabka","Plus","Play","Lotos","KGHM","Grupa Azoty",
  "Maspex","Dino","CCC","LPP","Budimex","Asseco","Comarch"
 ],
 humorous:[
  "Foto-Higiena","Bus przez Uzbekistan","Wylewki 24","Kebab u Prezesa",
  "Okno-Bet","Serwis Opon Na Okrągło","Hurtownia Łożysk i Zniczy",
  "Kostka Brukowa Borsuk","Agro-Piorun","Hydro-Mix Deluxe",
  "Dach-Pol Turbo","Betonowy Janusz","Meble i Węgiel Kowalski"
 ],
 global:[
  "Samsung","Toyota","Red Bull","Microsoft","Amazon","Google","Qatar Airways",
  "Emirates","Shell","BP","Hyundai","Lenovo","Sony","Panasonic","FedEx"
 ]
};

const CLUB_BASE_NAME_OVERRIDES={
 "Abramczyk Polonia Bydgoszcz":"Polonia Bydgoszcz",
 "Cellfast Wilki Krosno":"Wilki Krosno",
 "ORLEN OIL Motor Lublin":"Motor Lublin",
 "ORLEN Oil Motor Lublin":"Motor Lublin",
 "Betard Sparta Wrocław":"Sparta Wrocław",
 "KRONO-PLAST Włókniarz Częstochowa":"Włókniarz Częstochowa",
 "INNPRO ROW Rybnik":"ROW Rybnik",
 "Dakar Development Stal Rzeszów":"Stal Rzeszów",
 "H. Skrzydlewska Orzeł Łódź":"Orzeł Łódź",
 "Hunters PSŻ Poznań":"PSŻ Poznań",
 "Moonfin Malesa Ostrów Wielkopolski":"Ostrów Wielkopolski",
 "Moonfin Magnus Ostrów Wielkopolski":"Ostrów Wielkopolski",
 "GEZET Stal Gorzów":"Stal Gorzów",
 "TRANS MF Landshut Devils":"Landshut Devils",
 "LVBET Lokomotiv Daugavpils":"Lokomotiv Daugavpils"
};

const CLUB_INITIAL_SPONSORS={
 "Polonia Bydgoszcz":"Abramczyk",
 "Wilki Krosno":"Cellfast",
 "Motor Lublin":"ORLEN Oil",
 "Sparta Wrocław":"Betard",
 "Włókniarz Częstochowa":"KRONO-PLAST",
 "ROW Rybnik":"INNPRO",
 "Stal Rzeszów":"Dakar Development",
 "Orzeł Łódź":"H. Skrzydlewska",
 "PSŻ Poznań":"Hunters",
 "Ostrów Wielkopolski":"Moonfin",
 "Stal Gorzów":"GEZET",
 "Landshut Devils":"TRANS MF",
 "Lokomotiv Daugavpils":"LVBET"
};

function clubBaseName(rawName){
 const raw=String(rawName||"").trim();
 if(!raw)return raw;
 if(CLUB_BASE_NAME_OVERRIDES[raw])return CLUB_BASE_NAME_OVERRIDES[raw];

 // Historia nazw sponsorskich jest stabilnym słownikiem tożsamości.
 const historical=S?.clubNameHistory||{};
 if(historical[raw])return historical[raw];

 // Bieżąca nazwa sponsora.
 for(const [base,identity] of Object.entries(S?.clubIdentity||{})){
  if(raw===base||raw===identity?.displayName)return base;
 }

 // Ostatnia linia obrony dla nazw typu "Sponsor + bazowa nazwa klubu".
 const bases=[
  ...Object.keys(S?.clubIdentity||{}),
  ...LEAGUES.flatMap(l=>l.teams.map(t=>CLUB_BASE_NAME_OVERRIDES[t[0]]||t[0])),
  ...EXPANSION_CLUBS.map(x=>CLUB_BASE_NAME_OVERRIDES[x.name]||x.name)
 ].sort((a,b)=>b.length-a.length);
 const suffix=bases.find(base=>raw===base||raw.endsWith(` ${base}`));
 return suffix||raw;
}
function ensureClubIdentity(){
 if(!S.clubIdentity)S.clubIdentity={};
 if(!S.clubNameHistory)S.clubNameHistory={};
 if(!S.pendingMajorCompetitions)S.pendingMajorCompetitions=[];
 if(!S.pendingTeamCompetitions)S.pendingTeamCompetitions=[];
 if(S.preseasonCompletedYear===undefined)S.preseasonCompletedYear=null;
 if(S.budgetManagementCompletedYear===undefined)S.budgetManagementCompletedYear=null;
 if(S.preseasonOffers===undefined)S.preseasonOffers=null;
 if(S.licenseAttempts===undefined)S.licenseAttempts=0;
 if(S.seasonFlowActive===undefined)S.seasonFlowActive=false;
 if(S.seasonResolution===undefined)S.seasonResolution=null;
 if(S.v109MetaRepairApplied===undefined)S.v109MetaRepairApplied=false;
 if(S.showGuidance===undefined)S.showGuidance=true;
 if(!S.guidanceMemory)S.guidanceMemory={used:[],lastYear:null};
 if(S.careerDNA&&S.careerDNA.juniorGift===undefined){S.careerDNA.juniorGift=1;S.careerDNA.juniorPhenomenon=false}

 for(const league of LEAGUES){
  for(const [rawName] of league.teams){
   const base=clubBaseName(rawName);
   if(!S.clubIdentity[base]){
    const initial=CLUB_INITIAL_SPONSORS[base]||"";
    S.clubIdentity[base]={
     baseName:base,
     sponsor:initial,
     displayName:initial?`${initial} ${base}`:base,
     sponsorType:initial?"legacy":"none",
     sponsorSince:2026,
     sponsorUntil:initial?2026+rand(10,18):null,
     lastChangeYear:2026,
     changeCount:0
    };
   }
   const identity=S.clubIdentity[base];
   if(identity?.displayName)S.clubNameHistory[identity.displayName]=base;
   S.clubNameHistory[base]=base;
  }
 }
 resolveDuplicateActiveSponsors();
}
function clubDisplayName(name){
 ensureClubIdentity();
 const base=clubBaseName(name);
 return S.clubIdentity?.[base]?.displayName||name;
}

function clubDisplayNameForSeason(name,year=S.year){
 const base=clubBaseName(name);
 const archived=S?.worldLeagueArchive?.[year]?.[base];
 if(archived?.displayName)return archived.displayName;
 const saved=S?.clubNameArchive?.[year]?.[base];
 if(saved)return saved;
 if(S?.careerStats?.seasons){
  const season=S.careerStats.seasons.find(x=>x.year===year&&x.clubBase===base);
  if(season?.club)return season.club;
 }
 return clubDisplayName(base);
}
function captureSeasonClubNameSnapshot(year=S.year){
 S.clubNameArchive??={};
 const snapshot={};
 ensureClubIdentity();
 for(const league of LEAGUES){
  for(const [rawName] of league.teams){
   const base=clubBaseName(rawName);
   snapshot[base]=clubDisplayName(base);
   S.clubNameHistory[snapshot[base]]=base;
  }
 }
 if(S.club){
  const base=clubBaseName(S.club);
  snapshot[base]=clubDisplayName(base);
  S.clubNameHistory[snapshot[base]]=base;
 }
 S.clubNameArchive[year]=snapshot;
 return snapshot;
}

function renameClubReferences(oldDisplay,newDisplay,base){
 // Tożsamość sportowa klubu pozostaje stała. Zmienia się wyłącznie nazwa wyświetlana.
 if(clubBaseName(S.club)===base)S.club=canonicalClubName(base);
 if(clubBaseName(S.tableClub)===base)S.tableClub=canonicalClubName(base);
 if(S.loanParentClub&&clubBaseName(S.loanParentClub)===base)S.loanParentClub=canonicalClubName(base);
}
function sponsorCandidateType(base,finance){
 const roll=Math.random()*100;
 if(roll<1.2)return "global";
 if(roll<7)return "humorous";
 if(finance?.wealth>=72&&roll<38)return "national";
 if(roll<25)return "national";
 return "local";
}
function sponsorDuration(type){
 if(type==="global")return rand(7,11);
 if(type==="national")return rand(8,13);
 if(type==="humorous")return rand(5,8);
 return rand(7,12);
}
function sponsorFinancialEffect(type){
 return type==="global"?rand(24,40):type==="national"?rand(12,24):type==="humorous"?rand(3,10):rand(5,15);
}

function normalizeSponsorName(name){
 return String(name||"").trim().toLowerCase();
}
function activeSponsorOwners(exceptBase=null){
 const used=new Map();
 for(const [base,identity] of Object.entries(S.clubIdentity||{})){
  if(exceptBase&&base===exceptBase)continue;
  if(identity?.sponsor)used.set(normalizeSponsorName(identity.sponsor),base);
 }
 return used;
}
function sponsorAvailableForClub(sponsor,base,currentSponsor=""){
 if(!sponsor)return false;
 if(currentSponsor&&normalizeSponsorName(sponsor)===normalizeSponsorName(currentSponsor))return false;
 return !activeSponsorOwners(base).has(normalizeSponsorName(sponsor));
}
function sponsorRegionalAffinity(sponsor,base){
 const city=clubCity(base);
 if(sponsor==="Bazarek Rymanów"){
  if(["Krosno","Rzeszów","Tarnów","Machowa","Kraków"].includes(city))return 5.8;
  if(["Lublin","Kielce","Częstochowa","Opole","Ostrów Wielkopolski"].includes(city))return 3.4;
  return 2.15; // względnie wysoki tier także poza regionem
 }
 if(sponsor==="Walbud"){
  if(["Krosno","Rzeszów","Tarnów","Kraków","Lublin"].includes(city))return 3.2;
  return 1.45;
 }
 if(sponsor==="Marma Polskie Folie"){
  if(["Rzeszów","Krosno","Tarnów","Lublin","Kraków"].includes(city))return 2.7;
  return 1.1;
 }
 return 1;
}
function pickAvailableSponsor(pool,base,currentSponsor=""){
 const available=(pool||[]).filter(s=>sponsorAvailableForClub(s,base,currentSponsor));
 if(!available.length)return null;
 const weighted=[];
 for(const sponsor of available){
  const weight=Math.max(1,Math.round(sponsorRegionalAffinity(sponsor,base)*10));
  for(let i=0;i<weight;i++)weighted.push(sponsor);
 }
 return pick(weighted);
}
function resolveDuplicateActiveSponsors(){
 const seen=new Map();
 for(const [base,identity] of Object.entries(S.clubIdentity||{})){
  const sponsor=identity?.sponsor;
  if(!sponsor)continue;
  const key=normalizeSponsorName(sponsor);
  if(!seen.has(key)){seen.set(key,base);continue}
  identity.sponsor="";
  identity.sponsorType="none";
  identity.sponsorSince=S.year;
  identity.sponsorUntil=null;
  identity.lastChangeYear=S.year;
  identity.displayName=base;
 }
}

function maybeChangeTitleSponsors(){
 ensureClubIdentity();
 ensureClubFinance();
 ensureClubIdentity();
 resolveDuplicateActiveSponsors();
 const changes=[];
 for(const [base,identity] of Object.entries(S.clubIdentity)){
  const finance=S.clubFinance[base]||S.clubFinance[identity.displayName]||{wealth:50,ambition:50};
  const yearsSince=S.year-(identity.lastChangeYear||2026);
  const expired=identity.sponsorUntil&&S.year>=identity.sponsorUntil;
  // Długie partnerstwa są częste: po wygaśnięciu sponsor bardzo często po prostu przedłuża umowę.
  if(expired&&identity.sponsor&&Math.random()<.52){
   identity.sponsorUntil=S.year+rand(6,10);
   continue;
  }
  const eligible=yearsSince>=7&&(expired||Math.random()*100<.70);
  if(!eligible)continue;
  if((identity.changeCount||0)>=1&&Math.random()>.48)continue;
  if((identity.changeCount||0)>=3)continue;
  const type=sponsorCandidateType(base,finance);
  const pool=SPONSOR_POOLS[type];
  const sponsor=pickAvailableSponsor(pool,base,identity.sponsor);
  if(!sponsor)continue;
  const oldDisplay=identity.displayName;
  S.clubNameHistory??={};S.clubNameHistory[oldDisplay]=base;
  identity.sponsor=sponsor;
  identity.sponsorType=type;
  identity.sponsorSince=S.year;
  identity.sponsorUntil=S.year+sponsorDuration(type);
  identity.lastChangeYear=S.year;
  identity.changeCount=(identity.changeCount||0)+1;
  identity.displayName=`${sponsor} ${base}`;
  S.clubNameHistory[identity.displayName]=base;
  const boost=sponsorFinancialEffect(type);
  finance.wealth=clamp((finance.wealth||50)+boost,0,100);
  finance.ambition=clamp((finance.ambition||50)+Math.round(boost*.7),0,100);
  S.clubFinance[base]=finance;
  renameClubReferences(oldDisplay,identity.displayName,base);
  changes.push({
   base,
   oldDisplay,
   newDisplay:identity.displayName,
   type,
   boost
  });
 }
 if(changes.length){
  const c=pick(changes);
  const typeText=c.type==="global"?"międzynarodowy gigant":c.type==="national"?"duża polska marka":c.type==="humorous"?"nietypowa lokalna firma":"lokalny sponsor";
  addHistory("Nowy sponsor tytularny",`${c.oldDisplay} zmienia nazwę na ${c.newDisplay}. Do klubu wchodzi ${typeText}; budżet i ambicje rosną.`);
 }
 return changes;
}
function normalizeClubName(name){
 const base=clubBaseName(name);
 return clubDisplayName(base);
}

function ensureClubFinance(){
 if(!S.clubFinance)S.clubFinance={};
 for(const league of LEAGUES){
  for(const [rawName,strength] of league.teams){
   const name=clubBaseName(rawName);
   if(!S.clubFinance[name]){
    const level=league.level;
    S.clubFinance[name]={
     wealth:clamp((4-level)*22+(strength-leagueBaseline(league.name))*.7+rand(-8,8),18,88),
     trend:rand(-4,4),
     ambition:rand(35,75),
     specialUntil:null,
     specialType:null
    };
   }
  }
 }
}
function updateClubFinances(){
 ensureClubFinance();
 ensureClubIdentity();
 for(const [name,f] of Object.entries(S.clubFinance)){
  f.wealth=clamp(f.wealth+f.trend*.35+rand(-4,4),8,98);
  f.trend=clamp(f.trend+rand(-2,2),-8,8);
  f.ambition=clamp(f.ambition+rand(-5,5),20,95);
  if(f.specialUntil && S.year>f.specialUntil){f.specialUntil=null;f.specialType=null}
  const roll=Math.random()*100;
  if(!f.specialUntil&&roll<1.5){
   f.specialUntil=S.year+rand(1,3);f.specialType="inwestor";
   f.wealth=clamp(f.wealth+rand(18,32),0,100);f.ambition=clamp(f.ambition+20,0,100);
  }else if(!f.specialUntil&&roll>98.8){
   f.specialUntil=S.year+rand(1,2);f.specialType="kryzys";
   f.wealth=clamp(f.wealth-rand(15,28),0,100);
  }
 }
 maybeChangeTitleSponsors();
}
function clubOfferSalary(club,leagueName,role,pph,{stay=false,special=false}={}){
 ensureClubFinance();
 const level=leagueByName(leagueName)?.level||3;
 const range=leagueFinancialRange(level);
 const financeKey=clubBaseName(club);
 const f=S.clubFinance[financeKey]||S.clubFinance[club]||{wealth:50,ambition:50,specialType:null};
 const roleFactor=role.includes("Podstawowy")?1.1:role.includes("Rotacja")?.96:.88;
 let youthRoleFactor=1;
 if(S.age<=18){
  youthRoleFactor=role.includes("Rezerwowy")?.58:role.includes("junior")?.68:role.includes("Rotacja")?.74:.82;
 }else if(S.age<=21){
  youthRoleFactor=role.includes("Rezerwowy")?.72:role.includes("junior")?.80:.90;
 }
 const perfFactor=clamp(.78+(overall()-60)*.012+(pph-1.2)*.14+(S.reputation-30)*.0025,.68,1.45);
 const financeFactor=clamp(.82+(f.wealth-45)*.005+(f.ambition-50)*.002,.72,1.25);
 let amount=((range.min+range.max)/2)*roleFactor*youthRoleFactor*perfFactor*financeFactor*.90;
 if(stay)amount*=.98;
 if(f.specialType==="inwestor"||special)amount*=rand(118,138)/100;
 if(f.specialType==="kryzys")amount*=.78;
 const floorFactor=S.age<=18?.34:S.age<=21?.48:.72;
 return Math.round(clamp(amount,range.min*floorFactor,range.max*(f.specialType==="inwestor"?1.45:1.12))/50)*50;
}
function preparationMultiplier(){
 if(S.age<=16)return rand(8,18);
 if(S.age<=18)return rand(15,30);
 if(S.age<=21)return rand(25,48);
 if(S.age<=26)return rand(65,95);
 if(S.age<=33)return rand(85,115);
 return rand(65,105);
}
function preparationMoney(salary,club,leagueName,role,{transfer=false}={}){
 ensureClubFinance();
 const financeKey=clubBaseName(club);
 const f=S.clubFinance[financeKey]||S.clubFinance[club]||{wealth:50,specialType:null};
 let mult=preparationMultiplier();
 if(role.includes("Podstawowy"))mult*=1.08;
 if(transfer)mult*=1.08;
 mult*=clamp(.85+(f.wealth-45)*.004,.75,1.2);
 if(f.specialType==="inwestor")mult*=1.2;
 return Math.round(salary*mult*.92/1000)*1000;
}
function financialTag(club){
 const f=S.clubFinance?.[clubBaseName(club)]||S.clubFinance?.[club];
 if(!f)return "";
 if(f.specialType==="inwestor")return " • NOWY INWESTOR / PROJEKT ALL-IN";
 if(f.specialType==="kryzys")return " • KRYZYS BUDŻETOWY";
 return "";
}
function competitionArchiveFor(key){
 return (S.careerStats?.competitionArchive||[]).filter(result=>canonicalCompetitionKey(result)===canonicalCompetitionKey({key}));
}
function recentCompetitionWins(key,years=5){
 return competitionArchiveFor(key).filter(result=>result.place===1&&result.year>=S.year-years).length;
}
function competitionCalendarFatigue(key){
 const major=(S.pendingMajorCompetitions||[]).length+(S.pendingTeamCompetitions||[]).length;
 return key==="Speedway Grand Prix"?0:major>=3?2:major>=2?1:0;
}
function isJuniorCompetitionKey(key){return ["MIMP","Srebrny Kask","Brązowy Kask","SGP2"].includes(key)}
function juniorRelativeBonus(key){
 if(!isJuniorCompetitionKey(key)||S.age>21)return 0;
 const ageBonus=Math.max(0,21-S.age)*1.7;
 const giftBonus=((careerDNA().juniorGift||1)-1)*28;
 const progressBonus=clamp((overall()-(42+(S.age-15)*3))*1.15,-5,12);
 return ageBonus+giftBonus+progressBonus;
}
function simulateSGP2Cycle(basePph){
 const key="SGP2",cfg=COMPETITION_LEVELS[key],playerPower=competitionPower(basePph,key);
 const riders=Array.from({length:16},(_,index)=>({id:index===0?"player":`r${index}`,name:cycleRiderName(index,key),rating:index===0?playerPower:competitionRivalRating(key,index-1),total:0,wins:0,rounds:[]}));
 for(let round=1;round<=3;round++){
  for(const rider of riders){const points=simulateFiveRideScore(rider.rating+rand(-5,5),cfg.mean);rider.total+=points;if(points>=13)rider.wins++;rider.rounds.push({round,points})}
 }
 return {riders,standings:rankStandings(riders),player:riders[0]};
}
function simulateSGP2(basePph){
 const cycle=simulateSGP2Cycle(basePph),player=cycle.player,place=standingPlace(cycle.riders),scores=player.rounds.map(r=>r.points);
 const result=medalResult(place,"mistrz świata juniorów",p=>`${p}. miejsce i medal SGP2`,p=>`${p}. miejsce w SGP2`);
 awardCompetitionResult("SGP2",place,player.total);addHistory("SGP2",`${result}. 3 rundy: ${scores.join(" + ")} = ${player.total} pkt.`);
 return {name:"Indywidualne Mistrzostwa Świata Juniorów — SGP2",key:"SGP2",stage:"3 rundy",result,points:player.total,place,details:scores};
}


function ensureFormState(){
 S.formState??={seasonYear:null,seasonModifier:0,seasonLabel:"neutralna",days:{}};
 if(S.formState.seasonYear!==S.year){
  const roll=Math.random();
  let modifier=0,label="neutralna";
  if(roll<.04){modifier=rand(4,7);label="wybitna"}
  else if(roll<.14){modifier=rand(2,4);label="bardzo dobra"}
  else if(roll<.34){modifier=rand(1,2);label="dobra"}
  else if(roll<.70){modifier=rand(-1,1);label="neutralna"}
  else if(roll<.88){modifier=rand(-3,-1);label="słaba"}
  else if(roll<.97){modifier=rand(-5,-3);label="bardzo słaba"}
  else{modifier=rand(-7,-5);label="fatalna"}
  S.formState={seasonYear:S.year,seasonModifier:modifier,seasonLabel:label,days:{}};
 }
 S.formState.days??={};
 return S.formState;
}
function seasonalFormModifier(){
 return ensureFormState().seasonModifier||0;
}
function drawDayForm(context="event"){
 const roll=Math.random();
 if(roll<.025)return {context,modifier:rand(8,11),label:"dzień konia"};
 if(roll<.095)return {context,modifier:rand(4,7),label:"świetny dzień"};
 if(roll<.25)return {context,modifier:rand(2,3),label:"dobry dzień"};
 if(roll<.72)return {context,modifier:rand(-1,1),label:"normalny dzień"};
 if(roll<.90)return {context,modifier:rand(-4,-2),label:"słaby dzień"};
 if(roll<.98)return {context,modifier:rand(-7,-5),label:"bardzo słaby dzień"};
 return {context,modifier:rand(-10,-8),label:"kompletnie nie twój dzień"};
}
function ensureDayForm(context="event",token=null){
 const fs=ensureFormState(),id=token||`${S.year}:${context}`;
 if(!fs.days[id])fs.days[id]=drawDayForm(context);
 return fs.days[id];
}
function dayFormMessage(context="event",token=null){
 const d=ensureDayForm(context,token);
 if(d.modifier>=8)return ` <b>DZIEŃ KONIA:</b> Od pierwszego biegu wszystko ci siedzi. Starty, motocykl i czucie toru są dziś wyraźnie lepsze niż zwykle.`;
 if(d.modifier>=4)return " Masz dziś bardzo dobre czucie motocykla i toru.";
 if(d.modifier<=-8)return " Od początku nic nie układa się po twojej myśli — to wyjątkowo trudny dzień.";
 if(d.modifier<=-5)return " Masz dziś wyraźny problem z tempem i ustawieniami.";
 return "";
}
function raceRating({context="race",token=null,includeDay=true,extra=0}={}){
 const season=seasonalFormModifier();
 const day=includeDay?ensureDayForm(context,token).modifier:0;
 const form=currentFormRating();
 const rating=
  overall()*.82+
  form*.06+
  S.equipment*.035+
  S.skills.mental*.025+
  S.skills.setup*.02+
  season*.70+
  day*.90+
  extra;
 return clamp(rating,45,99);
}

function competitionPower(basePph,key,{includeDay=true,token=null,extra=0}={}){
 const level=leagueByName(S.league)?.level||3;
 const leagueBonus=level===1?1.5:level===2?.5:-.5;
 const avgBonus=clamp((Number(basePph||1.3)-1.55)*2.2,-2.5,2.5);
 const domesticEliteKeys=new Set(["IMP","Złoty Kask","Memoriał Jancarza","Memoriał Smoczyka","Kryterium Asów","SEC"]);
 const sustainedElite=domesticEliteKeys.has(key)?clamp((overall()-84)*.20,0,1.8):0;
 return clamp(raceRating({
  context:`competition:${key}`,
  token:token||`${S.year}:${key}`,
  includeDay,
  extra:leagueBonus+avgBonus+sustainedElite+extra
 }),50,98);
}
function competitionRivalRating(key,seed=0){
 if(COMPETITION_FIELD_PROFILES[competitionProfileKey(key)])return drawCompetitionRating(key);
 const cfg=COMPETITION_LEVELS[key]||{mean:80,spread:7};
 const tier=Math.floor(seed/3);
 return clamp(Math.round(cfg.mean+rand(-cfg.spread,cfg.spread)-tier*.6),55,97);
}
function healthRetirementChance(age=S.age){
 if(age<37)return 0;
 const injuryHistory=S.careerStats?.injuries||0;
 const base=(age-36)*1.4+injuryHistory*1.8+S.injuryRisk*.18+(50-S.skills.fitness)*.12;
 return clamp(base,0,68);
}
function careerDecline(){
 ensureHealthStats();
 const dna=careerDNA(),phase=careerPhaseState(),age=S.age,peak=dna.peakAge||31,after=age-peak;
 if(after<=1&&phase.type!=="slump")return;
 const physical=["starts","distance","fitness","overtaking"],technical=["corner","technique","setup","mental"];
 const plateau=Math.max(3,Math.min(7,dna.peakWidth||5)),beyond=Math.max(0,after-plateau);
 const healthBurden=Math.min(2,Math.floor((S.healthStats.seriousInjuries||0)/2));
 let pa=0,ta=0;
 if(after>1&&after<=plateau){pa=Math.random()<(dna.exceptionalLongevity?.14:.28)?1:0}
 else if(beyond>0){pa=beyond<=2?1:beyond<=5?2:3;ta=beyond<=3?0:beyond<=6?1:2}
 if(age>=38&&beyond>0&&Math.random()<.48)pa+=1;
 if(age>=41){pa+=1;ta+=Math.random()<.55?1:0}
 if(age>=44){pa+=1;ta+=1}
 pa+=healthBurden;
 if(phase.type==="slump"){pa+=1;ta+=Math.random()<.58?1:0}
 if(phase.type==="stagnation"&&Math.random()<.28)pa+=1;
 if(["breakthrough","secondWind"].includes(phase.type)){pa=Math.max(0,pa-1);ta=Math.max(0,ta-1)}
 if(dna.exceptionalLongevity){pa=Math.max(0,pa-1);ta=Math.max(0,ta-1)}
 const recoveryProtection=facilityLevel("recovery")>=3?1:0;
 let protection=clamp(Math.floor((S.professionalism+S.skills.fitness+dna.durability*22)/152),0,1)+recoveryProtection;
 if(age>=40)protection=Math.min(protection,1);
 pa=Math.max(age>=43&&beyond>0?1:0,pa-protection);
 for(let i=0;i<pa;i++){const key=pick(physical.filter(k=>S.skills[k]>42));if(key)S.skills[key]-=1}
 for(let i=0;i<ta;i++){const key=pick(technical.filter(k=>S.skills[k]>45));if(key&&Math.random()<.72)S.skills[key]-=1}
 if(phase.type==="slump"&&Math.random()<.55){const key=pick(Object.keys(S.skills).filter(k=>S.skills[k]>48));if(key)S.skills[key]-=1}
 if(age>=40&&Math.random()<.38)S.equipment=Math.max(40,S.equipment-1);
 if(age>=42)S.devPoints=Math.max(0,S.devPoints-Math.min(S.devPoints,Math.max(1,Math.floor((age-39)/2))));
 if(pa+ta>0){S.injuryRisk+=age>=40?2:1;if(after===plateau+1||age===40)addHistory("Schodzenie ze szczytu","Utrzymanie najwyższego poziomu staje się coraz trudniejsze. Doświadczenie nadal pomaga, ale forma fizyczna zaczyna naturalnie spadać.")}
}
function generatedRider(level,seed=0,leagueName=S.league){
 const first=RIDER_FIRST_NAMES[(rand(0,RIDER_FIRST_NAMES.length-1)+seed)%RIDER_FIRST_NAMES.length];
 const last=RIDER_LAST_NAMES[(rand(0,RIDER_LAST_NAMES.length-1)+seed*3)%RIDER_LAST_NAMES.length];
 const teamStrength=typeof level==="number"?level:leagueBaseline(leagueName);
 return {name:`${first} ${last}`,rating:leagueRiderRating(leagueName,teamStrength,seed)};
}

function skillAverage(){
 return Object.values(S.skills).reduce((a,b)=>a+b,0)/Object.keys(S.skills).length;
}
function overall(){
 // OVR opisuje klasę sportową, a nie chwilowy nastrój.
 // 94% stanowią umiejętności jazdy, 6% jakość sprzętu.
 return Math.round(skillAverage()*.94+S.equipment*.06);
}
function currentFormRating(){
 // Forma jest osobnym wskaźnikiem używanym w symulacji sezonu.
 return clamp(Math.round(overall()*.82+S.morale*.10+S.professionalism*.05+S.skills.mental*.03),20,99);
}
function leagueByName(n){return LEAGUES.find(l=>l.name===n)}
function leagueBaseline(leagueName){
 const level=leagueByName(leagueName)?.level||3;
 return level===1?80:level===2?69:58;
}

function rosterStatusForAge(age=S.age){
 if(age<=21)return "junior";
 if(age<=24)return "u24";
 return "senior";
}
function statusTransitionPenalty(age=S.age){
 // 22 lata: koniec ochrony juniorskiej. 25 lat: koniec pozycji U24.
 if(age===22)return 7;
 if(age===25)return 6;
 return 0;
}
function statusTransitionLabel(age=S.age){
 if(age===22)return "Pierwszy sezon jako U24";
 if(age===25)return "Pierwszy sezon jako pełnoprawny senior";
 return "";
}
function exceptionalRetentionScore(){
 const dna=careerDNA();
 const avg=Number(S.season?.avg||0);
 const rep=S.reputation||0;
 const form=currentFormRating();
 const potential=dna.potential||80;
 return overall()*.52+avg*8+form*.18+rep*.06+(potential>=91?5:potential>=87?2:0);
}
function statusTransitionLeaguePressure(leagueName,age=S.age){
 const level=leagueByName(leagueName)?.level||3;
 const penalty=statusTransitionPenalty(age);
 if(!penalty)return 0;
 // Najbardziej brutalna selekcja jest w PGE, trochę mniejsza w M2E.
 return penalty*(level===1?1:level===2?.62:.25);
}
function statusTransitionMarketBias(leagueName,age=S.age){
 const level=leagueByName(leagueName)?.level||3;
 const transition=statusTransitionPenalty(age);
 if(!transition)return 0;
 const retention=exceptionalRetentionScore();
 // Talent + bardzo dobry sezon może całkowicie wyzerować karę.
 const exceptionalRelief=retention>=78?transition:retention>=72?transition*.55:retention>=68?transition*.25:0;
 const raw=Math.max(0,transition-exceptionalRelief);
 return raw*(level===1?1:level===2?.60:.22);
}


function clubRequiredOverall(club,leagueName){
 const teamStrength=teamData(club)?.strength||leagueBaseline(leagueName);
 const baseline=leagueBaseline(leagueName);
 let required=baseline+(teamStrength-baseline)*.42;
 const level=leagueByName(leagueName)?.level||3;
 const status=rosterStatusForAge();
 // Junior i U24 mają nieco łatwiejszą ścieżkę do składu.
 if(status==="junior")required-=level===1?4:level===2?3:2;
 else if(status==="u24")required-=level===1?2.5:level===2?1.5:.8;
 // W pierwszym sezonie po zmianie statusu klub ocenia zawodnika bardziej surowo.
 required+=statusTransitionLeaguePressure(leagueName);
 return required;
}
function stableTextHash(text){
 let hash=2166136261;
 for(let i=0;i<text.length;i++){hash^=text.charCodeAt(i);hash=Math.imul(hash,16777619)}
 return hash>>>0;
}
function seededRange(seed,min,max){
 const value=(stableTextHash(seed)%10001)/10000;
 return min+(max-min)*value;
}
function averageRidingSkill(){
 return Object.values(S.skills).reduce((sum,value)=>sum+value,0)/Object.keys(S.skills).length;
}
function clubOpportunityProfile(club,leagueName){
 const base=clubBaseName(club),year=S.year||2026,seed=`${base}|${year}|${leagueName}`;
 const squadCompetition=Math.round(seededRange(seed+"|squad",-7,7));
 const vacancy=Math.round(seededRange(seed+"|vacancy",-5,8));
 const youthPolicy=seededRange(seed+"|youth",-1,1);
 const stability=Math.round(seededRange(seed+"|stability",-3,3));
 const profile=trackProfileForClub(club);
 let trackFit=0;
 if(profile&&S.skills[profile.skill]!==undefined)trackFit=clamp((S.skills[profile.skill]-averageRidingSkill())*.22,-4,4);
 let agePolicy=0;
 if(S.age<=21)agePolicy=youthPolicy>.35?4:youthPolicy<-.45?-3:0;
 else if(S.age>=33)agePolicy=youthPolicy>.45?-3:youthPolicy<-.4?3:0;
 const total=clamp(Math.round(squadCompetition+vacancy+stability+trackFit+agePolicy),-12,12);
 const label=total>=8?"wolne miejsce i dobre dopasowanie":
  total>=4?"korzystna sytuacja kadrowa":
  total<=-8?"bardzo mocna konkurencja":
  total<=-4?"mocna konkurencja w składzie":
  "standardowa rywalizacja o skład";
 return {total,label};
}
function clubOpportunityTag(club,leagueName){return clubOpportunityProfile(club,leagueName).label}

function projectedLineupChance(club,leagueName,{stay=false,role="",form=null}={}){
 const required=clubRequiredOverall(club,leagueName);
 const level=leagueByName(leagueName)?.level||3;
 const roleBonus=role.includes("Regularna jazda")?10:role.includes("Podstawowy")?9:role.includes("Rotacja")?3:role.includes("rezerw")?-11:role.includes("Walka")?-2:0;
 const relationBonus=stay?((S.clubRelation-50)*.12+(S.loyalty-50)*.06):0;
 const reputationBonus=(S.reputation-35)*.05;
 const ageBonus=S.age<=21?3:S.age>=45?-12:S.age>=42?-7:S.age>=39?-3:0;
 const formValue=form===null?currentFormRating():form;
 const formBonus=(formValue-overall())*.45;
 const recentAverage=Number(S.season?.avg)||0;
 const recentFormBonus=S.season?.heats?clamp((recentAverage-1.45)*11,-10,12):0;
 const ageLeaguePenalty=S.age>=30&&overall()<required?Math.min(12,(S.age-29)*.7):0;
 const opportunity=clubOpportunityProfile(club,leagueName).total;
 const raw=46+(overall()-required)*3.55+roleBonus+relationBonus+reputationBonus+ageBonus+formBonus+recentFormBonus-ageLeaguePenalty+opportunity;
 const transitionPenalty=statusTransitionMarketBias(leagueName);
 return clamp(raw,5,96);
}
function lineupChanceText(value){
 return `${value.toFixed(1).replace(".",",")}%`;
}
function teamData(name){
 const base=clubBaseName(name);
 for(const l of LEAGUES){
  const t=l.teams.find(x=>clubBaseName(x[0])===base);
  if(t)return {league:l,name:clubDisplayName(t[0]),canonicalName:t[0],strength:t[1]}
 }
 const e=EXPANSION_CLUBS.find(x=>clubBaseName(x.name)===base);
 return e?{league:null,name:e.name,canonicalName:e.name,strength:e.strength}:null
}
function addHistory(title,text){
 S.history.unshift({year:S.year,age:S.age,title:capitalizeFirstText(title),text:ensureSentence(text)});
}
function repairLegacyBalance(){
 if(S.balanceModelVersion>=3)return;
 const careerSeasons=Math.max(0,(S.year||2026)-2026);
 const totalPoints=S.totals?.points||0;
 const totalMatches=S.totals?.matches||0;
 const performanceBase=totalMatches?Math.min(28,totalPoints/Math.max(1,totalMatches)*1.7):0;
 if(!Number.isFinite(S.reputation)||S.reputation<=2){
  S.reputation=clamp(Math.round(8+careerSeasons*1.4+performanceBase+(overall()-50)*.45),8,72);
 }
 if(!Number.isFinite(S.morale)||S.morale<=5){
  S.morale=clamp(Math.round(48+(S.professionalism-50)*.12+(overall()-55)*.18),35,70);
 }
 if(!Number.isFinite(S.clubRelation)||S.clubRelation<=5)S.clubRelation=45;
 S.balanceModelVersion=2;
}
function difficultyGrowthMultiplier(){
 return S?.difficulty==="easy"?1.18:S?.difficulty==="hard"?.86:1;
}
function difficultyInjuryMultiplier(){
 return (S?.difficulty==="easy"?.78:S?.difficulty==="hard"?1.24:1)*injuryDnaMultiplier();
}
function difficultyClubTolerance(){
 return S?.difficulty==="easy"?6:S?.difficulty==="hard"?-7:0;
}

function normalize(){
 restoreWorld();
 Object.keys(S.skills).forEach(k=>S.skills[k]=clamp(S.skills[k],20,99));
 ["professionalism","loyalty","media","clubRelation","chance"].forEach(k=>S[k]=clamp(S[k]));
 S.equipment=clamp(S.equipment,20,99);
 // Obie wartości mogą spaść do zera. Mechanizmy sezonowe pozwalają je później odbudować.
 S.reputation=clamp(S.reputation,0,100);
 S.morale=clamp(S.morale,0,100);
 S.injuryRisk=clamp(S.injuryRisk,2,70);S.budget=Math.round(Number(S.budget)||0);S.salary=Math.max(100,S.salary||0);
 if(!S.nextRandomEventYear)S.nextRandomEventYear=S.year+rand(1,3);
 if(!S.competitions)S.competitions=[];
 if(!S.breakthroughRewards)S.breakthroughRewards={year:S.year,counts:{}};
 if(S.majorSeriesCalendar&&S.majorSeriesCalendar.year!==S.year)S.majorSeriesCalendar=null;
 if(!S.tableLeague)S.tableLeague=S.league;
 if(!S.tableClub)S.tableClub=S.club;
 if(!S.tableAudit)S.tableAudit={smallBalance:0,leaguePoints:0,expectedPoints:0};
 if(!S.playoffSummary)S.playoffSummary=[];
 if(!S.worldLeagues){S.worldLeagues=snapshotWorld();syncWorld()}
 if(!S.nextWorldEventYear)S.nextWorldEventYear=S.year+rand(2,4);
 if(!S.academyClub&&S.club==="Szkółka regionalna")S.academyClub="Cellfast Wilki Krosno";
 if(!S.clubMeta)S.clubMeta={};
 if(!S.facilities)S.facilities={technical:0,training:0,recovery:0,operations:0};
 if(S.facilities.technical===undefined)S.facilities.technical=Math.max(S.facilities.workshop||0,S.facilities.engineBase||0);
 if(S.facilities.training===undefined)S.facilities.training=Math.max(S.facilities.trainingBase||0,S.facilities.analytics||0);
 if(S.facilities.operations===undefined)S.facilities.operations=Math.max(S.facilities.transport||0,S.facilities.sponsorOffice||0);
 if(S.facilities.recovery===undefined)S.facilities.recovery=0;
 if(!S.careerStats)S.careerStats={injuries:0,bestOverall:overall(),bestSeason:null,clubs:{},titles:[],careerEnded:false,seasons:[],competitionArchive:[]};
 if(!S.careerStats.seasons)S.careerStats.seasons=[];
 if(!S.careerStats.competitionArchive)S.careerStats.competitionArchive=[];
 if(!S.eventMemory)S.eventMemory={seen:{},lastYear:{}};
 if(!S.rivalConflicts)S.rivalConflicts=0;
 if(!S.careerDNA)S.careerDNA=createCareerDNA(S.startProfile||"academy");
 careerDNA();
 if(!S.eventSkillGrowth)S.eventSkillGrowth={career:{},seasonYear:S.year,season:{}};
 if(!S.preLicenseBackground)S.preLicenseBackground={id:"legacy",title:"Dotychczasowa ścieżka",text:"Kariera rozpoczęta w starszej wersji gry — historia sprzed licencji nie była wtedy zapisywana."};
 if(S.club&&S.club!=="Szkółka regionalna")S.club=canonicalClubName(S.club);
 if(S.academyClub)S.academyClub=canonicalClubName(S.academyClub);
 if(S.tableClub&&S.tableClub!=="Szkółka regionalna")S.tableClub=canonicalClubName(S.tableClub);
 if(S.loanParentClub)S.loanParentClub=canonicalClubName(S.loanParentClub);
 if(!S.teamCaps)S.teamCaps=0;
 if(!S.clubIdentity)S.clubIdentity={};
 if(!S.clubNameHistory)S.clubNameHistory={};
 if(!S.clubNameArchive)S.clubNameArchive={};
 if(!S.worldLeagueArchive)S.worldLeagueArchive={};
 if(S.table?.length&&S.tableSeasonYear===undefined)S.tableSeasonYear=Math.max(2026,S.year-1);
 if(!S.nationalMedals)S.nationalMedals=0;
 if(!S.lastNationalCapYear)S.lastNationalCapYear=0;
 if(S.difficulty==="story")S.difficulty="easy";
 ensureClubFinance();
 for(const league of LEAGUES){
  for(const [name] of league.teams){
   if(!S.clubMeta[name])S.clubMeta[name]={level:league.level,lastLevel:league.level,promotedYear:null,relegatedYear:null,consecutivePromotions:0};
  }
 }
 if(S.contractYears===undefined)S.contractYears=0;
}
const START_PROFILES={
 raw:{age:15,base:39,budget:7000,equipment:36,reputation:2,morale:68,chance:12,role:"Adept od podstaw"},
 academy:{age:15,base:44,budget:12000,equipment:42,reputation:5,morale:70,chance:20,role:"Adept szkółki"},
 license:{age:16,base:50,budget:18000,equipment:46,reputation:7,morale:72,chance:26,role:"Licencjonowany junior"},
 talent:{age:16,base:57,budget:26000,equipment:50,reputation:12,morale:74,chance:34,role:"Talent szkółki"},
 reserve:{age:17,base:53,budget:23000,equipment:48,reputation:8,morale:71,chance:42,role:"Rezerwowy junior"}
};
const PRE_LICENSE_BACKGROUNDS=[
 {id:"newcomer",weight:16,profiles:["raw","academy"],delta:[-2,0],title:"Późny początek",text:"Jeszcze niedawno żużel oglądałeś głównie z trybun. Do szkółki zapisałeś się dopiero jako nastolatek i w ciągu kilkunastu miesięcy przekonałeś trenerów, że warto dać ci szansę.",skill:{mental:1},other:{}},
 {id:"clubKid",weight:19,profiles:["raw","academy","license","talent"],delta:[0,2],title:"Wychowanek od najmłodszych lat",text:"Od dzieciaka kręciłeś się przy klubie. Przeszedłeś kolejne grupy szkółki i zanim przyszła pora na licencję, miałeś za sobą kilka lat regularnych treningów.",skill:{technique:1,corner:1},other:{loyalty:4,professionalism:1}},
 {id:"allCategories",weight:12,profiles:["academy","license","talent"],delta:[1,2],title:"Adept wszystkich kategorii",text:"Zaczynałeś bardzo wcześnie i systematycznie przechodziłeś przez kolejne etapy szkolenia. Nie byłeś największą gwiazdą rocznika, ale trenerzy cenili regularność i techniczne podstawy.",skill:{technique:2,setup:1},other:{professionalism:2}},
 {id:"regional500",weight:13,profiles:["academy","license","talent","reserve"],delta:[1,3],title:"Czołówka 500R w regionie",text:"Pierwsze sukcesy odnosiłeś na mniejszych motocyklach. W zawodach 500R regularnie walczyłeś o podium na szczeblu regionalnym.",skill:{starts:2,corner:1},other:{reputation:1}},
 {id:"national500",weight:5,profiles:["license","talent","reserve"],delta:[2,4],title:"Medalista krajowych turniejów 500R",text:"Przed licencją zdążyłeś zaznaczyć swoją obecność w krajowych turniejach 500R. Masz medale, kilka zwycięstw i opinię jednego z ciekawszych zawodników swojego rocznika.",skill:{starts:2,corner:2,mental:1},other:{reputation:3,media:2}},
 {id:"mechanicFamily",weight:10,profiles:["raw","academy","license","talent","reserve"],delta:[0,2],title:"Dziecko parku maszyn",text:"Ktoś z najbliższej rodziny od lat pracuje przy żużlu. Zanim zacząłeś ścigać się na poważnie, potrafiłeś już rozmawiać o przełożeniach, sprzęgle i ustawieniach motocykla.",skill:{setup:3,technique:1},other:{equipment:2}},
 {id:"grandson",weight:6,profiles:["academy","license","talent","reserve"],delta:[0,2],title:"Żużlowe nazwisko w rodzinie",text:"Twój dziadek przed laty ścigał się ligowo. Starsi kibice kojarzą nazwisko, ale na torze i tak musisz zapracować na własną historię.",skill:{mental:1},other:{reputation:2,media:2}},
 {id:"motocross",weight:7,profiles:["raw","academy","license","talent"],delta:[0,2],title:"Przesiadka z motocrossu",text:"Zanim trafiłeś na owal, jeździłeś w motocrossie. Masz dobre czucie motocykla i kondycję, ale start spod taśmy nadal wymaga pracy.",skill:{distance:2,overtaking:2,fitness:2,starts:-1},other:{injuryRisk:1}},
 {id:"return",weight:7,profiles:["raw","academy","license"],delta:[-1,2],title:"Powrót po kilku latach",text:"Trenowałeś jako dzieciak, później odpuściłeś żużel, a teraz wróciłeś do szkółki. Część nawyków została, ale musisz odzyskać rytm.",skill:{technique:1,mental:1},other:{morale:2},dna:{lateBloomBias:.12}},
 {id:"naturalSpark",weight:4,profiles:["academy","license","talent"],delta:[2,4],title:"Samorodny talent",text:"Już po kilku miesiącach trenerzy zauważyli, że pewnych rzeczy uczysz się znacznie szybciej od rówieśników. Na razie to tylko obietnica, nie gotowa kariera.",skill:{corner:1,distance:2,technique:2},other:{reputation:2},dna:{potentialBonus:1,juniorGiftFloor:1.08}},
 {id:"schoolPhenomenon",weight:1,profiles:["talent","reserve"],delta:[3,5],title:"Fenomen szkółki",text:"Przed egzaminem licencyjnym byłeś jednym z najgłośniejszych nazwisk młodzieżowego szkolenia. Wygrywałeś ogólnopolskie turnieje i pojawiały się pierwsze porównania do najlepszych juniorów poprzednich roczników.",skill:{starts:2,corner:2,distance:1,mental:1},other:{reputation:4,media:3},dna:{potentialBonus:2,juniorGiftFloor:1.20}}
,
 {id:"pitbike",weight:8,profiles:["raw","academy","license","talent"],delta:[0,2],title:"Przesiadka z pit bike’ów",text:"Zanim trafiłeś na klasyczny tor żużlowy, dużo jeździłeś na pit bike’ach. Masz obycie z motocyklem, odwagę w kontakcie i dobre czucie pierwszego łuku.",skill:{corner:2,technique:2,overtaking:1},other:{}},
 {id:"pitbikeChamp",weight:3,profiles:["academy","license","talent"],delta:[1,3],title:"Mocny zawodnik pit bike",text:"Na pit bike’ach nie jeździłeś tylko rekreacyjnie — regularnie walczyłeś o czołowe miejsca. Przejście na żużel wymaga nauki, ale masz mocne motocyklowe podstawy.",skill:{starts:1,corner:2,technique:2,overtaking:2},other:{reputation:1}}];
function weightedPick(items){const total=items.reduce((s,i)=>s+(i.weight||1),0);let r=Math.random()*total;for(const item of items){r-=item.weight||1;if(r<=0)return item}return items[items.length-1]}

const PRE_LICENSE_SUPPORT=[
 {id:"modest",weight:18,title:"Skromny początek",budget:[25000,65000],allowed:bg=>true,effect:{}},
 {id:"localSponsor",weight:16,title:"Lokalny przedsiębiorca uwierzył w ciebie",budget:[80000,180000],allowed:bg=>true,effect:{media:2}},
 {id:"pitSponsor",weight:6,title:"Majętny sponsor wspiera cię od czasów pit bike’ów",budget:[180000,350000],allowed:bg=>["pitbike","pitbikeChamp"].includes(bg.id),effect:{equipment:6,media:3}},
 {id:"wealthyFamily",weight:8,title:"Zamożna rodzina finansuje początek kariery",budget:[280000,520000],allowed:bg=>true,effect:{}},
 {id:"familyWorkshop",weight:10,title:"Rodzinny warsztat jest już do dyspozycji",budget:[70000,150000],allowed:bg=>["mechanicFamily","grandson"].includes(bg.id),effect:{technical:1,setup:2}},
 {id:"oldTeamGear",weight:7,title:"W garażu zostało wyposażenie po dawnym teamie rodzinnym",budget:[60000,140000],allowed:bg=>["mechanicFamily","grandson"].includes(bg.id),effect:{equipment:8,technical:1}},
 {id:"technicalSponsor",weight:10,title:"Sponsor techniczny zapewnia dobry sprzęt",budget:[45000,110000],allowed:bg=>true,effect:{equipment:11}},
 {id:"clubInvestment",weight:8,title:"Klub mocno inwestuje w twój rozwój",budget:[40000,100000],allowed:bg=>["clubKid","allCategories","regional500","national500","naturalSpark","schoolPhenomenon"].includes(bg.id),effect:{professionalism:3}},
 {id:"municipal",weight:8,title:"Otrzymujesz stypendium miasta lub gminy",budget:[70000,140000],allowed:bg=>true,effect:{professionalism:2}},
 {id:"usedEngine",weight:9,title:"Dostajesz dobry silnik po starszym zawodniku",budget:[35000,90000],allowed:bg=>true,effect:{equipment:8}}
];
function drawPreLicenseSupport(background){
 const pool=PRE_LICENSE_SUPPORT.filter(s=>s.allowed(background));
 return weightedPick(pool.map(s=>({...s,weight:s.weight||1})));
}
function applyPreLicenseSupport(support){
 if(!support)return;
 S.preLicenseSupport={id:support.id,title:support.title};
 S.budget=rand(support.budget[0],support.budget[1]);
 const e=support.effect||{};
 if(e.media)S.media+=e.media;if(e.equipment)S.equipment+=e.equipment;if(e.professionalism)S.professionalism+=e.professionalism;if(e.setup)S.skills.setup+=e.setup;
 if(e.technical)S.facilities.technical=Math.max(S.facilities.technical||0,e.technical);
}

function drawPreLicenseBackground(profile){const pool=PRE_LICENSE_BACKGROUNDS.filter(bg=>bg.profiles.includes(profile));return weightedPick(pool.length?pool:PRE_LICENSE_BACKGROUNDS)}
function applyPreLicenseBackground(bg){
 if(!bg)return;
 for(const [key,value] of Object.entries(bg.skill||{}))S.skills[key]=(S.skills[key]||0)+value;
 for(const [key,value] of Object.entries(bg.other||{}))S[key]=(S[key]||0)+value;
 if(bg.dna){const dna=careerDNA();if(bg.dna.potentialBonus)dna.potential=clamp(dna.potential+bg.dna.potentialBonus,60,99);if(bg.dna.juniorGiftFloor)dna.juniorGift=Math.max(dna.juniorGift||1,bg.dna.juniorGiftFloor);if(bg.dna.lateBloomBias&&Math.random()<bg.dna.lateBloomBias){dna.curveType="late";dna.lateBloom=true;dna.earlyPeak=false;dna.peakAge=rand(33,37)}}
}

const POLISH_FIRST_NAMES=["Jakub","Kacper","Maksymilian","Bartosz","Mateusz","Szymon","Wiktor","Oskar","Filip","Dawid","Patryk","Mikołaj","Antoni","Marcel","Hubert","Igor","Karol","Piotr","Michał","Dominik"];
const POLISH_LAST_NAMES=["Nowak","Kowalski","Wójcik","Kaczmarek","Mazur","Król","Zieliński","Sikora","Bąk","Pawlak","Dudek","Baran","Lis","Kołodziej","Kubiak","Musiał","Bednarz","Urban","Kurek","Gajda"];
function randomPolishName(){return `${pick(POLISH_FIRST_NAMES)} ${pick(POLISH_LAST_NAMES)}`}
const POPULAR_TWO_DIGIT_NUMBERS=[
 10,11,12,13,14,16,17,18,19,21,22,23,24,27,29,31,33,37,42,44,46,47,
 55,57,66,69,71,72,77,79,81,83,88,89,91,92,93,94,95,96,97,98,99
];
const POPULAR_THREE_DIGIT_NUMBERS=[
 101,111,123,212,222,247,303,313,333,404,444,505,555,606,666,707,
 717,727,747,777,808,818,828,888,909,911,919,929,939,949,959,969,
 979,989,999
];
function randomRiderNumber(){
 const roll=Math.random();
 if(roll<.74)return pick(POPULAR_TWO_DIGIT_NUMBERS);
 if(roll<.96)return pick(POPULAR_THREE_DIGIT_NUMBERS);
 return rand(1,999);
}
function selectedRiderNumber(){
 const raw=String($("riderNumber")?.value||"").trim();
 if(!raw)return randomRiderNumber();
 const number=Number(raw);
 return Number.isInteger(number)&&number>=1&&number<=999?number:randomRiderNumber();
}

function showStartDisclaimer(){
 showModal(
  "WAŻNA INFORMACJA",
  "Zanim rozpoczniesz karierę",
  `<strong>Polish Speedway Simulator jest niezależną, nieoficjalną grą symulacyjną stworzoną dla fanów żużla.</strong><br><br>Gra wykorzystuje elementy rzeczywistego świata sportu żużlowego, jednak przebieg kariery, wyniki, transfery, kontrakty, wydarzenia oraz kolejne sezony są elementami fikcyjnej symulacji.<br><br>Projekt nie jest oficjalnie powiązany z klubami, organizatorami rozgrywek, federacjami ani innymi podmiotami pojawiającymi się w grze.<br><br><strong>Miłej zabawy i powodzenia na żużlowych torach!</strong>`,
  [{title:"ROZUMIEM — ZACZYNAM KARIERĘ",desc:"Przejdź do swojej żużlowej kariery.",action:()=>{closeModal();createPlayer()}}]
 );
}

function createPlayer(){
 const start=$("startPoint").value,profile=START_PROFILES[start]||START_PROFILES.academy;
 const background=drawPreLicenseBackground(start);
 const support=drawPreLicenseSupport(background);
 const age=profile.age,base=profile.base+rand(background.delta[0],background.delta[1]);
 const chosenClub=$("academyClub").value||"Cellfast Wilki Krosno";
 const chosenLeague=clubLeagueName(chosenClub)||"Krajowa Liga Żużlowa";
 const firstClub=start==="reserve"?chosenClub:"Szkółka regionalna";
 S={name:$("name").value.trim(),region:$("region").value,academyClub:chosenClub,archetype:$("archetype").value,difficulty:$("difficulty").value,startProfile:start,showGuidance:$("showGuidance")?.checked!==false,guidanceMemory:{used:[],lastYear:null},
  age,year:2026,number:selectedRiderNumber(),club:firstClub,league:start==="reserve"?chosenLeague:"Etap szkolenia",
  role:start==="reserve"?profile.role:`${profile.role} ${chosenClub}`,national:"—",
  skills:{starts:base+rand(-4,4),corner:base+rand(-4,4),distance:base+rand(-4,4),technique:base+rand(-4,4),fitness:base+rand(-4,4),setup:base+rand(-4,4),mental:base+rand(-4,4),overtaking:base+rand(-4,4)},
  professionalism:start==="talent"?54:50,loyalty:50,media:start==="talent"?13:8,reputation:profile.reputation,morale:profile.morale,equipment:profile.equipment,clubRelation:55,chance:profile.chance,injuryRisk:start==="raw"?14:12,budget:profile.budget,
  salary:start==="reserve"?1700:0,signingFee:0,contractYears:start==="reserve"?drawContractYears({young:true}):0,value:50000,devPoints:0,careerPoints:0,
  season:{matches:0,heats:0,points:0,bonus:0,wins:0,earnings:0,avg:0},history:[],table:[],tableLeague:firstClub==="Szkółka regionalna"?"Etap szkolenia":chosenLeague,tableClub:firstClub,
  finish:null,competitions:[],nextRandomEventYear:2027+rand(0,2),nextWorldEventYear:2028+rand(0,2),worldLeagues:snapshotWorld(),clubMeta:{},facilities:{technical:0,training:0,recovery:0,operations:0},clubFinance:{},careerStats:{injuries:0,bestOverall:0,bestSeason:null,clubs:{},titles:[],careerEnded:false,seasons:[],competitionArchive:[]},eventMemory:{seen:{},lastYear:{}},rivalConflicts:0,teamCaps:0,nationalMedals:0,lastNationalCapYear:0,clubIdentity:{},careerDNA:createCareerDNA(start),preLicenseBackground:{id:background.id,title:background.title,text:background.text},balanceModelVersion:10,v109MetaRepairApplied:true,retired:false,totals:{matches:0,heats:0,points:0,bonus:0,earnings:0}};
 const ar=ARCH[S.archetype];Object.entries(ar.skills).forEach(([k,v])=>S.skills[k]+=v);Object.entries(ar.other).forEach(([k,v])=>S[k]+=v);
 applyPreLicenseBackground(background);
 applyPreLicenseSupport(support);
 if(S.difficulty==="easy"){
  Object.keys(S.skills).forEach(k=>S.skills[k]+=2);
  S.devPoints+=2;S.injuryRisk=Math.max(3,S.injuryRisk-3);S.morale+=4;S.clubRelation+=4;S.budget+=5000;
 }else if(S.difficulty==="hard"){
  Object.keys(S.skills).forEach(k=>S.skills[k]-=1);
  S.injuryRisk+=4;S.morale-=3;S.clubRelation-=4;S.budget=Math.max(0,S.budget-4000);
 }
 if(start==="reserve")S.chance=projectedLineupChance(chosenClub,chosenLeague,{role:"Rezerwowy junior"});
 S.startAge=S.age;S.startOverall=overall();S.careerStats.startOverall=S.startOverall;
 addHistory("Przed licencją",`${background.title}. ${background.text} ${support.title}. Budżet na start: ${money(S.budget)}.`);
 addHistory("Początek kariery",`${S.region} • ${ar.name} • ${S.age} lat • ${profile.role}. Ośrodek: ${S.academyClub}. ${careerDevelopmentHint()}`);
 normalize();save();render();
 const openingReport=guidanceReport({force:true});
 $("newsBox").innerHTML=`<p class="eyebrow">PRZED LICENCJĄ</p><h3>${background.title.toUpperCase()}</h3><p>${background.text}</p><p><b>Zaplecze:</b> ${support.title}. Budżet początkowy: ${money(S.budget)}.</p>${openingReport?`<div class="guidance-report"><span>RAPORT SZKÓŁKI</span><p>${openingReport.text}</p></div>`:""}`;
 save();
}
function save(){localStorage.setItem("pss_v101",JSON.stringify(S))}
function load(){
 try{
  const newest=localStorage.getItem("pss_v101");
  const previousVersion=localStorage.getItem("pss_v100");
  const previousBrand=localStorage.getItem("pzs_v200");
  if(newest)return JSON.parse(newest);
  if(previousVersion){localStorage.setItem("pss_v101",previousVersion); return JSON.parse(previousVersion);}
  if(previousBrand){localStorage.setItem("pss_v101",previousBrand); return JSON.parse(previousBrand);}
  const v1361=localStorage.getItem("pzs_v1361");
  if(v1361)return JSON.parse(v1361);
  const v136=localStorage.getItem("pzs_v136");
  if(v136)return JSON.parse(v136);
  const v135=localStorage.getItem("pzs_v135");
  if(v135)return JSON.parse(v135);
  const v134=localStorage.getItem("pzs_v134");
  if(v134)return JSON.parse(v134);
  const v1331=localStorage.getItem("pzs_v1331");
  if(v1331)return JSON.parse(v1331);
  const v133=localStorage.getItem("pzs_v133");
  if(v133)return JSON.parse(v133);
  const v132=localStorage.getItem("pzs_v132");
  if(v132)return JSON.parse(v132);
  const v131=localStorage.getItem("pzs_v131");
  if(v131)return JSON.parse(v131);
  const v1301=localStorage.getItem("pzs_v1301");
  if(v1301)return JSON.parse(v1301);
  const v130=localStorage.getItem("pzs_v130");
  if(v130)return JSON.parse(v130);
  const v129=localStorage.getItem("pzs_v129");
  if(v129)return JSON.parse(v129);
  const v128=localStorage.getItem("pzs_v128");
  if(v128)return JSON.parse(v128);
  const v127=localStorage.getItem("pzs_v127");
  if(v127)return JSON.parse(v127);
  const v126=localStorage.getItem("pzs_v126");
  if(v126)return JSON.parse(v126);
  const v1252=localStorage.getItem("pzs_v1252");
  if(v1252)return JSON.parse(v1252);
  const v1251=localStorage.getItem("pzs_v1251");
  if(v1251)return JSON.parse(v1251);
  const v125=localStorage.getItem("pzs_v125");
  if(v125)return JSON.parse(v125);
  const v124=localStorage.getItem("pzs_v124");
  if(v124)return JSON.parse(v124);
  const v123=localStorage.getItem("pzs_v123");
  if(v123)return JSON.parse(v123);
  const v122=localStorage.getItem("pzs_v122");
  if(v122)return JSON.parse(v122);
  const v121=localStorage.getItem("pzs_v121");
  if(v121)return JSON.parse(v121);
  const v120=localStorage.getItem("pzs_v120");
  if(v120)return JSON.parse(v120);
  const v119=localStorage.getItem("pzs_v119");
  if(v119)return JSON.parse(v119);
  const v118=localStorage.getItem("pzs_v118");
  if(v118)return JSON.parse(v118);
  const v117=localStorage.getItem("pzs_v117");
  if(v117)return JSON.parse(v117);
  const v116=localStorage.getItem("pzs_v116");
  if(v116)return JSON.parse(v116);
  const v115=localStorage.getItem("pzs_v115");
  if(v115)return JSON.parse(v115);
  const v114=localStorage.getItem("pzs_v114");
  if(v114)return JSON.parse(v114);
  const v113=localStorage.getItem("pzs_v113");
  if(v113)return JSON.parse(v113);
  const v112=localStorage.getItem("pzs_v112");
  if(v112)return JSON.parse(v112);
  const v111=localStorage.getItem("pzs_v111");
  if(v111)return JSON.parse(v111);
  const v110=localStorage.getItem("pzs_v110");
  if(v110)return JSON.parse(v110);
  const v109=localStorage.getItem("pzs_v109");
  if(v109)return JSON.parse(v109);
  const v108=localStorage.getItem("pzs_v108");
  if(v108)return JSON.parse(v108);
  const v107=localStorage.getItem("pzs_v107");
  if(v107)return JSON.parse(v107);
  const v106=localStorage.getItem("pzs_v106");
  if(v106)return JSON.parse(v106);
  const v105=localStorage.getItem("pzs_v105");
  if(v105)return JSON.parse(v105);
  const v104=localStorage.getItem("pzs_v104");
  if(v104)return JSON.parse(v104);
  const v103=localStorage.getItem("pzs_v103");
  if(v103)return JSON.parse(v103);
  const v102=localStorage.getItem("pzs_v102");
  if(v102)return JSON.parse(v102);
  const v101=localStorage.getItem("pzs_v101");
  if(v101)return JSON.parse(v101);
  const v100=localStorage.getItem("pzs_v100");
  if(v100)return JSON.parse(v100);
  const v305=localStorage.getItem("pzs_v305");
  if(v305)return JSON.parse(v305);
  const v304=localStorage.getItem("pzs_v304");
  if(v304)return JSON.parse(v304);
  const v303=localStorage.getItem("pzs_v303");
  if(v303)return JSON.parse(v303);
  const v302=localStorage.getItem("pzs_v302");
  if(v302)return JSON.parse(v302);
  const v301=localStorage.getItem("pzs_v301");
  if(v301)return JSON.parse(v301);
  const final30=localStorage.getItem("pzs_final30");
  if(final30)return JSON.parse(final30);
  const v30=localStorage.getItem("pzs_v30");
  if(v30)return JSON.parse(v30);
  const v29=localStorage.getItem("pzs_v29");
  if(v29)return JSON.parse(v29);
  const v28=localStorage.getItem("pzs_v28");
  if(v28)return JSON.parse(v28);
  const v27=localStorage.getItem("pzs_v27");
  if(v27)return JSON.parse(v27);
  const v26=localStorage.getItem("pzs_v26");
  if(v26)return JSON.parse(v26);
  const v25=localStorage.getItem("pzs_v25");
  if(v25)return JSON.parse(v25);
  const v24=localStorage.getItem("pzs_v24");
  if(v24)return JSON.parse(v24);
  const v23=localStorage.getItem("pzs_v23");
  if(v23)return JSON.parse(v23);
  const v22=localStorage.getItem("pzs_v22");
  if(v22)return JSON.parse(v22);
  const older=localStorage.getItem("pzs_v2");
  return older?JSON.parse(older):null;
 }catch{return null}
}

function render(){
 if(!S)return;normalize();
 $("startScreen").classList.add("hidden");$("gameScreen").classList.remove("hidden");
 ["exportBtn","importLabel"].forEach(x=>$(x).classList.remove("hidden"));
 $("number").textContent=S.number;$("regionView").textContent=S.region.toUpperCase();$("nameView").textContent=S.name;$("archetypeView").textContent=`ŻUŻLOWIEC • ${ARCH[S.archetype].name.toUpperCase()}`;
 $("overallView").textContent=overall();$("overallView").title=`Średnia umiejętności: ${skillAverage().toFixed(1).replace(".",",")} • forma: ${currentFormRating()}`;$("ageView").textContent=S.age;$("clubView").textContent=clubDisplayName(S.club);$("leagueView").textContent=S.league;$("roleView").textContent=S.role;
 $("contractView").textContent=S.parentClub?`Wypożyczenie z: ${S.parentClub.name}`:(S.contractYears?`${S.contractYears} sezon${S.contractYears===1?"":"y"}`:"Kontrakt wygasa po sezonie");
 $("salaryView").textContent=S.salary?`${money(S.salary)} za punkt + bonus`:"—";$("nationalView").textContent=S.national;$("nationalCapsView").textContent=S.teamCaps?`${S.teamCaps} powołani${S.teamCaps===1?"e":"a"} • ${S.nationalMedals||0} medali drużynowych`:"Brak występów w kadrze";
 $("chanceView").textContent=Math.round(S.chance)+"%";$("proView").textContent=Math.round(S.professionalism)+"/100";$("loyaltyView").textContent=Math.round(S.loyalty)+"/100";
 $("mediaView").textContent=Math.round(S.media)+"/100";$("repView").textContent=Math.round(S.reputation)+"/100";$("moraleView").textContent=Math.round(S.morale)+"/100";
 $("equipmentView").textContent=Math.round(S.equipment)+"/100";
 const budgetEl=$("budgetView");
 budgetEl.textContent=money(S.budget);
 budgetEl.classList.toggle("budget-negative",S.budget<0);
 budgetEl.title=S.budget<0?"Zadłużenie blokuje nowe zakupy i inwestycje.":"Dostępne środki zawodnika.";
 $("riskView").textContent=Math.round(S.injuryRisk)+"%";
 $("seasonLabel").textContent=`SEZON ${S.year}`;$("seasonTitle").textContent=S.age<17?"Pierwsze okrążenia":S.age<22?"Walka o skład":S.age<32?"Budowanie nazwiska":"Doświadczenie i presja";
 $("valueView").textContent=S.value>=1e6?(S.value/1e6).toFixed(1).replace(".",",")+" mln zł":Math.round(S.value/1000)+" tys. zł";
 const x=S.season;$("matchesView").textContent=x.matches;$("heatsView").textContent=x.heats;$("pointsView").textContent=`${x.points}+${x.bonus}`;$("avgView").textContent=avg(x.points,x.bonus,x.heats);$("earningsView").textContent=money(x.earnings);
 $("devPoints").textContent=S.devPoints;$("careerPoints").textContent=S.careerPoints;
 $("playBtn").disabled=!!(S.retired||S.seasonFlowActive);
 $("playBtn").textContent=S.retired?"KARIERA ZAKOŃCZONA":S.seasonFlowActive?"TRWA SEZON…":"ROZEGRAJ SEZON";
 if(S.retired){$("careerSummaryCard")?.classList.remove("hidden");if($("careerSummaryContent"))$("careerSummaryContent").innerHTML=careerSummaryHtml()}
 renderSkills();renderFacilities();renderTable();renderCompetitions();renderHistory();save();
}
function skillUpgradeCost(value){
 let base=value<=60?1:value<=75?2:value<=85?3:value<=90?5:value<=94?8:value===95?12:value===96?18:value===97?28:value===98?44:60;
 if(S.age>=37)base=Math.ceil(base*1.45);
 if(S.age>=41)base=Math.ceil(base*1.35);
 if(S.age>=45)base=Math.ceil(base*1.25);
 return base;
}
function skillUpgradeCostFor(value,key){
 const base=skillUpgradeCost(value);
 const target=skillSoftTarget(key);
 let cost=base;
 if(value>=target){
  const over=value-target+1;
  cost+=Math.max(2,Math.ceil(over*2.25));
 }
 const dna=careerDNA(),after=S.age-(dna.peakAge||30);
 if(after>=3&&!dna.exceptionalLongevity)cost+=Math.min(18,Math.ceil((after-2)*2.2));
 return cost;
}
function skillUpgradeBlockReason(value,key){
 const cost=skillUpgradeCostFor(value,key);
 if(value>=99)return "Maksymalny poziom umiejętności.";
 if(S.devPoints<cost)return `Potrzebujesz ${cost} pkt rozwoju. Masz ${S.devPoints}.`;
 if(value>=skillSoftTarget(key))return `Jesteś powyżej naturalnego progu rozwoju tej cechy. Dalszy wzrost jest możliwy, ale kosztuje więcej.`;
 return "";
}

function canUpgradeSkill(value,key=null){
 if(value>=99)return false;
 const cost=key?skillUpgradeCostFor(value,key):skillUpgradeCost(value);
 return S.devPoints>=cost;
}
function performSkillUpgrade(key,cost){
 const value=Math.round(S.skills[key]);
 if(value>=99||S.devPoints<cost)return;
 S.skills[key]=clamp(value+1,1,99);S.devPoints-=cost;normalize();save();render();
}
function upgradeSkill(key){
 const value=Math.round(S.skills[key]),target=skillSoftTarget(key),cost=skillUpgradeCostFor(value,key);
 if(!canUpgradeSkill(value,key))return;
 if(value<target){performSkillUpgrade(key,cost);return}
 showModal("ROZWÓJ PONAD PRÓG",`${SKILLS[key]}: ${value} → ${value+1}`,
  `Naturalny próg rozwoju tej umiejętności wynosi obecnie <b>${target}</b>. Czy na pewno chcesz wydać <b>${cost} pkt rozwoju</b> na ${SKILLS[key].toLowerCase()}?`,
  [{title:`Rozwiń za ${cost} pkt`,desc:`Podnieś ${SKILLS[key].toLowerCase()} do ${value+1}.`,action:()=>{closeModal();performSkillUpgrade(key,cost)}},
   {title:"Zrezygnuj",desc:"Zachowaj punkty rozwoju.",action:()=>closeModal()}]);
}
function growthChanceForSkill(value,key=null){
 const base=value<60?.92:value<75?.66:value<85?.38:value<92?.17:value<97?.055:.012;
 const dna=careerDNA();
 const cap=key?skillSoftTarget(key):dna.potential;
 const capDistance=cap-value;
 const ceilingFactor=capDistance>=8?1:capDistance>=3?.62:capDistance>=0?.27:.06;
 const breakout=dna.lastBreakoutYear===S.year?1.45:1;
 const juniorMultiplier=S.age<=21?(dna.juniorGift||1):1;
 const phase=careerPhaseState();
 return clamp(base*dna.growthRate*ageGrowthCurve()*careerDecisionFactor()*ceilingFactor*breakout*juniorMultiplier*eliteSkillGrowthMultiplier(value)*curvePressureOnGrowth()*(phase.growth||1),.001,.985);
}
function tryNaturalGrowth(key,amount=1){
 let gained=0;
 for(let i=0;i<amount;i++){
  const value=S.skills[key];
  if(value>=99)break;
  if(Math.random()<growthChanceForSkill(value,key)){
   S.skills[key]+=1;
   gained++;
  }
 }
 return gained;
}

function renderSkills(){
 $("skills").innerHTML=Object.entries(S.skills).map(([k,v])=>{
  const value=Math.round(v),target=skillSoftTarget(k),cost=skillUpgradeCostFor(value,k),disabled=!canUpgradeSkill(value,k);
  const thresholdInfo=value===target-1?`<span class="skill-threshold-inline">próg ${target}</span>`:"";
  const reason=disabled?skillUpgradeBlockReason(value,k):(value>=target?`Dalszy rozwój jest możliwy, ale kosztuje więcej punktów rozwoju. Koszt: ${cost}.`:`Koszt: ${cost} pkt rozwoju.`);
  return `<div class="skill"><div class="skill-label"><span>${SKILLS[k]} ${thresholdInfo}</span><b>${value}</b></div><div class="skill-bar" aria-label="${SKILLS[k]}: ${value}/100"><i style="width:${value}%"></i></div><button class="plus" data-k="${k}" title="${reason}" ${disabled?"disabled":""}>+${cost}</button></div>`;
 }).join("");
 document.querySelectorAll(".plus").forEach(b=>b.onclick=()=>upgradeSkill(b.dataset.k));
}
function renderFacilities(){
 const box=$("facilitiesList");if(!box)return;
 box.innerHTML=Object.entries(FACILITY_DEFS).map(([key,def])=>{
  const level=facilityLevel(key),pct=Math.round(level/def.maxLevel*100);
  return `<div class="facility-row"><div class="facility-main"><div class="facility-title"><strong>${def.name}</strong><b>${level}/${def.maxLevel}</b></div><small>${def.desc}</small><div class="facility-progress"><i style="width:${pct}%"></i></div></div><span>${level?`Utrzymanie: ${money(level*def.maintenance)}/sezon`:"Niezbudowane"}</span></div>`;
 }).join("");
}
function playoffLineHtml(line,year=S.tableSeasonYear||S.year){
 const match=line.match(/^([^:]+):\s*(.+?)\s+–\s+(.+?)\s+(\d+:\d+)(.*)$/);
 if(!match)return `<span>${line}</span>`;
 const [,phase,teamA,teamB,score,suffix=""]=match;
 const own=clubBaseName(S.tableClub||S.club);
 const formatTeam=name=>{
  const base=clubBaseName(name),display=clubDisplayNameForSeason(base,year);
  return base===own?`<strong>${display}</strong>`:display;
 };
 return `<span><b>${phase}:</b> ${formatTeam(teamA)} – ${formatTeam(teamB)} ${score}${suffix}</span>`;
}
function renderTable(){
 const label=S.tableLeague||S.league,year=S.tableSeasonYear||S.year;
 $("tableTitle").textContent=label==="Etap szkolenia"?"Brak rozgrywek ligowych":`${label} — sezon ${year}`;
 $("teamFinish").textContent=S.finish?`${S.finish.position}. MIEJSCE`:"—";
 if(!S.table.length){$("leagueTable").innerHTML='<p class="serif muted">Tabela pojawi się po rozegraniu sezonu.</p>';return}
 const highlighted=clubBaseName(S.tableClub||S.club);
 $("leagueTable").innerHTML='<div class="table-row header"><span>#</span><span>Drużyna</span><span>M</span><span>PKT</span><span>Bilans</span></div>'+
 S.table.map((t,i)=>{
  const base=clubBaseName(t.name),display=t.displayName||clubDisplayNameForSeason(base,year);
  return `<div class="table-row ${base===highlighted?"player-team":""}"><span>${i+1}</span><span>${base===highlighted?`<strong>${display}</strong>`:display}</span><span>${t.matches}</span><b>${t.pts}</b><span>${t.diff>0?"+":""}${t.diff}</span></div>`;
 }).join("")+
 (S.playoffSummary?.length?`<div class="playoff-summary"><b>Faza finałowa:</b>${S.playoffSummary.map(line=>playoffLineHtml(line,year)).join("")}</div>`:"");
}
function renderCompetitions(){
 const box=$("competitionList");if(!box)return;
 if(!S.competitions.length){box.innerHTML='<p class="serif muted">Wyniki zawodów młodzieżowych i indywidualnych pojawią się po sezonie.</p>';return}
 box.innerHTML=S.competitions.map(c=>`<div class="competition-row"><div><strong>${c.name}</strong><small>${c.stage||""}</small></div><b>${c.result}</b><span>${c.points!==undefined?c.points+" pkt":""}</span></div>`).join("");
}
function renderHistory(){
 $("history").innerHTML=S.history.map(h=>`<div class="history-item"><time>${h.age} LAT<br>${h.year}</time><div><strong>${h.title}</strong><p>${h.text}</p></div></div>`).join("");
}

const META_STATS=new Set(["professionalism","loyalty","media","reputation","morale"]);
function positiveMetaMultiplier(value){
 if(value<60)return 1;
 if(value<80)return .78;
 if(value<90)return .48;
 if(value<96)return .24;
 if(value<99)return .10;
 return .035;
}
function taperedPositiveAmount(value,amount){
 if(amount<=0)return amount;
 const raw=amount*positiveMetaMultiplier(value);
 const whole=Math.floor(raw),fraction=raw-whole;
 return whole+(Math.random()<fraction?1:0);
}
function applyMetaDelta(key,delta){
 if(!Number.isFinite(delta)||delta===0)return 0;
 if(delta<0){
  S[key]+=delta;
  return delta;
 }
 const actual=taperedPositiveAmount(S[key]||0,delta);
 S[key]+=actual;
 return actual;
}
function applyEquipmentDelta(delta){
 if(!Number.isFinite(delta)||delta===0)return 0;
 if(delta<0){
  S.equipment+=delta;
  return delta;
 }
 return equipmentUpgradeGain(delta);
}
function moveToward(value,target,maxStep){
 const difference=target-value;
 if(Math.abs(difference)<.5)return value;
 return value+clamp(difference*.24,-maxStep,maxStep);
}
function championshipPrestigeThisSeason(){
 return (S.competitions||[]).reduce((score,event)=>{
  if(!Number.isFinite(event.place))return score;
  const key=canonicalCompetitionKey(event);
  const weight=key==="SGP"?10:key==="SEC"||key==="IMP"?7:key==="MIMP"?4:key==="DPŚ"||key==="DME"?5:2;
  return score+(event.place===1?weight:event.place===2?weight*.65:event.place===3?weight*.45:0);
 },0);
}
function careerMetaTargets(){
 const average=Number(S.season?.avg)||0;
 const heats=S.season?.heats||0;
 const matches=S.season?.matches||0;
 const leagueLevel=leagueByName(S.league)?.level||3;
 const prestige=championshipPrestigeThisSeason();
 const debtPenalty=S.budget<0?clamp(Math.abs(S.budget)/30000,2,16):0;
 const riding=Math.min(1,heats/55);
 const resultQuality=clamp((average-1.25)*34,-18,45);
 const levelPrestige=leagueLevel===1?18:leagueLevel===2?9:2;
 const stableClub=S.lastTransferYear!==S.year;
 const professionalTarget=clamp(48+riding*24+S.careerDNA.decisionQuality*.38+(S.preseasonCompletedYear===S.year?7:0)-debtPenalty*.25,25,98);
 const loyaltyTarget=clamp(45+(stableClub?Math.min(25,(S.careerStats?.clubs?.[clubBaseName(S.club)]||0)*4):-18)+S.clubRelation*.22-debtPenalty*.18,10,98);
 const reputationTarget=clamp(30+levelPrestige+resultQuality+prestige+Math.min(12,matches*.7)-Math.max(0,(overall()-75-average*8))*.28,5,99);
 const moraleTarget=clamp(54+resultQuality*.55+riding*12+prestige*.6-debtPenalty-(S.injuryRisk-10)*.25+(S.chance-50)*.12,5,98);
 const mediaTarget=clamp(22+S.reputation*.45+prestige*.8+(S.teamCaps||0)*.5,8,94);
 return {professionalism:professionalTarget,loyalty:loyaltyTarget,reputation:reputationTarget,morale:moraleTarget,media:mediaTarget};
}
function seasonalMetaDynamics(){
 const targets=careerMetaTargets();
 const before={
  professionalism:S.professionalism,loyalty:S.loyalty,reputation:S.reputation,
  morale:S.morale,media:S.media,equipment:S.equipment,chance:S.chance
 };
 const agePressure=S.age>=40?2:S.age>=37?1:0;
 const maxSteps={professionalism:5,loyalty:7,reputation:7,morale:10,media:5};
 for(const key of ["professionalism","loyalty","reputation","morale","media"]){
  let target=targets[key];
  // Wyniki na poziomie 90+ trzeba stale potwierdzać; samo wcześniejsze dojście do setki nie wystarcza.
  if(S[key]>=90&&target<S[key])target-=agePressure;
  S[key]=Math.round(moveToward(S[key],target,maxSteps[key]));
 }
 if(S.lastTransferYear===S.year){
  S.loyalty-=rand(5,10);
  S.morale+=rand(-3,3);
 }
 if((S.season?.heats||0)<20){
  S.professionalism-=S.professionalism>85?rand(2,4):rand(0,2);
  S.reputation-=S.reputation>80?rand(2,5):rand(0,2);
 }
 if(S.budget<0){
  S.morale-=rand(2,6);
  S.professionalism-=S.budget<-100000?2:0;
 }
 // Sprzęt jest stanem bieżącym, a nie trwałą umiejętnością.
 const heats=S.season?.heats||0;
 const baseWear=heats<20?1:heats<45?2:heats<70?3:4;
 const facilityProtection=facilityLevel("technical");
 const ageWear=S.age>=40?1:0;
 const wear=Math.max(1,baseWear+ageWear-facilityProtection);
 S.equipment-=wear;
 // Szansa na skład jest przeliczana, nie kumulowana.
 const recalculated=projectedLineupChance(S.club,S.league,{stay:true,role:S.role,form:currentFormRating()});
 const ageChancePenalty=S.age>=45?12:S.age>=42?7:S.age>=39?3:0;
 S.chance=clamp(Math.round(recalculated-ageChancePenalty),5,96);
 normalize();
 const changes=[];
 const labels={professionalism:"profesjonalizm",loyalty:"lojalność",reputation:"reputacja",morale:"morale",media:"medialność",equipment:"sprzęt",chance:"szansa na skład"};
 for(const key of Object.keys(before)){
  const delta=Math.round(S[key]-before[key]);
  if(delta)changes.push(`${labels[key]} ${delta>0?"+":""}${delta}`);
 }
 if(changes.length)addHistory("Zmiana parametrów kariery",changes.join(" • "));
}
function repairMaxedMetaSave(){
 if(S.v109MetaRepairApplied)return;
 const keys=["professionalism","loyalty","reputation","morale"];
 const maxed=keys.filter(key=>S[key]>=99).length;
 if(S.age>=35&&maxed>=3){
  const targets=careerMetaTargets();
  for(const key of keys){
   if(S[key]>=99)S[key]=Math.round(clamp(targets[key]+rand(-3,3),72,96));
  }
  if(S.equipment>=99)S.equipment=Math.round(clamp(92-facilityLevel("technical")+rand(-3,2),75,95));
  addHistory("Korekta parametrów kariery","Usunięto trwałe maksymalne wartości powstałe w starszej wersji gry. Parametry zostały dopasowane do aktualnego etapu kariery.");
 }
 S.v109MetaRepairApplied=true;
 normalize();
}

function ensureEventSkillGrowth(){
 S.eventSkillGrowth??={career:{},seasonYear:S.year,season:{}};
 if(S.eventSkillGrowth.seasonYear!==S.year){S.eventSkillGrowth.seasonYear=S.year;S.eventSkillGrowth.season={}}
 for(const key of Object.keys(S.skills)){S.eventSkillGrowth.career[key]??=0;S.eventSkillGrowth.season[key]??=0}
 return S.eventSkillGrowth;
}
function diversifiedEventSkillTarget(preferred=null){
 const tracker=ensureEventSkillGrowth(),keys=Object.keys(S.skills);
 const minGrowth=Math.min(...keys.map(k=>tracker.career[k]||0));
 const pool=keys.filter(k=>(tracker.career[k]||0)<=minGrowth+3);
 if(preferred&&pool.includes(preferred)&&Math.random()<.58)return preferred;
 return pick(pool.length?pool:keys);
}
function applyEventSkillBoost(preferred,amount){
 const tracker=ensureEventSkillGrowth(),changes={};
 if(amount<=0){S.skills[preferred]+=amount;changes[preferred]=(changes[preferred]||0)+amount;return changes}
 const keys=Object.keys(S.skills);
 for(let i=0;i<amount;i++){
  const average=keys.reduce((sum,k)=>sum+(tracker.career[k]||0),0)/keys.length;
  const excess=(tracker.career[preferred]||0)-average;
  const highSkill=(S.skills[preferred]||0)>=90;
  let keepChance=excess<=2?.92:excess<=5?.68:excess<=8?.44:.25;
  if(highSkill)keepChance*=.68;
  const target=Math.random()<keepChance?preferred:diversifiedEventSkillTarget(preferred);
  S.skills[target]+=1;tracker.career[target]=(tracker.career[target]||0)+1;tracker.season[target]=(tracker.season[target]||0)+1;
  changes[target]=(changes[target]||0)+1;
 }
 return changes;
}
function mergeSkillChanges(target,source){for(const [k,v] of Object.entries(source||{}))target[k]=(target[k]||0)+v;return target}
function applyEffect(e){
 const skillChanges={};
 if(e.skill)mergeSkillChanges(skillChanges,applyEventSkillBoost(e.skill[0],e.skill[1]));
 if(e.randomSkill){const preferred=diversifiedEventSkillTarget();mergeSkillChanges(skillChanges,applyEventSkillBoost(preferred,e.randomSkill))}
 e._appliedSkillChanges=skillChanges;
 Object.entries(e).forEach(([k,v])=>{
  if(["skill","randomSkill","salaryMult","_randomSkillName","_appliedSkillChanges","rivalConflict"].includes(k))return;
  if(typeof S[k]!=="number")return;
  if(META_STATS.has(k))applyMetaDelta(k,v);
  else if(k==="equipment")applyEquipmentDelta(v);
  else S[k]+=v;
 });
 if(e.salaryMult)S.salary=Math.round(S.salary*e.salaryMult);
 if(e.rivalConflict){S.rivalConflicts=(S.rivalConflicts||0)+e.rivalConflict;applyMetaDelta("reputation",-e.rivalConflict);}
 normalize();
}
function effectDescription(e){
 const labels={professionalism:"profesjonalizm",loyalty:"lojalność",media:"medialność",reputation:"reputacja",morale:"morale",equipment:"sprzęt",clubRelation:"relacja z klubem",chance:"szansa na skład",injuryRisk:"ryzyko urazu",budget:"budżet"};
 const parts=[];
 const applied=e._appliedSkillChanges||{};
 if(Object.keys(applied).length){
  for(const [key,value] of Object.entries(applied))if(value)parts.push(`${SKILLS[key]} ${value>=0?"+":""}${value}`);
 }else{
  if(e.skill)parts.push(`${SKILLS[e.skill[0]]} ${e.skill[1]>=0?"+":""}${e.skill[1]}`);
  if(e.randomSkill)parts.push(`${e._randomSkillName||"losowa umiejętność"} +${e.randomSkill}`);
 }
 Object.entries(e).forEach(([k,v])=>{
  if(["skill","randomSkill","salaryMult","_randomSkillName","_appliedSkillChanges","rivalConflict"].includes(k)||!labels[k])return;
  if(k==="budget")parts.push(`${labels[k]} ${v>=0?"+":""}${money(v)}`);
  else if(k==="injuryRisk"||k==="chance")parts.push(`${labels[k]} ${v>=0?"+":""}${v} p.p.`);
  else parts.push(`${labels[k]} ${v>=0?"+":""}${v}`);
 });
 if(e.salaryMult)parts.push(`stawka za punkt × ${String(e.salaryMult).replace(".",",")}`);
 if(e.rivalConflict)parts.push("trwały konflikt z rywalem");
 return parts.length?parts.join(" • "):"bez zmian";
}
function showModal(kicker,title,text,options){
 clearSeasonWatchdog();
 const modalCard=document.querySelector(".modal-card");
 const modalOptions=$("modalOptions");
 $("modalKicker").textContent=kicker;
 $("modalTitle").textContent=capitalizeFirstText(title);
 $("modalText").innerHTML=cleanGeneratedText(text);
 modalOptions.innerHTML="";
 const wide=kicker==="PRZYGOTOWANIA DO SEZONU"||kicker==="ROZWÓJ TEAMU"||options.length>=6;
 modalCard.classList.toggle("modal-card-wide",wide);
 modalOptions.classList.toggle("modal-options-grid",wide);
 options.forEach(o=>{
  const b=document.createElement("button");
  b.className="option";
  b.innerHTML=`<strong>${capitalizeFirstText(o.title)}</strong><small>${o.desc?ensureSentence(o.desc):""}${probabilitySummaryHtml(o.prob)}${eventProbSummary(o.eventProb)}</small>`;
  b.onclick=()=>{
   if(b.dataset.busy==="1")return;
   b.dataset.busy="1";b.disabled=true;
   try{o.action()}
   catch(error){
    console.error(error);
    if(S?.seasonFlowActive){recoverSeasonFlow(error);return}
    b.dataset.busy="0";b.disabled=false;
    const box=$("resultBox");
    if(box){box.classList.remove("hidden");box.innerHTML=`<h3>Nie udało się wykonać decyzji</h3><p>${String(error?.message||error||"Nieznany błąd")}</p>`}
   }
  };
  modalOptions.appendChild(b);
 });
 $("modal").classList.remove("hidden");
}
function closeModal(){
 $("modal").classList.add("hidden");
 document.querySelector(".modal-card")?.classList.remove("modal-card-wide");
 $("modalOptions")?.classList.remove("modal-options-grid");
 if(S?.seasonFlowActive)armSeasonWatchdog();
}
function eventMeta(e){return e[5]||{id:e[0],weight:1,cooldown:8,once:false}}
function weightedPick(events){
 const a=events.map(e=>({e,w:Math.max(.01,eventMeta(e).weight??1)})),total=a.reduce((s,x)=>s+x.w,0);let r=Math.random()*total;
 for(const x of a){r-=x.w;if(r<=0)return x.e}return a[a.length-1].e;
}


function splitCelebrationTitle(title){
 const text=capitalizeFirstText(String(title||"").trim());
 const m=text.match(/^(.+?[.!?])\s+((?:\d+|[0-9]).*(?:pkt|punkt|bieg|mecz|start|rund|średni|miejsce).*)$/i);
 if(m)return {main:m[1],detail:m[2]};
 // Also split "medal — 7 pkt..." and similar structured titles.
 const dash=text.match(/^(.+?[.!?]?)\s+[—-]\s+(\d+.*)$/);
 if(dash)return {main:dash[1],detail:dash[2]};
 return {main:text,detail:""};
}
function showAchievementCelebration(kind,title,subtitle="",onContinue=null){
 closeModal();
 document.querySelector(".achievement-burst")?.remove();
 const split=splitCelebrationTitle(title);
 const titleHtml=split.detail
  ?`<span class="achievement-title-main">${split.main}</span><span class="achievement-title-detail">${split.detail}</span>`
  :`<span class="achievement-title-main">${split.main}</span>`;
 const root=document.createElement("div");root.className="achievement-burst";
 root.innerHTML=`<div class="achievement-glow"></div>
 <div class="achievement-copy">
  <span>${capitalizeFirstText(kind)}</span>
  <strong>${titleHtml}</strong>
  ${subtitle?`<small>${ensureSentence(subtitle)}</small>`:""}
  <button class="achievement-continue" type="button">PRZEJDŹ DALEJ</button>
 </div>
 <div class="fireworks">${Array.from({length:6},(_,i)=>`<i class="firework f${i+1}">${Array.from({length:12},(_,j)=>`<b style="--a:${j*30}deg;--d:${70+(j%4)*18}px;--delay:${(j%3)*.04}s"></b>`).join("")}</i>`).join("")}</div>`;
 const finish=()=>{
  if(root.dataset.closing==="1")return;
  root.dataset.closing="1";root.classList.add("achievement-hide");
  setTimeout(()=>{root.remove();onContinue?.()},480);
 };
 root.querySelector(".achievement-continue").onclick=finish;
 document.body.appendChild(root);
 requestAnimationFrame(()=>root.classList.add("achievement-show"));
}
function competitionCelebration(result){
 if(!result)return null;
 const key=String(result.key||result.name||""),place=Number(result.place||99),roundPlace=Number(result.roundPlace||99);
 if(key==="IMP Wild Card"&&roundPlace<=3)return {kind:roundPlace===1?"WYGRANA RUNDA IMP":"PODIUM RUNDY IMP",title:`${roundPlace}. miejsce jako dzika karta`,subtitle:`Kapitalny występ w rundzie IMP w ${cityLocative(result.hostCity||clubCity(S.club))}.`};
 if((key==="SGP Wild Card"||key==="SEC Wild Card")&&roundPlace<=3)return {kind:roundPlace===1?`WYGRANA RUNDA ${key.startsWith("SGP")?"SGP":"SEC"}`:`PODIUM RUNDY ${key.startsWith("SGP")?"SGP":"SEC"}`,title:capitalizeFirstText(result.result),subtitle:`Wielki wynik z dziką kartą w ${cityLocative(result.hostCity)}.`};
 if(key==="GP Challenge"&&place<=3)return {kind:"AWANS DO SGP",title:`${place}. miejsce w Grand Prix Challenge`,subtitle:"Wywalczyłeś miejsce w przyszłorocznym cyklu Speedway Grand Prix."};
 if((/Speedway Grand Prix|Indywidualne Mistrzostwa Świata/i.test(key)||key==="SGP")&&place<=3)return {kind:place===1?"MISTRZ ŚWIATA":"PODIUM SGP",title:capitalizeFirstText(result.result||`${place}. miejsce`),subtitle:"Wielki wynik w walce o indywidualne mistrzostwo świata."};
 if((key==="SEC"||/Speedway Euro Championship/i.test(key))&&place<=3)return {kind:place===1?"MISTRZ EUROPY":"MEDAL SEC",title:capitalizeFirstText(result.result||`${place}. miejsce`),subtitle:"Podium Speedway Euro Championship."};
 if((key==="IMP"||/Indywidualne Mistrzostwa Polski/i.test(key))&&place<=3)return {kind:place===1?"MISTRZ POLSKI":"MEDAL IMP",title:capitalizeFirstText(result.result||`${place}. miejsce`),subtitle:"Podium Indywidualnych Mistrzostw Polski."};
 if(/Drużynowe|Puchar Świata/i.test(key)&&place<=3)return {kind:"MEDAL REPREZENTACJI",title:capitalizeFirstText(result.result||`${place}. miejsce`),subtitle:"Polska kończy zawody na podium."};
 const round=(result.roundAchievements||[]).sort((a,b)=>a.place-b.place)[0];
 if(round&&round.place<=3){const series=key==="SGP"||/Grand Prix/i.test(key)?"SGP":key==="SEC"?"SEC":"IMP";return {kind:round.place===1?`WYGRANA RUNDA ${series}`:`PODIUM RUNDY ${series}`,title:round.place===1?`Zwycięstwo w rundzie ${series}`:`${round.place}. miejsce w rundzie ${series}`,subtitle:round.host?`Wielki wynik w ${cityLocative(round.host)}.`:"Jedna z najlepszych rund w twojej karierze."}}
 return null;
}
function showCompetitionResult(result,next){
 const openResult=()=>{
  const healthNote=postCompetitionHealthExposure(result);
  const resultText=ensureSentence((result?.result||"Zawody zakończone")+healthNote);
  showModal("WYNIK ZAWODÓW",result?.name||"Zawody",`<b>${resultText}</b>${result?.points!=null?`<br>Twój dorobek: ${result.points} pkt.`:""}`,[
   {title:"Kontynuuj",desc:"Przejdź dalej.",action:()=>{closeModal();next?.()}}
  ]);
 };
 const c=competitionCelebration(result);
 if(c)showAchievementCelebration(c.kind,c.title,c.subtitle,openResult);
 else openResult();
}
function qualificationCelebration(event){
 if(!event)return null;
 if(event.key==="IMP")return {kind:"AWANS DO IMP",title:"Indywidualne Mistrzostwa Polski",subtitle:ensureSentence(event.qualificationReason||"Wywalczyłeś miejsce w stałej stawce IMP")};
 if(event.key==="SEC")return {kind:"AWANS DO SEC",title:"Speedway Euro Championship",subtitle:ensureSentence(event.qualificationReason||"Wywalczyłeś miejsce w cyklu SEC")};
 if(event.key==="Speedway Grand Prix")return {kind:"AWANS DO SGP",title:"Speedway Grand Prix",subtitle:ensureSentence(event.qualificationReason||"Masz miejsce w cyklu mistrzostw świata")};
 return null;
}
function eventEffectScore(e={}){
 let s=0;
 const w={professionalism:2.2,loyalty:1.2,media:1.4,reputation:2,morale:1.4,equipment:3.2,clubRelation:1.4,chance:1.5,injuryRisk:-1.7,budget:.00005};
 if(e.skill)s+=(e.skill[1]||0)*3.2;
 if(e.randomSkill)s+=(e.randomSkill||0)*2.8;
 Object.entries(e).forEach(([k,v])=>{if(w[k]&&typeof v==="number")s+=v*w[k]});
 if(e.salaryMult)s+=(e.salaryMult-1)*18;
 if(e.rivalConflict)s-=e.rivalConflict*3;
 return s;
}
function eventRelevantSkill(event,choice){
 const t=`${event?.[0]||""} ${event?.[1]||""} ${choice?.[0]||""}`.toLowerCase();
 const skill=k=>Number(S.skills?.[k]||60);
 if(/sponsor|reklam|telewiz|instagram|kibic|media|wywiad|viral/.test(t))return S.media*.62+S.professionalism*.23+skill("fitness")*.15;
 if(/silnik|tuner|mechanik|motocykl|sprzęt|gaźnik|setup|ustaw/.test(t))return skill("setup")*.42+S.equipment*.33+S.professionalism*.25;
 if(/tor|uraz|kontuz|zmęcz|rehabil|trening|kondyc/.test(t))return skill("fitness")*.42+skill("mental")*.25+S.professionalism*.33;
 if(/klub|partner|drużyn|kontrakt|prezes|menedżer/.test(t))return S.professionalism*.38+S.loyalty*.26+S.reputation*.20+skill("mental")*.16;
 return S.professionalism*.38+skill("mental")*.30+S.reputation*.18+S.media*.14;
}
function enhanceEventEffect(effect,mult=1.25){
 const out=JSON.parse(JSON.stringify(effect||{}));
 if(out.skill&&out.skill[1]>0)out.skill[1]=Math.max(1,Math.round(out.skill[1]*mult));
 if(out.randomSkill>0)out.randomSkill=Math.max(1,Math.round(out.randomSkill*mult));
 Object.keys(out).forEach(k=>{
  if(["skill","randomSkill","salaryMult","rivalConflict"].includes(k)||typeof out[k]!=="number")return;
  if(k==="budget"&&out[k]<0)return;
  if(out[k]>0)out[k]=Math.max(1,Math.round(out[k]*mult));
 });
 if(out.salaryMult>1)out.salaryMult=1+(out.salaryMult-1)*mult;
 return out;
}
function softenEventEffect(effect,mult=.28){
 const out=JSON.parse(JSON.stringify(effect||{}));
 if(out.skill)out.skill[1]=Math.round(out.skill[1]*mult);
 if(out.randomSkill)out.randomSkill=Math.round(out.randomSkill*mult);
 Object.keys(out).forEach(k=>{
  if(["skill","randomSkill","salaryMult","rivalConflict"].includes(k)||typeof out[k]!=="number")return;
  if(k==="budget"&&out[k]<0)return; // koszt decyzji nadal ponosisz
  out[k]=Math.round(out[k]*mult);
 });
 if(out.salaryMult)out.salaryMult=1+(out.salaryMult-1)*mult;
 if(out.rivalConflict)out.rivalConflict=Math.round(out.rivalConflict*mult);
 return out;
}

function cleanEventOutcomeLabel(text){
 return String(text||"")
  .replace(/(^|\s)\d+(?:[.,]\d+)?\s*%\s*/g," ")
  .replace(/\s{2,}/g," ")
  .replace(/^[•\-–—:;,.\s]+|[•\-–—:;,.\s]+$/g,"")
  .trim();
}
function eventOutcomeLabels(choice,count){
 const desc=String(choice?.[1]||"");
 let parts=desc.split(/\s*[•|;]\s*/).map(cleanEventOutcomeLabel).filter(Boolean);
 if(parts.length===count)return parts;
 const pctParts=[...desc.matchAll(/\d+(?:[.,]\d+)?\s*%\s*([^•|;]+)/g)].map(m=>cleanEventOutcomeLabel(m[1])).filter(Boolean);
 if(pctParts.length===count)return pctParts;
 const fallback={
  2:["Korzystny rezultat","Niepowodzenie"],
  3:["Świetny rezultat","Przeciętny rezultat","Niepowodzenie"],
  4:["Świetny efekt","Korzystny rezultat","Bez większej zmiany","Niepowodzenie"]
 };
 return fallback[count]||Array.from({length:count},(_,i)=>`Wariant ${i+1}`);
}
function eventToneForRank(rank,count,score=0,scores=[],label=""){
 const t=String(label||"").toLowerCase();
 const negative=/niepowod|kara|odrzuc|śmiejąc|uraz|kontuz|dyskwal|tracisz|strata|spada|odpada|bez punkt|po zawodach|nie zgadza|awaria|konflikt|przemęcz|wyższy mandat|zawieszen|reprymend|odchodzi|trzy defekty/.test(t);
 const neutral=/przecię|neutral|bez zmian|bez większej zmiany|cisza|wygasa|pozostaje|udaje się bez efektu|tylko ostrzeżenie/.test(t);
 // Zwykłe eventy mają prostą, czytelną semantykę:
 // 3 wyniki: zielony / żółty / czerwony. 2 wyniki: zielony / czerwony,
 // a jeśli gorszy wariant jest faktycznie neutralny — zielony / żółty.
 if(count===3){
  if(rank===2)return "success";
  if(rank===1)return "neutral";
  return "fail";
 }
 if(count===2){
  if(rank===1)return "success";
  if(neutral||(!negative&&score>=-.35))return "neutral";
  return "fail";
 }
 if(negative)return "fail";
 if(neutral||Math.abs(score)<.35)return "neutral";
 if(rank===count-1&&score>1.5)return "super";
 return score>0?"success":"fail";
}
function eventChoiceDescription(choice,variants){
 if(!variants)return choice?.[1]||"";
 return variants.map(v=>v.label).join(" • ");
}
function animateRollerWithBrake(stripEl,startOffset,finalOffset,duration,done){
 const delta=finalOffset-startOffset,startTime=performance.now(),ms=Math.max(4000,duration*1000);
 stripEl.style.transition="none";
 stripEl.style.transform=`translate3d(${-startOffset}px,0,0)`;

 // 1.01 — jedna gładka krzywa prędkości (bez zmian względem 1.00).
 // Szybki start, a potem od razu naturalne, długie hamowanie:
 // bez ponownego przyspieszania, bez "progów" między fazami
 // i z bardzo wolnym ogonem tuż przed zatrzymaniem.
 const speed=t=>{
  const x=clamp(t,0,1);
  return Math.exp(-2.4*Math.pow(x,1.25))*Math.pow(Math.max(0,1-x),.65);
 };

 // Pozycja jest całką z v(t). Dzięki temu wynik nadal kończy się
 // dokładnie na docelowym kafelku, a ruch pozostaje ciągły.
 const N=480,cum=new Array(N+1).fill(0),vel=new Array(N+1);
 for(let i=0;i<=N;i++)vel[i]=speed(i/N);
 for(let i=1;i<=N;i++)cum[i]=cum[i-1]+(vel[i-1]+vel[i])*.5/N;
 const total=cum[N]||1;
 const motion=t=>{
  const f=clamp(t,0,1)*N,i=Math.min(N-1,Math.floor(f)),u=f-i;
  return (cum[i]+(cum[i+1]-cum[i])*u)/total;
 };

 const frame=now=>{
  const t=clamp((now-startTime)/ms,0,1);
  const offset=startOffset+delta*motion(t);
  stripEl.style.transform=`translate3d(${-offset}px,0,0)`;
  if(t<1){
   requestAnimationFrame(frame);
  }else{
   stripEl.style.transform=`translate3d(${-finalOffset}px,0,0)`;
   stripEl.dataset.finalOffset=String(finalOffset);
   setTimeout(()=>done?.(),90);
  }
 };
 requestAnimationFrame(frame);
}

function buildEventRoulette(event,choice){
 const raw=choice?.[2]||[];
 if(raw.length<2)return null;
 const labels=eventOutcomeLabels(choice,raw.length);
 const scored=raw.map(([p,e],i)=>({i,p:Math.max(0,Number(p)||0),e,score:eventEffectScore(e),label:labels[i]}));
 const sorted=[...scored].sort((a,b)=>a.score-b.score),rankMap=new Map(sorted.map((x,i)=>[x.i,i]));
 const skill=clamp(eventRelevantSkill(event,choice),35,100),tilt=clamp((skill-60)/40*.08,-.055,.08);
 let adjusted=scored.map(x=>{const rank=rankMap.get(x.i),center=(raw.length-1)/2||1,norm=(rank-center)/Math.max(1,center);return {...x,w:x.p*Math.max(.84,1+tilt*norm),rank}});
 const total=adjusted.reduce((s,x)=>s+x.w,0)||1,scores=adjusted.map(x=>x.score);
 return adjusted.map(x=>({
  key:`event_${x.i}`,tone:eventToneForRank(x.rank,raw.length,x.score,scores,x.label),label:x.label,p:x.w/total*100,effect:x.e,originalP:x.p
 }));
}
function eventProbSummary(variants){
 if(!variants?.length)return "";
 const counts=eventRollerTiles(variants).reduce((a,x)=>(a[x.key]=(a[x.key]||0)+1,a),{});
 return `<div class="decision-probabilities event-probabilities">${variants.map(v=>`<span class="event-${v.tone}">${counts[v.key]||0}% ${v.label}</span>`).join("")}</div>`;
}
function eventRollerTiles(variants){
 const exact=variants.map(v=>({...v,exact:v.p}));
 const counts=exact.map(v=>Math.floor(v.exact));
 let missing=100-counts.reduce((s,n)=>s+n,0);
 const order=exact.map((v,i)=>({i,rem:v.exact-counts[i]})).sort((a,b)=>b.rem-a.rem);
 for(let i=0;i<missing;i++)counts[order[i%order.length].i]++;
 let pool=[];exact.forEach((v,i)=>{for(let n=0;n<counts[i];n++)pool.push({...v})});
 for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]]}
 return pool;
}
function showEventOutcomeRoller(eventTitle,choiceTitle,variants,next){
 const base=eventRollerTiles(variants),chosenIndex=rand(0,99),chosen=base[chosenIndex];
 const cycles=9,segments=[];for(let c=0;c<cycles;c++)segments.push(...base.map(v=>({...v})));
 const targetIndex=500+chosenIndex,startIndex=targetIndex-rand(68,86);
 const legend=eventProbSummary(variants);
 const strip=`<div class="outcome-roller event-outcome-roller outcome-roller-loop"><div class="roller-marker"></div><div class="roller-strip" id="eventRollerStrip">${segments.map((v,i)=>`<span data-index="${i}" data-key="${v.key}" class="event-tile-${v.tone}"></span>`).join("")}</div></div>`;
 showModal("ROZSTRZYGNIĘCIE",choiceTitle,`${strip}${legend}`,[{title:"Losowanie trwa…",desc:"",action:()=>{}}]);
 const opts=$("modalOptions");if(opts)opts.style.display="none";
 requestAnimationFrame(()=>{
  const stripEl=document.getElementById("eventRollerStrip"),roller=document.querySelector(".event-outcome-roller");if(!stripEl||!roller)return;
  const tile=stripEl.querySelector("span"),style=getComputedStyle(stripEl),tw=tile?.getBoundingClientRect().width||24,gap=parseFloat(style.columnGap||style.gap)||2,step=tw+gap;
  const start=startIndex*step+tw/2-roller.clientWidth/2,end=targetIndex*step+tw/2-roller.clientWidth/2,duration=4.05+Math.random()*.45;
  stripEl.dataset.expectedKey=chosen.key;stripEl.dataset.targetIndex=String(targetIndex);
  animateRollerWithBrake(stripEl,start,end,duration,()=>{
   applyEffect(chosen.effect);const desc=effectDescription(chosen.effect),box=$("modalText");
   if(box)box.insertAdjacentHTML("beforeend",`<div class="event-roll-result event-roll-${chosen.tone}">${chosen.label}</div><p><b>Skutek:</b> ${desc}.</p>`);
   const options=$("modalOptions");if(options){options.style.display="";options.innerHTML="";const b=document.createElement("button");b.className="option";b.innerHTML="<strong>KONTYNUUJ</strong><small>Przejdź do dalszej części sezonu.</small>";b.onclick=()=>{addHistory(eventTitle,`${choiceTitle}. ${chosen.label}. Skutek: ${desc}.`);closeModal();next()};options.appendChild(b)}
  });
 });
}

function randomEvent(next){
 if(S.year<S.nextRandomEventYear){next();return}
 if(!S.eventMemory)S.eventMemory={seen:{},lastYear:{}};
 const available=EVENTS.filter(e=>{const m=eventMeta(e),seen=S.eventMemory.seen[m.id]||0,last=S.eventMemory.lastYear[m.id]||-999;return S.age>=e[2]&&S.age<=e[3]&&!(m.once&&seen>0)&&S.year-last>=(m.cooldown||8)});
 S.nextRandomEventYear=S.year+(Math.random()<.72?1:2);
 if(!available.length){next();return}
 const e=weightedPick(available),m=eventMeta(e);
 const options=e[4].map(c=>{
  const roulette=buildEventRoulette(e,c);
  return {
   title:c[0],desc:eventChoiceDescription(c,roulette),eventProb:roulette,
   action:()=>{
    S.eventMemory.seen[m.id]=(S.eventMemory.seen[m.id]||0)+1;S.eventMemory.lastYear[m.id]=S.year;
    if(roulette){showEventOutcomeRoller(e[0],c[0],roulette,next);return}
    // Jednowariantowa decyzja nie udaje już losowego "rzutu".
    const effect=c?.[2]?.[0]?.[1]||{};
    applyEffect(effect);const desc=effectDescription(effect);
    showModal("SKUTEK DECYZJI",c[0],`<b>${ensureSentence(desc)}</b>`,[
     {title:"Kontynuuj",desc:"Przejdź do dalszej części sezonu.",action:()=>{addHistory(e[0],`${c[0]}. Skutek: ${desc}.`);closeModal();next()}}
    ]);
   }
  };
 });
 showModal("ZDARZENIE LOSOWE",e[0],e[1],options);
}
function effectiveLeagueTeams(l){
 let teams=l.teams.map(t=>[t[0],t[1]]);
 const playerBase=clubBaseName(S.club);
 if(S.club!=="Szkółka regionalna"&&!teams.some(t=>clubBaseName(t[0])===playerBase)){
  teams=teams.slice(0,-1);
  teams.push([canonicalClubName(S.club),teamData(S.club)?.strength||Math.round(overall()*.85)]);
 }
 return teams;
}
function simulateMatchScore(homeStrength,awayStrength){
 const diff=(homeStrength-awayStrength)*.34+4+rand(-7,7);
 let home=Math.round(45+diff);
 home=clamp(home,30,60);
 let away=90-home;
 return {home,away};
}
function addMatchPoints(rowHome,rowAway,homeScore,awayScore){
 if(homeScore>awayScore){rowHome.pts+=2;rowHome.wins++;rowAway.losses++}
 else if(homeScore<awayScore){rowAway.pts+=2;rowAway.wins++;rowHome.losses++}
 else{rowHome.pts++;rowAway.pts++;rowHome.draws++;rowAway.draws++}
 rowHome.smallFor+=homeScore;rowHome.smallAgainst+=awayScore;
 rowAway.smallFor+=awayScore;rowAway.smallAgainst+=homeScore;
 rowHome.matches++;rowAway.matches++;
}
function generateTable(){
 const l=leagueByName(S.league);if(!l)return null;
 const teams=effectiveLeagueTeams(l).map(([name,strength])=>({
  name,strength,matches:0,pts:0,wins:0,draws:0,losses:0,smallFor:0,smallAgainst:0,bonus:0
 }));
 const byName=Object.fromEntries(teams.map(t=>[t.name,t]));
 const matches=[];
 for(let i=0;i<teams.length;i++){
  for(let j=i+1;j<teams.length;j++){
   const a=teams[i],b=teams[j];
   const aMeta=S.clubMeta?.[a.name]||{},bMeta=S.clubMeta?.[b.name]||{};
   const aStability=(aMeta.promotedYear===S.year-1?-4:0)+((aMeta.consecutivePromotions||0)>=1?-4:0);
   const bStability=(bMeta.promotedYear===S.year-1?-4:0)+((bMeta.consecutivePromotions||0)>=1?-4:0);
   const aBoost=(clubBaseName(a.name)===clubBaseName(S.club)?clamp((overall()-clubRequiredOverall(a.name,l.name))*.24+S.morale*.025+S.loyalty*.015,-5,8):0)+aStability;
   const bBoost=(clubBaseName(b.name)===clubBaseName(S.club)?clamp((overall()-clubRequiredOverall(b.name,l.name))*.24+S.morale*.025+S.loyalty*.015,-5,8):0)+bStability;
   const first=simulateMatchScore(a.strength+aBoost,b.strength+bBoost);
   const second=simulateMatchScore(b.strength+bBoost,a.strength+aBoost);

   // Każdy mecz zawsze sumuje się do 90 małych punktów.
   addMatchPoints(a,b,first.home,first.away);
   addMatchPoints(b,a,second.home,second.away);
   matches.push({home:a.name,away:b.name,homeScore:first.home,awayScore:first.away});
   matches.push({home:b.name,away:a.name,homeScore:second.home,awayScore:second.away});

   let aggregateA=first.home+second.away;
   let aggregateB=first.away+second.home;
   // Aby liga miała stałą sumę dużych punktów, każdy dwumecz ma zdobywcę bonusu.
   // Przy idealnym remisie symulujemy minimalne rozstrzygnięcie 91:89 w rewanżu.
   if(aggregateA===aggregateB){
    if(a.strength+aBoost+rand(-3,3)>=b.strength+bBoost){
     second.away++;second.home--;aggregateA++;aggregateB--;
     const last=matches[matches.length-1];last.awayScore++;last.homeScore--;
     a.smallFor++;a.smallAgainst--;b.smallFor--;b.smallAgainst++;
    }else{
     second.home++;second.away--;aggregateB++;aggregateA--;
     const last=matches[matches.length-1];last.homeScore++;last.awayScore--;
     b.smallFor++;b.smallAgainst--;a.smallFor--;a.smallAgainst++;
    }
   }
   if(aggregateA>aggregateB){a.pts++;a.bonus++}else{b.pts++;b.bonus++}
  }
 }
 const rows=teams.map(t=>({
  ...t,diff:t.smallFor-t.smallAgainst
 })).sort((a,b)=>b.pts-a.pts||b.diff-a.diff||b.smallFor-a.smallFor);
 const pos=rows.findIndex(t=>clubBaseName(t.name)===clubBaseName(S.club))+1;
 const smallBalance=rows.reduce((sum,t)=>sum+t.diff,0);
 const leaguePoints=rows.reduce((sum,t)=>sum+t.pts,0);
 const expectedPoints=(teams.length*(teams.length-1)/2)*5;
 return {rows,pos,league:l.name,club:S.club,matches,smallBalance,leaguePoints,expectedPoints};
}

function clubSeasonScore(name,strength,level){
 const meta=S.clubMeta?.[name]||{};
 let score=strength+rand(-4,4);
 // Beniaminek zwykle potrzebuje czasu na stabilizację.
 if(meta.promotedYear===S.year-1)score-=6;
 // Drugi awans z rzędu jest możliwy, lecz ma być wydarzeniem wyjątkowym.
 if((meta.consecutivePromotions||0)>=1)score-=8;
 if(meta.relegatedYear===S.year-1)score+=2;
 return score;
}
function genericFinalOrder(league){
 let entries=league.teams.map(([name,strength])=>({name,strength,score:clubSeasonScore(name,strength,league.level)}))
  .sort((a,b)=>b.score-a.score);
 const leader=entries[0];
 const meta=S.clubMeta?.[leader.name]||{};
 if((meta.consecutivePromotions||0)>=1&&Math.random()>.08&&entries.length>1){
  // W 92% przypadków klub po świeżym awansie nie zdobywa natychmiast kolejnego.
  [entries[0],entries[1]]=[entries[1],entries[0]];
 }
 return entries.map(x=>x.name);
}
function replaceLeagueTeams(league,names){
 league.teams=names.map((name,index)=>{
  const previous=teamData(name)?.strength||EXPANSION_CLUBS.find(x=>x.name===name)?.strength||50;
  const finishAdjustment=index===0?1:index===names.length-1?-1:0;
  const targetBaseline=league.level===1?79:league.level===2?68:56;
  const regression=(targetBaseline-previous)*.08;
  return [name,clamp(Math.round(previous+finishAdjustment+regression),40,91)];
 });
}
function resolveBarrage(upperClub,lowerClub){
 const tie=simulateTwoLegTie(upperClub,lowerClub,0,0,1);
 return {winner:tie.winner,loser:tie.loser,tie};
}
function rotateLeagueSystem(playerTable,playerPlayoffs){
 const e=LEAGUES.find(l=>l.level===1),m=LEAGUES.find(l=>l.level===2),k=LEAGUES.find(l=>l.level===3);
 const orders={};
 for(const league of LEAGUES){
  if(league.name===playerTable.league)orders[league.level]=playerPlayoffs.finalOrder.slice();
  else orders[league.level]=genericFinalOrder(league);
 }
 const eOrder=orders[1],mOrder=orders[2],kOrder=orders[3];
 S.worldLeagueArchive??={};
 const archive={};
 for(const league of LEAGUES){
  (orders[league.level]||[]).forEach((name,index)=>{
   const base=clubBaseName(name),displayName=clubDisplayName(base);
   archive[base]={club:name,displayName,league:league.name,level:league.level,position:index+1};
   S.clubNameHistory??={};S.clubNameHistory[displayName]=base;
   S.clubMeta[name]??={};
   S.clubMeta[name].lastPosition=index+1;
   S.clubMeta[name].lastLeague=league.name;
   S.clubMeta[name].lastSeasonYear=S.year;
  });
 }
 S.worldLeagueArchive[S.year]=archive;
 const directDownE=eOrder[eOrder.length-1],barrageE=eOrder[eOrder.length-2];
 const polishPromotionCandidates=mOrder.filter(name=>!isForeignPolishLeagueClub(name));
 const directUpM=polishPromotionCandidates[0]||mOrder[0];
 const barrageM=polishPromotionCandidates[1]||mOrder.find(name=>name!==directUpM)||mOrder[1];
 const directDownM=mOrder[mOrder.length-1];
 const directUpK=kOrder[0];
 const barrageResult=resolveBarrage(barrageE,barrageM);
 const barrageWinner=barrageResult.winner;
 const barrageLoser=barrageResult.loser;
 const foreignM2EAhead=name=>mOrder.filter((club,index)=>index<mOrder.indexOf(name)&&isForeignPolishLeagueClub(club));
 const directArchive=archive[clubBaseName(directUpM)];
 if(directArchive){directArchive.promotionRoute="direct";directArchive.foreignAhead=foreignM2EAhead(directUpM).map(name=>({name,position:mOrder.indexOf(name)+1}))}
 if(barrageWinner===barrageM){const a=archive[clubBaseName(barrageM)];if(a){a.promotionRoute="barrage";a.foreignAhead=foreignM2EAhead(barrageM).map(name=>({name,position:mOrder.indexOf(name)+1}))}}

 let nextE=eOrder.filter(x=>x!==directDownE&&x!==barrageE);
 nextE.push(directUpM,barrageWinner);
 let nextM=mOrder.filter(x=>x!==directUpM&&x!==barrageM&&x!==directDownM);
 nextM.push(directDownE,barrageLoser,directUpK);
 let nextK=kOrder.filter(x=>x!==directUpK);
 nextK.push(directDownM);

 // Deduplicate defensively and preserve nominal sizes.
 nextE=[...new Set(nextE)].slice(0,8);
 nextM=[...new Set(nextM)].slice(0,8);
 nextK=[...new Set(nextK)];

 const previousLevels={};
 for(const league of LEAGUES)for(const [name] of league.teams)previousLevels[name]=league.level;

 replaceLeagueTeams(e,nextE);
 replaceLeagueTeams(m,nextM);
 replaceLeagueTeams(k,nextK);

 for(const league of LEAGUES){
  for(const [name] of league.teams){
   const oldLevel=previousLevels[name]||league.level;
   const meta=S.clubMeta[name]||{level:oldLevel,lastLevel:oldLevel,promotedYear:null,relegatedYear:null,consecutivePromotions:0};
   meta.lastLevel=oldLevel;
   meta.level=league.level;
   meta.currentLeague=league.name;
   if(league.level<oldLevel){
    meta.promotedYear=S.year;
    meta.consecutivePromotions=(meta.consecutivePromotions||0)+1;
   }else if(league.level>oldLevel){
    meta.relegatedYear=S.year;
    meta.consecutivePromotions=0;
   }else if(meta.promotedYear!==S.year-1){
    meta.consecutivePromotions=0;
   }
   S.clubMeta[name]=meta;
  }
 }
 syncWorld();

 const oldLeague=S.league;
 const newLeague=clubLeagueName(S.club)||oldLeague;
 S.league=newLeague;
 const barrageText=barrageWinner===barrageM
  ?`${barrageM} wygrywa baraż z ${barrageE} i awansuje do PGE Ekstraligi.`
  :`${barrageE} broni miejsca w PGE Ekstralidze w barażu z ${barrageM}.`;
 const foreignBlocked=mOrder.filter((name,index)=>isForeignPolishLeagueClub(name)&&index<=Math.max(mOrder.indexOf(directUpM),mOrder.indexOf(barrageM)));
 const successionText=foreignBlocked.length?`${foreignBlocked.map(name=>`${mOrder.indexOf(name)+1}. miejsce zajął klub zagraniczny ${name} — bez prawa awansu do PGE Ekstraligi`).join("; ")}. Obowiązuje sukcesja miejsc. `:"";
 addHistory("Rotacja lig",
  `${successionText}${directUpM} awansuje bezpośrednio do PGE Ekstraligi, ${directDownE} spada do M2E. ${barrageText} ${directUpK} awansuje do M2E, a ${directDownM} spada do KLŻ.`);
 return {directUpM,directDownE,barrageE,barrageM,barrageWinner,barrageLoser,barrageTie:barrageResult.tie,directUpK,directDownM,foreignBlocked};
}
function worldClubEvent(next){
 if(S.year<S.nextWorldEventYear){next();return}
 S.nextWorldEventYear=S.year+rand(2,4);
 const k=LEAGUES.find(l=>l.level===3);
 const existing=new Set(LEAGUES.flatMap(l=>l.teams.map(t=>t[0])));
 const candidates=EXPANSION_CLUBS.filter(c=>!existing.has(c.name));
 if(!candidates.length){next();return}
 const club=pick(candidates);
 let replaced=null;
 if(k.teams.length>=8){
  const removable=k.teams.slice().sort((a,b)=>a[1]-b[1]).filter(t=>t[0]!==S.club);
  if(removable.length&&Math.random()<.55){
   replaced=removable[0][0];
   k.teams=k.teams.filter(t=>t[0]!==replaced);
  }else{next();return}
 }
 k.teams.push([club.name,club.strength]);
 syncWorld();
 const foreignEntry=club.type==="powrót zagraniczny"||club.type==="dołączenie zagraniczne";
 const title=club.type==="reaktywacja"?`Powrót żużla w ${club.city}`:club.type==="powrót zagraniczny"?`Wittstock wraca do polskich rozgrywek`:club.type==="dołączenie zagraniczne"?`Pardubice chcą jeździć w Polsce`:`Nowa sekcja żużlowa w ${club.city}`;
 const text=club.type==="reaktywacja"
  ?`${club.name} zostaje reaktywowany i otrzymuje miejsce w Krajowej Lidze Żużlowej.${replaced?` Z rozgrywek wycofuje się ${replaced}.`:""}`
  :foreignEntry
   ?`${club.name} zostaje przyjęty do Krajowej Ligi Żużlowej. Klub może w przyszłości awansować do Metalkas 2. Ekstraligi, ale nie do PGE Ekstraligi.${replaced?` Z rozgrywek wycofuje się ${replaced}.`:""}`
   :`W ${club.city} powstaje sekcja żużlowa. Klub ${club.name} buduje stadion i zostaje przyjęty do KLŻ.${replaced?` Z rozgrywek wycofuje się ${replaced}.`:""}`;
 showModal("WYDARZENIE W ŚWIECIE ŻUŻLA",title,text,[
  {title:"Kontynuuj",desc:"Zmiana zostaje zapisana w składzie ligi na kolejny sezon.",action:()=>{addHistory(title,text);closeModal();next()}}
 ]);
}
function adjustLeague(outcome){
 if(outcome==="awans"){
  const current=leagueByName(S.league),target=LEAGUES.find(l=>l.level===current.level-1);
  if(target){S.league=target.name;addHistory("Awans drużyny",`${S.club} awansuje do ${target.name}.`)}
 }else if(outcome==="spadek"){
  const current=leagueByName(S.league),target=LEAGUES.find(l=>l.level===current.level+1);
  if(target){S.league=target.name;addHistory("Spadek drużyny",`${S.club} spada do ${target.name}.`)}
 }
}

function simulateTwoLegTie(teamA,teamB,advantageA=0,seedA=999,seedB=999){
 const played=S.playedPostseasonTie;
 const samePlayed=played&&played.year===S.year&&played.league===S.league&&(
  (clubBaseName(teamA)===clubBaseName(played.club)&&clubBaseName(teamB)===clubBaseName(played.opponent))||
  (clubBaseName(teamB)===clubBaseName(played.club)&&clubBaseName(teamA)===clubBaseName(played.opponent))
 );
 if(samePlayed){
  const playerIsA=clubBaseName(teamA)===clubBaseName(played.club);
  const totalA=playerIsA?played.totalOur:played.totalOpponent;
  const totalB=playerIsA?played.totalOpponent:played.totalOur;
  const tied=totalA===totalB;
  const winner=tied?(seedA<=seedB?teamA:teamB):(totalA>totalB?teamA:teamB);
  const first=playerIsA
   ?{home:played.firstLeg.opponentScore,away:played.firstLeg.ourScore}
   :{home:played.firstLeg.ourScore,away:played.firstLeg.opponentScore};
  const second=playerIsA
   ?{home:played.secondLeg.ourScore,away:played.secondLeg.opponentScore}
   :{home:played.secondLeg.opponentScore,away:played.secondLeg.ourScore};
  return {teamA,teamB,winner,loser:winner===teamA?teamB:teamA,totalA,totalB,first,second,tied,tieBreak:tied?"wyższe miejsce po fazie zasadniczej":null,interactive:true};
 }
 const sa=(teamData(teamA)?.strength||65)+(clubBaseName(teamA)===clubBaseName(S.club)?advantageA:0);
 const sb=(teamData(teamB)?.strength||65)+(clubBaseName(teamB)===clubBaseName(S.club)?advantageA:0);
 const first=simulateMatchScore(sb,sa),second=simulateMatchScore(sa,sb);
 const totalA=first.away+second.home,totalB=first.home+second.away,tied=totalA===totalB;
 const winner=tied?(seedA<=seedB?teamA:teamB):(totalA>totalB?teamA:teamB);
 return {teamA,teamB,winner,loser:winner===teamA?teamB:teamA,totalA,totalB,first,second,tied,tieBreak:tied?"wyższe miejsce po fazie zasadniczej":null};
}
function tieSummary(tie){return `${tie.totalA}:${tie.totalB}${tie.tied?" — awans dzięki wyższemu miejscu po fazie zasadniczej":""}`}
function chooseOpponent(pool,ranked){
 return pool.slice().sort((a,b)=>(teamData(a)?.strength||60)-(teamData(b)?.strength||60))[0]||ranked[ranked.length-1];
}
function simulatePlayoffs(table,keyHeatBoost=0){
 const ranked=table.rows.map(r=>r.name);
 const level=leagueByName(table.league)?.level||3;
 let finalOrder=[...ranked],summary=[],userStage="poza fazą finałową",outcome="utrzymanie";

 if(level===3){
  const top=ranked.slice(0,4);
  if(!top.some(name=>clubBaseName(name)===clubBaseName(S.club)))return {finalOrder,summary,userStage,outcome};
  const seed=name=>ranked.indexOf(name);
  const semi1=simulateTwoLegTie(top[0],top[3],keyHeatBoost,seed(top[0]),seed(top[3]));
  const semi2=simulateTwoLegTie(top[1],top[2],keyHeatBoost,seed(top[1]),seed(top[2]));
  const final=simulateTwoLegTie(semi1.winner,semi2.winner,keyHeatBoost,seed(semi1.winner),seed(semi2.winner));
  finalOrder=[final.winner,final.loser,semi1.loser,semi2.loser,...ranked.slice(4)];
  summary=[`Półfinał: ${semi1.teamA} – ${semi1.teamB} ${semi1.totalA}:${semi1.totalB}`,`Półfinał: ${semi2.teamA} – ${semi2.teamB} ${semi2.totalA}:${semi2.totalB}`,`Finał: ${final.teamA} – ${final.teamB} ${final.totalA}:${final.totalB}`];
  const fp=finalOrder.findIndex(name=>clubBaseName(name)===clubBaseName(S.club))+1;
  userStage=fp===1?"zwycięstwo w finale":fp===2?"finał":fp<=4?"półfinał":"poza play-off";
  outcome=fp===1?"awans":"utrzymanie";
  return {finalOrder,summary,userStage,outcome};
 }

 const top=ranked.slice(0,4),bottom=ranked.slice(4,8);
 const topChoice=chooseOpponent(top.slice(1),ranked);
 const topOther=top.slice(1).filter(x=>x!==topChoice);
 const seed=name=>ranked.indexOf(name);
 const po1=simulateTwoLegTie(top[0],topChoice,keyHeatBoost,seed(top[0]),seed(topChoice));
 const po2=simulateTwoLegTie(topOther[0],topOther[1],keyHeatBoost,seed(topOther[0]),seed(topOther[1]));
 const championship=simulateTwoLegTie(po1.winner,po2.winner,keyHeatBoost,seed(po1.winner),seed(po2.winner));
 let third;
 if(level===1)third=simulateTwoLegTie(po1.loser,po2.loser,keyHeatBoost,seed(po1.loser),seed(po2.loser));

 const bottomChoice=chooseOpponent(bottom.slice(1),ranked);
 const bottomOther=bottom.slice(1).filter(x=>x!==bottomChoice);
 const pd1=simulateTwoLegTie(bottom[0],bottomChoice,keyHeatBoost,seed(bottom[0]),seed(bottomChoice));
 const pd2=simulateTwoLegTie(bottomOther[0],bottomOther[1],keyHeatBoost,seed(bottomOther[0]),seed(bottomOther[1]));
 const survival=simulateTwoLegTie(pd1.loser,pd2.loser,keyHeatBoost,seed(pd1.loser),seed(pd2.loser));

 let places1to4;
 if(level===1)places1to4=[championship.winner,championship.loser,third.winner,third.loser];
 else places1to4=[championship.winner,championship.loser,po1.loser,po2.loser].sort((a,b)=>{
  if(a===championship.winner)return -1;if(b===championship.winner)return 1;
  if(a===championship.loser)return -1;if(b===championship.loser)return 1;
  return ranked.indexOf(a)-ranked.indexOf(b);
 });
 const winnersDown=[pd1.winner,pd2.winner].sort((a,b)=>ranked.indexOf(a)-ranked.indexOf(b));
 finalOrder=[...places1to4,...winnersDown,survival.winner,survival.loser];
 summary=[
  `Play-off: ${po1.teamA} – ${po1.teamB} ${po1.totalA}:${po1.totalB}`,
  `Play-off: ${po2.teamA} – ${po2.teamB} ${po2.totalA}:${po2.totalB}`,
  `Finał: ${championship.teamA} – ${championship.teamB} ${championship.totalA}:${championship.totalB}`,
  `Play-down: ${pd1.teamA} – ${pd1.teamB} ${pd1.totalA}:${pd1.totalB}`,
  `Play-down: ${pd2.teamA} – ${pd2.teamB} ${pd2.totalA}:${pd2.totalB}`,
  `Dwumecz o utrzymanie: ${survival.teamA} – ${survival.teamB} ${survival.totalA}:${survival.totalB}`
 ];
 const fp=finalOrder.findIndex(name=>clubBaseName(name)===clubBaseName(S.club))+1;
 if(fp===1)userStage="mistrzostwo / awans";
 else if(fp===2)userStage="finał";
 else if(fp<=4)userStage="play-off";
 else if(fp<=6)userStage="wygrany play-down";
 else userStage="dwumecz o utrzymanie";
 if(level===2&&fp===1)outcome="awans";
 else if(level===2&&fp===8)outcome="spadek";
 else if(level===1&&fp===8)outcome="spadek";
 else outcome="utrzymanie";
 return {finalOrder,summary,userStage,outcome};
}


function createImportantTieContext(opponent){
 const ownStrength=teamData(S.club)?.strength||leagueBaseline(S.league);
 const oppStrength=teamData(opponent)?.strength||leagueBaseline(S.league);
 // Kluczowy mecz fazy finałowej traktujemy jako rewanż. Pierwszy mecz jest
 // symulowany wcześniej, dzięki czemu gracz zna faktyczną sytuację dwumeczu.
 const firstLeg=simulateMatchScore(oppStrength,ownStrength);
 return {
  leg:2,
  firstLeg:{
   ourScore:firstLeg.away,
   opponentScore:firstLeg.home,
   display:`${clubDisplayName(opponent)} ${firstLeg.home}:${firstLeg.away} ${clubDisplayName(S.club)}`
  }
 };
}
function importantMatchScoreContext(ctx){
 const match=`${clubDisplayName(S.club)} ${ctx.teamScore}:${ctx.opponentScore} ${clubDisplayName(ctx.opponent)}`;
 if(!ctx.tieContext?.firstLeg)return {match,aggregate:"",note:""};
 const ourAgg=ctx.tieContext.firstLeg.ourScore+ctx.teamScore;
 const oppAgg=ctx.tieContext.firstLeg.opponentScore+ctx.opponentScore;
 const diff=ourAgg-oppAgg;
 let note=diff>0?`W dwumeczu prowadzicie ${diff} pkt.`:diff<0?`W dwumeczu przegrywacie ${Math.abs(diff)} pkt.`:"W dwumeczu jest remis.";
 return {match,aggregate:`Dwumecz: ${ourAgg}:${oppAgg}`,note};
}
function importantMomentStillRelevant(ctx){
 const sc=importantMatchScoreContext(ctx);
 if(!ctx.tieContext?.firstLeg)return Math.abs(ctx.teamScore-ctx.opponentScore)<=12;
 const ourAgg=ctx.tieContext.firstLeg.ourScore+ctx.teamScore;
 const oppAgg=ctx.tieContext.firstLeg.opponentScore+ctx.opponentScore;
 // Przy 3-4 biegach do końca kilkanaście punktów nadal jest odrabialne,
 // ale 15+ oznacza zwykle, że nie ma już sensu zatrzymywać gracza.
 return Math.abs(ourAgg-oppAgg)<=14;
}

function playableMatchStage(table){
 const pos=table.pos||8;
 const level=leagueByName(table.league)?.level||3;
 if(level===3){
  return {
   label:"decydujący mecz play-off o awans",
   effect:"wynik może bezpośrednio wpłynąć na walkę o awans",
   stakes:"awans"
  };
 }
 if(pos<=4){
  return {
   label:level===1?"decydujący mecz fazy medalowej":"decydujący mecz play-off o awans",
   effect:level===1?"wynik może przesądzić o medalu":"wynik może przesądzić o awansie",
   stakes:level===1?"medal":"awans"
  };
 }
 return {
  label:"decydujący mecz o utrzymanie",
  effect:"wynik może przesądzić o utrzymaniu lub spadku",
  stakes:"utrzymanie"
 };
}
function heatClassificationHtml(){
 // Klasyfikacji czterech zawodników celowo nie pokazujemy.
 return "";
}
function decisiveRideHeats(size){
 if(size>=5)return [10,13,15];
 if(size===4)return [11,14];
 return [12,15];
}

function importantMatchEligibility(table){
 const regularPos=table.pos;
 const level=leagueByName(table.league)?.level||3;
 const inFinalPhase=level===3?regularPos<=4:(regularPos<=4||regularPos>=7);
 const established=S.age>=17&&S.season.matches>=5&&S.chance>=52&&overall()>=58;
 const trusted=S.clubRelation+difficultyClubTolerance()>=36||S.reputation>=18;
 const stage=playableMatchStage(table);
 const stakesBonus=stage.stakes==="medal"?12:stage.stakes==="awans"?10:8;
 const chance=clamp(46+stakesBonus+(S.chance-55)*.35+(S.reputation-20)*.12+(overall()-62)*.18,42,88);
 return {eligible:inFinalPhase&&established&&trusted&&Math.random()*100<chance,stage,chance};
}

function riderProgramSize(){
 if(S.chance>=88&&overall()>=78)return 5;
 if(S.chance>=70&&overall()>=65)return 4;
 return 3;
}
function scheduledRideHeats(size){
 if(S.age<=21){
  if(size>=5)return [2,5,8,11,13];
  if(size===4)return [2,6,10,13];
  return [2,8,12];
 }
 if(size>=5)return [1,5,8,11,13];
 if(size===4)return [2,6,10,13];
 return [3,8,12];
}
function roleRider(baseStrength,role,seed,league){
 const deltas={lider:8,senior:2,u24:-3,junior:-11,rezerwowy:-12};
 const r=generatedRider(baseStrength+(deltas[role]||0),seed,league);
 r.role=role;
 r.rating=clamp(Math.round(r.rating+rand(-3,3)),48,96);
 return r;
}
function createTeamRosters(opponent){
 const ownStrength=teamData(S.club)?.strength||leagueBaseline(S.league);
 const oppStrength=teamData(opponent)?.strength||leagueBaseline(S.league);
 const own=[
  {name:S.name,rating:overall(),player:true,role:S.age<=21?"junior":S.age<=24?"u24":"senior"},
  roleRider(ownStrength,"lider",1,S.league),roleRider(ownStrength,"senior",2,S.league),
  roleRider(ownStrength,"senior",3,S.league),roleRider(ownStrength,"u24",4,S.league),
  roleRider(ownStrength,"junior",5,S.league),roleRider(ownStrength,"junior",6,S.league)
 ];
 const away=[
  roleRider(oppStrength,"lider",20,S.league),roleRider(oppStrength,"senior",21,S.league),
  roleRider(oppStrength,"senior",22,S.league),roleRider(oppStrength,"u24",23,S.league),
  roleRider(oppStrength,"junior",24,S.league),roleRider(oppStrength,"junior",25,S.league),
  roleRider(oppStrength,"rezerwowy",26,S.league)
 ];
 return {own,away};
}
function createMatchContext(opponent){
 const program=scheduledRideHeats(riderProgramSize());
 const rosters=createTeamRosters(opponent);
 const tieContext=createImportantTieContext(opponent);
 return {
  opponent,tieContext,teamScore:0,opponentScore:0,completedHeats:0,program,rideIndex:0,points:0,bonus:0,results:[],scoreTokens:[],
  nominated:false,nominatedHeat:null,rosters,withdrawn:false,heatLog:[]
 };
}
function pairForHeat(ctx,heatNo,isPlayerHeat=false){
 const own=ctx.rosters.own,away=ctx.rosters.away;
 const playerHeatIndex=Math.max(0,ctx.program.indexOf(heatNo));
 if(isPlayerHeat&&S.age<=21&&heatNo===2){
  // Bieg 2 jest biegiem juniorskim: po dwóch zawodników U21 z każdej drużyny.
  const partner=own[5]||own[6];
  return {own:[own[0],partner],away:[away[4],away[5]]};
 }
 const partnerCycle=[1,2,4,1,3,2];
 const rivalPairs=[[4,1],[5,2],[3,0],[6,2],[4,0],[5,1]];
 if(isPlayerHeat){
  const partner=own[partnerCycle[playerHeatIndex%partnerCycle.length]];
  const pair=rivalPairs[playerHeatIndex%rivalPairs.length];
  return {own:[own[0],partner],away:[away[pair[0]],away[pair[1]]]};
 }
 return {own:[own[(heatNo*2)%6+1],own[(heatNo*2+2)%6+1]],away:[away[(heatNo*3)%7],away[(heatNo*3+2)%7]]};
}
function raceBaseScore(rider,context={}){
 return rider.rating+rand(-10,10)+(Math.random()<.035?rand(-10,10):0)+(rider.form||0);
}

function decisionTacticalBonus(choice,rivals,phase="start",teammate=null,context={}){
 const optimal=suggestedRaceOption(rivals,phase,teammate,context),q=context.advice?.quality||mentorAdviceQuality();
 if(choice===optimal)return q.bonus||2;
 if(context.advice?.suggested===choice&&context.advice?.suggested!==optimal)return -.5;
 return 0;
}

function playerPhaseScore(mode,phase,context={}){
 const o=overall();let raw=0;
 if(phase==="start"){
  if(mode==="attack")raw=S.skills.starts*.42+S.skills.corner*.28+S.skills.mental*.10+S.equipment*.08+o*.12+rand(-8,9);
  else if(mode==="inside")raw=S.skills.corner*.34+S.skills.starts*.25+S.skills.technique*.18+o*.15+rand(-7,8);
  else if(mode==="outside")raw=S.skills.distance*.24+S.skills.starts*.22+S.skills.corner*.21+S.skills.technique*.18+o*.15+rand(-8,10);
  else raw=S.skills.mental*.26+S.skills.starts*.24+S.skills.corner*.20+o*.22+rand(-6,7);
 }else{
  if(mode==="outside")raw=S.skills.distance*.28+S.skills.overtaking*.26+S.skills.technique*.20+S.skills.mental*.10+o*.16+rand(-8,10);
  else if(mode==="inside")raw=S.skills.technique*.28+S.skills.corner*.24+S.skills.overtaking*.16+S.skills.setup*.14+o*.18+rand(-7,8);
  else if(mode==="attack")raw=S.skills.overtaking*.28+S.skills.distance*.23+S.skills.mental*.17+S.skills.technique*.15+o*.17+rand(-9,10);
  else if(mode==="team")raw=S.skills.mental*.24+S.skills.technique*.22+S.skills.distance*.17+S.skills.corner*.15+o*.22+rand(-6,7);
  else raw=S.skills.mental*.29+S.skills.technique*.23+S.skills.distance*.17+o*.24+rand(-5,6);
 }
 return raw+seasonalFormModifier()*.45+ensureDayForm("race",context.dayToken||`${S.year}:race`).modifier*.60+(context.tacticalBonus||0);
}
function mentorAdviceQuality(){
 const active=S.activeMentor?.year===S.year?S.activeMentor:null;
 if(!active)return {source:"Trener",accuracy:.59,tier:"trainer",bonus:1.5};
 const map={
  local:{accuracy:.68,bonus:2.5},
  regional:{accuracy:.76,bonus:3.2},
  elite:{accuracy:.87,bonus:4.3},
  star:{accuracy:.94,bonus:5.2}
 };
 return {source:`Mentor ${active.name}`,tier:active.tier,...(map[active.tier]||map.local)};
}
function suggestedRaceOption(rivals,phase="start",teammate=null,context={}){
 const choices=phase==="start"?["attack","inside","outside","safe"]:["attack","inside","outside",...(teammate?["team"]:[]),"safe"];
 const avgRival=(rivals||[]).reduce((s,r)=>s+(r.rating||80),0)/Math.max(1,(rivals||[]).length);
 const track=context.track||trackProfileForClub(S.club);
 let best="safe",bestValue=-Infinity;
 for(const choice of choices){
  let val=0;
  if(phase==="start"){
   if(choice==="attack")val=S.skills.starts*.52+S.skills.corner*.27+S.skills.mental*.12+S.equipment*.05;
   if(choice==="inside")val=S.skills.corner*.40+S.skills.technique*.28+S.skills.starts*.22+S.skills.mental*.08;
   if(choice==="outside")val=S.skills.distance*.28+S.skills.corner*.24+S.skills.technique*.24+S.skills.overtaking*.16;
   if(choice==="safe")val=S.skills.mental*.38+S.skills.starts*.22+S.skills.technique*.20+S.skills.setup*.12;
  }else{
   if(choice==="attack")val=S.skills.overtaking*.38+S.skills.distance*.26+S.skills.mental*.18+S.skills.technique*.10;
   if(choice==="inside")val=S.skills.technique*.35+S.skills.corner*.30+S.skills.overtaking*.18+S.skills.setup*.10;
   if(choice==="outside")val=S.skills.distance*.36+S.skills.overtaking*.30+S.skills.technique*.18+S.skills.corner*.08;
   if(choice==="team")val=teammate?S.skills.mental*.26+S.skills.technique*.22+S.skills.distance*.16+(teammate.rating||70)*.24:-999;
   if(choice==="safe")val=S.skills.mental*.40+S.skills.technique*.24+S.skills.distance*.14+S.skills.setup*.12;
  }
  if(track?.skill){
   const match={starts:"attack",corner:"inside",distance:"outside",technique:"inside",overtaking:"attack",setup:"safe",mental:"safe",fitness:"outside"}[track.skill];
   if(choice===match)val+=5;
  }
  if(avgRival>overall()+6&&choice==="safe")val+=3;
  if(avgRival<overall()-5&&choice==="attack")val+=2;
  if(val>bestValue){bestValue=val;best=choice}
 }
 return best;
}
function raceAdviceText(rivals,phase="start",teammate=null,context={}){
 if(context.advice?.phase===phase&&context.advice?.html)return context.advice.html;
 const q=mentorAdviceQuality(),allowed=mentorAllowedAdviceKeys(phase,teammate,context);
 let correct=suggestedRaceOption(rivals,phase,teammate,context);
 if(!allowed.includes(correct)){
  const sit=teamRaceSituation(context);
  correct=sit.teammateAhead&&allowed.includes("team")?"team":allowed.includes("safe")?"safe":allowed[0];
 }
 const alternatives=allowed.filter(x=>x!==correct);
 const suggested=Math.random()<q.accuracy||!alternatives.length?correct:pick(alternatives);
 const precision=q.accuracy>=.9?"Jest niemal pewien, że warto":q.accuracy>=.82?"Wyraźnie sugeruje":q.accuracy>=.70?"Podpowiada":"Sugeruje, by";
 const html=`<p class="race-advice"><b>${q.source}:</b> ${precision} ${mentorAdviceLabel(suggested,phase,context)}.</p>`;
 context.advice={suggested,correct,quality:q,phase,html};
 return html;
}


const MINOR_INJURIES=[
 {name:"stłuczenie barku",weeks:[0,1],severity:"drobny"},{name:"lekki uraz nadgarstka",weeks:[0,2],severity:"drobny"},
 {name:"stłuczenie żeber",weeks:[1,2],severity:"drobny"},{name:"naciągnięcie mięśnia",weeks:[1,2],severity:"drobny"},
 {name:"lekki uraz kolana",weeks:[0,2],severity:"drobny"}
];
const MODERATE_INJURIES=[
 {name:"skręcenie nadgarstka",weeks:[2,4],severity:"umiarkowany"},{name:"uraz barku",weeks:[2,5],severity:"umiarkowany"},
 {name:"pęknięcie żebra",weeks:[2,5],severity:"umiarkowany"},{name:"skręcenie stawu skokowego",weeks:[2,4],severity:"umiarkowany"},
 {name:"uraz dłoni",weeks:[1,4],severity:"umiarkowany"}
];

const SERIOUS_INJURIES=[
 {name:"złamanie obojczyka",weeks:[5,10],severity:2,skills:["fitness"],loss:[0,1]},
 {name:"złamanie nogi",weeks:[10,20],severity:4,skills:["fitness","starts"],loss:[1,2]},
 {name:"poważny uraz barku",weeks:[8,16],severity:3,skills:["technique","fitness"],loss:[0,2]}
];
const CATASTROPHIC_INJURIES=[
 {name:"poważny uraz kręgosłupa",weeks:[16,32],severity:6,skills:["fitness","mental","distance"],loss:[2,4],potentialLoss:[1,3]},
 {name:"wielonarządowe obrażenia po bardzo ciężkim upadku",weeks:[22,40],severity:7,skills:["fitness","distance","mental","technique"],loss:[2,4],potentialLoss:[2,4]}
];
function ensureHealthStats(){
 S.healthStats??={injuries:0,seriousInjuries:0,weeksMissed:0,leagueMatchesMissed:0,individualEventsMissed:0,history:[]};
 S.careerStats??={};
 const legacy=Number(S.careerStats.injuries||0);
 if(legacy>S.healthStats.injuries)S.healthStats.injuries=legacy;
 S.careerStats.injuries=S.healthStats.injuries;
}
function injuryTreatmentOptions(injury){return [
 {title:"Agresywna rehabilitacja",weeks:.78,risk:7,skill:1.15,cost:12000},
 {title:"Pełna rehabilitacja",weeks:1.10,risk:-5,skill:.70,cost:8000},
 {title:"Specjalistyczna klinika",weeks:.88,risk:-7,skill:.55,cost:55000}
]}

function injuryRiskMultiplier(){
 const age=S.age>=36?1.22:S.age>=31?1.10:1,tech=facilityLevel("technical"),rec=facilityLevel("recovery");
 return clamp(age*(1+(S.injuryRisk-4)*.035)*(1-tech*.045)*(1-rec*.055),.62,1.85);
}
function racingInjuryFromExposure(heats,{context="sezon",maxInjuries=1}={}){
 ensureHealthStats();if(!heats||heats<=0)return {injuries:[],weeks:0,matchesMissed:0};
 const perHeat=.0047*injuryRiskMultiplier(),lambda=heats*perHeat;
 let count=0;for(let i=0;i<maxInjuries;i++)if(Math.random()<1-Math.exp(-lambda/(i+1)))count++;
 const injuries=[];
 for(let i=0;i<count;i++){
  const r=Math.random();let data;
  if(r<.001){const x=pick(CATASTROPHIC_INJURIES);data=applySeriousInjury(x,injuryTreatmentOptions(x)[1])}
  else if(r<.007){const x=pick(SERIOUS_INJURIES);data=applySeriousInjury(x,injuryTreatmentOptions(x)[1])}
  else if(r<.23){const x=pick(MODERATE_INJURIES);data=recordInjury(x.name,rand(x.weeks[0],x.weeks[1]),"umiarkowany")}
  else{const x=pick(MINOR_INJURIES);data=recordInjury(x.name,rand(x.weeks[0],x.weeks[1]),"drobny")}
  injuries.push(data);addHistory("Uraz po upadku",`${context}: ${data.name}${data.weeks?` — ${data.weeks} tyg. przerwy`:" — bez opuszczania startów"}.`);
 }
 return {injuries,weeks:injuries.reduce((s,x)=>s+(x.weeks||0),0),matchesMissed:injuries.reduce((s,x)=>s+(x.matchesMissed||0),0)};
}
function postCompetitionHealthExposure(result){
 if(!result||result.healthExposureApplied)return "";result.healthExposureApplied=true;
 const heats=Number(result.healthExposureHeats||result.heats||0);if(!heats)return "";
 const before=S.healthStats?.injuries||0,health=racingInjuryFromExposure(heats,{context:result.name,maxInjuries:1});
 if(!health.injuries.length)return "";
 return ` Po zawodach: ${health.injuries.map(x=>`${x.name}${x.weeks?` (${x.weeks} tyg.)`:""}`).join(", ")}.`;
}

function recordInjury(name,weeks,severity="drobny"){
 ensureHealthStats();
 const rec=facilityLevel("recovery"),adjusted=Math.max(0,Math.round(weeks*(1-rec*.08)));
 const matchesMissed=adjusted?clamp(Math.round(adjusted/2.2),0,6):0;
 const eventsMissed=adjusted>=2?clamp(Math.round(adjusted/4.5),0,3):0;
 const data={year:S.year,name,weeks:adjusted,matchesMissed,eventsMissed,severity};
 S.healthStats.injuries++;S.careerStats.injuries=S.healthStats.injuries;
 S.healthStats.weeksMissed+=adjusted;S.healthStats.leagueMatchesMissed+=matchesMissed;S.healthStats.individualEventsMissed+=eventsMissed;
 S.healthStats.history.push(data);if(adjusted>0)S.injuryAbsence=data;
 addHistory("Uraz",`${name}${adjusted?` — ${adjusted} tyg. przerwy`:" — bez przerwy w startach"}.`);
 return data;
}

function applySeriousInjury(injury,treatment){
 ensureHealthStats();
 const rec=facilityLevel("recovery"),weeks=Math.max(3,Math.round(rand(injury.weeks[0],injury.weeks[1])*treatment.weeks*([1,.94,.86,.78][rec]||1)));
 const matchesMissed=clamp(Math.round(weeks/2.2),1,14),eventsMissed=clamp(Math.round(weeks/5),0,6);
 S.budget-=treatment.cost;S.injuryRisk=clamp(S.injuryRisk+treatment.risk+injury.severity*2-rec*2,0,100);
 S.healthStats.injuries++;S.careerStats.injuries=S.healthStats.injuries;S.healthStats.seriousInjuries++;S.healthStats.weeksMissed+=weeks;S.healthStats.leagueMatchesMissed+=matchesMissed;S.healthStats.individualEventsMissed+=eventsMissed;
 const losses=[];
 for(const key of injury.skills){if(Math.random()<treatment.skill*Math.max(.45,1-rec*.16)){const loss=rand(injury.loss[0],injury.loss[1]);if(loss){S.skills[key]=Math.max(40,S.skills[key]-loss);losses.push(`${SKILLS[key]} -${loss}`)}}}
 let potentialLoss=0;
 if(injury.potentialLoss){potentialLoss=rand(injury.potentialLoss[0],injury.potentialLoss[1]);careerDNA().potential=clamp(careerDNA().potential-potentialLoss,60,99);careerDNA().majorInjuryShock={untilYear:S.year+rand(1,2),severity:"bardzo ciężka"};}
 else if(injury.severity>=4&&Math.random()<.24){potentialLoss=1;careerDNA().potential=clamp(careerDNA().potential-1,60,99);careerDNA().majorInjuryShock={untilYear:S.year+1,severity:"ciężka"};}
 const data={year:S.year,name:injury.name,weeks,matchesMissed,eventsMissed,treatment:treatment.title,losses,potentialLoss,severity:injury.potentialLoss?"bardzo ciężki":"ciężki"};S.healthStats.history.push(data);S.injuryAbsence=data;
 addHistory(injury.potentialLoss?"Bardzo ciężka kontuzja":"Poważna kontuzja",`${injury.name}. ${weeks} tygodni przerwy; opuszczone mecze: ${matchesMissed}, imprezy indywidualne: ${eventsMissed}. Leczenie: ${treatment.title}.${losses.length?` Skutki: ${losses.join(", ")}.`:""}${potentialLoss?` Potencjał kariery spada o ${potentialLoss}.`:""}`);
 return data;
}
function maybeSeriousCareerInjuryEvent(next){
 ensureHealthStats();
 const rec=facilityLevel("recovery"),previousMajor=S.healthStats.seriousInjuries||0;
 const chance=clamp(.18*(S.age>=38?1.28:S.age>=33?1.10:1)*(1+S.injuryRisk/220)*(1-rec*.14)*(previousMajor?0.72:1),.12,.48);
 if(Math.random()*100>=chance){next();return}
 const catastrophic=Math.random()<.05;
 const injury=pick(catastrophic?CATASTROPHIC_INJURIES:SERIOUS_INJURIES),options=injuryTreatmentOptions(injury);
 showModal(catastrophic?"BARDZO CIĘŻKI WYPADEK":"POWAŻNY WYPADEK",injury.name,catastrophic?"To wyjątkowo ciężki uraz, który może wpłynąć nie tylko na ten sezon, ale również na dalszy rozwój kariery.":"Ciężki wypadek może wyciąć dużą część sezonu. Wybierz sposób leczenia.",options.map(opt=>({title:opt.title,desc:`Koszt: ${money(opt.cost)}. Wybór wpłynie na czas przerwy i ryzyko trwałych skutków.`,action:()=>{closeModal();applySeriousInjury(injury,opt);normalize();save();render();next()}})));
}
function currentInjuryAvailability(){return !S.injuryAbsence||S.injuryAbsence.year!==S.year?1:clamp(1-S.injuryAbsence.weeks/40,.08,.92)}

function raceIncident(mode,{allowInjury=true}={}){
 ensureHealthStats();
 const aggressive=mode==="attack"||mode==="outside",tech=facilityLevel("technical"),rec=facilityLevel("recovery");
 const defectChance=clamp(.25+Math.max(0,65-S.equipment)*.025+(aggressive?.12:0)-tech*.05,.10,1.25);
 const fallChance=clamp(.28+S.injuryRisk*.018+(aggressive?.30:0)-tech*.04-rec*.05,.12,1.55);
 const r=Math.random()*100;
 if(r<defectChance)return {type:"defect",text:"Motocykl odmawia posłuszeństwa. Defekt i 0 punktów.",serious:false};
 if(r<defectChance+fallChance){
  if(!allowInjury)return {type:"fall",text:"Upadasz, ale kończy się bez urazu. 0 punktów.",serious:false};
  const ir=Math.random();
  if(ir<.001){
   const injury=pick(CATASTROPHIC_INJURIES),data=applySeriousInjury(injury,injuryTreatmentOptions(injury)[1]);
   return {type:"fall",text:`Bardzo ciężki upadek: ${injury.name}. ${data.weeks} tygodni przerwy.`,serious:true};
  }
  if(ir<Math.max(.010,.018-rec*.003)){
   const injury=pick(SERIOUS_INJURIES),data=applySeriousInjury(injury,injuryTreatmentOptions(injury)[1]);
   return {type:"fall",text:`Ciężki upadek: ${injury.name}. ${data.weeks} tygodni przerwy.`,serious:true};
  }
  if(ir<.27){const x=pick(MODERATE_INJURIES),d=recordInjury(x.name,rand(x.weeks[0],x.weeks[1]),"umiarkowany");return {type:"fall",text:`Upadek: ${x.name}. ${d.weeks} tyg. przerwy.`,serious:false}}
  if(ir<.66){const x=pick(MINOR_INJURIES),d=recordInjury(x.name,rand(x.weeks[0],x.weeks[1]),"drobny");return {type:"fall",text:`Upadek: ${x.name}. ${d.weeks?d.weeks+" tyg. przerwy.":"Bez przerwy w startach."}`,serious:false}}
  return {type:"fall",text:"Upadasz, ale obywa się bez urazu. 0 punktów.",serious:false};
 }
 return null;
}
function raceStartSnapshot(playerMode,entrants,context={}){
 const scored=entrants.map(r=>{
  const score=r.player?playerPhaseScore(playerMode,"start",context):raceBaseScore(r,context);
  return {...r,raceScore:score};
 }).sort((a,b)=>b.raceScore-a.raceScore);
 return {order:scored,position:scored.findIndex(r=>r.player)+1,context};
}

function ensurePlayerResultPosition(result,target){
 if(!result?.scores?.length)return result;
 const player=result.scores.find(r=>r.player);
 if(!player)return result;
 const others=result.scores.filter(r=>!r.player).sort((a,b)=>b.finalScore-a.finalScore);
 const upper=target===1?(others[0]?.finalScore??player.finalScore)+1:(others[target-2]?.finalScore??player.finalScore)-.2;
 const lower=target>=4?(others[2]?.finalScore??player.finalScore)-1:(others[target-1]?.finalScore??player.finalScore)+.2;
 player.finalScore=target===1?upper:target===4?lower:(upper+lower)/2;
 result.scores=[player,...others].sort((a,b)=>b.finalScore-a.finalScore);
 result.order=result.scores;
 result.position=result.scores.findIndex(r=>r.player)+1;
 result.points=4-result.position;
 return result;
}
function decisionOutcomeNarrative(fromPos,toPos,mode,phase="distance",{teamRace=false,major=false}={}){
 const line=mode==="inside"?"przy krawężniku":mode==="outside"?"po szerokiej":mode==="team"?"w parze z kolegą":mode==="safe"?"z bezpieczniejszą linią":"agresywnie";
 if(major){
  const stories=[
   "Popełniasz poważny błąd na wyjściu z łuku. Motocykl wynosi cię bardzo szeroko, ratujesz się przed bandą i tracisz kilka pozycji.",
   "Wpadasz w głęboką koleinę i musisz gwałtownie odjąć gaz. Rywale wykorzystują moment i przejeżdżają obok.",
   "Przy obronie pozycji tracisz płynność jazdy. Musisz ratować motocykl przed upadkiem i w jednej chwili oddajesz kilka miejsc."
  ];
  return pick(stories);
 }
 if(toPos<fromPos){
  if(fromPos-toPos>=2)return `Manewr ${line} wychodzi znakomicie. Wykorzystujesz zamieszanie przed sobą i zyskujesz aż ${fromPos-toPos} pozycje.`;
  return `Decyzja, by pojechać ${line}, przynosi efekt. Wyprzedzasz jednego rywala i awansujesz na ${toPos}. miejsce.`;
 }
 if(toPos>fromPos){
  if(toPos-fromPos>=2)return `Tym razem jazda ${line} nie działa. Tracisz prędkość i spadasz o ${toPos-fromPos} pozycje.`;
  return `Rywal wykorzystuje moment po twojej decyzji o jeździe ${line}. Spadasz na ${toPos}. miejsce.`;
 }
 if(mode==="safe")return `Kontrolujesz sytuację i nie otwierasz rywalom łatwej drogi. Utrzymujesz ${toPos}. miejsce.`;
 if(mode==="team"&&teamRace)return `Jazda parą działa — kolega pomaga ci zamknąć rywalom dogodną linię. Utrzymujesz ${toPos}. miejsce.`;
 return `Próbujesz pojechać ${line}, ale układ biegu się nie zmienia. Nadal jesteś ${toPos}.`;
}
function stabilizeRaceOutcome(result,fromPos,mode){
 if(!result||result.incident)return result;
 const drop=result.position-fromPos,gain=fromPos-result.position;
 if(mode==="safe"&&fromPos===1&&result.position===4){
  if(Math.random()<.035){
   result.incident={type:"majorMistake",serious:false,text:decisionOutcomeNarrative(fromPos,4,mode,"late",{major:true})};
   return result;
  }
  return ensurePlayerResultPosition(result,Math.random()<.78?2:3);
 }
 if(drop>=3){
  if(Math.random()<.05){
   result.incident={type:"majorMistake",serious:false,text:decisionOutcomeNarrative(fromPos,result.position,mode,"late",{major:true})};
  }else ensurePlayerResultPosition(result,fromPos+2);
 }
 if(gain>=3&&Math.random()>=.07)ensurePlayerResultPosition(result,Math.max(1,fromPos-2));
 return result;
}

function raceNarrative(snapshot,{teamRace=false}={}){
 const pos=snapshot.position;
 const ahead=snapshot.order.slice(0,pos-1);
 const behind=snapshot.order.slice(pos);
 let first=pos===1?"Wygrywasz start i wychodzisz na prowadzenie.":pos===2?"Po pierwszym łuku jedziesz drugi.":pos===3?"Pierwsze okrążenie zaczynasz na trzeciej pozycji.":"Po starcie jesteś czwarty i musisz odrabiać.";
 if(teamRace){
  const mate=snapshot.order.find(r=>r.side==="own"&&!r.player);
  if(mate){
   const mp=snapshot.order.indexOf(mate)+1;
   first+=` Twój kolega z drużyny jedzie ${mp}.`;
  }
 }
 return first;
}


const RACE_EVENT_LIBRARY={
 start:{
  success:["Reagujesz świetnie na taśmę i wchodzisz w pierwszy łuk z przewagą pół motocykla.","Moment startowy trafiasz idealnie. Motocykl od razu łapie przyczepność i zyskujesz teren.","Pierwsze metry są bardzo dobre — nie pozwalasz rywalowi zamknąć ci dojazdu do łuku.","Wychodzisz spod taśmy dynamicznie i już na dojeździe ustawiasz bieg pod siebie."],
  super:["Kapitalny start! Zostawiasz całą trójkę za sobą i możesz wybierać linię w pierwszym łuku.","Reakcja na taśmę jest perfekcyjna. Wychodzisz na wyraźne prowadzenie jeszcze przed łukiem.","Start marzenie — rywale zostają pół motocykla z tyłu, a ty przejmujesz kontrolę nad wejściem w łuk."],
  fail:["Reagujesz odrobinę za późno i rywal z zewnętrznego pola zamyka ci dojazd do pierwszego łuku.","Tylne koło lekko buksuje na starcie. Tracisz kilka metrów i musisz odrabiać.","Pierwsze metry nie wychodzą. Zostajesz przyblokowany i musisz szukać miejsca w tłoku.","Przeciwnik lepiej czyta moment puszczenia taśmy i wychodzi przed ciebie."]
 },
 inside:{
  success:["Wciskasz motocykl przy krawężniku i wykorzystujesz krótszą linię.","Rywal zostawia pół motocykla miejsca. Wchodzisz pod niego i zyskujesz pozycję.","Krawężnik niesie lepiej, niż wyglądał. Krótka linia daje ci przewagę na wyjściu.","Czekasz do ostatniej chwili i nurkujesz po wewnętrznej — manewr działa."],
  super:["Perfekcyjne wejście przy krawężniku. Jednym manewrem mijasz dwóch zawodników.","Krawężnik otwiera się dokładnie w odpowiednim momencie. Wciskasz się w lukę i wychodzisz przed całą grupę.","Czytasz tor idealnie — krótka linia pozwala ci zbudować ogromną prędkość i spektakularnie poprawić pozycję."],
  fail:["Wewnętrzna jest bardziej śliska, niż się wydawało. Motocykl traci napęd i rywal odjeżdża.","Rywal zamyka drzwi przy krawężniku. Musisz odjąć i tracisz prędkość.","Próbujesz wejść po wewnętrznej, ale brakuje miejsca. Atak kończy się stratą dystansu.","Koleina przy krawężniku wybija motocykl z rytmu i musisz skorygować tor jazdy."]
 },
 outside:{
  success:["Szeroka zaczyna nieść. Rozpędzasz motocykl i atakujesz rywala na wyjściu z łuku.","Budujesz prędkość po zewnętrznej i wracasz na prostą z większym napędem.","Rywal zostaje niżej, a ty wykorzystujesz luźniejszy materiał pod bandą.","Szeroka linia daje przewagę prędkości — zbliżasz się do zawodnika przed tobą."],
  super:["Szeroka niesie kapitalnie. Przelatujesz obok dwóch rywali niemal jednym ciągiem.","Zewnętrzna działa perfekcyjnie — motocykl nabiera ogromnej prędkości i wyjeżdżasz przed stawkę.","Idealny timing na szerokiej. Rywale zostają niżej, a ty robisz spektakularny manewr."],
  fail:["Jedziesz za szeroko i tracisz zbyt dużo drogi. Rywale wykorzystują krótszą linię.","Pod bandą jest za mało przyczepności. Motocykl nie nabiera oczekiwanej prędkości.","Szeroka tym razem nie niesie. Tracisz dystans i musisz zmienić plan.","Wynosi cię za daleko na zewnętrzną i jeden z rywali wciska się pod ciebie."]
 },
 attack:{
  success:["Atakujesz zdecydowanie i zmuszasz rywala do korekty toru jazdy. Zyskujesz pozycję.","Wykorzystujesz moment zawahania przeciwnika i przebijasz się przed niego.","Manewr jest odważny, ale czysty. Na wyjściu z łuku jesteś już z przodu.","Przyspieszasz dokładnie wtedy, gdy rywal traci napęd. Atak dochodzi do skutku."],
  super:["Fenomenalny atak! W jednej sekwencji łuków mijasz dwóch zawodników.","Ryzykujesz wszystko i trafiasz perfekcyjnie — zyskujesz dwie pozycje.","Agresywny manewr wychodzi idealnie. Rywale nie mają odpowiedzi."],
  fail:["Atak jest zbyt optymistyczny. Musisz odjąć, żeby uniknąć kontaktu.","Rywal dobrze się broni i wypycha cię na gorszą linię. Tracisz kilka metrów.","Próba wyprzedzenia nie wychodzi. Tracisz prędkość na wyjściu.","Wchodzisz w lukę, która szybko się zamyka. Musisz przerwać atak."]
 },
 safe:{
  success:["Kontrolujesz najgroźniejszą linię i nie dajesz rywalowi łatwej szansy na atak.","Jedziesz spokojnie i precyzyjnie. Rywale nie znajdują miejsca do wyprzedzenia.","Nie szarpiesz motocyklem i bronisz pozycji bez zbędnego ryzyka.","Pilnujesz tempa i zamykasz tor jazdy dokładnie tam, gdzie trzeba."],
  super:["Obrona jest perfekcyjna. Rywale tracą dystans, a ty odjeżdżasz na bezpieczną przewagę.","Czytasz każdy ruch przeciwnika. Kontrolujesz bieg bez najmniejszego błędu.","Bronisz pozycji książkowo i jeszcze budujesz przewagę."],
  fail:["Za mocno koncentrujesz się na obronie i tracisz prędkość na wyjściu z łuku.","Rywal zmienia linię w ostatniej chwili i przechodzi obok ciebie.","Defensywna jazda kosztuje cię tempo. Przeciwnik wykorzystuje moment.","Pilnujesz jednej linii, ale drugi rywal pojawia się po przeciwnej stronie."]
 },
 team:{
  success:["Kolega ustawia motocykl tak, że rywale mają mniej miejsca. Jazda parą pomaga utrzymać układ.","Dobrze czytacie się z kolegą. Przeciwnik zostaje zamknięty między waszymi liniami.","Kolega przytrzymuje rywala, a ty wykorzystujesz osłonę i zyskujesz przewagę."],
  super:["Jazda parą wychodzi perfekcyjnie. Razem odcinacie rywalom drogę i ustawicie bieg pod 5:1.","Kolega kapitalnie cię osłania, a ty wykorzystujesz sytuację i awansujesz.","Współpraca działa jak z podręcznika — rywale zostają bez odpowiedzi."],
  fail:["Nie dogadujecie się na torze. Kolega zjeżdża w twoją linię i tracisz prędkość.","Próba jazdy parą rozpada się, gdy rywal rozdziela was na wyjściu z łuku.","Kolega nie jest w stanie ci pomóc — sam musi bronić swojej pozycji."]
 }
};
const RACE_INCIDENTS=[
 {key:"rut",weight:18,text:"Wpadasz w głęboką koleinę. Motocykl staje dęba i musisz gwałtownie odjąć gaz.",positionLoss:[1,2],injury:false},
 {key:"nearFence",weight:14,text:"Motocykl wynosi cię pod bandę. Ratujesz się przed uderzeniem i tracisz bardzo dużo prędkości.",positionLoss:[1,3],injury:false},
 {key:"contact",weight:13,text:"Dochodzi do kontaktu kierownicami. Obaj utrzymujecie się na motocyklach, ale tracisz rytm.",positionLoss:[1,2],injury:false},
 {key:"slide",weight:12,text:"Tylne koło ucieka na wyjściu z łuku. Opanowujesz motocykl, ale rywale wykorzystują sytuację.",positionLoss:[1,2],injury:false},
 {key:"stone",weight:6,text:"Dostajesz bryłą nawierzchni spod koła rywala. Przez moment nic nie widzisz i musisz odjąć.",positionLoss:[0,1],injury:false},
 {key:"chain",weight:5,text:"Motocykl zaczyna szarpać — problem z przeniesieniem napędu odbiera ci tempo.",positionLoss:[1,3],injury:false},
 {key:"ignition",weight:4,text:"Silnik przerywa na wyjściu z łuku. Tracisz prędkość i pozycje.",positionLoss:[1,3],injury:false},
 {key:"fall",weight:4,text:"Tracisz kontrolę nad motocyklem i upadasz.",positionLoss:[4,4],injury:true},
 {key:"rivalFall",weight:3,text:"Rywal przed tobą upada. Unikasz motocykla i zyskujesz pozycję.",positionGain:[1,1],injury:false},
 {key:"rivalMistake",weight:12,text:"Rywal popełnia duży błąd na wyjściu. Wykorzystujesz prezent i zyskujesz miejsce.",positionGain:[1,1],injury:false},
 {key:"doubleRivalMistake",weight:2,text:"Dwóch rywali wpada w kłopoty na tym samym łuku. Wykorzystujesz zamieszanie i zyskujesz dwie pozycje.",positionGain:[2,2],injury:false},
 {key:"equipmentRecovery",weight:2,text:"Przez chwilę motocykl przerywa, ale po chwili odzyskuje pełną moc. Tracisz tylko dystans.",positionLoss:[0,1],injury:false}
];
function weightedChoice(items){let total=items.reduce((s,x)=>s+(x.weight||1),0),r=Math.random()*total;for(const item of items){r-=item.weight||1;if(r<=0)return item}return items[items.length-1]}
function mentorAdviceAccuracy(){const mentor=(S.mentors||[])[0];if(!mentor)return 0;const tier=mentor.tier||mentor.level||1;return clamp(.56+tier*.075+(S.professionalism-50)*.0015,.56,.92)}
function mentorAdviceContext(rivals,phase,teammate,context={}){
 const mentor=(S.mentors||[])[0]||null;
 // Mentor wpływa przede wszystkim na trafność podpowiedzi, nie na fizyczną zdolność wykonania manewru.
 return {...context,mentorAccuracyBonus:0,mentorCorrect:false,mentorTier:mentor?.tier||mentor?.level||0};
}

function teamRaceSituation(context={}){
 const order=context.order||[],me=order.findIndex(x=>x.player),mate=order.findIndex(x=>x.side==="own"&&!x.player);
 return {
  meIndex:me,mateIndex:mate,
  teammateAhead:me>0&&mate===me-1,
  teammateBehind:me>=0&&mate===me+1,
  teamOneTwo:me===1&&mate===0
 };
}
function mentorAllowedAdviceKeys(phase="distance",teammate=null,context={}){
 if(phase==="start")return ["attack","inside","outside","safe"];
 const team=context.teamRace||!!teammate,sit=team?teamRaceSituation(context):{};
 if(team&&sit.teammateAhead){
  // Korzystny układ: żadnej sugestii ataku na kolegę.
  const keys=["team","safe"];
  if(context.trackShift?.favored&&["inside","outside"].includes(context.trackShift.favored))keys.push(context.trackShift.favored);
  return [...new Set(keys)];
 }
 const keys=["attack","inside","outside","safe"];
 if(team&&teammate)keys.push("team");
 return keys;
}
function mentorAdviceLabel(key,phase="distance",context={}){
 const sit=teamRaceSituation(context);
 if(key==="team"&&sit.teammateAhead)return "trzymać się tuż za kolegą, utrzymać korzystny układ i pilnować rywala za sobą";
 if(key==="safe"&&sit.teammateAhead)return "skupić się na własnej pozycji i nie otwierać rywalowi miejsca za plecami";
 return {
  attack:phase==="start"?"mocno postawić na start":"zaatakować zdecydowanie na dystansie",
  inside:"szukać krótszej linii przy krawężniku",
  outside:"budować prędkość szerzej",
  team:"wykorzystać jazdę parową i osłonę kolegi",
  safe:"ograniczyć ryzyko i zabezpieczyć pozycję"
 }[key]||"jechać bezpiecznie";
}


const RACE_RISK_PROFILE={
 attack:{reward:1.30,risk:1.35,super:1.45,safe:false},
 inside:{reward:1.05,risk:1.00,super:1.05,safe:false},
 outside:{reward:1.18,risk:1.18,super:1.22,safe:false},
 team:{reward:.82,risk:.66,super:.78,safe:true},
 safe:{reward:.45,risk:.42,super:.48,safe:true}
};

function newRaceState(position=2){
 return {momentum:0,gap:0,previousPosition:position,successfulDecisions:0,failedDecisions:0,consecutiveFails:0,trackShift:null};
}
function raceState(context={},position=2){
 if(!context.raceState)context.raceState=newRaceState(position);
 return context.raceState;
}
function updateRaceState(context,before,after,outcome,mode){
 const st=raceState(context,before);st.previousPosition=before;
 if(outcome==="super"){st.momentum=clamp(st.momentum+2,-4,5);st.successfulDecisions++;st.consecutiveFails=0;st.gap=clamp(st.gap+(after<=before?2:1),-4,5)}
 else if(outcome==="success"){st.momentum=clamp(st.momentum+1,-4,5);st.successfulDecisions++;st.consecutiveFails=0;st.gap=clamp(st.gap+(after<=before?1:0),-4,5)}
 else if(outcome==="fail"){st.momentum=clamp(st.momentum-1.5,-4,5);st.failedDecisions++;st.consecutiveFails=(st.consecutiveFails||0)+1;st.gap=clamp(st.gap-(1+Math.min(2,st.consecutiveFails*.5)),-4,5)}
 else{st.momentum=clamp(st.momentum-2.5,-4,5);st.failedDecisions++;st.consecutiveFails=(st.consecutiveFails||0)+1;st.gap=clamp(st.gap-2.5,-4,5)}
 if(after<before)st.gap=clamp(st.gap+1,-4,5);if(after>before)st.gap=clamp(st.gap-1.5,-4,5);
 st.previousPosition=after;return st;
}
function raceGapPhrase(state,position){
 const g=state?.gap||0;
 if(position===1){
  if(g>=3)return "Masz dużą przewagę i pełną kontrolę nad biegiem.";
  if(g>=1)return "Masz kilka metrów przewagi nad drugim zawodnikiem.";
  if(g<=-1)return "Rywal jedzie niemal na twoim tylnym kole.";
  return "Prowadzisz, ale rywal pozostaje blisko.";
 }
 if(g<=-2)return "Do zawodnika przed tobą jest wyraźna strata.";
 if(g>=2)return "Siedzisz rywalowi na tylnym kole i masz realną szansę na atak.";
 return "Jedziecie blisko siebie.";
}
function teammateRacePhrase(snapshot){
 const order=snapshot?.order||snapshot?.scores||[];
 const mate=order.find(x=>x.side==="own"&&!x.player);
 if(!mate)return "";
 const pos=order.indexOf(mate)+1;
 return ` Twój kolega jedzie ${pos}.`;
}
function raceSituationNarrative(snapshot,{teamRace=false}={}){
 const order=snapshot?.order||snapshot?.scores||[],position=snapshot.position;
 const st=raceState(snapshot.context||{},position),meIndex=Math.max(0,position-1);
 const ahead=meIndex>0?order[meIndex-1]:null,behind=meIndex<order.length-1?order[meIndex+1]:null;
 let parts=[`Jedziesz ${position}.`];

 if(teamRace&&ahead?.side==="own"){
  if(position===2&&meIndex===1){
   parts.push(st.gap>=2?"Tuż przed tobą jedzie kolega z pary, a wy macie podwójne prowadzenie i kontrolujecie bieg.":"Przed tobą jedzie kolega z pary. Macie układ 5:1, a rywale są za wami.");
  }else parts.push("Bezpośrednio przed tobą jedzie kolega z drużyny.");
 }else{
  parts.push(raceGapPhrase(st,position));
 }

 if(teamRace){
  const mate=order.find(x=>x.side==="own"&&!x.player);
  if(mate){
   const matePos=order.indexOf(mate)+1;
   if(!(ahead===mate)){
    if(behind===mate)parts.push(`Bezpośrednio za tobą jedzie kolega z drużyny na ${matePos}. miejscu.`);
    else parts.push(`Twój kolega jedzie ${matePos}.`);
   }
  }
 }
 return parts.join(" ");
}
function maybeShiftTrackConditions(context,phase="distance"){
 if(context.trackShiftChecked)return context.trackShift;
 context.trackShiftChecked=true;
 if(Math.random()>=.13)return null;
 const options=[
  {key:"insideImproves",text:"Tor przy krawężniku zaczyna lepiej trzymać.",favored:"inside",hurt:"outside"},
  {key:"outsideImproves",text:"Na szerokiej pojawia się świeży, przyczepny materiał.",favored:"outside",hurt:"inside"},
  {key:"insideWears",text:"Wewnętrzna wyraźnie się wygładziła i traci przyczepność.",favored:"outside",hurt:"inside"},
  {key:"outsideWears",text:"Szeroka robi się luźna i coraz trudniej zbudować tam prędkość.",favored:"inside",hurt:"outside"},
  {key:"ruts",text:"Na wejściu w łuk pojawiają się głębsze koleiny.",favored:"safe",hurt:"attack"}
 ];
 context.trackShift=pick(options);
 trackShiftAdvice(context);
 return context.trackShift;
}
function trackShiftAdvice(context){
 const x=context.trackShift;if(!x)return "";
 if(context.trackShiftAdviceHtml)return context.trackShiftAdviceHtml;
 const q=mentorAdviceQuality(),allowed=mentorAllowedAdviceKeys("distance",null,context);
 let correct=allowed.includes(x.favored)?x.favored:(allowed.includes("team")?"team":allowed.includes("safe")?"safe":allowed[0]);
 const alternatives=allowed.filter(k=>k!==correct);
 const selected=Math.random()<q.accuracy||!alternatives.length?correct:pick(alternatives);
 const certainty=q.accuracy>=.86?"jest przekonany":q.accuracy>=.74?"wyraźnie sugeruje":"ostrożnie sugeruje";
 context.trackShiftAdviceHtml=`<p class="race-track-change"><b>Zmiana warunków:</b> ${x.text}</p><p class="race-advice"><b>${q.source} — korekta wskazówki:</b> ${certainty}, że teraz warto ${mentorAdviceLabel(selected,"distance",context)}.</p>`;
 context.advice={suggested:selected,correct,quality:q,phase:"trackShift",html:context.trackShiftAdviceHtml};
 context.mentorAccuracyBonus=selected===correct?(q.bonus||2):-1.3;
 return context.trackShiftAdviceHtml;
}

function currentRaceAdvice(rivals,phase="start",teammate=null,context={}){
 if(context.trackShift)return trackShiftAdvice(context);
 return raceAdviceText(rivals,phase,teammate,context);
}

function contextChoiceAdjustment(mode,context,position){
 const st=raceState(context,position),profile=RACE_RISK_PROFILE[mode]||RACE_RISK_PROFILE.attack;
 let success=0,superAdj=0,incident=0;
 // Momentum i dystans: dobre decyzje realnie ułatwiają kolejne.
 success+=st.momentum*4.5;
 if(position===1){
  if(st.gap>=3&&profile.safe)success+=24;
  else if(st.gap>=2&&profile.safe)success+=18;
  else if(st.gap>=1&&profile.safe)success+=11;
  if(st.gap>=2&&!profile.safe)success+=4;
 }else{
  if(st.gap>=2&&!profile.safe)success+=8;
  if(st.gap<=-2&&!profile.safe)success-=9;
  if(st.gap<=-2&&profile.safe)success+=5;
 }
 if(profile.safe){success+=10;superAdj-=2;incident-=.7}
 else if(mode==="attack"){success-=9;superAdj+=4;incident+=1.4}
 else if(mode==="outside"){success-=5;superAdj+=2.5;incident+=.7}
 else if(mode==="inside"){success-=2;superAdj+=1;incident+=.2}
 if(mode==="attack"&&context.teamRace&&context.order){const order=context.order,me=order.findIndex(x=>x.player),mate=order.findIndex(x=>x.side==="own"&&!x.player);if(mate===me-1)success-=8;}
 if(context.trackShift){
  if(mode===context.trackShift.favored)success+=10;
  if(mode===context.trackShift.hurt)success-=12;
 }
 return {success,superAdj,incident};
}
function contextualRaceNarrative(mode,outcome,before,after,context){
 const st=raceState(context,before),delta=before-after;
 if(outcome==="incident")return "";
 if(delta===3)return pick([
  "Niewiarygodna sekwencja! Z czwartej pozycji przebijasz się obok całej trójki i obejmujesz prowadzenie.",
  "Kapitalny manewr: wykorzystujesz zamieszanie przed sobą i w jednej akcji przechodzisz z P4 na P1."
 ]);
 if(delta===2)return pick([
  `Fantastyczna akcja — jednym ciągiem mijasz dwóch zawodników i awansujesz na ${after}. miejsce.`,
  `Perfekcyjnie wykorzystujesz lukę między rywalami. Zyskujesz dwie pozycje i jedziesz ${after}.`
 ]);
 if(delta===1){
  if(after===1)return pick([
   "Atak dochodzi do skutku — mijasz lidera i obejmujesz prowadzenie.",
   "Wykorzystujesz moment i przechodzisz przed dotychczasowego lidera. Jesteś pierwszy."
  ]);
  return pick([
   `Manewr działa — mijasz jednego rywala i awansujesz na ${after}. miejsce.`,
   `Znajdujesz miejsce do ataku i zyskujesz jedną pozycję. Jedziesz ${after}.`
  ]);
 }
 if(delta===0){
  if(after===1){
   if(outcome==="super"||st.gap>=2)return pick([
    "Kapitalnie kontrolujesz prowadzenie i wyraźnie powiększasz przewagę.",
    "Jedziesz bezbłędnie. Rywal za tobą traci kolejne metry, a zwycięstwo jest coraz bliżej.",
    "Świetnie czytasz tor i odjeżdżasz drugiemu zawodnikowi."
   ]);
   return pick([
    "Utrzymujesz prowadzenie i nie dajesz rywalowi dogodnej okazji do ataku.",
    "Kontrolujesz pierwszą pozycję; rywal nadal jest za tobą.",
    "Plan działa — pozostajesz na prowadzeniu."
   ]);
  }
  if(outcome==="super")return pick([
   "Nie zmieniasz pozycji, ale wyraźnie poprawiasz tempo i mocno zbliżasz się do zawodnika przed tobą.",
   "Świetny fragment jazdy. Pozycja się nie zmienia, lecz jesteś teraz znacznie bliżej rywala z przodu."
  ]);
  return pick([
   "Utrzymujesz pozycję i pozostajesz w walce.",
   "Pozycja się nie zmienia. Jedziesz płynnie i czekasz na kolejną okazję.",
   "Zachowujesz swoje miejsce w stawce."
  ]);
 }
 const lost=after-before;
 if(lost===1)return pick([
  `Decyzja nie wychodzi — jeden rywal wykorzystuje błąd i spadasz na ${after}. miejsce.`,
  `Tracisz prędkość na wyjściu i oddajesz jedną pozycję. Jedziesz ${after}.`
 ]);
 if(lost===2)return pick([
  `Poważny błąd kosztuje cię dwie pozycje. Spadasz na ${after}. miejsce.`,
  `Musisz mocno odjąć i dwóch rywali przejeżdża obok. Jedziesz ${after}.`
 ]);
 return `Bardzo poważny błąd rozbija twój bieg — spadasz na ${after}. miejsce.`;
}
function raceChoiceTemplate(key,phase="distance",position=2){
 const late=phase==="late";
 const map={
  attack:{key:"attack",title:late?"Ostatni atak":"Zaatakuj pozycję",desc:late?"Spróbuj odebrać pozycję przed metą — trudna, ofensywna opcja.":"Podejmij ofensywną próbę ataku. Wyższa nagroda oznacza większe ryzyko błędu."},
  inside:{key:"inside",title:late?"Spróbuj przy krawężniku":"Szukaj miejsca przy krawężniku",desc:"Wykorzystaj krótszą linię i technikę."},
  outside:{key:"outside",title:late?"Spróbuj po szerokiej":"Buduj prędkość po szerokiej",desc:"Wykorzystaj zewnętrzną, żeby zbudować większą prędkość."},
  safe:{key:"safe",title:position===1?(late?"Dowieź zwycięstwo":"Kontroluj prowadzenie"):(late?"Dowieź obecne punkty":"Zabezpiecz obecną pozycję"),desc:"Ogranicz ryzyko i zachowaj możliwie bezpieczną pozycję."},
  team:{key:"team",title:"Jedź parą z kolegą",desc:"Wykorzystaj jazdę zespołową i osłonę partnera."}
 };
 return map[key]||map.safe;
}
function ensureMentorChoiceAvailable(choices,context,phase="distance",position=2){
 const suggested=context?.advice?.suggested;
 if(!suggested||choices.some(x=>x.key===suggested))return choices;
 const allowed=choices.map(x=>x.key);
 const fallback=allowed.includes("team")&&teamRaceSituation(context).teammateAhead?"team":allowed.includes("safe")?"safe":allowed[0];
 if(context?.advice&&fallback){
  context.advice.suggested=fallback;
  const q=context.advice.quality||mentorAdviceQuality();
  context.advice.html=`<p class="race-advice"><b>${q.source}:</b> ${mentorAdviceLabel(fallback,phase,context)}.</p>`;
 }
 return choices;
}

function raceDecisionChoices(snapshot,{teamRace=false,phase="distance"}={}){
 const position=snapshot.position,context=snapshot.context||{},theme=context.theme||"balanced",st=raceState(context,position);
 const order=snapshot.order||snapshot.scores||context.order||[];
 const mate=teamRace?order.find(x=>x.side==="own"&&!x.player):null,matePos=mate?order.indexOf(mate)+1:null;
 const teammateDirectlyAhead=teamRace&&matePos===position-1;
 const teamOneTwo=teamRace&&position===2&&matePos===1;
 let choices=[];

 if(phase==="late"){
  if(position===1){
   choices=[
    {key:"safe",title:"Dowieź zwycięstwo",desc:"Jedź płynnie i nie otwieraj rywalowi niepotrzebnej szansy."},
    theme==="outside"?{key:"outside",title:"Kontroluj szeroką",desc:"Pilnuj szybszej zewnętrznej i zamykaj napęd rywala."}:{key:"inside",title:"Zamknij najkrótszą linię",desc:"Pilnuj wejścia przy krawężniku."},
    {key:"attack",title:"Odjedź rywalom",desc:"Podkręć tempo, by powiększyć przewagę — większa nagroda i większe ryzyko."}
   ];
  }else if(teammateDirectlyAhead){
   choices=[
    {key:"team",title:"Osłaniaj kolegę",desc:teamOneTwo?"Utrzymaj układ 5:1 i odcinaj rywali za sobą.":"Współpracuj z partnerem i pilnuj układu drużyny."},
    {key:"safe",title:"Dowieź swoją pozycję",desc:"Nie walcz z partnerem; skup się na własnych punktach i zawodniku za tobą."},
    {key:theme==="outside"?"outside":"inside",title:"Jedź własnym tempem",desc:"Utrzymuj szybkość bez bezpośredniego ataku na partnera."}
   ];
  }else{
   choices=[
    {key:"attack",title:"Ostatni atak",desc:"Spróbuj odebrać pozycję przed metą — trudna, ofensywna opcja."},
    {key:theme==="outside"?"outside":"inside",title:theme==="outside"?"Spróbuj szerokiej":"Spróbuj przy krawężniku",desc:"Wykorzystaj linię, która może otworzyć miejsce do ataku."},
    {key:"safe",title:"Dowieź obecne punkty",desc:"Zaakceptuj obecną pozycję i mocno ogranicz ryzyko jej utraty."}
   ];
  }
 }else{
  if(position===1){
   choices=[
    {key:"safe",title:"Kontroluj prowadzenie",desc:"Jedź swoje i nie dawaj rywalom prezentu."},
    theme==="outside"?{key:"outside",title:"Utrzymaj szeroką",desc:"Kontynuuj szybszą linię i buduj dystans."}:{key:"inside",title:"Pilnuj krawężnika",desc:"Kontynuuj krótszą linię i blokuj możliwość ataku."},
    {key:"attack",title:"Podkręć tempo",desc:"Spróbuj szybko zbudować większą przewagę, ryzykując więcej."}
   ];
  }else if(teammateDirectlyAhead){
   choices=[
    {key:"team",title:"Jedź parą z kolegą",desc:teamOneTwo?"Jedźcie zespołowo i utrzymajcie podwójne prowadzenie.":"Współpracujcie i pilnujcie rywali."},
    {key:"safe",title:"Pilnuj swojej pozycji",desc:"Nie atakuj partnera; skoncentruj się na zawodniku za tobą."},
    {key:theme==="outside"?"outside":"inside",title:"Buduj bezpieczny dystans",desc:"Jedź szybko, ale bez bezpośredniego ataku na partnera."}
   ];
  }else{
   choices=[
    {key:"attack",title:"Zaatakuj pozycję",desc:"Największa nagroda, ale także wyraźnie większe ryzyko błędu."},
    {key:theme==="outside"?"outside":"inside",title:theme==="outside"?"Buduj prędkość po szerokiej":"Szukaj miejsca przy krawężniku",desc:"Spróbuj wykorzystać preferowaną linię."},
    {key:"safe",title:"Zabezpiecz obecną pozycję",desc:"Mniej ryzyka — zachowaj punkty i poczekaj na lepszy moment."}
   ];
  }
 }

 // Mentor nie może wymusić opcji ataku na partnera z P1.
 if(teamOneTwo&&context.advice?.suggested==="attack"){
  context.advice.suggested="team";
  context.advice.html=`<p class="race-advice"><b>${context.advice.quality?.source||mentorAdviceQuality().source}:</b> Sugeruje utrzymać jazdę parową i dowieźć 5:1.</p>`;
 }
 return ensureMentorChoiceAvailable(choices,context,phase,position);
}

function raceExecutionSkill(mode,phase="distance"){
 if(phase==="start")return S.skills.starts*.38+S.skills.corner*.24+S.skills.mental*.16+S.skills.setup*.12+S.professionalism*.10;
 if(mode==="inside")return S.skills.technique*.34+S.skills.corner*.27+S.skills.mental*.16+S.skills.setup*.13+S.skills.overtaking*.10;
 if(mode==="outside")return S.skills.distance*.32+S.skills.overtaking*.26+S.skills.technique*.17+S.skills.mental*.15+S.skills.fitness*.10;
 if(mode==="safe")return S.skills.mental*.32+S.skills.technique*.23+S.skills.setup*.17+S.skills.distance*.12+S.professionalism*.16;
 if(mode==="team")return S.skills.mental*.28+S.skills.technique*.22+S.professionalism*.24+S.skills.distance*.12+S.skills.corner*.14;
 return S.skills.overtaking*.31+S.skills.technique*.22+S.skills.mental*.19+S.skills.distance*.17+S.skills.corner*.11;
}
function adjacentRivalStrength(rivals,position=2){
 if(!rivals?.length)return overall();
 const ratings=rivals.map(r=>r.rating||overall()).sort((a,b)=>b-a);
 if(position<=1)return ratings[0]||overall();
 if(position>=4)return ratings.at(-1)||overall();
 return ratings[Math.min(ratings.length-1,position-1)]||ratings.reduce((a,b)=>a+b,0)/ratings.length;
}
function raceSportStrength(mode,phase,rivals,context,position){
 const st=raceState(context,position),day=ensureDayForm(context.competitionKey||"race",context.dayToken||`${S.year}:race`).modifier;
 const relevant=raceExecutionSkill(mode,phase);
 // Skala porównawcza wraca do okolic nominalnego OVR. Poprzednio suma wag wynosiła tylko 0,91,
 // przez co zawodnik był ukrycie zaniżany o kilka punktów przed porównaniem z rywalem.
 return overall()*.66+relevant*.17+S.equipment*.05+currentFormRating()*.04+
  S.skills.mental*.03+S.skills.setup*.02+S.professionalism*.03+
  day*.55+st.momentum*2.3+st.gap*1.4+Number(context.localEventBonus||0)+Number(context.trackFit||0);
}
function sportEffectNarrative(execution,mode,before,after,rivalGap,state){
 if(execution==="incident")return "";
 if(execution==="super"){
  if(after<before)return contextualRaceNarrative(mode,"super",before,after,{raceState:state});
  if(after===1)return pick(["Wyjątkowe wykonanie — nie tylko bronisz prowadzenia, ale wyraźnie odjeżdżasz rywalom.","Perfekcyjny fragment jazdy. Budujesz przewagę i przejmujesz pełną kontrolę nad biegiem."]);
  return pick(["Wyjątkowe wykonanie daje ci ogromny impuls i zdecydowanie poprawia sytuację na torze.","Robisz coś ponad swój normalny poziom — rywale muszą zareagować, a twoja pozycja staje się znacznie bezpieczniejsza."]);
 }
 if(execution==="success"){
  if(after<before)return contextualRaceNarrative(mode,"success",before,after,{raceState:state});
  if(after>before)return `Sam manewr wykonujesz poprawnie, ale mocniejszy rywal odpowiada większą prędkością i spadasz na ${after}. miejsce.`;
  if(before===1&&after===1){
   if(state?.gap>=2)return pick(["Decyzję wykonujesz poprawnie i utrzymujesz prowadzenie. Przewaga nad rywalami pozostaje bezpieczna.","Dobra decyzja pozwala ci nadal kontrolować bieg z pierwszej pozycji."]);
   return pick(["Wykonujesz plan poprawnie i pozostajesz na prowadzeniu.","Utrzymujesz pierwszą pozycję i nie dajesz rywalowi dogodnej szansy do ataku."]);
  }
  if(rivalGap<-7)return pick(["Manewr wykonujesz dobrze, lecz rywal ma wyraźnie więcej prędkości i nie pozwala dokończyć ataku.","Technicznie realizujesz plan poprawnie, ale mocniejszy rywal broni pozycji."]);
  return pick(["Decyzję wykonujesz poprawnie, ale tym razem nie wystarcza to do awansu. Pozostajesz na tej samej pozycji.","Dobrze realizujesz plan i poprawiasz sytuację, choć kolejność na razie się nie zmienia."]);
 }
 if(after>before)return contextualRaceNarrative(mode,"fail",before,after,{raceState:state});
 if(before===1)return pick(["Błąd odbiera ci część przewagi, ale nadal prowadzisz.","Nie wykonujesz planu idealnie. Rywal zbliża się, lecz pierwsza pozycja pozostaje twoja."]);
 return pick(["Nie trafiasz z wykonaniem. Pozycja jeszcze się nie zmienia, ale tracisz przewagę i rywal wyraźnie doskakuje.","Błąd nie kosztuje cię od razu miejsca, jednak tracisz tempo i kolejna obrona będzie znacznie trudniejsza."]);
}

function eliteRaceContext(key=""){
 const k=String(key||"");
 return /Speedway Grand Prix|\bSGP\b|\bSEC\b|IMP|Grand Prix Challenge/.test(k);
}

function resolveSportEffect(mode,execution,{phase="distance",rivals=[],context={},position=4}={}){
 const st=raceState(context,position),mine=raceSportStrength(mode,phase,rivals,context,position);
 const safe=mode==="safe"||mode==="team",elite=eliteRaceContext(context.competitionKey);
 const ratings=(rivals||[]).map(r=>Number(r.rating||overall()));
 const avgRival=ratings.length?ratings.reduce((a,b)=>a+b,0)/ratings.length:overall();

 if(phase==="start"){
  const execBonus=execution==="super"?(elite?18:22):execution==="success"?(safe?(elite?3:6):(elite?5:9)):execution==="fail"?-7:-12;
  const playerScore=mine+execBonus+rand(elite?-6:-7,elite?6:7);
  const rivalScores=ratings.map(r=>r+rand(elite?-7:-9,elite?7:9));
  let target=1+rivalScores.filter(x=>x>playerScore).length;

  if(execution==="super"){
   if(position===2){
    target=Math.min(target,2);
    if(Math.random()<(elite?.36:.46))target=1;
   }else{
    target=Math.min(target,position>1?position-1:1);
    if(position>=3&&Math.random()<.28)target=Math.max(1,target-1);
   }
  }else if(execution==="fail"){
   target=Math.max(target,Math.min(4,position+(Math.random()<.55?1:0)));
  }
  const sorted=[...ratings].sort((a,b)=>b-a),rivalRef=sorted[Math.min(2,Math.max(0,target-1))]||avgRival,gap=mine-rivalRef;
  return {targetPosition:clamp(target,1,4),playerStrength:mine,rivalStrength:rivalRef,gap,narrative:sportEffectNarrative(execution,mode,position,clamp(target,1,4),gap,st)};
 }

 const rival=adjacentRivalStrength(rivals,position),gap=mine-rival;
 let target=position;

 if(execution==="super"){
  if(position===1)target=1;
  else if(context.teamRace&&position===2){
   const order=context.order||[],mate=order.find(x=>x.side==="own"&&!x.player),matePos=mate?order.indexOf(mate)+1:null;
   if(matePos===1&&(mode==="team"||mode==="safe"))target=2;
   else target=Math.max(1,position-1);
  }else{
   target=Math.max(1,position-1);
   if(position>=3&&!safe&&Math.random()<clamp(32+Math.max(0,gap)*1.2,18,58))target=Math.max(1,target-1);
  }
 }else if(execution==="success"){
  if(safe){
   const holdBase=elite?75:80,hold=clamp(holdBase+gap*(elite?1.5:1.25)+st.gap*6+st.momentum*3,22,97);
   if(Math.random()*100>hold)target=Math.min(4,position+1);
   else if(position>1&&Math.random()*100<clamp((elite?3:6)+gap*(elite?.48:.65)+st.momentum*2,1,elite?16:24))target=position-1;
  }else{
   // W elicie zwykły zielony sukces nie oznacza automatycznego wyprzedzenia.
   const pass=clamp((elite?28:40)+gap*(elite?2.55:2.15)+st.momentum*(elite?3.4:4)+st.gap*2,elite?1:3,elite?78:90);
   if(position>1&&Math.random()*100<pass)target=position-1;
   else if(gap<-(elite?7:10)&&Math.random()<(elite?.31:.24))target=Math.min(4,position+1);
  }
 }else if(execution==="fail"){
  const priorFails=st.failedDecisions||0,consecutive=st.consecutiveFails||0;
  let lose=clamp(
   (safe?8:24)+Math.max(0,-gap)*(safe?.85:1.35)+priorFails*(safe?7:9)+consecutive*(safe?6:8)+
   Math.max(0,-st.gap)*(safe?3.5:4.5)+(mode==="attack"?7:0)+(elite&&gap<0?Math.min(12,-gap*.55):0),
   7,94
  );
  if(position<4&&Math.random()*100<lose)target=position+1;
  if(position<3&&consecutive>=1&&gap<-9&&Math.random()<clamp(7+consecutive*7,7,30))target=Math.min(4,target+1);
 }
 return {targetPosition:clamp(target,1,4),playerStrength:mine,rivalStrength:rival,gap,narrative:sportEffectNarrative(execution,mode,position,clamp(target,1,4),gap,st)};
}

function raceOutcomeProbabilities(mode,{phase="distance",rivals=[],teammate=null,context={},position=4}={}){
 const key=RACE_EVENT_LIBRARY[mode]?mode:"attack",skill=raceExecutionSkill(key,phase),st=raceState(context,position);
 const formDay=ensureDayForm(context.competitionKey||"race",context.dayToken||`${S.year}:race`).modifier;
 const adj=contextChoiceAdjustment(key,context,position);

 // Procent ruletki oznacza przede wszystkim jakość wykonania decyzji.
 // Nie odejmujemy tu bezpośrednio różnicy OVR do rywali — ta działa w osobnym skutku sportowym.
 let execution=64+(skill-65)*.50+formDay*.35+adj.success;
 if(context.advice?.suggested===key)execution+=(context.advice.quality?.bonus||1.5)*.55;
 if(phase==="start"&&key==="safe")execution+=3;

 let success=clamp(execution,key==="safe"||key==="team"?38:28,95);
 let superP=clamp(3+(skill-65)*.05+Math.max(0,formDay)*.16+adj.superAdj,1,14);
 let incident=clamp(.75+S.injuryRisk*.012-facilityLevel("technical")*.08+adj.incident,.2,5.5);

 if(key==="safe"||key==="team"){superP=Math.min(superP,6);incident=Math.min(incident,1.3)}
 const fail=Math.max(2,100-success-superP-incident),sum=success+superP+incident+fail;
 return {super:superP/sum*100,success:success/sum*100,fail:fail/sum*100,incident:incident/sum*100};
}
function rollOutcome(prob){
 const tiles=rollerSegments(prob,100);
 return tiles[rand(0,99)].key;
}
function raceEventNarrative(mode,outcome){const key=RACE_EVENT_LIBRARY[mode]?mode:"attack";if(outcome==="incident")return "";return pick(RACE_EVENT_LIBRARY[key]?.[outcome]||RACE_EVENT_LIBRARY.attack[outcome]||[])}
function raceIncidentFromLibrary(position){const item=weightedChoice(RACE_INCIDENTS);let target=position;if(item.positionLoss)target=clamp(position+rand(item.positionLoss[0],item.positionLoss[1]),1,4);if(item.positionGain)target=clamp(position-rand(item.positionGain[0],item.positionGain[1]),1,4);return {...item,targetPosition:target}}
function rollerSegments(prob,count=100){
 count=100;
 const spec=[
  {key:"super",className:"roller-super",p:Math.max(0,prob.super||0)},
  {key:"success",className:"roller-success",p:Math.max(0,prob.success||0)},
  {key:"fail",className:"roller-fail",p:Math.max(0,prob.fail||0)},
  {key:"incident",className:"roller-incident",p:Math.max(0,prob.incident||0)}
 ];
 const total=spec.reduce((s,x)=>s+x.p,0)||100;
 const exact=spec.map(x=>({...x,exact:x.p/total*100}));
 const counts=exact.map(x=>Math.floor(x.exact));
 let missing=100-counts.reduce((s,n)=>s+n,0);
 const order=exact.map((x,i)=>({i,rem:x.exact-counts[i]})).sort((a,b)=>b.rem-a.rem);
 for(let k=0;k<missing;k++)counts[order[k%order.length].i]++;
 let pool=[];
 spec.forEach((x,i)=>{for(let n=0;n<counts[i];n++)pool.push({...x})});
 // Mieszamy kafelki, ale zachowujemy dokładnie 100 sztuk i dokładne liczebności.
 for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]]}
 return pool;
}

function probabilitySummaryHtml(prob){
 if(!prob)return "";
 const tiles=rollerSegments(prob,100),counts={super:0,success:0,fail:0,incident:0};tiles.forEach(x=>counts[x.key]++);
 return `<div class="decision-probabilities">
  <span class="prob-super">◆ ${counts.super}% super</span>
  <span class="prob-success">● ${counts.success}% udane wykonanie</span>
  <span class="prob-fail">● ${counts.fail}% błąd wykonania</span>
  <span class="prob-incident">▲ ${counts.incident}% incydent</span>
 </div>`;
}
function outcomeLabel(outcome){return outcome==="super"?"WYJĄTKOWE WYKONANIE":outcome==="success"?"UDANE WYKONANIE":outcome==="incident"?"INCYDENT":"BŁĄD WYKONANIA"}
function showOutcomeRoller({title,subtitle="",mode="attack",prob,outcome,onDone}){
 const base=rollerSegments(prob,100),hits=base.map((s,i)=>s.key===outcome?i:-1).filter(i=>i>=0),hit=pick(hits.length?hits:[50]);
 const cycles=9,segments=[];for(let c=0;c<cycles;c++)segments.push(...base.map(s=>({...s})));
 const targetIndex=500+hit,startIndex=targetIndex-rand(68,86);
 const counts={super:0,success:0,fail:0,incident:0};base.forEach(x=>counts[x.key]++);
 const legend=`<div class="roller-legend"><span><i class="roller-dot roller-super"></i>${counts.super}% super</span><span><i class="roller-dot roller-success"></i>${counts.success}% udane wykonanie</span><span><i class="roller-dot roller-fail"></i>${counts.fail}% błąd wykonania</span><span><i class="roller-dot roller-incident"></i>${counts.incident}% incydent</span></div>`;
 const strip=`<div class="outcome-roller outcome-roller-loop"><div class="roller-marker"></div><div class="roller-strip" id="rollerStrip">${segments.map((s,i)=>`<span data-index="${i}" data-key="${s.key}" class="${s.className}"></span>`).join("")}</div></div>`;
 showModal("ROZSTRZYGNIĘCIE",title,`<p><b>Szanse wykonania wybranej decyzji:</b></p>${strip}${legend}`,[{title:"Losowanie trwa…",desc:"",action:()=>{}}]);
 const opts=$("modalOptions");if(opts)opts.style.display="none";
 requestAnimationFrame(()=>{
  const stripEl=document.getElementById("rollerStrip"),roller=document.querySelector(".outcome-roller");if(!stripEl||!roller)return;
  const tile=stripEl.querySelector("span"),style=getComputedStyle(stripEl),tw=tile?.getBoundingClientRect().width||24,gap=parseFloat(style.columnGap||style.gap)||2,step=tw+gap;
  const start=startIndex*step+tw/2-roller.clientWidth/2,end=targetIndex*step+tw/2-roller.clientWidth/2,duration=4.00+Math.random()*.45;
  stripEl.dataset.expectedOutcome=outcome;stripEl.dataset.targetIndex=String(targetIndex);
  animateRollerWithBrake(stripEl,start,end,duration,()=>{
   const box=$("modalText");
   if(box)box.insertAdjacentHTML("beforeend",`<div class="roller-result roller-result-${outcome}">${outcomeLabel(outcome)}</div>`);
   const options=$("modalOptions");
   if(options){
    options.style.display="";options.innerHTML="";
    const b=document.createElement("button");b.className="option";
    b.innerHTML="<strong>KONTYNUUJ</strong><small>Zobacz sportowy skutek decyzji.</small>";
    b.onclick=()=>{if(b.dataset.busy==="1")return;b.dataset.busy="1";b.disabled=true;try{onDone?.()}catch(error){console.error("Błąd po ruletce:",error);b.dataset.busy="0";b.disabled=false;if(S?.seasonFlowActive){recoverSeasonFlow(error);return}showModal("BŁĄD INTERAKTYWNEGO BIEGU","Gra odzyskała kontrolę",`Nie udało się przejść dalej.<br><b>Błąd techniczny:</b> ${String(error?.message||error||"Nieznany błąd")}`,[{title:"Wróć do gry",desc:"Zamknij komunikat i spróbuj ponownie.",action:()=>closeModal()}])}};
    options.appendChild(b);
   }
  });
 });
}
function resolveRaceDecision(mode,{phase="distance",rivals=[],teammate=null,context={},position=4,teamRace=false,probOverride=null}={}){
 const prob=probOverride||raceOutcomeProbabilities(mode,{phase,rivals,teammate,context,position});
 const outcome=rollOutcome(prob);
 if(outcome==="incident"){
  const incident=raceIncidentFromLibrary(position);
  return {prob,outcome,narrative:incident.text,targetPosition:incident.targetPosition,incident,sport:null};
 }
 const sport=resolveSportEffect(mode,outcome,{phase,rivals,context,position});
 return {prob,outcome,narrative:sport.narrative,targetPosition:sport.targetPosition,incident:null,sport};
}

function tacticalThemeForRace(rivals,teammate=null,context={}){
 const p=suggestedRaceOption(rivals,"start",teammate,context);
 return p==="inside"?"inside":p==="outside"?"outside":p==="attack"?"attack":"balanced";
}
function compatibleDistanceChoices(theme,position,teammate=null){
 let out=[];
 if(theme==="inside"){
  out=[{key:"inside",title:"Szukaj miejsca przy krawężniku",desc:"Kontynuuj krótszą linię i wykorzystaj technikę."},
       position>1?{key:"attack",title:"Zaatakuj pozycję",desc:"Wykorzystaj moment wyjścia z łuku."}:{key:"safe",title:"Zabezpiecz obecną pozycję",desc:"Kontroluj wewnętrzną."}];
 }else if(theme==="outside"){
  out=[{key:"outside",title:"Buduj prędkość po szerokiej",desc:"Kontynuuj napędzanie motocykla na zewnętrznej."},
       position>1?{key:"attack",title:"Zaatakuj pozycję",desc:"Wykorzystaj prędkość do ataku."}:{key:"safe",title:"Zabezpiecz obecną pozycję",desc:"Nie ryzykuj utraty prowadzenia."}];
 }else{
  out=[{key:"attack",title:"Zaatakuj pozycję",desc:"Podejmij próbę ataku, gdy otworzy się luka."},
       {key:"safe",title:"Zabezpiecz obecną pozycję",desc:"Ogranicz ryzyko i kontroluj sytuację."}];
 }
 if(teammate&&position>=2)out.push({key:"team",title:"Jedź parą z kolegą",desc:"Wykorzystaj osłonę i jazdę zespołową."});
 return out.slice(0,3);
}
function lateRaceChoices(theme,position,context={}){
 const fake={position,context,order:context.order||[]};
 return raceDecisionChoices(fake,{teamRace:!!context.teamRace,phase:"late"});
}

function distanceChoices(snapshot,{teamRace=false}={}){
 const teammate=teamRace?snapshot.order.find(x=>x.side==="own"&&!x.player):null;
 const rivals=snapshot.order.filter(x=>!x.player&&x.side!=="own");
 const theme=snapshot.context?.theme||tacticalThemeForRace(rivals,teammate,snapshot.context||{});
 snapshot.context.theme=theme;
 return raceDecisionChoices(snapshot,{teamRace,phase:"distance"});
}

function ensureStartSnapshotPosition(snapshot,target){
 if(!snapshot?.order?.length)return snapshot;
 target=clamp(target,1,4);
 const player=snapshot.order.find(r=>r.player);
 if(!player)return snapshot;
 const others=snapshot.order.filter(r=>!r.player).sort((a,b)=>b.raceScore-a.raceScore);
 const upper=target===1?(others[0]?.raceScore??player.raceScore)+1:(others[target-2]?.raceScore??player.raceScore)-.2;
 const lower=target>=4?(others[2]?.raceScore??player.raceScore)-1:(others[target-1]?.raceScore??player.raceScore)+.2;
 player.raceScore=target===1?upper:target===4?lower:(upper+lower)/2;
 snapshot.order=[player,...others].sort((a,b)=>b.raceScore-a.raceScore);
 snapshot.position=snapshot.order.findIndex(r=>r.player)+1;
 return snapshot;
}

function snapshotFromRaceResult(result){
 const order=(result.order||result.scores||[]).map(r=>({...r,raceScore:Number.isFinite(r.finalScore)?r.finalScore:(r.raceScore||0)}));
 return {order,position:result.position,context:result.context||{}};
}

function finishRaceFromSnapshot(snapshot,mode,{teamRace=false,rivals=null,teammate=null,context={},preview=false,suppressIncident=false}={}){
 const incident=(preview||suppressIncident)?null:raceIncident(mode);
 if(incident)return {position:4,points:0,incident,scores:null,order:null,context:{...(snapshot.context||{}),...context}};
 const merged={...(snapshot.context||{}),...context};
 merged.tacticalBonus=(merged.tacticalBonus||0)+decisionTacticalBonus(mode,rivals||snapshot.order.filter(r=>!r.player&&r.side!=="own"),"distance",teammate,merged);
 const scores=snapshot.order.map(r=>{
  let score=r.raceScore*.43+(r.player?playerPhaseScore(mode,"distance",merged):raceBaseScore(r,merged))*.57;
  if(r.player&&mode==="team"&&teamRace){
   const mate=snapshot.order.find(x=>x.side==="own"&&!x.player);
   if(mate&&mate.rating>=r.rating+4)score+=rand(2,5);
  }
  return {...r,finalScore:score};
 }).sort((a,b)=>b.finalScore-a.finalScore);
 const position=scores.findIndex(r=>r.player)+1;
 return {position,points:4-position,incident:null,scores,order:scores,context:merged};
}
function rankHeatRiders(riders){
 return riders.map(r=>({...r,score:raceBaseScore(r)})).sort((a,b)=>b.score-a.score);
}
function scoreHeat(ctx,heatNo,riders,forcedPlayerOutcome=null){
 let ordered;
 if(forcedPlayerOutcome?.scores){
  const scoreMap=new Map(forcedPlayerOutcome.scores.map(r=>[r.player?"player":`${r.side}-${r.name}-${r.rating}`,r.finalScore]));
  ordered=riders.map(r=>{
   const key=r.player?"player":`${r.side}-${r.name}-${r.rating}`;
   return {...r,score:scoreMap.get(key)??raceBaseScore(r)};
  }).sort((a,b)=>b.score-a.score);
 }else if(forcedPlayerOutcome){
  const player=riders.find(r=>r.player),others=riders.filter(r=>!r.player);
  const sortedOthers=rankHeatRiders(others),idx=clamp(forcedPlayerOutcome.position-1,0,3);
  ordered=[...sortedOthers];ordered.splice(idx,0,{...player,score:999});
 }else ordered=rankHeatRiders(riders);
 const base=[3,2,1,0];
 const assignments=ordered.map((r,i)=>({...r,points:base[i]}));
 const ownPts=assignments.filter(r=>r.side==="own").reduce((s,r)=>s+r.points,0);
 const awayPts=assignments.filter(r=>r.side==="away").reduce((s,r)=>s+r.points,0);
 ctx.teamScore+=ownPts;ctx.opponentScore+=awayPts;ctx.completedHeats=heatNo;
 ctx.heatLog.push({heatNo,ownPts,awayPts,total:6});
 return {assignments,ownPts,awayPts,incident:null};
}
function simulateNonPlayerHeat(ctx,heatNo){
 const pair=pairForHeat(ctx,heatNo,false);
 const riders=[...pair.own.map(r=>({...r,side:"own"})),...pair.away.map(r=>({...r,side:"away"}))];
 scoreHeat(ctx,heatNo,riders);
}
function simulateUntilHeat(ctx,targetHeat){
 while(ctx.completedHeats<targetHeat-1)simulateNonPlayerHeat(ctx,ctx.completedHeats+1);
}
function playerHeatBonus(assignments){
 if(!Array.isArray(assignments)||!assignments.length)return 0;
 const playerIndex=assignments.findIndex(r=>r?.player);
 if(playerIndex<=0)return 0;
 const player=assignments[playerIndex],directlyAhead=assignments[playerIndex-1];
 if(!directlyAhead||directlyAhead.side!==player.side)return 0;
 const playerPts=Number(player.points||0),matePts=Number(directlyAhead.points||0);
 if(matePts===3&&playerPts===2)return 1;
 if(matePts===2&&playerPts===1)return 1;
 return 0;
}
function scoreToken(points,bonus){return `${points}${bonus?"*":""}`}
function playerScoreLine(ctx){
 return `${ctx.scoreTokens.join(", ")}${ctx.scoreTokens.length?` — ${ctx.points}+${ctx.bonus} pkt`:`0+0 pkt`}`;
}
function canRideNominatedHeat(ctx){
 return !ctx.withdrawn&&Math.abs(ctx.teamScore-ctx.opponentScore)<=8&&ctx.points>=Math.max(7,ctx.program.length*1.7)&&S.chance>=76&&overall()>=70&&!ctx.nominated&&ctx.completedHeats<15;
}
function nextPlayerHeat(ctx){
 if(ctx.withdrawn)return null;
 if(ctx.rideIndex<ctx.program.length)return ctx.program[ctx.rideIndex];
 if(ctx.nominated&&ctx.nominatedHeat&&!ctx.results.some(r=>r.heat===ctx.nominatedHeat))return ctx.nominatedHeat;
 return null;
}
function showHeatChoice(ctx,next){
 const heatNo=nextPlayerHeat(ctx);
 if(!heatNo){finishPlayableMatch(ctx,next);return}
 simulateUntilHeat(ctx,heatNo);
 const pair=pairForHeat(ctx,heatNo,true),partner=pair.own[1],rivals=pair.away;
 const isNomination=ctx.nominated&&heatNo===ctx.nominatedHeat,scoreCtx=importantMatchScoreContext(ctx);
 const startContext=mentorAdviceContext(rivals,"start",partner,{dayToken:`${S.year}:league:${heatNo}`,track:trackProfileForClub(S.club)});
 const advice=raceAdviceText(rivals,"start",partner,startContext);
 const specs=[
  ["attack","Mocno postaw na start","Największy nacisk na reakcję i pierwszy łuk."],
  ["inside","Pilnuj krawężnika","Postaw na pierwszy łuk i krótszą linię."],
  ["outside","Wyjdź szerzej","Spróbuj od razu budować prędkość na zewnętrznej."],
  ["safe","Spokojny start","Mniej ryzyka i większy nacisk na późniejszą część biegu."]
 ];
 const options=specs.map(([key,title,desc])=>{
  const prob=raceOutcomeProbabilities(key,{phase:"start",rivals,teammate:partner,context:startContext,position:2});
  return {title,desc,prob,action:()=>startLeagueRace(key,ctx,pair,heatNo,next,startContext,prob)};
 });
 showModal(isNomination?"BIEG NOMINOWANY":`TWÓJ BIEG ${ctx.rideIndex+1}/${ctx.program.length}`,
  `${scoreCtx.match}${scoreCtx.aggregate?` • ${scoreCtx.aggregate}`:""}`,
  `Bieg ${heatNo} z 15. Ty: OVR ${overall()} • kolega: OVR ${partner.rating} • rywale: OVR ${rivals.map(r=>r.rating).join(" i ")}. ${scoreCtx.note}${advice}`,options);
}
function startLeagueRace(startMode,ctx,pair,heatNo,next,startContext=null,startProb=null){
 const entrants=[{...pair.own[0],side:"own",player:true},{...pair.own[1],side:"own"},...pair.away.map(r=>({...r,side:"away"}))];
 startContext=startContext||mentorAdviceContext(pair.away,"start",pair.own[1],{dayToken:`${S.year}:league:${heatNo}`,track:trackProfileForClub(S.club)});
 startContext.raceState=newRaceState(2);startContext.teamRace=true;
 startProb=startProb||raceOutcomeProbabilities(startMode,{phase:"start",rivals:pair.away,teammate:pair.own[1],context:startContext,position:2});
 const resolved=resolveRaceDecision(startMode,{phase:"start",rivals:pair.away,teammate:pair.own[1],context:startContext,position:2,teamRace:true,probOverride:startProb});
 showOutcomeRoller({title:"Start i pierwszy łuk",subtitle:`<p>${resolved.narrative}</p>`,mode:startMode,prob:startProb,outcome:resolved.outcome,onDone:()=>{
  startContext.tacticalBonus=decisionTacticalBonus(startMode,pair.away,"start",pair.own[1],startContext);
  let snap=raceStartSnapshot(startMode,entrants,startContext);snap=ensureStartSnapshotPosition(snap,resolved.targetPosition);
  startContext.order=snap.order;updateRaceState(startContext,2,snap.position,resolved.outcome,startMode);
  maybeShiftTrackConditions(startContext,"distance");
  const dc=mentorAdviceContext(pair.away,"distance",pair.own[1],startContext);dc.raceState=startContext.raceState;dc.trackShift=startContext.trackShift;dc.trackShiftChecked=true;snap.context=dc;
  const choices=distanceChoices(snap,{teamRace:true}).map(opt=>{const p=raceOutcomeProbabilities(opt.key,{phase:"distance",rivals:pair.away,teammate:pair.own[1],context:dc,position:snap.position});return {title:opt.title,desc:opt.desc,prob:p,action:()=>finishLeagueRace(opt.key,ctx,pair,heatNo,next,snap,dc,p)}});
  const scoreCtx=importantMatchScoreContext(ctx);
  showModal("PIERWSZE OKRĄŻENIE",`Bieg ${heatNo}: jesteś ${snap.position}.`,
   `${resolved.narrative} ${raceSituationNarrative(snap,{teamRace:true})} ${scoreCtx.note}${currentRaceAdvice(pair.away,"distance",pair.own[1],dc)}`,choices);
 }});
}
function completeLeagueRaceResult(result,ctx,pair,heatNo,next,mode){
 const riders=[{...pair.own[0],side:"own",player:true},{...pair.own[1],side:"own"},...pair.away.map(r=>({...r,side:"away"}))];
 let heat;
 if(result.incident){
  const others=rankHeatRiders(riders.filter(r=>!r.player));
  const forced=[...others,{...riders.find(r=>r.player),score:-999}].map(r=>({...r,finalScore:r.score}));
  heat=scoreHeat(ctx,heatNo,riders,{scores:forced});
 }else heat=scoreHeat(ctx,heatNo,riders,{scores:result.scores});
 const player=heat.assignments.find(r=>r.player),place=heat.assignments.findIndex(r=>r.player)+1;
 const points=player?.points||0,bonus=playerHeatBonus(heat.assignments);
 ctx.points+=points;ctx.bonus+=bonus;ctx.scoreTokens.push(scoreToken(points,bonus));
 ctx.results.push({heat:heatNo,place,points,bonus,incident:result.incident?.type||null});
 ctx.rideIndex++;
 if(result.incident?.serious)ctx.withdrawn=true;
 if(place===1){S.morale+=2;S.reputation+=1}else if(place===4)S.morale-=1;
 const sc=importantMatchScoreContext(ctx);
 const decisionNarrative=result.decisionNarrative?`<p class="heat-narrative">${result.decisionNarrative}</p>`:"";
 const incident=result.incident&&result.incident.type!=="majorMistake"?`<p class="heat-incident">${result.incident.text}</p>`:"";
 showModal("WYNIK BIEGU",`${place}. miejsce — ${points}${bonus?"*":""} pkt`,
  `Bieg ${heatNo}: ${heat.ownPts}:${heat.awayPts}. Po biegu: ${sc.match}${sc.aggregate?` • ${sc.aggregate}`:""}.<br><b>Twój dorobek:</b> ${playerScoreLine(ctx)}.${decisionNarrative}${incident}`,
  [{title:"Kontynuuj mecz",desc:ctx.withdrawn?"Uraz kończy twój udział w tym spotkaniu.":"Przejdź do kolejnego startu lub końcowego wyniku.",action:()=>{
   closeModal();
   if(ctx.withdrawn){finishPlayableMatch(ctx,next);return}
   if(ctx.rideIndex<ctx.program.length){showHeatChoice(ctx,next);return}
   if(canRideNominatedHeat(ctx)){
    ctx.nominated=true;ctx.nominatedHeat=ctx.completedHeats<14?14:15;
    showModal("DECYZJA TRENERA","Jedziesz w biegu nominowanym",
     `Zdobyłeś ${playerScoreLine(ctx)} i dostajesz dodatkowy start w biegu ${ctx.nominatedHeat}.`,
     [{title:"Jedź",desc:"Rozegraj dodatkowy bieg.",action:()=>{closeModal();showHeatChoice(ctx,next)}},
      {title:"Oddaj bieg liderowi",desc:"Końcówka zostanie zasymulowana.",action:()=>finishPlayableMatch(ctx,next)}]);return;
   }
   finishPlayableMatch(ctx,next);
  }}]);
}
function finishLeagueRace(mode,ctx,pair,heatNo,next,snap,c=null,prob=null){
 c=c||snap.context||{};c.order=snap.order||snap.scores||c.order||[];c.teamRace=true;
 prob=prob||raceOutcomeProbabilities(mode,{phase:"distance",rivals:pair.away,teammate:pair.own[1],context:c,position:snap.position});
 const before=snap.position,resolved=resolveRaceDecision(mode,{phase:"distance",rivals:pair.away,teammate:pair.own[1],context:c,position:before,teamRace:true,probOverride:prob});
 let narrative="";
 showOutcomeRoller({title:mode==="safe"?"Kontrola sytuacji":mode==="team"?"Jazda parą":mode==="inside"?"Jazda przy krawężniku":mode==="outside"?"Jazda po szerokiej":"Atak",
  subtitle:"",mode,prob,outcome:resolved.outcome,onDone:()=>{
   let preview=finishRaceFromSnapshot(snap,mode,{teamRace:true,rivals:pair.away,teammate:pair.own[1],context:c,preview:true,suppressIncident:true});preview=ensurePlayerResultPosition(preview,resolved.targetPosition);
   updateRaceState(c,before,preview.position,resolved.outcome,mode);
   narrative=resolved.outcome==="incident"?resolved.narrative:contextualRaceNarrative(mode,resolved.outcome,before,preview.position,c);
   const lateContext=mentorAdviceContext(pair.away,"late",pair.own[1],c);lateContext.raceState=c.raceState;lateContext.trackShift=c.trackShift;lateContext.order=preview.order||preview.scores||[];lateContext.teamRace=true;lateContext.teamRace=true;
   const choices=raceDecisionChoices({...preview,context:lateContext},{teamRace:true,phase:"late"}).map(opt=>{const p=raceOutcomeProbabilities(opt.key,{phase:"late",rivals:pair.away,teammate:pair.own[1],context:lateContext,position:preview.position});return {title:opt.title,desc:opt.desc,prob:p,action:()=>{
    const beforeLate=preview.position,last=resolveRaceDecision(opt.key,{phase:"late",rivals:pair.away,teammate:pair.own[1],context:lateContext,position:beforeLate,teamRace:true,probOverride:p});
    showOutcomeRoller({title:opt.title,subtitle:"",mode:opt.key,prob:p,outcome:last.outcome,onDone:()=>{
     const lateSnap=snapshotFromRaceResult(preview);
     let result=finishRaceFromSnapshot(lateSnap,opt.key,{teamRace:true,rivals:pair.away,teammate:pair.own[1],context:lateContext,suppressIncident:true});result=ensurePlayerResultPosition(result,last.targetPosition);
     updateRaceState(lateContext,beforeLate,result.position,last.outcome,opt.key);
     result.decisionNarrative=last.outcome==="incident"?last.narrative:contextualRaceNarrative(opt.key,last.outcome,beforeLate,result.position,lateContext);
     if(last.incident)result.incident={type:last.incident.key,serious:false,text:last.incident.text};
     completeLeagueRaceResult(result,ctx,pair,heatNo,next,opt.key);
    }});
   }}});
   showModal("KOŃCÓWKA BIEGU",`Jedziesz ${preview.position}.`,`${narrative} ${raceSituationNarrative(preview,{teamRace:true})}${currentRaceAdvice(pair.away,"late",pair.own[1],lateContext)}`,choices);
  }});
}
function finishPlayableMatch(ctx,next){
 while(ctx.completedHeats<15)simulateNonPlayerHeat(ctx,ctx.completedHeats+1);
 const distributed=ctx.heatLog.reduce((s,h)=>s+h.total,0);
 if(ctx.completedHeats!==15||distributed!==90)throw new Error(`Nieprawidłowy mecz: ${ctx.completedHeats} biegów, ${distributed} punktów`);
 const won=ctx.teamScore>ctx.opponentScore,draw=ctx.teamScore===ctx.opponentScore;
 const stage=ctx.stage||{label:"mecz fazy finałowej",effect:"wynik wpływa na końcowy rezultat sezonu"};
 const resultText=won?`Zwycięstwo ${clubDisplayName(S.club)}.`:draw?"Remis.":`Zwycięstwo ${clubDisplayName(ctx.opponent)}.`;
 const sc=importantMatchScoreContext(ctx);
 const ourAgg=ctx.tieContext?.firstLeg?ctx.tieContext.firstLeg.ourScore+ctx.teamScore:ctx.teamScore;
 const oppAgg=ctx.tieContext?.firstLeg?ctx.tieContext.firstLeg.opponentScore+ctx.opponentScore:ctx.opponentScore;
 const seedA=ctx.tieContext?.seedOur??999,seedB=ctx.tieContext?.seedOpp??999;
 const playerWonTie=ourAgg===oppAgg?seedA<=seedB:ourAgg>oppAgg;
 const consequence=ctx.tieContext?.firstLeg?(playerWonTie?"Wygrywacie dwumecz.":"Przegrywacie dwumecz."):(won?stage.effect:draw?"Spotkanie kończy się remisem.":`Sytuacja w ${stage.label} staje się trudniejsza.`);
 const first=ctx.tieContext?.firstLeg;
 if(first){
  S.playedPostseasonTie={
   year:S.year,league:S.league,club:S.club,opponent:ctx.opponent,
   firstLeg:first,secondLeg:{ourScore:ctx.teamScore,opponentScore:ctx.opponentScore},
   totalOur:ourAgg,totalOpponent:oppAgg
  };
 }
 addHistory(`${stage.label}: ${clubDisplayName(S.club)} – ${clubDisplayName(ctx.opponent)}`,
  `${ctx.teamScore}:${ctx.opponentScore}${sc.aggregate?` • ${sc.aggregate}`:""}. ${resultText} Twój dorobek: ${playerScoreLine(ctx)} w ${ctx.results.length} biegach.`);
 S.careerPoints+=(ctx.points+ctx.bonus)*2+(won?8:0);S.reputation+=ctx.points>=10?4:ctx.points>=7?2:0;S.morale+=won?4:draw?0:-2;
 showModal("KONIEC MECZU",`${clubDisplayName(S.club)} ${ctx.teamScore}:${ctx.opponentScore} ${clubDisplayName(ctx.opponent)}`,
  `${sc.aggregate?`${sc.aggregate}. `:""}${resultText} ${consequence}<br><b>Twój dorobek:</b> ${playerScoreLine(ctx)} w ${ctx.results.length} biegach.`,
  [{title:"Przejdź do podsumowania sezonu",desc:"Ten dokładny wynik zostanie wykorzystany w fazie finałowej.",action:()=>{
   closeModal();next({played:true,points:ctx.points,bonus:ctx.bonus,rides:ctx.results.length,boost:0,matchScore:`${ctx.teamScore}:${ctx.opponentScore}`,opponent:ctx.opponent,stage:stage.label});
  }}]);
}
function openingPlayoffOpponent(table){
 const ranked=table.rows.map(r=>r.name),level=leagueByName(table.league)?.level||3;
 const idx=ranked.findIndex(n=>clubBaseName(n)===clubBaseName(S.club));
 if(idx<0)return null;
 if(level===3){
  if(idx>3)return null;
  return ranked[idx===0?3:idx===3?0:idx===1?2:1];
 }
 if(idx<=3){
  const top=ranked.slice(0,4),choice=chooseOpponent(top.slice(1),ranked);
  const other=top.slice(1).filter(x=>x!==choice);
  if(clubBaseName(S.club)===clubBaseName(top[0]))return choice;
  if(clubBaseName(S.club)===clubBaseName(choice))return top[0];
  return clubBaseName(S.club)===clubBaseName(other[0])?other[1]:other[0];
 }
 const bottom=ranked.slice(4,8),choice=chooseOpponent(bottom.slice(1),ranked);
 const other=bottom.slice(1).filter(x=>x!==choice);
 if(clubBaseName(S.club)===clubBaseName(bottom[0]))return choice;
 if(clubBaseName(S.club)===clubBaseName(choice))return bottom[0];
 return clubBaseName(S.club)===clubBaseName(other[0])?other[1]:other[0];
}
function createImportantTieContext(opponent,table=null){
 const ownStrength=teamData(S.club)?.strength||leagueBaseline(S.league);
 const oppStrength=teamData(opponent)?.strength||leagueBaseline(S.league);
 const first=simulateMatchScore(oppStrength,ownStrength);
 const ranked=table?.rows?.map(r=>r.name)||[];
 return {
  leg:2,
  seedOur:Math.max(0,ranked.findIndex(n=>clubBaseName(n)===clubBaseName(S.club))),
  seedOpp:Math.max(0,ranked.findIndex(n=>clubBaseName(n)===clubBaseName(opponent))),
  firstLeg:{ourScore:first.away,opponentScore:first.home,display:`${clubDisplayName(opponent)} ${first.home}:${first.away} ${clubDisplayName(S.club)}`}
 };
}
function importantMatchScoreContext(ctx){
 const match=`${clubDisplayName(S.club)} ${ctx.teamScore}:${ctx.opponentScore} ${clubDisplayName(ctx.opponent)}`;
 if(!ctx.tieContext?.firstLeg)return {match,aggregate:"",note:""};
 const ourAgg=ctx.tieContext.firstLeg.ourScore+ctx.teamScore,oppAgg=ctx.tieContext.firstLeg.opponentScore+ctx.opponentScore,diff=ourAgg-oppAgg;
 return {match,aggregate:`Dwumecz: ${ourAgg}:${oppAgg}`,note:diff>0?`W dwumeczu prowadzicie ${diff} pkt.`:diff<0?`W dwumeczu przegrywacie ${Math.abs(diff)} pkt.`:"W dwumeczu jest remis."};
}
function importantMomentStillRelevant(ctx){return true}
function heatClassificationHtml(){return ""}
function decisiveRideHeats(size){return scheduledRideHeats(size)}
function offerPlayableMatch(table,next){
 const eligibility=importantMatchEligibility(table);
 let opponent=openingPlayoffOpponent(table);
 const pos=table.pos||8,level=leagueByName(table.league)?.level||3;
 // Dla dolnej części tabeli priorytet ma najbardziej decydujący etap walki o utrzymanie.
 if(level<=2&&pos>=7){
  const preview=simulatePlayoffs(table,0);
  const survivalLine=preview.summary.find(x=>x.startsWith("Dwumecz o utrzymanie:")&&x.includes(clubBaseName(S.club)));
  if(survivalLine){
   const names=table.rows.map(r=>r.name);
   const found=names.find(n=>clubBaseName(n)!==clubBaseName(S.club)&&survivalLine.includes(n));
   if(found)opponent=found;
  }
 }
 if(!eligibility.eligible||!opponent){next({played:false,points:0,bonus:0,rides:0,boost:0});return}
 const stage=playableMatchStage(table),preview=createImportantTieContext(opponent,table);
 showModal("KLUCZOWY DWUMECZ",`${stage.label} — ${table.league} (rewanż)`,
  `Pierwszy mecz: ${preview.firstLeg.display}. W rewanżu rozegrasz wszystkie swoje zaplanowane biegi, a wynik trafi bezpośrednio do fazy finałowej.`,
  [
   {title:"Rozegraj wszystkie moje biegi",desc:`Plan podstawowy: ${riderProgramSize()} starty. Możliwy dodatkowy bieg nominowany.`,action:()=>{
    closeModal();const ctx=createMatchContext(opponent);ctx.tieContext=preview;ctx.stage=stage;showHeatChoice(ctx,next);
   }},
   {title:"Symuluj cały rewanż",desc:"Gra policzy rzeczywisty wynik tego samego dwumeczu bez ręcznych decyzji.",action:()=>{
    const ctx=createMatchContext(opponent);ctx.tieContext=preview;ctx.stage=stage;
    while(ctx.completedHeats<15)simulateNonPlayerHeat(ctx,ctx.completedHeats+1);
    const rides=riderProgramSize(),pph=clamp(.70+(overall()-60)/39*1.85+(currentFormRating()-60)/85,.25,2.85);
    const pts=clamp(Math.round(rides*pph+rand(-2,2)),0,rides*3),bonus=clamp(Math.round(rides*Math.max(0,pph-1.45)*.20),0,rides-1);
    const ourAgg=preview.firstLeg.ourScore+ctx.teamScore,oppAgg=preview.firstLeg.opponentScore+ctx.opponentScore;
    S.playedPostseasonTie={year:S.year,league:S.league,club:S.club,opponent,firstLeg:preview.firstLeg,secondLeg:{ourScore:ctx.teamScore,opponentScore:ctx.opponentScore},totalOur:ourAgg,totalOpponent:oppAgg};
    closeModal();next({played:false,points:pts,bonus,rides,boost:0,opponent,stage:stage.label});
   }}
  ]);
}

function canonicalClubName(name){
 const base=clubBaseName(name);
 for(const league of LEAGUES){
  const found=league.teams.find(([teamName])=>clubBaseName(teamName)===base);
  if(found)return found[0];
 }
 const expansion=EXPANSION_CLUBS.find(club=>clubBaseName(club.name)===base);
 return expansion?.name||name;
}
function trackProfileForClub(name){
 const canonical=canonicalClubName(name);
 if(TRACK_PROFILES[canonical])return TRACK_PROFILES[canonical];
 const base=clubBaseName(name);
 const key=Object.keys(TRACK_PROFILES).find(team=>clubBaseName(team)===base);
 return key?TRACK_PROFILES[key]:null;
}
function homeTrackImpact(){
 const club=S.club,city=clubCity(club)||clubBaseName(club)||club,profile=trackProfileForClub(club);
 if(!profile)return {value:0,text:"brak szczególnej premii torowej",club,city};
 const skillValue=S.skills[profile.skill],value=clamp((skillValue-50)*0.16+facilityLevel("training"),-4,11);
 return {value,text:`${profile.label}; kluczowa cecha: ${profile.bonus} (${Math.round(skillValue)})`,club,city};
}

function careerFinanceStage(){
 if(S.league==="Etap szkolenia")return "academy";
 if(S.age<=18)return "youngJunior";
 if(S.age<=21)return "junior";
 if(S.age<=25)return "youngSenior";
 if(overall()>=84||S.reputation>=70)return "star";
 return "senior";
}
function clubCostCoverage(stage){
 const finance=S.clubFinance?.[clubBaseName(S.club)]||{wealth:50};
 const wealthAdj=clamp((finance.wealth-50)/500,-.06,.08);
 const base={
  academy:1,
  youngJunior:.82,
  junior:.66,
  youngSenior:.22,
  senior:.04,
  star:0
 }[stage]??0;
 return clamp(base+wealthAdj,0,.92);
}
function debtLimit(){
 const stage=careerFinanceStage();
 if(stage==="academy"||stage==="youngJunior")return 0;
 if(stage==="junior")return 25000;
 if(stage==="youngSenior")return 90000;
 if(stage==="senior")return 180000;
 return 300000;
}
function operatingCostBreakdown({heats=0,grossEarnings=0,internationalCount=0}={}){
 const stage=careerFinanceStage();
 if(stage==="academy"){
  return {total:0,clubPaid:0,playerPaid:0,support:0,stage};
 }
 const leagueLevel=leagueByName(S.league)?.level||3;
 const fixedByStage={
  youngJunior:[30000,24000,18000],
  junior:[52000,42000,32000],
  youngSenior:[115000,85000,62000],
  senior:[185000,135000,95000],
  star:[290000,220000,155000]
 };
 const fixed=fixedByStage[stage][leagueLevel-1];
 const staffFactor={youngJunior:70,junior:105,youngSenior:190,senior:260,star:360}[stage];
 const staff=Math.round((overall()**1.32)*staffFactor);
 const wearRate={youngJunior:210,junior:330,youngSenior:650,senior:900,star:1250}[stage];
 const equipmentWear=Math.round(heats*(wearRate+S.equipment*3.2));
 const internationalRate={youngJunior:10000,junior:18000,youngSenior:40000,senior:65000,star:95000}[stage];
 const international=internationalCount*internationalRate;
 const lifestyle=stage==="star"?Math.max(0,Math.round((S.reputation-65)*2200)):0;
 const facilityShare={youngJunior:.15,junior:.30,youngSenior:.65,senior:1,star:1}[stage];
 const facility=Math.round(facilityMaintenance()*facilityShare);
 const sgpProgram=isQualifiedForCurrentSGP()?Math.round(220000+overall()*3300+S.equipment*1600):0;
 const eliteTeam=careerFinanceStage()==="star"?Math.round(Math.max(0,S.reputation-65)*4800):0;
 const rawTotal=fixed+staff+equipmentWear+international+lifestyle+facility+sgpProgram+eliteTeam+(S.seasonServiceSurcharge||0);
 const coverage=clubCostCoverage(stage);
 let clubPaid=Math.round(rawTotal*coverage);
 let playerPaid=rawTotal-clubPaid;
 const difficultyFactor=S.difficulty==="easy"?.88:S.difficulty==="hard"?1.12:1;
 playerPaid=Math.round(playerPaid*difficultyFactor);

 // Na normalnym poziomie standardowy sezon ma pozostawiać realną przestrzeń decyzyjną,
 // ale nie generować absurdalnego długu u juniora.
 const affordabilityCap={
  youngJunior:Math.max(9000,Math.round(grossEarnings*.55+8000)),
  junior:Math.max(16000,Math.round(grossEarnings*.72+15000)),
  youngSenior:Math.max(45000,Math.round(grossEarnings*.95+35000)),
  senior:Math.max(75000,Math.round(grossEarnings*1.08+55000)),
  star:Math.max(140000,Math.round(grossEarnings*1.18+90000))
 }[stage];
 let support=0;
 if(S.difficulty!=="hard"&&playerPaid>affordabilityCap){
  support=playerPaid-affordabilityCap;
  clubPaid+=support;
  playerPaid=affordabilityCap;
 }
 return {total:rawTotal,clubPaid,playerPaid,support,stage,coverage};
}
function operatingCosts(){
 const gross=S?.season?.earnings>0?S.season.earnings:0;
 const heats=S?.season?.heats||0;
 const international=(S?.competitions||[]).filter(c=>/Grand Prix|SEC|Świata|Europy/.test(c.name)).length;
 return operatingCostBreakdown({heats,grossEarnings:gross,internationalCount:international}).playerPaid;
}
function settleSeasonFinances(grossEarnings,heats,internationalCount){
 const breakdown=operatingCostBreakdown({heats,grossEarnings,internationalCount});
 let net=grossEarnings-breakdown.playerPaid;
 let projected=S.budget+net;
 const limit=debtLimit();
 let rescue=0;

 // Szkółka i młody junior nie wpadają w standardowy debet — klub pokrywa brakującą część.
 if(limit===0&&projected<0){
  rescue=-projected;
  breakdown.clubPaid+=rescue;
  breakdown.playerPaid=Math.max(0,breakdown.playerPaid-rescue);
  net=grossEarnings-breakdown.playerPaid;
  projected=S.budget+net;
 }
 // Starszy zawodnik może wejść w kontrolowane zadłużenie, lecz nie w spiralę bez końca.
 if(projected<-limit){
  rescue+=(-limit-projected);
  breakdown.clubPaid+=(-limit-projected);
  breakdown.playerPaid=Math.max(0,breakdown.playerPaid-(-limit-projected));
  net=grossEarnings-breakdown.playerPaid;
 }
 return {...breakdown,net,rescue,debtLimit:limit};
}

function equipmentUpgradeGain(rawGain){
 let gained=0;
 for(let i=0;i<rawGain;i++){
  const value=S.equipment;
  const chance=value<70?.95:value<82?.68:value<90?.38:value<96?.15:.04;
  if(Math.random()<chance){S.equipment+=1;gained++}
 }
 return gained;
}
function applyMentorGrowth(m){
 const gained=[];
 for(const [key,amount] of Object.entries(m.effects||{})){
  let actual=0;
  for(let i=0;i<amount;i++)actual+=tryNaturalGrowth(key,1);
  if(actual)gained.push(`${SKILLS[key]} +${actual}`);
 }
 if(m.pro)applyMetaDelta("professionalism",m.pro);
 if(m.equipment){
  const equipmentGain=equipmentUpgradeGain(m.equipment);
  if(equipmentGain)gained.push(`sprzęt +${equipmentGain}`);
 }
 return gained;
}

function mentorRisk(m){
 if(m.tier==="local")return 24;
 if(m.tier==="regional")return 14;
 if(m.tier==="elite")return 7;
 return 3;
}
function mentorEffectSummary(m){
 const parts=Object.entries(m.effects||{}).map(([k,v])=>`${SKILLS[k]} +${v}`);
 if(m.pro)parts.push(`profesjonalizm +${m.pro}`);
 if(m.equipment)parts.push(`sprzęt +${m.equipment}`);
 return parts.join(" • ");
}
function applyMentor(m,charge=true){
 if(charge)S.budget-=m.cost;
 if(m.surprise)addHistory("Niespodziewany kontakt",`${m.name} sam proponuje ci krótką współpracę mimo twojej obecnej pozycji w świecie żużla.`);
 const failureChance=mentorRisk(m);
 const failed=Math.random()*100<failureChance;
 if(failed){
  const fallbackKeys=Object.keys(m.effects||{});
  if(fallbackKeys.length)tryNaturalGrowth(pick(fallbackKeys),1);
  applyMetaDelta("professionalism",1);
  addHistory(`Mentor: ${m.name}`,`Program nie przyniósł pełnego efektu. Otrzymujesz jedynie niewielką poprawę. Koszt: ${money(m.cost)}.`);
 }else{
  const gained=applyMentorGrowth(m);
  S.reputation+=m.tier==="star"?4:m.tier==="elite"?3:1;
  addHistory(`Mentor: ${m.name}`,`${m.desc}. Efekt: ${gained.length?gained.join(" • "):"brak trwałego wzrostu — parametry są już bardzo wysokie"}. Koszt: ${money(m.cost)}.`);
 }
 S.lastMentorYear=S.year;
 S.activeMentor={name:m.name,tier:m.tier||"local",year:S.year};
 normalize();
}
function mentorEligible(m){
 if(S.age<=16&&m.cost>28000)return false;
 if(S.age<=18&&m.cost>45000)return false;
 if(S.age<=21&&m.cost>70000)return false;
 if((m.minRep||0)>S.reputation)return false;
 if((m.minOverall||0)>overall())return false;
 return true;
}
function weightedMentorPool(){
 const local=(LOCAL_MENTORS[S.club]||LOCAL_MENTORS[S.academyClub]||[]).filter(mentorEligible);
 const national=NATIONAL_MENTORS.filter(mentorEligible);
 const pool=[];
 // Lokalni mentorzy dominują, szczególnie we wczesnej karierze.
 local.forEach(m=>{
  const weight=m.tier==="local"?8:m.tier==="regional"?4:m.tier==="star"?1:2;
  for(let i=0;i<weight;i++)pool.push(m);
 });
 national.forEach(m=>{
  let weight=m.tier==="elite"?1:0.25;
  if(S.reputation>=50&&overall()>=74)weight=m.tier==="elite"?2:0.7;
  if(S.reputation>=70&&overall()>=82)weight=m.tier==="elite"?3:1.5;
  for(let i=0;i<Math.floor(weight);i++)pool.push(m);
  if(Math.random()<(weight%1))pool.push(m);
 });
 return pool;
}
function surpriseStarMentor(){
 // Bardzo rzadka, niezależna od poziomu kariery propozycja.
 // Szansa bazowa: 2% na sezon. Rośnie maksymalnie do ok. 6% przy rozwiniętej reputacji.
 const chance=clamp(2+S.reputation*.035+Math.max(0,overall()-70)*.06,2,6);
 if(Math.random()*100>=chance)return null;

 const stars=[
  ...NATIONAL_MENTORS.filter(m=>m.tier==="star"),
  ...Object.values(LOCAL_MENTORS).flat().filter(m=>m.tier==="star")
 ];
 const unique=[...new Map(stars.map(m=>[m.name,m])).values()];
 if(!unique.length)return null;

 const mentor=pick(unique);
 return {
  ...mentor,
  surprise:true,
  desc:`Niespodziewana, wyjątkowa propozycja: ${mentor.desc}`,
  cost:Math.round(mentor.cost*1.1)
 };
}
function sampleMentors(count=2){
 const pool=weightedMentorPool();
 const selected=[];
 const surprise=surpriseStarMentor();

 // Jedna z dwóch ofert może być rzadką propozycją gwiazdy.
 if(surprise)selected.push(surprise);

 let guard=0;
 while(selected.length<count&&pool.length&&guard<100){
  guard++;
  const candidate=pick(pool);
  if(!selected.some(m=>m.name===candidate.name))selected.push(candidate);
 }

 if(selected.length<count){
  NATIONAL_MENTORS.filter(mentorEligible).forEach(m=>{
   if(selected.length<count&&!selected.some(x=>x.name===m.name))selected.push(m);
  });
 }
 return selected.slice(0,count);
}
function preparationSubsidyRate(){
 if(S.age<=18)return .42;
 if(S.age<=21)return .24;
 if(S.age<=24)return .08;
 return 0;
}
function preparationOwnCost(baseCost){
 return Math.max(1000,Math.round(baseCost*(1-preparationSubsidyRate())/1000)*1000);
}
function preparationCatalog(){
 if(S.league==="Etap szkolenia")return [];
 const level=leagueByName(S.league)?.level||3;
 const careerScale=1+Math.max(0,overall()-60)*.016+Math.max(0,S.reputation-40)*.005;
 const own=cost=>preparationOwnCost(Math.round(cost*careerScale/1000)*1000);
 const engineBasic=own(level===1?125000:level===2?90000:60000);
 const enginePro=own((level===1?255000:level===2?190000:135000));
 const engineElite=own((level===1?510000:level===2?395000:285000));
 const trainingBasic=own(level===1?72000:level===2?52000:36000);
 const trainingCamp=own(level===1?195000:level===2?145000:105000);
 const recovery=own(level===1?65000:level===2?47000:33000);
 if(!S.preseasonOffers||S.preseasonOffers.year!==S.year){
  S.preseasonOffers={year:S.year,mentors:sampleMentors(2).map(m=>({...m}))};
 }
 const mentors=S.preseasonOffers.mentors.map(m=>({...m,cost:own(m.cost)}));
 return [
  {id:"engine-basic",category:"engine",title:`Silnik ligowy — ${money(engineBasic)}`,cost:engineBasic,desc:"Rozsądny pakiet na sezon. Malejąca skuteczność przy sprzęcie 80+.",apply:()=>{const gain=equipmentUpgradeGain(rand(2,4));addHistory("Silnik ligowy",`Sprzęt +${gain}. Koszt własny: ${money(engineBasic)}.`)}},
  {id:"engine-pro",category:"engine",title:`Pakiet profesjonalny — ${money(enginePro)}`,cost:enginePro,desc:"Kilka jednostek i serwis. Sprzęt może wzrosnąć o 3–6, ale bez gwarancji przy wysokim poziomie.",apply:()=>{const gain=equipmentUpgradeGain(rand(3,6));tryNaturalGrowth("setup",1);addHistory("Pakiet profesjonalny",`Sprzęt +${gain}. Koszt własny: ${money(enginePro)}.`)}},
  {id:"engine-elite",category:"engine",title:`Program światowej klasy — ${money(engineElite)}`,cost:engineElite,desc:"Najlepszy pakiet sprzętowy. Wysokie koszty serwisu przechodzą także na sezon.",apply:()=>{const gain=equipmentUpgradeGain(rand(5,8));S.professionalism+=1;S.seasonServiceSurcharge=(S.seasonServiceSurcharge||0)+Math.round(engineElite*.16);addHistory("Program światowej klasy",`Sprzęt +${gain}; dodatkowy serwis sezonowy: ${money(Math.round(engineElite*.16))}.`)}},
  {id:"training-basic",category:"training",title:`Regularne treningi — ${money(trainingBasic)}`,cost:trainingBasic,desc:"2–3 próby rozwoju. Cechy 90+ rosną wyjątkowo rzadko.",apply:()=>{let gained=0;for(let i=0;i<rand(2,3);i++)gained+=tryNaturalGrowth(pick(Object.keys(S.skills)),1);S.professionalism+=1;addHistory("Regularne treningi",`Łączny wzrost cech: ${gained}.`)}},
  {id:"training-camp",category:"training",title:`Międzynarodowy obóz — ${money(trainingCamp)}`,cost:trainingCamp,desc:"4–6 prób rozwoju, kondycja i profesjonalizm. Większe obciążenie organizmu.",apply:()=>{let gained=0;for(let i=0;i<rand(4,6);i++)gained+=tryNaturalGrowth(pick(Object.keys(S.skills)),1);tryNaturalGrowth("fitness",1);S.professionalism+=2;S.injuryRisk+=2;addHistory("Międzynarodowy obóz",`Łączny wzrost cech: ${gained}; ryzyko urazu +2 p.p.`)}},
  {id:"recovery",category:"recovery",title:`Program regeneracji — ${money(recovery)}`,cost:recovery,desc:"Zmniejsza ryzyko urazu i pomaga utrzymać morale po intensywnych przygotowaniach.",apply:()=>{S.injuryRisk-=rand(3,6);S.morale+=rand(3,6);addHistory("Program regeneracji",`Ryzyko urazu spada, morale rośnie.`)}},
  ...mentors.map((m,index)=>({id:`mentor-${index}`,category:"mentor",title:`Mentor: ${m.name} — ${money(m.cost)}`,cost:m.cost,desc:`${m.desc} • ${mentorEffectSummary(m)} • ryzyko niepełnego efektu ${mentorRisk(m)}%`,apply:()=>applyMentor(m,false)}))
 ];
}
function showPreparationPackage(next,selectedIds=[]){
 const catalog=preparationCatalog();
 const selected=new Set(selectedIds);
 const selectedItems=catalog.filter(item=>selected.has(item.id));
 const total=selectedItems.reduce((sum,item)=>sum+item.cost,0);
 const remaining=S.budget-total;
 const debt=S.budget<0;
 const categoryNames={engine:"SPRZĘT",training:"TRENING",mentor:"MENTOR",recovery:"REGENERACJA"};
 const options=catalog.map(item=>{
  const chosen=selected.has(item.id);
  return {
   title:`${chosen?"✓ ":""}${item.title}`,
   desc:`${categoryNames[item.category]} • ${item.desc}`,
   action:()=>{
    const nextSelected=new Set(selected);
    if(chosen)nextSelected.delete(item.id);
    else{
     for(const other of catalog)if(other.category===item.category)nextSelected.delete(other.id);
     nextSelected.add(item.id);
    }
    showPreparationPackage(next,[...nextSelected]);
   }
  };
 });
 options.push({
  title:`ZATWIERDŹ PAKIET — ${money(total)}`,
  desc:debt?"Masz zadłużenie — najpierw musisz wyjść na plus.":total===0?"Nie wybrano żadnej inwestycji.":remaining<0?`Brakuje ${money(-remaining)}.`:`Po zakupach pozostanie ${money(remaining)}. Maksymalnie: 1 sprzęt + 1 trening + 1 mentor + 1 regeneracja.`,
  action:()=>{
   if(debt||remaining<0){
    alert(debt?"Zadłużenie blokuje zakupy.":"Nie masz wystarczających środków.");
    showPreparationPackage(next,[...selected]);
    return;
   }
   S.budget-=total;
   for(const item of selectedItems)item.apply();
   S.preseasonCompletedYear=S.year;S.preseasonOffers=null;
   normalize();save();closeModal();deferSeasonStep(next);
  }
 });
 options.push({
  title:"NIE INWESTUJĘ PRZED SEZONEM",
  desc:"Zachowujesz środki i kończysz przygotowania bez zakupów.",
  action:()=>{S.preseasonCompletedYear=S.year;S.preseasonOffers=null;normalize();save();closeModal();deferSeasonStep(next)}
 });
 const subsidy=Math.round(preparationSubsidyRate()*100);
 showModal("PRZYGOTOWANIA DO SEZONU","Zbuduj pakiet przygotowań",
  `Możesz połączyć sprzęt, trening, mentora i regenerację. Wybrano: ${money(total)} • budżet: ${money(S.budget)}${subsidy?` • klub pokrywa około ${subsidy}% bazowych kosztów przygotowań`:""}. ${majorCalendarNoticeHtml()}`,
  options);
}
function preseasonPreparation(next){
 if(S.preseasonCompletedYear===S.year){next();return}
 if(S.league==="Etap szkolenia"){S.preseasonCompletedYear=S.year;addHistory("Przygotowania","Profesjonalne zakupy, mentorzy i inwestycje w team odblokują się dopiero po zdaniu licencji Ż.");save();next();return}
 applyFacilityPreseasonEffects();
 const recoveryBase=S.morale===0?8:Math.max(1,(50-S.morale)*.18);
 S.morale+=recoveryBase;
 if(S.reputation===0&&S.professionalism>=55)S.reputation+=1;
 normalize();
 showPreparationPackage(next,[]);
}
function simulateDMPJ(basePph){
 if(S.age>21||S.league==="Etap szkolenia")return null;
 if(isForeignPolishLeagueClub(S.club)){addHistory("DMPJ",`${S.club} jest klubem zagranicznym startującym w polskiej lidze i nie uczestniczy w DMPJ.`);return null}
 const hasLeaguePlace=(S.season.matches||0)>0||S.chance>=35;
 if(!hasLeaguePlace){
  const callChance=clamp(S.chance+overall()*.25-20,15,70);
  if(Math.random()*100>callChance){addHistory("DMPJ","Nie otrzymujesz miejsca w składzie na rundy eliminacyjne.");return {name:"Drużynowe Mistrzostwa Polski Juniorów",stage:"eliminacje",result:"bez powołania",points:0,average:0}}
 }
 let totalPoints=0,totalHeats=0,stageReached="eliminacje",result="odpadnięcie w eliminacjach",finalPlace=null;
 const stages=[{name:"eliminacje",threshold:27,teamBase:[17,31]},{name:"ćwierćfinały",threshold:31,teamBase:[18,32]},{name:"półfinały",threshold:35,teamBase:[19,33]},{name:"finał",threshold:null,teamBase:[20,34]}];
 for(const stage of stages){
  stageReached=stage.name;
  const riderPoints=clamp(Math.round(5+(basePph-1.05)*4+rand(-3,4)),0,15);totalPoints+=riderPoints;totalHeats+=5;
  const teamScore=riderPoints+rand(stage.teamBase[0],stage.teamBase[1]);
  if(stage.name==="finał"){
   if(teamScore>=45){finalPlace=1;result="1. miejsce — złoty medal DMPJ"}
   else if(teamScore>=42){finalPlace=2;result="2. miejsce — srebrny medal DMPJ"}
   else if(teamScore>=39){finalPlace=3;result="3. miejsce — brązowy medal DMPJ"}
   else{finalPlace=4;result="4. miejsce w finale DMPJ"}
   break;
  }
  if(teamScore<stage.threshold){result=`odpadnięcie: ${stage.name}`;break}
  result=`awans z etapu: ${stage.name}`;
 }
 const average=totalHeats?totalPoints/totalHeats:0,prestige=stageReached==="finał"?6:stageReached==="półfinały"?4:stageReached==="ćwierćfinały"?2:1;
 S.reputation+=prestige;S.devPoints+=stageReached==="finał"?4:stageReached==="półfinały"?3:2;S.careerPoints+=Math.round(totalPoints*2+prestige*5);
 addHistory("DMPJ",`${clubDisplayName(S.club)} • ${result}. Twój bilans w cyklu: ${totalPoints} pkt / ${totalHeats} biegów, średnia ${average.toFixed(3).replace(".",",")}.`);
 return {name:"Drużynowe Mistrzostwa Polski Juniorów",stage:stageReached,result,points:totalPoints,heats:totalHeats,average,place:finalPlace};
}
function breakthroughAgeMultiplier(){return S.age<=18?1.45:S.age<=21?1.30:S.age<=24?1.15:S.age<=28?.90:S.age<=33?.50:.25}
function awardBreakthroughDevelopment(id,base,{label="sportowy przełom"}={}){
 S.breakthroughRewards??={year:S.year,counts:{}};if(S.breakthroughRewards.year!==S.year)S.breakthroughRewards={year:S.year,counts:{}};
 const count=S.breakthroughRewards.counts[id]||0,diminish=count===0?1:count===1?.68:count===2?.42:.25;
 const points=Math.max(1,Math.round(base*breakthroughAgeMultiplier()*diminish));
 S.breakthroughRewards.counts[id]=count+1;S.devPoints+=points;
 addHistory("Impuls rozwojowy",`${capitalizeFirstText(label)}: +${points} pkt rozwoju do rozdania.`);
 return points;
}
function roundBreakthroughBase(key,place){
 if(place>3)return 0;
 if(key==="Speedway Grand Prix"||key==="SGP")return place===1?26:place===2?17:13;
 if(key==="SEC")return place===1?19:place===2?13:10;
 if(key==="IMP")return place===1?16:place===2?11:8;
 return place===1?10:place===2?7:5;
}
function applyRoundAchievementBonuses(key,rounds,hosts=[]){
 const achievements=[];
 (rounds||[]).forEach((r,i)=>{
  const place=Number(r.roundPlace||r.place||99);if(place>3)return;
  const round=r.round||i+1,host=r.host||hosts[i]||"";
  const base=roundBreakthroughBase(key,place),category=place===1?"win":"podium",id=`round:${key}:${category}`;
  // Kolejne podobne sukcesy w tym samym sezonie nadal pomagają, ale z malejącą siłą.
  if(base)awardBreakthroughDevelopment(id,base,{label:`${place}. miejsce w rundzie ${key}${host?` w ${cityLocative(host)}`:""}`});
  achievements.push({round,place,host,key});
 });
 return achievements;
}

function awardCompetitionResult(key,place,points){
 const prestige=COMPETITION_LEVELS[key]?.mean||70;
 if(place===1){S.reputation+=prestige>=88?14:prestige>=80?9:6;awardBreakthroughDevelopment(`title:${key}`,prestige>=88?12:prestige>=80?9:6,{label:`zwycięstwo w ${key}`});S.careerPoints+=prestige}
 else if(place<=3){S.reputation+=prestige>=88?9:6;awardBreakthroughDevelopment(`podium:${key}`,prestige>=88?8:prestige>=80?6:4,{label:`podium w ${key}`});S.careerPoints+=Math.round(prestige*.55)}
 else if(place<=8){S.reputation+=2;if(S.age<=24)awardBreakthroughDevelopment(`top8:${key}`,2,{label:`mocny wynik w ${key}`})}
}
function simulateGenericTournament(e,basePph){
 const key=e.short,cfg=COMPETITION_LEVELS[key]||{mean:70,spread:8,field:16};
 const recentWins=recentCompetitionWins(key,6);
 const field=buildCompetitionField(key,15),fieldMean=field.reduce((s,r)=>s+r.rating,0)/field.length;
 const power=competitionPower(basePph,key)+rand(-11,9)-Math.min(5,recentWins*1.35);
 const playerPts=simulateFiveRideScore(power,fieldMean);
 const rivals=field.map(r=>simulateFiveRideScore(r.rating+rand(-4,4),fieldMean));
 const place=ordinalPlaceByScore(playerPts,rivals);
 const result=place===1?"zwycięstwo":place<=3?`${place}. miejsce i medal`:`${place}. miejsce`;
 awardCompetitionResult(key,place,playerPts);
 addHistory(key,`${result}. ${playerPts} pkt w pięciu biegach.`);
 return {name:e.name,key:e.short,stage:"turniej",result,points:playerPts,place};
}
function cycleRiderName(index,key){
 const first=["Mikkel","Leon","Jakub","Daniel","Anders","Martin","Patryk","Rasmus","Kacper","Oliver","Matej","Bartosz","Fredrik","Dominik","Jan","Timo"];
 const last=["Jensen","Nowak","Hansen","Kowalski","Lindgren","Kaczmarek","Novak","Andersen","Wójcik","Thomsen","Pedersen","Madsen","Dudek","Zagar","Kubera","Holder"];
 return index===0?S.name:`${first[(index*3+key.length)%first.length]} ${last[(index*5+key.length)%last.length]}`;
}

const CLASSIC_16_SCHEDULE=[
 [[0,1,2,3],[4,5,6,7],[8,9,10,11],[12,13,14,15]],
 [[0,4,8,12],[1,5,9,13],[2,6,10,14],[3,7,11,15]],
 [[0,5,10,15],[1,4,11,14],[2,7,8,13],[3,6,9,12]],
 [[0,6,11,13],[1,7,10,12],[2,4,9,15],[3,5,8,14]],
 [[0,7,9,14],[1,6,8,15],[2,5,11,12],[3,4,10,13]]
];
function classic16ScheduleAudit(){
 const pairs=new Set(),rides=Array(16).fill(0);let heats=0;
 for(const round of CLASSIC_16_SCHEDULE)for(const heat of round){heats++;heat.forEach(i=>rides[i]++);for(let a=0;a<4;a++)for(let b=a+1;b<4;b++)pairs.add([heat[a],heat[b]].sort((x,y)=>x-y).join("-"))}
 return {heats,pairs:pairs.size,rides};
}
function simulateClassicHeat(participants,forcedPlayerPlace=null,variance=22){
 const scored=participants.filter(x=>x.id!=="player").map(r=>({r,score:r.rating+rand(-variance,variance)+Math.random()*2})).sort((a,b)=>b.score-a.score).map(x=>x.r);
 let order;
 if(participants.some(x=>x.id==="player")&&Number.isFinite(forcedPlayerPlace)){
  const player=participants.find(x=>x.id==="player");order=[...scored];order.splice(clamp(forcedPlayerPlace-1,0,3),0,player);
 }else order=participants.map(r=>({r,score:r.rating+rand(-variance,variance)+Math.random()*2})).sort((a,b)=>b.score-a.score).map(x=>x.r);
 return order;
}
function simulateClassic16Tournament({playerRating,pool,key="turniej",playerRideResults=null,heatVariance=22}={}){
 const entrants=[{id:"player",rating:playerRating,name:S.name},...pool.slice(0,15).map((r,i)=>({id:r.id||`r${i}`,rating:r.rating,name:r.name||`Rywal ${i+1}`}))];
 if(entrants.length!==16)throw new Error("Klasyczny turniej wymaga dokładnie 16 zawodników.");
 const stats=new Map(entrants.map(r=>[r.id,{id:r.id,rating:r.rating,points:0,wins:0,seconds:0,thirds:0,zeros:0,rides:0}]));
 let playerRideIndex=0,heatNo=0;
 for(const round of CLASSIC_16_SCHEDULE){
  for(const indexes of round){
   heatNo++;const heat=indexes.map(i=>entrants[i]);
   let forced=null;
   if(heat.some(r=>r.id==="player")&&playerRideResults?.length){
    const rr=playerRideResults[playerRideIndex++]||{};forced=Number.isFinite(rr.place)?rr.place:Number.isFinite(rr.points)?4-rr.points:null;
   }
   const order=simulateClassicHeat(heat,forced,heatVariance);
   order.forEach((r,pos)=>{const st=stats.get(r.id),pts=3-pos;st.points+=pts;st.rides++;if(pos===0)st.wins++;else if(pos===1)st.seconds++;else if(pos===2)st.thirds++;else st.zeros++});
  }
 }
 const table=[...stats.values()].sort((a,b)=>b.points-a.points||b.wins-a.wins||b.seconds-a.seconds||b.thirds-a.thirds||b.rating-a.rating||Math.random()-.5);
 const total=table.reduce((s,x)=>s+x.points,0),player=table.find(x=>x.id==="player"),place=table.findIndex(x=>x.id==="player")+1;
 return {key,table,totalPoints:total,place,player,heats:20,audit:classic16ScheduleAudit()};
}

function simulateEliteFiveRideScore(power,fieldMean,{variance=0}={}){
 const surge=Math.random()<.012?rand(4,6):0;
 const slump=Math.random()<.018?rand(4,6):0;
 const effective=power+rand(-2-variance,2+variance)+surge-slump;
 let points=0;
 for(let i=0;i<5;i++){
  const rivals=[
   fieldMean+rand(-6,6)+rand(-4,4),
   fieldMean+rand(-6,6)+rand(-4,4),
   fieldMean+rand(-6,6)+rand(-4,4)
  ];
  const mine=effective+rand(-5-variance,5+variance);
  const place=1+rivals.filter(x=>x>mine).length;
  points+=clamp(4-place,0,3);
 }
 return clamp(points,0,15);
}
function eliteRoundDayModifier(key,token){
 const d=ensureDayForm(key,token);
 return d.modifier*.72;
}
function elitePlayerRoundRating(basePower,key,token,extra=0){
 return clamp(basePower+eliteRoundDayModifier(key,token)+extra,48,99);
}
function regularRoundRows(rows){
 return [...rows].sort((a,b)=>b.base-a.base||(b.tiebreak||b.rider.rating)-(a.tiebreak||a.rider.rating));
}
function simulateSingleHeatOrderRows(rows,{variance=7}={}){
 const avgBase=rows.length?rows.reduce((s,x)=>s+(x.base||0),0)/rows.length:0;
 return [...rows].map(row=>({
  row,
  score:(row.rider.rating||80)+((row.base||0)-avgBase)*.72+rand(-variance,variance)
 })).sort((a,b)=>b.score-a.score).map(x=>x.row);
}
function insertRowAtPlace(ordered,row,place){
 const rest=ordered.filter(x=>x.rider.id!==row.rider.id);
 rest.splice(clamp(place-1,0,rest.length),0,row);
 return rest;
}
function impSecRoundStructure(rows){
 const regular=regularRoundRows(rows);
 const direct=regular.slice(0,2);
 const barage=regular.slice(2,6);
 return {regular,direct,barage};
}
function completeImpSecRound(rows,{playerBaragePlace=null,playerFinalPlace=null,fixedBarageQualifiers=null}={}){
 const {regular,direct,barage}=impSecRoundStructure(rows);
 const player=regular.find(x=>x.rider.id==="player");
 let barageOrder,barageQualifiers;

 if(fixedBarageQualifiers?.length===2){
  const qIds=new Set(fixedBarageQualifiers.map(x=>x.rider.id));
  if(player&&barage.some(x=>x.rider.id==="player")&&Number.isFinite(playerBaragePlace)){
   const fixedOthers=fixedBarageQualifiers.filter(x=>x.rider.id!=="player");
   const leftovers=simulateSingleHeatOrderRows(barage.filter(x=>x.rider.id!=="player"&&!qIds.has(x.rider.id)));
   if(playerBaragePlace===1){
    barageOrder=[player,...fixedOthers,...leftovers];
   }else if(playerBaragePlace===2){
    barageOrder=[...fixedOthers.slice(0,1),player,...fixedOthers.slice(1),...leftovers];
   }else{
    const leaders=[...fixedBarageQualifiers.filter(x=>x.rider.id!=="player")];
    const rest=simulateSingleHeatOrderRows(barage.filter(x=>!leaders.some(q=>q.rider.id===x.rider.id)&&x.rider.id!=="player"));
    barageOrder=[...leaders,...rest];
    barageOrder=insertRowAtPlace(barageOrder,player,playerBaragePlace);
   }
   barageQualifiers=fixedBarageQualifiers;
  }else{
   barageQualifiers=fixedBarageQualifiers;
   const rest=barage.filter(x=>!barageQualifiers.some(q=>q.rider.id===x.rider.id));
   barageOrder=[...barageQualifiers,...simulateSingleHeatOrderRows(rest)];
  }
 }else if(player&&barage.some(x=>x.rider.id==="player")&&Number.isFinite(playerBaragePlace)){
  const others=simulateSingleHeatOrderRows(barage.filter(x=>x.rider.id!=="player"));
  barageOrder=insertRowAtPlace(others,player,playerBaragePlace);
  barageQualifiers=barageOrder.slice(0,2);
 }else{
  barageOrder=simulateSingleHeatOrderRows(barage);
  barageQualifiers=barageOrder.slice(0,2);
 }

 const finalists=[...direct,...barageQualifiers];
 let finalOrder;
 if(player&&finalists.some(x=>x.rider.id==="player")&&Number.isFinite(playerFinalPlace)){
  const others=simulateSingleHeatOrderRows(finalists.filter(x=>x.rider.id!=="player"),{variance:8});
  finalOrder=insertRowAtPlace(others,player,playerFinalPlace);
 }else finalOrder=simulateSingleHeatOrderRows(finalists,{variance:8});

 const finalPoints=new Map(finalOrder.map((row,i)=>[row.rider.id,3-i]));
 const regularPlace=new Map(regular.map((row,i)=>[row.rider.id,i+1]));
 const baragePlace=new Map(barageOrder.map((row,i)=>[row.rider.id,i+1]));
 const finalPlace=new Map(finalOrder.map((row,i)=>[row.rider.id,i+1]));
 const finalistIds=new Set(finalOrder.map(x=>x.rider.id));
 const nonFinalBarage=barageOrder.filter(x=>!finalistIds.has(x.rider.id));
 const used=new Set([...finalOrder,...nonFinalBarage].map(x=>x.rider.id));
 const classification=[...finalOrder,...nonFinalBarage,...regular.filter(x=>!used.has(x.rider.id))];
 const roundPlaceMap=new Map(classification.map((row,i)=>[row.rider.id,i+1]));
 const meta=new Map(regular.map(row=>[row.rider.id,{
  regularPlace:regularPlace.get(row.rider.id),
  baragePlace:baragePlace.get(row.rider.id)||null,
  finalPlace:finalPlace.get(row.rider.id)||null,
  finalPoints:finalPoints.get(row.rider.id)||0,
  roundPlace:roundPlaceMap.get(row.rider.id),
  total:(row.base||0)+(finalPoints.get(row.rider.id)||0)
 }]));
 return {regular,direct,barage,barageOrder,barageQualifiers,finalists,finalOrder,classification,meta};
}
const SGP_LCQ_GROUPS=[[2,5,6,9],[3,4,7,8]]; // indeksy klasyfikacji zasadniczej: 3/6/7/10 oraz 4/5/8/9
function sgpRoundStructure(rows){
 const regular=regularRoundRows(rows);
 const direct=regular.slice(0,2);
 const lcqGroups=SGP_LCQ_GROUPS.map(group=>group.map(i=>regular[i]).filter(Boolean));
 return {regular,direct,lcqGroups};
}
function completeSGPRound(rows,{playerLCQPlace=null,playerFinalPlace=null,fixedLCQWinners=null}={}){
 const {regular,direct,lcqGroups}=sgpRoundStructure(rows);
 const player=regular.find(x=>x.rider.id==="player");
 const lcqOrders=[],lcqWinners=[];
 for(let i=0;i<2;i++){
  const group=lcqGroups[i],fixed=fixedLCQWinners?.[i];
  let order;
  const playerInGroup=player&&group.some(x=>x.rider.id==="player");
  if(fixed){
   if(playerInGroup&&Number.isFinite(playerLCQPlace)){
    if(fixed.rider.id==="player"){
     order=[player,...simulateSingleHeatOrderRows(group.filter(x=>x.rider.id!=="player"))];
    }else{
     const others=simulateSingleHeatOrderRows(group.filter(x=>x.rider.id!=="player"&&x.rider.id!==fixed.rider.id));
     order=[fixed,...others];
     order=insertRowAtPlace(order,player,playerLCQPlace);
    }
   }else{
    const rest=simulateSingleHeatOrderRows(group.filter(x=>x.rider.id!==fixed.rider.id));
    order=[fixed,...rest];
   }
  }else if(playerInGroup&&Number.isFinite(playerLCQPlace)){
   const rest=simulateSingleHeatOrderRows(group.filter(x=>x.rider.id!=="player"));
   order=insertRowAtPlace(rest,player,playerLCQPlace);
  }else order=simulateSingleHeatOrderRows(group);
  lcqOrders.push(order);
  lcqWinners.push(order[0]);
 }

 const finalists=[...direct,...lcqWinners];
 let finalOrder;
 if(player&&finalists.some(x=>x.rider.id==="player")&&Number.isFinite(playerFinalPlace)){
  finalOrder=insertRowAtPlace(simulateSingleHeatOrderRows(finalists.filter(x=>x.rider.id!=="player"),{variance:8}),player,playerFinalPlace);
 }else finalOrder=simulateSingleHeatOrderRows(finalists,{variance:8});

 const finalistIds=new Set(finalOrder.map(x=>x.rider.id));
 const classification=[...finalOrder,...regular.filter(x=>!finalistIds.has(x.rider.id))];
 const placeMap=new Map(classification.map((row,i)=>[row.rider.id,i+1]));
 const regularPlace=new Map(regular.map((row,i)=>[row.rider.id,i+1]));
 const lcqMeta=new Map();
 lcqOrders.forEach((order,groupIndex)=>order.forEach((row,i)=>lcqMeta.set(row.rider.id,{group:groupIndex+1,place:i+1})));
 const meta=new Map(regular.map(row=>[row.rider.id,{
  regularPlace:regularPlace.get(row.rider.id),
  lcq:lcqMeta.get(row.rider.id)||null,
  finalPlace:finalOrder.findIndex(x=>x.rider.id===row.rider.id)>=0?finalOrder.findIndex(x=>x.rider.id===row.rider.id)+1:null,
  place:placeMap.get(row.rider.id),
  points:SGP_PLACE_POINTS[(placeMap.get(row.rider.id)||16)-1]||0
 }]));
 return {regular,direct,lcqGroups,lcqOrders,lcqWinners,finalists,finalOrder,classification,meta};
}
function fiveRideResultsForTotal(total){
 const target=clamp(Math.round(Number(total)||0),0,15),points=[];let remaining=target;
 for(let i=0;i<5;i++){
  const slotsLeft=4-i,min=Math.max(0,remaining-slotsLeft*3),max=Math.min(3,remaining);
  const value=rand(min,max);points.push(value);remaining-=value;
 }
 for(let i=points.length-1;i>0;i--){const j=rand(0,i);[points[i],points[j]]=[points[j],points[i]]}
 return points.map(value=>({points:value,place:4-value}));
}
function eliteRoundRows(riders,key,{playerHeatPoints=null,playerRideResults=null,playerRatingOverride=null,token=null,heatVariance=13}={}){
 if(riders.length!==16)throw new Error(`${key}: faza zasadnicza wymaga dokładnie 16 zawodników.`);
 const player=riders.find(r=>r.id==="player");
 if(!player)throw new Error(`${key}: brak zawodnika gracza w stawce.`);
 const ordered=[player,...riders.filter(r=>r.id!=="player")];
 const rated=ordered.map(r=>({
  ...r,
  rating:r.id==="player"&&Number.isFinite(playerRatingOverride)
   ?playerRatingOverride
   :r.rating+(r.seasonForm||0)
 }));
 const forcedResults=Array.isArray(playerRideResults)&&playerRideResults.length
  ?playerRideResults
  :Number.isFinite(playerHeatPoints)?fiveRideResultsForTotal(playerHeatPoints):null;
 const tournament=simulateClassic16Tournament({
  playerRating:rated[0].rating,
  pool:rated.slice(1).map(r=>({id:r.id,name:r.name,rating:r.rating})),
  key,
  playerRideResults:forcedResults,
  heatVariance
 });
 const statsById=new Map(tournament.table.map((st,index)=>[st.id,{...st,rank:index+1}]));
 return ordered.map(r=>{
  const st=statsById.get(r.id);
  if(!st)throw new Error(`${key}: brak wyniku zawodnika ${r.id}.`);
  return {
   rider:r,
   base:st.points,
   tiebreak:1000-st.rank,
   regularStats:{wins:st.wins,seconds:st.seconds,thirds:st.thirds,zeros:st.zeros,rides:st.rides}
  };
 });
}
function seasonsOnTrack(city){
 const seasons=S.careerStats?.seasons||[];
 return seasons.filter(x=>clubCity(x.club)===city).length;
}
function homeTrackWildcardBonus(event){
 const city=event?.hostCity||clubCity(S.club);
 if(!city||city!==clubCity(S.club))return 0;
 const seasons=Math.max(1,seasonsOnTrack(city));
 const tenure=Math.min(2.4,seasons*.35);
 const loyalty=clamp((S.loyalty-50)/50,0,1)*1.1;
 const form=clamp((currentFormRating()-72)/25,0,1)*1.0;
 return clamp(2+tenure+loyalty+form,2,6);
}

function simulateFiveRideScore(power,fieldMean){
 const horseDay=Math.random()<.045;
 const badDay=Math.random()<.045;
 const eventSwing=rand(-3,3)+(horseDay?rand(4,8):0)-(badDay?rand(4,7):0);
 const effective=power+eventSwing;
 let points=0;
 for(let i=0;i<5;i++){
  const rivals=[fieldMean+rand(-8,8),fieldMean+rand(-8,8),fieldMean+rand(-8,8)];
  const my=effective+rand(-10,10)+(Math.random()<.03?rand(-7,7):0);
  const scores=rivals.map(r=>r+rand(-9,9));
  const place=1+scores.filter(x=>x>my).length;
  points+=clamp(4-place,0,3);
 }
 if(horseDay&&effective>=fieldMean-5)points=Math.max(points,rand(12,15));
 else if(effective>=fieldMean-3&&Math.random()<.022)points=Math.max(points,rand(13,15));
 return clamp(points,0,15);
}
function rankStandings(entries){
 return [...entries].sort((a,b)=>b.total-a.total||b.wins-a.wins||b.rating-a.rating);
}
function standingPlace(entries,id="player"){
 return rankStandings(entries).findIndex(entry=>entry.id===id)+1;
}
function medalResult(place,gold,silverBronze,ordinary){
 return capitalizeFirstText(place===1?gold:place<=3?silverBronze(place):ordinary(place));
}
function simulateIMPCycle(basePph){
 const key="IMP";
 const basePower=competitionPower(basePph,key,{includeDay:false});
 const field=buildCompetitionField("IMP",14);
 const riders=[
  {id:"player",name:S.name,rating:basePower,total:0,wins:0,rounds:[]},
  ...field.map((r,index)=>({id:`r${index+1}`,name:`Rywal ${index+1}`,rating:r.rating,total:0,wins:0,rounds:[]}))
 ];
 const hosts=ensureIMPSeasonState().roundHosts;
 for(let round=1;round<=3;round++){
  const wildcard=impRoundWildcardRider(round);
  const playerRating=elitePlayerRoundRating(basePower,key,`${S.year}:IMP:round:${round}`);
  const roundRiders=[...riders,wildcard].map(r=>r.id==="player"?{...r,rating:playerRating}:r);
  const rows=eliteRoundRows(roundRiders,key,{playerRatingOverride:playerRating});
  const resolved=completeImpSecRound(rows);
  for(const rider of riders){
   const m=resolved.meta.get(rider.id);if(!m)continue;
   rider.total+=m.total;if(m.finalPoints===3)rider.wins++;
   rider.rounds.push({
    round,host:hosts[round-1],base:rows.find(x=>x.rider.id===rider.id)?.base||0,
    regularPlace:m.regularPlace,baragePlace:m.baragePlace,finalPlace:m.finalPlace,
    finalPoints:m.finalPoints,roundPlace:m.roundPlace,total:m.total
   });
  }
 }
 return {riders,standings:rankStandings(riders),player:riders[0],hosts};
}
function simulateSECCycle(basePph){
 const key="SEC";
 const basePower=competitionPower(basePph,key,{includeDay:false});
 const riders=Array.from({length:16},(_,index)=>({
  id:index===0?"player":`r${index}`,
  name:cycleRiderName(index,key),
  rating:index===0?basePower:competitionRivalRating(key,index-1),
  total:0,wins:0,rounds:[]
 }));
 for(let round=1;round<=4;round++){
  const playerRating=elitePlayerRoundRating(basePower,key,`${S.year}:SEC:round:${round}`);
  const roundRiders=riders.map(r=>r.id==="player"?{...r,rating:playerRating}:r);
  const rows=eliteRoundRows(roundRiders,key,{playerRatingOverride:playerRating});
  const resolved=completeImpSecRound(rows);
  for(const rider of riders){
   const m=resolved.meta.get(rider.id);if(!m)continue;
   rider.total+=m.total;if(m.finalPoints===3)rider.wins++;
   rider.rounds.push({
    round,heatPoints:rows.find(x=>x.rider.id===rider.id)?.base||0,
    regularPlace:m.regularPlace,baragePlace:m.baragePlace,finalPlace:m.finalPlace,
    finalPoints:m.finalPoints,roundPlace:m.roundPlace,points:m.total
   });
  }
 }
 return {riders,standings:rankStandings(riders),player:riders[0]};
}

function sgpPlayerRating(basePph){
 const level=leagueByName(S.league)?.level||3;
 return clamp(overall()*.72+currentFormRating()*.12+S.equipment*.05+S.skills.mental*.04+Number(basePph||1.3)*3+(level===1?2:0),55,96);
}
function createSGPField(basePph){
 if(S.sgpPersistentField?.year===S.year&&Array.isArray(S.sgpPersistentField.opponents)&&S.sgpPersistentField.opponents.length===15){
  const saved=S.sgpPersistentField;
  saved.player={id:"player",name:S.name,rating:sgpPlayerRating(basePph),total:saved.player?.total||0,wins:saved.player?.wins||0,rounds:saved.player?.rounds||[]};
  return saved;
 }
 const opponents=buildCompetitionField("Speedway Grand Prix",15).map((r,index)=>({
  id:`r${index+1}`,name:`Rywal ${index+1}`,rating:r.rating,seasonForm:rand(-2,2),total:0,wins:0,rounds:[]
 }));
 S.sgpPersistentField={year:S.year,player:{id:"player",name:S.name,rating:sgpPlayerRating(basePph),total:0,wins:0,rounds:[]},opponents};
 return S.sgpPersistentField;
}
function simulateSGPRoundForRiders(riders,round){
 const playerBase=riders.find(r=>r.id==="player")?.rating||80;
 const playerRating=elitePlayerRoundRating(playerBase,"Speedway Grand Prix",`${S.year}:SGP:round:${round}`);
 const roundRiders=riders.map(r=>r.id==="player"?{...r,rating:playerRating}:r);
 const rows=eliteRoundRows(roundRiders,"Speedway Grand Prix",{playerRatingOverride:playerRating});
 const resolved=completeSGPRound(rows);
 for(const rider of riders){
  const m=resolved.meta.get(rider.id);if(!m)continue;
  rider.total+=m.points;if(m.place===1)rider.wins++;
  rider.rounds.push({
   round,place:m.place,points:m.points,
   heatPoints:rows.find(x=>x.rider.id===rider.id)?.base||0,
   regularPlace:m.regularPlace,lcq:m.lcq,finalPlace:m.finalPlace
  });
 }
 return resolved;
}

function simulateSGPCycle(basePph,roundsCount){
 const season=createSGPField(basePph),riders=[season.player,...season.opponents];
 for(let round=1;round<=roundsCount;round++)simulateSGPRoundForRiders(riders,round);
 return {riders,standings:rankStandings(riders),player:season.player,field:season};
}

function simulateIMP(basePph){
 const key="IMP",cycle=simulateIMPCycle(basePph);
 const player=cycle.player,place=standingPlace(cycle.riders);
 const rounds=player.rounds.map(round=>{
  const phase=round.regularPlace<=2
   ?`bezpośredni finał`
   :round.regularPlace<=6?`baraż: ${round.baragePlace}. miejsce`:`bez barażu`;
  return `${round.base} pkt w ${cityLocative(round.host)} (${round.regularPlace}. po fazie zasadniczej, ${phase}${round.finalPlace?`, finał: ${round.finalPlace}. miejsce, +${round.finalPoints} pkt`:""})`;
 });
 const result=medalResult(place,"Mistrz Polski",p=>`${p}. miejsce i medal IMP`,p=>`${p}. miejsce w IMP`);
 awardCompetitionResult(key,place,player.total);
 const roundAchievements=applyRoundAchievementBonuses(key,player.rounds,cycle.hosts);
 addHistory("IMP",`${result}. Trzy rundy: ${rounds.join(" • ")}. Razem ${player.total} pkt.`);
 return {name:"Indywidualne Mistrzostwa Polski",key:"IMP",stage:"3 rundy",result:capitalizeFirstText(result),points:player.total,place,details:rounds,roundAchievements,healthExposureHeats:15};
}
function simulateSEC(basePph){
 const key="SEC",cycle=simulateSECCycle(basePph);
 const player=cycle.player,place=standingPlace(cycle.riders);
 const scores=player.rounds.map(round=>round.points);
 const result=medalResult(place,"Mistrz Europy",p=>`${p}. miejsce i medal SEC`,p=>`${p}. miejsce w SEC`);
 awardCompetitionResult(key,place,player.total);
 const roundAchievements=applyRoundAchievementBonuses(key,player.rounds,ensureMajorSeriesCalendar().secHosts);
 if(place===1)qualifyForNextSGP("Zwycięstwo w Speedway Euro Championship");
 addHistory("SEC",`${result}. 4 rundy: ${scores.join(" + ")} = ${player.total} pkt.`);
 return {name:"Speedway Euro Championship",key:"SEC",stage:"4 rundy",result,points:player.total,place,details:player.rounds,roundAchievements,healthExposureHeats:20};
}
function simulateSECPath(basePph){
 if(S.age<18||Math.random()>=internationalNominationChance("SEC",basePph))return [];
 const qualifier=simulateInternationalQualifier("SEC",basePph);
 if(!qualifier.advanced)return [];
 const challenge=simulateSECChallengeQualification(basePph);
 if(!challenge.advanced)return [];
 return [simulateSEC(basePph)];
}
function isQualifiedForCurrentSGP(){
 return S.sgpQualifiedYear===S.year;
}
function qualifyForNextSGP(reason){
 S.sgpQualifiedYear=S.year+1;
 S.sgpQualificationReason=reason;
 addHistory("Awans do Speedway Grand Prix",`${reason}. Otrzymujesz gwarantowane miejsce w cyklu SGP w sezonie ${S.year+1}.`);
 save();
}
function clearNextSGPQualification(){
 if(S.sgpQualifiedYear===S.year+1){
  S.sgpQualifiedYear=null;
  S.sgpQualificationReason=null;
 }
}

function simulateSGP(basePph){
 const key="Speedway Grand Prix",roundsCount=ensureMajorSeriesCalendar().sgpHosts.length,cycle=simulateSGPCycle(basePph,roundsCount);
 const player=cycle.player,finalPlace=standingPlace(cycle.riders);
 const places=player.rounds.map(round=>round.place);
 const result=medalResult(finalPlace,"mistrz świata",p=>`${p}. miejsce i medal IMŚ`,p=>`${p}. miejsce w IMŚ`);
 awardCompetitionResult(key,finalPlace,player.total);
 const roundAchievements=applyRoundAchievementBonuses("SGP",player.rounds,ensureMajorSeriesCalendar().sgpHosts);
 if(finalPlace<=7){
  qualifyForNextSGP(`${finalPlace}. miejsce w klasyfikacji generalnej SGP`);
 }else if(S.sgpQualifiedYear===S.year+1 && /GP Challenge|SEC/.test(S.sgpQualificationReason||"")){
  // Awans wywalczony inną drogą pozostaje ważny.
 }else{
  clearNextSGPQualification();
  addHistory("Speedway Grand Prix",`Kończysz cykl poza czołową siódemką. Aby wrócić w kolejnym sezonie, musisz awansować przez GP Challenge albo wygrać SEC.`);
 }
 addHistory("Speedway Grand Prix",`${result}. ${roundsCount} rund, miejsca: ${places.join(", ")}. ${player.total} pkt.`);
 return {name:"Indywidualne Mistrzostwa Świata",key:"SGP",stage:`${roundsCount} rund SGP`,result,points:player.total,place:finalPlace,details:places,roundAchievements,healthExposureHeats:roundsCount*5};
}
function simulateGPChallenge(basePph){
 const result=simulateGenericTournament({name:"Grand Prix Challenge",short:"GP Challenge"},basePph);
 result.stage="finał kwalifikacji";
 if(result.place<=3){
  qualifyForNextSGP(`${result.place}. miejsce w Grand Prix Challenge`);
 }else{
  addHistory("GP Challenge",`Brak awansu do cyklu SGP — wymagane miejsce w czołowej trójce.`);
 }
 return result;
}
const MAJOR_COMPETITION_KEYS=new Set(["IMP","SEC Challenge","SEC","GP Challenge","Speedway Grand Prix"]);
function lastCompetitionResult(key){
 const results=competitionArchiveFor(key).filter(result=>Number.isFinite(result.place)).sort((a,b)=>b.year-a.year);
 return results[0]||null;
}
function establishedSGPRider(){
 const last=lastCompetitionResult("SGP");
 return isQualifiedForCurrentSGP()||(last&&last.year>=S.year-1&&last.place<=7);
}
const EVENT_SELECTION_RULES={
 "Brązowy Kask":{threshold:51,baseChance:28,inviteChance:8},
 "Srebrny Kask":{threshold:61,baseChance:24,inviteChance:5},
 "MIMP":{threshold:65,baseChance:22,inviteChance:4},
 "SGP2":{threshold:72,baseChance:16,inviteChance:1},
 "IMP":{threshold:78,baseChance:18,inviteChance:2},
 "Złoty Kask":{threshold:77,baseChance:16,inviteChance:3},
 "Memoriał Smoczyka":{threshold:72,baseChance:18,inviteChance:6},
 "Memoriał Jancarza":{threshold:79,baseChance:15,inviteChance:5},
 "Kryterium Asów":{threshold:81,baseChance:14,inviteChance:2},
 "SEC":{threshold:78,baseChance:18,inviteChance:0},
 "GP Challenge":{threshold:84,baseChance:14,inviteChance:0}
};
function recentEventResults(key,years=4){
 const canonical=canonicalCompetitionKey({key});
 return (S.careerStats?.competitionArchive||[]).filter(result=>result.key===canonical&&result.year>=S.year-years).sort((a,b)=>b.year-a.year);
}
function eventBottomPenalty(key){
 let penalty=0;
 for(const result of recentEventResults(key,4)){
  if(result.place>=15)penalty+=9;
  else if(result.place>=13)penalty+=5;
  else if(result.place<=8)penalty-=3;
  if(result.place<=3)penalty-=5;
 }
 return clamp(penalty,-10,24);
}
function regionalInvitationBonus(key){
 const base=clubBaseName(S.club);
 if(key==="Memoriał Smoczyka"&&/Leszno/i.test(base))return 16;
 if(key==="Memoriał Jancarza"&&/Gorzów/i.test(base))return 16;
 if(key==="Złoty Kask"&&S.reputation>=55)return 4;
 if(key==="IMP"&&S.reputation>=65)return 3;
 return 0;
}
function eventSelectionScore(key,basePph){
 const level=leagueByName(S.league)?.level||3;
 const leagueBonus=level===1?11:level===2?5:-3;
 const average=Number(basePph||S.season?.avg)||0;
 const formBonus=clamp((average-1.25)*17,-12,18);
 const reputationBonus=(S.reputation-35)*.075;
 const ridesBonus=clamp(((S.season?.heats||0)-25)*.10,-4,5);
 const juniorBonus=isJuniorCompetitionKey(key)?juniorRelativeBonus(key)*.72:0;
 const agePenalty=!isJuniorCompetitionKey(key)&&S.age>=36?Math.min(5,(S.age-35)*.55):0;
 return overall()+leagueBonus+formBonus+reputationBonus+ridesBonus+juniorBonus-agePenalty-eventBottomPenalty(key);
}
const CLUB_CITY_MAP={
 "PRES Grupa Deweloperska Toruń":"Toruń","Motor Lublin":"Lublin","Sparta Wrocław":"Wrocław","BAYERSYSTEM GKM Grudziądz":"Grudziądz",
 "Stelmet Falubaz Zielona Góra":"Zielona Góra","FOGO Unia Leszno":"Leszno","Włókniarz Częstochowa":"Częstochowa","Stal Gorzów":"Gorzów Wielkopolski",
 "Polonia Bydgoszcz":"Bydgoszcz","Wilki Krosno":"Krosno","ROW Rybnik":"Rybnik","Stal Rzeszów":"Rzeszów","PSŻ Poznań":"Poznań",
 "Orzeł Łódź":"Łódź","Polonia Piła":"Piła","Ostrów Wielkopolski":"Ostrów Wielkopolski","Wybrzeże Gdańsk":"Gdańsk","ULTRAPUR Start Gniezno":"Gniezno",
 "Landshut Devils":"Landshut","OK Kolejarz Opole":"Opole","Lokomotiv Daugavpils":"Daugavpils","Speedway Kraków":"Kraków","Śląsk Świętochłowice":"Świętochłowice",
 "Jaskółki Tarnów":"Tarnów","Rawicz Speedway":"Rawicz","Wicher Machowa":"Machowa","Silesia Katowice":"Katowice","Warszawski Klub Żużlowy":"Warszawa",
 "Gryfy Szczecin":"Szczecin","Kielce Speedway":"Kielce","Podlasie Białystok":"Białystok","MSC Wölfe Wittstock":"Wittstock","AMK Zlatá Přilba Pardubice":"Pardubice"
};
function clubCity(name){
 const base=clubBaseName(name);
 if(CLUB_CITY_MAP[base])return CLUB_CITY_MAP[base];
 const expansion=EXPANSION_CLUBS.find(c=>clubBaseName(c.name)===base);
 if(expansion)return expansion.city;
 const tokens=base.split(/\s+/);
 return tokens[tokens.length-1]||base;
}
function activePolishQualificationCities(){
 const cities=[];
 for(const league of LEAGUES){
  for(const [name] of league.teams){
   if(isForeignPolishLeagueClub(name))continue;
   const city=clubCity(name);
   if(city&&!cities.includes(city))cities.push(city);
  }
 }
 return cities.length?cities:["Krosno","Opole","Bydgoszcz","Gniezno"];
}
function qualificationTournamentDetail(score=70,threshold=70){
 const city=pick(activePolishQualificationCities());
 const qualifyingSpots=Math.random()<.40?3:4;
 const strength=clamp((score-threshold)/18,-1,1);
 const roll=Math.random();
 let place;
 if(roll<.12+Math.max(0,strength)*.18)place=rand(1,2);
 else if(roll<.34+Math.max(0,strength)*.20)place=rand(2,4);
 else if(roll<.72-Math.max(0,strength)*.08)place=rand(4,8);
 else place=rand(7,16);
 return {city,place,qualifyingSpots,advanced:place<=qualifyingSpots};
}

function selectionReason(key,score,threshold,{invited=false,detail=null}={}){
 if(invited)return regionalInvitationBonus(key)>0?"Zaproszenie organizatora związane z klubem lub regionem.":"Incydentalne zaproszenie organizatora.";
 if(key==="SEC"||key==="GP Challenge")return "Miejsce wywalczone w międzynarodowej ścieżce kwalifikacyjnej.";
 if(score>=threshold+10)return "Pewna kwalifikacja sportowa do zawodów krajowych po bardzo dobrym sezonie.";
 if(score>=threshold+4)return "Kwalifikacja do zawodów krajowych dzięki wynikom sportowym.";
 const d=detail||qualificationTournamentDetail(score,threshold);
 return `${d.place}. miejsce w turnieju kwalifikacyjnym w ${cityLocative(d.city)}.`;
}
function competitionSelection(key,basePph,{force=false}={}){
 const rule=EVENT_SELECTION_RULES[key];
 if(!rule)return {qualified:true,reason:"Standardowe zgłoszenie."};
 const score=eventSelectionScore(key,basePph),threshold=rule.threshold;
 if(force||score>=threshold+9)return {qualified:true,reason:selectionReason(key,score,threshold),score};
 const qualifierChance=clamp(rule.baseChance+(score-threshold)*3.2,1,82);
 if(Math.random()*100<qualifierChance){
  const detail=qualificationTournamentDetail(score,threshold);
  if(detail.advanced){
   return {qualified:true,reason:selectionReason(key,score,threshold,{detail}),score,qualificationPlace:detail.place,qualificationCity:detail.city,qualifyingSpots:detail.qualifyingSpots};
  }
  // wynik eliminacji zapisujemy do historii, ale bez awansu
  addHistory("Eliminacje",`${championshipName(canonicalCompetitionKey({key}))}: ${detail.place}. miejsce w turnieju kwalifikacyjnym w ${cityLocative(detail.city)} — awans dawały miejsca 1–${detail.qualifyingSpots}.`);
 }
 const inviteChance=rule.inviteChance+regionalInvitationBonus(key);
 if(Math.random()*100<inviteChance)return {qualified:true,reason:selectionReason(key,score,threshold,{invited:true}),score,invited:true};
 return {qualified:false,reason:"Brak miejsca w stawce.",score};
}
function attachQualification(result,selection){
 if(result&&selection){
  result.qualification=ensureSentence(selection.reason);
  addHistory("Kwalifikacja",`${result.name}: ${ensureSentence(selection.reason)}`);
 }
 return result;
}


const IMP_PRIMARY_TRACKS=["Krosno","Bydgoszcz","Leszno","Toruń","Gorzów Wielkopolski","Częstochowa","Wrocław","Lublin","Zielona Góra","Rzeszów","Grudziądz","Gniezno","Ostrów Wielkopolski","Łódź","Opole","Poznań"];

function sampleDistinct(items,count){
 const a=[...new Set(items)].sort(()=>Math.random()-.5);
 return a.slice(0,Math.min(count,a.length));
}
function impTrackPool(){
 const active=activePolishQualificationCities(),preferred=IMP_PRIMARY_TRACKS.filter(c=>active.includes(c));
 const rest=active.filter(c=>!preferred.includes(c)&&!["Machowa","Katowice","Warszawa","Białystok"].includes(c));
 const pool=[...preferred,...rest];
 return pool.length>=8?pool:active;
}
const SGP_FOREIGN_HOST_POOL=["Praga","Cardiff","Manchester","Vojens","Malilla","Riga","Landshut","Lublana","Güstrow","Daugavpils","Pardubice"];
const SEC_FOREIGN_HOST_POOL=["Güstrow","Daugavpils","Pardubice","Debreczyn","Vojens","Landshut"];
const SGP_POLISH_HOST_WEIGHT={
 "Wrocław":11,"Toruń":11,"Łódź":9,"Gorzów Wielkopolski":9,"Lublin":8,"Warszawa":7,
 "Zielona Góra":7,"Leszno":6,"Bydgoszcz":6,"Częstochowa":5,"Krosno":4.5,
 "Rzeszów":3.5,"Grudziądz":3,"Rybnik":2.2,"Ostrów Wielkopolski":2,"Gniezno":1.4,
 "Poznań":1.2,"Gdańsk":1.2,"Tarnów":.8,"Opole":.45,"Kraków":.25,
 "Piła":.03,"Świętochłowice":.015,"Rawicz":.01,"Machowa":0,"Katowice":0,"Białystok":0,"Kielce":0,"Szczecin":0
};
const SEC_POLISH_HOST_WEIGHT={
 "Zielona Góra":10,"Rzeszów":9,"Bydgoszcz":8,"Częstochowa":8,"Krosno":7,"Toruń":7,
 "Gniezno":6,"Łódź":6,"Lublin":6,"Gorzów Wielkopolski":6,"Wrocław":6,"Leszno":5,
 "Grudziądz":5,"Ostrów Wielkopolski":4,"Rybnik":4,"Poznań":3,"Gdańsk":3,"Tarnów":2.5,
 "Opole":2,"Kraków":1,"Piła":.5,"Świętochłowice":.25
};
function weightedDistinctCities(weightMap,count,available=null){
 const allowed=available?new Set(available):null,items=Object.entries(weightMap)
  .filter(([city,w])=>w>0&&(!allowed||allowed.has(city))).map(([city,w])=>({city,w}));
 const out=[];
 while(items.length&&out.length<count){
  const total=items.reduce((s,x)=>s+x.w,0),r0=Math.random()*total;let r=r0,pickIndex=items.length-1;
  for(let i=0;i<items.length;i++){r-=items[i].w;if(r<=0){pickIndex=i;break}}
  out.push(items[pickIndex].city);items.splice(pickIndex,1);
 }
 return out;
}
function polishHostCount(series){
 const r=Math.random();
 if(series==="SGP")return r<.12?2:r<.82?3:4;
 return r<.30?1:2;
}
function ensureMajorSeriesCalendar(){
 if(S.majorSeriesCalendar?.year===S.year&&S.majorSeriesCalendar?.model==="weighted135")return S.majorSeriesCalendar;
 const active=activePolishQualificationCities();
 const sgpCount=rand(10,12),polishSGP=Math.min(polishHostCount("SGP"),sgpCount-6);
 const polishSGPHosts=weightedDistinctCities(SGP_POLISH_HOST_WEIGHT,polishSGP,active);
 const foreignSGP=sampleDistinct(SGP_FOREIGN_HOST_POOL,Math.max(0,sgpCount-polishSGPHosts.length));
 const sgp=[...polishSGPHosts,...foreignSGP].sort(()=>Math.random()-.5);

 const polishSEC=polishHostCount("SEC"),polishSECHosts=weightedDistinctCities(SEC_POLISH_HOST_WEIGHT,polishSEC,active);
 const foreignSEC=sampleDistinct(SEC_FOREIGN_HOST_POOL,Math.max(0,4-polishSECHosts.length));
 const sec=[...polishSECHosts,...foreignSEC].slice(0,4).sort(()=>Math.random()-.5);

 S.majorSeriesCalendar={year:S.year,model:"weighted135",sgpHosts:sgp,secHosts:sec};
 return S.majorSeriesCalendar;
}
function recentImpHostPenalty(city){
 const history=S.impHostHistory||[];
 const last=history.filter(x=>x.city===city).sort((a,b)=>b.year-a.year)[0];
 if(!last)return 1;
 const age=S.year-last.year;
 if(age<=1)return .06;
 if(age===2)return .22;
 if(age===3)return .52;
 return 1;
}
function pickRotatingImpHosts(pool,count=3){
 const items=[...new Set(pool)].map(city=>({city,w:recentImpHostPenalty(city)*(IMP_PRIMARY_TRACKS.includes(city)?1.3:1)}));
 const out=[];
 while(items.length&&out.length<count){
  const total=items.reduce((s,x)=>s+x.w,0)||1;let r=Math.random()*total,idx=items.length-1;
  for(let i=0;i<items.length;i++){r-=items[i].w;if(r<=0){idx=i;break}}
  out.push(items[idx].city);items.splice(idx,1);
 }
 return out;
}
function majorCalendarHomeInfo(){
 const cal=ensureMajorSeriesCalendar(),imp=ensureIMPSeasonState(),home=clubCity(S.club),
  sgpIndex=cal.sgpHosts.indexOf(home),secIndex=cal.secHosts.indexOf(home),impIndex=imp.roundHosts.indexOf(home);
 return {home,sgpIndex,secIndex,impIndex,sgpHome:sgpIndex>=0,secHome:secIndex>=0,impHome:impIndex>=0,cal,imp};
}
function majorCalendarNoticeHtml(){
 const x=majorCalendarHomeInfo();if(!x.home)return "";
 const impText=x.imp.roundHosts.map((city,i)=>`runda ${i+1}: ${city}${city===x.home?" <b>(domowy tor)</b>":""}`).join(" • ");
 return `<div class="calendar-notice"><b>Kalendarz najważniejszych cykli:</b> SGP — ${x.sgpHome?`<b>TAK, runda ${x.sgpIndex+1} na twoim domowym torze w ${cityLocative(x.home)}</b>`:"brak rundy na domowym torze"} • SEC — ${x.secHome?`<b>TAK, runda ${x.secIndex+1} w ${cityLocative(x.home)}</b>`:"brak rundy na domowym torze"}<br><b>Finały IMP:</b> ${impText}.</div>`;
}
function internationalWildcardScore(series,basePph){
 const home=clubCity(S.club),seasons=seasonsOnTrack(home),league=leagueByName(S.league)?.level||3;
 return overall()*.54+S.reputation*.18+currentFormRating()*.10+S.clubRelation*.06+Math.min(6,seasons*.8)+(league===1?5:league===2?2:0)+basePph*2.2;
}
function internationalHomeWildcardOpportunity(series,basePph){
 const info=majorCalendarHomeInfo(),isSGP=series==="SGP",hasHome=isSGP?info.sgpHome:info.secHome;
 if(!hasHome)return null;
 if(isSGP&&isQualifiedForCurrentSGP())return null;
 if(!isSGP&&(S.secActiveYear===S.year||isQualifiedForCurrentSGP()))return null;
 const score=internationalWildcardScore(series,basePph),threshold=isSGP?76:69;
 if(score<threshold)return null;
 const chance=clamp((isSGP?5:9)+(score-threshold)*(isSGP?2.2:2.8),isSGP?4:7,isSGP?48:62);
 if(Math.random()*100>=chance)return null;
 return {key:isSGP?"SGP Wild Card":"SEC Wild Card",name:isSGP?"Dzika karta Speedway Grand Prix":"Dzika karta Speedway Euro Championship",series,hostCity:info.home,round:(isSGP?info.sgpIndex:info.secIndex)+1,sportScore:score,qualificationReason:`Organizatorzy przyznają ci dziką kartę na lokalną rundę ${isSGP?"SGP":"SEC"} w ${cityLocative(info.home)}. Dynamiczny rozwój kariery i znajomość toru zadziałały na twoją korzyść.`};
}
function localInternationalWildcardBonus(event){
 const home=clubCity(S.club);if(!event?.hostCity||event.hostCity!==home)return 0;
 return clamp(2.5+Math.min(3,seasonsOnTrack(home)*.38)+(S.loyalty>=70?.7:0)+(S.clubRelation>=70?.6:0),2.5,6.5);
}

function ensureIMPSeasonState(){
 if(S.impSeasonState?.year===S.year)return S.impSeasonState;
 const pool=impTrackPool();
 let eliminationCities=sampleDistinct(pool,4);
 if(Math.random()<.025){
  const exotic=activePolishQualificationCities().filter(c=>!eliminationCities.includes(c)&&!IMP_PRIMARY_TRACKS.includes(c));
  if(exotic.length)eliminationCities[rand(0,3)]=pick(exotic);
 }
 const remaining=pool.filter(c=>!eliminationCities.includes(c));
 const challengeCity=pick(remaining.length?remaining:pool);
 const roundPool=pool.filter(c=>c!==challengeCity);
 const roundHosts=pickRotatingImpHosts(roundPool,3);
 S.impHostHistory??=[];
 roundHosts.forEach(city=>S.impHostHistory.push({year:S.year,city}));
 S.impHostHistory=S.impHostHistory.filter(x=>S.year-x.year<=8);
 const autoSpots=6+((S.year+(S.number||0))%3);
 const patterns={6:[4,4,4,3],7:[4,4,3,3],8:[4,3,3,3]};
 S.impSeasonState={year:S.year,autoSpots,eliminationCities,challengeCity,roundHosts,eliminationSpots:patterns[autoSpots],challengeSpots:15-autoSpots};
 return S.impSeasonState;
}
function impAutomaticPlayerSpot(currentSGP=false,secQualified=false){
 if(currentSGP)return {automatic:true,reason:"Stałe miejsce w cyklu IMP jako polski uczestnik Speedway Grand Prix."};
 if(secQualified||S.secActiveYear===S.year)return {automatic:true,reason:"Stałe miejsce w cyklu IMP jako polski uczestnik Speedway Euro Championship."};
 return {automatic:false,reason:""};
}
function impEliminationEntry(basePph){
 const score=eventSelectionScore("IMP",basePph);
 const chance=clamp(7+(score-58)*2.75,3,94);
 const entered=Math.random()*100<chance;
 return {entered,score,chance};
}
function impQualifierRivalPool(stage){
 const challenge=stage==="challenge";
 const mean=challenge?85:78,spread=challenge?6:9;
 return Array.from({length:15},(_,i)=>({
  id:`r${i}`,
  rating:clamp(Math.round(mean+rand(-spread,spread)),challenge?74:63,94)
 }));
}
function simulateIMPQualificationStage(stage,basePph){
 const pool=impQualifierRivalPool(stage),base=competitionPower(basePph,"IMP",{includeDay:false,extra:stage==="challenge"?-1:0});
 const power=elitePlayerRoundRating(base,"IMP",`${S.year}:IMP:${stage}`);
 const tournament=simulateClassic16Tournament({
  playerRating:power,pool,key:`IMP:${stage}`,
  heatVariance:stage==="challenge"?14:16
 });
 return {stage,points:tournament.player.points,place:tournament.place,pool,table:tournament.table,totalPoints:tournament.totalPoints};
}
function impEliminationAssignment(){
 const st=ensureIMPSeasonState();
 const index=Math.abs((S.number||1)+S.year+Math.round(S.reputation||0))%4;
 return {index,city:st.eliminationCities[index],spots:st.eliminationSpots[index]};
}
function impQualificationOpportunity(basePph,currentSGP=false,secQualified=false){
 const st=ensureIMPSeasonState(),auto=impAutomaticPlayerSpot(currentSGP,secQualified);
 if(auto.automatic){
  S.impQualifiedYear=S.year;
  return {key:"IMP",name:"Indywidualne Mistrzostwa Polski",qualificationReason:auto.reason};
 }
 const entry=impEliminationEntry(basePph);
 if(!entry.entered){
  addHistory("Eliminacje IMP",`Nie dostałeś miejsca w jednym z czterech turniejów eliminacyjnych IMP. Ocena zgłoszenia: ${Math.round(entry.score)}.`);
  return null;
 }
 const a=impEliminationAssignment();
 return {
  key:"IMP Qualification",name:"Kwalifikacje do Indywidualnych Mistrzostw Polski",
  eliminationCity:a.city,eliminationIndex:a.index,eliminationSpots:a.spots,
  challengeCity:st.challengeCity,challengeSpots:st.challengeSpots,
  qualificationReason:`Zostałeś zgłoszony do eliminacji IMP w ${cityLocative(a.city)}.`
 };
}
function impWildcardOpportunity(basePph){
 const st=ensureIMPSeasonState();
 if(S.impQualifiedYear===S.year)return null;
 const home=clubCity(S.club),roundIndex=st.roundHosts.indexOf(home);
 if(roundIndex<0)return null;
 const score=eventSelectionScore("IMP",basePph)+6+(S.clubRelation-50)*.05;
 const chance=clamp(6+(score-63)*2.6,4,68);
 if(Math.random()*100>=chance)return null;
 const direct=score>=88&&Math.random()<.58;
 return {
  key:"IMP Wild Card",name:`Dzika karta IMP — ${home}`,hostCity:home,round:roundIndex+1,
  wildcardMode:direct?"direct":"training",sportScore:score,
  qualificationReason:direct
   ?`Klub zgłosił cię jako lokalnego zawodnika do dzikiej karty na rundę IMP w ${cityLocative(home)}.`
   :`Jesteś jednym z kandydatów klubu do dzikiej karty na rundę IMP w ${cityLocative(home)}.`
 };
}
function impQualificationStagePlaceFromInteractive(state,stage,pool){
 const base=competitionPower(S.season?.avg||1.3,"IMP",{includeDay:false,extra:stage==="challenge"?0:1});
 const power=elitePlayerRoundRating(base,"IMP",state.eventToken||`${S.year}:IMP:${stage}`);
 return simulateClassic16Tournament({playerRating:power,pool,key:`IMP:${stage}`,playerRideResults:state.results,heatVariance:isChallenge?14:16}).place;
}
function showIMPQualificationStage(stage,event,basePph,done){
 const isChallenge=stage==="challenge",city=isChallenge?event.challengeCity:event.eliminationCity,spots=isChallenge?event.challengeSpots:event.eliminationSpots;
 const label=isChallenge?"IMP Challenge":`Eliminacje IMP — ${city}`;
 const prefix=isChallenge?`Awans do cyklu IMP dają miejsca 1–${spots}.`:`To jeden z czterech turniejów eliminacyjnych. Awans do IMP Challenge dają miejsca 1–${spots}.`;
 const pool=impQualifierRivalPool(stage);
 const finish=result=>{
  const advanced=result.place<=spots,text=`${result.place}. miejsce w ${isChallenge?"IMP Challenge":`eliminacjach IMP`} w ${cityLocative(city)}. Zdobyłeś ${result.points} pkt. Awans dawały miejsca 1–${spots}.`;
  addHistory(isChallenge?"IMP Challenge":"Eliminacje IMP",text);
  if(advanced)awardBreakthroughDevelopment(isChallenge?"impQualified":"impChallenge",isChallenge?14:8,{label:isChallenge?"awans do stałej stawki IMP":"awans do IMP Challenge"});
  const openResult=()=>showModal(isChallenge?"IMP CHALLENGE":"ELIMINACJE IMP",advanced?(isChallenge?"Awans do IMP!":"Awans do IMP Challenge"):"Bez awansu",ensureSentence(text),[
   {title:advanced?(isChallenge?"Przejdź dalej":"Przejdź do IMP Challenge"):"Kontynuuj",desc:advanced?(isChallenge?"Miejsce w stałej stawce IMP jest twoje.":"Czeka cię ostatni etap kwalifikacji."):"Na tym kończy się tegoroczna ścieżka kwalifikacyjna.",action:()=>{closeModal();done({advanced,...result,city,spots})}}
  ]);
  if(advanced){
   const celebration=isChallenge
    ?{kind:"AWANS DO IMP",title:"Indywidualne Mistrzostwa Polski",subtitle:`${result.place}. miejsce w IMP Challenge w ${cityLocative(city)}. ${result.points} pkt.`}
    :{kind:"AWANS DO IMP CHALLENGE",title:`${result.place}. miejsce w eliminacjach IMP`,subtitle:`${result.points} pkt w ${cityLocative(city)}.`};
   showAchievementCelebration(celebration.kind,celebration.title,celebration.subtitle,openResult);
  }else openResult();
 };
 const play=()=>{closeModal();playFiveInteractiveTournamentHeats({key:"IMP",label,prefix:`${prefix} `,rivalPool:pool,onStatus:s=>s.heat?`Masz ${s.points} pkt.`:""},state=>{
  const base=competitionPower(basePph,"IMP",{includeDay:false,extra:isChallenge?0:1}),power=elitePlayerRoundRating(base,"IMP",state.eventToken),t=simulateClassic16Tournament({playerRating:power,pool,key:`IMP:${stage}`,playerRideResults:state.results,heatVariance:isChallenge?14:16});
  finish({points:t.player.points,place:t.place,table:t.table,totalPoints:t.totalPoints});
 })};
 const simulate=()=>{closeModal();finish(simulateIMPQualificationStage(stage,basePph))};
 showModal(isChallenge?"IMP CHALLENGE":"ELIMINACJE IMP",label,`${prefix} Zawody odbędą się w ${cityLocative(city)}.`,[
  {title:"Rozegraj moje 5 biegów",desc:"Przejmij kontrolę nad wszystkimi swoimi startami. Pełna tabela 16 zawodników zostanie policzona z 20 biegów.",action:play},
  {title:"Symuluj turniej",desc:"Gra rozegra komplet 20 biegów: 16 zawodników, po 5 startów, 120 punktów do podziału.",action:simulate}
 ]);
}
function playIMPQualificationPath(event,basePph,done){
 showIMPQualificationStage("elimination",event,basePph,elim=>{
  if(!elim.advanced){done({qualified:false});return}
  showIMPQualificationStage("challenge",event,basePph,challenge=>{
   if(!challenge.advanced){done({qualified:false});return}
   S.impQualifiedYear=S.year;
   const reason=`${challenge.place}. miejsce w IMP Challenge w ${cityLocative(event.challengeCity)} po awansie z eliminacji w ${cityLocative(event.eliminationCity)}.`;
   done({qualified:true,reason,celebrationShown:true});
  });
 });
}
function impWildcardTrainingProb(mode,event){
 const base=overall()*.38+currentFormRating()*.18+S.professionalism*.13+S.morale*.08+
  (mode==="starts"?(S.skills.starts*.13+S.skills.corner*.10):
   mode==="setup"?(S.skills.setup*.15+S.equipment*.08):
   (S.skills.technique*.12+S.skills.mental*.11));
 const home=7,score=base+home+(event.sportScore-75)*.12;
 let success=clamp(45+(score-68)*.8,28,76);
 if(mode==="safe")success+=5;
 if(mode==="starts")success-=3;
 let superP=clamp(5+(score-70)*.06,3,10),incident=mode==="starts"?2:1;
 let fail=100-success-superP-incident;
 return {super:superP,success,fail:Math.max(8,fail),incident};
}
function simulateIMPWildcardRound(basePph,event){
 const key="IMP",field=buildCompetitionField(key,15),bonus=homeTrackWildcardBonus(event);
 const basePower=competitionPower(basePph,key,{includeDay:false});
 const power=elitePlayerRoundRating(basePower,key,`${S.year}:IMP:wildcard:${event.hostCity}`,bonus);
 const riders=[
  {id:"player",name:S.name,rating:power},
  ...field.map((r,i)=>({id:`r${i}`,name:`Rywal ${i+1}`,rating:r.rating}))
 ];
 const rows=eliteRoundRows(riders,key,{playerRatingOverride:power});
 const resolved=completeImpSecRound(rows);
 const m=resolved.meta.get("player"),base=rows.find(x=>x.rider.id==="player")?.base||0;
 const result=`${m.regularPlace}. miejsce po fazie zasadniczej; ${m.finalPlace?`${m.finalPlace}. miejsce w finale`:m.baragePlace?`${m.baragePlace}. miejsce w barażu`:"bez barażu"}`;
 addHistory("Dzika karta IMP",`Startujesz z dziką kartą w ${cityLocative(event.hostCity)}. Zdobywasz ${base} pkt w pięciu biegach i kończysz rundę: ${result}. Atut własnego toru pomógł ci w tym występie.`);
 return {
  name:"Indywidualne Mistrzostwa Polski — dzika karta",key:"IMP Wild Card",
  stage:`runda w ${event.hostCity}`,result:capitalizeFirstText(result),
  points:m.total,place:null,roundPlace:m.regularPlace,hostCity:event.hostCity,
  regularPlace:m.regularPlace,baragePlace:m.baragePlace,finalPlace:m.finalPlace
 };
}
function playInteractiveIMPWildcardRound(basePph,event,done){
 const pool=buildCompetitionField("IMP",15),bonus=homeTrackWildcardBonus(event);
 const basePower=competitionPower(basePph,"IMP",{includeDay:false});
 playFiveInteractiveTournamentHeats({
  key:"IMP",label:`Runda IMP w ${event.hostCity}`,
  prefix:"Jedziesz z dziką kartą gospodarza. ",
  rivalPool:pool,playerRatingBonus:bonus,
  contextNote:"Znajomość własnego toru daje ci niewielki bonus do efektywnej siły w tej rundzie, ale nie zmienia twojego nominalnego OVR."
 },state=>{
  const power=clamp(basePower+state.dayModifier*.72+bonus,48,99);
  const riders=[
   {id:"player",name:S.name,rating:power},
   ...pool.map((r,i)=>({id:`r${i}`,name:`Rywal ${i+1}`,rating:r.rating}))
  ];
  const rows=eliteRoundRows(riders,"IMP",{playerHeatPoints:state.points,playerRideResults:state.results,playerRatingOverride:power});
  playInteractiveImpSecPostHeats({
   key:"IMP",label:"IMP",rows,playerRatingBonus:bonus,
   contextNote:"Jedziesz na własnym torze z dziką kartą gospodarza.",dayToken:state.eventToken
  },resolved=>{
   const m=resolved.meta.get("player"),base=rows.find(x=>x.rider.id==="player")?.base||0;
   const result=`${m.regularPlace}. miejsce po fazie zasadniczej; ${m.finalPlace?`${m.finalPlace}. miejsce w finale`:m.baragePlace?`${m.baragePlace}. miejsce w barażu`:"bez barażu"}`;
   addHistory("Dzika karta IMP",`Startujesz z dziką kartą w ${cityLocative(event.hostCity)}. Zdobywasz ${base} pkt w fazie zasadniczej i kończysz występ: ${result}.`);
   done({
    name:"Indywidualne Mistrzostwa Polski — dzika karta",key:"IMP Wild Card",
    stage:`runda w ${event.hostCity}`,result:capitalizeFirstText(result),
    points:m.total,place:null,roundPlace:m.regularPlace,hostCity:event.hostCity,
    regularPlace:m.regularPlace,baragePlace:m.baragePlace,finalPlace:m.finalPlace
   });
  });
 });
}
function showIMPWildcardRoundPrompt(event,basePph,done){
 showModal("DZIKA KARTA IMP",`Runda IMP w ${event.hostCity}`,`Masz dziką kartę gospodarza. To pełnoprawny start w jednej rundzie IMP, ale nie daje miejsca w klasyfikacji całego cyklu. Znajomość własnego toru daje ci niewielki bonus do efektywnej siły w tych zawodach.`,[
  {title:"Rozegraj moje biegi",desc:"Przejmij kontrolę nad swoimi pięcioma startami i ewentualnym finałem.",action:()=>{closeModal();playInteractiveIMPWildcardRound(basePph,event,done)}},
  {title:"Symuluj rundę",desc:"Gra obliczy twój występ w całej rundzie.",action:()=>{closeModal();done(simulateIMPWildcardRound(basePph,event))}}
 ]);
}
function playIMPWildcardOpportunity(event,basePph,done){
 const grant=()=>{
  S.impWildcardYear=S.year;
  showAchievementCelebration("DZIKA KARTA IMP",`Runda w ${event.hostCity}`,event.qualificationReason,()=>showIMPWildcardRoundPrompt(event,basePph,done));
 };
 if(event.wildcardMode==="direct"){grant();return}
 const rivalLabel=S.age<=21?"innym juniorem z twojego klubu":"innym kandydatem z twojego klubu";
 showModal("WALKA O DZIKĄ KARTĘ","Kto pojedzie w rundzie IMP?",`Sztab nie podjął jeszcze decyzji. O miejsce rywalizujesz na treningu z ${rivalLabel}.`,[
  ...[
   ["starts","Postaw wszystko na starty","Agresywna próba zrobienia największego wrażenia na krótkich próbnych biegach."],
   ["balanced","Jedź trening jak zawody","Najbardziej wszechstronne podejście: tempo, technika i powtarzalność."],
   ["setup","Wygraj ustawieniami","Skup się na spasowaniu motocykla z własnym torem i pokaż sztabowi przewagę techniczną."]
  ].map(([mode,title,desc])=>{
   const prob=impWildcardTrainingProb(mode,event);
   const outcome=rollOutcome(prob);
   return {title,desc,prob,action:()=>{
    closeModal();
    showOutcomeRoller({title:"Rywalizacja o dziką kartę",mode:mode==="starts"?"attack":mode==="setup"?"inside":"safe",prob,outcome,onDone:()=>{
     if(outcome==="super"||outcome==="success"){
      addHistory("Dzika karta IMP",`Wygrywasz klubową rywalizację treningową o dziką kartę na rundę IMP w ${cityLocative(event.hostCity)}.`);
      grant();
     }else{
      addHistory("Dzika karta IMP",`Przegrywasz klubową rywalizację treningową o dziką kartę na rundę IMP w ${cityLocative(event.hostCity)}.`);
      showModal("DZIKA KARTA IMP","Tym razem bez nominacji",`Klub wybiera drugiego kandydata do startu w rundzie IMP w ${cityLocative(event.hostCity)}.`,[
       {title:"Kontynuuj",desc:"Wróć do dalszej części sezonu.",action:()=>{closeModal();done(null)}}
      ]);
     }
    }});
   }};
  })
 ]);
}
function impRoundWildcardRider(round){
 const st=ensureIMPSeasonState(),host=st.roundHosts[round-1]||"Polska";
 return {id:`wc${round}`,name:`Dzika karta — ${host}`,rating:clamp(82+rand(-9,8),65,92),total:0,wins:0,rounds:[],wildcard:true};
}

function majorCompetitionOpportunities(basePph){
 const opportunities=[];
 const available=INDIVIDUAL_EVENTS.filter(e=>S.age>=e.minAge&&S.age<=e.maxAge&&overall()>=e.minOverall);
 const currentSGP=isQualifiedForCurrentSGP()&&S.age>=20;

 if(currentSGP){
  opportunities.push({key:"Speedway Grand Prix",name:"Indywidualne Mistrzostwa Świata",qualificationReason:ensureSentence(S.sgpQualificationReason||"Miejsce utrzymane w cyklu SGP")});
 }

 // SEC: nominacja → eliminacja europejska → SEC Challenge → cykl.
 let secQualifiedThisSeason=false;
 if(!currentSGP&&!establishedSGPRider()&&S.age>=18&&Math.random()<internationalNominationChance("SEC",basePph)){
  const qualifier=simulateInternationalQualifier("SEC",basePph);
  if(qualifier.advanced){
   const challenge=simulateSECChallengeQualification(basePph);
   if(challenge.advanced){
    secQualifiedThisSeason=true;S.secActiveYear=S.year;
    opportunities.push({key:"SEC",name:"Speedway Euro Championship",qualificationReason:`${challenge.place}. miejsce w SEC Challenge w ${cityLocative(challenge.track.city)}.`});
   }
  }
 }

 // IMP: 15 stałych zawodników. Polacy z SGP/SEC mają miejsce automatyczne,
 // pozostali: cztery eliminacje → IMP Challenge. Niezależnie możliwa lokalna dzika karta.
 if(available.some(e=>e.short==="IMP")){
  const imp=impQualificationOpportunity(basePph,currentSGP,secQualifiedThisSeason);
  if(imp)opportunities.push(imp);
  const wildcard=impWildcardOpportunity(basePph);
  if(wildcard)opportunities.push(wildcard);
 }

 // Lokalne dzikie karty do SGP/SEC — tylko gdy dana runda rzeczywiście jest w kalendarzu na domowym torze.
 const secWild=internationalHomeWildcardOpportunity("SEC",basePph);if(secWild)opportunities.push(secWild);
 const sgpWild=internationalHomeWildcardOpportunity("SGP",basePph);if(sgpWild)opportunities.push(sgpWild);

 // SGP: nominacja → eliminacja europejska → Grand Prix Challenge.
 if(!currentSGP&&S.sgpQualifiedYear!==S.year+1&&available.some(e=>e.short==="GP Challenge")&&Math.random()<internationalNominationChance("SGP",basePph)){
  const qualifier=simulateInternationalQualifier("SGP",basePph);
  if(qualifier.advanced){
   opportunities.push({key:"GP Challenge",name:"Grand Prix Challenge",qualificationReason:`${qualifier.place}. miejsce w eliminacjach SGP w ${cityLocative(qualifier.track.city)}.`});
  }
 }
 return opportunities.slice(0,6);
}
function simulateIndividualCompetitions(basePph){
 const available=INDIVIDUAL_EVENTS.filter(e=>S.age>=e.minAge&&S.age<=e.maxAge&&overall()>=e.minOverall&&!MAJOR_COMPETITION_KEYS.has(e.short));
 const candidates=[];
 for(const event of available){
  const selection=competitionSelection(event.short,basePph);
  if(selection.qualified)candidates.push({event,selection});
 }
 const results=[];
 for(const candidate of candidates.sort(()=>Math.random()-.5).slice(0,3)){
  const {event,selection}=candidate;
  if(event.short==="SGP2"){
   if(eventSelectionScore("SGP2",basePph)>=EVENT_SELECTION_RULES.SGP2.threshold)results.push(attachQualification(simulateSGP2(basePph),selection));
  }else results.push(attachQualification(simulateGenericTournament(event,basePph),selection));
 }
 S.pendingMajorCompetitions=majorCompetitionOpportunities(basePph);
 return results;
}
function runMajorCompetition(key,basePph,playBonus=0){
 if(key==="IMP")return simulateIMP(clamp(basePph+playBonus,0,2.9));
 if(key==="SEC")return simulateSEC(clamp(basePph+playBonus,0,2.9));
 if(key==="GP Challenge")return simulateGPChallenge(clamp(basePph+playBonus,0,2.9));
 if(key==="Speedway Grand Prix")return simulateSGP(clamp(basePph+playBonus,0,2.9));
 return null;
}

function interactiveTournamentTactic(tactic,key,rivals=null,startSnapshot=null){
 const field=rivals||Array.from({length:3},(_,index)=>({label:`Rywal ${index+1}`,rating:drawCompetitionRating(key)}));
 const entrants=[{label:"Ty",rating:overall(),player:true},...field];
 const snap=startSnapshot||raceStartSnapshot("safe",entrants);
 return finishRaceFromSnapshot(snap,tactic,{teamRace:false});
}
function interactiveHeatChoices(title,description,onResolve){
 showModal("DECYDUJĄCY BIEG",title,description,[
  {title:"Zaatakuj od startu",desc:"Największy nacisk na start i pierwszy łuk.",action:()=>onResolve("start")},
  {title:"Buduj prędkość po szerokiej",desc:"Więcej zależy od dystansu, wyprzedzania i techniki.",action:()=>onResolve("outside")},
  {title:"Jedź krótko i technicznie",desc:"Technika, pierwszy łuk i ustawienia motocykla.",action:()=>onResolve("inside")},
  {title:"Zabezpiecz punkty",desc:"Mniejsza wariancja i ostrożniejsze podejście.",action:()=>onResolve("safe")}
 ]);
}
function playFiveInteractiveTournamentHeats({key,label,prefix="",startingCyclePoints=0,onStatus=null,rivalPool=null,playerRatingBonus=0,contextNote=""},done){
 const eventToken=`${S.year}:${key}:${label}`;
 const day=ensureDayForm(key,eventToken);
 const state={heat:0,points:0,wins:0,results:[],eventToken,dayModifier:day.modifier};
 const nextHeat=()=>{
  if(state.heat>=5){done(state);return}
  const heatNo=state.heat+1;
  const rivals=rivalPool?.length
   ?rivalPool.slice().sort(()=>Math.random()-.5).slice(0,3).map((r,i)=>({label:`Rywal ${i+1}`,rating:Math.round(r.rating+(r.seasonForm||0))}))
   :Array.from({length:3},(_,i)=>({label:`Rywal ${i+1}`,rating:drawCompetitionRating(key)}));
  const rivalText=rivals.map(r=>`${r.label}: OVR ${r.rating}`).join(" • ");
  const startContext=mentorAdviceContext(rivals,"start",null,{
   dayToken:eventToken,track:null,raceState:newRaceState(2),
   competitionKey:key,localEventBonus:playerRatingBonus
  });
  const advice=raceAdviceText(rivals,"start",null,startContext);
  const specs=[
   ["attack","Mocno postaw na start","Wysokie ryzyko, największy nacisk na reakcję i pierwszy łuk."],
   ["inside","Pilnuj krawężnika","Krótka linia, pierwszy łuk i technika."],
   ["outside","Wyjdź szerzej","Prędkość, dystans i możliwość napędzenia motocykla."],
   ["safe","Spokojny start","Mniejsza wariancja; zostawiasz sobie pole do decyzji na dystansie."]
  ];
  const options=specs.map(([mode,title,desc])=>{
   const prob=raceOutcomeProbabilities(mode,{phase:"start",rivals,context:startContext,position:2});
   return {title,desc,prob,action:()=>startIndividualRace(mode,startContext,prob,rivals)};
  });
  showModal("DECYDUJĄCY BIEG",`${label} — twój bieg ${heatNo}/5`,
   `${prefix}${state.heat?` Dotychczas w tej rundzie: ${state.points} pkt. `:""}${prefix&&!prefix.endsWith(" ")?" ":""}Ty: OVR ${overall()} • ${rivalText}. ${contextNote?`${ensureSentence(contextNote)} `:""}${onStatus?onStatus(state):""}${dayFormMessage(key,eventToken)}${advice}`,options);

  function startIndividualRace(startMode,c,prob,rivals){
   const resolved=resolveRaceDecision(startMode,{phase:"start",rivals,context:c,position:2,probOverride:prob});
   showOutcomeRoller({title:"Start i pierwszy łuk",subtitle:`<p>${resolved.narrative}</p>`,mode:startMode,prob,outcome:resolved.outcome,onDone:()=>{
    c.tacticalBonus=decisionTacticalBonus(startMode,rivals,"start",null,c);
    let snap=raceStartSnapshot(startMode,[{label:"Ty",rating:clamp(overall()+playerRatingBonus,1,99),player:true},...rivals],c);
    snap=ensureStartSnapshotPosition(snap,resolved.targetPosition);updateRaceState(c,2,snap.position,resolved.outcome,startMode);maybeShiftTrackConditions(c,"distance");
    const dc=mentorAdviceContext(rivals,"distance",null,c);dc.raceState=c.raceState;dc.trackShift=c.trackShift;dc.trackShiftChecked=true;snap.context=dc;
    currentRaceAdvice(rivals,"distance",null,dc);
    const choices=ensureMentorChoiceAvailable(distanceChoices(snap,{teamRace:false}),dc,"distance",snap.position).map(opt=>{
     const p=raceOutcomeProbabilities(opt.key,{phase:"distance",rivals,context:dc,position:snap.position});
     return {title:opt.title,desc:opt.desc,prob:p,action:()=>middleIndividualRace(opt.key,snap,rivals,dc,p)};
    });
    showModal("PIERWSZE OKRĄŻENIE",`Jedziesz ${snap.position}.`,`${resolved.narrative} ${raceSituationNarrative(snap)}${currentRaceAdvice(rivals,"distance",null,dc)}`,choices);
   }});
  }

  function middleIndividualRace(mode,snap,rivals,c,prob){
   const resolved=resolveRaceDecision(mode,{phase:"distance",rivals,context:c,position:snap.position,probOverride:prob});
   showOutcomeRoller({title:"Środek biegu",subtitle:`<p>${resolved.narrative}</p>`,mode,prob,outcome:resolved.outcome,onDone:()=>{
    let preview=finishRaceFromSnapshot(snap,mode,{teamRace:false,rivals,context:c,preview:true,suppressIncident:true});
    preview=ensurePlayerResultPosition(preview,resolved.targetPosition);
    updateRaceState(c,snap.position,preview.position,resolved.outcome,mode);
    const lc=mentorAdviceContext(rivals,"late",null,c);lc.raceState=c.raceState;lc.trackShift=c.trackShift;lc.order=preview.order||preview.scores||[];
    currentRaceAdvice(rivals,"late",null,lc);
    const choices=ensureMentorChoiceAvailable(raceDecisionChoices({...preview,context:lc},{teamRace:false,phase:"late"}),lc,"late",preview.position).map(opt=>{
     const p=raceOutcomeProbabilities(opt.key,{phase:"late",rivals,context:lc,position:preview.position});
     return {title:opt.title,desc:opt.desc,prob:p,action:()=>finishIndividualRace(opt.key,snapshotFromRaceResult(preview),rivals,lc,p,preview.position)};
    });
    const lateAdvice=currentRaceAdvice(rivals,"late",null,lc);
    showModal("KOŃCÓWKA BIEGU",`Jedziesz ${preview.position}.`,`${resolved.narrative} ${raceSituationNarrative({...preview,context:lc})}${lateAdvice}`,choices);
   }});
  }

  function finishIndividualRace(mode,snap,rivals,c,prob,position){
   const resolved=resolveRaceDecision(mode,{phase:"late",rivals,context:c,position,probOverride:prob});
   showOutcomeRoller({title:"Końcówka biegu",subtitle:`<p>${resolved.narrative}</p>`,mode,prob,outcome:resolved.outcome,onDone:()=>{
    let out=finishRaceFromSnapshot(snap,mode,{teamRace:false,rivals,context:c,suppressIncident:true});
    out=ensurePlayerResultPosition(out,resolved.targetPosition);out.decisionNarrative=resolved.outcome==="incident"?resolved.narrative:contextualRaceNarrative(mode,resolved.outcome,position,out.position,c);
    if(resolved.incident)out.incident={type:resolved.incident.key,serious:false,text:resolved.incident.text};
    state.heat++;state.points+=out.points;if(out.points===3)state.wins++;
    state.results.push({heat:state.heat,points:out.points,place:out.position,incident:out.incident?.type||null});
    const cycleText=startingCyclePoints?` • w całym cyklu: ${startingCyclePoints+state.points} pkt`:"";
    showModal("WYNIK BIEGU",`${out.position}. miejsce — ${out.points} pkt`,
     `Twój dorobek w tej rundzie: <b>${state.points} pkt</b>${cycleText}. ${out.decisionNarrative||""}${out.incident?` ${out.incident.text}`:""}`,
     [{title:state.heat<5?"Kolejny bieg":"Zakończ rundę",desc:state.heat<5?"Przejdź do kolejnego startu.":"Przejdź do klasyfikacji po fazie zasadniczej.",action:()=>{closeModal();nextHeat()}}]);
   }});
  }
 };
 nextHeat();
}

function playSingleInteractiveFinalHeat({
 key,label,rivals,onComplete,
 stageTitle="FINAŁ IMP",
 pointsByPlace=[3,2,1,0],
 completionTitle="Pokaż klasyfikację",
 completionDesc="Przejdź do wyniku zawodów.",
 playerRatingBonus=0,
 contextNote="",
 dayToken=null
}){
 const eventToken=dayToken||`${S.year}:${key}:${stageTitle}:${label}`;
 const startContext=mentorAdviceContext(rivals,"start",null,{
  dayToken:eventToken,track:null,raceState:newRaceState(2),
  competitionKey:key,localEventBonus:playerRatingBonus
 });
 const specs=[
  ["attack","Mocno postaw na start","Największa nagroda, ale większe ryzyko."],
  ["inside","Pilnuj krawężnika","Spróbuj wykorzystać krótszą linię."],
  ["outside","Wyjdź szerzej","Postaw na prędkość po zewnętrznej."],
  ["safe","Spokojny start","Zminimalizuj ryzyko na pierwszym łuku."]
 ];
 const options=specs.map(([mode,title,desc])=>{
  const p=raceOutcomeProbabilities(mode,{phase:"start",rivals,context:startContext,position:2});
  return {title,desc,prob:p,action:()=>start(mode,p)};
 });
 showModal(stageTitle,label,`Ty i trzech rywali. ${contextNote?`${ensureSentence(contextNote)} `:""}${raceAdviceText(rivals,"start",null,startContext)}`,options);

 function start(mode,p){
  const resolved=resolveRaceDecision(mode,{phase:"start",rivals,context:startContext,position:2,probOverride:p});
  showOutcomeRoller({title:`${stageTitle} — start`,subtitle:"",mode,prob:p,outcome:resolved.outcome,onDone:()=>{
   let snap=raceStartSnapshot(mode,[{label:"Ty",rating:clamp(overall()+playerRatingBonus,1,99),player:true},...rivals],startContext);
   snap=ensureStartSnapshotPosition(snap,resolved.targetPosition);updateRaceState(startContext,2,snap.position,resolved.outcome,mode);
   maybeShiftTrackConditions(startContext,"distance");
   const dc=mentorAdviceContext(rivals,"distance",null,startContext);dc.raceState=startContext.raceState;dc.trackShift=startContext.trackShift;dc.trackShiftChecked=true;snap.context=dc;
   currentRaceAdvice(rivals,"distance",null,dc);
   const choices=ensureMentorChoiceAvailable(raceDecisionChoices(snap,{teamRace:false,phase:"distance"}),dc,"distance",snap.position).map(opt=>{
    const q=raceOutcomeProbabilities(opt.key,{phase:"distance",rivals,context:dc,position:snap.position});
    return {title:opt.title,desc:opt.desc,prob:q,action:()=>middle(opt.key,q,snap,dc)};
   });
   showModal(`${stageTitle} — PIERWSZE OKRĄŻENIE`,raceSituationNarrative(snap),`${resolved.outcome==="incident"?resolved.narrative:contextualRaceNarrative(mode,resolved.outcome,2,snap.position,dc)}${currentRaceAdvice(rivals,"distance",null,dc)}`,choices);
  }});
 }
 function middle(mode,p,snap,c){
  const before=snap.position,resolved=resolveRaceDecision(mode,{phase:"distance",rivals,context:c,position:before,probOverride:p});
  showOutcomeRoller({title:`${stageTitle} — środek biegu`,subtitle:"",mode,prob:p,outcome:resolved.outcome,onDone:()=>{
   let preview=finishRaceFromSnapshot(snap,mode,{teamRace:false,rivals,context:c,preview:true,suppressIncident:true});
   preview=ensurePlayerResultPosition(preview,resolved.targetPosition);updateRaceState(c,before,preview.position,resolved.outcome,mode);
   const narrative=resolved.outcome==="incident"?resolved.narrative:contextualRaceNarrative(mode,resolved.outcome,before,preview.position,c);
   const lc=mentorAdviceContext(rivals,"late",null,c);lc.raceState=c.raceState;lc.trackShift=c.trackShift;lc.order=preview.order||preview.scores||[];
   currentRaceAdvice(rivals,"late",null,lc);
   const choices=ensureMentorChoiceAvailable(raceDecisionChoices({...preview,context:lc},{teamRace:false,phase:"late"}),lc,"late",preview.position).map(opt=>{
    const q=raceOutcomeProbabilities(opt.key,{phase:"late",rivals,context:lc,position:preview.position});
    return {title:opt.title,desc:opt.desc,prob:q,action:()=>finish(opt.key,q,snapshotFromRaceResult(preview),lc,preview.position)};
   });
   showModal(`${stageTitle} — KOŃCÓWKA`,raceSituationNarrative(preview),`${narrative}${raceAdviceText(rivals,"late",null,lc)}`,choices);
  }});
 }
 function finish(mode,p,snap,c,position){
  const resolved=resolveRaceDecision(mode,{phase:"late",rivals,context:c,position,probOverride:p});
  showOutcomeRoller({title:`${stageTitle} — ostatni manewr`,subtitle:"",mode,prob:p,outcome:resolved.outcome,onDone:()=>{
   let out=finishRaceFromSnapshot(snap,mode,{teamRace:false,rivals,context:c,suppressIncident:true});
   out=ensurePlayerResultPosition(out,resolved.targetPosition);
   const finalNarr=resolved.outcome==="incident"?resolved.narrative:contextualRaceNarrative(mode,resolved.outcome,position,out.position,c);
   const points=pointsByPlace[out.position-1]??0;
   showModal(stageTitle,`${out.position}. miejsce${pointsByPlace.some(x=>x)?` — ${points} pkt.`:"."}`,finalNarr,[
    {title:completionTitle,desc:completionDesc,action:()=>{closeModal();onComplete({place:out.position,points})}}
   ]);
  }});
 }
}


function playInteractiveImpSecPostHeats({key,label,rows,playerRatingBonus=0,contextNote="",dayToken=null},done){
 const structure=impSecRoundStructure(rows);
 const player=structure.regular.find(x=>x.rider.id==="player");
 const regularPlace=structure.regular.findIndex(x=>x.rider.id==="player")+1;
 const common=`Po pięciu biegach masz ${player.base} pkt i zajmujesz ${regularPlace}. miejsce w fazie zasadniczej.`;

 const finishWithoutPlayerFinal=(playerBaragePlace=null,fixedBarageQualifiers=null)=>{
  done(completeImpSecRound(rows,{playerBaragePlace,fixedBarageQualifiers}));
 };

 const playFinal=(fixedBarageQualifiers,playerBaragePlace=null)=>{
  const finalists=[...structure.direct,...fixedBarageQualifiers];
  const rivals=finalists.filter(x=>x.rider.id!=="player").map((x,i)=>({label:`Finalista ${i+1}`,rating:x.rider.rating}));
  playSingleInteractiveFinalHeat({
   key,label:`${common} Jedziesz w finale.`,
   rivals,stageTitle:`FINAŁ ${label}`,
   pointsByPlace:[3,2,1,0],
   completionTitle:"Pokaż wynik rundy",
   completionDesc:"Przejdź do klasyfikacji rundy.",
   playerRatingBonus,contextNote,dayToken,
   onComplete:o=>done(completeImpSecRound(rows,{playerBaragePlace,playerFinalPlace:o.place,fixedBarageQualifiers}))
  });
 };

 if(regularPlace<=2){
  const barageOrder=simulateSingleHeatOrderRows(structure.barage);
  const qualifiers=barageOrder.slice(0,2);
  showModal(`FAZA ZASADNICZA ${label}`,`Bezpośredni awans do finału`,`${common} Dwa pierwsze miejsca dają bezpośredni awans do finału.`,[
   {title:"Jedź finał",desc:"Poczekaj na dwóch najlepszych zawodników z barażu i pojedź o zwycięstwo.",action:()=>{closeModal();playFinal(qualifiers,null)}}
  ]);
  return;
 }

 if(regularPlace>=3&&regularPlace<=6){
  const barageRows=structure.barage;
  const rivals=barageRows.filter(x=>x.rider.id!=="player").map((x,i)=>({label:`Rywal w barażu ${i+1}`,rating:x.rider.rating}));
  showModal(`FAZA ZASADNICZA ${label}`,`Czeka cię baraż o finał`,`${common} Miejsca 3–6 jadą baraż, z którego dwóch najlepszych awansuje do finału.`,[
   {title:"Jedź baraż",desc:"Musisz znaleźć się w pierwszej dwójce czteroosobowego biegu.",action:()=>{
    closeModal();
    playSingleInteractiveFinalHeat({
     key,label:`${common} Dwóch najlepszych z tego biegu awansuje do finału.`,
     rivals,stageTitle:`BARAŻ ${label}`,
     pointsByPlace:[0,0,0,0],
     completionTitle:"Pokaż rozstrzygnięcie barażu",
     completionDesc:"Sprawdź, czy awansowałeś do finału.",
     playerRatingBonus,contextNote,dayToken,
     onComplete:o=>{
      const otherOrder=simulateSingleHeatOrderRows(barageRows.filter(x=>x.rider.id!=="player"));
      const qualifiers=o.place<=2?[player,otherOrder[0]]:otherOrder.slice(0,2);
      if(o.place<=2){
       showModal(`BARAŻ ${label}`,"Awans do finału",`Zajmujesz ${o.place}. miejsce w barażu i wchodzisz do finału.`,[
        {title:"Jedź finał",desc:"Przejdź do najważniejszego biegu rundy.",action:()=>{closeModal();playFinal(qualifiers,o.place)}}
       ]);
      }else{
       showModal(`BARAŻ ${label}`,"Bez awansu do finału",`Zajmujesz ${o.place}. miejsce w barażu. Do finału wchodziła pierwsza dwójka.`,[
        {title:"Pokaż wynik rundy",desc:"Przejdź do klasyfikacji rundy.",action:()=>{closeModal();finishWithoutPlayerFinal(o.place,qualifiers)}}
       ]);
      }
     }
    });
   }}
  ]);
  return;
 }

 showModal(`FAZA ZASADNICZA ${label}`,"Bez barażu i finału",`${common} Do barażu awansowały miejsca 3–6, a dwa pierwsze miejsca weszły bezpośrednio do finału.`,[
  {title:"Pokaż wynik rundy",desc:"Przejdź do klasyfikacji rundy.",action:()=>{closeModal();finishWithoutPlayerFinal()}}
 ]);
}

function playInteractiveSGPPostHeats({rows,playerRatingBonus=0,dayToken=null},done){
 const structure=sgpRoundStructure(rows);
 const player=structure.regular.find(x=>x.rider.id==="player");
 const regularPlace=structure.regular.findIndex(x=>x.rider.id==="player")+1;
 const common=`Po pięciu biegach masz ${player.base} pkt i zajmujesz ${regularPlace}. miejsce w fazie zasadniczej.`;

 const startFinal=(fixedLCQWinners)=>{
  const finalists=[...structure.direct,...fixedLCQWinners];
  const rivals=finalists.filter(x=>x.rider.id!=="player").map((x,i)=>({label:`Finalista ${i+1}`,rating:x.rider.rating}));
  playSingleInteractiveFinalHeat({
   key:"Speedway Grand Prix",label:`${common} Jedziesz w finale rundy SGP.`,
   rivals,stageTitle:"FINAŁ SGP",
   pointsByPlace:[0,0,0,0],
   completionTitle:"Pokaż wynik rundy",
   completionDesc:"Przejdź do punktów rundy SGP.",
   playerRatingBonus,dayToken,
   onComplete:o=>done(completeSGPRound(rows,{playerFinalPlace:o.place,fixedLCQWinners}))
  });
 };

 if(regularPlace<=2){
  const winners=structure.lcqGroups.map(group=>simulateSingleHeatOrderRows(group)[0]);
  showModal("FAZA ZASADNICZA SGP","Bezpośredni awans do finału",`${common} Dwa pierwsze miejsca po fazie zasadniczej wchodzą bezpośrednio do finału.`,[
   {title:"Jedź finał",desc:"Poczekaj na zwycięzców dwóch biegów LCQ i pojedź o zwycięstwo.",action:()=>{closeModal();startFinal(winners)}}
  ]);
  return;
 }

 if(regularPlace>=3&&regularPlace<=10){
  const groupIndex=structure.lcqGroups.findIndex(group=>group.some(x=>x.rider.id==="player"));
  const group=structure.lcqGroups[groupIndex];
  const otherGroup=structure.lcqGroups[1-groupIndex];
  const otherWinner=simulateSingleHeatOrderRows(otherGroup)[0];
  const rivals=group.filter(x=>x.rider.id!=="player").map((x,i)=>({label:`Rywal LCQ ${i+1}`,rating:x.rider.rating}));
  showModal("FAZA ZASADNICZA SGP",`LCQ ${groupIndex+1} — ostatnia szansa`,`${common} Miejsca 3–10 jadą dwa biegi Last Chance Qualifier. Tylko zwycięzca każdego LCQ awansuje do finału.`,[
   {title:`Jedź LCQ ${groupIndex+1}`,desc:"Musisz wygrać czteroosobowy bieg, żeby awansować do finału.",action:()=>{
    closeModal();
    playSingleInteractiveFinalHeat({
     key:"Speedway Grand Prix",label:`${common} Tylko zwycięzca tego LCQ awansuje do finału.`,
     rivals,stageTitle:`LCQ ${groupIndex+1} — SGP`,
     pointsByPlace:[0,0,0,0],
     completionTitle:"Pokaż wynik LCQ",
     completionDesc:"Sprawdź, czy awansowałeś do finału.",
     playerRatingBonus,dayToken,
     onComplete:o=>{
      let winners=[null,null];
      winners[1-groupIndex]=otherWinner;
      if(o.place===1){
       winners[groupIndex]=player;
       showModal(`LCQ ${groupIndex+1} — SGP`,"Wygrywasz LCQ i jedziesz w finale",`Zwyciężasz bieg Last Chance Qualifier. To daje ostatnie wolne miejsce w finale.`,[
        {title:"Jedź finał",desc:"Przejdź do finału rundy SGP.",action:()=>{closeModal();startFinal(winners)}}
       ]);
      }else{
       winners[groupIndex]=simulateSingleHeatOrderRows(group.filter(x=>x.rider.id!=="player"))[0];
       showModal(`LCQ ${groupIndex+1} — SGP`,"Koniec walki o finał",`Zajmujesz ${o.place}. miejsce w LCQ. Do finału awansował wyłącznie zwycięzca.`,[
        {title:"Pokaż wynik rundy",desc:"Przejdź do punktów rundy SGP.",action:()=>{closeModal();done(completeSGPRound(rows,{playerLCQPlace:o.place,fixedLCQWinners:winners}))}}
       ]);
      }
     }
    });
   }}
  ]);
  return;
 }

 showModal("FAZA ZASADNICZA SGP","Bez awansu do LCQ",`${common} Do LCQ awansowały miejsca 3–10, a miejsca 1–2 weszły bezpośrednio do finału.`,[
  {title:"Pokaż wynik rundy",desc:"Przejdź do punktów rundy SGP.",action:()=>{closeModal();done(completeSGPRound(rows))}}
 ]);
}

function playInteractiveIMP(basePph,done){
 const key="IMP",hosts=ensureIMPSeasonState().roundHosts;
 const basePower=competitionPower(basePph,key,{includeDay:false});
 const riders=Array.from({length:15},(_,index)=>({
  id:index===0?"player":`r${index}`,
  rating:index===0?basePower:competitionRivalRating(key,index-1),
  total:0,wins:0,rounds:[]
 }));

 for(let round=1;round<=2;round++){
  const wildcard=impRoundWildcardRider(round);
  const playerRating=elitePlayerRoundRating(basePower,key,`${S.year}:IMP:round:${round}`);
  const roundRiders=[...riders,wildcard].map(r=>r.id==="player"?{...r,rating:playerRating}:r);
  const rows=eliteRoundRows(roundRiders,key,{playerRatingOverride:playerRating});
  const resolved=completeImpSecRound(rows);
  for(const rider of riders){
   const m=resolved.meta.get(rider.id);if(!m)continue;
   rider.total+=m.total;if(m.finalPoints===3)rider.wins++;
   rider.rounds.push({
    round,host:hosts[round-1],base:rows.find(x=>x.rider.id===rider.id)?.base||0,
    regularPlace:m.regularPlace,baragePlace:m.baragePlace,finalPlace:m.finalPlace,
    finalPoints:m.finalPoints,roundPlace:m.roundPlace,total:m.total
   });
  }
 }

 const before=standingPlace(riders),wildcard=impRoundWildcardRider(3);
 playFiveInteractiveTournamentHeats({
  key,label:`Finałowa runda IMP — ${hosts[2]}`,
  prefix:`Po dwóch rundach masz ${riders[0].total} pkt i zajmujesz około ${before}. miejsca. `
 },state=>{
  const playerRating=clamp(basePower+state.dayModifier*.72,48,99);
  const roundRiders=[...riders,wildcard].map(r=>r.id==="player"?{...r,rating:playerRating}:r);
  const rows=eliteRoundRows(roundRiders,key,{playerHeatPoints:state.points,playerRideResults:state.results,playerRatingOverride:playerRating});
  playInteractiveImpSecPostHeats({key,label:"IMP",rows,dayToken:state.eventToken},resolved=>{
   for(const rider of riders){
    const m=resolved.meta.get(rider.id);if(!m)continue;
    rider.total+=m.total;if(m.finalPoints===3)rider.wins++;
    rider.rounds.push({
     round:3,host:hosts[2],base:rows.find(x=>x.rider.id===rider.id)?.base||0,
     regularPlace:m.regularPlace,baragePlace:m.baragePlace,finalPlace:m.finalPlace,
     finalPoints:m.finalPoints,roundPlace:m.roundPlace,total:m.total
    });
   }
   const place=standingPlace(riders),player=riders[0],last=player.rounds.at(-1);
   const result=medalResult(place,"Mistrz Polski",p=>`${p}. miejsce i medal IMP`,p=>`${p}. miejsce w IMP`);
   awardCompetitionResult(key,place,player.total);
   const roundAchievements=applyRoundAchievementBonuses(key,player.rounds,hosts);
   const phase=last.regularPlace<=2?"bezpośredni finał":last.regularPlace<=6?`baraż: ${last.baragePlace}. miejsce`:"bez barażu";
   addHistory("IMP",`${result}. W finałowej rundzie w ${cityLocative(hosts[2])} zdobywasz ${last.base} pkt w fazie zasadniczej (${last.regularPlace}. miejsce, ${phase})${last.finalPlace?`, a w finale zajmujesz ${last.finalPlace}. miejsce`:""}. Razem ${player.total} pkt.`);
   done({name:"Indywidualne Mistrzostwa Polski",key:"IMP",stage:"3 rundy",result:capitalizeFirstText(result),points:player.total,place,details:player.rounds,roundAchievements,healthExposureHeats:15});
  });
 });
}

function hasPriorSeriesStart(key){
 const archive=S.careerStats?.competitionArchive||[];
 return archive.some(x=>x.year<S.year&&x.key===key);
}
function seriesStandingContext(riders,key){
 const sorted=[...riders].sort((a,b)=>b.total-a.total||b.wins-a.wins),idx=sorted.findIndex(r=>r.id==="player");
 const player=sorted[idx],place=idx+1,maxSwing=key==="SGP"?20:18;
 const boundaries=key==="SGP"
  ?[{place:1,label:"triumf w cyklu"},{place:3,label:"medal"},{place:7,label:"utrzymanie w czołowej siódemce"}]
  :[{place:1,label:"triumf w cyklu"},{place:3,label:"medal"}];
 const live=[];
 for(const b of boundaries){
  if(place>b.place){
   const target=sorted[b.place-1],gap=Math.max(0,(target?.total||0)-player.total);
   if(gap<=maxSwing)live.push(`walczysz o ${b.label} — strata ${gap} pkt`);
  }else{
   const below=sorted[b.place],margin=Math.max(0,player.total-(below?.total||0));
   if(margin<=maxSwing)live.push(`bronisz pozycji dającej ${b.label} — przewaga ${margin} pkt`);
  }
 }
 return {place,points:player.total,important:live.length>0,text:live.join(" • ")};
}
function preferredInteractiveSeriesRound(key,totalRounds){
 const debut=!hasPriorSeriesStart(key);
 if(debut)return {round:1,reason:`To twój pierwszy pełny występ w ${key==="SGP"?"Speedway Grand Prix":"SEC"} — warto przejąć kontrolę od pierwszej rundy.`};
 return {round:totalRounds,reason:"Ostatnia runda może rozstrzygnąć najważniejsze cele sezonu."};
}
function playInteractiveSEC(basePph,done){
 const key="SEC",roundsCount=4,targetInfo=preferredInteractiveSeriesRound(key,roundsCount),targetRound=targetInfo.round;
 const basePower=competitionPower(basePph,key,{includeDay:false});
 const riders=Array.from({length:16},(_,index)=>({
  id:index===0?"player":`r${index}`,
  rating:index===0?basePower:competitionRivalRating(key,index-1),
  total:0,wins:0,rounds:[]
 }));

 const addResolvedRound=(round,rows,resolved)=>{
  for(const rider of riders){
   const m=resolved.meta.get(rider.id);if(!m)continue;
   rider.total+=m.total;if(m.finalPoints===3)rider.wins++;
   rider.rounds.push({
    round,heatPoints:rows.find(x=>x.rider.id===rider.id)?.base||0,
    regularPlace:m.regularPlace,baragePlace:m.baragePlace,finalPlace:m.finalPlace,
    finalPoints:m.finalPoints,roundPlace:m.roundPlace,points:m.total
   });
  }
 };

 for(let round=1;round<targetRound;round++){
  const playerRating=elitePlayerRoundRating(basePower,key,`${S.year}:SEC:round:${round}`);
  const roundRiders=riders.map(r=>r.id==="player"?{...r,rating:playerRating}:r);
  const rows=eliteRoundRows(roundRiders,key,{playerRatingOverride:playerRating});
  addResolvedRound(round,rows,completeImpSecRound(rows));
 }

 const before=seriesStandingContext(riders,key),start=riders[0].total;
 const host=ensureMajorSeriesCalendar().secHosts[targetRound-1]||"";
 const importance=targetRound===1?targetInfo.reason:(before.important?before.text:"W klasyfikacji nie ma już bardzo wąskiej walki o medal lub triumf, ale możesz rozegrać finałową rundę ręcznie.");

 playFiveInteractiveTournamentHeats({
  key,label:`Runda ${targetRound}/${roundsCount} SEC${host?` — ${host}`:""}`,startingCyclePoints:start,
  prefix:`Przed rundą masz ${start} pkt i zajmujesz około ${before.place}. miejsca. ${importance} `
 },state=>{
  const playerRating=clamp(basePower+state.dayModifier*.72,48,99),roundRiders=riders.map(r=>r.id==="player"?{...r,rating:playerRating}:r);
  const rows=eliteRoundRows(roundRiders,key,{playerHeatPoints:state.points,playerRideResults:state.results,playerRatingOverride:playerRating});
  playInteractiveImpSecPostHeats({key,label:"SEC",rows,dayToken:state.eventToken},resolved=>{
   addResolvedRound(targetRound,rows,resolved);

   // Jeśli ręcznie graliśmy debiutancką rundę, kolejne rundy są już symulowane.
   for(let round=targetRound+1;round<=roundsCount;round++){
    const pr=elitePlayerRoundRating(basePower,key,`${S.year}:SEC:round:${round}`);
    const rr=riders.map(r=>r.id==="player"?{...r,rating:pr}:r);
    const rows2=eliteRoundRows(rr,key,{playerRatingOverride:pr});
    addResolvedRound(round,rows2,completeImpSecRound(rows2));
   }

   const place=standingPlace(riders),player=riders[0],played=player.rounds.find(r=>r.round===targetRound);
   const result=medalResult(place,"Mistrz Europy",p=>`${p}. miejsce i medal SEC`,p=>`${p}. miejsce w SEC`);
   awardCompetitionResult(key,place,player.total);
   const roundAchievements=applyRoundAchievementBonuses("SEC",player.rounds,ensureMajorSeriesCalendar().secHosts);
   if(place===1)qualifyForNextSGP("Zwycięstwo w Speedway Euro Championship");
   addHistory("SEC",`${result}. Ręcznie rozegrałeś rundę ${targetRound}: ${played.heatPoints} pkt w fazie zasadniczej, ${played.regularPlace}. miejsce${played.baragePlace?`; baraż: ${played.baragePlace}. miejsce`:""}${played.finalPlace?`; finał: ${played.finalPlace}. miejsce`:""}. Razem ${player.total} pkt.`);
   done({name:"Speedway Euro Championship",key:"SEC",stage:"4 rundy",result,points:player.total,place,details:player.rounds,roundAchievements,healthExposureHeats:20});
  });
 });
}
function playInteractiveSGP(basePph,done){
 const key="Speedway Grand Prix",roundsCount=ensureMajorSeriesCalendar().sgpHosts.length,season=createSGPField(basePph);
 const riders=[season.player,...season.opponents],targetInfo=preferredInteractiveSeriesRound("SGP",roundsCount),targetRound=targetInfo.round;

 for(let round=1;round<targetRound;round++)simulateSGPRoundForRiders(riders,round);
 const before=seriesStandingContext(riders,"SGP"),start=season.player.total,host=ensureMajorSeriesCalendar().sgpHosts[targetRound-1]||"";
 const importance=targetRound===1?targetInfo.reason:(before.important?before.text:"Nie walczysz już bezpośrednio na granicy Top 7 lub podium, ale możesz rozegrać ostatnią rundę ręcznie.");

 playFiveInteractiveTournamentHeats({
  key,label:`Runda SGP ${targetRound}/${roundsCount}${host?` — ${host}`:""}`,
  prefix:`Przed rundą masz ${start} pkt i zajmujesz około ${before.place}. miejsca w cyklu. ${importance} `,
  rivalPool:season.opponents
 },state=>{
  const playerRating=clamp(season.player.rating+state.dayModifier*.72,48,99),roundRiders=riders.map(r=>r.id==="player"?{...r,rating:playerRating}:r);
  const rows=eliteRoundRows(roundRiders,key,{playerHeatPoints:state.points,playerRideResults:state.results,playerRatingOverride:playerRating});
  playInteractiveSGPPostHeats({rows,dayToken:state.eventToken},resolved=>{
   for(const rider of riders){
    const m=resolved.meta.get(rider.id);if(!m)continue;
    rider.total+=m.points;if(m.place===1)rider.wins++;
    rider.rounds.push({
     round:targetRound,place:m.place,points:m.points,
     heatPoints:rows.find(x=>x.rider.id===rider.id)?.base||0,
     regularPlace:m.regularPlace,lcq:m.lcq,finalPlace:m.finalPlace
    });
   }

   for(let round=targetRound+1;round<=roundsCount;round++)simulateSGPRoundForRiders(riders,round);

   const playerRound=season.player.rounds.find(r=>r.round===targetRound),finalPlace=standingPlace(riders),player=season.player;
   const result=medalResult(finalPlace,"Mistrz świata",p=>`${p}. miejsce i medal IMŚ`,p=>`${p}. miejsce w IMŚ`);
   awardCompetitionResult(key,finalPlace,player.total);
   const roundAchievements=applyRoundAchievementBonuses("SGP",player.rounds,ensureMajorSeriesCalendar().sgpHosts);
   if(finalPlace<=7)qualifyForNextSGP(`${finalPlace}. miejsce w klasyfikacji generalnej SGP`);
   else if(!(S.sgpQualifiedYear===S.year+1&&/GP Challenge|SEC/.test(S.sgpQualificationReason||""))){
    clearNextSGPQualification();
    addHistory("Speedway Grand Prix","Kończysz cykl poza czołową siódemką. Aby wrócić w kolejnym sezonie, musisz awansować przez Grand Prix Challenge albo wygrać SEC.");
   }
   const phase=playerRound.regularPlace<=2?"bezpośredni awans do finału":playerRound.regularPlace<=10?`LCQ ${playerRound.lcq?.group||"—"}: ${playerRound.lcq?.place||"—"}. miejsce`:"bez awansu do LCQ";
   addHistory("Speedway Grand Prix",`${result}. Ręcznie rozegrałeś rundę ${targetRound}: ${playerRound.heatPoints} pkt biegowych, ${playerRound.regularPlace}. miejsce po fazie zasadniczej (${phase})${playerRound.finalPlace?`; finał: ${playerRound.finalPlace}. miejsce`:""}. Runda: ${playerRound.place}. miejsce i ${playerRound.points} pkt SGP. Razem ${player.total} pkt.`);
   done({name:"Indywidualne Mistrzostwa Świata",key:"SGP",stage:`${roundsCount} rund SGP`,result,points:player.total,place:finalPlace,details:player.rounds.map(r=>r.place),roundAchievements,healthExposureHeats:roundsCount*5});
  });
 });
}

function playInteractiveGPChallenge(basePph,done){
 const key="GP Challenge",playerPower=competitionPower(basePph,key,{includeDay:false}),gpField=buildCompetitionField(key,15);
 playFiveInteractiveTournamentHeats({key,label:"Grand Prix Challenge",prefix:"Trzy pierwsze miejsca dają awans do przyszłorocznego cyklu SGP.",rivalPool:gpField},state=>{
  const power=elitePlayerRoundRating(playerPower,key,state.eventToken),t=simulateClassic16Tournament({playerRating:power,pool:gpField,key,playerRideResults:state.results});
  const place=t.place,result=place===1?"zwycięstwo w Grand Prix Challenge":`${place}. miejsce w Grand Prix Challenge`;
  awardCompetitionResult(key,place,t.player.points);if(place<=3)qualifyForNextSGP(`${place}. miejsce w Grand Prix Challenge`);
  addHistory("Grand Prix Challenge",`${result}. Zdobywasz ${t.player.points} pkt${place<=3?" i wywalczasz awans do SGP":""}.`);
  done({name:"Grand Prix Challenge",key:"GP Challenge",stage:"turniej kwalifikacyjny",result,points:t.player.points,place,heats:5,healthExposureHeats:5,details:state.results.map(r=>r.points)});
 });
}
function playInteractiveMajorCompetition(event,basePph,done){
 if(event.key==="IMP"){playInteractiveIMP(basePph,done);return}
 if(event.key==="SEC"){playInteractiveSEC(basePph,done);return}
 if(event.key==="GP Challenge"){playInteractiveGPChallenge(basePph,done);return}
 if(event.key==="Speedway Grand Prix"){playInteractiveSGP(basePph,done);return}
 done(runMajorCompetition(event.key,basePph,0));
}

function simulateInternationalWildcardRound(event,basePph){
 const isSGP=event.series==="SGP",key=isSGP?"Speedway Grand Prix":"SEC",pool=buildCompetitionField(key,15),bonus=localInternationalWildcardBonus(event);
 const base=competitionPower(basePph,key,{includeDay:false,extra:-1}),power=elitePlayerRoundRating(base,key,`${S.year}:${event.key}:${event.round}`,bonus);
 const rows=eliteRoundRows([{id:"player",name:S.name,rating:power},...pool.map((r,i)=>({id:`r${i}`,name:`Rywal ${i+1}`,rating:r.rating}))],key,{playerRatingOverride:power});
 if(isSGP){
  const resolved=completeSGPRound(rows),m=resolved.meta.get("player"),place=m.place,result=place===1?"zwycięstwo w rundzie SGP":`${place}. miejsce w rundzie SGP`;
  const ra=place<=3?[{round:event.round,place,host:event.hostCity,key:"SGP"}]:[];if(place<=3)applyRoundAchievementBonuses("SGP",ra.map(x=>({round:x.round,place:x.place,host:x.host})),[event.hostCity]);
  return {name:`Speedway Grand Prix — dzika karta (${event.hostCity})`,key:"SGP Wild Card",stage:`runda ${event.round}`,result,points:m.points,place,roundPlace:place,hostCity:event.hostCity,roundAchievements:ra,healthExposureHeats:5};
 }
 const resolved=completeImpSecRound(rows),m=resolved.meta.get("player"),place=m.roundPlace,result=place===1?"zwycięstwo w rundzie SEC":`${place}. miejsce w rundzie SEC`;
 const ra=place<=3?[{round:event.round,place,host:event.hostCity,key:"SEC"}]:[];if(place<=3)applyRoundAchievementBonuses("SEC",ra.map(x=>({round:x.round,roundPlace:x.place,host:x.host})),[event.hostCity]);
 return {name:`Speedway Euro Championship — dzika karta (${event.hostCity})`,key:"SEC Wild Card",stage:`runda ${event.round}`,result,points:m.total,place,roundPlace:place,hostCity:event.hostCity,roundAchievements:ra,healthExposureHeats:5};
}
function playInternationalWildcardRound(event,basePph,done){
 const isSGP=event.series==="SGP",key=isSGP?"Speedway Grand Prix":"SEC",pool=buildCompetitionField(key,15),bonus=localInternationalWildcardBonus(event),base=competitionPower(basePph,key,{includeDay:false,extra:-1});
 playFiveInteractiveTournamentHeats({key,label:`${isSGP?"SGP":"SEC"} — dzika karta w ${event.hostCity}`,prefix:`Jedziesz przed własną publicznością. `,rivalPool:pool,playerRatingBonus:bonus,contextNote:"Znajomość domowego toru daje niewielki bonus do efektywnej siły, ale nie zmienia nominalnego OVR."},state=>{
  const power=clamp(base+state.dayModifier*.72+bonus,48,99),riders=[{id:"player",name:S.name,rating:power},...pool.map((r,i)=>({id:`r${i}`,name:`Rywal ${i+1}`,rating:r.rating}))],rows=eliteRoundRows(riders,key,{playerHeatPoints:state.points,playerRideResults:state.results,playerRatingOverride:power});
  if(isSGP)playInteractiveSGPPostHeats({rows,playerRatingBonus:bonus,dayToken:state.eventToken},resolved=>{
   const m=resolved.meta.get("player"),place=m.place,ra=place<=3?[{round:event.round,place,host:event.hostCity,key:"SGP"}]:[];if(place<=3)applyRoundAchievementBonuses("SGP",[{round:event.round,place,host:event.hostCity}],[event.hostCity]);
   done({name:`Speedway Grand Prix — dzika karta (${event.hostCity})`,key:"SGP Wild Card",stage:`runda ${event.round}`,result:place===1?"zwycięstwo w rundzie SGP":`${place}. miejsce w rundzie SGP`,points:m.points,place,roundPlace:place,hostCity:event.hostCity,roundAchievements:ra,healthExposureHeats:5});
  });
  else playInteractiveImpSecPostHeats({key:"SEC",label:"SEC",rows,playerRatingBonus:bonus,dayToken:state.eventToken,contextNote:"Jedziesz jako lokalna dzika karta."},resolved=>{
   const m=resolved.meta.get("player"),place=m.roundPlace,ra=place<=3?[{round:event.round,place,host:event.hostCity,key:"SEC"}]:[];if(place<=3)applyRoundAchievementBonuses("SEC",[{round:event.round,roundPlace:place,host:event.hostCity}],[event.hostCity]);
   done({name:`Speedway Euro Championship — dzika karta (${event.hostCity})`,key:"SEC Wild Card",stage:`runda ${event.round}`,result:place===1?"zwycięstwo w rundzie SEC":`${place}. miejsce w rundzie SEC`,points:m.total,place,roundPlace:place,hostCity:event.hostCity,roundAchievements:ra,healthExposureHeats:5});
  });
 });
}

function playMajorCompetitionQueue(basePph,next){
 const queue=[...(S.pendingMajorCompetitions||[])];S.pendingMajorCompetitions=[];

 const proceed=()=>{
  if(!queue.length){next();return}
  const event=queue.shift();

  if(event.key==="IMP Qualification"){
   playIMPQualificationPath(event,basePph,out=>{
    if(out?.qualified){
     queue.unshift({key:"IMP",name:"Indywidualne Mistrzostwa Polski",qualificationReason:out.reason,qualificationCelebrationShown:!!out.celebrationShown});
    }
    proceed();
   });
   return;
  }

  if(event.key==="IMP Wild Card"){
   if(S.impQualifiedYear===S.year){proceed();return}
   playIMPWildcardOpportunity(event,basePph,result=>{
    if(result){S.competitions.push(result);renderCompetitions();save();showCompetitionResult(result,proceed)}
    else proceed();
   });
   return;
  }

  if(event.key==="SGP Wild Card"||event.key==="SEC Wild Card"){
   const open=()=>showModal("DZIKA KARTA",event.name,`${ensureSentence(event.qualificationReason)} Możesz rozegrać swoje pięć biegów albo zasymulować całą rundę.`,[
    {title:"Rozegraj rundę",desc:"Przejmij kontrolę nad swoimi pięcioma startami, a potem ewentualnym barażem/LCQ i finałem.",action:()=>{closeModal();playInternationalWildcardRound(event,basePph,r=>{S.competitions.push(r);renderCompetitions();save();showCompetitionResult(r,proceed)})}},
    {title:"Symuluj rundę",desc:"Gra policzy pełny wynik rundy z uwzględnieniem atutu domowego toru.",action:()=>{closeModal();const r=simulateInternationalWildcardRound(event,basePph);S.competitions.push(r);renderCompetitions();save();showCompetitionResult(r,proceed)}}
   ]);
   showAchievementCelebration("DZIKA KARTA",event.series==="SGP"?"Speedway Grand Prix":"Speedway Euro Championship",`Lokalna runda w ${cityLocative(event.hostCity)}.`,open);return;
  }

  if((event.key==="SEC"||event.key==="GP Challenge")&&S.sgpQualifiedYear===S.year+1){proceed();return}

  const interactive=["IMP","SEC","GP Challenge","Speedway Grand Prix"].includes(event.key);
  const openPrompt=()=>{
   const reason=ensureSentence(event.qualificationReason||"Kwalifikacja sportowa");
   const seriesSpecial=event.key==="SEC"||event.key==="Speedway Grand Prix";
   const extra=interactive
    ?(seriesSpecial?"Gra wybierze do ręcznego rozegrania rundę szczególnie ważną dla twojej kariery lub klasyfikacji; pozostałe zostaną zasymulowane.":"Możesz przejąć kontrolę w decydującej fazie i podejmować decyzje bieg po biegu.")
    :"Możesz rozegrać zawody albo oddać wynik symulacji.";
   showModal("NAJWAŻNIEJSZE ZAWODY",`Zakwalifikowałeś się: ${event.name}`,`${reason} ${extra}`,[
    {title:interactive?(event.key==="SEC"||event.key==="Speedway Grand Prix"?"Rozegraj kluczową rundę":"Rozegraj decydującą rundę"):"Rozegraj zawody",desc:interactive?"Wcześniejsza część zostanie zasymulowana; ty pojedziesz najważniejsze biegi.":"Twój wybór wpłynie na wynik.",action:()=>{
     closeModal();
     playInteractiveMajorCompetition(event,basePph,r=>{
      if(r){r=attachQualification(r,{reason:event.qualificationReason});S.competitions.push(r)}
      renderCompetitions();save();showCompetitionResult(r,proceed);
     });
    }},
    {title:"Symuluj całe zawody",desc:"Gra obliczy pełny wynik bez dodatkowych decyzji.",action:()=>{
     closeModal();let r=runMajorCompetition(event.key,basePph,0);
     if(r){r=attachQualification(r,{reason:event.qualificationReason});S.competitions.push(r)}
     renderCompetitions();save();showCompetitionResult(r,proceed);
    }}
   ]);
  };
  const q=event.qualificationCelebrationShown?null:qualificationCelebration(event);
  if(q)showAchievementCelebration(q.kind,q.title,q.subtitle,openPrompt);
  else openPrompt();
 };
 proceed();
}



function nationalTeamPower(basePph){
 const leagueLevel=leagueByName(S.league)?.level||3,leagueBonus=leagueLevel===1?6:leagueLevel===2?2:-2;
 return overall()*.62+currentFormRating()*.16+S.skills.mental*.08+S.equipment*.06+basePph*5+leagueBonus;
}
const NATIONAL_TEAM_STRENGTHS={
 "Polska":87,"Australia":90,"Dania":89,"Wielka Brytania":88,"Szwecja":86,"Czechy":80,"Niemcy":77,"Łotwa":79
};
function nationalFourTeamField(event){
 const pool=event.world?["Australia","Dania","Wielka Brytania","Szwecja","Czechy"]:["Dania","Wielka Brytania","Szwecja","Czechy","Niemcy","Łotwa"];
 const shuffled=pool.slice().sort(()=>Math.random()-.5);
 return ["Polska",...shuffled.slice(0,3)];
}
function nationalityRiderLabel(country){
 return {"Dania":"Duńczyk","Szwecja":"Szwed","Wielka Brytania":"Brytyjczyk","Australia":"Australijczyk","Czechy":"Czech","Niemcy":"Niemiec","Łotwa":"Łotysz","Polska":"Polak"}[country]||country;
}
function nationalHeatEntrants(teams,playerHeat=false,event=null){
 return teams.map(country=>{
  const juniorShift=event?.junior?-6:0;
  const base=(NATIONAL_TEAM_STRENGTHS[country]||80)+juniorShift+rand(-4,4);
  if(country==="Polska"&&playerHeat)return {country,label:"Ty",rating:overall(),player:true};
  return {country,label:nationalityRiderLabel(country),rating:clamp(base+rand(-7,7),event?.junior?56:62,event?.junior?91:96)};
 });
}
function applyNationalHeatScores(scores,order){
 order.forEach((r,index)=>scores[r.country]+=[3,2,1,0][index]);
}
function nationalStandingsText(scores){
 return Object.entries(scores).sort((a,b)=>b[1]-a[1]).map(([c,p])=>`${c}: ${p}`).join(" • ");
}
function finalizeNationalEvent(event,scores,playerPoints,playerResults){
 const order=Object.entries(scores).sort((a,b)=>b[1]-a[1]);
 const place=order.findIndex(([c])=>c==="Polska")+1;
 const medal=place===1?"Złoty medal":place===2?"Srebrny medal":place===3?"Brązowy medal":`${place}. miejsce`;
 const result=`${medal}. ${playerPoints} pkt w ${playerResults.length||5} biegach.`;
 S.national="Polska";S.teamCaps=(S.teamCaps||0)+1;if(place<=3)S.nationalMedals=(S.nationalMedals||0)+1;
 applyMetaDelta("reputation",place===1?7:place<=3?4:1);applyMetaDelta("morale",place<=3?3:-1);S.devPoints+=place<=3?1:0;
 addHistory(event.name,`Reprezentacja Polski kończy zawody na ${place}. miejscu. Twój dorobek: ${playerPoints} pkt. Wyniki: ${nationalStandingsText(scores)}.`);
 return {name:event.name,key:event.name,stage:event.junior?"Reprezentacja U21":"Reprezentacja seniorów",result,points:playerPoints,place,teamScores:{...scores}};
}
function simulateNationalFourTeamEvent(event){
 const teams=nationalFourTeamField(event),scores=Object.fromEntries(teams.map(t=>[t,0])),playerHeats=new Set([2,6,10,14,18]);
 let playerPoints=0,playerResults=[];
 for(let heat=1;heat<=20;heat++){
  const entrants=nationalHeatEntrants(teams,playerHeats.has(heat),event);
  const order=entrants.map(r=>({...r,score:r.rating+rand(-11,11)})).sort((a,b)=>b.score-a.score);
  applyNationalHeatScores(scores,order);
  const player=order.find(r=>r.player);
  if(player){const pts=[3,2,1,0][order.indexOf(player)];playerPoints+=pts;playerResults.push(pts)}
 }
 return finalizeNationalEvent(event,scores,playerPoints,playerResults);
}
function playInteractiveNationalFourTeamEvent(event,done){
 const teams=nationalFourTeamField(event),scores=Object.fromEntries(teams.map(t=>[t,0])),playerHeats=[2,6,10,14,18];
 let nextHeat=1,playerIndex=0,playerPoints=0,playerResults=[];
 const simulateToPlayerHeat=()=>{
  const target=playerIndex<playerHeats.length?playerHeats[playerIndex]:21;
  while(nextHeat<target){
   const entrants=nationalHeatEntrants(teams,false,event),order=entrants.map(r=>({...r,score:r.rating+rand(-11,11)})).sort((a,b)=>b.score-a.score);
   applyNationalHeatScores(scores,order);nextHeat++;
  }
  if(target===21){
   while(nextHeat<=20){
    const entrants=nationalHeatEntrants(teams,false,event),order=entrants.map(r=>({...r,score:r.rating+rand(-11,11)})).sort((a,b)=>b.score-a.score);
    applyNationalHeatScores(scores,order);nextHeat++;
   }
   done(finalizeNationalEvent(event,scores,playerPoints,playerResults));return;
  }
  const entrants=nationalHeatEntrants(teams,true,event),rivals=entrants.filter(r=>!r.player),before=nationalStandingsText(scores);
  const startContext=mentorAdviceContext(rivals,"start",null,{dayToken:`${S.year}:${event.name}:${target}`,track:null,raceState:newRaceState(2)});
  const specs=[
   ["attack","Mocno postaw na start","Spróbuj przejąć inicjatywę już na dojeździe."],
   ["inside","Pilnuj krawężnika","Krótka linia i kontrola pierwszego łuku."],
   ["outside","Wyjdź szerzej","Buduj prędkość po zewnętrznej."],
   ["safe","Spokojny start","Mniej ryzyka, więcej miejsca na późniejszą decyzję."]
  ];
  const options=specs.map(([mode,title,desc])=>{
   const prob=raceOutcomeProbabilities(mode,{phase:"start",rivals,context:startContext,position:2});
   return {title,desc,prob,action:()=>startNational(mode,prob,startContext,entrants,rivals,target)};
  });
  showModal(event.name,`Twój bieg ${playerIndex+1}/5 — bieg ${target}/20`,
   `Przed biegiem: ${before}.<br>Ty: OVR ${overall()} • ${rivals.map(r=>`${r.label}: OVR ${r.rating}`).join(" • ")}.${raceAdviceText(rivals,"start",null,startContext)}`,options);
 };

 function startNational(mode,prob,c,entrants,rivals,target){
  const resolved=resolveRaceDecision(mode,{phase:"start",rivals,context:c,position:2,probOverride:prob});
  showOutcomeRoller({title:"Start i pierwszy łuk",subtitle:`<p>${resolved.narrative}</p>`,mode,prob,outcome:resolved.outcome,onDone:()=>{
   c.tacticalBonus=decisionTacticalBonus(mode,rivals,"start",null,c);
   let snap=raceStartSnapshot(mode,entrants,c);snap=ensureStartSnapshotPosition(snap,resolved.targetPosition);updateRaceState(c,2,snap.position,resolved.outcome,mode);
   maybeShiftTrackConditions(c,"distance");const dc=mentorAdviceContext(rivals,"distance",null,c);dc.raceState=c.raceState;dc.trackShift=c.trackShift;dc.trackShiftChecked=true;
   const choices=distanceChoices(snap,{teamRace:false}).map(opt=>{
    const p=raceOutcomeProbabilities(opt.key,{phase:"distance",rivals,context:dc,position:snap.position});
    return {title:opt.title,desc:opt.desc,prob:p,action:()=>middleNational(opt.key,p,dc,snap,entrants,rivals,target)};
   });
   showModal("PIERWSZE OKRĄŻENIE",`Jedziesz ${snap.position}.`,`${raceSituationNarrative(snap)}${currentRaceAdvice(rivals,"distance",null,dc)}`,choices);
  }});
 }

 function middleNational(mode,prob,c,snap,entrants,rivals,target){
  const resolved=resolveRaceDecision(mode,{phase:"distance",rivals,context:c,position:snap.position,probOverride:prob});
  showOutcomeRoller({title:"Środek biegu",subtitle:`<p>${resolved.narrative}</p>`,mode,prob,outcome:resolved.outcome,onDone:()=>{
   let preview=finishRaceFromSnapshot(snap,mode,{teamRace:false,rivals,context:c,preview:true,suppressIncident:true});
   preview=ensurePlayerResultPosition(preview,resolved.targetPosition);updateRaceState(c,snap.position,preview.position,resolved.outcome,mode);
   const lc=mentorAdviceContext(rivals,"late",null,c);lc.raceState=c.raceState;lc.trackShift=c.trackShift;lc.order=preview.order||preview.scores||[];
   const choices=raceDecisionChoices({...preview,context:lc},{teamRace:false,phase:"late"}).map(opt=>{
    const p=raceOutcomeProbabilities(opt.key,{phase:"late",rivals,context:lc,position:preview.position});
    return {title:opt.title,desc:opt.desc,prob:p,action:()=>finishNational(opt.key,p,lc,snap,entrants,rivals,target,preview.position)};
   });
   showModal("KOŃCÓWKA BIEGU",`Jedziesz ${preview.position}.`,`${contextualRaceNarrative(mode,resolved.outcome,snap.position,preview.position,c)}${currentRaceAdvice(rivals,"late",null,lc)}`,choices);
  }});
 }

 function finishNational(mode,prob,c,snap,entrants,rivals,target,position){
  const resolved=resolveRaceDecision(mode,{phase:"late",rivals,context:c,position,probOverride:prob});
  showOutcomeRoller({title:"Końcówka biegu",subtitle:`<p>${resolved.narrative}</p>`,mode,prob,outcome:resolved.outcome,onDone:()=>{
   let out=finishRaceFromSnapshot(snap,mode,{teamRace:false,rivals,context:c,suppressIncident:true});
   out=ensurePlayerResultPosition(out,resolved.targetPosition);
   let order=out.scores;
   if(resolved.incident&&resolved.targetPosition===4){
    order=entrants.filter(r=>!r.player).map(r=>({...r,finalScore:r.rating+rand(-10,10)})).sort((a,b)=>b.finalScore-a.finalScore);
    order.push({...entrants.find(r=>r.player),finalScore:-999});
   }
   applyNationalHeatScores(scores,order);
   const pts=[3,2,1,0][order.findIndex(r=>r.player)];
   playerPoints+=pts;playerResults.push(pts);nextHeat=target+1;playerIndex++;
   showModal("WYNIK BIEGU",`${order.findIndex(r=>r.player)+1}. miejsce — ${pts} pkt`,
    `Po ${target}. biegu: ${nationalStandingsText(scores)}.<br><b>Twój dorobek:</b> ${playerResults.join(", ")} — ${playerPoints} pkt. ${contextualRaceNarrative(mode,resolved.outcome,position,order.findIndex(r=>r.player)+1,c)}`,
    [{title:"Kontynuuj zawody",desc:"Przejdź do kolejnych biegów.",action:()=>{closeModal();simulateToPlayerHeat()}}]);
  }});
 }
 simulateToPlayerHeat();
}
function teamChampionshipResult(name,basePph,fieldMean,{junior=false,world=false}={}){
 const event={name,fieldMean,junior,world};
 if(!junior)return simulateNationalFourTeamEvent(event);
 const power=nationalTeamPower(basePph),riderHeats=5,riderPoints=simulatedRoundScore(power,fieldMean,riderHeats);
 const place=ordinalPlaceByScore(fieldMean*.25+riderPoints*1.6+rand(28,48),Array.from({length:7},()=>fieldMean*.28+rand(35,58)));
 const medal=place===1?"złoty medal":place===2?"srebrny medal":place===3?"brązowy medal":`${place}. miejsce`,result=`${medal}; ${riderPoints} pkt w ${riderHeats} biegach`;
 S.national="Polska";S.teamCaps=(S.teamCaps||0)+1;if(place<=3)S.nationalMedals=(S.nationalMedals||0)+1;
 addHistory(name,`Powołanie do reprezentacji Polski. ${result}.`);
 return {name,key:name,stage:"reprezentacja U21",result,points:riderPoints,place};
}
function simulateNationalTeamCompetitions(basePph){
 const power=nationalTeamPower(basePph);if(!S.pendingTeamCompetitions)S.pendingTeamCompetitions=[];
 const juniorEligible=S.age<=21&&overall()>=62&&basePph>=1.35,seniorEligible=S.age>=18&&overall()>=74&&basePph>=1.55&&S.reputation>=18;
 if(juniorEligible&&Math.random()*100<clamp(28+(power-65)*2,12,88))S.pendingTeamCompetitions.push({name:"Drużynowe Mistrzostwa Świata Juniorów",fieldMean:75,junior:true});
 if(seniorEligible&&Math.random()*100<clamp(10+(power-78)*1.35,4,62))S.pendingTeamCompetitions.push({name:"Drużynowe Mistrzostwa Europy",fieldMean:83,world:false});
 const worldCupYear=(S.year-2027)%3===0;
 if(worldCupYear&&overall()>=82&&basePph>=1.75&&S.reputation>=32&&Math.random()*100<clamp(8+(power-86)*1.5,3,58))S.pendingTeamCompetitions.push({name:"Drużynowy Puchar Świata",fieldMean:89,world:true});
 return [];
}
function playTeamCompetitionQueue(basePph,next){
 const queue=[...(S.pendingTeamCompetitions||[])];S.pendingTeamCompetitions=[];
 const proceed=()=>{
  if(!queue.length){next();return}
  const event=queue.shift(),ageText=event.junior?"Reprezentacja U21":"Reprezentacja Polski";
  showModal("POWOŁANIE DO REPREZENTACJI",event.name,`${ageText}. Czwórmecz: Polska i trzy silne reprezentacje, 20 biegów. Standardowo pojedziesz pięć razy.`,[
   {title:"Rozegraj moje 5 biegów",desc:"Każdy twój start będzie interaktywny.",action:()=>{
    closeModal();playInteractiveNationalFourTeamEvent(event,r=>{S.competitions.push(r);renderCompetitions();save();showCompetitionResult(r,proceed)});
   }},
   {title:"Symuluj całe zawody",desc:"Gra policzy wszystkie 20 biegów bez ręcznych decyzji.",action:()=>{
    closeModal();const r=simulateNationalFourTeamEvent(event);S.competitions.push(r);renderCompetitions();save();showCompetitionResult(r,proceed);
   }}
  ]);
 };
 proceed();
}

function simulateCompetitions(basePph){
 const results=[];
 const dmpj=simulateDMPJ(basePph);if(dmpj)results.push(dmpj);
 results.push(...simulateNationalTeamCompetitions(basePph));
 results.push(...simulateIndividualCompetitions(basePph));
 S.competitions=results;
 return results;
}
function competitionsSummary(results){
 if(!results.length)return "Bez dodatkowych startów indywidualnych.";
 return results.map(r=>`${r.name}: ${ensureSentence(r.result)}${r.points!==undefined?` (${r.points} pkt)`:""}`).join(" • ");
}

function currentSeasonAlreadySettled(){
 return S.seasonResolution?.year===S.year&&S.seasonResolution?.status==="settled";
}
function markSeasonSettled(pph){
 S.seasonResolution={year:S.year,status:"settled",pph:Number(pph)||0};S.seasonRecoveryCount=0;S.seasonRecoveryYear=null;clearSeasonFlowStage();
 save();
}
function clearSeasonResolution(){
 S.seasonResolution=null;
}
function resumeSettledSeason(){
 const pph=S.seasonResolution?.pph||S.season?.avg||0;
 addHistory("Wznowienie sezonu","Gra wznawia etap kontraktowy bez ponownego naliczania kosztów, zarobków ani punktów rozwoju.");
 S.seasonResolution.status="contract";
 save();
 worldClubEvent(()=>resolveContractAfterSeason(pph));
}
function repairLegacyStuckSeason(){
 if(S.v108RepairApplied)return;
 const currentRecord=(S.careerStats?.seasons||[]).find(season=>season.year===S.year);
 if(currentRecord&&!S.retired){
  S.seasonResolution={year:S.year,status:"settled",pph:Number(currentRecord.average)||S.season?.avg||0};
  // Charakterystyczny limit długu -300 000 zł był skutkiem wielokrotnego rozliczania tego samego sezonu.
  if(S.budget<=-300000&&S.season?.earnings===0){
   S.budget=-50000;
   addHistory("Korekta błędnego zadłużenia","Usunięto część długu naliczonego przez powtarzające się rozliczenie zawieszonego sezonu.");
  }
 }
 S.v108RepairApplied=true;
}


function expectedClubSeasonMatches(regularPos,leagueName,finalStage=""){
 const level=leagueByName(leagueName)?.level||3;
 if(level===3)return regularPos<=4?18:14;
 if(regularPos<=4)return 18;
 if(regularPos===5||regularPos===6)return 16;
 if(regularPos===7)return 18;
 if(regularPos===8)return level===1?20:18;
 return 16;
}
function riderRoleHeatsPerMatch(){
 const role=String(S.role||"").toLowerCase(),status=rosterStatusForAge();
 if(role.includes("lider")||S.chance>=88)return {min:4.6,max:5.2};
 if(role.includes("podstawowy")){
  if(status==="junior")return {min:3.4,max:4.5};
  if(status==="u24")return {min:3.8,max:4.7};
  return {min:4.1,max:4.8};
 }
 if(status==="junior")return S.chance>=70?{min:3.3,max:4.3}:{min:2.6,max:3.5};
 if(role.includes("u24"))return {min:3.0,max:4.1};
 if(role.includes("rotacja"))return {min:2.9,max:3.9};
 return {min:3.4,max:4.3};
}
function realisticLeagueUsage(clubMatches){
 const chance=clamp(S.chance||50,5,98);
 let apps=Math.round(clubMatches*clamp(.42+chance/155,.20,.99));
 if(chance>=80)apps=Math.max(apps,clubMatches-1);if(chance>=90)apps=clubMatches;
 apps=Math.round(apps*currentInjuryAvailability());apps=clamp(apps,0,clubMatches);
 const range=riderRoleHeatsPerMatch();let heats=0;
 for(let i=0;i<apps;i++){
  let h=range.min+Math.random()*(range.max-range.min);
  if(rosterStatusForAge()!=="junior"&&Math.random()<.14)h+=.7;
  if(rosterStatusForAge()!=="junior"&&Math.random()<.04)h+=.8;
  if(rosterStatusForAge()==="junior"&&Math.random()<.06)h+=.6;
  heats+=clamp(Math.round(h),1,6);
 }
 return {appearances:apps,heats};
}

function simulateSeason(){
 if(currentSeasonAlreadySettled()){resumeSettledSeason();return}
 const academy=S.league==="Etap szkolenia",difficulty=S.difficulty==="hard"?7:S.difficulty==="easy"?-5:0;
 if(academy){
  S.licenseAttempts=S.licenseAttempts||0;
  const forcedPass=S.licenseAttempts>=3;
  const chance=forcedPass?100:clamp(38+(overall()-40)*3.2+S.professionalism*.28-difficulty+S.licenseAttempts*12,18,94);
  const passed=forcedPass||Math.random()*100<chance;
  if(passed){
   const attempts=S.licenseAttempts+1;
   S.club=S.academyClub||"Cellfast Wilki Krosno";
   S.league=clubLeagueName(S.club)||"Krajowa Liga Żużlowa";
   S.role="Rezerwowy junior";
   S.chance=projectedLineupChance(S.club,S.league,{role:"Rezerwowy junior"});
   S.salary=1600;
   S.contractYears=drawContractYears({young:true});
   S.licenseAttempts=0;
   addHistory("Licencja Ż",`Zdajesz egzamin za ${attempts}. podejściem i podpisujesz ${contractYearLabel(S.contractYears)} kontrakt z ${clubDisplayName(S.club)}.`);
   showModal("LICENCJA Ż","Egzamin zdany",`Po ${attempts}. podejściu otrzymujesz licencję. Trafiasz do ${clubDisplayName(S.club)} jako rezerwowy junior.`,[
    {title:"Przejdź do pierwszego sezonu ligowego",desc:"Licencja zostaje zapisana. Debiutancki sezon rozpoczniesz przyciskiem „Rozegraj sezon”.",action:()=>{
     closeModal();
     S.seasonFlowActive=false;
     S.preseasonCompletedYear=null;
     S.budgetManagementCompletedYear=null;
     normalize();
     save();
     render();
    }}
   ]);
   return;
  }

  S.licenseAttempts++;
  S.season={matches:0,heats:0,points:0,bonus:0,wins:0,earnings:0,avg:0};
  S.competitions=[];
  S.devPoints+=2;
  S.professionalism+=1;
  S.morale=Math.max(0,S.morale-3);
  addHistory("Nieudana próba licencyjna",`Nie zdajesz egzaminu za ${S.licenseAttempts}. podejściem. Kolejna próba będzie łatwiejsza.`);
  const nextChance=S.licenseAttempts>=3?100:clamp(38+(overall()-40)*3.2+S.professionalism*.28-difficulty+S.licenseAttempts*12,18,94);
  showModal("LICENCJA Ż","Tym razem się nie udało",`To była ${S.licenseAttempts}. nieudana próba. Otrzymujesz 2 pkt rozwoju, a szansa przy kolejnym podejściu wyniesie około ${Math.round(nextChance)}%. Po trzech niepowodzeniach następna próba zakończy się zdaniem egzaminu.`,[
   {title:"Przejdź do kolejnego roku",desc:"Zakończ sezon szkoleniowy i przygotuj się do następnej próby.",action:()=>{
    closeModal();
    S.seasonFlowActive=false;
    finishSeason(false);
   }}
  ]);
  return;
 }
 const l=leagueByName(S.league);
 announceCareerPhase();
 if(!l){
  throw new Error(`Nie znaleziono ligi „${S.league}” dla klubu „${S.club}”.`);
 }
 let playChance=clamp(
  projectedLineupChance(S.club,S.league,{stay:true,role:S.role,form:currentFormRating()})-difficulty,
  5,97
 );
 let matches=clamp(Math.round((effectiveLeagueTeams(l).length-1)*2*playChance/100+rand(-1,2)),0,(effectiveLeagueTeams(l).length-1)*2);
 matches=Math.round(matches*currentInjuryAvailability());
 let heats=matches*rand(3,5);
 const track=homeTrackImpact();
 const leagueDifficulty=l.level===1?5:l.level===2?1:-1;
 const eliteScore=skillAverage()*.68+S.equipment*.12+S.morale*.07+S.professionalism*.05+track.value-difficulty-leagueDifficulty;
 const normalizedElite=clamp((eliteScore-42)/56,0,1);
 let pph=clamp(.55+normalizedElite*2.18+careerPerformanceModifier()+rand(-3,3)/100,.12,2.88);
 if(overall()>=95&&S.equipment>=92)pph=clamp(pph+0.08,2.35,2.88);
 pph=Math.min(pph,lateCareerPphCap());
 let bonusRate=clamp((pph-1.15)*.16+.035,.02,.25);
 let points=Math.max(0,Math.round(heats*pph/(1+bonusRate)));
 let bonus=Math.max(0,Math.round(points*bonusRate));
 let wins=Math.max(0,Math.round(heats*Math.max(0,pph-1.05)/2.45));
 let healthExposure={injuries:[],weeks:0,matchesMissed:0};
 let injured=false;

 const regularTable=generateTable();
 if(!regularTable||!regularTable.rows?.length){
  throw new Error("Nie udało się wygenerować tabeli ligowej.");
 }
 const clubMatches=expectedClubSeasonMatches(regularTable.pos,S.league);
 let usage;
 try{usage=realisticLeagueUsage(clubMatches)}
 catch(usageError){console.error("Fallback programu meczowego:",usageError);usage={appearances:matches,heats:matches*4}}
 matches=usage.appearances;
 heats=usage.heats;
 // Ekspozycja zdrowotna jest liczona od rzeczywistego programu biegów, niezależnie od tego,
 // czy kluczowe biegi gracz rozgrywa ręcznie. Dzięki temu tryb interaktywny nie dokłada drugiego ryzyka.
 healthExposure=racingInjuryFromExposure(heats,{context:`sezon ligowy — ${S.league}`,maxInjuries:2});
 injured=healthExposure.injuries.length>0;
 if(injured&&matches){
  const lost=clamp(healthExposure.matchesMissed,0,Math.max(0,matches-1)),beforeMatches=matches;
  matches=Math.max(0,matches-lost);const ratio=beforeMatches?matches/beforeMatches:1;
  heats=Math.max(0,Math.round(heats*ratio));
  S.budget-=S.age<=21?rand(500,3500)*healthExposure.injuries.length:rand(1500,9000)*healthExposure.injuries.length;
  S.morale-=Math.min(8,healthExposure.injuries.length*3);
 }
 points=Math.max(0,Math.round(heats*pph/(1+bonusRate)));
 bonus=Math.max(0,Math.round(points*bonusRate));
 wins=Math.max(0,Math.round(heats*Math.max(0,pph-1.05)/2.45));
 const afterKeyHeat=(heatResult={place:null,boost:0,strategy:"brak"})=>{
  if(heatResult.place){
   const heatPts=4-heatResult.place;
   points+=heatPts;heats++;if(heatResult.place===1)wins++;
   S.morale+=heatResult.place===1?5:heatResult.place===4?-3:1;
   addHistory("Kluczowy bieg fazy finałowej",`${heatResult.strategy}. Zajmujesz ${heatResult.place}. miejsce i zdobywasz ${heatPts} pkt.`);
  }
  const pressureBoost=Math.round(careerPerformanceModifier({important:true})*10);const playoffs=simulatePlayoffs(regularTable,(heatResult.boost||0)+pressureBoost);
  const finalIndex=playoffs.finalOrder.findIndex(name=>clubBaseName(name)===clubBaseName(S.club));
  const finalPos=finalIndex>=0?finalIndex+1:regularTable.pos;
  regularTable.rows.forEach(r=>r.finalPosition=playoffs.finalOrder.indexOf(r.name)+1);
  regularTable.rows.forEach(r=>{
   S.clubMeta[r.name]??={};
   S.clubMeta[r.name].lastPosition=r.finalPosition;
   S.clubMeta[r.name].lastLeague=regularTable.league;
   S.clubMeta[r.name].lastSeasonYear=S.year;
  });
  const sponsorIncome=sponsorFacilityIncome();
  const grossEarnings=Math.round((points+bonus)*S.salary+matches*500+S.signingFee+sponsorIncome);
  const internationalCount=(S.competitions||[]).filter(c=>/Grand Prix|SEC|Świata|Europy/.test(c.name)).length;
  const finance=settleSeasonFinances(grossEarnings,heats,internationalCount);S.seasonServiceSurcharge=0;
  const costs=finance.playerPaid,earnings=finance.net;
  if(S.signingFee>0)S.contractPreparationFee=S.signingFee;
  S.signingFee=0;
  S.budget+=earnings;
  if(finance.rescue>0)addHistory("Wsparcie finansowe klubu",`Klub pokrywa dodatkowo ${money(finance.rescue)}, aby ograniczyć zadłużenie zawodnika.`);
  S.totals.matches+=matches;S.totals.heats+=heats;S.totals.points+=points;S.totals.bonus+=bonus;S.totals.earnings+=earnings;
  S.season={matches,heats,points,bonus,wins,earnings,avg:heats?(points+bonus)/heats:0};
  const grade=pph>=2.25?"wybitny":pph>=1.85?"bardzo dobry":pph>=1.45?"dobry":pph>=.95?"przeciętny":"słaby";
  const leaguePrestige=l.level===1?5:l.level===2?3:1;
  const seasonRep=pph>=2.25?10:pph>=1.85?7:pph>=1.45?4:pph>=.95?1:-2;
  const participationRep=matches>=10?2:matches>=5?1:0;
  S.reputation+=seasonRep+(matches>=10?leaguePrestige:0)+(wins>=8?2:0)+participationRep;
  // Morale może spaść do zera, ale dobry sezon, regularna jazda i odpoczynek pozwalają je odbudować.
  const moraleRecovery=S.morale<20&&matches>=5?4:0;
  S.morale+=(50-S.morale)*.16+(pph>=1.85?8:pph>=1.45?5:pph>=.95?1:-6)+(matches>=8?2:-2)+moraleRecovery;
  // Szansa na skład jest przeliczana relatywnie do poziomu klubu, nie kumulowana bez końca.
  S.chance=projectedLineupChance(S.club,S.league,{stay:true,role:S.role,form:currentFormRating()})+(pph-1.35)*5+rand(-2,2)-statusTransitionMarketBias(S.league,S.age+1);
  const ridingDevelopment=Math.min(4,Math.floor(heats/18));
  const juniorFactor=S.age<=21?careerDNA().juniorGift:1;
  const devBase=Math.round(matches/7+ridingDevelopment+(S.age<22?2.5:1)+S.professionalism/55);
  const phaseNow=careerPhaseState();
  const devPhase=phaseNow.type==="breakthrough"?1.55:phaseNow.type==="surge"?1.25:phaseNow.type==="secondWind"?1.30:phaseNow.type==="stagnation"?.62:phaseNow.type==="slump"?.48:phaseNow.type==="recovery"?.70:1;
  const dev=Math.max(0,Math.round(devBase*difficultyGrowthMultiplier()*careerDNA().growthRate*juniorFactor*devPhase));S.devPoints+=dev;
  if(phaseNow.type==="breakthrough")S.devPoints+=rand(1,3);
  else if(phaseNow.type==="secondWind")S.devPoints+=rand(1,2);
  const dnaNow=careerDNA(),prePeak=S.age<=dnaNow.peakAge+1,trajectoryGap=careerCurveTargetOverall()-overall();
  const catchup=prePeak&&trajectoryGap>=8&&heats>=24?2:prePeak&&trajectoryGap>=4&&heats>=18?1:0;
  const postPeakPenalty=S.age>dnaNow.peakAge+2?Math.min(2,Math.floor((S.age-dnaNow.peakAge-1)/4)):0;
  const phaseAttempts=phaseNow.type==="breakthrough"?rand(2,4):phaseNow.type==="surge"?rand(1,2):phaseNow.type==="secondWind"?rand(1,3):phaseNow.type==="stagnation"?-1:phaseNow.type==="slump"?-2:0;
  const autoAttempts=Math.max(0,(S.age<22?rand(1,3)+(heats>=35?1:0):S.age<30?rand(0,2):rand(0,1))+Math.floor(heats/35)+catchup-postPeakPenalty+phaseAttempts+(S.age<=21&&dnaNow.juniorPhenomenon&&Math.random()<.55?1:0));
  for(let i=0;i<autoAttempts;i++){const k=pick(Object.keys(S.skills));tryNaturalGrowth(k,pph>=2.15?2:1)}
  if(phaseNow.type==="slump"&&Math.random()<.65){const keys=Object.keys(S.skills).filter(k=>S.skills[k]>45);for(let i=0;i<rand(1,2);i++){const k=pick(keys);if(k)S.skills[k]-=1}}
  S.careerPoints+=Math.round(points+bonus+wins*2+(pph>=2?20:0));
  updateCareerTrajectory({pph,matches,heats,injured});
  S.careerStats.bestOverall=Math.max(S.careerStats.bestOverall||0,overall());
  S.careerStats.clubs[S.club]=(S.careerStats.clubs[S.club]||0)+1;
  const seasonAvg=heats?(points+bonus)/heats:0;
  if(!S.careerStats.bestSeason||seasonAvg>S.careerStats.bestSeason.avg)S.careerStats.bestSeason={year:S.year,club:S.club,clubDisplay:clubDisplayNameForSeason(S.club,S.year),avg:seasonAvg,points,bonus,matches};
  S.value=Math.max(30000,Math.round(overall()**2*150+S.reputation*15000+pph*240000));
  captureSeasonClubNameSnapshot(S.year);
  S.table=regularTable.rows.map(r=>({...r,displayName:clubDisplayNameForSeason(r.name,S.year)}));
  S.tableLeague=regularTable.league;S.tableClub=regularTable.club;S.tableSeasonYear=S.year;
  S.tableAudit={smallBalance:regularTable.smallBalance,leaguePoints:regularTable.leaguePoints,expectedPoints:regularTable.expectedPoints};
  S.playoffSummary=playoffs.summary;
  const foreignM2EChampion=l.level===2&&finalPos===1&&isForeignPolishLeagueClub(S.club);
  const seasonOutcome=foreignM2EChampion?"utrzymanie":playoffs.outcome;
  const seasonStage=foreignM2EChampion?"mistrzostwo M2E — brak prawa awansu do PGE Ekstraligi":playoffs.userStage;
  S.finish={position:finalPos,outcome:seasonOutcome,regularPosition:regularTable.pos,stage:seasonStage};
  const competitions=simulateCompetitions(pph);
  markSeasonSettled(pph);
  const teamText=foreignM2EChampion?"Drużyna wygrała M2E, ale jako klub zagraniczny pozostaje na tym poziomie.":seasonOutcome==="awans"?"Drużyna wywalczyła awans.":seasonOutcome==="spadek"?"Drużyna spadła z ligi.":`Po fazie finałowej drużyna zajęła ${finalPos}. miejsce.`;
  addHistory(`${S.club}: ${points}+${bonus} pkt`,`${matches} meczów • ${heats} biegów • średnia ${avg(points,bonus,heats)} • sezon ${grade}. Faza zasadnicza: ${regularTable.pos}. miejsce. ${teamText}${injured?" Sezon zakłóciła kontuzja.":""}`);
  $("newsBox").innerHTML=`<p class="eyebrow">KONIEC SEZONU</p><h3>${grade.toUpperCase()} SEZON</h3><p>${matches} meczów, ${points}+${bonus} punktów, średnia ${avg(points,bonus,heats)}. ${teamText}</p>`;
  appendGuidanceToSeasonSummary();
  const nextAge=S.age+1;
  if(nextAge===22||nextAge===25){
   const label=nextAge===22?"Przejście junior → U24":"Przejście U24 → senior";
   const currentLevel=leagueByName(S.league)?.level||3;
   const relief=exceptionalRetentionScore()>=78;
   $("resultBox").dataset.transitionNote=`${label}: ${relief?"twoje wyniki dają dużą szansę utrzymania poziomu":"rynek może wymusić zejście ligę niżej, szczególnie przy wysokiej konkurencji w składzie"}.`;
  }
  $("resultBox").classList.remove("hidden");$("resultBox").innerHTML=`<h3>${money(earnings)} bilansu sezonu</h3><b>Przychód brutto:</b> ${money(grossEarnings)}${sponsorIncome?` (w tym biuro sponsorskie: ${money(sponsorIncome)})`:""} • <b>twój udział w kosztach:</b> ${money(costs)} • <b>pokrywa klub:</b> ${money(finance.clubPaid)}<br><b>Atut toru domowego (${track.city}):</b> ${track.text}<br>${majorCalendarNoticeHtml()}<br><b>Forma sezonowa:</b> ${ensureFormState().seasonLabel}<br><b>Faza zasadnicza:</b> ${regularTable.pos}. miejsce • <b>faza finałowa:</b> ${seasonStage} • <b>końcowe miejsce:</b> ${finalPos}.<br><b>Dodatkowe rozgrywki:</b> ${competitionsSummary(competitions)}<br>${injured?`<b>Zdrowie:</b> ${healthExposure.injuries.map(x=>`${x.name}${x.weeks?` (${x.weeks} tyg.)`:""}`).join(", ")}.`:"<b>Zdrowie:</b> sezon bez urazu wymagającego odnotowania."}`;
  const playedLeague=regularTable.league;
  const rotation=rotateLeagueSystem(regularTable,playoffs);
  if(rotation?.barrageTie&&[1,2].includes(leagueByName(playedLeague)?.level)){
   const bt=rotation.barrageTie;
   const barrageLine=`Baraż o PGE Ekstraligę: ${bt.teamA} – ${bt.teamB} ${bt.totalA}:${bt.totalB}${bt.tied?" — rozstrzygnięcie regulaminowe":""}`;
   if(!S.playoffSummary.includes(barrageLine))S.playoffSummary.push(barrageLine);
  }
  S.playedPostseasonTie=null;
  normalize();
  recordSeasonHistory({
   year:S.year,age:S.age,overallValue:overall(),club:S.club,league:playedLeague,
   matches,heats,points,bonus,average:seasonAvg,regularPosition:regularTable.pos,
   finalPosition:finalPos,outcome:seasonOutcome,stage:seasonStage,competitions:S.competitions
  });
  save();
  playTeamCompetitionQueue(pph,()=>playMajorCompetitionQueue(pph,()=>{
   $("resultBox").innerHTML=$("resultBox").innerHTML.replace(/<b>Dodatkowe rozgrywki:<\/b>.*?<br>/,`<b>Dodatkowe rozgrywki:</b> ${competitionsSummary(S.competitions)}<br>`);
   recordSeasonHistory({
    year:S.year,age:S.age,overallValue:overall(),club:S.club,league:playedLeague,
    matches,heats,points,bonus,average:seasonAvg,regularPosition:regularTable.pos,
    finalPosition:finalPos,outcome:seasonOutcome,stage:seasonStage,competitions:S.competitions
   });
   if(S.seasonResolution&&S.seasonResolution.year===S.year)S.seasonResolution.status="contract";
   save();
   const leagueAchievement=seasonOutcome==="awans"
    ?{kind:"AWANS!",title:`${S.club} — wyższa liga`,subtitle:`Sezon kończy się awansem z ${playedLeague}.`}
    :(playedLeague==="PGE Ekstraliga"&&finalPos<=3?{kind:"PODIUM LIGI",title:`${finalPos}. miejsce w PGE Ekstralidze`,subtitle:"Sezon zakończony medalową pozycją."}:null);
   const continueToMarket=()=>postSeasonHealthGate(()=>worldClubEvent(()=>resolveContractAfterSeason(pph)));
   if(leagueAchievement){
    showAchievementCelebration(leagueAchievement.kind,leagueAchievement.title,leagueAchievement.subtitle,continueToMarket);
   }else continueToMarket();
  }));
 };
 offerPlayableMatch(regularTable,matchResult=>{
  if(matchResult?.points||matchResult?.rides){
   points+=matchResult.points||0;
   bonus+=matchResult.bonus||0;
   heats+=matchResult.rides||0;
   wins+=Math.max(0,Math.round((matchResult.points||0)/6));
  }
  afterKeyHeat({place:null,boost:matchResult?.boost||0,strategy:matchResult?.played?"rozegrany pełny mecz":"symulacja ważnego meczu"});
 });
}
function leagueSeasonLabel(record){
 const place=record.finalPosition||record.regularPosition||"—";
 const promotion=record.outcome==="awans"?" ⬆️ awans":"";
 const relegation=record.outcome==="spadek"?" ⬇️ spadek":"";
 if(record.league==="PGE Ekstraliga"){
  const medal=place===1?"🥇 ":place===2?"🥈 ":place===3?"🥉 ":"";
  return `${medal}${place}. miejsce${relegation}`;
 }
 return `${place}. miejsce${promotion}${relegation}`;
}
function canonicalCompetitionKey(entry){
 const name=entry.key||entry.name||"";
 if(name==="IMP Wild Card"||/IMP.*dzika karta/i.test(name))return "IMP Wild Card";
 if(name==="Speedway Grand Prix"||/Mistrzostwa Świata/.test(name))return "SGP";
 if(name==="SEC"||/Euro Championship/.test(name))return "SEC";
 if(name==="IMP"||/Indywidualne Mistrzostwa Polski$/.test(name))return "IMP";
 if(/Młodzieżowe Indywidualne Mistrzostwa Polski/.test(name))return "MIMP";
 if(name==="SGP2"||/Mistrzostwa Świata Juniorów — SGP2/.test(name))return "SGP2";
 if(/Drużynowe Mistrzostwa Polski Juniorów/.test(name))return "DMPJ";
 if(/Drużynowy Puchar Świata/.test(name))return "DPŚ";
 if(/Drużynowe Mistrzostwa Europy/.test(name))return "DME";
 if(/Drużynowe Mistrzostwa Świata Juniorów/.test(name))return "DMŚJ";
 if(/Grand Prix Challenge/.test(name))return "GP Challenge";
 return name;
}
function archiveCompetitionResults(year,entries){
 if(!S.careerStats.competitionArchive)S.careerStats.competitionArchive=[];
 for(const entry of entries||[]){
  const place=Number.isFinite(entry.place)?entry.place:null;
  const record={
   year,key:canonicalCompetitionKey(entry),name:entry.name,place,result:entry.result||"",
   points:entry.points??null,stage:entry.stage||"",qualification:entry.qualification||"",
   average:Number.isFinite(entry.average)?entry.average:null,heats:Number.isFinite(entry.heats)?entry.heats:null
  };
  const duplicate=S.careerStats.competitionArchive.findIndex(existing=>existing.year===record.year&&existing.key===record.key&&existing.name===record.name);
  if(duplicate>=0)S.careerStats.competitionArchive[duplicate]=record;
  else S.careerStats.competitionArchive.push(record);
 }
}
function recordSeasonHistory({year,age,overallValue,club,league,matches,heats,points,bonus,average,regularPosition,finalPosition,outcome,stage,competitions}){
 if(!S.careerStats.seasons)S.careerStats.seasons=[];
 const existing=S.careerStats.seasons.findIndex(season=>season.year===year),base=clubBaseName(club);
 const record={
  year,age,overall:overallValue,club:clubDisplayNameForSeason(base,year),clubBase:base,league,
  matches,heats,points,bonus,average,regularPosition,finalPosition,outcome,stage
 };
 if(existing>=0)S.careerStats.seasons[existing]=record;
 else S.careerStats.seasons.push(record);
 archiveCompetitionResults(year,competitions);
}
function championshipName(key){
 return {
  SGP:"Indywidualne Mistrzostwa Świata",
  SEC:"Speedway Euro Championship",
  IMP:"Indywidualne Mistrzostwa Polski",
  "IMP Wild Card":"Indywidualne Mistrzostwa Polski — dzika karta",
  MIMP:"Młodzieżowe Indywidualne Mistrzostwa Polski",
  SGP2:"Indywidualne Mistrzostwa Świata Juniorów — SGP2",
  DMPJ:"Drużynowe Mistrzostwa Polski Juniorów",
  "DPŚ":"Drużynowy Puchar Świata",
  DME:"Drużynowe Mistrzostwa Europy",
  "DMŚJ":"Drużynowe Mistrzostwa Świata Juniorów",
  "GP Challenge":"Grand Prix Challenge"
 }[key]||key;
}
function championshipSummaryData(){
 const archive=S.careerStats?.competitionArchive||[],grouped={};
 for(const result of archive){if(!result.key)continue;(grouped[result.key]||=[]).push(result)}
 return Object.entries(grouped).map(([key,results])=>{
  const placed=results.filter(result=>Number.isFinite(result.place));
  const latestQualification=[...results].sort((a,b)=>b.year-a.year).find(result=>result.qualification)?.qualification||"";
  const averages=results.filter(r=>Number.isFinite(r.average)).map(r=>r.average);
  const bestAverage=averages.length?Math.max(...averages):null;
  if(!placed.length)return {key,name:championshipName(key),appearances:results.length,medals:[],best:null,latestQualification,bestAverage};
  const medals=placed.filter(result=>result.place<=3),bestPlace=Math.min(...placed.map(result=>result.place)),best=placed.filter(result=>result.place===bestPlace);
  return {key,name:championshipName(key),appearances:results.length,medals,best:{place:bestPlace,years:best.map(result=>result.year)},latestQualification,bestAverage};
 }).sort((a,b)=>{
  const priority=["SGP","SGP2","SEC","IMP","IMP Wild Card","MIMP","DPŚ","DME","DMŚJ","DMPJ","GP Challenge"];
  const ai=priority.indexOf(a.key),bi=priority.indexOf(b.key);
  return (ai<0?999:ai)-(bi<0?999:bi);
 });
}
function medalBreakdown(results){
 const years=place=>results.filter(result=>result.place===place).map(result=>result.year);
 const parts=[];
 const gold=years(1),silver=years(2),bronze=years(3);
 if(gold.length)parts.push(`🥇 ${gold.length} (${gold.join(", ")})`);
 if(silver.length)parts.push(`🥈 ${silver.length} (${silver.join(", ")})`);
 if(bronze.length)parts.push(`🥉 ${bronze.length} (${bronze.join(", ")})`);
 return parts.join(" • ");
}
function competitionCategory(key){
 if(["SGP","SGP2","SEC","IMP","IMP Wild Card","MIMP","DPŚ","DME","DMŚJ","DMPJ"].includes(key))return "championship";
 if(["GP Challenge","SEC Challenge"].includes(key))return "qualifying";
 return "prestige";
}
function championshipRowsHtml(items){
 if(!items.length)return `<p class="muted">Brak zapisanych startów.</p>`;
 return `<div class="championship-summary">${items.map(item=>{
  const medalText=medalBreakdown(item.medals);
  const bestText=item.best?`Najwyższe miejsce: ${item.best.place}. — ${item.best.years.join(", ")}`:
   item.key==="DMPJ"&&item.bestAverage!==null?`Najlepsza średnia biegopunktowa w cyklu: ${item.bestAverage.toFixed(3).replace(".",",")}`:"Brak sklasyfikowanego wyniku";
  return `<div class="championship-summary-row"><strong>${item.name}</strong><span>${medalText||bestText}</span><small>Starty: ${item.appearances}${medalText?` • ${bestText}`:""}${item.latestQualification?` • ostatnio: ${item.latestQualification}`:""}</small></div>`;
 }).join("")}</div>`;
}
function championshipSummaryHtml(){
 const data=championshipSummaryData();
 if(!data.length)return `<p class="muted">Brak zapisanych startów w dodatkowych rozgrywkach.</p>`;
 const championships=data.filter(item=>competitionCategory(item.key)==="championship");
 const qualifying=data.filter(item=>competitionCategory(item.key)==="qualifying");
 const prestige=data.filter(item=>competitionCategory(item.key)==="prestige");
 return `<div class="competition-summary-groups">
  <div><h4>Imprezy mistrzowskie</h4>${championshipRowsHtml(championships)}</div>
  <div><h4>Turnieje kwalifikacyjne</h4>${championshipRowsHtml(qualifying)}</div>
  <div><h4>Turnieje prestiżowe i memoriały</h4>${championshipRowsHtml(prestige)}</div>
 </div>`;
}
function seasonHistoryHtml(){
 const seasons=[...(S.careerStats?.seasons||[])].sort((a,b)=>a.year-b.year);
 if(!seasons.length)return `<p class="muted">Historia sezonów będzie zapisywana od wersji 1.07.</p>`;
 return `<div class="career-season-table-wrap"><table class="career-season-table">
  <thead><tr><th>Sezon</th><th>Wiek</th><th>OVR</th><th>Klub</th><th>Liga</th><th>Biegi</th><th>Średnia</th><th>Rezultat</th></tr></thead>
  <tbody>${seasons.map(season=>`<tr>
   <td data-label="Sezon">${season.year}</td><td data-label="Wiek">${season.age}</td><td data-label="OVR">${season.overall}</td>
   <td data-label="Klub">${season.club}</td><td data-label="Liga">${season.league}</td><td data-label="Biegi">${season.heats}</td>
   <td data-label="Średnia">${Number(season.average).toFixed(3).replace(".",",")}</td>
   <td data-label="Rezultat" title="Faza zasadnicza: ${season.regularPosition||"—"}. miejsce">${leagueSeasonLabel(season)}</td>
  </tr>`).join("")}</tbody>
 </table></div>`;
}

function repeatedChampionLabel(count,title){
 const words={2:"Dwukrotny",3:"Trzykrotny",4:"Czterokrotny",5:"Pięciokrotny",6:"Sześciokrotny",7:"Siedmiokrotny",8:"Ośmiokrotny",9:"Dziewięciokrotny",10:"Dziesięciokrotny"};
 if(count<=1)return title;
 return `${words[count]||`${count}-krotny`} ${title.toLowerCase()}`;
}
function careerClassification(){
 const archive=S.careerStats?.competitionArchive||[];
 const worldTitles=archive.filter(result=>canonicalCompetitionKey(result)==="SGP"&&result.place===1).length;
 const worldMedals=archive.filter(result=>canonicalCompetitionKey(result)==="SGP"&&result.place<=3).length;
 const euroTitles=archive.filter(result=>canonicalCompetitionKey(result)==="SEC"&&result.place===1).length;
 const polishTitles=archive.filter(result=>canonicalCompetitionKey(result)==="IMP"&&result.place===1).length;
 const best=S.careerStats?.bestOverall||overall();
 if(worldTitles>=3)return `${worldTitles}-KROTNY MISTRZ ŚWIATA — LEGENDA`;
 if(worldTitles)return repeatedChampionLabel(worldTitles,"Mistrz świata");
 if(worldMedals>=3)return "Gwiazda światowej czołówki";
 if(euroTitles)return repeatedChampionLabel(euroTitles,"Mistrz Europy");
 if(polishTitles>=3)return `${polishTitles}-krotny mistrz Polski`;
 if(best>=88)return "Gwiazda międzynarodowa";
 if(S.national==="Polska"||best>=80)return "Reprezentant kraju";
 if((S.totals?.matches||0)>=180)return "Legenda ligowa";
 if(best>=70)return "Solidny ligowiec";
 return "Niespełniony talent";
}
function careerClubCities(){
 const totals={};
 for(const [name,seasons] of Object.entries(S.careerStats.clubs||{})){
  const city=clubCity(name);
  totals[city]=(totals[city]||0)+seasons;
 }
 return Object.entries(totals).sort((a,b)=>b[1]-a[1]);
}
function careerClubCitiesText(limit=null){
 const rows=careerClubCities();
 const selected=limit?rows.slice(0,limit):rows;
 return selected.map(([city,seasons])=>`${city} (${seasons} sez.)`).join(", ")||"—";
}


function careerHealthSummaryHtml(){
 ensureHealthStats();
 const h=S.healthStats,history=[...(h.history||[])],worst=[...history].sort((a,b)=>(b.weeks||0)-(a.weeks||0))[0];
 const minor=history.filter(x=>x.severity==="drobny").length,moderate=history.filter(x=>x.severity==="umiarkowany").length;
 const serious=h.seriousInjuries||0;
 const shown=history.slice(0,10);
 const details=shown.map(x=>`${x.year} – ${x.name}${x.weeks?`, ${x.weeks} tyg.`:", bez przerwy"}`).join("; ")+(history.length>10?`; oraz ${history.length-10} drobniejszych urazów`:"");
 return `<section class="career-summary-section"><div class="career-summary-title"><h3>Zdrowie i kontuzje</h3></div><div class="career-summary-grid">
 <div><span>Wszystkie urazy</span><b>${h.injuries||0}</b></div><div><span>Poważne urazy</span><b>${serious}</b></div>
 <div><span>Łączna przerwa</span><b>${h.weeksMissed||0} tyg.</b></div><div><span>Opuszczone mecze</span><b>${h.leagueMatchesMissed||0}</b></div>
 <div><span>Opuszczone imprezy</span><b>${h.individualEventsMissed||0}</b></div></div>
 ${history.length?`<p><b>Rodzaje urazów:</b> drobne ${minor} • umiarkowane ${moderate} • poważne ${serious}.</p>`:""}
 ${details?`<p><b>Historia urazów:</b> ${details}.</p>`:""}
 ${worst?`<p><b>Najpoważniejszy uraz:</b> ${worst.name} — ${worst.weeks||0} tygodni przerwy (${worst.year}).</p>`:`<p>Brak poważnej kontuzji w karierze.</p>`}</section>`;
}

function careerSummaryHtml(){
 const seasons=Math.max(0,S.year-2026),best=S.careerStats.bestSeason;
 const clubs=careerClubCitiesText();
 return `<section class="career-summary-overview">
  <h3>${careerClassification()}</h3>
  <div class="career-summary-grid">
   <div><span>Wiek zakończenia</span><b>${S.age} lat</b></div>
   <div><span>Sezony</span><b>${seasons}</b></div>
   <div><span>Mecze</span><b>${S.totals.matches}</b></div>
   <div><span>Biegi</span><b>${S.totals.heats}</b></div>
   <div><span>Punkty</span><b>${S.totals.points}+${S.totals.bonus}</b></div>
   <div><span>Średnia kariery</span><b>${avg(S.totals.points,S.totals.bonus,S.totals.heats)}</b></div>
   <div><span>Najwyższy OVR</span><b>${S.careerStats.bestOverall}</b></div>
   <div><span>Bilans finansowy</span><b>${money(S.totals.earnings)}</b></div>
  </div>
  <p><b>Najlepszy sezon:</b> ${best?`${best.year}, ${clubDisplayName(best.club)}, średnia ${best.avg.toFixed(3).replace(".",",")}`:"—"}</p>
  <p><b>Kluby:</b> ${clubs}</p>
  <p><b>Reprezentacja:</b> ${S.national||"—"} • powołania: ${S.teamCaps||0} • medale drużynowe: ${S.nationalMedals||0}</p>
  <p><b>Kontuzje:</b> ${S.careerStats.injuries} • <b>typ kariery:</b> ${classifyCareerPath()}</p>
 </section>
 ${careerHealthSummaryHtml()}
 <section class="career-summary-section"><div class="career-summary-title"><h3>Osiągnięcia indywidualne i drużynowe</h3></div>${championshipSummaryHtml()}</section>
 <section class="career-summary-section"><div class="career-summary-title"><h3>Sezon po sezonie</h3></div>${seasonHistoryHtml()}</section>`;
}
function canvasRoundRect(ctx,x,y,w,h,r,fill,stroke=null){
 ctx.beginPath();
 ctx.roundRect(x,y,w,h,r);
 if(fill){ctx.fillStyle=fill;ctx.fill()}
 if(stroke){ctx.strokeStyle=stroke;ctx.stroke()}
}
function canvasText(ctx,text,x,y,{font="32px Arial",color="#173d3a",align="left",maxWidth=null}={}){
 ctx.font=font;ctx.fillStyle=color;ctx.textAlign=align;ctx.textBaseline="alphabetic";
 if(maxWidth)ctx.fillText(String(text),x,y,maxWidth);else ctx.fillText(String(text),x,y);
}
function wrapCanvasText(ctx,text,x,y,maxWidth,lineHeight,options={}){
 const words=String(text).split(/\s+/);let line="",currentY=y;
 for(const word of words){
  const test=line?`${line} ${word}`:word;
  if(ctx.measureText(test).width>maxWidth&&line){
   canvasText(ctx,line,x,currentY,options);line=word;currentY+=lineHeight;
  }else line=test;
 }
 if(line)canvasText(ctx,line,x,currentY,options);
 return currentY;
}
function downloadCanvas(canvas,filename){
 canvas.toBlob(blob=>{
  if(!blob){alert("Nie udało się wygenerować grafiki.");return}
  const url=URL.createObjectURL(blob),a=document.createElement("a");
  a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
 },"image/png");
}
function drawCareerGraphicHeader(ctx,title,subtitle){
 ctx.fillStyle="#f4f0e7";ctx.fillRect(0,0,1080,1350);
 ctx.fillStyle="#173d3a";ctx.fillRect(0,0,1080,220);
 ctx.fillStyle="#4ca7a0";ctx.fillRect(0,212,1080,8);
 canvasText(ctx,"POLISH SPEEDWAY SIMULATOR",64,72,{font:"700 27px Arial",color:"#a8dfe2"});
 canvasText(ctx,title,64,142,{font:"800 55px Arial",color:"#ffffff",maxWidth:900});
 canvasText(ctx,subtitle,64,190,{font:"600 25px Arial",color:"#e9a33a",maxWidth:900});
}
function generateCareerSummaryGraphic(){
 const canvas=document.createElement("canvas");canvas.width=1080;canvas.height=1350;
 const ctx=canvas.getContext("2d");
 drawCareerGraphicHeader(ctx,S.name,`${careerClassification()} • numer ${S.number}`);
 canvasRoundRect(ctx,55,255,970,190,18,"#fffdf8","#d8d3c8");
 const stats=[
  ["SEZONY",Math.max(0,S.year-2026)],["MECZE",S.totals.matches],["BIEGI",S.totals.heats],
  ["PUNKTY",`${S.totals.points}+${S.totals.bonus}`],["ŚREDNIA",avg(S.totals.points,S.totals.bonus,S.totals.heats)],["NAJWYŻSZY OVR",S.careerStats.bestOverall]
 ];
 stats.forEach((stat,index)=>{
  const col=index%3,row=Math.floor(index/3),x=85+col*315,y=300+row*82;
  canvasText(ctx,stat[0],x,y,{font:"700 18px Arial",color:"#6e7773"});
  canvasText(ctx,stat[1],x,y+38,{font:"800 34px Arial",color:index===5?"#e59a2f":"#21302f"});
 });
 const best=S.careerStats.bestSeason;
 canvasText(ctx,"NAJLEPSZY SEZON",65,505,{font:"800 22px Arial",color:"#e59a2f"});
 wrapCanvasText(ctx,best?`${best.year} • ${best.clubDisplay||clubDisplayNameForSeason(best.club,best.year)} • średnia ${best.avg.toFixed(3).replace(".",",")}`:"—",65,548,950,34,{font:"700 27px Arial",color:"#21302f"});
 canvasText(ctx,"NAJWAŻNIEJSZE OSIĄGNIĘCIA",65,635,{font:"800 22px Arial",color:"#e59a2f"});
 const achievements=championshipSummaryData().slice(0,5);
 let y=680;
 if(!achievements.length){
  canvasText(ctx,"Brak medali w imprezach mistrzowskich",65,y,{font:"600 25px Arial",color:"#6e7773"});
 }else{
  for(const item of achievements){
   const medals=medalBreakdown(item.medals);
   const text=medals||`${item.best?.place||"—"}. miejsce (${item.best?.years?.join(", ")||"—"})`;
   canvasText(ctx,item.name,65,y,{font:"700 25px Arial",color:"#173d3a",maxWidth:600});
   canvasText(ctx,text,1015,y,{font:"700 23px Arial",color:"#21302f",align:"right",maxWidth:330});
   y+=54;
  }
 }
 canvasText(ctx,"KLUBY",65,985,{font:"800 22px Arial",color:"#e59a2f"});
 const clubs=careerClubCities().slice(0,5).map(([city,seasons])=>`${city} (${seasons})`).join(" • ");
 wrapCanvasText(ctx,clubs||"—",65,1028,950,34,{font:"600 24px Arial",color:"#21302f"});
 canvasRoundRect(ctx,55,1160,970,120,16,"#173d3a");
 canvasText(ctx,"TYP KARIERY",85,1203,{font:"700 18px Arial",color:"#a8dfe2"});
 canvasText(ctx,classifyCareerPath(),85,1250,{font:"800 35px Arial",color:"#ffffff"});
 canvasText(ctx,"#PolishSpeedwaySimulator",995,1250,{font:"700 20px Arial",color:"#e9a33a",align:"right"});
 downloadCanvas(canvas,`kariera-${S.name.toLowerCase().replace(/[^a-z0-9ąćęłńóśźż]+/gi,"-")}.png`);
}
function generateSeasonHistoryGraphics(){
 const seasons=[...(S.careerStats?.seasons||[])].sort((a,b)=>a.year-b.year);
 if(!seasons.length){alert("Brak zapisanej historii sezonów.");return}
 const perPage=10,pages=Math.ceil(seasons.length/perPage);
 seasons.reduce((promise,_,pageIndex)=>{
  if(pageIndex>=pages)return promise;
  return promise.then(()=>new Promise(resolve=>{
   const page=seasons.slice(pageIndex*perPage,(pageIndex+1)*perPage);
   const canvas=document.createElement("canvas");canvas.width=1080;canvas.height=1350;
   const ctx=canvas.getContext("2d");
   drawCareerGraphicHeader(ctx,"SEZON PO SEZONIE",`${S.name} • strona ${pageIndex+1}/${pages}`);
   const columns=[60,145,215,285,575,760,860,950];
   const labels=["ROK","WIEK","OVR","KLUB","LIGA","BIEGI","ŚRED.","MIEJSCE"];
   canvasRoundRect(ctx,45,255,990,60,10,"#173d3a");
   labels.forEach((label,index)=>canvasText(ctx,label,columns[index],294,{font:"700 16px Arial",color:"#ffffff"}));
   let y=355;
   page.forEach((season,index)=>{
    if(index%2===0){ctx.fillStyle="#fffdf8";ctx.fillRect(45,y-31,990,74)}
    canvasText(ctx,season.year,columns[0],y,{font:"700 19px Arial"});
    canvasText(ctx,season.age,columns[1],y,{font:"700 19px Arial"});
    canvasText(ctx,season.overall,columns[2],y,{font:"700 19px Arial",color:"#e59a2f"});
    canvasText(ctx,season.club,columns[3],y,{font:"600 18px Arial",maxWidth:270});
    canvasText(ctx,season.league,columns[4],y,{font:"600 17px Arial",maxWidth:175});
    canvasText(ctx,season.heats,columns[5],y,{font:"700 19px Arial"});
    canvasText(ctx,Number(season.average).toFixed(3).replace(".",","),columns[6],y,{font:"700 19px Arial"});
    canvasText(ctx,leagueSeasonLabel(season),columns[7],y,{font:"700 18px Arial",maxWidth:115});
    y+=82;
   });
   canvasText(ctx,"POLISH SPEEDWAY SIMULATOR",55,1300,{font:"700 18px Arial",color:"#6e7773"});
   downloadCanvas(canvas,`historia-${S.name.toLowerCase().replace(/[^a-z0-9ąćęłńóśźż]+/gi,"-")}-${pageIndex+1}.png`);
   setTimeout(resolve,350);
  }));
 },Promise.resolve());
}
function showCareerGraphicOptions(){
 if(!S?.retired){alert("Grafikę można wygenerować po zakończeniu kariery.");return}
 showModal("GRAFIKA KARIERY","Co chcesz wygenerować?","Pliki PNG powstaną bezpośrednio w przeglądarce.",[
  {title:"Grafika podsumowująca",desc:"Pionowy format 1080 × 1350 px z najważniejszymi statystykami i osiągnięciami.",action:()=>{closeModal();generateCareerSummaryGraphic()}},
  {title:"Pełna historia sezon po sezonie",desc:"Jedna lub kilka grafik z tabelą całej kariery.",action:()=>{closeModal();generateSeasonHistoryGraphics()}}
 ]);
}

function showCareerEndSupportPopup(){
 const card=$("careerSummaryCard");
 showModal(
  "KONIEC KARIERY",
  "Rozegrałeś całą karierę!",
  `Sprawdź swoje sukcesy, statystyki i pełną historię sezon po sezonie. A jeśli Polish Speedway Simulator dał ci trochę frajdy i przed kolejną rozgrywką chcesz wesprzeć dalszy rozwój projektu — możesz postawić symboliczną kawę. ☕`,
  [
   {title:"Zobacz podsumowanie kariery",desc:"Przejdź do sukcesów, statystyk i historii wszystkich sezonów.",action:()=>{closeModal();card?.scrollIntoView?.({behavior:"smooth",block:"start"})}},
   {title:"Postaw kawę! ☕",desc:"Dobrowolnie wesprzyj rozwój Polish Speedway Simulator.",action:()=>{window.open("https://www.naffy.io/piotr-bak-qwihy/postaw-kawe","_blank","noopener,noreferrer");closeModal();card?.scrollIntoView?.({behavior:"smooth",block:"start"})}}
  ]
 );
}
function endCareer(reason="Decyzja zawodnika"){
 clearSeasonWatchdog();
 S.seasonFlowActive=false;
 S.retired=true;S.careerStats.careerEnded=true;
 addHistory("Koniec kariery",`${reason}. Kończysz karierę w wieku ${S.age} lat.`);
 const card=$("careerSummaryCard"),content=$("careerSummaryContent");
 card.classList.remove("hidden");content.innerHTML=careerSummaryHtml();
 $("resultBox").classList.add("hidden");
 render();
 showCareerEndSupportPopup();
}

function postSeasonHealthGate(next){
 if(S.finalSeason){
  endCareer("Zapowiedziany ostatni sezon");
  return;
 }
 const nextAge=S.age+1;
 if(nextAge<37){S.healthGatePassedYear=S.year;next();return}
 if(nextAge>=50){
  showModal("ZDROWIE","To był twój ostatni sezon",
   `Po zakończeniu sezonu lekarze i sztab nie dopuszczają dalszej kariery na tym poziomie obciążeń.`,
   [{title:"Zakończ karierę",desc:"Przejdź do podsumowania całej kariery.",action:()=>{closeModal();endCareer("Osiągasz maksymalny wiek kariery")}}]);
  return;
 }
 const forced=Math.random()*100<healthRetirementChance(nextAge);
 if(forced){
  showModal("ZDROWIE","Lekarze odradzają dalsze starty",
   `Sezon dobiegł końca. Wiek, historia urazów i aktualna kondycja sprawiają, że podpisywanie kontraktu na kolejny rok byłoby zbyt ryzykowne.`,
   [{title:"Kończę karierę",desc:"Rynek transferowy nie zostanie już otwarty.",action:()=>{closeModal();endCareer("Zdrowie nie pozwala na dalsze starty")}}]);
  return;
 }
 S.healthGatePassedYear=S.year;
 next();
}

function retirementDecision(next){
 if(S.age<37){next();return}
 if(S.age>=50){endCareer("Osiągasz maksymalny wiek kariery");return}
 // Jeśli zdrowie zostało sprawdzone tuż po poprzednim sezonie, nie losujemy drugi raz po podpisaniu kontraktu.
 const healthAlreadyCleared=S.healthGatePassedYear===S.year-1;
 if(!healthAlreadyCleared&&Math.random()*100<healthRetirementChance()){
  showModal("ZDROWIE","Lekarze odradzają dalsze starty",
   `Wiek, historia urazów i aktualna kondycja sprawiają, że kontynuowanie kariery jest zbyt ryzykowne.`,
   [{title:"Kończę karierę",desc:"Przejdź do podsumowania całej kariery.",action:()=>{closeModal();endCareer("Zdrowie nie pozwala na dalsze starty")}}]);
  return;
 }
 showModal("SCHYŁEK KARIERY","Co robisz po kolejnym sezonie?",
  `Masz ${S.age} lat. OVR: ${overall()}, kondycja: ${Math.round(S.skills.fitness)}, ryzyko urazu: ${Math.round(S.injuryRisk)}%.`,
  [
   {title:"Jadę dalej",desc:"Podejmujesz ryzyko kolejnego sezonu. Spadek parametrów może przyspieszać.",action:()=>{closeModal();next()}},
   {title:"Jeszcze jeden sezon",desc:"Deklarujesz ostatni sezon. Po nim kariera zakończy się automatycznie.",action:()=>{S.finalSeason=true;closeModal();next()}},
   {title:"Kończę karierę",desc:"Zakończ karierę teraz i pokaż pełne podsumowanie.",action:()=>{closeModal();endCareer("Dobrowolna decyzja")}}
  ]);
}

function lateCareerHighPressure(){
 const dna=careerDNA(),phase=careerPhaseState(),after=S.age-(dna.peakAge||31),plateau=Math.max(3,Math.min(7,dna.peakWidth||5));
 if(after<=plateau||dna.exceptionalLongevity||["breakthrough","secondWind"].includes(phase.type))return;
 const best=S.careerStats?.bestOverall||0;
 if(overall()<best-1)return;
 const keys=["fitness","distance","starts","overtaking"].filter(k=>S.skills[k]>45);
 const attempts=after>=plateau+6?2:1;
 for(let i=0;i<attempts;i++){const key=pick(keys);if(key&&Math.random()<(phase.type==="slump"?.82:.58))S.skills[key]-=1}
}
function finishSeason(contractResolved=true){
 clearSeasonWatchdog();clearSeasonFlowStage();
 clearSeasonResolution();
 S.seasonFlowActive=false;
 seasonalMetaDynamics();
 const tenure=ensureClubTenure();tenure.seasons++;
 S.age++;S.year++;
 S.preseasonCompletedYear=null;
 S.budgetManagementCompletedYear=null;
 S.preseasonOffers=null;
 if(contractResolved&&S.contractYears>0)S.contractYears--;
 if(S.age===22){
  S.role=S.chance>62?"Podstawowy U24":"U24 – rotacja";
  addHistory("Zmiana statusu zawodnika","Kończysz wiek juniora i od nowego sezonu zajmujesz pozycję U24. Konkurencja o skład rośnie, szczególnie w PGE Ekstralidze.");
 }
 if(S.age===25){
  S.role=S.chance>66?"Podstawowy senior":"Senior – rotacja";
  addHistory("Zmiana statusu zawodnika","Kończysz okres U24. Od nowego sezonu jesteś pełnoprawnym seniorem i konkurujesz o miejsce bez ochrony regulaminowej.");
 }
 careerDecline();
 curveDrivenSkillDecay();
 lateCareerHighPressure();
 maybeChangeTitleSponsors();
 normalize();
 if(S.finalSeason){endCareer("Zapowiedziany ostatni sezon");return}
 retirementDecision(()=>render());
}

function refreshHomeTrackSummary(){
 const box=$("resultBox");
 if(!box||box.classList.contains("hidden"))return;
 const track=homeTrackImpact();
 const replacement=`<b>Atut toru domowego (${track.city}):</b> ${track.text}`;
 box.innerHTML=box.innerHTML.replace(/<b>Atut toru domowego \([^<]*\):<\/b>[^<]*(?=<br>|$)/,replacement);
}


function ensureClubTenure(){
 const base=clubBaseName(S.club||"");
 S.clubTenure??={base,seasons:0};
 if(S.clubTenure.base!==base)S.clubTenure={base,seasons:0};
 return S.clubTenure;
}
function loyaltyGainForTenure(seasons){
 return seasons>=7?5:seasons>=4?4:3;
}
function applyContractLoyalty(previousClub,newClub,stay){
 const prev=clubBaseName(previousClub||""),next=clubBaseName(newClub||"");
 if(prev&&prev===next){
  const tenure=ensureClubTenure(),gain=loyaltyGainForTenure(tenure.seasons);
  S.loyalty=clamp(S.loyalty+gain,0,100);
  addHistory("Lojalność",`Przedłużasz umowę z ${clubCity(newClub)||next}. Długi pobyt w jednym klubie podnosi lojalność o ${gain}.`);
 }else if(prev&&next&&prev!==next){
  S.loyalty=clamp(S.loyalty-(S.clubTenure?.seasons<=1?3:1),0,100);
  S.clubTenure={base:next,seasons:0};
 }
}


function previousSeasonClubInfo(club,league){
 const base=clubBaseName(club);
 const archive=S.worldLeagueArchive?.[S.year]?.[base]||null;
 const currentLevel=leagueByName(league)?.level||3;
 if(archive){
  const previousLevel=archive.level;
  const previousLeague=archive.league;
  const place=archive.position;
  if(currentLevel<previousLevel){
   const route=archive.promotionRoute==="barrage"?" po zwycięskim barażu":archive.promotionRoute==="direct"?" bezpośrednio":"";
   const foreignAhead=Array.isArray(archive.foreignAhead)?archive.foreignAhead:[];
   const foreignNote=foreignAhead.length
    ?` (${foreignAhead.map(x=>`${x.position}. miejsce zajął klub zagraniczny${x.name?` ${x.name}`:""} — bez prawa awansu`).join("; ")})`
    :"";
   return {status:`Beniaminek — ${place}. miejsce w ${leagueLocative(previousLeague)}, awans${route} do ${leagueGenitive(league)}${foreignNote}`,place,previousLeague};
  }
  if(currentLevel>previousLevel){
   return {status:`Spadkowicz z ${leagueGenitive(previousLeague)} — ${place}. miejsce w poprzednim sezonie`,place,previousLeague};
  }
  return {status:`${place}. miejsce w ${leagueLocative(previousLeague)} w poprzednim sezonie`,place,previousLeague};
 }
 const meta=S.clubMeta?.[club]||S.clubMeta?.[base]||{};
 const previousLeague=meta.lastLeague||league;
 const previousLevel=leagueByName(previousLeague)?.level||currentLevel;
 const place=meta.lastPosition||null;
 if(currentLevel<previousLevel)return {status:`Beniaminek — awans z ${leagueGenitive(previousLeague)}${place?` (${place}. miejsce)`:""}`,place,previousLeague};
 if(currentLevel>previousLevel)return {status:`Spadkowicz z ${leagueGenitive(previousLeague)}${place?` (${place}. miejsce)`:""}`,place,previousLeague};
 return {status:place?`${place}. miejsce w ${leagueLocative(previousLeague)} w poprzednim sezonie`:"Pozycja oszacowana na podstawie siły zespołu",place,previousLeague};
}
function clubSportingContext(club,league){
 return highlightTransferSportingContext(previousSeasonClubInfo(club,league).status);
}

function highlightTransferSportingContext(text){
 let s=normalizeOrdinalPlaceCase(String(text||""));
 const leagueLoc="(?:PGE Ekstralidze|Metalkas 2\\. Ekstralidze|Krajowej Lidze Żużlowej)";
 s=s.replace(new RegExp(`(\\d+\\. miejsce w ${leagueLoc})`,"i"),"<b>$1</b>");
 s=s.replace(/(Spadkowicz z (?:PGE Ekstraligi|Metalkas 2\. Ekstraligi|Krajowej Ligi Żużlowej))/i,"<b>$1</b>");
 s=s.replace(/(Beniaminek\s*[—-]\s*awans z (?:PGE Ekstraligi|Metalkas 2\. Ekstraligi|Krajowej Ligi Żużlowej))/i,"<b>$1</b>");
 return s;
}
function transferPercentHtml(value){return `<b>${lineupChanceText(value)}</b>`}
function transferPointRateHtml(value){return `<b>${money(value)} za punkt</b>`}
function transferPreparationHtml(value){return `<b>${money(value)}</b>`}

function clubOffer(club,league,interest,role,salary,fee,years,stay=false){
 const projected=projectedLineupChance(club,league,{stay,role});
 const levelNow=leagueByName(S.league)?.level||3,levelOffer=leagueByName(league)?.level||3;
 const direction=levelOffer<levelNow?"awans sportowy":levelOffer>levelNow?"zejście ligę niżej":"ten sam poziom";
 const sporting=clubSportingContext(club,league);
 return {
  title:`${stay?"ZOSTAJĘ — ":""}${club} (${league})`,
  desc:`${sporting} • Prognoza jazdy: ok. ${transferPercentHtml(projected)} • ${clubOpportunityTag(club,league)} • ${direction} • ${role} • ${transferPointRateHtml(salary)} • kwota na przygotowanie: ${transferPreparationHtml(fee)} • kontrakt ${years}-letni${financialTag(club)}`,
  action:()=>{
   const previousClub=S.club;const changingClub=clubBaseName(S.club)!==clubBaseName(club);applyContractLoyalty(previousClub,club,stay);S.club=canonicalClubName(club);S.league=league;S.role=role;if(changingClub)S.lastTransferYear=S.year;S.salary=salary;S.signingFee=fee;S.contractPreparationFee=fee;S.contractYears=years;S.chance=projected;S.clubRelation=stay?clamp(S.clubRelation+5):50;S.budget+=fee;
   addHistory(stay?"Przedłużasz kontrakt":"Transfer",`${club} • ${league} • ${money(salary)} za punkt • przygotowanie ${money(fee)} • ${role}.`);refreshHomeTrackSummary();closeModal();finishSeason(false);
  }
 };
}
function activeContractApproach(pph){
 const currentLevel=leagueByName(S.league)?.level||3;
 const approachChance=clamp(8+S.reputation*.28+Math.max(0,pph-1.45)*24+(overall()>=78?8:0),5,52);
 if(Math.random()*100>approachChance)return false;

 const candidates=[];
 LEAGUES.forEach(l=>l.teams.forEach(t=>{
  if(uniqueClubKey(t[0])!==uniqueClubKey(S.club)&&(!S.parentClub||uniqueClubKey(t[0])!==uniqueClubKey(S.parentClub.name))&&Math.abs(l.level-currentLevel)<=1&&overall()+rand(-5,13)>=t[1]-12){
   candidates.push({name:clubDisplayName(t[0]),league:l.name,level:l.level,strength:t[1]});
  }
 }));
 const uniqueCandidates=dedupeCandidates(candidates,[S.club,S.parentClub?.name].filter(Boolean));
 if(!uniqueCandidates.length)return false;

 const c=pick(uniqueCandidates),easier=c.level>currentLevel;
 const proposedRole=easier?"Podstawowy zawodnik":"Walka o skład";
 const marketSalary=clubOfferSalary(c.name,c.league,proposedRole,pph,{stay:false});
 const offerTypeRoll=Math.random(),premium=offerTypeRoll<.58?(.05+Math.random()*.20):offerTypeRoll<.84?(-.03+Math.random()*.11):(-.18+Math.random()*.16);
 let transferSalary=Math.max(300,Math.round((marketSalary*.58+S.salary*(1+premium)*.42)/50)*50);
 const years=drawContractYears({young:S.age<=24,star:overall()>=82});
 let transferFee=preparationMoney(transferSalary,c.name,c.league,proposedRole,{transfer:true});
 const currentFee=S.contractPreparationFee||0;
 if(offerTypeRoll<.58&&currentFee>0)transferFee=Math.max(transferFee,Math.round(currentFee*(1.05+Math.random()*.25)/1000)*1000);

 const projected=projectedLineupChance(c.name,c.league,{stay:false,role:proposedRole});
 const currentProjected=projectedLineupChance(S.club,S.league,{stay:true,role:S.role});
 const sportArgument=c.level<currentLevel?"wyższy poziom ligi":projected>=currentProjected+12?"większa szansa regularnej jazdy":clubSportingContext(c.name,c.league);

 // Jeden zainteresowany klub składa jedną formę ruchu. Nie losujemy osobno transferu i wypożyczenia.
 const loanPreferred=S.contractYears>=2&&(S.age<=24||projected>=currentProjected+18)&&Math.random()<.38;
 const options=[
  {title:`ZOSTAJĘ — ${S.club} (${S.league})`,desc:`Obecna umowa: ${transferPointRateHtml(S.salary)} • kwota na przygotowanie: ${currentFee?transferPreparationHtml(currentFee):"brak zapisanej kwoty"} • obecna prognoza jazdy: ok. ${transferPercentHtml(currentProjected)} • pozostało ${Math.max(1,S.contractYears-1)} sezon(y). Lojalność +4.`,action:()=>{
    S.loyalty=clamp(S.loyalty+4,0,100);S.contractYears--;addHistory("Odrzucasz ofertę",`Pozostajesz w ${S.club} i wypełniasz ważny kontrakt.`);closeModal();finishSeason(false);
  }}
 ];

 if(loanPreferred){
  const loanSalary=Math.max(300,Math.round((S.salary*.72+marketSalary*.28)*(0.96+Math.random()*.12)/50)*50);
  const parentShare=rand(25,55),loanPrep=Math.max(0,Math.round(((currentFee*.45)+(transferFee*.20))/1000)*1000);
  options.push({title:`WYPOŻYCZENIE — ${c.name} (${c.league})`,desc:`${clubSportingContext(c.name,c.league)} • jednoroczny wyjazd • stawka wypłacana przez klub docelowy: ${transferPointRateHtml(loanSalary)} (${loanSalary>=S.salary?"+":"−"}${Math.round(Math.abs(loanSalary/S.salary-1)*100)}% względem obecnej stawki) • kwota na przygotowanie: ${transferPreparationHtml(loanPrep)} • klub macierzysty pokrywa ok. ${parentShare}% kosztów zaplecza • prognoza jazdy: ok. ${transferPercentHtml(Math.min(96,projected+7))}.`,action:()=>{
    const parent=S.club,remaining=Math.max(1,S.contractYears-1);
    S.parentClub={name:parent,league:S.league,remainingYears:remaining,salary:S.salary,preparationFee:S.contractPreparationFee||0};
    S.club=c.name;S.league=c.league;S.salary=loanSalary;S.signingFee=loanPrep;S.contractPreparationFee=loanPrep;S.budget+=loanPrep;S.contractYears=1;S.chance=Math.min(96,projected+7);S.clubRelation=50;S.loyalty-=2;
    addHistory("Wypożyczenie",`${parent} wypożycza cię na sezon do ${c.name}. Stawka: ${money(loanSalary)} za punkt.`);refreshHomeTrackSummary();closeModal();finishSeason(false);
  }});
 }else{
  options.push({title:`TRANSFER — ${c.name} (${c.league})`,desc:`${clubSportingContext(c.name,c.league)} • ${transferPointRateHtml(transferSalary)} (${transferSalary>=S.salary?"+":"−"}${Math.round(Math.abs(transferSalary/S.salary-1)*100)}% względem obecnej stawki) • kwota na przygotowanie: ${transferPreparationHtml(transferFee)} • prognoza jazdy: ok. ${transferPercentHtml(projected)} • ${clubOpportunityTag(c.name,c.league)} • ${contractYearLabel(years)} kontrakt${financialTag(c.name)}.`,action:()=>{
    const old=S.club;S.club=c.name;S.league=c.league;S.salary=transferSalary;S.signingFee=transferFee;S.contractPreparationFee=transferFee;S.budget+=transferFee;S.contractYears=years;S.chance=projected;S.clubRelation=50;S.loyalty-=7;
    addHistory("Transfer mimo ważnego kontraktu",`${old} zgadza się na odejście. Podpisujesz ${contractYearLabel(years)} kontrakt z ${c.name}.`);refreshHomeTrackSummary();closeModal();finishSeason(false);
  }});
 }

 showModal("OFERTA W TRAKCIE KONTRAKTU","Inny klub pyta o twoją dostępność.",
  `${c.name} (${c.league}) chce pozyskać cię mimo ważnej umowy z ${S.club} (${S.league}). Argument sportowy: <b>${sportArgument}</b>. ${loanPreferred?"Kluby rozmawiają o jednorocznym wypożyczeniu.":"Klub proponuje transfer definitywny."} Niższa oferta finansowa również może się pojawić — decyzja należy do ciebie.`,
  options);
 return true;
}
function resolveContractAfterSeason(pph){
 // Wypożyczenie wygasa po sezonie i zawodnik wraca do klubu macierzystego.
 if(S.parentClub){
  const loanClub=S.club,parent=S.parentClub;
  S.club=parent.name;S.homeTrackCache=null;S.league=parent.league;S.salary=parent.salary;S.contractPreparationFee=parent.preparationFee||0;S.contractYears=parent.remainingYears;S.parentClub=null;S.clubRelation=52;
  addHistory("Powrót z wypożyczenia",`Po sezonie w ${loanClub} wracasz do ${S.club}.`);
 }

 if(S.contractYears>1){
  if(activeContractApproach(pph))return;
  S.contractYears--;
  addHistory("Kontrakt trwa dalej",`Pozostajesz w ${S.club}. Do końca umowy: ${S.contractYears} sezon${S.contractYears===1?"":"y"}.`);
  finishSeason(false);return;
 }
 postSeasonMarket(pph);
}
function uniqueClubKey(name){return clubBaseName(teamData(name)?.canonicalName||name).toLocaleLowerCase("pl")}
function riderMarketLevel(pph){
 const form=pph||S.season?.avg||0,ovr=overall(),agePenalty=S.age>=34?Math.min(6,(S.age-33)*.7):0;
 const score=ovr+clamp((form-1.35)*8,-7,10)+S.reputation*.035-agePenalty;
 if(score>=78)return 1;
 if(score>=64)return 2;
 return 3;
}
function leagueOfferWeight(level,targetLevel){
 const distance=Math.abs(level-targetLevel);
 if(distance===0)return 1;
 if(distance===1)return .28;
 return .035;
}
function dedupeCandidates(candidates,excluded=[]){
 const blocked=new Set(excluded.map(uniqueClubKey)),seen=new Set(),result=[];
 for(const candidate of candidates){const key=uniqueClubKey(candidate.name);if(blocked.has(key)||seen.has(key))continue;seen.add(key);result.push(candidate)}
 return result;
}

function marketRoleForClub(club,league,currentLevel){
 const level=leagueByName(league)?.level||3,status=rosterStatusForAge();
 const req=clubRequiredOverall(club,league),gap=overall()-req;
 if(status==="junior"){
  if(level>=currentLevel)return gap>=-5?"Regularna jazda – junior":"Rywalizacja o miejsce juniorskie";
 }
 if(status==="u24"){
  if(level>currentLevel)return gap>=-3?"Podstawowy U24":"Walka o pozycję U24";
  if(level===currentLevel)return gap>=-2?"Regularna jazda – U24":"Rywalizacja o pozycję U24";
 }
 if(level>currentLevel)return gap>=-2?"Podstawowy zawodnik":"Regularna jazda";
 if(level===currentLevel)return gap>=-3?"Rotacja":"Walka o skład";
 return "Walka o skład";
}
function evaluatedMarketCandidates(pph,current,currentLevel){
 const candidates=[],baseTargetLevel=riderMarketLevel(pph),transition=statusTransitionPenalty(S.age),retention=exceptionalRetentionScore();
 const downgrade=(transition&&retention<78)?(retention<69?1:Math.random()<.58?1:0):0;
 const targetLevel=clamp(baseTargetLevel+downgrade,1,3),currentKey=uniqueClubKey(current);
 for(const league of LEAGUES){
  for(const [rawName,strength] of league.teams){
   const name=clubDisplayName(rawName);if(uniqueClubKey(name)===currentKey)continue;
   const weight=leagueOfferWeight(league.level,targetLevel);if(Math.random()>weight)continue;
   const required=clubRequiredOverall(name,league.name);
   let role=marketRoleForClub(name,league.name,currentLevel);
   if(overall()<required-8)role="Rezerwowy / rozwój";
   else if(overall()<required-3&&role.includes("Regularna"))role="Walka o skład";
   const projected=projectedLineupChance(name,league.name,{stay:false,role});
   const ageFit=S.age<=21?2:S.age>=33&&league.level<targetLevel?-8:0;
   const fitScore=projected-Math.abs(league.level-targetLevel)*22-Math.abs(required-overall())*.5+ageFit+rand(-4,4);
   candidates.push({name,league:league.name,level:league.level,strength,role,projected,fitScore,targetLevel});
  }
 }
 return dedupeCandidates(candidates,[current]);
}
function selectMarketCandidates(pph,current,currentLevel,count=3){
 const targetLevel=riderMarketLevel(pph),all=dedupeCandidates(evaluatedMarketCandidates(pph,current,currentLevel),[current]);
 const selected=[],tiers=[targetLevel,targetLevel+1,targetLevel-1,3,2,1].filter((v,i,a)=>v>=1&&v<=3&&a.indexOf(v)===i);
 for(const level of tiers){
  const pool=all.filter(c=>c.level===level).sort((a,b)=>b.fitScore-a.fitScore);
  for(const candidate of pool){
   if(selected.length>=count)break;
   if(candidate.projected<18&&selected.length<2)continue;
   if(!selected.some(x=>uniqueClubKey(x.name)===uniqueClubKey(candidate.name)))selected.push(candidate);
  }
 }
 // W typowym oknie przynajmniej dwie oferty mają być grywalne, ale z odpowiedniego poziomu.
 if(selected.filter(c=>c.projected>=25).length<2){
  for(const candidate of all.sort((a,b)=>b.projected-a.projected)){
   if(selected.some(x=>uniqueClubKey(x.name)===uniqueClubKey(candidate.name)))continue;
   if(candidate.projected>=25){selected.push(candidate);if(selected.filter(c=>c.projected>=25).length>=2)break}
  }
 }
 return dedupeCandidates(selected,[current]).slice(0,count);
}

function postSeasonMarket(pph){
 const transitionNote=statusTransitionLabel(S.age)?`<b>${statusTransitionLabel(S.age)}:</b> po zmianie statusu konkurencja o skład rośnie. `:"";
 updateClubFinances();
 const current=clubDisplayName(S.club),currentLeague=S.league,currentLevel=leagueByName(currentLeague)?.level||3;
 const star=overall()>=84||S.reputation>=75||isQualifiedForCurrentSGP()||pph>=2.0;
 const currentRole=star?"Podstawowy zawodnik":pph>1.65?"Rotacja":"Rezerwowy / rozwój";
 const currentProjected=projectedLineupChance(current,currentLeague,{stay:true,role:currentRole});
 const wantsScore=S.clubRelation+S.loyalty*.30+pph*16+S.reputation*.12+rand(-10,14);
 // Obecny klub zna zawodnika, dlatego częściej daje mu szansę na przedłużenie niż obcy klub.
 const wants=wantsScore>48||currentProjected>=18||S.age<=21&&S.clubRelation>=42;
 const options=[];
 if(wants){
  const role=star?"Podstawowy zawodnik":currentProjected>=55?"Podstawowy zawodnik":currentProjected>=25?"Rotacja":"Rezerwowy / rozwój";
  const salary=clubOfferSalary(current,currentLeague,role,pph,{stay:true});
  const prep=preparationMoney(salary,current,currentLeague,role,{transfer:false});
  options.push(clubOffer(current,currentLeague,50,role,salary,prep,drawContractYears({young:S.age<=24,star:overall()>=82}),true));
 }
 const selected=dedupeCandidates(selectMarketCandidates(pph,current,currentLevel,3),[current]);
 for(const c of selected){
  const salary=clubOfferSalary(c.name,c.league,c.role,pph,{stay:false});
  const prep=preparationMoney(salary,c.name,c.league,c.role,{transfer:true});
  options.push(clubOffer(c.name,c.league,50,c.role,salary,prep,drawContractYears({young:S.age<=24,star:overall()>=82}),false));
 }
 if(!options.length){
  addHistory("Klub nie przedłuża kontraktu",`${current} nie składa ci nowej oferty. Trafiasz na rynek jako wolny zawodnik.`);
  const fallback=selectMarketCandidates(pph,current,currentLevel,3).map(c=>{
   const role=c.role||"Regularna jazda",salary=clubOfferSalary(c.name,c.league,role,pph),prep=preparationMoney(salary,c.name,c.league,role,{transfer:true});
   return clubOffer(c.name,c.league,50,role,salary,prep,1,false)
  });
  showModal("RYNEK TRANSFEROWY","Musisz znaleźć nowy klub.","Dotychczasowy klub nie chce kontynuować współpracy.",fallback);return
 }
 showModal("RYNEK TRANSFEROWY","Gdzie pojedziesz w przyszłym sezonie?",`${wants?current+" chce przedłużyć wygasającą umowę.":"Dotychczasowy klub nie składa ci nowej oferty."}`,options);
}
let seasonWatchdog=null;
function clearSeasonWatchdog(){
 if(seasonWatchdog){clearTimeout(seasonWatchdog);seasonWatchdog=null}
}

function setSeasonFlowStage(stage){
 if(!S)return;
 S.seasonFlowStage=stage||"";
 save();
}
function clearSeasonFlowStage(){
 if(!S)return;
 S.seasonFlowStage="";
}

function modalIsVisible(){
 return !$("modal").classList.contains("hidden");
}
function runSeasonStep(fn){
 try{return fn()}
 catch(error){recoverSeasonFlow(error);return undefined}
}
function deferSeasonStep(fn){
 setTimeout(()=>runSeasonStep(fn),0);
}
function armSeasonWatchdog(){
 clearSeasonWatchdog();
 seasonWatchdog=setTimeout(()=>{
  if(S?.seasonFlowActive&&!modalIsVisible()){
   recoverSeasonFlow(new Error("Przepływ sezonu zatrzymał się bez aktywnego okna decyzji."));
  }
 },12000);
}

function unlockSeasonFlow(){
 clearSeasonWatchdog();
 if(!S)return;
 S.seasonFlowActive=false;
 const button=$("playBtn");
 if(button){
  button.disabled=!!S.retired;
  button.textContent=S.retired?"KARIERA ZAKOŃCZONA":"ROZEGRAJ SEZON";
 }
}
function lockSeasonFlow(){
 if(S.seasonFlowActive)return false;
 S.seasonFlowActive=true;
 armSeasonWatchdog();
 const button=$("playBtn");
 if(button){
  button.disabled=true;
  button.textContent="TRWA SEZON…";
 }
 return true;
}
function recoverSeasonFlow(error){
 console.error("Błąd przepływu sezonu:",error);
 const stage=S?.seasonFlowStage||"nieustalony etap";
 const message=String(error?.message||error||"nieznany błąd");
 clearSeasonWatchdog();
 closeModal();
 if(S){
  S.seasonRecoveryYear=S.year;
  S.seasonRecoveryCount=(S.seasonRecoveryCount||0)+1;
  S.seasonFlowActive=false;
 }
 unlockSeasonFlow();
 normalize();
 save();
 render();
 const box=$("resultBox");
 if(box){
  box.classList.remove("hidden");
  box.innerHTML=`<h3>Sezon został bezpiecznie odblokowany</h3>
   <p>Nie utracono zapisu. Wykryty etap: <b>${stage}</b>.</p>
   <p class="muted">Błąd techniczny: ${message}</p>
   <p>${S.seasonRecoveryCount>=2?"Przy następnym uruchomieniu gra pominie opcjonalne ekrany przedsezonowe i przejdzie bezpośrednio do symulacji sezonu.":"Możesz ponownie kliknąć „Rozegraj sezon”."}</p>`;
 }
}

function play(){
 if(S.retired||!lockSeasonFlow())return;
 $("resultBox").classList.add("hidden");
 const directRecovery=S.seasonRecoveryYear===S.year&&(S.seasonRecoveryCount||0)>=2;
 runSeasonStep(()=>{
  if(currentSeasonAlreadySettled()){setSeasonFlowStage("wznowienie rozliczonego sezonu");resumeSettledSeason();return}
  const doSim=()=>runSeasonStep(()=>{
   setSeasonFlowStage("symulacja ligi");
   simulateSeason();
  });
  const run=()=>runSeasonStep(()=>{
   setSeasonFlowStage("zdarzenie losowe");
   randomEvent(()=>runSeasonStep(()=>{
    setSeasonFlowStage("kontuzje i zdrowie");
    maybeSeriousCareerInjuryEvent(doSim);
   }));
  });
  if(directRecovery){
   S.preseasonCompletedYear=S.year;
   S.budgetManagementCompletedYear=S.year;
   setSeasonFlowStage("tryb naprawczy — bezpośrednia symulacja");
   doSim();
   return;
  }
  if(S.league==="Etap szkolenia"){
   setSeasonFlowStage("przygotowania przed licencją");
   preseasonPreparation(run);
  }else{
   setSeasonFlowStage("zarządzanie budżetem i bazą");
   budgetManagement(()=>runSeasonStep(()=>{
    setSeasonFlowStage("przygotowania do sezonu");
    preseasonPreparation(run);
   }));
  }
 });
}

$("region").addEventListener("change",refreshAcademyChoices);
refreshAcademyChoices();
document.querySelectorAll("[data-choice-for]").forEach(group=>{
 group.querySelectorAll(".choice-card").forEach(button=>button.onclick=()=>{
  group.querySelectorAll(".choice-card").forEach(x=>x.classList.remove("active"));
  button.classList.add("active");
  $(group.dataset.choiceFor).value=button.dataset.value;
 });
});
$("randomNameBtn").onclick=()=>{$("name").value=randomPolishName();$("name").focus()};
$("randomNumberBtn").onclick=()=>{$("riderNumber").value=randomRiderNumber();$("riderNumber").focus()};
$("generateCareerGraphicBtn").onclick=()=>showCareerGraphicOptions();
$("riderNumber").addEventListener("input",()=>{
 const input=$("riderNumber");
 if(input.value===""){input.setCustomValidity("");return}
 const value=Number(input.value);
 input.setCustomValidity(Number.isInteger(value)&&value>=1&&value<=999?"":"Wpisz liczbę całkowitą od 1 do 999.");
});
$("startForm").onsubmit=e=>{e.preventDefault();showStartDisclaimer()};
$("playBtn").onclick=play;
$("newBtn").onclick=()=>{if(confirm("Usunąć obecny zapis i rozpocząć nową karierę?")){localStorage.removeItem("pss_v101");localStorage.removeItem("pss_v100");localStorage.removeItem("pzs_v200");localStorage.removeItem("pzs_v1361");localStorage.removeItem("pzs_v136");localStorage.removeItem("pzs_v135");localStorage.removeItem("pzs_v134");localStorage.removeItem("pzs_v1331");localStorage.removeItem("pzs_v133");localStorage.removeItem("pzs_v132");localStorage.removeItem("pzs_v131");localStorage.removeItem("pzs_v1301");localStorage.removeItem("pzs_v130");localStorage.removeItem("pzs_v129");localStorage.removeItem("pzs_v128");localStorage.removeItem("pzs_v127");localStorage.removeItem("pzs_v126");localStorage.removeItem("pzs_v1252");localStorage.removeItem("pzs_v1251");localStorage.removeItem("pzs_v125");localStorage.removeItem("pzs_v124");localStorage.removeItem("pzs_v123");localStorage.removeItem("pzs_v122");localStorage.removeItem("pzs_v121");localStorage.removeItem("pzs_v120");localStorage.removeItem("pzs_v119");localStorage.removeItem("pzs_v118");localStorage.removeItem("pzs_v117");localStorage.removeItem("pzs_v116");localStorage.removeItem("pzs_v115");localStorage.removeItem("pzs_v114");localStorage.removeItem("pzs_v113");localStorage.removeItem("pzs_v112");localStorage.removeItem("pzs_v111");localStorage.removeItem("pzs_v110");localStorage.removeItem("pzs_v109");localStorage.removeItem("pzs_v108");localStorage.removeItem("pzs_v107");localStorage.removeItem("pzs_v106");localStorage.removeItem("pzs_v105");localStorage.removeItem("pzs_v104");localStorage.removeItem("pzs_v103");localStorage.removeItem("pzs_v102");localStorage.removeItem("pzs_v101");localStorage.removeItem("pzs_v100");localStorage.removeItem("pzs_v305");localStorage.removeItem("pzs_v304");localStorage.removeItem("pzs_v303");localStorage.removeItem("pzs_v302");localStorage.removeItem("pzs_v301");localStorage.removeItem("pzs_final30");localStorage.removeItem("pzs_v30");localStorage.removeItem("pzs_v29");localStorage.removeItem("pzs_v28");localStorage.removeItem("pzs_v27");localStorage.removeItem("pzs_v26");localStorage.removeItem("pzs_v25");localStorage.removeItem("pzs_v24");localStorage.removeItem("pzs_v23");localStorage.removeItem("pzs_v22");localStorage.removeItem("pzs_v2");location.reload()}};
$("exportBtn").onclick=()=>{const blob=new Blob([JSON.stringify(S,null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`kariera-${S.name.replace(/\s+/g,"-").toLowerCase()}.json`;a.click();URL.revokeObjectURL(a.href)};
$("importInput").onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{S=JSON.parse(r.result);S.seasonFlowActive=false;S.preseasonCompletedYear=null;S.budgetManagementCompletedYear=null;normalize();save();render()}catch{alert("Nieprawidłowy plik zapisu.")}};r.readAsText(f)};
const saved=load();if(saved){S=saved;S.seasonFlowActive=false;normalize();repairLegacyStuckSeason();repairMaxedMetaSave();save();render()}
