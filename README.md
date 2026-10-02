# Love Temple

Página de inscrição do primeiro Love Temple: 13 de outubro de 2026, das 19h às 23h, quinze lugares, só para a comunidade. O texto está em português de Portugal. O pagamento é um link Stripe. O site não usa cookies.

## Correr em local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre [http://127.0.0.1:43123](http://127.0.0.1:43123).

## Pagamento

Em `.env.local`:

```bash
STRIPE_PAYMENT_LINK=https://buy.stripe.com/o-teu-link
CONTACT_EMAIL=privacidade@o-teu-dominio.pt
```

O link tem de ser `https` e estar num domínio `stripe.com` (os Payment Links vivem em `buy.stripe.com`). Enquanto a variável estiver vazia, a inscrição é guardada na mesma e a página explica que o pagamento ainda não abriu.

`CONTACT_EMAIL` aparece na política de privacidade (`/privacidade`) como contacto para pedidos de acesso, correção ou apagamento.

## Inscrições

Cada inscrição fica em `data/inscricoes.json`, na máquina onde o servidor corre. O ficheiro tem nome, email e telemóvel. Não entra no git.

Este formato serve um servidor com disco persistente. Num alojamento em que o disco é apagado a cada deploy, as inscrições desaparecem — nesse caso é preciso outro sítio para as guardar.

Há quinze lugares. Quando o ficheiro chega a quinze, o formulário fecha. Um email não se inscreve duas vezes.

## Privacidade

Não há cookies, analytics, sessão de login nem armazenamento no browser. O aviso no fundo da página fecha enquanto a visita continua; se a página for atualizada, volta a aparecer. A política está em `/privacidade`.

As páginas trazem `noindex`: o link funciona para quem o receber, e não se destina a motores de busca.

O nome legal dos organizadores está em `src/lib/evento.ts`, no campo `responsavel`. Convém substituir pela entidade real antes de abrir inscrições.
