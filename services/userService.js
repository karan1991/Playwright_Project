import { BaseService } from "./baseService";

export class UserService
    extends BaseService {
    constructor(request) {
        super(request)
    }
    async getUsers(pageNumber) {
        return await this.request.get(
            `/api/users?page=${pageNumber}`, {
            headers: this.headers
        }
        );
    }
    async updateRequest(id, name, job) {
        return await this.request.put(`/api/users/${id}`,
            {
                headers: this.headers,
                data:
                {
                    name,
                    job
                }
            })
    }

    async patchUpdate(id, job) {
        return await this.request.patch(`/api/users/${id}`, {
            headers: this.headers,
            data: {
                job
            }
        })
    }

    async createUser(name, job) {
        return await this.request.post('/api/users', {
            headers: this.headers,
            data:
            {
                name,
                job
            }
        }
        );

    }
    async getSingleUser(id) {
        return this.request.get(`/api/users/${id}`,
            {
                headers: this.headers
            })
    }

    async login(username, password) {
        return this.request.post('/api/login', {
            headers: this.headers,
            data: { username, password }
        });
    }

    async getUsersWithToken(token) {
        return this.request.get('/api/users?page=2',
            {
                headers:
                {
                    Authorization: `Bearer ${token}`, 'x-api-key': process.env.API_KEY

                }

            }
        )

    }

}