import React, { useState } from "react";
import { Row, Col, ButtonGroup, Button, Spinner } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { fetchWithCatch } from "../../commonFunctions";

import "semantic-ui-css/semantic.min.css";

export default function CronRow({data, editCron})
{
	const [enabled, setEnabled] = useState(data.ENABLED);
	const [waiting, setWaiting] = useState(false);

	const handleEdit = () =>
	{
		editCron(data.RUN);
	};

	const handleRemove = () =>
	{

	};

	const handleChangeStatus = () =>
	{
		setWaiting(true);

		let endPoint = (enabled ? "disable" : "enable");
		fetchWithCatch(`/crons/${encodeURIComponent(data.RUN)}/${endPoint}`, {}, (cron) =>
		{
			setWaiting(false);

			setEnabled(cron.ENABLED);
		}, () =>
		{
			setWaiting(false);
		})
	}

	return (
		<Row className="cronRow">
			<Col>{data.RUN}</Col>
			<Col>{data.INIT_FLOWS}</Col>
			<Col>{data.INIT_SCHEDULER}</Col>
			<Col xs={1}>
				<ButtonGroup>
					<Button onClick={handleEdit}>
						<FontAwesomeIcon icon={faPenToSquare} />
					</Button>
					{false && <Button onClick={handleRemove}>
						<FontAwesomeIcon icon={faTrash} />
					</Button>}
					<Button onClick={handleChangeStatus} disabled={waiting}>
						{!waiting ?
							<FontAwesomeIcon icon={(enabled ? faStop : faPlay)} />
							:
							<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
						}
					</Button>
				</ButtonGroup>
			</Col>
		</Row>
	);
}