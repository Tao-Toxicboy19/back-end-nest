import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PuppyDto } from './dto';
import { Puppy } from './type/puppy.type';

@Injectable()
export class PuppyService {
    constructor(private prisma: PrismaService) { }

    async createPuppy(dto: PuppyDto): Promise<Puppy> {
        const newPuppy = await this.prisma.puppys.create({
            data: {
                puppyName: dto.puppyName,
                age: dto.age,
                breed: dto.breed,
            }
        });
        return newPuppy;
    }

    async findAllPuppy(): Promise<Puppy[]> {
        const puppy = await this.prisma.puppys.findMany({})
        return puppy;
    }

    async findOnePuppy(id: number): Promise<Puppy | null> {
        const puppy = await this.prisma.puppys.findUnique({
            where: { id },
        });
        return puppy;
    }

    async updatePuppy(id: number, dto: PuppyDto): Promise<Puppy | null> {
        const updatedPuppy = await this.prisma.puppys.update({
            where: { id },
            data: {
                puppyName: dto.puppyName,
                age: dto.age,
                breed: dto.breed,
            },
        });

        return updatedPuppy;
    }

    async deletePuppy(id: number): Promise<Puppy | null> {
        const deletedPuppy = await this.prisma.puppys.delete({
            where: { id }
        });

        return deletedPuppy;
    }


}
