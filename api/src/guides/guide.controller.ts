import { Body, Controller, Get, Param, Post, Res, UseGuards, Headers } from '@nestjs/common';
import Guide from './guide.entity';
import { GuideService } from './guide.service';
import { AdminGuard } from 'src/Auth.service';
import { Response } from 'express';



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
  @UseGuards(AdminGuard)
  async createGuide(@Body() CreateUserDto: CreateGuideDto) {
    const newUser = await this.GuideService.createGuide(CreateUserDto);
    return newUser;
  }

  @Get('pdf/:id')
  async generatePDFById(@Param('id') id: number, @Res() res: Response) {
    const buffer = await this.GuideService.genererPDF(id);

    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${buffer.guide.title}.pdf"`,
      'Content-Length': buffer.pdfBuffer.length.toString(),
    });
  
  

    res.end(buffer.pdfBuffer);
  }
  
  
}