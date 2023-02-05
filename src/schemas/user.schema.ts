import{Prop,Schema,SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

export type UserDocument = User & Document;

@Schema({timestamps: true})
export class User {

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);