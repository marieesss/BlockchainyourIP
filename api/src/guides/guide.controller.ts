import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import Guide from './guide.entity';
import { GuideService } from './guide.service';
export class CreateGuideDto {
    title: string;
    summary: string;
    author: string;
    rating:number;
  }

@Controller('guide')
export class GuideController {
  constructor(private readonly GuideService: GuideService) {}

  @Get()
  async getAllGuides(): Promise<Guide[]> {
    const messages = await this.GuideService.getAllGuides();
    return messages;
  }

  @Get(':id')
  async getGuideById(@Param('id') id: number): Promise<Guide> {
    const message = await this.GuideService.getGuideById(Number(id));
    return message;
  }

  @Post()
  async createUser(@Body() CreateUserDto: CreateGuideDto) {
    const newUser = await this.GuideService.createGuide(CreateUserDto);
    return newUser;
  }
}