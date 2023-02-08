const { Op } = require("sequelize");
const Books = require("../model/Book");

class BookController {
  async createBook(req, res) {
    const { name, author, year_release, status } = req.body;

    console.log(req.body);

    try {
      Books.create({
        name: name,
        author: author,
        year_release: year_release,
        status: status,
      }).then(() => {
        res.status(201).redirect("/");
      });
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  }

  async getOneBook(req, res) {
    const { id } = req.params;

    try {
      const book = await Books.findOne({
        where: { id: id },
      }).then((data) => {
        if (!data) {
          return res.status(404).json("The book was not found");
        }
        return res.status(200).json(data);
      });
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  }

  async getAllBook(req, res) {
    try {
      const books = await Books.findAll();
      res.json(books);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  }

  async updateBook(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const book = Books.findOne({
        where: { id: id },
      }).then((data) => {
        if (data) {
          Books.update(
            {
              status: status,
            },
            {
              where: {
                id: id,
              },
            }
          ).then(() => {
            Books.findAll().then((data) => {
              res.status(201).render("main", { books: data });
            });
          });
        } else {
          res.status(404).send("Not fount...");
        }
      });
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  }

  async deleteBook(req, res) {
    const { id } = req.params;
    try {
      await Books.findOne({
        where: { id },
      }).then((data) => {
        if (data) {
          Books.destroy({
            where: {
              id: id,
            },
          }).then(() => {
            Books.findAll().then((books) => {
              res.status(201).render("main", { books: books });
            });
          });
        } else {
          res.status(404).send("Not fount...");
        }
      });
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  }
}

module.exports = new BookController();
