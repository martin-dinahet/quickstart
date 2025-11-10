import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { IndexPage } from "./pages/index.page";

// biome-ignore lint/style/noNonNullAssertion: what else am i even suppposed to do here
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<IndexPage />
	</StrictMode>,
);
