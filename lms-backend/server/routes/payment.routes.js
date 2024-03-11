import { Router } from "express";

import { allPayment, buySubcription, cancelSubscription, getRazorepayApiKey, verifySubscription } from "../controllers/payment.controller.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

router
.route('/razorpay-key')
.get(
    isLoggedIn,
    getRazorepayApiKey
    );



router
.route('/subscribe')
.post(
    isLoggedIn,
    buySubcription
    );


router
.route('/verify')
.post(
    isLoggedIn,
    verifySubscription
    );


router
.route('/unsubcribe')
.post(
    isLoggedIn,
    cancelSubscription
    );


router
.route('/')
.get(
    isLoggedIn,
    authorizedRoles('ADMIN'),
    allPayment
    );


export default router;