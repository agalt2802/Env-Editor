import React from "react";
import { Button } from "reactstrap";
import { Modal } from "react-bootstrap";
import "semantic-ui-css/semantic.min.css";

export default function ConfirmModal({ text, visible, setVisible, onConfirm, onCancel }) {
	const handleConfirm = () =>
	{
		setVisible(false);

		onConfirm();
	}

	const handleCancel = () =>
	{
		setVisible(false);

		if(onCancel !== undefined)
			onCancel();
	}

	return (
		<Modal show={visible} onHide={handleCancel} autoFocus={false} onChange={(event) => event.preventDefault()}>
			<Modal.Header closeButton>Conferma</Modal.Header>
			<Modal.Body>{text}</Modal.Body>
			<Modal.Footer>
				<Button color="success" onClick={handleConfirm}>Conferma</Button>
				<Button color="danger" onClick={handleCancel}>Annulla</Button>
			</Modal.Footer>
		</Modal>
	);
}