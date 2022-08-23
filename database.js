const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
// db.connect();

exports.getFeaturedCards = function () {
  return db
    .query(
      `SELECT * FROM cards
       WHERE featured = true`
    )
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getListedCards = function (data) {
  return db
    .query(
      `SELECT * FROM cards
      WHERE owner_id = $1`,
      [data]
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getFavoriteCards = function () {
  return db
    .query(
      `SELECT * FROM favorites
      JOIN cards ON card_id = cards.id
      WHERE favorites.active = true`
    )
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getSpecificCards = function (searchParams) {
  return db
    .query(
      `SELECT * FROM cards
      WHERE upper(name) LIKE $1
      AND price >= $2
      AND price <= $3`,
      [searchParams[0], searchParams[1], searchParams[2]]
    )
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getConversations = function (search) {
  return db
    .query(`SELECT * FROM conversations`)
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.newListing = function (data) {
  return db
    .query(
      `INSERT INTO cards (name,price,image_url,owner_id)
      VALUES ($1,$2,$3,$4)`,
      [data.name, data.price, data.url, data.owner_id]
    )
    .then(() => {
      return db.query(
        `SELECT * from cards
      WHERE owner_id = $1`,
        [data.owner_id]
      );
    })
    .then((table) => {
      return table.rows;
    });
};

exports.markAsSold = (data) => {
  return db
    .query(
      `UPDATE cards
      SET sold = TRUE
      WHERE cards.id = $1`,
      [data.cardID]
    )
    .then(() => {
      return db.query(
        `SELECT * from cards
      WHERE owner_id = $1`,
        [data.userID]
      );
    })
    .then((table) => {
      return table.rows;
    });
};

exports.likeCard = (cardID) => {
  console.log("cardID:" + cardID);
  return db
    .query(
      `UPDATE favorites
      SET active = true
      WHERE card_id = $1`,
      [cardID]
    )
    .then((res) => {
      return res.rows;
    });
};
