import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PlayerComponent } from "./player/player.component";
import { ChooseModeComponent } from './choose-mode/choose-mode.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    ChooseModeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
