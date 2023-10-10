/* eslint-disable */
import { Route, Routes } from "react-router-dom";
import style from "./App.module.css";
import { LandingPage } from "./views/LandingPage/LandingPage";
import { Home } from "./views/Home/Home";
import { Detail } from "./views/Detail/Detail";
import { CreateForm } from "./views/CreateForm/CreateForm";
import axios from "axios";
axios.defaults.baseURL =
	"https://backend-videogames-production-cf7b.up.railway.app";
// axios.defaults.baseURL = "http://localhost:3001/videogames/";
function App() {
	return (
		<div className={style.App}>
			<Routes>
				<Route
					path="/"
					element={
						<>
							<LandingPage />
						</>
					}
				/>
				<Route
					path="/home"
					element={
						<>
							<Home />
						</>
					}
				/>
				<Route
					path="videogames/detail/:id"
					element={
						<>
							<Detail />
						</>
					}
				/>
				<Route
					path="videogames/create"
					element={
						<>
							<CreateForm />
						</>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
