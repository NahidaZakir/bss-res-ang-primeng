import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeesComponent } from './employees/employees.component';
import { TablesComponent } from './tables/tables.component';
import { FoodsComponent } from './foods/foods.component';
import { NeworderComponent } from './neworder/neworder.component';
import { OrdersComponent } from './orders/orders.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { AddtableComponent } from './addtable/addtable.component';
import { AddfoodComponent } from './addfood/addfood.component';

export const routes: Routes = [
    {
        path:'',
        component: LoginComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'',
        component:LayoutComponent,
        children: [
            {
                path:'admin',
                component: DashboardComponent

            },
            {
                path:'employees',
                component: EmployeesComponent
            },
            {
                path:'add-employee',
                component: AddemployeeComponent
            },
            {
                path:'tables',
                component: TablesComponent
            },
            {
                path: 'add-table',
                component: AddtableComponent
            },
            {
                path: 'foods',
                component: FoodsComponent
            },
            {
                path:'add-food',
                component: AddfoodComponent
            },
            {
                path:'order',
                component: NeworderComponent
            },
            {
                path: 'orders',
                component: OrdersComponent
            }
        ]
    },
];
