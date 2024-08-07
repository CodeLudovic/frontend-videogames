import style from "./LandingPage.module.css";
import bckImg from "../../assets/image.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { paginationVGS, setAllGenres } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/logo.png";
/* eslint-disable*/
export const LandingPage = () => {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const acmvgs = useSelector((state) => state.allCurrentDataPage);
	useEffect(() => {
		dispatch(paginationVGS());
		dispatch(setAllGenres());

		setTimeout(() => {
			setLoading(false);
			localStorage.setItem("videogames", JSON.stringify(acmvgs));
		}, 5000);
		return () => {
			localStorage.removeItem("videogames");
		};
	}, []);
	return (
		<div className={style.container}>
			<span className={style.span}>&lt; Welcome to Code{" "}
				<img
					src={Logo}
					width={"40px"}
					height={"40px"}
				/>
				Games /&gt;;</span>
			<div
				className={`${style.loaderDiv}${
					loading ? "" : style.loaderDiv_fadeOut
				}`}>
				{loading ? (
					<div className={style.loading}>
						Loading Games Data<span className={style.loader}></span>
					</div>
				) : null}
			</div>
			<img src={bckImg} className={style.img} />
			{!loading && (
				<Link to="/home">
					<button className={style.button}> Go Home!</button>
				</Link>
			)}
		</div>
	);
};
