import { PagedTable, Text } from "bold-ui";

interface ObservacaoTableProps {
  rows: GrauSatisfacaoObservacoes[];
  pageable;
  pageChange;
  sizeChange;
}

export interface PageProps {
  totalPages: number;
  totalElements: number;
  content: GrauSatisfacaoObservacoes[];
}

export interface GrauSatisfacaoObservacoes {
  grauSatisfacao: string;
  observacao: string;
  versao: string;
}

export function ObservacaoTable(props: ObservacaoTableProps) {
  return (
    <PagedTable<GrauSatisfacaoObservacoes>
      page={1}
      size={100}
      totalPages={100}
      totalElements={100}
      onPageChange={props.pageChange}
      onSizeChange={props.sizeChange}
      rows={props.rows}
      columns={[
        {
          header: "Grau de satisfação",
          name: "grauSatisfacao",
          render: (value) => <Text component="p">{value.grauSatisfacao}</Text>,
          style: { width: "6rem" },
        },
        {
          header: "Observação",
          name: "observacao",
          render: (value) => <Text component="p">{value.observacao}</Text>,
        },
        {
          header: "Versao",
          name: "versao",
          render: (value) => <Text component="p">{value.versao}</Text>,
          style: { width: "6rem" },
        },
      ]}
    />
  );
}
