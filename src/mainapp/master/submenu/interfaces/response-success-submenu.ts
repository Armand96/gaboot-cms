import { Submenu } from "../entities/submenu.entity";


interface ResponseSuccessSubmenu {
    message: string;
    datum: Submenu;
    data: Submenu[];
    success: boolean;
    lastPage: number;
    totalData: number;
}

export { ResponseSuccessSubmenu };
