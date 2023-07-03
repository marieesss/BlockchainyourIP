import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Guide from './guide.entity';
import { CreateGuideDto } from './guide.controller';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GuideService {

  constructor(
    @InjectRepository(Guide)
    private GuideRepository: Repository<Guide>,
  ) {}

  async getAllGuides() {
    const guides = this.GuideRepository.createQueryBuilder('guides')
    .leftJoinAndSelect('guides.formations', 'formation')
    .getMany();
    return guides;
  }


  async getGuideById(id: number) {
    const user = await this.GuideRepository.findOne({
      where: {
        id: id,
      },
    });
    if (user) {
      return user;
    }
    throw new NotFoundException('Could not find the guide');
  }


  //créer un guide
  async createGuide(createGuideDto: CreateGuideDto) {
    const { title, summary, author, rating } = createGuideDto;
    const newGuide = await this.GuideRepository.create({ title, summary, author, rating });
    await this.GuideRepository.save(newGuide);
    return newGuide;
  }
  
}