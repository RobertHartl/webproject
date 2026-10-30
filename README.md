<!-- Gruppenname: WI_A_Gruppe_5 -->
# Karteikarten-Lernsystem
## Projektidee
Ein Karteikarten-Lernsystem nach dem Leitner-Prinzip: Karten werden nach
richtiger Beantwortung eine Box weiter befördert und dadurch seltener
abgefragt, bei falscher Beantwortung fallen sie zurück in Box 1.
Statt mit echten Kalenderdaten zu rechnen, zählt die Anwendung Lernsessions.
## Startanleitung
`index.html` direkt im Browser öffnen. Alternativ lokaler Server:
python -m http.server
und anschließend `http://localhost:8000` im Browser öffnen.
## Umgesetzte Funktionen
- Karten anlegen und löschen (Kategorie, Frage, Antwort)
- Lernsession mit fälligen Karten und explizitem Button zum Sessionstart
- Umdrehen per Klick/Tastatur; Bewertung erst nach dem Umdrehen möglich
- Leitner-Box-Logik (Intervalle in Sessions: 0, 1, 3, 6, 10)
- Statistik-Dashboard: Karten pro Box (Box 1 bis Box 5), Erfolgsquote
- Kategorie-Filter in der Statistik
- Persistenz über localStorage inkl. Fehlerbehandlung
- Responsives Layout (getestet ab ca. 375 px und ab 1024 px)
## Hinweise zur Logik
- Navigation in die Ansicht "Lernen" startet keine Session.
- Nur der Button "Session starten" erhöht den Session-Zähler,
und zwar pro Start genau um 1.
- Eine falsch beantwortete Karte fällt auf Box 1 und ist ab der
nächsten Session wieder fällig, nicht noch einmal in derselben.
- Die Erfolgsquote gilt für alle Bewertungen und ist vom
Kategorie-Filter unabhängig.
- Die Kategorie ist ein optionales Feld.
## Bekannte Einschränkungen
- Eine laufende Session geht beim Neuladen der Seite verloren; der
Session-Zähler und die Karten bleiben gespeichert.
Karteikarten-Lernsystem – Bau-Reihenfolge (korrigiert) – Seite 22
- Karten können nicht bearbeitet, nur gelöscht werden.
- Die Daten liegen nur im Browser (localStorage) des jeweiligen Geräts.
## Technik
Reines HTML, CSS und JavaScript ohne Frameworks oder Bibliotheken.
## Aufgabenverteilung
A: Speichern/Laden, Validierung, Kartenverwaltung, Navigation.
B: HTML-Struktur, Design.
C: Leitner-Logik, Lernsession.
D: Grid, Flip-Karte, Statistik, Responsive.