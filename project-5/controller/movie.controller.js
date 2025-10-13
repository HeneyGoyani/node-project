const Movie = require("../model/movie.model");
const path = require("path");
const fs = require("fs");

exports.homepage = async (req, res) => {
    try {
        const searchQuery = req.query.q || "";
        let movies;

        if (searchQuery) {
            movies = await Movie.find({
                $or: [
                    { name: { $regex: searchQuery, $options: "i" } },
                    { category: { $regex: searchQuery, $options: "i" } },
                    { language: { $regex: searchQuery, $options: "i" } }
                ]
            });
        } else {
            movies = await Movie.find();
        }

        res.render("index", { movies, searchQuery });
    } catch (error) {
        console.log(error);
    }
};

exports.addForm = async (req, res) => {
    res.render('add_movie')
}

exports.addMovie = async (req, res) => {
    const image = req.file ? '/uploads/' + req.file.filename : "";
    await Movie.create({ ...req.body, image });
    res.redirect("/");
}

exports.editForm = async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.render("edit_movie", { movies: movie });
}

exports.editmovie = async (req, res) => {
    const id = req.params.id;
    let movie = await Movie.findById(id);
    if (!movie) {
        return res.redirect("back");
    }
    let imagePath = movie.image;
    if (req.file) {
        const oldImagePath = path.join(__dirname, "..", movie.image);
        if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
        }
        imagePath = `/uploads/${req.file.filename}`;
    }
    await Movie.findByIdAndUpdate(id, { ...req.body, image: imagePath }, { new: true });
    res.redirect("/");
};

exports.deletemovie = async (req, res) => {
    const id = req.params.id;
    const record = await Movie.findById(id);
    if (record?.image) {
        const imagePath = path.join(__dirname, "..", record.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }
    await Movie.findByIdAndDelete(id);
    res.redirect("/");
};

exports.viewSingleMovie = async (req, res) => {
    try {
        const id = req.params.id;
        const movie = await Movie.findById(id);

        if (!movie) {
            return res.status(404).send("Movie not found");
        }

        res.render("view_movie", { movie });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};
