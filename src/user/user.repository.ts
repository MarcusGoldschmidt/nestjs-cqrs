import {ApplicationRepository} from '../common/cqrs/application.repository';
import {UserAggregate} from './user.aggregate';
import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {UserEntity} from './user.entity';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class UserRepository extends ApplicationRepository<UserAggregate> {

    constructor(
        @InjectRepository(UserEntity)
        protected readonly repository: Repository<UserEntity>,
    ) {
        super(repository);
    }

    async findById(id: string | number): Promise<UserAggregate> {
        return new UserAggregate(await this.repository.findOne({where: {id}}));
    }

    async findByEmail(email: string): Promise<UserEntity | undefined> {
        return await this.repository
            .createQueryBuilder()
            .where('email = :email', {email})
            .getOne();
    }

}
