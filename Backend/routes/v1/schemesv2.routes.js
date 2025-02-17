import express from "express";
const router = express.Router();
// export { getAllSchemes, getSchemeById, getSchemeByCategory, getFilteredSchemes };
import { getAllSchemes, getSchemeById, getSchemeByCategory, getFilteredSchemes } from "../../controllers/schemev2.controller.js";
// Example product routes

router.get("/get-all-schemes", getAllSchemes);

router.get("/get-scheme-by-id/:id", getSchemeById);

router.get("/get-scheme-by-category/:category", getSchemeByCategory);

router.get("/get-filtered-schemes", getFilteredSchemes);


export default router;