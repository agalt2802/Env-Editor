import React, { useState, useContext } from 'react';

import Alert, { AlertType } from './Alert'

export const AlertContext = React.createContext(
{
	alerts: [],
	setAlerts: () => {}
});

export default function AlertProvider({ children })
{
	const [alerts, setAlerts] = useState([]);
	
	const addAlert = (text, type = AlertType.ERROR) =>
	{
		const alert =
		{
			text: text,
			type: type
		};

		setAlerts([
			...alerts,
			alert
		]);
	}

	const removeAlert = (alert) =>
	{
		alerts.splice(alerts.indexOf(alert), 1);

		setAlerts([...alerts]);
	};

	const contextValue =
	{
		alerts,
		addAlert: addAlert,
		removeAlert: removeAlert
	};

	return (
		<AlertContext.Provider value={contextValue}>
			{children}
		</AlertContext.Provider>
	);
}

export function useAlert()
{
	const { alerts, addAlert, removeAlert } = useContext(AlertContext);

	const addError = (error) => addAlert(error.message, AlertType.ERROR);

	const renderAlerts = () =>
	{
		return alerts.map(alert =>
			<Alert text={alert.text} type={alert.type} removeHandler={() => removeAlert(alert)} />);
	}

	return { alerts, addAlert, addError, renderAlerts };
}