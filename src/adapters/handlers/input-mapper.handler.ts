import { Request } from 'express';
import { UserCreateRequest } from '@use-cases/user-create/user-create.types';

export default class InputMapperHandler {

    public async inputMapCreateUser(request: Request): Promise<UserCreateRequest> {
        const userCreateRequest: UserCreateRequest = {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password
        }

        return userCreateRequest;   
    }
}