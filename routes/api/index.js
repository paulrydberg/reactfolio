const router = require('express').Router();
const coinRoutes = require('./coins');
const userRoutes = require('./users');
const savedData = require('./saveData');
const charts = require('./charts');

router.use('/coins', coinRoutes);
router.use('/dashboard', savedData);
router.use('/users', userRoutes);
router.use('/charts', charts);

module.exports = router;
