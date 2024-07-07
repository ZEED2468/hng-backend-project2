const request = require('supertest');
const app = require('../app');
const sequelize = require('../config');
const { User, Organisation } = require('../models');

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

// Test cases for authentication endpoints
describe('Auth Endpoints', () => {
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
        expect(res.body.data).toHaveProperty('accessToken');
        expect(res.body.data.user).toHaveProperty('firstName', 'John');
    });

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

    it('should fail if required fields are missing', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                firstName: 'Jane',
            });
        expect(res.statusCode).toEqual(422);
        expect(res.body).toHaveProperty('errors');
    });

    it('should fail if there is a duplicate email or userId', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'john@example.com', // duplicate email
                password: 'password123',
                phone: '1234567890',
            });
        expect(res.statusCode).toEqual(400); // Adjust based on actual implementation
    });
});
