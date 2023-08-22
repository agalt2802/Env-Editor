import { useEffect, useState } from "react";
import { Row, Col, Table, Button, Spinner, Container } from "reactstrap";
import { Modal } from "react-bootstrap";
import format from "date-format";

import { fetchWithCatch } from "../../commonFunctions";
import { useError } from "../ErrorProvider";

function Logs({ date })
{
  const [logs, setLogs] = useState(undefined);
  const [error, setError] = useState(undefined);
  const { addError } = useError();

  useEffect(() =>
  {
    if(!logs)
    {
      const datePath = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
      
      fetchWithCatch("/logs/"+datePath, {}, setLogs,
        (e) => (e.status === 404 ? setError(e.message) : addError()), true
      );
    }
  }, [logs]);

  return (
    <div>
      <Row>
        <Col>
          <h1>Logs of {format("dd/MM/yyyy", date)}</h1>
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
              <tbody style={{height: "300px", overflow: "scroll"}}>
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
    </div>
  );
}

export default Logs;
