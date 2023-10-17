import { Test, TestingModule } from '@nestjs/testing';
import { GeneralService } from './general.service';
import { PathImageObj } from './interfaces/path-image';

describe('GeneralService', () => {
    let service: GeneralService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GeneralService],
        }).compile();

        service = module.get<GeneralService>(GeneralService);
    });

    /* TEST DATE FUNCTION DATE NOW */
    describe('Get Current Date', () => {
        it('Should Get A Date In Form Of String', () => {
            let currDate = service.dateNow();
            console.info(currDate);
            expect.stringContaining(currDate);
        });
    });

    /* TEST CATEGORIZE PATH */
    describe('Get Path Object', () => {
        it('Should Get An Object with path', () => {
            let pathObj = service.categorizePath('user');
            let expectedObject: PathImageObj = {
                path: "storage/users/pictures",
                thumbPath: "storage/users/pictures/thumb",
            };
            expect(pathObj).toStrictEqual(expectedObject);
            // expect(pathObj).toBe(Object);
        });
    });

    /* TEST CATEGORIZE PATH */
    describe('Get ', () => {
        it('Should Get An Object with path', () => {
            let pathObj = service.categorizePath('user');
            let expectedObject: PathImageObj = {
                path: "storage/users/pictures",
                thumbPath: "storage/users/pictures/thumb",
            };
            expect(pathObj).toStrictEqual(expectedObject);
            // expect(pathObj).toBe(Object);
        });
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
