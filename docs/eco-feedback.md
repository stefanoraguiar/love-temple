# Feedback anónimo (`/eco/`)

Página não listada no menu. Partilha o link à mão: `https://O-TEU-DOMINIO/eco/`.

As respostas vão para uma Google Sheet tua, através de um Web App do Google Apps Script.

## Colunas da Sheet

Na primeira linha da folha (aba ativa):

| A | B | C | D | E | F | G |
| --- | --- | --- | --- | --- | --- | --- |
| timestamp | geral | seguranca | acordos | ritmo | indicaria | comentario |

## Apps Script

1. Abre a Sheet → **Extensões → Apps Script**.
2. Apaga o código de exemplo e cola o script abaixo.
3. **Implementar → Nova implementação → Tipo: Aplicação Web**.
4. Executar como: **Eu**. Quem tem acesso: **Qualquer pessoa**.
5. Copia o URL da implementação.
6. Guarda-o em `.env.local` e no segredo GitHub `FEEDBACK_ENDPOINT`.

```javascript
// Cole isto no editor Apps Script ligado à Sheet.
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "timestamp",
        "geral",
        "seguranca",
        "acordos",
        "ritmo",
        "indicaria",
        "comentario",
      ]);
    }

    const escala = (valor) => {
      const n = Number(valor);
      return n >= 1 && n <= 5 ? n : "";
    };

    sheet.appendRow([
      new Date().toISOString(),
      escala(data.geral),
      escala(data.seguranca),
      escala(data.acordos),
      escala(data.ritmo),
      escala(data.indicaria),
      String(data.comentario || "").slice(0, 2000),
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (erro) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, erro: String(erro) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput("ok");
}
```

Depois de mudares o script, volta a **Implementar → Gerir implementações → Editar → Nova versão**.
