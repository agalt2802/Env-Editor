import {Row, Label, Input} from "reactstrap"

function CronSchedule({scheduler, setScheduler}) {

    const handleScheduleChange = (event) =>{
        setScheduler(event.target.value)
    }

    return(
        <Row>
            <Label>Edit Cron Schedule</Label>
            <Input type="text" value={scheduler} placeholder={scheduler} onChange={handleScheduleChange} />
        </Row>
    )
}

export default CronSchedule;