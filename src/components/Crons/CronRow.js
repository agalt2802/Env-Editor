import React, { useState } from "react";
import { Row, Col, ButtonGroup, Button, Spinner, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { fetchWithCatch } from "../../commonFunctions";
import ConfirmModal from "../ConfirmModal";

import "semantic-ui-css/semantic.min.css";

export default function CronRow({cron, editCron, refreshList})
{
	const [enabled, setEnabled] = useState(cron.ENABLED);
	const [waiting, setWaiting] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);

	const handleEdit = () =>
	{
		editCron(cron.RUN);
	};

	const handleRemove = () =>
	{
		setShowDeleteModal(true);
	};

	const deleteCron = () =>
	{
		fetchWithCatch(`/crons/${encodeURIComponent(cron.RUN)}`, { method: "DELETE" }, refreshList)
	}

	const handleChangeStatus = () =>
	{
		setShowChangeStatusModal(true);
	}

	const changeCronStatus = () =>
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
			<Col style={{overflow: "hidden"}}>
				{cron.INIT_FLOWS.split(',').map(str => <p>{str}</p>)}
			</Col>
			<Col>{cron.INIT_SCHEDULER}</Col>
			<Col xs={1}>
				<Input type="checkbox" name="enabled" checked={enabled} onClick={handleChangeStatus} disabled={waiting} />
			</Col>
			<Col xs={2}>
				<ButtonGroup>
					<Button color="primary" onClick={handleEdit}>
						<FontAwesomeIcon icon={faPenToSquare} />
					</Button>
					<Button color="danger" onClick={handleRemove}>
						<FontAwesomeIcon icon={faTrash} />
					</Button>
					{/*
					<Button color="success" onClick={handleChangeStatus} disabled={waiting}>
						{!waiting ?
							<FontAwesomeIcon icon={(enabled ? faStop : faPlay)} />
							:
							<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
						}
					</Button>
					*/}
				</ButtonGroup>
			</Col>
			<ConfirmModal text={(enabled ? "Disabilitare" : "Abilitare")+" il cron "+cron.RUN+"?"} visible={showChangeStatusModal} setVisible={setShowChangeStatusModal} onConfirm={changeCronStatus} />
			<ConfirmModal text={"Eliminare il cron "+cron.RUN+"?"} visible={showDeleteModal} setVisible={setShowDeleteModal} onConfirm={deleteCron} />
		</Row>
	);
}