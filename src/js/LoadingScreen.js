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
import { Audio } from './Audio';

export class LoadingScreen {
    constructor() {
        this.text = [
            'HAROLD',
            'IS',
            'HEAVY'
        ];
        this.t = -12;
    }

    update() {
        this.t++;

        if (this.t === 36) {
            Audio.initTracks();
        }

        if (this.t > 65) {
            game.screens.pop();
        }
    }

    draw() {
        Viewport.ctx.fillStyle = '#2c1b2e';
        Viewport.ctx.fillRect(0, 0, Viewport.width, Viewport.height);

        Viewport.ctx.fillStyle = '#457cd6';
        Viewport.ctx.fillRect(Viewport.width / 2 - 65, Viewport.height / 2 - 8, 130, 16);
        Viewport.ctx.fillRect(Viewport.width / 2 - 64, Viewport.height / 2 - 9, 128, 18);

        let total = 10;
        let loaded = clamp(this.t / 6, 0, 10);

        for (let i = 0; i < total; i++) {
            let frame = (loaded > i) ? 0 : 3;
            let y = Math.sin(i * Math.PI * 2 / 9 + (this.t * Math.PI * 2 / 60)) * 3;
            Viewport.ctx.drawImage(Sprite.littlepig[0][frame].img, i * 12 + (Viewport.width - 120) / 2, Viewport.height / 2 - 3 + y);
        }

        this.drawInstructions();
    }

    drawInstructions() {
        let text = 'LOADING...';
        let width = Text.measure(text, 1).w;

        if (this.t % 30 < 24) {
            Text.drawText(Viewport.ctx, text, (Viewport.width - width) / 2, Viewport.height / 20 + 25, Text.duotone, Text.shadow);
        }
    }
}
