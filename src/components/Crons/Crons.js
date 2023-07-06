import React, { useState } from "react";
import CronsList from "./CronsList";
import CreateCron from "./CreateCron"
import EditCron from "./EditCron/EditCron";

import "semantic-ui-css/semantic.min.css";

export default function Crons()
{
	const Actions = 
	{
		LIST: 0,
		CREATE: 1,
		EDIT: 2
	};

	const [state, setState] = useState({ action: Actions.LIST });

	const showFlowsList = () => { setState({ action: Actions.LIST }); }
	const createCron = () => { setState({ action: Actions.CREATE }); }
	const editCron = (cronId) => { setState({ action: Actions.EDIT, cronId: cronId }); }

	return (
		<div>
			{state.action == Actions.LIST && <CronsList createCron={createCron} editCron={editCron} />}
			{state.action == Actions.CREATE && <CreateCron showFlowsList={showFlowsList} />}
			{state.action == Actions.EDIT && <CreateCron showFlowsList={showFlowsList} cronID={state.cronId} />}
			{console.log(state)}
		</div>
	);
}
