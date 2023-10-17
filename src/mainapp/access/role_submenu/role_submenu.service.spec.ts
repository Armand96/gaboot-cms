import { Test, TestingModule } from '@nestjs/testing';
import { RoleSubmenuService } from './role_submenu.service';

describe('RoleSubmenuService', () => {
  let service: RoleSubmenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleSubmenuService],
    }).compile();

    service = module.get<RoleSubmenuService>(RoleSubmenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
