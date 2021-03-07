import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GAME_MODE } from "../constants/enums";

@Component({
  selector: "app-choose-mode",
  templateUrl: "./choose-mode.component.html",
  styleUrls: ["./choose-mode.component.scss"]
})
export class ChooseModeComponent implements OnInit {

  public GAME_MODE = GAME_MODE;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public runGame(mode: GAME_MODE): void {
    this.router.navigate(["/play"], { queryParams: { mode } });
  }
}
