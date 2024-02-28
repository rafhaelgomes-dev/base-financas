import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersEntity } from "./entities/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>
  ) {}

  public async createUser(createUser: CreateUserDto): Promise<UsersEntity> {

    if (!createUser.name) throw new BadRequestException('Name is required!');

    if (!createUser.email) throw new BadRequestException('E-mail is required');

    if (!createUser.password) throw new BadRequestException('Password is required');

    const emailExist = await this.userRepository.exists({
      where: {
        email: createUser.email
      }
    });

    if (emailExist) throw new BadRequestException('Este e-mail já está em uso');

    return this.userRepository.save(createUser);
  }
}