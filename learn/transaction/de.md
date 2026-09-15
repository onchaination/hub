---
schema: 1
title: Was passiert, wenn du eine Transaktion sendest?
description: Verfolge eine Transaktion von deiner Wallet bis in einen Block und verstehe, was eine Bestätigung aussagt.
updated: 2026-09-13
---

Eine Transaktion ist eine Anweisung, den Zustand einer Blockchain zu ändern. Sie kann einen Vermögenswert übertragen oder einen Smart Contract aufrufen. Deine Wallet bereitet sie vor; das Netzwerk prüft und verarbeitet sie.

## Von der Absicht zur Bestätigung

1. **Vorbereiten.** Deine Wallet stellt Empfänger, Betrag, Netzwerk und gegebenenfalls Vertragsaufrufe zusammen. Sie zeigt eine geschätzte Netzwerkgebühr an.
2. **Prüfen und signieren.** Du autorisierst die Anweisung mit deinem Schlüssel. Der private Schlüssel bleibt in deiner Wallet; andere können die Signatur prüfen.
3. **Senden.** Die signierte Transaktion wird an das Netzwerk übermittelt. Ihre Kennung ermöglicht die Suche: ein Hash bei Ethereum oder die erste Signatur bei Solana.
4. **Aufnehmen.** Ein Blockproduzent nimmt sie in einen Block auf. Das Netzwerk führt die Anweisungen nach seinen Regeln aus.
5. **Bestätigen.** Der Explorer zeigt das Ergebnis. Wie sicher die Aufnahme ist, hängt von den Bestätigungs- und Finalitätsregeln der jeweiligen Blockchain ab.

Die Transaktionskennung ist wie eine Sendungsnummer, kein Beleg für eine erfolgreiche Zustellung.

## Ein konkretes Beispiel

Du sendest einen kleinen Betrag des nativen Vermögenswerts an eine zweite Wallet unter deiner Kontrolle. Vor dem Signieren prüfst du Adresse, Netzwerk, Betrag und Gebühr. Danach kannst du mit der Kennung [die Transaktion prüfen](../../skills/check-transaction/en.md).

Eine Kennung bedeutet, dass die Transaktion identifizierbar ist. **Erfolgreich** bedeutet, dass die Ausführung erfolgreich war. Du musst trotzdem prüfen, ob Empfänger und Vermögenswert deiner Absicht entsprechen.

## Ethereum und Solana: gleiche Fragen, andere Details

| Prüfung | Ethereum | Solana |
| --- | --- | --- |
| Nativer Vermögenswert für Gebühren | ETH | SOL |
| Kennung für die Suche | Transaktionshash | Erste Transaktionssignatur |
| Ausführung | Übertragung oder Vertragsaufruf | Eine oder mehrere Anweisungen an Programme |
| Finalität | Aufnahme und Finalitätszustand der Blockchain | Bestätigungsstufen processed, confirmed oder finalized |

ETH auf Ethereum und SOL auf Solana zu senden sind getrennte Vorgänge in getrennten Netzwerken. Gleiche Token-Namen machen Vermögenswerte nicht austauschbar. Prüfe bei Solana auch das Ausführungsergebnis: Die Bestätigungsstufe allein bedeutet nicht, dass die Ausführung erfolgreich war.

## Drei wichtige Unterschiede

| Anzeige | Bedeutung |
| --- | --- |
| Ausstehend | Noch nicht aufgenommen; die Transaktion kann verzögert werden oder verworfen werden. |
| Fehlgeschlagen / zurückgesetzt | Die Ausführung war nicht erfolgreich. Eine aufgenommene, fehlgeschlagene Transaktion kann trotzdem Gebühren kosten. |
| Erfolgreich | Die Ausführung war erfolgreich. Das beweist weder die Vertrauenswürdigkeit des Empfängers noch die Sicherheit eines Vertrags. |

> [!TIP]
> Netzwerkgebühren kommen zum gesendeten Betrag hinzu. Halte genug vom Gebührenvermögenswert bereit. Der [Gebührenrechner](../../tools/network-fee-calculator/en.md) erklärt die Berechnung.

<details>
<summary>❓ Sendet jede Signatur eine Transaktion?</summary>

Nein. Wallets können auch Nachrichten signieren. Manche Signaturen erlauben spätere Aktionen, ohne sofort eine Transaktion zu senden. Lies die angeforderte Berechtigung, nicht nur die Beschriftung der Schaltfläche.

</details>

## Prüfe dein Verständnis

Du hast eine Transaktionskennung, aber der Explorer zeigt „ausstehend“. Hat der Empfänger das Geld sicher erhalten? **Nein.** Warte auf die Aufnahme und prüfe das Ergebnis im richtigen Netzwerk.

Für einen vorsichtigen ersten Versuch lies [Eine erste Übertragung leichter überprüfbar machen](../../strategies/first-transfer/en.md).

## Quellen

- [Ethereum: Transaktionen](https://ethereum.org/en/developers/docs/transactions/)
- [Ethereum: Gas und Gebühren](https://ethereum.org/en/developers/docs/gas/)
- [Solana: Transaktionen](https://solana.com/docs/core/transactions)
- [Solana: Transaktionsstatus](https://solana.com/docs/rpc/http/getsignaturestatuses)
