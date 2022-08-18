function getCEP(value) {
  const response = fetch(`https://viacep.com.br/ws/${value}/json/`)
    .then((res) => res.json())
    .then((res) => res)
    .catch((erro) => erro);
  return response;
}

const input = document.getElementById("text");
const btnSearch = document.querySelector("button");
btnSearch.addEventListener("click", searchCEP);

async function searchCEP(event) {
  event.preventDefault();
  const result = await getCEP(input.value);
  input.value = "";

  listInfos(result);
}

const sectionInfos = document.createElement("section");

function listInfos(info) {
  sectionInfos.innerHTML = "";
  const template = createTemplate(info);
  document.body.appendChild(template);
}

function createTemplate(info) {
  const divCEP = document.createElement("div");
  const paragrafoCEP = document.createElement("p");
  const spanCEP = document.createElement("span");
  const divBairro = document.createElement("div");
  const paragrafoBairro = document.createElement("p");
  const spanBairro = document.createElement("span");
  const divLocalidade = document.createElement("div");
  const paragrafoLocalidade = document.createElement("p");
  const spanLocalidade = document.createElement("span");
  const divLogradouro = document.createElement("div");
  const paragrafoLogradouro = document.createElement("p");
  const spanLogradouro = document.createElement("span");
  const divUF = document.createElement("div");
  const paragrafoUF = document.createElement("p");
  const spanUF = document.createElement("span");

  sectionInfos.classList.add("infos");
  divCEP.classList.add("infos__div");
  divBairro.classList.add("infos__div");
  divLocalidade.classList.add("infos__div");
  divLogradouro.classList.add("infos__div");
  divUF.classList.add("infos__div");

  paragrafoCEP.innerText = "CEP:";
  paragrafoLogradouro.innerText = "Endereço:";
  paragrafoBairro.innerText = "Bairro:";
  paragrafoLocalidade.innerText = "Localidade:";
  paragrafoUF.innerText = "UF:";

  if (
    info.cep === undefined &&
    info.logradouro === undefined &&
    info.bairro === undefined &&
    info.localidade === undefined &&
    info.uf === undefined
  ) {
    spanCEP.innerText = "Não existe";
    spanLogradouro.innerText = "Não existe";
    spanBairro.innerText = "Não existe";
    spanLocalidade.innerText = "Não existe";
    spanUF.innerText = "Não existe";
  } else {
    spanCEP.innerText = info.cep;
    spanLogradouro.innerText = info.logradouro;
    spanBairro.innerText = info.bairro;
    spanLocalidade.innerText = info.localidade;
    spanUF.innerText = info.uf;
  }

  divCEP.append(paragrafoCEP, spanCEP);
  divLogradouro.append(paragrafoLogradouro, spanLogradouro);
  divBairro.append(paragrafoBairro, spanBairro);
  divLocalidade.append(paragrafoLocalidade, spanLocalidade);
  divUF.append(paragrafoUF, spanUF);
  sectionInfos.append(divCEP, divLogradouro, divBairro, divLocalidade, divUF);

  return sectionInfos;
}
