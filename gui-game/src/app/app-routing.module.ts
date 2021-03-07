import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { ChooseModeComponent } from "./choose-mode/choose-mode.component";
import { PlayerComponent } from "./player/player.component";


const routes: Routes = [
  {
    path: "",
    component: ChooseModeComponent,
  },
  {
    path: "play",
    component: PlayerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
