import { Faction, FactionShipModifiers } from "./factions";
import { PlanetType } from "./planet";
import Game from "./game";

// TODO: create separate branch where I inline
// all this and see whether it affects the resulting size
let Config = {
  get canvasWidth() {
    return kontra.canvas && kontra.canvas.width / this.scale;
  },
  get canvasHeight() {
    return kontra.canvas && kontra.canvas.height / this.scale;
  },
  //scale: 1,
  scale: 1.5,

  // collisions
  collidableTypes: [
    SpriteType.Asteroid,
    SpriteType.Bullet,
    SpriteType.Ship,
    SpriteType.Cell,
    SpriteType.Planet,
    SpriteType.Sun,
    SpriteType.Elder
  ],

  Factions: {
    [Faction.Blue]: {
      Name: "Earth",
      Planet: PlanetType.Paradise,
      get Ship() {
        return Game.instance().assets.images.blueship;
      },
      Color: { r: 0, g: 227, b: 255 }
    }
  }

  /*
  TODO: Commenting this to save space for the js13k competition
  I'll inline these in every specific file they're used


  // an object far from the camera
  // more than this constant will be recycled
  // TODO: make this smaller, temporarily increasing for
  // debugging's sake
  mapBoundary: 10000,

  // enable debug printouts
  debug: false,
  renderDebugData: true,
  verbose: false, // prints all info of ships in console
  typesToLog: [
    SpriteType.Asteroid,
    SpriteType.Ship,
    SpriteType.Elder,
    SpriteType.Bullet
  ],
  logTheseProperties: (s: Sprite) => ({
    type: s.type,
    x: s.x,
    y: s.y,
    dx: 0,
    dy: 0,
    ttl: s.ttl
  }),
  onlyLogInProximityToShip: true, // great for debugging collisions
  renderCollisionArea: false,
  debugRadar: false,
  showPath: false,
  debugSpawnObjects: false,

  // UI
  UI: {
    Bar: {
      Width: 100,
      Height: 5
    }
  },

  // Game Objects
  Asteroids: {
    // small number during dev
    MaxAsteroidClusterSize: 5,
    InitialNumberOfClusters: 5
  },

  Ship: {
    Energy: 700,
    Life: 300,
    Shield: 400,
    EnergyCost: {
      Thrust: 1,
      Brake: 1,
      Shoot: 10,
      ShieldRecharge: 1,
      Vision: 1
    },
    Radar: {
      Size: 100,
      Radius: 45,
      Range: 1000
    },
    InitialPosition: {
      get x() {
        return Config.canvasWidth / 2;
      },
      get y() {
        return Config.canvasHeight / 2;
      }
    }
  },

  Cell: {
    OuterRadius: 8,
    InnerRadius: 2,
    TTL: 240,
    Speed: 0.7,
    EnergyBoost: 20,
    LifeBoost: 10
  },

  Planet: {
    Resources: 3000
  },

  Factions: {
    [Faction.Red]: {
      Name: "Harkonnen",
      PlanetName: "",
      Planet: PlanetType.Red,
      Objective: "War & Conquest",
      Description: "House Harkonnen...",
      get Ship() {
        return Game.instance().assets.images.redship;
      },
      Color: { r: 255, g: 0, b: 0 },
      Modifiers: {
        Life: 100,
        LifeRepairRate: 1,
        Energy: 100,
        EnergyRechargeRate: -1,
        Shield: 100,
        ShieldRechargeRate: 1,
        Rotation: -1.5,
        Speed: -0.025,
        FireRate: -0.1,
        Damage: 5,
        Protection: 5
      } as FactionShipModifiers
    },
    [Faction.Blue]: {
      Name: "Atreides",
      Color: { r: 0, g: 227, b: 255 },
      PlanetName: "",
      Planet: PlanetType.Paradise,
      Objective: "Freedom & Liberty",
      Description: "House Atreides...",
      get Ship() {
        return Game.instance().assets.images.blueship;
      },
      Modifiers: {
        Life: -100,
        LifeRepairRate: 1,
        Energy: 100,
        EnergyRechargeRate: 2,
        Shield: -100,
        ShieldRechargeRate: 1,
        Rotation: 2,
        Speed: 0.025,
        FireRate: 0,
        Damage: -5,
        Protection: -5
      } as FactionShipModifiers
    },
    [Faction.Green]: {
      Name: "Corrino",
      Planet: PlanetType.Green,
      PlanetName: "",
      Color: { r: 0, g: 255, b: 0 },
      Objective: "Wealth & Power",
      Description: "House Corrino...",
      get Ship() {
        return Game.instance().assets.images.greenship;
      },
      Modifiers: {
        Life: 0,
        LifeRepairRate: 0,
        Energy: 0,
        EnergyRechargeRate: 0,
        Shield: 0,
        ShieldRechargeRate: 0,
        Rotation: 0,
        Speed: 0,
        Damage: 0,
        FireRate: 0,
        Protection: 0
      } as FactionShipModifiers
    }
  }

  /*
  Galaxy: {
    // start with fixed size 10x10 sectors
    Size: 100000
  },
  Sector: {
    Size: 10000
  },
  Stars: {
    MaxNumber: 500
  },
  Elders: {
    MaxNumber: 100
  },
  Bullets: {
    NumberOfParticles: 2
  },
  Textures: {
    Planet: 100,
    Sun: 100,
    Elder: 20
  }
  */
};

export default Config;
