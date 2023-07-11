import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Guide from './guide.entity';
import { CreateGuideDto } from './guide.controller';
import { Injectable } from '@nestjs/common';
const PDFDocument = require('pdfkit');

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

  async genererPDF(id: number)
  {
    const guide = await this.getGuideById(id);

      const pdfBuffer: Buffer = await new Promise( resolve => {
        const doc =  new PDFDocument(
          {
            size: "LETTER",
            bufferPages: true
          })

          doc.fontSize(18).text(guide.title);
          doc.fontSize(12).text(`Author: ${guide.author}`);
          doc.fontSize(12).text(`Summary: ${guide.summary}`);
          doc.fontSize(12).text(`Rating: ${guide.rating}`);


          const buffer = []
          doc.on('data', buffer.push.bind(buffer))
          doc.on('end', () => {
              const data = Buffer.concat(buffer)
              resolve(data)
          })
          doc.end()


      })

      return {pdfBuffer, guide};
    
  }
  
  
  
}