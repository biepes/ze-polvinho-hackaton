import { Heading, Paper, Select, VFlow } from "bold-ui";
import Chart from "components/PizzaChart/PizzaChart";
import { useEffect, useState } from "react";
import { getData } from "service/LoadData";

enum GrauSatisfacao {
  Bom = 1,
  Medio = 2,
  Ruim = 3,
}

export interface Versao {
  id: number;
  descricao: string;
}

export interface Satisfaction {
  versao: Versao;
  data: Avaliacoes[];
}

interface Avaliacoes {
  grauAvaliacao: number;
  quantidade: number;
}

const calculaMedia = (satisfaction: Satisfaction): number => {
  var sum = 0;
  var qtd = 0;
  satisfaction.data.forEach((item) => {
    sum += item.grauAvaliacao * item.quantidade;
    qtd += item.quantidade;
  });
  return sum / qtd;
};

const configBar = (satisfaction: Satisfaction[]) => {
  var series = [
    {
      data: satisfaction.map((sat) => {
        return {
          name: sat.versao.descricao,
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
  version: number
) => {
  var series = [
    {
      name: "teste",
      data: satisfaction
        ?.find((sats) => sats.versao.id === version)
        ?.data.map((sats) => {
          return {
            name: sats.grauAvaliacao,
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
  const [optionsPizza, setOptionsPizza] = useState({});
  const [optionsBar, setOptionsBar] = useState({});
  const [labelTotalAvaliacoes, setLabelTotalAvaliacoes] = useState(String);
  const [versoes, setVersoes] = useState<Versao[]>([]);
  const [versao, setVersao] = useState<number>(0);
  const [data, setData] = useState<Satisfaction[]>();

  useEffect(() => {
    getData()
      .then((response) => {
        setData(response);
        setOptionsPizza(configPizza(response, versao));
        setOptionsBar(configBar(response));
      })
      .catch(() => {
        // Fallback enquanto não tem back
        const test = [
          {
            versao: { id: 0, descricao: "v1" },
            data: [
              { grauAvaliacao: 1, quantidade: 100 },
              { grauAvaliacao: 2, quantidade: 101 },
              { grauAvaliacao: 3, quantidade: 99 },
            ],
          },
          {
            versao: { id: 1, descricao: "v2" },
            data: [
              { grauAvaliacao: 1, quantidade: 999 },
              { grauAvaliacao: 2, quantidade: 1000 },
              { grauAvaliacao: 3, quantidade: 500 },
            ],
          },
          {
            versao: { id: 2, descricao: "v3" },
            data: [
              { grauAvaliacao: 1, quantidade: 50 },
              { grauAvaliacao: 2, quantidade: 500 },
              { grauAvaliacao: 3, quantidade: 25 },
            ],
          },
        ];
        setData(test);
        setVersoes([
          { id: 0, descricao: "v1" },
          { id: 1, descricao: "v2" },
          { id: 2, descricao: "v3" },
        ]);
        setVersao(0);
        setLabelTotalAvaliacoes("Total de avaliações 10.000 avaliações");
        setOptionsPizza(configPizza(test, 0));
        setOptionsBar(configBar(test));
      });
  }, []);

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
            itemToString={(item) => item?.descricao || ""}
            items={versoes}
            menuMinWidth={250}
            value={versoes.filter((vers) => vers.id === versao)}
            onChange={(item: Versao) => {
              setOptionsPizza(configPizza(data, item.id));
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
        </div>
      </Paper>
    </VFlow>
  );
};

export default Home;
