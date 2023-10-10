/* eslint-disable */
import { endpoint } from "../../helpers/data.js";
import {
	ADD_VG,
	REMOVE_VG,
	ORDER_BY_ASDC,
	FILTER_BY_GENDER,
	RESET,
	FILTER_BY_SRC,
	ORDER_BY_RATING,
	SET_GENRES,
	ACUMULATION_VGS,
	ADD_SEARCH,
	SET_CREATED,
	GAMES_SEARCHED,
} from "../type/types.js";
import axios from "axios";

export const paginationVGS = () => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(endpoint);

			if (data.length > 0) {
				dispatch({ type: ACUMULATION_VGS, payload: data });
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const addVG = (videogame) => {
	try {
		return async (dispatch) => {
			const { data } = await axios.post(endpoint, videogame);

			return dispatch({
				type: ADD_VG,
				payload: { data: data.response, created: data.response.created },
			});
		};
	} catch (error) {
		console.log(error);
	}
};

export const setCreated = (input) => {
	return {
		type: SET_CREATED,
		payload: input,
	};
};

// Under Construction
// export const removeVG = (id) => {
// 	try {
// 		const endpoint = "http://localhost:3001/videogames/" + id;
// 		return async (dispatch) => {
// 			const { data } = await axios.delete(endpoint);
// 			return dispatch({
// 				type: REMOVE_VG,
// 				payload: data,
// 			});
// 		};
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

export const addSearch = (name) => {
	return async (dispatch) => {
		const { data } = await axios.get(`${endpoint}/name?search=${name}`);
		if (
			data.message == `Not founded games with that name: ${name.toLowerCase()}`
		) {
			return alert(data.message);
		}
		return dispatch({
			type: ADD_SEARCH,
			payload: data.results,
		});
	};
};

export const filterVgGender = (gender) => {
	return {
		type: FILTER_BY_GENDER,
		payload: gender,
	};
};

export const gamesSearched = (games) => {
	return {
		type: GAMES_SEARCHED,
		payload: games,
	};
};

export const filterVgSrc = (src) => {
	return {
		type: FILTER_BY_SRC,
		payload: src,
	};
};

export const orderByAsdc = (order) => {
	return {
		type: ORDER_BY_ASDC,
		payload: order,
	};
};

export const orderByRating = (rating) => {
	return {
		type: ORDER_BY_RATING,
		payload: rating,
	};
};

export const resetVG = () => {
	return {
		type: RESET,
	};
};

export const setAllGenres = () => {
	try {
		return async (dispatch) => {
			const { data } = await axios.get("/genres");
			return dispatch({
				type: SET_GENRES,
				payload: data.response,
			});
		};
	} catch (error) {
		console.log(error);
	}
};
