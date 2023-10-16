import { Module } from '@nestjs/common';
import { PuppyController } from './puppy.controller';
import { PuppyService } from './puppy.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [PuppyController],
  providers: [PuppyService, PrismaService]
})
export class PuppyModule { }
