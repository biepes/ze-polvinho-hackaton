import { Cell, Grid, Heading, VFlow } from "bold-ui";
import Chart from "components/PizzaChart/PizzaChart";
import { useEffect, useState } from "react";
import { getData } from "service/LoadData";

const optionsBarGraph = {
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
        useHTML: true,
        format: "<span style='color: {point.color}'>{point.name}</span>",
      },
    },
  },
};

export interface Satisfaction {
  versao: string;
  data: [
    {
      grauAvaliacao: string;
      quantidade: number;
    }
  ];
}

const configPizza = (satisfaction: Satisfaction) => {
  var series = [
    {
      name: "teste",
      data: satisfaction.data.map((sats) => {
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

  useEffect(() => {
    getData().then((response) => {
      setOptionsPizza(configPizza(response));
    });
  });

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
          <Chart options={optionsBarGraph} />
        </Cell>
      </Grid>
    </VFlow>
  );
};

export default Home;
