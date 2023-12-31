module.exports = class UsuarioDAL {

    constructor(conexao){
        this.conexao = conexao;
    }

    findAll(){
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT u.id_usuario, u.user_name, " + "u.email, u.telefone", function (error, elements){
                if (error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    findUserEmail(camposForm) {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT * FROM usuario WHERE user_name = ? or email = ?", [camposForm.user_name, camposForm.email], function (error, elements) {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };
findID(id) {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT u.id_usuario, u.user_name," + "u.senha, u.email, u.telefone = ?", [id], function(error, elements){
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    create(camposJson) {
        return new Promise((resolve, reject) => {
            this.conexao.query("insert into usuario set ?", camposJson, function(error, elements){
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    update(camposJson) {
        return new Promise((resolve, reject) => {
            this.conexao.query("UPDATE usuario SET user_name = ?, senha = ?, " + "email = ?, telefone = ?" + "WHERE id_usuario = ?", [camposJson.user_name, camposJson.senha, camposJson.email, camposJson.telefone, camposJson.id_usuario], function (error, results, fields){
                if (error){
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            this.conexao.query("UPDATE usuario SET status_usu = 0 WHERE id_usuario = ?", [id], function(error, results) {
                if (error) {
                    return reject(error);
                }
                return resolve(results[0]);
            });
        });
    }

}