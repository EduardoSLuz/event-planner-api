const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const fs = require('fs');

chai.use(chaiHttp);

const events = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/events-default.json`, 'utf8')
);

const idMax = events[events.length - 1]._id;
const num = new Date('2023-01-01').getTime() - 10;
const weekdays = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

// Test Suits of Events
describe('Events', () => {
  // No describe podemos passar um texto para identificação
  describe('/GET Events', () => {
    const id = Math.floor(Math.random() * idMax);
    const wday = weekdays[Math.floor(Math.random() * weekdays.length)];

    it('Testing GET All Events', (done) => {
      chai
        .request('http://localhost:8000')
        .get('/api/v1/events')
        .end((err, res) => {
          if (res.ok) {
            res.should.have.status(200);
            res.body.should.be.a('array');
          } else {
            res.should.have.status(404);
            res.body.should.be.a('object');
          }
          done();
        });
    });

    it('Testing GET Events By Id', (done) => {
      chai
        .request('http://localhost:8000')
        .get('/api/v1/events/' + id)
        .end((err, res) => {
          if (res.ok) {
            res.should.have.status(200);
            res.body.should.be.a('object');
          } else {
            res.should.have.status(404);
            res.body.should.be.a('object');
          }
          done();
        });
    });

    it('Testing GET Events By Weekday', (done) => {
      chai
        .request('http://localhost:8000')
        .get('/api/v1/events/' + wday)
        .end((err, res) => {
          if (res.ok) {
            res.should.have.status(200);
            res.body.should.be.a('array');
          } else {
            res.should.have.status(404);
            res.body.should.be.a('object');
          }
          done();
        });
    });
  });

  describe('/POST Events', () => {
    const id = Math.floor(Math.random() * idMax);
    const date = new Date(num * Math.random()).toISOString();
    const event = {
      description: 'You To-Do!' + id,
      dateTime: date,
      createdAt: date,
    };
    it('Testing POST Create Event', (done) => {
      chai
        .request('http://localhost:8000')
        .post('/api/v1/events')
        .send(event)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('/DELETE Events', () => {
    const id = Math.floor(Math.random() * idMax);
    const wday = weekdays[Math.floor(Math.random() * weekdays.length)];

    it('Testing DELETE Events By Id', (done) => {
      chai
        .request('http://localhost:8000')
        .delete('/api/v1/events/' + id)
        .end((err, res) => {
          if (res.ok) {
            res.should.have.status(200);
            res.body.should.have.property('data').property('event');
          } else {
            res.should.have.status(404);
          }

          res.body.should.have.property('status');
          res.body.should.have.property('message');
          done();
        });
    });

    it('Testing DELETE Events By Weekday', (done) => {
      chai
        .request('http://localhost:8000')
        .delete('/api/v1/events/' + wday)
        .end((err, res) => {
          res.body.should.be.a('object');

          if (res.ok) {
            res.should.have.status(200);
            res.body.should.have.property('data').property('event');
          } else {
            res.should.have.status(404);
          }

          res.body.should.have.property('status');
          res.body.should.have.property('message');
          done();
        });
    });
  });
});

// Test Suits of Users
describe('Users', () => {
  describe('/POST Users', () => {
    const code = Math.floor(Math.random() * 1234567);
    let date = new Date(num * Math.random());
    date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const user = {
      firstName: 'Fulano',
      lastName: 'De Tal' + code,
      birthDate: date,
      city: 'Campo Grande',
      country: 'Brasil',
      email: 'fulanodetal' + code + '@gmail.com',
      password: code,
      confirmPassword: code,
    };

    const userLogin = {
      email: 'fulanodetal@gmail.com',
      password: '123456',
    };
    it('Testing POST SignUp', (done) => {
      chai
        .request('http://localhost:8000')
        .post('/api/v1/users/signUp')
        .send(user)
        .end((err, res) => {
          res.body.should.be.a('object');
          if (res.ok && res.created) {
            res.should.have.status(201);
            res.body.should.have.property('data').property('user');
          } else {
            res.should.have.status(404);
          }

          res.body.should.have.property('status');
          res.body.should.have.property('message');
          done();
        });
    });

    it('Testing POST SignIn', (done) => {
      chai
        .request('http://localhost:8000')
        .post('/api/v1/users/signIn')
        .send(userLogin)
        .end((err, res) => {
          res.body.should.be.a('object');
          if (res.ok) {
            res.should.have.status(200);
            res.body.should.have.property('data').property('user');
          } else {
            res.should.have.status(404);
          }
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          done();
        });
    });
  });
});
