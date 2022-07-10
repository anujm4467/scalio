import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import config from './config';
import { ConfigManagerModule } from './config-manager/config-manager.module';
import { ApiController } from './controllers/api.controller';
import { DatabaseModule } from './database/database.module';
import { PostController } from './controllers/post/post.controller';
import { PostService } from './service/post/post.service';

@Module({
  imports: [
    DatabaseModule.register({ uri: config.DB_URI }),
    AuthModule,
    ConfigManagerModule,
  ],
  controllers: [ApiController, PostController],
  providers: [PostService],
})
export class AppModule { }
