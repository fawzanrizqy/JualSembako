const express = require("express");
const Controller = require("../controllers/controller");
const errorHandler = require("../middleware/errorHandler");
const { authUser, authAdmin } = require("../middleware/routeMiddleware");
const ApiController = require("../controllers/ApiController");
const router = express.Router();

////////////////USER///////////////////////
router.post("/glogin", Controller.googleLogin);
router.post("/login", Controller.loginUser);
router.post("/register", Controller.registerUser);

///////////////3RDAPI NO AUTH////////////////////////////////
router.post("/sendemail", ApiController.nodemailerSend);

////////////////MIDDLEWARE///////////////////////////
router.use(authUser);

///////////////3RDAPI////////////////////////////////
router.get("/groceries", ApiController.fetchItemData);
router.post("/midtrans", ApiController.midtransPayment);
router.get("/exports/:id", ApiController.exportXls);
/////////////USERS//////////////////////////////
router.get("/users", authAdmin, Controller.getUser);

///////////////ITEMS/////////////////////////////
router.get("/items", authAdmin, Controller.getItems);
router.post("/items", authAdmin, Controller.createItem);
router.get("/items/:id", authAdmin, Controller.getItemLogs);
router.delete("/items/:id", authAdmin, Controller.deleteItem);
router.put("/items/:id", authAdmin, Controller.updateItem);
////////////////////////SALES///////////////////////
router.get("/sales", Controller.getSales);
router.post("/sales", Controller.createSales);
router.patch("/sales/", Controller.updateTotalSales);
router.patch("/sales/done", Controller.closeSales);
//////////////////////////TRANSACTION/////////////////////
router.get("/transactions", Controller.getTransactions);
router.post("/transactions/:salesId", Controller.postTransactions);
router.get("/transactions/:id", Controller.getDetailTransaction);
router.patch("/transactions/:id", authAdmin, Controller.patchTransactionStatus);
////////////////////////PURCHASES/////////////////////////
router.get("/purchases", authAdmin, Controller.getPurchases);
router.post("/purchases", authAdmin, Controller.postPurchases);
router.get("/purchases/:id", authAdmin, Controller.getDetailPurchases);
/////////////////ERROR HANDLER////////////////////////////////
router.use(errorHandler);

module.exports = router;
