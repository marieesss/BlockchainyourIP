import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './database/database.module';
import { userModule } from './user/user.module';
import { GuidesModule } from './guides/guide.module';
import { AuthGuard, AdminGuard } from './Auth.service';
import { FormationModule } from './formation/formation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required()
      }),
    }),
    DatabaseModule,
    userModule,
    GuidesModule,
    FormationModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthGuard, AdminGuard,ConfigService],
})
export class AppModule {}
