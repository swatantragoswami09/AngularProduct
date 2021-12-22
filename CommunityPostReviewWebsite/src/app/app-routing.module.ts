import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ApprovedComponent} from './approved/approved.component';
import { productDetailsComponent } from './Product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AddReviewComponent } from './add-review/add-review.component';
const routes: Routes = [
    {
        path: 'home',
        component: LoginComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'auth/login',
        component: HomeComponent
    },
    {
        path: 'signup',
        component: RegisterComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },

    {
        path: 'approved',
        component: ApprovedComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'products',
        component: ProductListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'products/:id',
        component: productDetailsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'add',
        component: AddReviewComponent,
        canActivate: [AuthGuard]
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
