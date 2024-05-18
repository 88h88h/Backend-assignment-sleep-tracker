const { Router } = require("express");
const dataController = require("../controllers/dataController");

const router = Router();

router.post("/sleep", dataController.add);
router.get("/sleep/:userId", dataController.retrieve);
router.delete("/sleep/:recordId", dataController.delete);

module.exports = router;
