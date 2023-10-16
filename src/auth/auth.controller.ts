import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './type';
import { RtGuard } from 'src/common/guards';
import { GetCurrentUser, GetCurrentUserId, Pubilc } from 'src/common/decorators';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Pubilc()
    @Post('local/register')
    @HttpCode(HttpStatus.CREATED)
    registerLocal(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.registerLocal(dto);
    }

    @Pubilc()
    @Post('local/login')
    @HttpCode(HttpStatus.OK)
    loginLocal(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.loginLocal(dto);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() user_id: number) {
        return this.authService.logout(user_id);
    }

    @Pubilc()
    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(
        @GetCurrentUserId() user_id: number,
        @GetCurrentUser('refresh_token') refresh_Token: string) {
        return this.authService.refreshTokens(user_id, refresh_Token);
    }
}