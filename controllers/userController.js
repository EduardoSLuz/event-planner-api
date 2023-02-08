const fs = require('fs');

const urlUsers = `${__dirname}/../dev-data/users.json`;
const users = JSON.parse(fs.readFileSync(urlUsers));

// POST USERS SIGN UP
exports.signUp = (req, res) => {
  const data = Object.assign(req.body);

  if (
    !data.firstName ||
    !data.lastName ||
    !data.birthDate ||
    !data.city ||
    !data.country ||
    !data.email ||
    !data.password ||
    !data.country ||
    !data.confirmPassword
  )
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid Resquest!',
    });

  // It's functional
  /*
  const emailExists = users.find((el) => el.email === data.email);

  if (emailExists)
    return res.status(404).json({
      status: 'Fail',
      message: 'Email Already Exists!',
    });

  if (data.password !== data.confirmPassword)
    return res.status(404).json({
      status: 'Fail',
      message: 'ConfirmPassword is different from Password!',
    });
  */

  const newId =
    users.length > 0 && users[users.length - 1]._id
      ? `${users[users.length - 1]._id * 1 + 1}`
      : '1';
  const newUser = { _id: newId, ...data };

  users.push(newUser);

  fs.writeFile(urlUsers, JSON.stringify(users), (error) => {
    res.status(201).json({
      status: 'OK',
      message: 'The user has been successfully registered!',
      data: {
        event: newUser,
      },
    });
  });
};

// POST USERS SIGN IN
exports.signIn = (req, res) => {
  const data = Object.assign(req.body);

  if (!data.email || !data.password)
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid Resquest!',
    });

  const userExist = users.find(
    (el) => el.email === data.email && el.password === data.password
  );

  if (!userExist)
    return res.status(404).json({
      status: 'Fail',
      message: 'User Does Not Exist!',
    });

  res.status(200).json({
    status: 'OK',
    msg: 'The user has been successfully logged in!',
    data: {
      user: userExist,
    },
  });
};
