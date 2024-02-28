import { Test, TestingModule } from "@nestjs/testing"
import { UsersController } from "./user.controller"
import { UsersService } from "./users.service"
import { getRepositoryToken } from "@nestjs/typeorm";
import { UsersEntity } from "./entities/users.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { BadRequestException } from "@nestjs/common";
import { Repository } from "typeorm";

describe('UsersServices', () => {

  let userService: UsersService;

  let userRepository: Repository<UsersEntity>;

  beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [UsersController],
        providers: [UsersService, 
          {
            provide: getRepositoryToken(UsersEntity),
            useValue: {
              exists: jest.fn().mockResolvedValue(false),
              save: jest.fn().mockResolvedValue({
                "name": "Rafhael Gomes",
                "email": "rafhaelgomes.dev@gmail.com",
                "password": "1234567#qwe",
                "id": 2,
                "createdAt": "2024-02-28T11:19:02.609Z",
                "updatedAt": "2024-02-28T11:19:02.609Z"
              }),
            }
        }]
      }).compile();
      userService = module.get<UsersService>(UsersService);
      userRepository = module.get<Repository<UsersEntity>>(getRepositoryToken(UsersEntity));
  });

  test('Validate the definition', () => {
    expect(userService).toBeDefined();
  })

  describe('CreateUser', () => {
    test('An error message should return if the email already exists', async () => {
      const data: CreateUserDto = {
        name: "Rafhael Gomes",
        email: "rafhaelgomes.dev@gmail.com",
        password: "1234567#qwe"
      }
    
      const existsSpy = jest.spyOn(userRepository, 'exists');
      existsSpy.mockResolvedValue(true);
    
      try {
        await userService.createUser(data);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Este e-mail já está em uso');
      }
    
      existsSpy.mockRestore();
    })

    test('Should create a user successfully', async () => {
      const data: CreateUserDto = {
        name: "Rafhael Gomes",
        email: "rafhaelgomes.dev@gmail.com",
        password: "1234567#qwe"
      }
  
      const result = await userService.createUser(data);

      expect(result).toEqual({
        "name": "Rafhael Gomes",
        "email": "rafhaelgomes.dev@gmail.com",
        "password": "1234567#qwe",
        "id": 2,
        "createdAt": "2024-02-28T11:19:02.609Z",
        "updatedAt": "2024-02-28T11:19:02.609Z"
      })
    })
  })
})