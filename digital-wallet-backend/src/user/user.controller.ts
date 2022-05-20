import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/core/decorators/public.decorator';
import { LocalAuthGuard } from 'src/core/guards/local.guard';
import { LoginBodyDTO, LoginRespomseDTO } from './dto/login.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
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
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Request() req) {
    return await this.userService.login(req.user);
  }

  @Post()
  @Public()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ type: User })
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() body: LoginBodyDTO) {
    return await this.userService.create(body);
  }

  @Get('profile')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get authenticated user data' })
  @ApiBearerAuth()
  @ApiResponse({ type: User })
  @UseInterceptors(ClassSerializerInterceptor)
  async profile(@Request() req) {
    return req.user;
  }
}
