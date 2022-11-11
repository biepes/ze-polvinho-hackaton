import { PagedTable, Text } from "bold-ui";

interface ObservacaoTableProps {
  rows: GrauSatisfacaoObservacoes[];
  pageable;
  pageChange;
  sizeChange;
  totalPages;
  totalElements;
}

export interface PageProps {
  totalPages: number;
  totalElements: number;
  content: GrauSatisfacaoObservacoes[];
}

export interface GrauSatisfacaoObservacoes {
  grauSatisfacao: string;
  observacao: string;
}

export function ObservacaoTable(props: ObservacaoTableProps) {
  return (
    <PagedTable<GrauSatisfacaoObservacoes>
      page={props.pageable.page}
      size={props.pageable.size}
      totalPages={props.totalPages}
      totalElements={props.totalElements}
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
      ]}
    />
  );
}
