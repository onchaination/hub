---
schema: 1
title: "Qué controla una cartera"
description: "Distingue la interfaz, la dirección pública, las claves de firma y la copia de recuperación."
updated: 2026-09-16
---

Empieza con [blockchain](../blockchain/en.md).

Una cartera es una interfaz para consultar cuentas y autorizar acciones. Los activos se registran en la red. Instalar otra cartera compatible no los mueve: una transferencia requiere un cambio autorizado en los registros de la red.

## Para qué sirve cada elemento

| Elemento | Función | ¿Se comparte? |
| --- | --- | --- |
| Dirección pública | Identifica una cuenta o destino | Cuando sea necesario; considera la privacidad |
| Clave privada | Autoriza acciones de una cuenta controlada por una clave | Nunca |
| Frase semilla o de recuperación | Recrea claves en carteras compatibles | Nunca |
| Contraseña de la aplicación o PIN | Desbloquea una aplicación o dispositivo | Nunca; normalmente no sustituye la recuperación |
| Firma | Demuestra autorización sobre datos concretos | Solo después de entender qué permite |

No todas las carteras usan una frase semilla. Las cuentas inteligentes pueden usar varios propietarios, claves de acceso o servicios de recuperación. Aprende las reglas reales: una pantalla de inicio de sesión familiar no garantiza recuperar el acceso.

## La custodia implica responsabilidad

En un servicio con custodia, el proveedor controla las firmas y el acceso según sus reglas. Con autocustodia, controlas las claves o permisos y debes proteger la recuperación. Un teléfono perdido puede reemplazarse; un método de recuperación perdido puede no tener sustituto.

Ejemplo: una cartera de solo lectura muestra una dirección y su saldo, pero no puede gastar. Ver y controlar son capacidades distintas.

> [!WARNING]
> Ningún agente de soporte necesita tu clave privada o frase de recuperación. Quien tenga ese secreto podría tomar el control sin tu dispositivo ni tu PIN.

Antes de depositar, pregunta quién puede autorizar una transferencia, quién puede cambiar esas reglas y cómo recuperarías el acceso si fallara el dispositivo.

## Fuentes

- [Ethereum: carteras](https://ethereum.org/en/wallets/)
- [Ethereum: seguridad](https://ethereum.org/en/security/)
