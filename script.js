console.log("script carregado");
const form = document.getElementById("form-cep");
const inputCep = document.getElementById("cep");
const mensagem = document.getElementById("mensagem");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Remove tudo que não for número
  const cep = inputCep.value.replace(/\D/g, "");

  mensagem.textContent = "";
  resultado.hidden = true;

  if (cep.length !== 8) {
    mensagem.textContent = "O CEP deve ter 8 números.";
    return;
  }

  mensagem.style.color = "#555";
  mensagem.textContent = "Buscando...";

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();

    if (dados.erro) {
      mensagem.style.color = "#dc2626";
      mensagem.textContent = "CEP não encontrado.";
      return;
    }

    document.getElementById("r-cep").textContent = dados.cep;
    document.getElementById("r-rua").textContent = dados.logradouro || "-";
    document.getElementById("r-bairro").textContent = dados.bairro || "-";
    document.getElementById("r-cidade").textContent = dados.localidade;
    document.getElementById("r-estado").textContent = dados.uf;

    mensagem.textContent = "";
    resultado.hidden = false;
  } catch (erro) {
    mensagem.style.color = "#dc2626";
    mensagem.textContent = "Erro ao consultar. Verifique sua conexão.";
  }
});