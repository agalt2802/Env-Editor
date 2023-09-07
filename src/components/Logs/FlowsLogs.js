import { useEffect, useState } from "react";
import { Row, Col, Table, Spinner, Container } from "reactstrap";
import format from "date-format";

import { fetchWithCatch } from "../../commonFunctions";
import { useAlert } from "../AlertProvider";

function FlowsLogs({ date })
{
  const [logs, setLogs] = useState(undefined);
  const [error, setError] = useState(undefined);

	const { addError } = useAlert();

  useEffect(() =>
  {
    if(!logs)
    {
      const datePath = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
      
      fetchWithCatch("/logs/flows/"+datePath, {}, setLogs,
        (e) => (e.status === 404 ? setError(e.message) : addError(e)), true
      );
    }
  }, [logs]);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Flows logs of {format("dd/MM/yyyy", date)}</h1>
        </Col>
      </Row>
      <Row>
        {error ? <Col className="d-flex justify-content-center"><b class="text-danger">{date > Date.now() ? "Selected date is after current date!" : "No logs available!"}</b></Col> :
          !logs ? <div className="text-center"><Spinner /></div> :
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>TYPE</th>
                  <th>TIMESTAMP</th>
                  <th>FLOWNAME</th>
                  <th>FLOWSTEP</th>
                  <th>DATA</th>
                </tr>
              </thead>
              <tbody style={{height: "500px", overflow: "scroll"}}>
                {logs.map((log, key) => (
                  <tr key={key}>
                    <td>{log.type}</td>
                    <td>{log.timeStamp}</td>
                    <td>{log.flowName}</td>
                    <td>{log.flowStep}</td>
                    <td>{log.type !== 'ERROR' ? log.data : log.data.errorCode + " " + log.data.errorMessage}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        }
      </Row>
    </Container>
  );
}

export default FlowsLogs;
