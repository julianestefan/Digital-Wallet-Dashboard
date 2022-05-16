import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Public } from 'src/core/decorators/public.decorator';
import { LocalAuthGuard } from 'src/core/guards/local.guard';
import { LoginBodyDTO, LoginRespomseDTO } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  @Public()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get user data and access token' })
  @ApiBody({ type: LoginBodyDTO })
  @ApiResponse({ type: LoginRespomseDTO })
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.userService.login(req.user);
  }

  @Post('create')
  @HttpCode(201)
  @Public()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ type: User })
  async create(@Body() body: LoginBodyDTO) {
    return this.userService.create(body);
  }

  @Get('profile')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get authenticated user data' })
  @ApiBearerAuth()
  @ApiResponse({ type: User })
  async profile(@Request() req) {
    return req.user;
  }
}
