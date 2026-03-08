---
title: 5+ Jahre alte Archivdaten Extrahieren, Bereinigen und Strukturieren
description: Wie ich Forendaten aus einem veralteten Joomla-System mit Kunena-Extension extrahiert und in eine nutzbare Struktur gebracht habe.
date: '2026-01-14'
author: Jan Mayer
authorUrl: /jan-mayer
publisher: Jan Mayer
keywords: Joomla, Kunena, Datenextraktion, DDEV, CodeIgniter, Datenmigration, Legacy-System, Azure AI Search
tags:
  - Datenmigration
  - Legacy-System
  - DDEV
  - CodeIgniter
  - Azure AI Search
image: /images/case-studies/fallstudie-joomla.png
imageTitle: Joomla Forum Datenextraktion Dashboard
client: Internes Projekt
industry: Datenmanagement
duration: 2 Tage (Extraktion), fortlaufend
status: draft
---

Ein 5 Jahre altes Joomla-Forum. Tausende Beiträge, Antworten, Nutzerprofile. Alles in einer veralteten Datenbank vergraben. Die Aufgabe: Diese Daten extrahieren, bereinigen und in eine nutzbare Struktur bringen.

## Die Herausforderung

Der Ausgangspunkt ist ein Joomla-Forum das auf 5 Jahre alter Software beruht. Die Software wurde nie aktualisiert, die Dokumentation ist lückenhaft, und moderne Export-Tools funktionieren nicht.

**Mein erstes Ziel:** Eine Relation zwischen Beitrag, User und Antwort herstellen. Klingt einfach, wurde aber schnell kompliziert.

## Das erste Hindernis: Keine Export-Funktionen

Joomla in dieser Version bietet keine brauchbaren Export-Funktionen. Man kann einen Dump erstellen, um ihn in eine neue Joomla-Instanz zu importieren. Das war aber nicht mein Ziel. Ich wollte die Rohdaten, nicht eine 1:1 Kopie des Systems.

## Das zweite Hindernis: Kunena

Auf dem veralteten Joomla lief eine ebenso veraltete Kunena-Extension. Kunena ist eine Forum-Komponente, die ihre Daten in einer eigenen Tabellenstruktur speichert.

Das Ergebnis:

- Export-Plugins wie J2xml funktionieren nicht, weil sie keine Kunena-Tabellen unterstützen
- Kunena speichert Posts in eigenen Tabellen, nutzt aber die Joomla User Table für Relationen
- Die Dokumentation zur alten Tabellenstruktur existiert praktisch nicht mehr

## Die Alternativen

Ich habe überlegt ob es nicht einfacher wäre, Playwright zu nutzen und jeden Post mit einem LLM-basierten Ruleset zu scrapen. Das alte Forum war ja noch online.

Scraping hat seinen Reiz. Einmal die HTML-Struktur definiert und es läuft zuverlässig. Aber bei Tausenden von Posts und verschachtelten Antworten? Ich habe mich für den Datenbank-Dump entschieden.

## Der MySQL-Dump

Also habe ich den kompletten MySQL-Dump gezogen. Jetzt hatte ich Rohdaten, aber keine Übersicht. 50+ Tabellen, kryptische Spaltennamen, keine Dokumentation.

Ich musste die Tabellen visualisieren und verstehen was ich überhaupt habe.

## DDEV als Prototyping-Lösung

Hier zeigt DDEV seine Stärke.

Wenn ich könnte, würde ich nur Vue, Typescript und Python schreiben. Aber nichts schlägt die Geschwindigkeit von DDEV wenn es um Prototyping mit Datenbank geht.

**15 Minuten später** hatte ich dank DDEV MCP und Claude Opus 4.5 ein funktionierendes Dashboard:

- DDEV als lokale Entwicklungsumgebung
- CodeIgniter 4 als Backend
- CodeIgniter Shield für Authentifizierung
- Tailwind CSS für das UI

Opus 4.5 hat einen Account für mich erstellt, den Joomla Datenbank-Dump importiert, alle Tabellen visualisiert und mir die Möglichkeit gegeben Tabellen zu löschen.

Jetzt kann ich anfangen das Chaos aufzuräumen.

## CSI Tabelle

Die nächste Aufgabe bestand darin, die Tabellenstruktur zu verstehen. Ich habe keinen Plan von Joomla und Co.

Ein weiterer Opus 4.5 Prompt und unser Dashboard zeigt uns Daten aller Tabellen an. Jetzt können wir mit der Detektivarbeit beginnen.

![Joomla Dashboard mit Tabellenübersicht](/images/case-studies/joomla-dashboard-tabellen.png)

Relativ schnell haben wir die Tabelle `jom25_kunena_messages` als Point of Interest identifiziert.

![Kunena Messages Tabellenstruktur](/images/case-studies/joomla-kunena-messages.png)

`parent 0` steht hierbei für den ersten Beitrag eines Forenpost. Alles mit einer parent ID verweist auf den ursprünglichen Beitrag.

## Erstes Ziel erreicht: Tabellenrelationen

Nach zwei Tagen Detektivarbeit haben wir unser erstes Ziel erreicht: Die Relation zwischen Beitrag, User und Antwort steht.

Von ursprünglich 150 Joomla-Tabellen sind nur noch 5 übrig. Der Rest war entweder irrelevant oder Systemtabellen ohne Nutzdaten.

Jetzt können wir alle User-Posts extrahieren und in eine nutzbare JSON-Struktur bringen:

![JSON Export der Forendaten](/images/case-studies/joomla-json-export.png)

## Nächste Schritte: Dataset und Evaluation

Mit den strukturierten Daten beginnt die eigentliche Arbeit:

**Dataset aufbereiten**
- Daten bereinigen und validieren
- Sample von 100 Q/A-Paaren erstellen
- Export als JSONL für Azure AI Search
- Erste Evaluation der Suchergebnisse

**Dashboard erweitern**
- UI aufräumen und optimieren
- Q/A Evaluation System für Techniker bauen
- Bewertungsmöglichkeit für Antwortqualität

## Aktueller Stand

Die Datenextraktion ist abgeschlossen. Die nächste Phase konzentriert sich auf die Datenqualität und den Aufbau eines Evaluation-Systems.
