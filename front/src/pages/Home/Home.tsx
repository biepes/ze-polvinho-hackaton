import { Heading, Paper, Select, VFlow } from "bold-ui";
import Chart from "components/PizzaChart/PizzaChart";
import {
  GrauSatisfacaoObservacoes,
  ObservacaoTable,
} from "components/Table/ObservacaoTable";
import { useEffect, useState } from "react";
import { getAvaliacoes, getData } from "service/LoadData";

export interface Versao {
  id: number;
  descricao: string;
}

export interface Satisfaction {
  versao: string;
  data: Avaliacoes[];
}

interface Avaliacoes {
  grauSatisfacao: string;
  quantidade: number;
}

const calculaMedia = (satisfaction: Satisfaction): number => {
  var sum = 0;
  var qtd = 0;
  satisfaction.data.forEach((item) => {
    var a;
    switch (item.grauSatisfacao) {
      case "MUITO_SATISFEITO":
        a = 5;
        break;
      case "SATISFEITO":
        a = 4;
        break;
      case "INDIFERENTE":
        a = 3;
        break;
      case "INSATISFEITO":
        a = 2;
        break;
      case "MUITO_INSATISFEITO":
        a = 1;
        break;
    }
    sum += a * item.quantidade;
    qtd += item.quantidade;
  });
  return sum / qtd;
};

const configBar = (satisfaction: Satisfaction[]) => {
  var series = [
    {
      data: satisfaction.map((sat) => {
        return {
          name: sat.versao,
          y: calculaMedia(sat),
        };
      }),
    },
  ];
  return {
    chart: {
      type: "column",
    },
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: series,
  };
};

const configPizza = (
  satisfaction: Satisfaction[] | undefined,
  version: string
) => {
  var series = [
    {
      name: "teste",
      data: satisfaction
        ?.find((sats) => sats.versao === version)
        ?.data.map((sats) => {
          console.log(sats);
          return {
            name: sats.grauSatisfacao,
            y: sats.quantidade,
          };
        }),
    },
  ];

  return {
    chart: {
      type: "pie",
    },
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
          useHTML: true,
          format: "<span style='color: {point.color}'>{point.name}</span>",
        },
        showInLegend: true,
      },
    },
    legend: {
      enabled: true,
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      // ver space between
      itemStyle: {
        fontFamily: "IBM Plex Sans",
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "14px",
        lineHeight: "21px",
      },
    },
    series: series,
  };
};

const Home = () => {
  const [data, setData] = useState<Satisfaction[]>();
  const [tableData, setTableData] = useState<GrauSatisfacaoObservacoes[]>([]);
  const [totalPages, setTotalPages] = useState({});

  const [optionsPizza, setOptionsPizza] = useState({});
  const [optionsBar, setOptionsBar] = useState({});
  const [labelTotalAvaliacoes, setLabelTotalAvaliacoes] = useState(String);
  const [versoes, setVersoes] = useState<string[]>([]);
  const [versao, setVersao] = useState<string>("v1");

  const [pageable, setPageable] = useState({
    page: 1,
    size: 10,
  });

  useEffect(() => {
    getData().then((response) => {
      setData(response.data);
      setVersoes(response.data.map((dt) => dt.versao));
      setVersao(response.data[0].versao);
      setOptionsPizza(configPizza(response.data, response.data[0].versao));

      setOptionsBar(configBar(response.data));
    });
  }, []);

  useEffect(() => {
    getAvaliacoes(pageable)
      .then((response) => {
        console.log(response.data.content);
        var a = response.data.content.filter((x) => x.grauSatisfacao != null);
        setTableData(a);
      })
      .catch(() => {
        // Fallback enquanto não tem back
      });
  }, []);

  // const onPageChange = (num) => {
  //   var pageab = { ...pageable, page: num };
  //   setPageable(pageab);
  //   getAvaliacoes(pageab)
  //     .then((response) => {
  //       setTableData(response);
  //     })
  //     .catch(() => {
  //       // Fallback enquanto não tem back
  //     });
  // };

  // const onSizeChange = (size) => {
  //   var pageab = { ...pageable, size: size, page: 0 };
  //   setPageable(pageab);
  //   getAvaliacoes(pageab)
  //     .then((response) => {
  //       setTableData(response);
  //     })
  //     .catch(() => {
  //       // Fallback enquanto não tem back
  //     });
  // };

  return (
    <VFlow style={{ backgroundColor: "#D3D4DD" }}>
      <Paper
        elevation={20}
        style={{
          margin: "48px 64px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <div style={{ padding: "1em" }}>
          <Heading style={{ marginTop: "0px" }} level={2}>
            Nota média por versão
          </Heading>
          <Chart options={optionsBar} />
        </div>
      </Paper>

      <Paper
        elevation={20}
        style={{
          margin: "48px 64px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <div style={{ padding: "1em" }}>
          <Select
            label="Versão"
            style={{ width: "250px" }}
            itemToString={(item) => item || ""}
            items={versoes}
            menuMinWidth={250}
            value={versoes.filter((vers) => vers === versao)}
            onChange={(item: string) => {
              setOptionsPizza(configPizza(data, item));
            }}
          />
          <Heading style={{ marginTop: "2em" }} level={3}>
            Grau de satisfação da versão
          </Heading>
          <div style={{ width: "50%" }}>
            <Chart options={optionsPizza} />
          </div>
          <Heading
            style={{ marginTop: "0px", width: "45%", textAlign: "center" }}
            level={4}
          >
            {labelTotalAvaliacoes}
          </Heading>

          <ObservacaoTable
            rows={tableData}
            pageable={pageable}
            pageChange={() => {}}
            sizeChange={() => {}}
          />
        </div>
      </Paper>
    </VFlow>
  );
};

export default Home;
