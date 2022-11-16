import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs'

import User from '@entities/User';
import { UserCreateRequest } from '@use-cases/user-create/user-create.types';

export default class CreateUserUseCase {
  public async execute(userCreateRequest: UserCreateRequest): Promise<User> {
    
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { email: userCreateRequest.email },
    });

    if(checkUserExists) {
      throw new Error('Email address already used.');
    }

    const hashedPassword = await hash(userCreateRequest.password, 8);

    const user = userRepository.create({
      name: userCreateRequest.name,
      email: userCreateRequest.email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}