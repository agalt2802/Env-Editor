import { Container, Row, Table, Col, Label, Input } from "reactstrap";
import format from "date-format";

function Logs({ logs, setLogs, selectedDate }) {
  let type = ["INFO", "ERROR"];
  let flowNames = [];
  let flowSteps = [];

  logs.forEach((element) => {
    if (!flowNames.includes(element.flowName)) {
      flowNames.push(element.flowName);
    }
    console.log("FLOWSTEP: " + element.flowStep)
    if (!flowSteps.includes(element.flowStep)) {
      flowSteps.push(element.flowStep);
    }
  });

  let date = format("dd-MM-yyyy", new Date(selectedDate));
  if (selectedDate != "")
    return (
      <Container>
        <h1>LOGS OF {date}</h1>
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
          <tbody>
            {Object.keys(logs).map((key) => (
              <tr key={key}>
                <td>{logs[key].type}</td>
                <td>{logs[key].timeStamp}</td>
                <td>{logs[key].flowName}</td>
                <td>{logs[key].flowStep}</td>
                <td>{logs[key].type !== 'ERROR' ? logs[key].data : logs[key].data.errorCode + " " + logs[key].data.errorMessage}</td>
             </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
}

export default Logs;
