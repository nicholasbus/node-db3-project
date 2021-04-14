const Scheme = require("./scheme-model");

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (!scheme) {
      res
        .status(404)
        .json({ message: `scheme with scheme_id ${req.params.id} not found` });
    } else {
      req.scheme = scheme;
      next();
    }
  } catch (e) {
    next(e);
  }
};

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body;

  if (
    scheme_name === undefined ||
    scheme_name.length === 0 ||
    typeof scheme_name !== "string"
  ) {
    res.status(400).json({ message: "invalid scheme_name" });
  } else {
    next();
  }
};

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const { step_number, instructions } = req.body;
  if (
    instructions === undefined ||
    instructions.length === 0 ||
    typeof instructions !== "string" ||
    step_number === undefined ||
    isNaN(step_number) ||
    step_number < 1
  ) {
    res.status(400).json({ message: "invalid step" });
  } else {
    next();
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
