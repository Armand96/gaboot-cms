import { Test, TestingModule } from '@nestjs/testing';
import { RoleAccessController } from './role_access.controller';
import { RoleAccessService } from './role_access.service';

describe('RoleAccessController', () => {
    let controller: RoleAccessController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RoleAccessController],
            providers: [RoleAccessService],
        }).compile();

        controller = module.get<RoleAccessController>(RoleAccessController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
