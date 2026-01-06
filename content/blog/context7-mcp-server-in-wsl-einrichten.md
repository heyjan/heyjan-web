---
title: Context7 MCP-Server in WSL einrichten
description: Schritt-für-Schritt Anleitung - Context7 MCP-Server in WSL installieren und mit Umgebungsvariable für den API Schlüssel. Mit Code-Beispielen und FAQs...
date: '2026-01-05'
author: Jan Mayer
authorUrl: /jan-mayer
publisher: Jan Mayer
keywords: MCP, Model Context Protocol, Context7, WSL, Windows Subsystem for Linux, AI Tools, Developer Experience, Nuxt, Documentation, API Integration
tags:
  - MCP
  - WSL
  - AI Tools
  - Developer Experience
image: /images/blog/context7-mcp-wsl-mcp-json.png
imageTitle: Context7 MCP-Server Configuration in WSL
---


Wenn du mit LLMs arbeitest, kennst du das Problem: Der Vorschlag sieht korrekt aus, aber die Quelle ist veraltet oder ein Flag existiert nicht mehr. Genau hier hilft Context7; es liefert versionsspezifische Doku und Codebeispiele aus aktuellen Quellen direkt in deinen Prompt.

## Was ist Context7 und warum MCP?

Kurz gesagt: Context7 ist ein MCP-Server. MCP steht für Model Context Protocol; ein offenes Protokoll, das KI-Clients mit Tools und Kontext-Quellen verbindet.

- **Deine IDE** fragt Tools an, die von der MCP bereitgestellt werden
- **Context7** liefert passende, aktuelle Dokumentation und Beispiele zurück
- **Dein Prompt** wird mit verifiziertem Kontext angereichert

## Warum Context7 im Alltag hilft

Du sparst Zeit, weil du weniger mit veralteten Trainingsdaten kämpfst. Als Beispiel könnte ich den Wechsel von Nuxt 3 auf Nuxt 4 nennen. Die meisten Trainingsdaten beruhen immer noch auf Nuxt 3. Wenn du dann nach der neuen Verzeichnisstruktur fragst oder wissen willst, wie `app.vue` jetzt richtig eingebunden wird, bekommst du oft veraltete Antworten. Context7 zieht sich die aktuelle Nuxt 4 Doku und liefert dir exakt das, was in der neuesten Version gilt. Das spart dir das manuelle Abgleichen zwischen LLM-Ausgabe und offizieller Dokumentation.

Das merkt man besonders bei:

- **Schnelllebigen Frameworks**: Flags und APIs ändern sich schnell
- **Tooling und CLIs**: Optionen werden umbenannt oder entfernt
- **Versionsfragen**: Du brauchst Doku für eine konkrete Version

## Setup: Context7 MCP-Server in WSL

Das Setup läuft in zwei Teilen: Node.js in WSL bereitstellen, dann Context7 als MCP-Server in deiner `mcp.json` eintragen.

### Voraussetzungen in WSL

- **WSL**: Eine Linux-Distribution (z.B. Ubuntu) ist installiert
- **Node.js**: Version 18 oder neuer

Finde deine Node- und NVM-Pfade:

```bash
ls -la "$HOME/.nvm/nvm.sh"

command -v npx
```

### Context7 als Server eintragen in WSL

In vielen IDEs definierst du Server in einer Datei wie `mcp.json`. Wichtig ist die Struktur unter `mcpServers`.

Beispiel-Konfiguration ohne API-Key (WSL-Setup; ersetze Platzhalter bei Bedarf):

```json
{
  "mcpServers": {
    "context7": {
      "command": "wsl.exe",
      "args": [
        "bash",
        "-c",
        "source \"<PATH_TO_NVM_SH>\" && <PATH_TO_NPX> -y @upstash/context7-mcp"
      ],
      "env": {
        "CONTEXT7_API_KEY": "CONTEXT7_API_KEY"
      }
    }
  }
}
```

Typische Werte für die Platzhalter:

- **`<PATH_TO_NVM_SH>`**: meist `"$HOME/.nvm/nvm.sh"`
- **`<PATH_TO_NPX>`**: Ausgabe von `command -v npx` (nachdem du `source "$HOME/.nvm/nvm.sh"` ausgeführt hast)

Für diese Anleitung bleibt der API Key bewusst weg. Es gibt immer wieder Meldungen im Netz das die mcp.json versehentlich in öffentlichen Repos samt API Keys landen.

Dein API Key kommt dann in deine `.env` 


## Schnelltest: Funktioniert Context7?

Wenn dein MCP-Client läuft und die `mcp.json` geladen wurde, teste mit einer Anfrage, die eindeutig nach exakter Doku verlangt, zum Beispiel:

- **"Nutze context7 und zeig mir die Verzeichnisstruktur von der neuesten Version von Nuxt"**

Du solltest sehen, dass der Client Context7 als Tool nutzt und der Kontext direkt aus der Dokumentation kommt.

## Fazit

Wenn Context7 einmal sauber als MCP-Server eingebunden ist, wird dein Workflow weniger fehleranfällig, Dependencies werden korrekter eingebunden und auf Kompatibilität überprüft.

**Nächster Schritt:** Du solltest Context7 in deinen Regeln definieren z.B: für das Dependency Management.

```
---
title: Development Standards
inclusion: always
---

# Development Standards

## Dependency Management
- Use latest stable versions of all libraries and dependencies
- Leverage Context7 MCP server to verify compatibility before adding dependencies
```

## Häufig gestellte Fragen

### Kostet Context7 wirklich nichts?

Es gibt einen **Free-Plan**. Er ist für Einzelpersonen gedacht und funktioniert ohne Bezahlung. Einschränkungen betreffen typischerweise Limits und den Zugriff auf bestimmte Features.

### Wie teuer ist der Pro-Plan?

Der **Pro-Plan** kostet **€7 pro Seat und Monat**. Für private Repositories können zusätzlich Parsing-Kosten anfallen (tokenbasiert).

### Was ist der Unterschied zwischen Free, Pro und Enterprise?

- **Free**: Für Solo-Nutzung und öffentliche Inhalte
- **Pro**: Für Teams und private Repositories
- **Enterprise**: Für große Organisationen mit erweiterten Anforderungen (z.B. Compliance, SSO, individuelle Limits)

## Weiterführende Links

- [Upstash Context7 auf GitHub](https://github.com/upstash/context7 "View Context7 on GitHub")
- [Context7 Pläne und Pricing](https://context7.com/plans "Context7 Plans and Pricing")
- [Context7 Doku zu Plänen und Pricing](https://context7.com/docs/plans-pricing "Context7 Documentation: Plans and Pricing")

