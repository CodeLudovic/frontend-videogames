/* eslint-disable */
import {
	LOAD_VGS,
	ADD_VG,
	ORDER_BY_ASDC,
	FILTER_BY_GENDER,
	RESET,
	FILTER_BY_SRC,
	ACUMULATION_VGS,
	SET_GENRES,
	ADD_SEARCH,
	GAMES_SEARCHED,
	SET_CREATED,
} from "../type/types.js";

export const initialState = {
	videoGames: [],
	allVideoGames: [],
	gameSearched: [],
	allCurrentDataPage: [],
	genres: [],

	created: false,
};

export const rootReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ACUMULATION_VGS:
			return {
				...state,
				videoGames: payload,
				allVideoGames: payload,
				allCurrentDataPage: payload,
			};
		case LOAD_VGS:
			return {
				...state,
				videoGames: payload,
				allVideoGames: payload,
				allCurrentDataPage: payload,
			};
		case ADD_VG:
			return {
				...state,
				allCurrentDataPage: [
					...state.allCurrentDataPage,
					payload.data.dataValues,
				],
				created: payload.created,
			};
		case GAMES_SEARCHED:
			return {
				...state,
				gameSearched: payload,
			};
		case FILTER_BY_GENDER:
			if (payload === "All" && state.gameSearched.length < 1) {
				return {
					...state,
					allCurrentDataPage: [...state.allVideoGames],
				};
			}
			if (state.gameSearched.length > 1) {
				if (payload === "Api") {
					return {
						...state,
						allCurrentDataPage: state.gameSearched.filter(
							(videogame) => videogame.source_by === payload
						),
					};
				}
				if (payload === "DB") {
					return {
						...state,
						allCurrentDataPage: state.gameSearched.filter(
							(videogame) => videogame.source_by === payload
						),
					};
				}
			}

			const byGenders = state.allCurrentDataPage.filter((videogame) => {
				const hasGenre = videogame.genres.some((g) => g.name === payload);
				return hasGenre;
			});
			return {
				...state,
				allCurrentDataPage: [...byGenders],
			};

		case FILTER_BY_SRC:
			if (state.gameSearched.length < 1) {
				if (payload === "Api") {
					return {
						...state,
						allCurrentDataPage: state.allVideoGames.filter(
							(videogame) => videogame.source_by === payload
						),
					};
				}
				if (payload === "DB") {
					return {
						...state,
						allCurrentDataPage: state.allVideoGames.filter(
							(videogame) => videogame.source_by === payload
						),
					};
				}
			} else if (state.gameSearched.length > 1) {
				if (payload === "Api") {
					return {
						...state,
						allCurrentDataPage: state.gameSearched.filter(
							(videogame) => videogame.source_by === payload
						),
					};
				}
				if (payload === "DB") {
					return {
						...state,
						allCurrentDataPage: state.gameSearched.filter(
							(videogame) => videogame.source_by === payload
						),
					};
				}
			}

		case RESET:
			return {
				...state,
				allCurrentDataPage: [...state.allVideoGames],
				gameSearched: [],
			};
		case SET_CREATED:
			return {
				...state,
				created: payload,
			};
		case ORDER_BY_ASDC:
			let result;
			let copy2 = [...state.allCurrentDataPage];

			if (payload === "A") {
				result = copy2.sort((a, b) => a.name.localeCompare(b.name));
			}

			if (payload === "D") {
				result = copy2.sort((a, b) => b.name.localeCompare(a.name));
			}

			if (payload === "RA") {
				result = copy2.sort((a, b) => a.rating - b.rating);
			}

			if (payload === "RD") {
				result = copy2.sort((a, b) => b.rating - a.rating);
			}

			return {
				...state,
				allCurrentDataPage: [...result],
			};
		case SET_GENRES:
			return {
				...state,
				genres: payload,
			};
		case ADD_SEARCH:
			return {
				...state,
				gameSearched: payload,
				allCurrentDataPage: payload,
			};

		default:
			return {
				...state,
				videoGames: state.videoGames,
				allVideoGames: state.allVideoGames,
				allCurrentDataPage: state.allCurrentDataPage,
			};
	}
};
