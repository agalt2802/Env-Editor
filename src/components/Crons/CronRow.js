import React, { useState } from "react";
import { Row, Col, ButtonGroup, Button, FormGroup, Input, Card, CardBody, CardText, Collapse, Spinner } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faCircleInfo, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { fetchWithCatch } from "../../commonFunctions";
import { useNavigate } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";

import ConfirmModal from "../ConfirmModal";
import { useAlert } from "../AlertProvider";
import { AlertType } from "../Alert";

export default function CronRow({ cron, updateList })
{
	const { addAlert, addError } = useAlert();
	
    const navigate = useNavigate();
	const [enabled, setEnabled] = useState(cron.ENABLED);
	const [waiting, setWaiting] = useState(false);
	const [showInfos, setShowInfos] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
	const [showReloadModal, setShowReloadModal] = useState(false);
	
	const handleInfo = () => setShowInfos(!showInfos);
	const handleEdit = () => navigate("/crons/edit/"+cron.RUN);
	const handleRemove = () => setShowDeleteModal(true);
	const handleReload = () => setShowReloadModal(true);

	const deleteCron = () =>
		fetchWithCatch("/crons/"+encodeURIComponent(cron.RUN), { method: "DELETE" }, updateList, addError);

	const reloadCron = () =>
		fetchWithCatch("/crons/"+encodeURIComponent(cron.RUN)+"/reload", {}, () => addAlert("Cron "+cron.RUN+" riavviato", AlertType.INFO), addError);

	const handleChangeStatus = (e) =>
	{
		e.preventDefault();

		setShowChangeStatusModal(true);
	}

	const changeCronStatus = () =>
	{
		setWaiting(true);

		let endPoint = (enabled ? "disable" : "enable");
		fetchWithCatch("/crons/"+encodeURIComponent(cron.RUN)+"/"+endPoint, { method: "PUT" }, (res) =>
		{
			setWaiting(false);

			setEnabled(res.ENABLED);
		},
		() => setWaiting(false));
	}

	return (
		<Card className="rowCard">
			<CardBody>
				<Row>
					<Col xs="auto" className="cardTextCol">
						<CardText>
							{ waiting ? <div className="text-center"><Spinner /></div> :
								<FormGroup switch>
									<Input type="switch" name="enabled" checked={enabled} onChange={handleChangeStatus} disabled={waiting} />
								</FormGroup>
							}
						</CardText>
					</Col>
					<Col className="cardTextCol">
						<CardText>
							{cron.RUN}
						</CardText>
					</Col>
					<Col className="cardTextCol">
						<CardText>
							{cron.INIT_SCHEDULER}
						</CardText>
					</Col>
					<Col xs="auto">
						<ButtonGroup>
							<Button color="primary" onClick={handleInfo} active={showInfos}>
								<FontAwesomeIcon icon={faCircleInfo} />
							</Button>
							<Button color="success" onClick={handleEdit}>
								<FontAwesomeIcon icon={faPenToSquare} />
							</Button>
							<Button color="danger" onClick={handleRemove}>
								<FontAwesomeIcon icon={faTrash} />
							</Button>
							<Button color="primary" onClick={handleReload}>
								<FontAwesomeIcon icon={faArrowsRotate} />
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
				</Row>
				<Collapse isOpen={showInfos}>
					<hr />
					<Row>
						<Col xs="auto">Flows:</Col>
						<Col>
							<ol>
								{cron.INIT_FLOWS.map(str =>
									<p>
										<li key={str}>{str}</li>
									</p>
								)}
							</ol>
						</Col>
					</Row>
				</Collapse>
				<ConfirmModal text={(enabled ? "Disabilitare" : "Abilitare")+" il cron "+cron.RUN+"?"} visible={showChangeStatusModal} setVisible={setShowChangeStatusModal} onConfirm={changeCronStatus} />
				<ConfirmModal text={"Eliminare il cron "+cron.RUN+"?"} visible={showDeleteModal} setVisible={setShowDeleteModal} onConfirm={deleteCron} />
				<ConfirmModal text={"Riavviare il cron "+cron.RUN+"?"} visible={showReloadModal} setVisible={setShowReloadModal} onConfirm={reloadCron} />
			</CardBody>
		</Card>
	);
}