import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ShareModule } from "../shared/shared.module";
import {AuthComponent} from "./auth.component"


@NgModule({
    declarations: [AuthComponent],
    imports: [FormsModule, RouterModule.forChild( [{ path: "auth", component: AuthComponent }]), ShareModule],
    exports: [AuthComponent]
})
export class AuthModule{}