export class BaseService{
    constructor(request){
        this.request=request
        this.headers=
        {'x-api-key':process.env.API_KEY
        }
    };
}