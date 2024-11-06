const connect = require("../db/connect");

module.exports = class userController {
  static async createUser(req, res) {
    const { cpf, email, password, name } = req.body;

    if (!cpf || !email || !password || !name) {
      //Verifica se todos os campos estão preenchidos
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    } else if (isNaN(cpf) || cpf.length !== 11) {
      //Verifica se tem só números e se tem 11 dígitos
      return res.status(400).json({
        error: "CPF inválido. Deve conter exatamente 11 dígitos numéricos",
      });
    } else if (!email.includes("@")) {
      //Verifica se o email tem o @
      return res.status(400).json({ error: "Email inválido. Deve conter @" });
    } else {
      // Construção da query INSERT
      const query = `INSERT INTO usuario (cpf, password, email, name) VALUES('${cpf}', '${password}', '${email}', '${name}')`;
      // Executando a query criada
      try {
        connect.query(query, function (err) {
          if (err) {
            console.log(err);
            console.log(err.code);
            if (err.code === "ER_DUP_ENTRY") {
              return res
                .status(400)
                .json({ error: "O Email já está vinculado a outro usuário" });
            } else {
              return res
                .status(500)
                .json({ error: "Erro interno do servidor" });
            }
          } else {
            return res
              .status(201)
              .json({ message: "Usuário criado com sucesso" });
          }
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro interno do servidor" });
      }
    }
  }

  static async getAllUsers(req, res) {
    const query = "SELECT * FROM usuario";

    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno do Servidor" });
        }

        return res
          .status(200)
          .json({ message: "Lista de usuarios", users: results });
      });
    } catch (error) {
      console.error("Erro ao executar consulta:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  static async updateUser(req, res) {
    // Desestrutura e recupera os dados enviados via corpo da requisição
    const { id, cpf, email, senha, name } = req.body;

    // Validar se todos os campos foram preenchidos
    if (!cpf || !email || !senha || !name) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }
    const query = `UPDATE usuario SET cpf=?,email=?,senha=?,name=? WHERE id_usuario = ?`;
    const values = [cpf, email, senha, name, id];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res
              .status(400)
              .json({ error: "Email já cadastrado por outro usuario" });
          } else {
            console.error(err);
            return res.status(500).json({ error: "Erro interno do servidor" });
          }
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Usuário não encontrado" });
        }
        return res
          .status(200)
          .json({ message: "Usuário atualizado com sucesso" });
      });
    } catch (error) {
      console.error("Erro ao executar consulta", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  static async deleteUser(req, res) {
    const usuarioId = req.params.id;
    const query = `DELETE FROM usuario WHERE id_usuario=?`;
    const values = [usuarioId];
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno no servidor" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Usuário não encontrado" });
        }

        return res.status(200).json({
          message: "Usuario excluido com sucesso",
        });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
};
