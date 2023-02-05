import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../schemas/user.schema';
import { UserService } from '../services/user/user.service';
import { UserController } from '../controllers/user/user.controller';
import { userStub } from './stubs/user.stubs';

jest.mock('../services/user/user.service.ts');

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    describe('when getAllUsers is called', () => {
      it('should return an array of users', async () => {
        const result: User[] = [];
        jest.spyOn(service, 'getAllUsers').mockResolvedValue(result);

        expect(await controller.getAllUsers()).toBe(result);
      });
    });
  });

  describe('getUserById', () => {
    describe('when getUserById is called', () => {
      it('should return a user', async () => {
        let user: User;
        jest.spyOn(service, 'getUserById').mockResolvedValue(userStub());

        expect(await controller.getUserById('63dd500594048efe5f62b8d9')).toStrictEqual(userStub());
      });
      it('should return null', async () => {
        jest.spyOn(service, 'getUserById').mockResolvedValue(null);

        expect(await controller.getUserById('63dd500594048efe5f62b8d9')).toBe(null);
      });
    });
        
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      it('should return a user', async () => {
        let user: User;
        jest.spyOn(service, 'createUser').mockResolvedValue(userStub());

        expect(await controller.createUser(userStub())).toStrictEqual(userStub());
      });
    });
  });

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      it('should return a user', async () => {
        jest.spyOn(service, 'createUser').mockResolvedValue(userStub());
        expect(await controller.createUser(userStub())).toStrictEqual(userStub());
      });
    });
  });



});
