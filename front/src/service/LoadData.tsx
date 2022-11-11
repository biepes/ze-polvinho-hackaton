import api from "service/Api";

export function getData() {
  return api.get("/api/pesquisa-satisfacao/avaliacoes");
}

export function getAvaliacoes(pageable) {
  return api.get("/api/pesquisa-satisfacao", pageable);
}
