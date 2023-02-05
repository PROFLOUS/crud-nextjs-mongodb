import { userStub } from "src/test/stubs/user.stubs";

export const UserService =jest.fn().mockReturnValue({
    getAllUsers: jest.fn().mockResolvedValue([userStub()]),
    getUserById: jest.fn().mockResolvedValue(userStub()),
    createUser: jest.fn().mockResolvedValue(userStub()),
    updateUser: jest.fn().mockResolvedValue(userStub()),
    deleteUser: jest.fn().mockResolvedValue(userStub())
})