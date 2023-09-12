// VictoryScreen

import { Text } from './Text';
import { Viewport } from './Viewport';
import { rgba, createCanvas, clamp, partialText, uv2xy, xy2qr, xy2uv, qr2xy, centerxy } from './Util';
import { game } from './Game';
import { Audio } from './Audio';

export class VictoryScreen {
    constructor() {
        this.text = [
            'THANKS FOR PLAYING HAROLD IS HEAVY!',
            '',
            'HAROLD\'S ADVENTURE IS OVER FOR NOW, BUT YOU CAN KEEP',
            'PLAYING IF YOU WANT! TRY PRESSING 1 2 3 4 ON YOUR KEYBOARD',
            'TO TELEPORT BACK TO YOUR FAVORITE LEVEL.'
        ];
        this.frames = 0;
    }

    update() {
        this.frames++;

        if (this.frames === 5) {
            Audio.play(Audio.levelStart);
        }

        return true;
    }

    draw() {
        Viewport.ctx.fillStyle = '#457cd6';
        Viewport.ctx.fillRect(0, 0, Viewport.width, Viewport.height);

        for (let i = 0; i < this.text.length; i++) {
            let width = Text.measure(this.text[i], 1).w;
            Text.drawText(Viewport.ctx, this.text[i], (Viewport.width - width) / 2, 30 + i * 10, 1, Text.white, Text.shadow);
        }
    }
}
