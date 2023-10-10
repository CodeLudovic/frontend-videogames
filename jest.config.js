export default {
	moduleDirectories: ["./node_modules", "src"],
	// other important stuff

	moduleNameMapper: {
		"\\.(css|scss)$": "identity-obj-proxy",
	},
	testEnvironment: "jsdom",
};
