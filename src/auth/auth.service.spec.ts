import { Test } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/mainapp/master/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './auth.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            userOnly: jest.fn(),
            userLogin: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    userService = moduleRef.get<UserService>(UserService);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  describe('validateUser', () => {
    it('should return the user when validation succeeds', async () => {
      const id = 1;
      const pass = 'password';
      const user = { data: { id: 1, password: 'password', username: 'john' } };

      userService.userOnly = jest.fn().mockResolvedValue(user);

      const result = await authService.validateUser(id, pass);

      expect(userService.userOnly).toHaveBeenCalledWith(id);
      expect(result).toEqual(expect.objectContaining(user.data));
    });

    it('should return null when validation fails', async () => {
      const id = 1;
      const pass = 'password';
      const user = { data: { id: 1, password: 'wrong_password', username: 'john' } };

      userService.userOnly = jest.fn().mockResolvedValue(user);

      const result = await authService.validateUser(id, pass);

      expect(userService.userOnly).toHaveBeenCalledWith(id);
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return an access token when login succeeds', async () => {
      const authDto: AuthDto = { username: 'john', password: 'password' };
      const user = { id: 1, userName: 'john' };
      const accessToken = 'access_token';

      userService.userLogin = jest.fn().mockResolvedValue(user);
      jwtService.sign = jest.fn().mockReturnValue(accessToken);

      const result = await authService.login(authDto);

      expect(userService.userLogin).toHaveBeenCalledWith(authDto.username, authDto.password);
      expect(jwtService.sign).toHaveBeenCalledWith({ username: user.userName, sub: user.id });
      expect(result).toEqual({ accessToken });
    });

    it('should throw an HttpException with FORBIDDEN status when login fails', async () => {
      const authDto: AuthDto = { username: 'john', password: 'password' };

      userService.userLogin = jest.fn().mockResolvedValue(null);

      await expect(authService.login(authDto)).rejects.toThrowError(
        new HttpException('Wrong Username or password', HttpStatus.FORBIDDEN),
      );
    });
  });
});
