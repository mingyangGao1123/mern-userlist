const express = require('express');

const router = express.Router();
const User = require('../../models/User');

// router.get('/', (req,res) => {
//    res.json({"msg": "success"});
// });

router.post('/add', (req, res) => {
  const { firstname, lastname, sex, age, password } = req.body;

  const user = new User({
    firstname,
    lastname,
    sex,
    age,
    password,
  });
  user
    .save()
    .then(result => {
      res.status(200).json('user added');
      console.log(result);
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).send('Server error');
    });
});

router.get('/userlist', (req, res) => {
  User.find((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    return res.status(200).json(user);
    // console.log(user[0]._id);
  });
});

router.get('/:user_id', (req, res) => {
  User.findById(req.params.user_id, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
});

router.delete('/del/:user_id', (req, res) => {
  const id = req.params.user_id;
  User.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      return console.log(err);
    }
    console.log(id);
    res.json({ msg: 'delete successfully' });
  });
});

router.put('/edit/:user_id', (req, res) => {
  User.findById(req.params.user_id, (err, user) => {
    if (err) {
      res.send(err);
    }
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.sex = req.body.sex;
    user.age = req.body.age;
    user.password = req.body.password;
    user.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({ msg: 'User Update' });
    });
  });
});

module.exports = router;
