import { Row, FormGroup, Label, Input } from "reactstrap";

function CommonsDetails({commons, setCommons }) {
  const handleValueChange = (event, key) => {
    const updatedCommons = {...commons};
    console.log(event.target.value)
    updatedCommons[key] = event.target.value;

    setCommons(updatedCommons);
  };

  const handleNestedValueChange = (event, key, key1) =>{
    const updatedCommons = {...commons};
    console.log(event.target.value)
    updatedCommons[key][key1] = event.target.value;

    setCommons(updatedCommons);

  }

  return (
    <Row>
      {Object.keys(commons).map((key) => (
        !(commons[key] instanceof Object) ?
        <FormGroup key={key}>
          <Label>{key}</Label>
          <Input
            type="text"
            name={key}
            value={commons[key]}
            onChange={(event) => handleValueChange(event, key)}
          />
        </FormGroup>
          :
          <div>
          <Label><h3>{key}</h3></Label>
          {Object.keys(commons[key]).map((key1)=>(
            <FormGroup key={key1}>
            <Label>{key1}</Label>
            <Input
              type="text"
              name={key1}
              value={commons[key][key1]}
              onChange={(event) => handleNestedValueChange(event, key, key1)}
            />
          </FormGroup>
        ))}

          </div> 
      ))}
    </Row>
  );
}

export default CommonsDetails;
