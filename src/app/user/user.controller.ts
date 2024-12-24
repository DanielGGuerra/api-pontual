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
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ApiOkResponsePaginated } from 'src/decorators/api-ok-response-paginated.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Profiles(Profile.ADMIN)
  @ApiCreatedResponse({ type: ResponseUserDTO })
  async create(@Body() createUser: CreateUserDTO): Promise<ResponseUserDTO> {
    const user = await this.userService.create(createUser);
    return new ResponseUserDTO(user);
  }

  @Get('/:id')
  @Profiles(Profile.ADMIN)
  @ApiOkResponse({ type: ResponseUserDTO })
  async find(@Param('id') id: string): Promise<ResponseUserDTO> {
    const user = await this.userService.find(id);
    return new ResponseUserDTO(user);
  }

  @Get()
  @Profiles(Profile.ADMIN)
  @ApiOkResponsePaginated(ResponseUserDTO)
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
  @ApiCreatedResponse({ type: ResponseUserDTO })
  async update(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDTO,
  ): Promise<void> {
    await this.userService.update(id, updateUser);
  }
}
