import { Body, Controller, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetWalletParamsDTO } from './dto/get-wallet-params.dto';
import { WalletService } from './wallet.service';

@Controller('wallet')
@ApiTags('Wallet')
@ApiBearerAuth()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create user wallet Address data' })
  async getWalletInfo(@Body() body : GetWalletParamsDTO , @Req() req ) {
    return this.walletService.createUserWallet(body.address, req.user.id);
  }
}
