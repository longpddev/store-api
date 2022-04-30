const express = require("express");
const router = express.Router();
const category = require("../controller/category");

router.get("/", category.getAllCategory);
router.get("/:id", category.getCategory);
router.post("/", category.addCategory);
router.put("/:id", category.editCategory);
router.patch("/:id", category.editCategory);
router.delete("/:id", category.deleteCategory);

module.exports = router;
