const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UserController {
  async create_user(req, res) {
    try {
      const { username, password, is_adm = false } = req.body;
      if (!(username && password)) {
        throw "Formulário inválido"
      }
      if (is_adm) {
        const { adm_token } = req.query;
        if (!adm_token) {
          throw "Adm token expected"
        }
        if (adm_token != process.env.ADM_TOKEN) {
          throw "Adm token wrong"
        }
      }
      const user = await User.findOne({ where: { username: username } })
      if (user != null) {
        throw "Usuário já cadastrado"
      }

      const newUser = await User.create({ username: username, password: password, is_adm: is_adm })
      res.status(200).json(newUser);

    } catch (err) {
      res.status(500).json({ "err": err });
    }
  }
  async auth_user(req, res) {
    try {
      const { username, password } = req.body;
      if (!(username && password)) {
        res.status(400).send("All input is required");
      }

      const user = await User.findOne({ where: { username: username } });

      if (!user) {
        throw "Usuário não encontrado";
      }

      const verify = await bcrypt.compare(password, user.password);
      console.log(verify)
      if (!verify) {
        throw "Senha incorreta";
      }

      const token = jwt.sign({ id: user.id, username, is_adm: user.is_adm }, process.env.CRYPT_HASH, { expiresIn: 86400000 });
      res.status(200).json({ "sucess": true, "token": token });
    } catch (err) {
      res.status(500).json({ "err": err });
    }
  }

  async get_user(req, res) {
    try {
      const { user_id } = req.params;
      const { id } = req.user;

      const user = await User.findByPk(user_id);
      if (user == null) {
        throw "usuário não encontrado";
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ "err": err });
    }
  }


  async update_user(req, res) {

    try {
      const { username, password } = req.body;
      const { user_id } = req.params;
      const user = await User.findByPk(user_id);
      await user.update({ username: username, password: password })
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ "err": err });
    }
  }


  async delete_user(req, res) {
    try {
      const { user_id } = req.params
      const user = await User.findOne({ where: { id: user_id } })

      if (user == null) {
        throw "usuário não encontrado!"
      }

      const userDeleted = await user.destroy();
      console.log(userDeleted);
      res.status(200).json({ ...userDeleted, deleted: true });
    } catch (err) {
      res.status(500).json({ "err": err });
    }
  }
}

module.exports = new UserController();