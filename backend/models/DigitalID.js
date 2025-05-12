// Future: Connect to PostgreSQL or blockchain
module.exports = {
    createID: (id, brand, date) => ({
      id,
      brand,
      date,
      authentic: true,
    }),
  };