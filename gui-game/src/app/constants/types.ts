import { GAME_STATE } from "./enums";

export type Output  = {
    message: string;
    player1Response: string;
    player2Response: string;
    state: GAME_STATE;
}