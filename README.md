# Love Temple

Página de inscrição do primeiro Love Temple: 13 de outubro de 2026, das 19h às 23h, quinze lugares, só para a comunidade. O texto está em português de Portugal. O pagamento é um link Stripe. O site não usa cookies.

A página é estática e publica-se no GitHub Pages, no teu domínio. O formulário não fica guardado no GitHub: o browser envia-o por email aos organizadores, através do [FormSubmit](https://formsubmit.co).

## Correr em local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre [http://127.0.0.1:43123](http://127.0.0.1:43123).

`npm run build` escreve o site em `out/`.

## Construir e publicar no GitHub

O repositório remoto do GitHub chama-se `github` (não `origin`). Em cada alteração:

```bash
# 1. Confirma que o site constrói
npm run build

# 2. Vê o que mudou
git status
git diff

# 3. Adiciona, faz commit e envia para a main no GitHub
git add -A
git commit -m "Descreve a alteração em uma frase."
git push github main
```

O push para `main` dispara o workflow em `.github/workflows/pages.yml`, que volta a construir e publica no GitHub Pages. Não é preciso fazer commit da pasta `out/` — o Actions gera-a no servidor.

Se ainda não tiveres o remoto configurado:

```bash
git remote add github https://github.com/USERNAME/love-temple.git
git push -u github main
```

Substitui `USERNAME` pelo teu utilizador ou organização no GitHub.

## O que configurar antes de abrir inscrições

Em `.env.local`, e nos segredos do repositório GitHub com os mesmos nomes:

```bash
INSCRICAO_EMAIL=inscricoes@o-teu-dominio.pt
STRIPE_PAYMENT_LINK=https://buy.stripe.com/o-teu-link
CONTACT_EMAIL=privacidade@o-teu-dominio.pt
```

- `INSCRICAO_EMAIL` é a caixa que recebe cada inscrição. Fica visível no código da página, porque o browser precisa do endereço para enviar o formulário. Na primeira vez, o FormSubmit manda um email de ativação: sem esse clique, as inscrições não chegam.
- `STRIPE_PAYMENT_LINK` tem de ser `https` e estar num domínio `stripe.com` (os Payment Links vivem em `buy.stripe.com`). Enquanto estiver vazio, a inscrição segue na mesma e a página diz que o pagamento ainda não abriu.
- `CONTACT_EMAIL` aparece em `/privacidade` para pedidos de acesso, correção ou apagamento. Se ficar vazio, usa-se o `INSCRICAO_EMAIL`.

O nome legal dos organizadores está em `src/lib/evento.ts`, no campo `responsavel`. Substitui pela entidade real.

Os quinze lugares não se contam sozinhos. Quando a lista fechar, muda `inscricoesAbertas` para `false` nesse ficheiro e publica outra vez.

## Publicar no GitHub Pages

O site tem de estar num repositório GitHub teu. O fluxo está em `.github/workflows/pages.yml` e corre em cada push para `main`.

1. No repositório: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Em **Settings → Secrets and variables → Actions**, cria os segredos `INSCRICAO_EMAIL`, `STRIPE_PAYMENT_LINK` e `CONTACT_EMAIL`.
3. No mesmo sítio, em **Variables**, cria `CUSTOM_DOMAIN` com o domínio que já tens, sem `https://` e sem barra. Exemplos: `lovetemple.pt` ou `www.lovetemple.pt`. O workflow escreve esse valor no ficheiro `CNAME` de cada publicação. Sem esta variável, o Pages fica no endereço `*.github.io`.
4. Faz push de `main`. O separador **Actions** mostra a publicação. No fim, **Settings → Pages** indica o endereço.

O domínio não fica gravado no código. Cada publicação volta a escrever o `CNAME` a partir da variável, para o Pages não o perder.

## Ligar o domínio

No painel de DNS do domínio, aponta para o GitHub. `USERNAME` é o utilizador ou a organização dona do repositório.

Domínio de raiz (`exemplo.pt`), quatro registos `A` no nome `@`:

| Tipo | Nome | Valor |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

E, se quiseres IPv6, quatro `AAAA` no mesmo nome:

| Tipo | Nome | Valor |
| --- | --- | --- |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |

Subdomínio (`www` ou outro), um `CNAME`:

| Tipo | Nome | Valor |
| --- | --- | --- |
| CNAME | `www` | `USERNAME.github.io` |

Se o domínio de raiz e o `www` tiverem estes registos, o GitHub redireciona um para o outro conforme o valor de `CUSTOM_DOMAIN`. Remove outros `A`, `AAAA` ou `CNAME` no mesmo nome: costumam impedir o certificado.

Depois de o DNS propagar, em **Settings → Pages** confirma o domínio e marca **Enforce HTTPS**. O certificado é emitido pelo GitHub e pode demorar até cerca de uma hora. Convém também verificar o domínio na conta GitHub, para mais ninguém o usar num Pages.

## Privacidade

Não há cookies, analytics, sessão de login nem armazenamento no browser. O aviso no fundo da página fecha enquanto a visita continua; se a página for atualizada, volta a aparecer. A política está em `/privacidade`.

As páginas trazem `noindex`: o link funciona para quem o receber, e não se destina a motores de busca.
