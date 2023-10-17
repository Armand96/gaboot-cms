import { RbacMiddleware } from './rbac.middleware';

describe('RbacMiddleware', () => {
  it('should be defined', () => {
    expect(new RbacMiddleware()).toBeDefined();
  });
});
