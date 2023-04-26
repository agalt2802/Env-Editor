import { Row, FormGroup, Label, Input } from "reactstrap";

function CommonsDetails({commons, setCommons }) {
  const handleValueChange = (event, key) => {
    const updatedCommons = {...commons};
    console.log(event.target.value)
    updatedCommons[key] = event.target.value;

    setCommons(updatedCommons);
  };

  return (
    <Row>
      {Object.keys(commons).map((key) => (
        <FormGroup key={key}>
          <Label>{key}</Label>
          <Input
            type="text"
            name={key}
            value={commons[key]}
            onChange={(event) => handleValueChange(event, key)}
          />
        </FormGroup>
      ))}
    </Row>
  );
}

export default CommonsDetails;
