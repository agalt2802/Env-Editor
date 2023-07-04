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

	const [action, setAction] = useState(Actions.LIST);

	const createCron = () => { setAction(Actions.CREATE); }
	const editCron = () => { setAction(Actions.EDIT); }

	return (
		<div>
			{action == Actions.LIST && <CronsList createCron={createCron} editCron={editCron} />}
			{action == Actions.CREATE && <CreateCron />}
			{action == Actions.EDIT && <EditCron />}
		</div>
	);
}
