import { Cell, Grid, Heading, VFlow } from "bold-ui";
import Chart from "components/PizzaChart/PizzaChart";
import { ObservacaoTable } from "components/Table/ObservacaoTable";
import { useEffect, useState } from "react";
import { getData } from "service/LoadData";

const grauSatisfacao = new Map([
  ["Bom", 3], // default
  ["Medio", 2],
  ["Ruim", 1],
]);

export interface Satisfaction {
  versao: string;
  data: Avaliacoes[];
}

interface Avaliacoes {
  grauAvaliacao: string;
  quantidade: number;
}

const calculaMedia = (satisfaction: Satisfaction): number => {
  var sum = 0;
  var qtd = 0;
  satisfaction.data.forEach((item) => {
    sum += grauSatisfacao[item.grauAvaliacao] * item.quantidade;
    qtd += item.quantidade;
  });
  console.log(sum);
  console.log(qtd);
  return sum / qtd;
};

const configBar = (satisfaction: Satisfaction[]) => {
  var series = [
    {
      data: satisfaction.forEach((sat) => {
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

const configPizza = (satisfaction: Satisfaction[]) => {
  var series = [
    {
      name: "teste",
      data: satisfaction[0].data.map((sats) => {
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
  const nameDashboard = "Grau de satisfação da versão 5.0";

  const [optionsPizza, setOptionsPizza] = useState({});
  const [optionsBar, setOptionsBar] = useState({});

  useEffect(() => {
    getData()
      .then((response) => {
        setOptionsPizza(configPizza(response));
        setOptionsBar(configBar(response));
      })
      .catch(() => {
        // Fallback enquanto não tem back
        const test = [
          {
            versao: "5.1",
            data: [
              { grauAvaliacao: "Bom", quantidade: 100 },
              { grauAvaliacao: "Medio", quantidade: 101 },
              { grauAvaliacao: "Ruim", quantidade: 99 },
            ],
          },
        ];
        setOptionsPizza(configPizza(test));
        setOptionsBar(configBar(test));
      });
  }, []);

  return (
    <VFlow>
      <Grid>
        <Cell>
          <Heading level={1}>DashBoard</Heading>
        </Cell>
      </Grid>
      <Grid>
        <Cell size={6}>
          <Heading level={2}>{nameDashboard}</Heading>
        </Cell>
        {/* add divider */}
        <Cell>
          <Heading level={2}>Nota média por versão</Heading>
        </Cell>
      </Grid>
      <Grid>
        <Cell size={3}>
          <Chart options={optionsPizza} />
        </Cell>
        <Cell size={3}></Cell>
        <Cell>
          <Chart options={optionsBar} />
        </Cell>
      </Grid>
      <ObservacaoTable
        rows={[
          { grauSatisfacao: "bom", observacao: "aaaa" },
          { grauSatisfacao: "ruim", observacao: "bbb" },
        ]}
      />
    </VFlow>
  );
};

export default Home;
