import { roles } from "@rose-pine/palette";
import fs from "fs";

let template = fs.readFileSync("./prism-rose-pine-template.css", "utf8");
template = JSON.stringify(template);

let highlightColors = {
	foam: {
		main: "rgba(156 207 216 0.12)",
		moon: "rgba(156 207 216 0.12)",
		dawn: "rgba(86 148 159 0.12)",
	},
	love: {
		main: "rgba(235 111 146 0.12)",
		moon: "rgba(235 111 146 0.12)",
		dawn: "rgba(180 99 122 0.12)",
	},
};

for (let variant of ["main", "moon", "dawn"]) {
	let theme = template;
	for (let role in roles) {
		theme = theme
			.replaceAll(`$${role}`, roles[role][variant].hex)
			.replaceAll("$foamHighlight", highlightColors.foam[variant])
			.replaceAll("$loveHighlight", highlightColors.love[variant]);
	}
	fs.writeFileSync(
		`./dist/prism-rose-pine-${variant}.css`,
		JSON.parse(theme),
		"utf8"
	);
	fs.copyFileSync(
		`./dist/prism-rose-pine-${variant}.css`,
		`./example-site/prism-rose-pine-${variant}.css`
	);
}
