import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASEURL_LOC } from "../../helpers/data";
import style from "./Detail.module.css";
import { NavBar } from "../../components/NavBar/NavBar";
/* eslint-disable */
export const Detail = () => {
	const [videogame, setVideoGame] = useState({});
	const nagivate = useNavigate();
	const { id } = useParams();
	const htmlContent = { __html: videogame.description_raw };
	const [loading, setLoading] = useState(true);
	const handleClick = () => {
		nagivate(-1);
	};
	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1500);
	}, []);

	useEffect(() => {
		axios(`/videogames/${id}`)
			.then(({ data }) => {
				if (data) {
					setVideoGame(data);
				} else {
					window.alert("No hay personajes con ese ID");
				}
			})
			.catch((error) => {
				if (error.response || error.response.status === 404) {
					nagivate("/home");
				}
			});
	}, []);
	return (
		<div className={style.container}>
			{loading ? (
				<div className={style.loaderDiv}>
					<div>
						<h1 className={style.loadingTitle}>Loading</h1>
					</div>
					<div>
						<span className={style.loader}></span>
					</div>
				</div>
			) : (
				<>
					{videogame.source_by === "Api" ? (
						<div
							className={style.alexander}
							style={{
								backgroundImage: `url(${videogame.background_image})`,
							}}></div>
					) : (
						<div
							className={style.alexander}
							style={{
								backgroundImage: `url(${videogame.image})`,
							}}></div>
					)}
					<div className={style.navbar}>
						<NavBar />
					</div>
					<div className={style.detail_container}>
						{videogame.source_by === "Api" ? (
							<>
								<div className={style.text_name_detail}>{videogame.name}</div>
								<div className={style.text_id}> ID: {videogame.id}</div>
								<div className={style.divAll}>
									<div className={style.platforms}>
										<div className={style.tittle_genres}>Plaforms:</div>
										{videogame.source_by === "Api"
											? videogame.parent_platforms?.map((platform, index) => (
													<div key={index}>
														<text style={{ color: "white" }}>!* </text>
														{platform.platform.name === "PlayStation"
															? "PS4/PS5"
															: platform.platform.name === "Apple Macintosh"
															? "macOS"
															: platform.platform.name}
														<text style={{ color: "white" }}> *!</text>
													</div>
											  ))
											: null}
									</div>
									<img
										className={style.imageDetail_api}
										src={videogame.background_image}
									/>
									<div className={style.genres}>
										<div className={style.tittle_genres}>Genres:</div>
										{videogame.genres?.map((genre, index) => (
											<div key={index}>
												<text style={{ color: "white" }}>!*</text>{" "}
												{genre.name === "Massively Multiplayer"
													? "MMO"
													: genre.name}
												<text style={{ color: "white" }}> *!</text>
											</div>
										))}
									</div>
								</div>
							</>
						) : (
							<>
								<div className={style.text_name_detail}>{videogame.name}</div>
								<div className={style.text_id}> ID: {videogame.id}</div>

								<div className={style.divAll}>
									<div className={style.platforms}>
										<div className={style.tittle_genres}>Plaforms:</div>
										{videogame.platforms?.map((platform, index) => (
											<div key={index}>
												<text style={{ color: "white" }}>!* </text>
												{platform === "PlayStation"
													? "PS4/PS5"
													: platform === "Apple Macintosh"
													? "macOS"
													: platform === "Commodore / Amiga"
													? "Amiga"
													: [platform]}
												<text style={{ color: "white" }}> *!</text>
											</div>
										))}
									</div>
									<img
										className={style.imageDetail_api}
										src={videogame.image}
									/>
									<div className={style.genres}>
										<div className={style.tittle_genres}>Genres:</div>
										{videogame.Genres?.map((genre, index) => (
											<div key={index}>
												<text style={{ color: "white" }}>!*</text>{" "}
												{genre.name === "Massively Multiplayer"
													? "MMO"
													: genre.name}
												<text style={{ color: "white" }}> *!</text>
											</div>
										))}
									</div>
								</div>
							</>
						)}
						<div className={style.header_detail}>
							<button
								onClick={() => handleClick()}
								className={style.button_back}>
								Go Back
							</button>
						</div>
						{videogame.source_by === "Api" ? (
							<div
								className={style.text_description_detail}
								dangerouslySetInnerHTML={htmlContent}></div>
						) : (
							<div className={style.text_description_detail}>
								{videogame.description}
							</div>
						)}

						<div className={style.footer_detail}>
							<div className={style.text_release_detail}>
								Released:{" "}
								<text className={style.text_released}>
									{videogame.released}
								</text>
							</div>
							<div className={style.text_rating_detail}>
								Rating:{" "}
								<text className={style.text_rating}>{videogame.rating}</text>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};
