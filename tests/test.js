const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const fs = require('fs');

chai.use(chaiHttp);

// const events = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/events-default.json`, 'utf8')
// );

// const idMax = events[events.length - 1]._id;
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

var token = '';
const code = Math.floor(Math.random() * 1234567);
let date = new Date(num * Math.random());
date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
const user = {
  firstName: 'Fulano' + code,
  lastName: 'De Tal',
  birthDate: date,
  city: 'Campo Grande',
  country: 'Brasil',
  email: 'fulanodetal' + code + '@email.com',
  password: `${code}`,
  confirmPassword: `${code}`,
};

// Test Suits of Users Authentication
describe('Users Authentication', () => {
  describe('/POST Users', () => {
    const userLogin = {
      email: user.email,
      password: `${code}`,
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
            res.body.should.have.property('token');
            token = res.body.token;
          } else {
            res.should.have.status(401);
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
            res.body.should.have.property('token');
            token = res.body.token;
          } else {
            res.should.have.status(401);
          }
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          done();
        });
    });
  });
});

// Test Suits of Events
describe('Events', () => {
  let eventId = 'abc123';
  const wday = weekdays[Math.floor(Math.random() * weekdays.length)];

  // No describe podemos passar um texto para identificação
  describe('/POST Events', () => {
    const date = new Date(num * Math.random()).toISOString();
    const event = {
      description: 'You To-Do!' + eventId,
      dayOfWeek: wday,
      dateTime: date,
    };
    it('Testing POST Create Event', (done) => {
      chai
        .request('http://localhost:8000')
        .post('/api/v1/events')
        .set('Cookie', 'jwt=' + token)
        .send(event)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('data').property('event');

          eventId = res.body.data.event._id;

          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('/GET Events', () => {
    it('Testing GET All Events', (done) => {
      chai
        .request('http://localhost:8000')
        .get('/api/v1/events')
        .set('Cookie', 'jwt=' + token)
        .end((err, res) => {
          if (res.ok) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('events');
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
        .get('/api/v1/events/' + eventId)
        .set('Cookie', 'jwt=' + token)
        .end((err, res) => {
          if (res.ok) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('event');
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
        .get('/api/v1/events?dayOfWeek=' + wday)
        .set('Cookie', 'jwt=' + token)
        .end((err, res) => {
          if (res.ok) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('events');
          } else {
            res.should.have.status(404);
            res.body.should.be.a('object');
          }
          done();
        });
    });
  });

  describe('/DELETE Events', () => {
    it('Testing DELETE Events By Id', (done) => {
      chai
        .request('http://localhost:8000')
        .delete('/api/v1/events/' + eventId)
        .set('Cookie', 'jwt=' + token)
        .end((err, res) => {
          if (res.ok) {
            res.should.have.status(200);
            res.body.should.have.property('event');
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
        .delete('/api/v1/events?dayOfWeek=' + wday)
        .set('Cookie', 'jwt=' + token)
        .end((err, res) => {
          res.body.should.be.a('object');

          if (res.ok) {
            res.should.have.status(200);
            res.body.should.have.property('eventsDeleted');
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
  describe('/PATCH Users', () => {
    const userPatch = {
      firstName: 'test' + user.firstName,
      lastName: user.lastName + '2',
      birthDate: Date.now(),
      city: user.city + '2',
      country: user.country + '2',
      email: 'test' + user.firstName + '123@email.com',
    };

    it('Testing PATCH Update Current User', (done) => {
      chai
        .request('http://localhost:8000')
        .patch('/api/v1/users')
        .set('Cookie', 'jwt=' + token)
        .send(userPatch)
        .end((err, res) => {
          res.body.should.be.a('object');
          if (res.ok) {
            res.should.have.status(200);
            res.body.should.have.property('data').property('user');
          } else {
            res.should.have.status(401);
          }

          res.body.should.have.property('status');
          res.body.should.have.property('message');
          done();
        });
    });
  });

  describe('/DELETE Users', () => {
    const userPatch = {
      firstName: 'test' + user.firstName,
      lastName: user.lastName + '2',
      birthDate: Date.now(),
      city: user.city + '2',
      country: user.country + '2',
      email: 'test' + user.firstName + '123@email.com',
    };

    it('Testing DELETE Delete Current User', (done) => {
      chai
        .request('http://localhost:8000')
        .delete('/api/v1/users')
        .set('Cookie', 'jwt=' + token)
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });
  });
});
