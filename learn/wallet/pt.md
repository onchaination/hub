---
schema: 1
title: "O que uma carteira controla"
description: "Diferencie a interface, o endereço público, as chaves de assinatura e o backup de recuperação."
updated: 2026-09-16
---

Comece com [blockchain](../blockchain/en.md).

Uma carteira é uma interface para consultar contas e autorizar ações. Os ativos ficam registrados na rede. Instalar outra carteira compatível não os movimenta: uma transferência exige uma alteração autorizada nos registros da rede.

## Para que serve cada elemento

| Elemento | Função | Pode compartilhar? |
| --- | --- | --- |
| Endereço público | Identifica uma conta ou destino | Quando necessário; considere a privacidade |
| Chave privada | Autoriza ações de uma conta controlada por chave | Nunca |
| Frase-semente ou de recuperação | Recria chaves em carteiras compatíveis | Nunca |
| Senha do aplicativo ou PIN | Desbloqueia um aplicativo ou dispositivo | Nunca; geralmente não substitui o backup |
| Assinatura | Comprova autorização sobre dados específicos | Somente após entender o que permite |

Nem toda carteira usa uma frase-semente. Contas inteligentes podem usar vários proprietários, chaves de acesso ou serviços de recuperação. Entenda as regras reais: uma tela de login conhecida não garante a recuperação.

## Custódia exige responsabilidade

Em um serviço custodial, o provedor controla as assinaturas e o acesso conforme suas regras. Na autocustódia, você controla chaves ou permissões e precisa proteger a recuperação. Um celular perdido pode ser substituído; um método de recuperação perdido pode não ter substituto.

Exemplo: uma carteira somente de leitura mostra endereço e saldo, mas não pode gastar. Visualizar e controlar são capacidades diferentes.

Antes de depositar, pergunte quem pode autorizar uma transferência, quem pode mudar essas regras e como você recuperaria o acesso se o dispositivo falhasse. Nunca entregue uma chave privada ou frase de recuperação a alguém do suporte.

## Fontes

- [Ethereum: carteiras](https://ethereum.org/en/wallets/)
- [Ethereum: segurança](https://ethereum.org/en/security/)
