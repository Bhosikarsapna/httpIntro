import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostDashboardComponent } from "./components/post-dashboard/post-dashboard.component";
import { PostSingleComponent } from "./components/post-single/post-single.component";
import { PostFormComponent } from "./components/post-form/post-form.component";



const routes : Routes = [
    {
        path : 'home',
        component : PostDashboardComponent
    },
    {
        path : '',
        redirectTo : 'home',
        pathMatch : 'full'
    },
    {
        path : 'post/:postId',
        component : PostSingleComponent
    },
    {
        path : 'post/:postId/edit',
        component : PostFormComponent
    },
    {
        path : 'addPost',
        component : PostFormComponent
    }
]



@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})

export class appRoutingModule{

}