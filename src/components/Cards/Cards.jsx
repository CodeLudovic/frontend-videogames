/*eslint-disable*/
import style from "./Cards.module.css";
import { Card } from "../Card/Card";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Cards = ({ videogames, forPage, page }) => {
	const [loading, setLoading] = useState(true);
	const named = document.getElementById("inp");
	const buttonSrc = document.getElementById("buttonSrc");
	const navigate = useNavigate();
	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 500);
		return () => {};
	}, []);

	return (
		<div className={style.container} style={{ gridTemplateColumns: "1fr" }}>
			{loading ? (
				<div className={style.loaderDiv}>
					<div>
						<h1 key={page} className={style.loadingTitle}>
							Loading
						</h1>
					</div>
					<div>
						<span className={style.loader}></span>
					</div>
				</div>
			) : (
				<div className={style.container}>
					{videogames?.length > 0 ? (
						videogames
							?.slice((page - 1) * forPage, (page - 1) * forPage + forPage)
							.map((videogame) => <Card key={videogame.id} item={videogame} />)
					) : (
						<>
							<div></div>
							<div></div>
							<div className={style.noElements}>
								{videogames && (
									<p style={{ textAlign: "center", width: "600px" }}>
										There is nothing elements to retrieve from the DB,Go create
										one with the button "Create Game!"
									</p>
								)}
							</div>
						</>
					)}
				</div>
			)}
		</div>
	);
};
