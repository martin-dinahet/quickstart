import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { DefaultLayout } from "./layouts/default.layout";
import { IndexPage } from "./pages/index.page";

// biome-ignore lint/style/noNonNullAssertion: what else am i even suppposed to do here
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<DefaultLayout />}>
					<Route index element={<IndexPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
