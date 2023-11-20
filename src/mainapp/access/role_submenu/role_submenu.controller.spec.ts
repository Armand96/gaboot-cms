import { Test, TestingModule } from '@nestjs/testing';
import { RoleSubmenuController } from './role_submenu.controller';
import { RoleSubmenuService } from './role_submenu.service';

describe('RoleSubmenuController', () => {
    let controller: RoleSubmenuController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RoleSubmenuController],
            providers: [RoleSubmenuService],
        }).compile();

        controller = module.get<RoleSubmenuController>(RoleSubmenuController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
