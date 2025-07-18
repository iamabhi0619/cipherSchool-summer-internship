const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

router.post('/', activityController.createActivity);
router.get('/types', activityController.getActivityTypes);
router.get('/stats', activityController.getActivityStats);
router.get("/quick-stats", activityController.getQuickStats);

module.exports = router;