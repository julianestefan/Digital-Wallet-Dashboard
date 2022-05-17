import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy as LocStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { User } from './entities/user.entity';
import { LoginBodyDTO } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      select: ['password', 'id', 'username' ]
    });

    if(!user) return null;

    const matchPasswords = await bcrypt.compare(password, user?.password || '');
    
    return matchPasswords ? user : null;
  }

  async login(user: User) {
    const payload = {
      data: {
        id: user.id,
        username: user.username,
      },
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async create(data: LoginBodyDTO) {
    data.password = await bcrypt.hash(data.password, 12); 
    const user = this.userRepository.create(data);
   
    return await this.userRepository.save(user);
  }
}

@Injectable()
export class LocalStrategy extends PassportStrategy(LocStrategy) {
  constructor(private userService: UserService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.userService.validateUser(username, password);

    if (!user) throw new UnauthorizedException();
        
    return user;
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(JWTStrategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return payload.data;
  }
}
