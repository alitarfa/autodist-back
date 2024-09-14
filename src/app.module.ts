import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/service/user.service';
import { UserRepository } from './user/entity/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/entity/user.entity';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@mongo:27017', {
      dbName: 'autodist_db',
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class AppModule {
}
