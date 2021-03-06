const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

function sql(file) {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath, { minify: true });
}

const sqlProvider = {
  trailers: {
    all: sql('./sql/trailer/all.sql'),
    where: sql('./sql/trailer/where.sql'),
    find: sql('./sql/trailer/find.sql'),
    save: sql('./sql/trailer/save.sql'),
    update: sql('./sql/trailer/update.sql'),
    delete: sql('./sql/trailer/delete.sql'),
  },
  users: {
    all: sql('./sql/user/all.sql'),
    where: sql('./sql/user/where.sql'),
    find: sql('./sql/user/find.sql'),
    save: sql('./sql/user/save.sql'),
    update: sql('./sql/user/update.sql'),
    delete: sql('./sql/user/delete.sql'),
  },
  usersTrailers: {
    all: sql('./sql/userTrailer/all.sql'),
    save: sql('./sql/userTrailer/save.sql'),
    find: sql('./sql/userTrailer/find.sql'),
    update: sql('./sql/userTrailer/update.sql'),
    deleteOne: sql('./sql/userTrailer/deleteOne.sql'),
    deleteAll: sql('./sql/userTrailer/deleteAll.sql'),
  },
};

module.exports = sqlProvider;
