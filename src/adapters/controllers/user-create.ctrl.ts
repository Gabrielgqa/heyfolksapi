import * as Yup from 'yup';
import { Request, Response } from 'express';

import User from '@entities/User';
import InputMapperHandler from '@adapters/handlers/input-mapper.handler';
import CreateUserUseCase from '@use-cases/user-create/user-create.bs';

export default class CreateUserController {
    
  private inputMapperHandler: InputMapperHandler;

  public async execute(request: Request, response: Response): Promise<any> {
    const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string()
            .email()
            .required(),
        password: Yup.string()
            .required()
            .min(6),
    });

    if (!(await schema.isValid(request.body))) {
        return response.status(400).json({ error: 'Error to validate fields.' });
    }

    const userCreateRequest = await this.inputMapperHandler.inputMapCreateUser(request);
    
    if(userCreateRequest) {
        const createUserUseCase = new CreateUserUseCase();
        return createUserUseCase.execute(userCreateRequest);
    }
  }
}