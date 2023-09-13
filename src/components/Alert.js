import React, { useState } from "react";
import { Alert as RSAlert, Fade } from "reactstrap";

import "semantic-ui-css/semantic.min.css";

export const Type = 
{
	INFO: 0,
	ERROR: 1
};

export const AlertType = Object.freeze(Type);

export default function Alert({ text, type, removeHandler })
{
	const [visible, setVisible] = useState(true);

	const hide = () => setVisible(false);

	setTimeout(hide, 3000);
	
	return (
		<RSAlert
			color={type == AlertType.ERROR ? "danger" : "success"}
			isOpen={visible}
			toggle={hide}
			className="alert"
			transition={{...Fade.defaultProps, onExited: removeHandler}}
		>
			{type == AlertType.ERROR && <b>Error: </b>}
			{text}
		</RSAlert>
	)
}