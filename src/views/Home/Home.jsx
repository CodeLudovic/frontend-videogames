/* eslint-disable */
import React from "react";
import { useEffect, useState } from "react";
import style from "./Home.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import img1 from "../../assets/wp2605458-gaming-wallpapers-1920x1080.jpg";
import img2 from "../../assets/alexander.jpg";
import img3 from "../../assets/wp2614866-wallpaper-hd-games.jpg";
import img4 from "../../assets/wp2617679-wallpaper-hd-games.jpg";
import img6 from "../../assets/wp2717518-ps4-video-game-wallpaper-hd-1080p.jpg";
import img7 from "../../assets/wp2724959-hd-wallpapers-1920x1080-games.jpg";
import img8 from "../../assets/wp2724987-hd-wallpapers-1920x1080-games.jpg";
import img9 from "../../assets/wp2928790-full-hd-games-wallpaper.jpg";
import img10 from "../../assets/wp2936648-full-hd-game-wallpaper-1920x1080.jpg";
import img11 from "../../assets/wp2936675-full-hd-game-wallpaper-1920x1080.jpg";
import img12 from "../../assets/wp2936682-full-hd-game-wallpaper-1920x1080.jpg";
import img13 from "../../assets/wp2936684-full-hd-game-wallpaper-1920x1080.jpg";
import { NavBar } from "../../components/NavBar/NavBar";
import { Cards } from "../../components/Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../../components/Pagination/Pagination";
import { resetVG } from "../../redux/actions/actions";

export const Home = () => {
	const dispatch = useDispatch();
	const [backgroundImage, setBackgroundImage] = useState("");
	const [newVideo, setNewVideo] = useState([]);
	const vg = useSelector((state) => state.allCurrentDataPage);
	const vg2 = useSelector((state) => state.allVideoGames);
	const [page, setPage] = useState(1);
	const [forPage, setForPage] = useState(15);
	const maximum = Math.ceil(vg?.length / forPage);
	const [input, setInput] = useState(1);
	const nav = useNavigate();

	const backgrounds = [
		img1,
		img2,
		img3,
		img4,
		img6,
		img7,
		img8,
		img9,
		img10,
		img11,
		img12,
		img13,
	];
	useEffect(() => {
		const selectRandomPic = () => {
			const randomIndex = Math.floor(Math.random() * backgrounds.length);
			return backgrounds[randomIndex];
		};

		setBackgroundImage(selectRandomPic());
		localStorage.setItem("videogames", JSON.stringify(vg));

		let videojuegos = JSON.parse(localStorage.getItem("videogames"));
		setNewVideo(videojuegos);
	}, []);

	useEffect(() => {
		if (vg2.length === 0) {
			nav("/");
		}
	}, []);

	return (
		<>
			<div className={style.container}>
				<div
					className={style.alexander}
					style={{
						backgroundImage: `url(${backgroundImage})`,
					}}></div>

				<div className={style.navbar}>
					<NavBar setInput={setInput} setPage={setPage} />
				</div>
				<Pagination
					forPage={forPage}
					setPage={setPage}
					page={page}
					maximum={maximum}
					input={input}
					setInput={setInput}
				/>
				<Cards videogames={vg} forPage={forPage} page={page} />
			</div>
		</>
	);
};
