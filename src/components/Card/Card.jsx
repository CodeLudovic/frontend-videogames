/* eslint-disable*/
import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Card.module.css";
export const Card = ({ item }) => {
	return (
		<>
			<NavLink to={`/videogames/detail/${item.id}`} className={style.nav_link}>
				<div className={style.card}>
					<div
						className={style.stars}
						style={
							item.rating < 3
								? { color: "red" }
								: item.rating > 3 && item.rating < 4
								? { color: "gold" }
								: item.rating > 4
								? { color: "#008000" }
								: { color: "#008000" }
						}>
						Rating: {item.rating}
					</div>
					{item.source_by === "Api" ? (
						<>
							<div>
								<img src={item.background_image} className={style.image_card} />
							</div>

							<div className={style.text_name}>{item.name}</div>

							<div
								className={style.genre}
								style={{ gridTemplateRows: "1fr 1fr 1fr" }}>
								{item.genres?.length === 0
									? "Not contains Genres"
									: item.genres?.map((genre) => <div>&nbsp;{genre.name}</div>)}
							</div>
						</>
					) : (
						<>
							<div>
								<img src={item.image} className={style.image_card} />
							</div>

							<div className={style.text_name}>{item.name}</div>

							<div
								className={style.genre}
								style={{ gridTemplateRows: "1fr 1fr 1fr" }}>
								{item.Genres?.length === 0 ? (
									<p>Genres Unavaliable</p>
								) : (
									item.genres?.map((genre) => <div>&nbsp;{genre.name}</div>)
								)}
							</div>
						</>
					)}
				</div>
			</NavLink>
		</>
	);
};
