import React, { useState } from "react";
import { Row, Col, ButtonGroup, Button, Spinner } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { fetchWithCatch } from "../../commonFunctions";

import "semantic-ui-css/semantic.min.css";

export default function CronRow({cron, editCron, refreshList})
{
	const [enabled, setEnabled] = useState(cron.ENABLED);
	const [waiting, setWaiting] = useState(false);

	const handleEdit = () =>
	{
		editCron(cron.RUN);
	};

	const handleRemove = () =>
	{
		fetchWithCatch(`/crons/${encodeURIComponent(cron.RUN)}`, { method: "DELETE" }, refreshList)
	};

	const handleChangeStatus = () =>
	{
		setWaiting(true);

		let endPoint = (enabled ? "disable" : "enable");
		fetchWithCatch(`/crons/${encodeURIComponent(cron.RUN)}/${endPoint}`, { method: "PUT" }, (res) =>
		{
			setWaiting(false);

			setEnabled(res.ENABLED);
		}, () =>
		{
			setWaiting(false);
		})
	}

	return (
		<Row className="cronRow">
			<Col>{cron.RUN}</Col>
			<Col>{cron.INIT_FLOWS}</Col>
			<Col>{cron.INIT_SCHEDULER}</Col>
			<Col xs={2}>
				<ButtonGroup>
					<Button onClick={handleEdit}>
						<FontAwesomeIcon icon={faPenToSquare} />
					</Button>
					<Button onClick={handleRemove}>
						<FontAwesomeIcon icon={faTrash} />
					</Button>
					<Button onClick={handleChangeStatus} disabled={waiting}>
						{!waiting ?
							<FontAwesomeIcon icon={(enabled ? faStop : faPlay)} />
							:
							<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
						}
					</Button>
				</ButtonGroup>
			</Col>

			<Modal>FOR DELETE</Modal>
		</Row>
	);
}