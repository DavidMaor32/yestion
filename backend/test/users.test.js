// expect - checks 
const axios = require('axios');

describe('Users', () => {
  const URL = `http://localhost:${process.env.PORT || 3000}`;
  let request;
  let server;
  let token='';
  let user;
  let user2;

//   beforeAll(async () => {
//     server = require('../server');
//     request = require('supertest');
//     user = await User.create({
//       name: 'Test User',
//       email: '',
//         password: 'password',
//     });
//     user2 = await User.create({
//       name: 'Test User 2',
//       email: '',
//       password: 'password',
//       role: 'user',
//     });
//     }
//     );
//     afterAll(async () => {
//         await User.destroy({ where: { id: user.id } });
//         await User.destroy({ where: { id: user2.id } });
//         server.close();
//         }
//     );

    describe('POST /users', () => {
        it('should create user', async () => {
            const res = axios.post(`${URL}/users`, {
              fName:"David",
              lName:"Maor",
              email:"m@gmail.com",
                password:"123456",
            });
            expect(res.statusCode).toEqual(201);
            expect(res.headers).toHaveProperty('Authorization');
            token = res.body.token;
            }
        );

        it('should fail to create user: invalid email', async () => {
          const res = axios.post(`${URL}/users`, {
            fName:"David",
            lName:"Maor",
            email:"",
            password:"123456"
          });
            expect(res.statusCode).toEqual(201);
            expect(res.headers).toHaveProperty('Authorization');
            token = res.body.token;
            }
        );
        it('should fail to create user: invalid fName', async () => {
            const res = axios.post('http://localhost:3000/users', {
              fName:"",
              lName:"Maor",
              email:"",
              password:"123456"
            });
              expect(res.statusCode).toEqual(201);
              expect(res.headers).toHaveProperty('Authorization');
              token = res.body.token;
              }
          );
    }
    );

});