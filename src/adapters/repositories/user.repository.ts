import { EntityRepository, Repository } from 'typeorm';

import User from '@entities/User';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public async findByDate(date: Date): Promise<User | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}