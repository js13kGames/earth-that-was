import {
  Position,
  getCanvasPosition,
  degreesToRadians,
  getValueInRange,
  Positions,
  Color,
  getRandomValueOf,
  HSL,
  isObjectOutOfSectorBounds
} from "./utils";
import OffscreenCanvas from "./canvas";
import Config from "./config";
import { generateName } from "./names";
import { Faction } from "./factions";
import { Scene } from "./scenes/scene";
import { Message } from "./text";

export interface Planet extends Sprite {
  radius: number;
  outerRadius: number;

  origin: Position;
  angle: number;
  orbit: number;

  claimedBy: Faction;
  increaseClaim(faction: Faction, percentage: number): void;

  changePlanetTo(planetType: PlanetType): void;
}
export interface PlanetOptions {
  drawOuterRadius?: boolean;
  type?: PlanetType;
  name?: string;
  startingAngle?: number;
  claimedBy?: Faction;
}

export function createPlanet(
  origin: Position,
  orbit: number,
  radius: number,
  cameraPosition: Position,
  scene: Scene,
  {
    drawOuterRadius = true,
    type = getPlanetType(),
    name = generateName(),
    startingAngle = getValueInRange(0, 360),
    claimedBy
  }: PlanetOptions = {}
): Planet {
  //let textureWidth = Math.round(getValueInRange(64, radius));
  //let textureHeight = Math.round(getValueInRange(64, radius));
  let planetType = type;
  let textureWidth = 100;
  let textureHeight = 100;

  // sun orbit
  let startingPosition = Positions.inCircleGivenAngle(
    origin,
    orbit,
    startingAngle
  );
  let da = getValueInRange(0, 0.05);

  let planet = kontra.sprite({
    type: SpriteType.Planet,
    planetType,
    name,

    origin,
    orbit,
    x: startingPosition.x,
    y: startingPosition.y,
    radius,
    outerRadius: radius + 0.25 * radius,

    ttl: Infinity,

    angle: startingAngle,
    da,
    rotation: getValueInRange(0, Math.PI),

    // TODO: I could extract this into mixins
    // claiming logic
    claimedBy,
    beingClaimed: false, // controls whether the claiming
    claimedPercentage: 0,
    isClaimed() {
      return this.claimedBy !== undefined;
    },
    increaseClaim(faction: Faction, percentage: number): void {
      let factionName = Config.Factions[faction].Name;
      if (!this.beingClaimed) {
        // text
        scene.showMessage(Message(`${factionName} FACTION CLAIMING ${name}`));
        this.beingClaimed = true;
      }

      this.claimedPercentage += percentage;

      if (this.claimedPercentage >= 100) {
        this.claimedPercentage = 100;
        this.beingClaimed = false;
        this.claimedBy = faction;
        scene.showMessage(Message(`${factionName} FACTION CLAIMED ${name}`));
      }
    },

    // change planet to other type
    // only for earth animation right now
    isChangingPlanetType: false,
    dcpt: 0,
    count: 13,
    oldPlanetType: planetType,
    newPlanetType: undefined,
    changePlanetTo(planetType: PlanetType) {
      this.newPlanetType = planetType;
      this.isChangingPlanetType = true;
    },

    // collecting logic
    beingCollected: false,
    resources: 3000,

    update() {
      this.rotation += 1 / 4;
      this.angle += this.da;

      let newPosition = Positions.inCircleGivenAngle(
        this.origin,
        orbit,
        this.angle
      );
      this.x = newPosition.x;
      this.y = newPosition.y;

      // extract to behavior/mixin
      if (this.isChangingPlanetType) {
        this.dcpt += 1 / 60;
        // the change of planet type will
        // happen progressively faster
        if (this.dcpt > this.count * 0.05) {
          this.dcpt = 0;
          this.count--;
          if (this.planetType === this.oldPlanetType)
            this.planetType = this.newPlanetType;
          else this.planetType = this.oldPlanetType;

          if (this.count === 0) this.isChangingPlanetType = false;
        }
      }
    },
    render(this: Planet) {
      if (isObjectOutOfSectorBounds(this, cameraPosition)) return;
      let position = getCanvasPosition(this, cameraPosition);

      // #0. planet orbit around sun
      this.context.save();
      let originInCanvas = getCanvasPosition(this.origin, cameraPosition);
      this.context.translate(originInCanvas.x, originInCanvas.y);
      this.context.strokeStyle = "rgba(255,255,255,0.15";
      this.context.beginPath();
      this.context.arc(0, 0, this.orbit, 0, 2 * Math.PI);
      this.context.stroke();
      this.context.restore();

      // #1. Actual planet and texture
      this.context.save();
      this.context.translate(position.x, position.y);
      this.context.rotate(degreesToRadians(this.rotation));

      this.context.fillStyle = getPattern(
        textureWidth,
        textureHeight,
        this.planetType
      );
      this.context.beginPath(); // start drawing a shape
      this.context.arc(0, 0, this.radius, 0, Math.PI * 2);
      this.context.fill(); // outline the circle

      // #2. Add some clouds
      /* TODO: improve this
      this.context.fillStyle = this.getCloudPattern(planetType);
      this.context.beginPath(); // start drawing a shape
      this.context.arc(0, 0, this.radius, 0, Math.PI * 2);
      this.context.fill(); // outline the circle
      */

      // #3. gradient to give it a 3d look
      this.context.beginPath(); // start drawing a shape
      let gradient = this.context.createRadialGradient(
        0,
        0,
        (3 * this.radius) / 4,
        0,
        0,
        this.radius
      );
      gradient.addColorStop(0, "rgba(0,0,0,0)");
      gradient.addColorStop(1, "rgba(0,0,0,0.7)");
      this.context.fillStyle = gradient;
      this.context.arc(0, 0, this.radius, 0, Math.PI * 2);
      this.context.fill();

      // #3. radius where you can start collecting stuff
      if (drawOuterRadius) {
        this.context.beginPath(); // start drawing a shape
        this.context.strokeStyle = "turquoise";
        this.context.setLineDash([3, 7]);
        this.context.arc(0, 0, this.outerRadius, 0, Math.PI * 2);
        this.context.stroke();
      }
      this.context.restore();

      // #4. planet name
      this.context.save();
      this.context.translate(position.x, position.y - radius - 45);
      this.context.fillStyle = "rgba(255,255,255,0.8)";
      this.context.font = `normal normal 14px monospace`;
      let textOffset = (this.name.length / 2) * 10;
      this.context.fillText(this.name.toUpperCase(), -textOffset, 0);
      this.context.restore();

      // #5. planet energy

      // #6. planet being claimed
      if (this.beingClaimed) {
        // extract to separate function
        // we can use the same bar for energy and claiming
        // just different colors
        // I can even use it for bars of energy, etc
        // it should be a separate UI game component
        let barWidth = radius * 2;
        let width = (this.claimedPercentage / 100) * barWidth;
        this.context.save();
        this.context.translate(position.x - radius, position.y + radius + 35);
        this.context.fillStyle = "white";
        this.context.fillRect(0, 0, width, 5);
        this.context.strokeStyle = "white";
        this.context.strokeRect(0, 0, radius * 2, 5);
        this.context.restore();
      }

      // #7. planet claimed
      if (this.claimedBy !== undefined) {
        let factionRadius = radius + 0.35 * radius;
        this.context.save();
        this.context.translate(position.x, position.y);
        let color = Config.Factions[this.claimedBy].Color;
        this.context.strokeStyle = Color.rgb(color);
        Config.Factions[this.claimedBy].Name.toLowerCase();
        this.context.lineWidth = 5;
        this.context.beginPath(); // start drawing a shape

        this.context.arc(0, 0, factionRadius, 0, Math.PI * 2);
        this.context.stroke();
        this.context.restore();
      }
    },
    getCloudPattern(type: PlanetType) {
      let color = PlanetBaseColors[type];
      let cloudColor = { ...color };
      cloudColor.l += 50; // lighter color for clouds
      return OffscreenCanvas.instance().getPatternWithTransparency(
        cloudColor,
        radius,
        radius,
        3
      );
    }
  });

  return planet;
}

export const enum PlanetType {
  Red,
  Scorched,
  Green,
  Blue,
  Desert,
  GasGiant,
  Barren,
  Paradise,
  Sun
}
export let PlanetTypes = [
  PlanetType.Red,
  PlanetType.Scorched,
  PlanetType.Green,
  PlanetType.Blue,
  PlanetType.Desert,
  PlanetType.GasGiant,
  PlanetType.Barren,
  PlanetType.Paradise
];
export let PlanetBaseColors: HSL[] = [
  /*Red*/ { h: 16, s: 100, l: 66 },
  /*Scorched*/ { h: 0, s: 70, l: 45 },
  /*Green*/ { h: 120, s: 100, l: 39 },
  /*Blue*/ { h: 195, s: 100, l: 50 },
  /*Desert*/ { h: 48, s: 100, l: 76 },
  /*GasGiant*/ { h: 28, s: 87, l: 67 },
  /*Barren*/ { h: 0, s: 0, l: 83 },
  /*Paradise*/ { h: 199, s: 98, l: 48 }, //TODO, special planet
  /*Sun*/ { h: 60, s: 100, l: 50 }
];

function getPlanetType(): PlanetType {
  // can randomly create all types of planets
  // but for paradise planet, (there'll be only one left to find)
  return getRandomValueOf(PlanetTypes.filter(p => p !== PlanetType.Paradise));
}

export function getPattern(width: number, height: number, type: PlanetType) {
  let color = PlanetBaseColors[type];
  if (type === PlanetType.Paradise)
    return getParadisePattern(width, height, color);
  return OffscreenCanvas.instance().getPatternBasedOnColor(
    color.h,
    color.s,
    color.l,
    width,
    height,
    3
  );
}

export function getParadisePattern(
  width: number,
  height: number,
  primary: HSL
) {
  return OffscreenCanvas.instance().getPatternBasedOnColors(
    primary,
    /* greenish */ { h: 120, s: 61, l: 34 },
    width,
    height,
    3
  );
}
