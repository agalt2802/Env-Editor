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

	const contextValue =
	{
		alerts,
		addAlert: (text, type = AlertType.ERROR) => setAlerts([
			...alerts,
			<Alert text={text} type={type} />
		])
	};

	return (
		<AlertContext.Provider value={contextValue}>
			{children}
		</AlertContext.Provider>
	);
}

export function useAlert()
{
	const { alerts, addAlert } = useContext(AlertContext);

	const addError = (error) => addAlert(error.message, AlertType.ERROR);

	return { alerts, addAlert, addError };
}