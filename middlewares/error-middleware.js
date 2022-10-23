const ApiError = require("../exceptions/api-error");

module.exports = function (err, req, res, next) {
   console.log(err);

   if (err instanceof ApiError) {
      return res
         .status(err.status)
         .json({ message: err.message, errors: err.errors });
   } // если эту ошибку мы предусмотрели

   return res.status(500).json({ message: "Произошла непривденная ошибка" });
};
