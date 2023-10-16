import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { PuppyService } from './puppy.service';
import { PuppyDto } from './dto';
import { Puppy } from './type/puppy.type';

@Controller('puppy')
export class PuppyController {
    constructor(private readonly puppyService: PuppyService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createPuppy(@Body() dto: PuppyDto): Promise<Puppy> {
        return this.puppyService.createPuppy(dto)
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAllPuppy(): Promise<Puppy[]> {
        return this.puppyService.findAllPuppy()
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    awsfindOne(@Param('id') id: string) {
        const idV2 = parseInt(id, 10);
        return this.puppyService.findOnePuppy(idV2);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    updatePuppy(
        @Param('id') id: string,
        @Body() dto: PuppyDto): Promise<Puppy | null> {
        const idV2 = parseInt(id, 10);
        return this.puppyService.updatePuppy(idV2, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    deletePuppy(
        @Param('id') id: string): Promise<Puppy | null> {
        const idV2 = parseInt(id, 10);
        return this.puppyService.deletePuppy(idV2);
    }
}
