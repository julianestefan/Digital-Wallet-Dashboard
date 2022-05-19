import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetWalletParamsDTO } from './dto/get-wallet-params.dto';
import { UpdateUserWalletFavoriteDTO } from './dto/update-user-wallet-favorite.dto';
import { UserWallet } from './entities/user-wallet.entity';
import { WalletService } from './wallet.service';

@Controller('wallet')
@ApiTags('Wallet')
@ApiBearerAuth()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create user wallet Address data' })
  @ApiResponse({ type: UserWallet })
  async getWalletInfo(@Body() body: GetWalletParamsDTO, @Req() req) {
    return await this.walletService.createUserWallet(body.address, req.user.id);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Create user wallet Address data' })
  @ApiResponse({ type: UserWallet, isArray: true })
  async getUserWallets(@Req() req) {
    return await this.walletService.getUserWallets(req.user.id);
  }

  @Patch('is_favorite')
  @HttpCode(200)
  @ApiOperation({ summary: 'Create user wallet Address data' })
  async updateUserWalletFavorite(@Body() body: UpdateUserWalletFavoriteDTO) {
    return await this.walletService.updateUserWalletFavorite(body);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Create user wallet Address data' })
  async deleteUserWallet(@Param('id') id: number) {
    return await this.walletService.deleteUserWallet(id);
  }
}
