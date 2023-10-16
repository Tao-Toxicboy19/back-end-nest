import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PuppyService } from './puppy.service';
import { PuppyDto } from './dto';
import { Puppy } from './type/puppy.type';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express'
import * as path from "path";

@Controller('puppy')
export class PuppyController {
    constructor(private readonly puppyService: PuppyService) { }

    @Post("upload")
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: "./uploads",
            filename: (_, file, cb) => {
                cb(null, `${file.originalname}`)
            }
        })
    }))
    async uploadFile(@Body() dto: PuppyDto, @UploadedFile() file: any) {
        const { filename } = file;
        const newPuppy = await this.puppyService.createPuppy(dto, filename);
        return newPuppy;
    }

    @Get("getFile")
    getFile(@Res() res: Response, @Body() file: { fileName: string; }) {
        res.sendFile(path.join(__dirname, "../../uploads" + file.fileName));
    }

    // @Post()
    // @HttpCode(HttpStatus.CREATED)
    // async createPuppy(@Body() dto: PuppyDto): Promise<Puppy> {
    //     return this.puppyService.createPuppy(dto);
    // }


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
