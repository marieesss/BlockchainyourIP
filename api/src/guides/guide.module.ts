import { Module } from '@nestjs/common';
import {  TypeOrmModule } from '@nestjs/typeorm';
import { GuideService } from './guide.service';
import Guide from './guide.entity';
import { GuideController } from './guide.controller';
import Formation from 'src/formation/formation.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Guide]),
  TypeOrmModule.forFeature([Formation])
],
  controllers: [GuideController],
  providers: [GuideService],
})
export class GuidesModule {}
