# 🏢 Beförderungs- und Entlohnungsprozess - IST-Analyse

[![Camunda](https://img.shields.io/badge/Camunda-8.6-orange)](https://camunda.com/)
[![BPMN](https://img.shields.io/badge/BPMN-2.0-blue)](https://www.bpmn.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

> Digitale Modellierung und Analyse eines Beförderungs- und Entlohnungsprozesses in Camunda 8 zur Identifikation von Prozessineffizienzen und Optimierungspotenzialen.

---

## 📋 Über das Projekt

Dieses Repository dokumentiert den **IST-Zustand** eines Beförderungs- und Entlohnungsprozesses eines IT-Unternehmens mit über 2000 Mitarbeitenden. Der Prozess wurde in **BPMN 2.0** modelliert und in **Camunda 8** implementiert, um Schwachstellen wie:

- 🕐 Lange Durchlaufzeiten (8-16 Wochen)
- 📧 Medienbrüche zwischen Excel, E-Mail und HR-Systemen
- 🔍 Mangelnde Transparenz für Mitarbeitende
- ⚠️ Unklare Verantwortlichkeiten

systematisch zu analysieren und als Grundlage für einen optimierten SOLL-Prozess zu dienen.

---

## ✨ Features

- ✅ Vollständige BPMN 2.0 Modellierung mit Camunda 8
- ✅ Message Events mit Correlation Keys
- ✅ User Tasks mit Form-Referenzen
- ✅ Send Tasks mit Job Types
- ✅ Call Activity für komplexe Subprozesse
- ✅ Lokale Ausführung mit Docker
- ✅ Node.js Worker für automatisierte Tasks

---

## 🚀 Quick Start

### Voraussetzungen

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node.js](https://nodejs.org/) (v18+)
- [Camunda Desktop Modeler](https://camunda.com/download/modeler/)

### Installation

1. **Repository klonen**
   ```bash
   git clone https://github.com/dein-username/befoerderungsprozess-ist.git
   cd befoerderungsprozess-ist
   ```

2. **Camunda 8 Infrastruktur starten**
   ```bash
   docker-compose up -d
   ```

3. **Worker Dependencies installieren**
   ```bash
   cd workers
   npm install
   ```

4. **Worker starten**
   ```bash
   npm start
   ```

5. **Prozess deployen**
   - Öffne `processes/IST_PROZESS.bpmn` im Camunda Modeler
   - Deploy auf `http://localhost:26500`

---

## 🎯 Verwendung

### Camunda Operate (Prozess-Überwachung)
```
http://localhost:8081
Login: demo / demo
```

### Camunda Tasklist (User Tasks)
```
http://localhost:8082
Login: demo / demo
```

### Prozess starten
```bash
zbctl create instance IST_PROZESS \
  --address localhost:26500 \
  --insecure \
  --variables '{"mitarbeiterId": "MA123", "befoerderungId": "BF001"}'
```

---

## 📁 Projektstruktur

```
.
├── docker-compose.yml          # Camunda 8 Infrastruktur
├── processes/
│   └── IST_PROZESS.bpmn       # BPMN Prozessmodell
├── workers/
│   ├── package.json           # Node.js Dependencies
│   └── worker.js              # Job Worker
└── README.md
```

---

## 🔧 Konfiguration

### Message Events
Alle Message Events nutzen den kombinierten Correlation Key:
```javascript
mitarbeiterId + "_" + befoerderungId
```

### User Tasks
10 User Tasks mit Form-Referenzen (Platzhalter für SOLL-Prozess)

### Send Tasks
13 Send Tasks mit spezifischen Job Types:
- `send-application-to-hr-bp`
- `send-contract-to-employee`
- `notify-hr-rejection`
- u.v.m.

---

## 📊 Prozess-Highlights

| Phase | Aktivitäten | Durchschnittliche Dauer |
|-------|-------------|-------------------------|
| **Initiierung** | Kandidatenidentifikation, Antragserstellung | 1-2 Wochen |
| **Prüfung** | HR-Prüfung, C&B-Bewertung, GL-Abstimmung | 4-8 Wochen |
| **Umsetzung** | Vertragserstellung, Systemaktualisierung | 3-6 Wochen |

---

## 🛠️ Troubleshooting

**Services laufen nicht?**
```bash
docker-compose ps
docker logs zeebe
```

**Worker verbindet nicht?**
```bash
# Port prüfen
telnet localhost 26500
```

**Neustart:**
```bash
docker-compose restart
```

---

## 📚 Dokumentation

Die vollständige Prozessanalyse inkl. Stakeholder-Analyse, Root-Cause-Analyse und Waste Elimination ist in der Projektdokumentation verfügbar.

---

## 🤝 Beitragen

Dieses Projekt dient primär der akademischen Analyse. Verbesserungsvorschläge sind dennoch willkommen:

1. Fork das Repository
2. Erstelle einen Feature Branch
3. Committe deine Änderungen
4. Pushe zum Branch
5. Öffne einen Pull Request

---


<p align="center">
  <i>Erstellt im Rahmen eines Business Process Management Projekts</i>
</p>
```
