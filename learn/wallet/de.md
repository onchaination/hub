---
schema: 1
title: "Was eine Wallet kontrolliert"
description: "Unterscheide Oberfläche, öffentliche Adresse, Signierschlüssel und Wiederherstellung."
updated: 2026-09-16
---

Beginne mit [Blockchain](../blockchain/en.md).

Eine Wallet ist eine Oberfläche zum Anzeigen von Konten und Autorisieren von Aktionen. Die Vermögenswerte sind im Netzwerk verzeichnet. Die Installation einer anderen kompatiblen Wallet bewegt sie nicht: Eine Übertragung erfordert eine autorisierte Änderung der Netzwerkdaten.

## Welches Geheimnis wofür gedacht ist

| Element | Zweck | Weitergeben? |
| --- | --- | --- |
| Öffentliche Adresse | Bezeichnet ein Konto oder Empfangsziel | Bei Bedarf; Privatsphäre beachten |
| Privater Schlüssel | Autorisiert Aktionen eines schlüsselgesteuerten Kontos | Niemals |
| Seed- oder Wiederherstellungsphrase | Stellt Schlüssel in kompatiblen Wallets wieder her | Niemals |
| App-Passwort oder Geräte-PIN | Entsperrt eine lokale App oder ein Gerät | Niemals; ersetzt meist keine Sicherung |
| Signatur | Belegt eine Autorisierung für bestimmte Daten | Erst wenn klar ist, was sie erlaubt |

Nicht jede Wallet verwendet eine Seed-Phrase. Smart Accounts können mehrere Eigentümer, Passkeys oder Wiederherstellungsdienste nutzen. Lerne die tatsächlichen Regeln: Eine vertraute Anmeldemaske garantiert keine Wiederherstellung.

## Verwahrung bedeutet Verantwortung

Bei einem Verwahrungsdienst kontrolliert der Anbieter Signaturen und Zugang nach seinen Regeln. Bei Selbstverwahrung kontrollierst du Schlüssel oder Kontoberechtigungen und musst die Wiederherstellung schützen. Ein verlorenes Telefon lässt sich möglicherweise ersetzen; ein verlorener Wiederherstellungsweg nicht immer.

Beispiel: Eine Wallet mit reinem Lesezugriff zeigt Adresse und Guthaben, kann aber nichts ausgeben. Sichtbarkeit und Kontrolle sind unterschiedliche Fähigkeiten.

Kläre vor einer Einzahlung: Wer kann eine Übertragung autorisieren, wer kann diese Regeln ändern und wie würdest du bei einem Geräteausfall wieder Zugang erhalten? Gib privaten Schlüssel oder Wiederherstellungsphrase niemals an einen Supportmitarbeiter weiter.

## Quellen

- [Ethereum: Wallets](https://ethereum.org/en/wallets/)
- [Ethereum: Sicherheit](https://ethereum.org/en/security/)
