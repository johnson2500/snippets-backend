export default (schema) => (req, res, next) => {
  const validationObj = {};

  if (Object.keys(req.body).length) {
    validationObj.body = req.body;
  }

  if (Object.keys(req.query).length) {
    validationObj.query = req.query;
  }

  if (Object.keys(req.params).length) {
    validationObj.params = req.params;
  }

  const { error } = schema.validate(validationObj);
  const valid = error == null;

  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join(',');

    console.log('error', message);
    res.status(422).json({ error: message });
  }
};