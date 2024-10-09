//Importa a instância do Express configurada em index.js
const app = require("./index");
const cors = require('cors');

const corsOptions = {
    origin:'*', // Substitue pela origem permitida
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE',//Métodos http permitidos
    credentials:true,//Permite uso de cookies e credenciais
    opitionSuccessStatus:204, // Define o status de respostas para o método OPTIONS
};

app.use(cors(corsOptions));
//Inicia o servidor na porta 5000, tornando a API acessível em http://localhost:5000
app.listen(5000);