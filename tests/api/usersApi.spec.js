import { test, expect } from '@playwright/test';
import { UserService } from '../../services/userService';
const schema = require('../../schema/userSchema.json');
import Ajv from 'ajv';
require('dotenv').config();

let myservice

test.describe('', () => {
    test.beforeEach(async ({ request }) => {
        myservice = new UserService(request)
    })
    test('verify api', async ({ request }) => {
        const response = await myservice.getUsers(2);
        const body = await response.json();
        const ajv = new Ajv();
        const validate = ajv.compile(schema);
        const result = validate(body.data[0]);
        expect(result).toBeTruthy();

    });

    test('create User', async ({ request }) => {
        const response = await myservice.createUser('Karan', 'SDET')
        expect(response.status()).toBe(201);
        const body = await response.json()

    });

    test('update value', async ({ request }) => {
        const response = await myservice.updateRequest(1, 'kkk', 'Dev')
        expect(response.status()).toBe(200)
        const body = await response.json()
    })

    test('update partial value', async ({ request }) => {
        const response = await myservice.patchUpdate(1, 'Dev')
        expect(response.status()).toBe(200)
        const body = await response.json()
    })

    test('api Chaining', async ({ request }) => {
        const response = await myservice.createUser('Swati', 'QA')
        const body = await response.json()
        const id = body.id
        const userresponse = await myservice.getSingleUser(id)
        const body1 = await userresponse.json()
        expect(userresponse.status()).toBe(200)
    })
    test('token chaining', async ({ request }) => {
        const myservice =new UserService(request);
        const loginResponse = await myservice.login('eve.holt@reqres.in','cityslicka');
        const loginBody = await loginResponse.json();
        const token = loginBody.token;
        const userResponse = await myservice.getUsersWithToken(token);
    });

    test('login through api and open ui',async ({ request, page }) => {
    const myservice =new UserService(request);
    const response =await myservice.login('eve.holt@reqres.in','cityslicka');
    const body =await response.json();
    const token =body.token;
    await page.addInitScript(token => 
    {
      window.localStorage.setItem('token',token );
    }, token);
    await page.goto('/');

});

})


