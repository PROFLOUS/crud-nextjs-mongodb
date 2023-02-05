import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user.module';

const MONGO_URI = 'mongodb+srv://dangle:yUX0UIXvi3eLEkOK@nextjs.aci5bgd.mongodb.net/?retryWrites=true&w=majority';

@Module({
  imports: [MongooseModule.forRoot(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }),UserModule],
})
export class AppModule {}
