import { SetMetadata } from "@nestjs/common";

export const Pubilc = () => SetMetadata('isPublic', true);