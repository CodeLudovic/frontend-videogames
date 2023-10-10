import style from "../Detail/Detail.module.css";
import styleCt from "./CreateForm.module.css";
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
import { useEffect, useState } from "react";
import { API_KEY } from "../../helpers/data";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addVG, paginationVGS, setCreated } from "../../redux/actions/actions";
import { validate } from "../../helpers/validation";
import { useNavigate } from "react-router-dom";
validate;
/* eslint-disable */
export const CreateForm = () => {
	const [backgroundImage, setBackgroundImage] = useState("");

	const [genres, setGenres] = useState([]);
	const [platforms, setPlatforms] = useState([]);
	const created = useSelector((state) => state.created);
	const [errors, setErrors] = useState({});
	const nav = useNavigate();
	const [form, setForm] = useState({
		name: "",
		description: "",
		platforms: [],
		genres: [],
		image: "",
		release: "",
		rating: 0,
	});
	const dispatch = useDispatch();
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
		handlerGenres();
		handlerPlatforms();
		setErrors(validate(form));
		dispatch(setCreated(false));
		dispatch(paginationVGS());
		const selectRandomPic = () => {
			const randomIndex = Math.floor(Math.random() * backgrounds.length);
			return backgrounds[randomIndex];
		};
		setBackgroundImage(selectRandomPic());

		return () => {
			dispatch(paginationVGS());
		};
	}, []);

	const handlerGenres = async () => {
		const response = await axios(`/genres`);
		const { data } = response;
		setGenres(data);
	};

	const handlerPlatforms = async () => {
		const { data } = await axios(
			`https://api.rawg.io/api/platforms/lists/parents?key=${API_KEY}`
		);
		const { results } = data;
		setPlatforms(results);
	};

	const handlePlatformChange = (event) => {
		const { value, checked } = event.target;
		if (checked) {
			setForm((prevForm) => ({
				...prevForm,
				platforms: [...prevForm.platforms, value],
			}));
		} else {
			setForm((prevForm) => ({
				...prevForm,
				platforms: prevForm.platforms.filter((platform) => platform !== value),
			}));
		}
	};

	const handleGenreChange = (event) => {
		const { value, checked } = event.target;
		if (checked) {
			setForm((prevForm) => ({
				...prevForm,
				genres: [...prevForm.genres, value],
			}));
		} else {
			setForm((prevForm) => ({
				...prevForm,
				genres: prevForm.genres.filter((genre) => genre !== value),
			}));
		}
	};
	const handleChange = (event) => {
		const { name, value } = event.target;

		setForm({
			...form,
			[name]: value,
		});
		setErrors(validate({ ...form, [name]: value }));
		if (Object.keys(errors).length === 0) {
			dispatch(setCreated(true));
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setForm({
			...form,
		});
		if (created) {
			dispatch(addVG(form));
			alert("Your have been created successfully!");
			nav("/home");
		}
	};
	return (
		<div className={style.container}>
			<div
				className={style.alexander}
				style={{
					backgroundImage: `url(${backgroundImage})`,
				}}></div>
			<div className={style.navbar}>
				<NavBar />
			</div>
			<div className={styleCt.formContainer}>
				<form
					className={styleCt.form}
					style={
						Object.keys(errors).length === 0 ? { gap: "25px" } : { gap: "6px" }
					}
					onSubmit={handleSubmit}>
					<div>
						<label>Name:</label>
						<br />
						<input
							id="name"
							name="name"
							style={{
								backgroundColor: "rgba(0, 0, 0, 0.3)",
								color: "white",
								fontSize: "13px",
								borderRadius: "10px",
								border: "1px solid ",
								textAlign: "center",
							}}
							onInput={handleChange}
							value={form.name}
						/>
						{errors.name && (
							<p style={{ color: "red", fontSize: "10px" }}>{errors.name}</p>
						)}
					</div>
					<div>
						<label>Description:</label>
						<br />
						<textarea
							id="description"
							name="description"
							className={styleCt.textArea}
							style={{
								width: "750px",
								height: "30px",
								backgroundColor: "rgba(0, 0, 0, 0.3)",
								color: "white",
								fontSize: "13px",
								paddingTop: "10px",
								borderRadius: "10px",
								border: "1px solid ",
								textAlign: "center",
							}}
							onInput={handleChange}
							value={form.description}
						/>
						{errors.description && (
							<p style={{ color: "red", fontSize: "10px" }}>
								{errors.description}
							</p>
						)}
					</div>
					<label>Platforms:</label>
					<div className={styleCt.setPlatforms}>
						{platforms.map((platform) => (
							<div key={platform.id}>
								<label>
									<input
										id="platforms"
										type="checkbox"
										name="platforms"
										value={platform.name}
										checked={form.platforms.includes(platform.name)}
										onChange={handlePlatformChange}
									/>
									<br />
									{platform.name === "Commodore / Amiga"
										? "Amiga"
										: platform.name === "Apple Macintosh"
										? "macOS"
										: platform.name === "PlayStation"
										? "PS4"
										: platform.name}
								</label>
							</div>
						))}
					</div>
					{errors.platforms && (
						<p style={{ color: "red", fontSize: "10px" }}>{errors.platforms}</p>
					)}
					<div>
						<label>Genres:</label>
						<br />
						<div className={styleCt.setGenres}>
							{genres.response?.map((genre) => (
								<div key={genre.id}>
									<label>
										<input
											className={styleCt.custom_checkbox}
											type="checkbox"
											name="genres"
											value={genre.name}
											checked={form.genres.includes(genre.name)}
											onChange={handleGenreChange}
										/>
										<br />
										{genre.name}
									</label>
								</div>
							))}
						</div>
						{errors.genres && (
							<p style={{ color: "red", fontSize: "10px" }}>{errors.genres}</p>
						)}
					</div>
					URL Image:
					<input
						style={{
							backgroundColor: "rgba(0, 0, 0, 0.3)",
							color: "white",
							border: "1px solid ",
							borderRadius: "10px",
							textAlign: "center",
						}}
						id="image"
						name="image"
						type="text"
						onInput={handleChange}
						value={form.image}
					/>
					{errors.image && (
						<p style={{ color: "red", fontSize: "10px" }}>{errors.image}</p>
					)}
					<div className={styleCt.footer}>
						Released:
						<input
							style={{
								backgroundColor: "rgba(255, 255, 255, 0.8)",
								textAlign: "center",
								borderRadius: "25px",
							}}
							id="release"
							name="release"
							type="date"
							onInput={handleChange}
							value={form.release}
						/>
						Rating:
						<input
							style={{
								backgroundColor: "rgba(255, 255, 255, 0.8)",
								textAlign: "center",
								borderRadius: "25px",
								width: "50px",
							}}
							id="rating"
							name="rating"
							type="number"
							onInput={handleChange}
							value={form.rating}
						/>
					</div>
					{errors.release && (
						<p style={{ color: "red", fontSize: "10px", lineHeight: "0" }}>
							{errors.release}
						</p>
					)}
					{errors.rating && (
						<p style={{ color: "red", fontSize: "10px", lineHeight: "0" }}>
							{errors.rating}
						</p>
					)}
					{Object.keys(errors).length === 0 ? (
						<button type="submit">Enviar</button>
					) : (
						""
					)}
				</form>
			</div>
		</div>
	);
};
