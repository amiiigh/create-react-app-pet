const express = require('express');
const app = express();
const port = 8080;
const animals = require('./animals')

const animalBreeds = {
	'Dog' : ['Husky', 'BullDog', 'Golden Retriever'],
	'Cat' : ['Persian', 'Thai']
};

app.get('/animals', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.json(animalBreeds);
});

app.get('/search', (req, res) => {
	console.log(req.query);
	let searchResult = [];
	for(let animal of animals) {
		if (animal.animal === req.query.animal &&
			animal.breed === req.query.breed &&
			animal.age <= req.query.maxAge &&
			animal.location === req.query.location) {
			searchResult.push(animal);
		}
	}
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.json(searchResult);
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
});