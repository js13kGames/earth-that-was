import Config from "../config";
import { createGameStatusText } from "../text";
import { Scene } from "../scenes/scene";

export interface ShipSystem {
  isEnabled: boolean;
  disable(): void;
  onEnergyChanged(energy: number): void;
}

export function ShipSystemMixin(
  scene: Scene,
  name: string,
  energyThreshold: number
): ShipSystem {
  return {
    isEnabled: true,
    disable() {
      this.isEnabled = false;
      this.dt = 0;
    },
    onEnergyChanged(currentEnergy: number) {
      if (currentEnergy > energyThreshold && !this.isEnabled) {
        this.isEnabled = true;
        let textSprite = createGameStatusText(
          `- ${name.toUpperCase()} ONLINE -`
        );
        scene.addSprite(textSprite);
      } else if (currentEnergy < energyThreshold && this.isEnabled) {
        this.disable();
        let textSprite = createGameStatusText(
          `- ${name.toUpperCase()} OFFLINE -`
        );
        scene.addSprite(textSprite);
      }
    }
  } as ShipSystem;
}