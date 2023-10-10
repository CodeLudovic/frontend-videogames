/* eslint-disable */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { NavBar } from "../src/components/NavBar/NavBar";
import store from "./../src/redux/store/store";

describe("Debe renderizar el componente Nav", () => {
	it("Debería inicializar el store", () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<NavBar setInput={() => {}} setPage={() => {}} />
				</BrowserRouter>
			</Provider>
		);
	});
	it("Debe cambiar el estado del texto del boton de la busqueda por fuente", () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<NavBar setInput={() => {}} setPage={() => {}} />
				</BrowserRouter>
			</Provider>
		);
		const sourceButton = screen.getByText("By Source");
		fireEvent.click(sourceButton);
		expect(screen.getByText("Api")).toBeInTheDocument();

		fireEvent.click(sourceButton);
		expect(screen.getByText("DB")).toBeInTheDocument();

		fireEvent.click(sourceButton);
		expect(screen.getByText("By Source")).toBeInTheDocument();
	});
	it("Debería cambiar el orden al seleccionar una opción en el selector de orden", () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<NavBar setInput={() => {}} setPage={() => {}} />
				</BrowserRouter>
			</Provider>
		);

		const orderSelector = screen.getByDisplayValue("Order");
		fireEvent.change(orderSelector, { target: { value: "A" } });
		expect(orderSelector.value).toBe("A");

		fireEvent.change(orderSelector, { target: { value: "RD" } });
		expect(orderSelector.value).toBe("RD");
	});

	it("Debería presionar el botón 'Reset' y verificar que el botón existe", () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<NavBar setInput={() => {}} setPage={() => {}} />
				</BrowserRouter>
			</Provider>
		);
		const resetButton = screen.getByText("Reset");
		fireEvent.click(resetButton);
		expect(resetButton).toBeInTheDocument();
	});
});
