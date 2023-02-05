import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { UserDto } from '../../dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserDocument>,
    ) {}

    async getAllUsers(): Promise<User[]> {
        try {
            return await this.userModel.find().exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getUserById(id: string): Promise<User> {
        try {
            const user = await this.userModel.findById(id).exec();
            if(!user) {
                throw new NotFoundException('User not found');
            }
            return user;
        } catch (error) {
            if(error.response){
                throw new HttpException(error.response.message, error.response.statusCode);
            }
            throw new InternalServerErrorException(error);
        }
    }

    async createUser(userDto: UserDto): Promise<User> {
        try {
            const { name, email, password } = userDto;
            const newUser = new this.userModel({
                name,
                email,
                password,
            });
            await newUser.save();
            return newUser;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateUser(id: string, userDto: UserDto): Promise<User> {
        const body = { ...userDto };
        try {
            const updateUser = this.userModel.findByIdAndUpdate(id, body, { new: true });
            return updateUser;
        } catch (error) {
            if(error.response){
                throw new HttpException(error.response.message, error.response.statusCode);
            }
            throw new InternalServerErrorException(error);
        }
    }

    async deleteUser(id: string): Promise<{message:string}> {
        try {
            const deleteUser = await this.userModel.findByIdAndDelete(id);
            return { message: `User deleted successfully _id: ${deleteUser._id}` };
        } catch (error) {
            if(error.response){
                throw new HttpException(error.response.message, error.response.statusCode);
            }
            throw new InternalServerErrorException(error);
        }
    }
}
