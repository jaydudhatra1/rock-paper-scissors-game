import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GAME_MODE } from "../constants/enums";
import * as game from "../../../../cli-game/dist/game-cli";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"]
})
export class PlayerComponent implements OnInit {
  private mode: GAME_MODE;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.mode = params.mode;
    });

    game.start();
  }

  ngOnInit(): void {
    console.log(this.mode);
  }

  public chooseGesture(gesture: string): void {

  }

}
