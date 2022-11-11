import { PagedTable, Text } from "bold-ui";

interface ObservacaoTableProps {
  rows: GrauSatisfacaoObservacoes[];
}

interface GrauSatisfacaoObservacoes {
  grauSatisfacao: string;
  observacao: string;
}

export function ObservacaoTable(props: ObservacaoTableProps) {
  return (
    <PagedTable<GrauSatisfacaoObservacoes>
      page={1}
      size={10}
      totalPages={2}
      totalElements={18}
      onPageChange={() => {}}
      onSizeChange={() => {}}
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
