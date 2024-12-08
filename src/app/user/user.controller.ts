import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { FindUserDTO } from './dtos/find-user.dto';
import { ResponseUserDTO } from './dtos/response-user.dto';
import { PaginatedResponse } from 'src/classes/paginated-response';
import { Profiles } from 'src/decorators/roles.decorator';
import { Profile } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Profiles(Profile.ADMIN)
  async create(@Body() createUser: CreateUserDTO): Promise<ResponseUserDTO> {
    const user = await this.userService.create(createUser);
    return new ResponseUserDTO(user);
  }

  @Get('/:id')
  @Profiles(Profile.ADMIN)
  async find(@Param('id') id: string): Promise<ResponseUserDTO> {
    const user = await this.userService.find(id);
    return new ResponseUserDTO(user);
  }

  @Get()
  @Profiles(Profile.ADMIN)
  async findAll(
    @Query() query: FindUserDTO,
  ): Promise<PaginatedResponse<ResponseUserDTO>> {
    const [users, total] = await this.userService.findAll(query);
    return new PaginatedResponse<ResponseUserDTO>(
      users.map((user) => new ResponseUserDTO(user)),
      total,
    );
  }

  @Patch(':id')
  @Profiles(Profile.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDTO,
  ): Promise<void> {
    await this.userService.update(id, updateUser);
  }
}
