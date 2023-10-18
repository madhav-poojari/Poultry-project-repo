import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

import { NoteModule } from './note/note.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://junith:9oetA6mMXTEfFlYE@cluster0.lihyu7f.mongodb.net/?retryWrites=true&w=majority',
      {
        dbName: 'notes',
      },
    ),
    UsersModule,
    NoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
