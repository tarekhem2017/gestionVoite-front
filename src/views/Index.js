/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";
import Header from "components/Headers/Header.js";
import { getStatistique } from "../services/apis";
import React, { useState,useEffect } from 'react';
const URL = 'ws://127.0.0.1:9000';

const Index = (props) => {
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [chartData, setCharData] = useState(null)
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(new WebSocket(URL));

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  useEffect(() => {
    ws.onopen = () => {
      console.log('WebSocket Connected');
    }
    Statistique()
  }, [])
  ws.onmessage = (e) => {
    Statistique()
  }
  function Statistique() {
    getStatistique()
      .then(data => {
        console.log({ data })
        let chart = {
          labels: data.data.dates,
          datasets: [
            {
              label: "Performance",
              data: data.data.nombreVoteList,
            },
          ],
        }
        setCharData(chart)
      })
      .catch(err => {
        console.log({ err })
      })
  }
  console.log({ chartData })
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Statistique
                    </h6>
                    <h2 className="text-white mb-0">Nouveau utilisateur par jour</h2>
                  </div>

                </Row>
              </CardHeader>
              <CardBody>
                {
                  chartData &&
                  <div className="chart">
                    <Line
                      data={chartData}
                      getDatasetAtEvent={(e) => console.log(e)}
                      options={chartExample1.options}
                    />
                  </div>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
