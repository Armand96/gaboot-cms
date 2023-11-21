import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mysql } from './config/mysqldb';
import { UserModule } from './mainapp/master/user/user.module';
import { RoleModule } from './mainapp/master/role/role.module';
import { MenuModule } from './mainapp/master/menu/menu.module';
import { SubmenuModule } from './mainapp/master/submenu/submenu.module';
import { AuthModule } from './auth/auth.module';
import { RoleAccessModule } from './mainapp/access/role_access/role_access.module';
import { RoleMenuModule } from './mainapp/access/role_menu/role_menu.module';
import { RoleSubmenuModule } from './mainapp/access/role_submenu/role_submenu.module';
import { RouteInfo } from '@nestjs/common/interfaces';
import { RbacMiddleware } from './middlewares/rbac/rbac.middleware';
import { CategoriesModule } from './mainapp/categories/categories.module';
import { ProductsModule } from './mainapp/master/products/products.module';
import { CustomersModule } from './mainapp/master/customers/customers.module';
import { CartsModule } from './mainapp/carts/carts.module';
import { WishlistsModule } from './mainapp/wishlists/wishlists.module';
import { PaymentModule } from './mainapp/payment/payment.module';
import { OrderModule } from './mainapp/order/order.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        CacheModule.register({
            isGlobal: true
        }),
        mysql,
        UserModule,
        RoleModule,
        MenuModule,
        SubmenuModule,
        AuthModule,
        RoleAccessModule,
        RoleMenuModule,
        RoleSubmenuModule,
        CategoriesModule,
        ProductsModule,
        CustomersModule,
        CartsModule,
        WishlistsModule,
        PaymentModule,
        OrderModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        /* BYPASS JWT AND RBAC FOR IMAGE */
        const arrayExceptionPath: RouteInfo[] = [
            { path: '/user/image/:id', method: RequestMethod.GET },
            { path: '/user/image/thumb/:id', method: RequestMethod.GET },
            { path: '/item/image/:id', method: RequestMethod.GET },
            { path: '/item/image/thumb/:id', method: RequestMethod.GET },
            { path: '/auth/login', method: RequestMethod.POST },
            // { path: '/graphql', method: RequestMethod.ALL },
        ];

        /* RBAC ROUTE */
        const arrayRouteMiddleware: string[] = [
            'user',
            'role',
            'role-access',
            'role-menu',
            'role-submenu',
            'menu',
            'item',
            'auth/logout',
            'auth/check'
        ];

        consumer
            .apply(RbacMiddleware)
            .exclude(...arrayExceptionPath)
            .forRoutes(...arrayRouteMiddleware);
    }
}
