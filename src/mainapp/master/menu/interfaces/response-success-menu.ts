import { Menu } from '../entities/menu.entity';

interface ResponseSuccessMenu {
    message: string;
    datum: Menu;
    data: Menu[];
    success: boolean;
    lastPage: number;
    totalData: number;
}

export { ResponseSuccessMenu };
