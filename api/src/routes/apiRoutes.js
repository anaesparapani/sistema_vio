const router = require("express").Router();

const userController = require("../controllers/userController");
const verifyJWT = require("../services/verifyJWT");

const compraController = require("../controllers/compraController");

router.post("/user", userController.createUser);
router.get("/user", verifyJWT, userController.getAllUsers);
router.put("/user", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);
router.post("/login", userController.loginUser);

const organizadorController = require("../controllers/organizadorController");

router.post("/organizador", organizadorController.createOrganizador);
router.get("/organizador", organizadorController.getAllOrganizador);
router.put("/organizador", organizadorController.updateOrganizador);
router.delete("/organizador/:id", organizadorController.deleteOrganizador);

const eventoController = require("../controllers/eventoController");
const upload = require("../services/upload");

//rotas eventoController
router.post("/evento", upload.single("imagem"), eventoController.createEvento);
router.get("/evento/imagem/:id", eventoController.getImagemEvento);
router.get("/evento", verifyJWT, eventoController.getAllEventos);
router.put("/evento", eventoController.updateEvento);
router.delete("/evento/:id", eventoController.deleteEvento);
router.get("/evento/data", verifyJWT, eventoController.getEventosPorData);
router.get("/evento/proximo", verifyJWT, eventoController.getEventosdia);

const ingressoController = require("../controllers/ingressoController");

//rotas ingressoController
router.post("/ingresso", ingressoController.createIngresso);
router.get("/ingresso/evento/:id", ingressoController.getByIdEvento);
router.get("/ingresso", ingressoController.getAllIngresos);
router.put("/ingresso", ingressoController.updateIngresso);
router.delete("/ingresso/:id", ingressoController.deleteIngresso);

// compraController
router.post("/comprasimples", compraController.registrarCompraSimples);
router.post("/compra", compraController.registrarCompra);

module.exports = router;
