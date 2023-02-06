// POST USERS SIGN UP
exports.signUp = (req, res) => {
  const data = Object.assign(req.body);

  res.status(201).json({
    status: 'OK',
    msg: 'The user has been successfully registered!',
    data: {
      user: data,
    },
  });
};

// POST USERS SIGN IN
exports.signIn = (req, res) => {
  const data = Object.assign(req.body);

  res.status(200).json({
    status: 'OK',
    msg: 'The user has been successfully logged in!',
    data: {
      user: data,
    },
  });
};
