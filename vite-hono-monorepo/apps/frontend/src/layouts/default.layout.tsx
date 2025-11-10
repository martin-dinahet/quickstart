import { Outlet } from "react-router";

export function DefaultLayout() {
	return (
		<div>
			<main>
				<Outlet />
			</main>
		</div>
	);
}
