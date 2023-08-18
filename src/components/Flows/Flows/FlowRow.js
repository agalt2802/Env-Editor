import React, { useState } from "react";
import { Card, CardBody, CardText, Alert, Collapse, Row, Col, ButtonGroup, Button, Spinner, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faCopy, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { fetchWithCatch } from "../../../commonFunctions";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../ConfirmModal";

import "semantic-ui-css/semantic.min.css";
import CopyFlowModal from "./CopyFlowModal";

export default function FlowRow({flow, refreshList})
{
    const navigate = useNavigate();
	const [showInfos, setShowInfos] = useState(false);
	const [showCopyModal, setShowCopyModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleInfo = () => setShowInfos(!showInfos);

	const handleCopy = () => setShowCopyModal(true);

	const handleEdit = () => navigate("/flows/edit/"+flow.id);

	const handleRemove = () => setShowDeleteModal(true);

	const deleteFlow = () => fetchWithCatch(`/flows/${encodeURIComponent(flow.id)}`, { method: "DELETE" }, refreshList);

	return (
        <Card className="rowCard">
			<CardBody>
				<Row>
					<Col className="cardTextCol">
						<CardText>
							{flow.NAME}
						</CardText>
					</Col>
					<Col xs="auto">
						<ButtonGroup>
							<Button color="primary" onClick={handleInfo} active={showInfos}>
								<FontAwesomeIcon icon={faCircleInfo} />
							</Button>
							<Button color="success" onClick={handleCopy}>
								<FontAwesomeIcon icon={faCopy} />
							</Button>
							<Button color="success" onClick={handleEdit}>
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
				</Row>
				<Collapse isOpen={showInfos}>
					<hr />
					<Row>
						<Col xs={"auto"}>
							Description:
						</Col>
						<Col>
							{flow.DESCRIPTION !== undefined ? flow.DESCRIPTION : <Alert color="danger" fade={false}>No description provided</Alert>}
						</Col>
					</Row>
				</Collapse>
			</CardBody>
			<ConfirmModal text={"Eliminare il flow "+flow.NAME+"?"} visible={showDeleteModal} setVisible={setShowDeleteModal} onConfirm={deleteFlow} />
			<CopyFlowModal show={showCopyModal} setShow={setShowCopyModal} flow={flow} />
		</Card>
	);
}