import { Controller, Get,Param,Patch,Delete,Body,Post } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { UserDto } from '../../dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        try{
            console.log(await this.userService.getUserById(id));
            return await this.userService.getUserById(id);
        } catch (error) {
            throw error;
        }
    }

    @Post()
    async createUser(@Body() userDto: UserDto) {
        return await this.userService.createUser(userDto);
    }

    @Patch(':id')
    async updateUser(@Param('id') id: string,@Body() userDto: UserDto) {
        try {
            const data = await this.userService.updateUser(id,userDto);
            return {
                statusCode: 200,
                message: 'User updated',
                data,
            }
        } catch (error) {
            return {
                statusCode: 500,
                error: error.message,
            }
        }
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        try {
            const data = await this.userService.deleteUser(id);
            return {
                statusCode: 200,
                message: 'User deleted',
                data,
            }
        } catch (error) {
            return {
                statusCode: 500,
                error: error.message,
            }
        }
    }
}
