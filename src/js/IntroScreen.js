// LevelScreen

import { TILE_SIZE, TARGET_GAME_WIDTH, TARGET_GAME_HEIGHT } from './Constants';
import { LevelData } from './generated/LevelData-gen';
import { Player } from './Player';
import { Viewport } from './Viewport';
import { Sprite } from './Sprite';
import { Camera } from './Camera';
import { qr2xy, rgba, xy2uv, vectorBetween, xy2qr, uv2xy, clamp } from './Util';
import { Movement } from './systems/Movement';
import { Attack } from './systems/Attack';
import { LittlePigBox } from './LittlePigBox';
import { LandingParticle } from './Particle';
import { Text } from './Text';
import { Knight } from './Knight';
import { Sign } from './Sign';
import { game } from './Game';
import { ScreenShake } from './ScreenShake';
import { Input } from './input/Input';
import { LoadingScreen } from './LoadingScreen';

export class IntroScreen {
    constructor() {
        this.text = [
            'HAROLD',
            'IS',
            'HEAVY'
        ];
        this.t = 0;
        this.fadet = -1;
    }

    update() {
        this.t++;
        if (this.fadet >= 0) this.fadet++;

        if (this.fadet > 30) {
            game.screens.pop();
            game.screens.push(new LoadingScreen());
        }

        if (Input.pressed[Input.Action.JUMP] || Input.pressed[Input.Action.CONTINUE]) {
            this.fadet = 0;
        }
    }

    draw() {
        Viewport.ctx.fillStyle = '#457cd6';
        Viewport.ctx.fillRect(0, 0, Viewport.width, Viewport.height);

        for (let i = 0; i < this.text.length; i++) {
            let width = Text.measure(this.text[i], 2).w;
            //Text.drawText(Viewport.ctx, this.text[i], 20, 50, 2, Text.pig);

            Viewport.ctx.globalAlpha = 0.3;
            Text.drawText(Viewport.ctx, this.text[i], (Viewport.width - width) / 2, 50 + i * 15 - 4, 2, Text.pig);

            Viewport.ctx.globalAlpha = 1;
            Text.drawText(Viewport.ctx, this.text[i], (Viewport.width - width) / 2 - 1, 50 + i * 15, 2, Text.shadow);
            Text.drawText(Viewport.ctx, this.text[i], (Viewport.width - width) / 2 + 1, 50 + i * 15, 2, Text.shadow);
            Text.drawText(Viewport.ctx, this.text[i], (Viewport.width - width) / 2, 50 + i * 15, 2, Text.pig);
        }

        this.drawInstructions();

        // Fade to load screen
        if (this.fadet >= 0) {
            let fade = 0;
            if (this.fadet > 8) {
                fade = (this.fadet - 8) * (Viewport.width / 2 - 40) / 20;
            }

            Viewport.ctx.fillStyle = '#2c1b2e';
            Viewport.ctx.beginPath();
            Viewport.ctx.moveTo(Viewport.width / 2 - 0 - fade, 0);
            Viewport.ctx.lineTo(Viewport.width / 2 + 40 + fade, 0);
            Viewport.ctx.lineTo(Viewport.width / 2 + 0 + fade, Viewport.height);
            Viewport.ctx.lineTo(Viewport.width / 2 - 40 - fade, Viewport.height);
            Viewport.ctx.closePath();
            Viewport.ctx.fill();
        }
    }

    drawInstructions() {
        let text = 'PRESS SPACE OR ENTER TO START';
        let width = Text.measure(text, 1).w;

        if (this.t % 30 < 24) {
            Text.drawText(Viewport.ctx, text, (Viewport.width - width) / 2, Viewport.height - 10, 1, Text.tan, Text.shadow);
        }
    }
}
