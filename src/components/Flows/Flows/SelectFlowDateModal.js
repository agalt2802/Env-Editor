import React, { useState } from "react";
import { Button, Input } from "reactstrap";
import { Modal } from "react-bootstrap";

import "semantic-ui-css/semantic.min.css";

export default function SelectFlowDateModal({ show, setShow, flow, onConfirm })
{
	const today = new Date();
	const [date, setDate] = useState(today);  

	const handlePickDate = (event) =>
	{
		let date = new Date(event.target.value);
		
		setDate(date);
	}  

	const handleConfirm = (event) =>
	{
		onConfirm();

		setShow(false);
	};

	const handleCancel = () =>
	{
		setShow(false);
	}

	return (
		<div className="d-flex justify-content-end">
			<Modal show={show} onHide={handleCancel} autoFocus={false} onChange={(event) => event.preventDefault()}>
				<Modal.Header closeButton>Data esecuzione flusso</Modal.Header>
				<Modal.Body>
					<p>Scegliere una data per l'esecuzione del flusso {flow.NAME}</p>
					<Input
						id="date"
						type="date"
						value={date.toISOString().substring(0,10)}
						onChange={handlePickDate}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button color="success" onClick={handleConfirm}>
						Conferma
					</Button>
					<Button color="danger" onClick={handleCancel}>
						Annulla
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}