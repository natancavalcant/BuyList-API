const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["authorization"].split(" ")[1];

    const { user_id } = req.params;

    console.log(token)

    if (!token) {
      throw "Token necessário";
    }

    try {
      const decoded = jwt.verify(token, "senhasupersecreta");

      if (user_id != decoded.id) {
        throw "Usuário não é dono do Token"
      }
      req.user = decoded;
    } catch (err) {
      throw "Token inválido: " + err;
    }

    return next();
  } catch (err) {
    res.status(500).json({ "err": err });
  }
};
