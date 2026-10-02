export type ErrosInscricao = Partial<
  Record<
    "nome" | "email" | "telemovel" | "comunidade" | "maioridade" | "consentimento",
    string
  >
>;

export type DadosInscricao = {
  nome: string;
  email: string;
  telemovel: string;
  comunidade: boolean;
  maioridade: boolean;
  consentimento: boolean;
  empresa: string;
};

export function texto(valor: unknown, limite: number): string {
  if (typeof valor !== "string") return "";
  return valor.slice(0, limite);
}

export function validarInscricao(dados: DadosInscricao): ErrosInscricao {
  const erros: ErrosInscricao = {};
  const nome = dados.nome.replace(/\s+/g, " ").trim();

  if (nome.length < 2 || !/\p{L}/u.test(nome)) {
    erros.nome = "Escreve o teu nome.";
  } else if (nome.length > 120 || !/^[\p{L}\s'.’-]+$/u.test(nome)) {
    erros.nome = "Usa o nome com letras, sem números.";
  }

  const email = dados.email.trim().toLowerCase();
  if (email.length > 160 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    erros.email = "Esse email não parece válido.";
  }

  const telemovel = dados.telemovel.trim();
  const digitos = telemovel.replace(/\D/g, "");
  if (
    telemovel.length > 24 ||
    /[^\d\s()+.-]/.test(telemovel) ||
    digitos.length < 9 ||
    digitos.length > 15
  ) {
    erros.telemovel = "Indica um telemóvel válido, com indicativo se for preciso.";
  }

  if (!dados.comunidade) {
    erros.comunidade = "Este encontro é só para pessoas da comunidade.";
  }
  if (!dados.maioridade) {
    erros.maioridade = "É preciso confirmar que tens 18 anos ou mais.";
  }
  if (!dados.consentimento) {
    erros.consentimento =
      "Precisamos do teu consentimento para enviar estes dados aos organizadores.";
  }

  return erros;
}

export function normalizar(dados: DadosInscricao) {
  return {
    nome: dados.nome.replace(/\s+/g, " ").trim(),
    email: dados.email.trim().toLowerCase(),
    telemovel: dados.telemovel.trim(),
  };
}
