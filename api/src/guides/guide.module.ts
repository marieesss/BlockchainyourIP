import { Module } from '@nestjs/common';
import {  TypeOrmModule } from '@nestjs/typeorm';
import { GuideService } from './guide.service';
import Guide from './guide.entity';
import { GuideController } from './guide.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Guide])],
  controllers: [GuideController],
  providers: [GuideService],
})
export class GuidesModule {}
