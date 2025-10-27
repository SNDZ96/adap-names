# ADAP A03 – Method Properties Analysis
**Author:** Sauan Derbaz  
**FAU Email:** sauan.mahmud@fau.de  

---

## Ziel der Aufgabe
In dieser Analyse werden die Methoden der Klasse `Name` aus Aufgabe B01 untersucht.  
Dabei werden sie hinsichtlich ihrer **Method Properties** (z. B. pure, idempotent, side-effect-free) klassifiziert.

---

## Übersicht der Methoden und Eigenschaften

| Methode | Method-Type | Properties | Begründung |
|----------|--------------|-------------|-------------|
| `constructor()` | initialize-method | state-changing, deterministic | Initialisiert den Objektzustand anhand übergebener Komponenten |
| `mask()` | helper-method | pure, deterministic, side-effect-free | Keine Änderung am Objekt, Ergebnis hängt nur von Parametern ab |
| `unmask()` | helper-method | pure, deterministic, side-effect-free | Entfernt Maskierungen ohne Zustand zu verändern |
| `asString()` | conversion-method | pure, deterministic, side-effect-free | Liest nur Daten und wandelt sie um |
| `asDataString()` | conversion-method | pure, deterministic, side-effect-free | Gibt eine neue String-Repräsentation zurück, verändert nichts |
| `getComponent()` | get-method | side-effect-free, deterministic | Gibt Wert zurück, verändert nichts |
| `setComponent()` | set-method | state-changing, idempotent, deterministic | Überschreibt denselben Index immer gleich |
| `getNoComponents()` | get-method | side-effect-free, deterministic | Zählt Komponenten, verändert nichts |
| `insert()` | command-method | state-changing, not idempotent, deterministic | Jeder Aufruf verändert Länge und Positionen |
| `append()` | command-method | state-changing, not idempotent, deterministic | Fügt neue Komponente hinzu |
| `remove()` | command-method | state-changing, not idempotent, deterministic | Entfernt Element – wiederholter Aufruf verändert Ergebnis |

---

## Fazit
Die Klasse `Name` enthält sowohl **pure** als auch **state-changing** Methoden.  
Während die Helper- und Get-Methoden keine Seiteneffekte verursachen,  
ändern Set- und Command-Methoden aktiv den Zustand des Objekts.
