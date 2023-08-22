import React, { useState, useContext, useCallback } from 'react';

export const ErrorContext = React.createContext(
{
	error: null,
	addError: () => {},
	removeError: () => {}
});

export default function ErrorProvider({ children })
{
	const [error, setError] = useState(null);

	const contextValue =
	{
		error,
		addError: useCallback(error => setError(error), []),
		removeError: useCallback(() => setError(null), [])
	};

	return (
		<ErrorContext.Provider value={contextValue}>
			{children}
		</ErrorContext.Provider>
	);
}

export function useError()
{
	const { error, addError, removeError } = useContext(ErrorContext);

	return { error, addError, removeError };
}