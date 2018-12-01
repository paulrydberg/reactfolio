const router = require('express').Router();
const passport = require('passport');
// const keys = require('../../config/keys');
// Validation
const validateSaveInput = require('../../validation/saveData');

// Load saveData model
const SavedData = require('../../models/saveData');

// @route   POST api/dashboard
// @desc    Create save
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateSaveInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newSave = new SavedData({
      title: req.body.title,
      description: req.body.description,
      dates: req.body.dates,
      user: req.user.id,
      theRawNums: req.body.theRawNums
    });

    newSave.save().then(saveData => res.json(saveData));
  }
);

// @route   POST api/dashboard
// @desc    View prior saved data
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    SavedData.find({ user: req.user.id })
      .sort({ date: -1 })
      .then(saveData => {
        if (!saveData) {
          errors.nodata = `This account doesn't seem to have any data saved.`;
          return res.status(404).json(errors);
        }

        res.json(saveData).catch(err => res.status(404).json(err));
      });
  }
);

// @route   DELETE api/dashboard/:id
// @desc    Delete saved data
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    SavedData.find({ user: req.user.id }).then(usersSavedData => {
      SavedData.findById(req.params.id)
        .then(singleSave => {
          // Check for single save of all users saved data
          if (singleSave.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete
          singleSave.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res
            .status(404)
            .json({ saved_data_not_found: 'Referenced data not found' })
        );
    });
  }
);

module.exports = router;
