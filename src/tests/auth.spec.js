const request = require('supertest');
const app = require('../app');
const sequelize = require('../config');

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

// Test cases for authentication endpoints
describe('POST /auth/register', () => {
    it('should register user successfully with default organisation', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                password: 'password123',
                phone: '1234567890',
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('status', 'success');
        expect(res.body.data).toHaveProperty('user');
        expect(res.body.data.user).toHaveProperty('firstName', 'John');
        expect(res.body.data.user).toHaveProperty('email', 'john@example.com');
        expect(res.body.data).toHaveProperty('accessToken');     

    });

    

    it('should fail if required fields are missing', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                firstName: 'Jane',
            });
        expect(res.statusCode).toEqual(422);
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toContainEqual({
            field: 'lastName',
            message: 'Last name is required'
        });
        expect(res.body.errors).toContainEqual({
            field: 'email',
            message: 'Email is required'
        });
        expect(res.body.errors).toContainEqual({
            field: 'password',
            message: 'Password is required'
        });
    });


    it('should fail if there is a duplicate email', async () => {
        await request(app)
            .post('/auth/register')
            .send({
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jane@example.com',
                password: 'password123',
                phone: '1234567890',
            });

        const res = await request(app)
            .post('/auth/register')
            .send({
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jane@example.com', // duplicate email
                password: 'password123',
                phone: '1234567890',
            });

        console.log('Duplicate email response:', res.body);

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'Email already in use');
    });
});


describe('POST /auth/login', () => {
    it('should log the user in successfully', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'john@example.com',
                password: 'password123',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 'success');
        expect(res.body.data).toHaveProperty('accessToken');
    });
})
