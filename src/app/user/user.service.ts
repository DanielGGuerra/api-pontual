import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { EntityRepository, FilterQuery } from '@mikro-orm/sqlite';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { FindUserDTO } from './dtos/find-user.dto';
import { ClsService } from 'nestjs-cls';
import { CleanFilters } from 'src/classes/clean-filters';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly clsService: ClsService,
    private readonly bcryptService: BcryptService,
  ) {}

  async create(createUser: CreateUserDTO): Promise<User> {
    const [isExistUser] = await this.findAll({ email: createUser.email });

    if (isExistUser.length) {
      throw new BadRequestException(
        `E-Mail ${createUser.email} already exists`,
      );
    }

    const user = this.userRepository.create(createUser);
    user.password = await this.bcryptService.hash(user.password);

    await this.userRepository.insert(user);

    return user;
  }

  async find(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ publicId: id });

    if (!user) throw new NotFoundException(`User ${id} not found`);

    return user;
  }

  async findAll(query: FindUserDTO): Promise<[User[], number]> {
    return await this.userRepository.findAndCount(
      CleanFilters.clean<FilterQuery<User>>({
        name: query.name,
        profile: query.profile,
        email: query.email,
      }),
      {
        limit: this.clsService.get<number>('limit'),
        offset: this.clsService.get<number>('offset'),
        orderBy: {
          id: 'DESC',
        },
      },
    );
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      email: email,
    });

    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }

    return user;
  }

  async update(id: string, updateUser: UpdateUserDTO): Promise<void> {
    const user = await this.find(id);
    const updatedUser = await this.userRepository.assign(user, updateUser);
    await this.userRepository.upsert(updatedUser);
  }
}
