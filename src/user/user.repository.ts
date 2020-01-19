import {ApplicationRepository} from '../common/cqrs/application.repository';
import {UserAggregate} from './user.aggregate';
import {Injectable, NotFoundException} from '@nestjs/common';
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

        let entity = await this.repository.findOne({where: {id}});
        if (entity == undefined) {
            throw new NotFoundException();
        }

        return new UserAggregate(entity);
    }

    async findByEmail(email: string): Promise<UserEntity | undefined> {
        return await this.repository
            .createQueryBuilder()
            .where('email = :email', {email})
            .getOne();
    }

}
