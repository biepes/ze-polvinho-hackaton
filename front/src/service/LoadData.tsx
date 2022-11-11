import { PageProps } from "components/Table/ObservacaoTable";
import api from "service/Api";

export function getData() {
  return api.get("/api/pesquisa-satisfacao/avaliacoes");
}

export function getAvaliacoes(pageable): Promise<PageProps[]> {
  return api.get("/api/pesquisa-satisfacao", pageable);
}
