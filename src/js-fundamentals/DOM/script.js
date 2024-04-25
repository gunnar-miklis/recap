// NOTE: get and style elements
const heading = document.querySelector('h1');
heading.innerText = 'HEADING';
heading.style.textDecoration = 'underline';
function generateRandomColor() {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
setInterval(() => {
	heading.style.color = generateRandomColor();
}, 300);

// NOTE: array with forEach()
const allColorOptions = document.querySelectorAll('option');
allColorOptions.forEach((option) => (option.style.color = option.innerHTML));

// NOTE: create new elements (at specific locations)
const newParagraph = document.createElement('p');
newParagraph.innerText = 'added by script.js';
const firstSection = document.querySelector(
	'body > div > section:nth-child(1)',
);
firstSection.appendChild(newParagraph);

// NOTE: set attributes
const colorOption3 = document.querySelector('#colors > option:nth-child(3)');
const colorOption4 = document.createElement('option');
const newColor = 'magenta';
colorOption4.innerText = newColor;
colorOption4.setAttribute('value', newColor);
colorOption3.parentNode.appendChild(colorOption4);

// NOTE: advanced selecting & add class names
const evenDivs = document.querySelectorAll(
	'.section:nth-child(7) div:nth-child(even)',
);
for (const div of evenDivs) {
	div.classList.add('inverted-background');
}

// NOTE: event, onclick
for (const div of evenDivs) {
	div.onclick = () => alert('CLICK!');
}

// NOTE: eventListener, onchange/oninput
const inputName = document.getElementById('name');
inputName.addEventListener('input', handleInput);
function handleInput(e) {
	const input = e.target.value;
	!input ? handleToggle() : handleToggle(input);
}

const toggleParagraph = document.createElement('p');
const toggleSection = document.createElement('section');
toggleSection.setAttribute('class', 'section');
toggleSection.setAttribute('id', 'section-toggle');
toggleSection.appendChild(toggleParagraph);

function handleToggle(toggle) {
	if (!toggle) {
		const section = document.getElementById('section-toggle');
		if (section) section.remove();
	} else {
		toggleParagraph.innerText = toggle;
		inputName.parentNode.parentNode.parentNode.insertBefore(
			toggleSection,
			document.querySelector('.section:nth-child(8)'),
		);
	}
}

// NOTE: fetch api
async function fetchAPI(url) {
	try {
		const response = await fetch(url);
		const responseJson = await response.json();

		for (let i = 0; i < 5; i++) {
			const imgUrl = responseJson[i].links.patch.small;
			const img = document.createElement('img');
			img.setAttribute('src', imgUrl);
			fetchApiButton.parentNode.appendChild(img);
		}

		fetchApiButton.remove();
	} catch (error) {
		console.error(error);
	}
}
const fetchApiButton = document.getElementById('fetch-api');
fetchApiButton.onclick = () =>
	fetchAPI('https://api.spacexdata.com/v4/launches');
