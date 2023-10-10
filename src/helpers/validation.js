/*eslint-disable*/
import { REGEXURL, REGEXDATE } from "./data";

export function validate(form) {
	let errors = {};
	if (form.name === "") {
		errors.name = "Field name cannot be empty";
	}
	if (form.description === "") {
		errors.description = "Game must have at least a short description";
	}
	if (form.platforms.length < 1) {
		errors.platforms = "Game must have at least 1 platform";
	}
	if (form.genres.length < 1) {
		errors.genres = "Game must have at least 1 genre";
	}
	if (!REGEXURL.test(form.image) || form.image === "") {
		errors.image = "URL must be valid";
	}
	if (!REGEXDATE.test(form.release)) {
		errors.release = "Game must be a valid date";
	}
	if (form.rating < 1 || form.rating > 5) {
		errors.rating = "Game's rating must be a number between 1 and 5";
	}
	return errors;
}
