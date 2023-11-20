import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

import { Injectable } from '@nestjs/common';
import { RoleService } from '../../role.service';

@ValidatorConstraint({ name: 'isRoleAlreadyExists', async: true })
@Injectable()
export class IsRoleAlreadyExistConstraint
    implements ValidatorConstraintInterface
{
    constructor(private role: RoleService) {}

    async validate(roleName: string) {
        console.log(this.role);
        return this.role.findByRoleName(roleName).then((user) => {
            if (user) return false;
            return true;
        });
    }
}

export function isRoleAlreadyExists(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsRoleAlreadyExistConstraint,
        });
    };
}
