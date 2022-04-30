const Category = require('../model/category')

module.exports.getAllCategory = (req, res) => {
    const limit = Number(req.query.limit) || 0;
	const sort = req.query.sort == 'desc' ? -1 : 1;

	Category.find()
		.select(['-_id'])
		.limit(limit)
		.sort({ id: sort })
		.then((categories) => {
			res.json(categories);
		})
		.catch((err) => console.log(err));
}

module.exports.getCategory = (req, res) => {
	const id = req.params.id;

	Category.findOne({
		id,
	})
		.select(['-_id'])
		.then((category) => {
			res.json(category);
		})
		.catch((err) => console.log(err));
}

module.exports.addCategory = (req, res) => {
	if (typeof req.body == undefined) {
		res.json({
			status: 'error',
			message: 'data is undefined',
		});
	} else {
		let categoryCount = 0;
		Category.find()
		  .countDocuments(function (err, count) {
		    categoryCount = count;
		  })
		  .then(() => {
			const category = {
				id: categoryCount + 1,
				title: req.body.title,
				slug: req.body.slug,
				description: req.body.description,
				image: req.body.image,
			};
			Category.create(category)
			.then(category => res.json(category))
			.catch(err => console.log(err, req))
		});
	}
}

module.exports.editCategory = (req, res) => {
    if (typeof req.body == undefined || req.params.id == null) {
		res.json({
			status: 'error',
			message: 'something went wrong! check your sent data',
		});
	} else {
		const id = parseInt(req.params.id)
		Category.findOne({
			id,
		}).then(category => {
			category.title = req.body.title
			category.slug = req.body.slug
			category.description = req.body.description
			category.image = req.body.image
			category.save().then((pro) => res.json(pro))
		})
	}
}

module.exports.deleteCategory = (req, res) => {
    if (req.params.id == null) {
		res.json({
			status: 'error',
			message: 'cart id should be provided',
		});
	} else {
		Category.deleteOne({
			id: req.params.id
		}).then(data => {
			res.json(data)
		}).catch((err) => console.log(err));
	}
}