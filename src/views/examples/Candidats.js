import React, { useState, useCallback, useEffect } from 'react';

import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { getAllCandidats } from 'services/apis';
const URL = 'ws://127.0.0.1:9000';

const Candidats = (props) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [user, setUser] = useState('John');
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(new WebSocket(URL));
  const [listCadidats, setCandidats] = useState([])
  let pageSize = 10
  let pagesCount = 1
  const submitMessage = (usr, msg) => {
    const message = { user: usr, message: msg };
    ws.send(JSON.stringify(message));
    setMessages([message, ...messages]);
  }

  useEffect(() => {
    ws.onopen = () => {
      console.log('WebSocket Connected');
    }
    getCandidats()
    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setMessages([message, ...messages]);
      console.log("new Message")
    }
    return () => {
      ws.onclose = () => {
        console.log('WebSocket Disconnected');
        setWs(new WebSocket(URL));
      }
    }
  }, [props]);
  function getCandidats() {
    getAllCandidats()
      .then(data => {
        pagesCount = Math.ceil(data.length / pageSize);
        setCandidats(data.data)
      })
      .catch(err => {
        console.log({ err })
      })
  }
  function showRes(item) {

    return (
      <tr>
        <th>
          <span className="mb-0 text-sm">{item.nom}</span>
        </th>
        <th>
          <span className="mb-0 text-sm">{item.prenom}</span>
        </th>
        <th>
          <span className="mb-0 text-sm">{item.cin}</span>
        </th>
        <th>
          <span className="mb-0 text-sm">{item.isVoted==1?"est voté":"pas encore"}</span>
        </th>
      </tr>
    )
  }
  function handleClick(e, index) {
    e.preventDefault();
    setCurrentPage(index)
  }
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Liste candidats</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">CIN</th>
                    <th scope="col">Statut voté</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    listCadidats.slice(
                      currentPage * pageSize,
                      (currentPage + 1) * pageSize
                    ).map((t) => showRes(t))
                  }
                </tbody>
              </Table>
              <CardFooter className="py-4">
              <div className="pagination-wrapper">
                  <Pagination style={{ padding: 10 }} className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0">
                    <PaginationItem disabled={currentPage <= 0}>
                      <PaginationLink
                        onClick={e => this.handleClick(e, currentPage - 1)}
                        previous
                        href="#"
                      />
                    </PaginationItem>
                    {[...Array(pagesCount)].map((page, i) =>
                      <PaginationItem active={i === currentPage} key={i}>
                        <PaginationLink onClick={e => handleClick(e, i)} href="#">
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    <PaginationItem disabled={currentPage >= pagesCount - 1}>
                      <PaginationLink
                        onClick={e => handleClick(e, currentPage + 1)}
                        next
                        href="#"
                      />
                    </PaginationItem>
                  </Pagination>
                </div>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Candidats;
