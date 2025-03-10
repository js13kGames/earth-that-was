# JS13K SPACESHOOTER

- Start working on the game
  - TOPIC: OFFLINE
  - define story
    - firefly. smuggling/jobs. fun.
    - post apocaliptic story? Ai. melancholy.
  - goal of the game
    - survive in space before your energy runs out or you die
    - offline
      - as your energy drops your ship system's will go offline
      - systems
        - shield
        - radar
        - vision
        - shoot
        - thrust
        - solar slowly recharges your energy

## Prioritize

- simplify

  - [*] earth dies
    - [*] generate sun system and put the ship beside it
    - [*] place ship beside the earth!
    - [*] have earth planet always have a fixed angle (easy)
    - [*] do animation turning from paradise to red planet
  - find a new home for manking before X time
    - [*] create counter
    - [*] find a paradise class planet
      - [*] fix other planet types, specially paradise class planet
      - [*] create single paradise planet, which happens to be owned by aliens
      - [*] create victory condition and make sure it works
      - [*] create single paradise planet randomly
    - show messages and provide some breadcrumbs to find that planet
      - transmission from some aliens?
  - refactor planet to reduce Kb
    - refactor drawing primitives
    - review other heavy source code files
  - [*] remove factions, remove intro
  - [*] narrate game with more stuff
  - [*] messages should appear immediately if there are not messages being shown
  - fix regressions
    - asteroid collision
    - alien follow
    - end of galaxy, go to the other side
    - there's something wrong with the stars in the background. particularly when going towards negative numbers. they disappear when they shouldnt
  - sector creation
    - asteroids
    - aliens, the further the more aliens in systems
    - add some more randomness in sector creation
  - game mechanics
    - encounters
    - energy is not recovered over time. If you lose it you die. and mankind dies with you.
    - if you remain at two low energy for two
    - ship status offline/online should work separately from narration and
      have its own queue
  - narration during game
    - when things happen
    - when doing things for the first time
      - asteroids
      - claiming planets
    - [*] when counter gets down
    - when energy runs out
    - arbitrary thoughts from hal
    - when visiting new systems...

- delay start of first screen till patterns are loaded in memory

- good to haves
  - resize canvas on screen change
  - do inside planets travel faster?
  - pixel font

* Size. Get under 13 K mother fucker
  - refactor offscreen canvas remove
  - refactor collision engine
  - refactor particle generator
  - UI bars in shell, use one single component
* Regressions
  - BUG. Fix regression with alien ships following the ship
  - BUG. Collisions with asteroids
* Playability and Basic gameplay
  - [*] Fix player bullet shooting. It looks weird. I think it has to do with the
    speed of the ship.
  - [*] detect enemies in radar
  - [*] Message queue to display in game messages
  - Add radar with more information of interest (not only radar but arrows as well). Otherwise is going to be impossible to find star systems.
  - [*] Adjust numbers. Make ship stronger so you don't die so fast.
  - [*] Make systems go offline with less energy (not at a uniform rate)
  - [*] Add more information about where the player ship is
  - Make bullets follow targets
  - Planets
    - stations, defences, production
* Change types for enums instead of strings
* Map generation
  - Add first version of all planets
  - [*] create a map of a starting number of sectors (Test having everything in memory first)
    - get to the end of the map you appear on the other side
  - static map generation
    - add more static asteroids in the different sectors
    - add elder fleets of different sizes
    - add other factions
      - planets
      - NPC ships
    - change the position of the sun so it is not always dead center of a sector
  - dynamic events
    - add dynamic asteroids that approach the ship
    - add elder patrols that attack the ship
    - add other factions attacking the ship
    - other factions/elders taking control of planets, etc
  - reuse objects using object pool
  - save state in an object
* Victory conditions
  - reclaim earth
  - Red: Conquest x plantes
  - Blue: Reclaim x planets from elders
  - Green: Establish commerce in x planets
* Enemies
  - motherships.
    - make mother ship move steady in a direction
    - make mother ship spawn new drones up to a limit every so often until it is destroyed
  - collision between enemies and asteroids!
  - handle collisions, idea of life/damage for non ship objects, etc
    - would be interesting to have the same for asteroids as well
  - other factions
    - similar behavior to players ship
  - shoot bullets with color of your own faction (including particles)
    - red, blue, green for the factions
    - purple for the evil elder race
* define game story and goals
  - complete faction selection process
    - would be cool to add some information and background about the factions
      - blue
        - victory condition freedom
      - green
        - victory condition collecting
      - red
        - victory condition conquest
    - 3 victory conditions
      - way to store game data
* support for multiple weapons
* planets orbiting around sun
  - add gradient using the sun in the center as source of illumination
* make planets smarter
  - defend themselves before they can be claimed
  - build defence systems over time
* investigate generative music
* make a way to deliver game story

## BUILD - minimize assets to 13K

- Game engine improvements
  - scenes.
    - Separate background and foreground objects. There's no need to check
    - extract checking whether an object is viewable to the render method within the scene. We no longer need to do it per sprite? As I've been doing it
- Refactor
  - collision engine
  - particle generator
- Techniques to reduce space
  - wrap kontra library -> this didn't work
  - write the loading assets component from scratch. I'll only need the images, so I don't really need 1K only for loading 3 images
  - [*] update ts not to transpile stuff to ES5
  - use spritesheet with all sprites
- Optimize build
  - test closure compiler
    - this is going to be a pain in the ass
    - consider loading kontra just by copying file as is to the dist folder
      and including it as is in the index.html template
    - setup compressor to just compress everything in dist/
    - Test setting up to take advantage of TYPESCRIPT, because right now I'm removing types after transpiling and then sending it to closure
  - test removing all the parts of kontra that I don't need
  - wrap drawing primitives and behavior primitives in classes/functions/etc
- TypeScript
  - use generics for kontra types

## CORE GAME MECHANICS

- Gameplay
  - allow user to zoom in or zoom out (using scale hopefully works XD)
- ship faction modifier
  - revisit. make a system with points to make it more equitative. (Instead of just setting random values xD)
- shoot
  - support for other weapons:
    - bomb (explodes)
    - mine (leave it behind)
    - slower rate of shooting but stronger missile
- move
  - show speed indicator?
    - parsecs? (very huge speed units)
    - make sure that it make sense (the numbers)
  - tinker with the max speed
- map
  - iteratively generate map boundaries!!!! CORE to gameplay
  - generate some part of the galaxy as the game starts and then iteratively generate more as the player moves (planets, suns, etc)
  - large objects should have a fixed position and the plater should be able
    to come back to them
- asteroids generation
  - improve clusters to be x-close, or y-close, that will look cooler :D (I think, they will look more like a cluster)
  - add new clusters every so often (outside of the current camera view)
  - far and near asteriods with differnet shades of ligt
- ship life/collisions
  - when you collide with something or lose life, move the canvas with css like you're shaking. Add some reddish color in the actual screen.
  - collision decreases speed
  - improve collision algorithm to take types into account instead of requiring sorting
- shoot
  - add a sprite with a number that shows how much you got
    - in addition, it would be cool to show it beside the bar, as it increases
  - improvement in asteroids breaking
    - instead of destroying asteroid, makes asteroids smaller
    - energy moves towards the ship, when the ship is near
- energy and life cells
  - make energy, life be attracted by the ship
  - make the little energy ball do circular transitions
- shield
  - improve art and flickering animation
    - flicker when it goes off/on (perhaps we can flicker with low energy)
    - when enabled more around a little bit. Perhaps the origin can describe a circle itself
- planets
  - create some patterns for planets (bigger pattern? better algorithm?)
    - earth like planet
  - resources
    - improve: give resources only until you've filled up
      - if you have energy remaining, provide only energy
    - also planets have a limited number of resources that regenerate over time
      - interesting if some types of planets have more of some resource
      - food could be a third resource
  - planets need to be claimed by the faction before they can be used to
    gather resources! (cool xD)
    - [*] over time a defense orbiting station is built on the planet
  - some planets have moons
  - cool ideas
    - get jobs
    - fullfill quests
    - sell resources (pillaging/asteroid mining/etc) in exchange for money/equipment/goods
- suns
  - proximity to sun hurts you
  - proximity to sun boost normal rate of energy acquisition
  - have two rings outer, inner (green/red) or something
  - it'd be cool if we could arrange planets around a sun
  - and make them orbit the sun slowly, that would be cool :D
- radar
  - [*] show interesting stuff (like a minimap)
  - separate scene background from foreground sprites!!
  - deactivate when energy is not sufficient
  - activate when energy sufficient
  - add ships/sun/enemies, etc
- vision
  - diminish range of vision (player sees less space, rest becomes darker)
- enable/disable systems based on energy left
  - [*] shield 4/5
  - radar (needs to be implemented yet) 3/5
    - make simple implementation
  - vision 2/5
  - shoot 1/5
  - thrust
  - life support?
- game messages
  - implement so that not two overlapping texts appear at the same time (offline/online). Add some sort of message queueing system
  - have a queue with 3 slots that can be filled with text (f.i.
- ways to lose
  - crushed by an asteroid
  - been too near a sun
  - black holes?
  - beasts and enemies attack you
  - too low energy? Life support disabled for a long period of time?
- smart enemies:
  - other factions
  - reapers
  - galatic empire, etc
  - AIs
  - creatures
  - aliensssss of some sort (the elders)
    - make them with different polygon parts with different behaviors
    - different AIs
    - elders
      - drone ships, hover around mother ship, follow a scouting pattern when you're within a range they follow you and attack you. Then go back to mother ship if you go too far.
      - sentries. Slow turrets that are static and follow you as you get near.
      - destroyer. bigger ship
      - mother ship. huge ship
  - other factions
    - they have already claimed a planet, they attack your planets
    - random patrols
- a way to deliver story. what story? :)
- game engine
  - extract all variables so they're configurable from a single point
  - this could be altered by a UI in realtime and allow me to tweak the game
  - show active, inactive game objects, fps, etc when debug flag is enabled
- different difficulty levels
  - higher cost for actions? smarter/beter enemies
- end escene
  - show explosion of your ship then move to end screen with scores and such
  - overdo the explosion
  - then move to scores scene
- scoreboard
  - saved in localstorage
- Initial screens
  - title
  - choose faction (see summary of story)
    - select one of the three, then panel slides with story, ship info, goal
    - factions have different looks and stats for the ship and different game goals
    - blue/science/find orion
    - green/commerce/gather x amount of energy
    - red/dominion/control x amount of planets
- Ilumination
  - it would be cool to do something with ilumination
  - moving objects being illuminated by larger objects like suns/planets which either produce or reflect light. That would add some dynamism to the ships.
- Performance
  - profile and review performance
  - think of stuff you can do to improve performance and memory consumption
  - make sure that scenes are garbaged collected
  - make sure inactie scenes aren't updated/rendered
- More offline theme (use workbox)
  - PWA with precaching of game assets
  - Add application manifest so it can be installed
- Canvas
  - resize canvas on windows change
- Performance
  - make sure to hit 60 fps
    - use game pool
      - with particles
      - with asteroids
      - with planets
    - update sectors/planets, etc to work with pools
      - separate data from actual sprite
      - use pools
      - then generate map data, and use that with the pools
- REFACTORING
  - extract receiving impact animation into something reusable
  - refactor collision engine to be more consistent across different types of objects
  - refactor objects types to Enums

## Art

- pixel art for everything
- ship
  - [*] particle systems for ship thrust
  - [*] particle system for explosions/impacts
  - [*] animate collisions
  - [*] test creating a pixel on piksel
  - [*] make pixel moooore pixelated :) Looks better I think :)
  - show when the ship gets damage
    - tint in red
- particles
  - review particle system
  - it would be could if i could experiment with an editor and
    change the different parameters I have and see how the affect
    the particles
    - build this!
- asteroids
  - [*] test creating a texture procedurally
    - looks interesting but it doesn't work out so well with the circular shapes. I should try to create shapes that are less circular. Perhaps using paths of closing angles, with an arbitrary number of sides.
  - [*] wrote algorithm to generate polygonal shapes
  - continue improving algorithm so it matches the collision detection
    - I can write an equation so find the right location in a circle given an angle. And get the right length. (Although this will result in less egdy shapes)
  - rotate as well as translate
- planets
  - [*] test generating a texture procedurally as well
  - I could approach it as using different patterns for different layers:
    - seas
    - then landmasses
    - then clouds
    - it'd be cool if the clouds would move
  - idem
- enemy ships, etc
- Music
  - ?
- Find a name for the game :D

## BUGS

- for some reason, a broken down asteroid doesn't collide with the ship, although it does collide with bullets. #wat

# OLD NOTES

# 8th SEPTEMBER

- Map generation
  - [*] BUG: there appears to be an issue where stars aren't displayed
    after the ship has been moving for a while. PROBABLY due to
    the position reaching maxInteger. We can solve this by using
    both position and sectors. (so we never go over the position maxInteger)
    - fixed. I was removing the stars out of the arbitrary boundaries I defined
  - create a map of a starting number of sectors (Test having everything in memory first)
    - [*] planets and suns
    - [*] start with a fixed sized based on max and min size of number and that's it
      . In v2 I can create a infinite universe xD.
    - [*] doesn't look so bad
  - [*] separate sectors by some distance of "empty" space
- Enemies
  - [*] first version of enemy sentry that follows and shoots at you
    - [*] update collision engine to be able to impact things with bullets
  - complete alien faction
    - [*] sentries
    - [*] mother ship
    - [*] drones
    - [*] design pattern for this ships. Something greyish and purple
      - [*] looks great! Try some green as well and use either of those patterns
    - [*] create fleet formations (with mother ship, drones and sentries)
      - [*] more or less complete
  - [*] shoot bullets with color of your own faction (including particles)
    - [*] red, blue, green for the factions
    - [*] purple for the evil elder race

# 2nd SEPTEMBER

- Map generation
  - [*] divide map in sectors
  - [*] generate sectors with a star and some planets
  - [*] cover background with stars. Considered using game pool
    from kontra but in the end I created a custom sort of pool
    cuz I didn't want to handle it via ttl/get (just update the
    position of the farthest stars)
- [*] complete faction selection process
  - [*] 3 different ships
    - [*] create art for two more ships
  - [*] ships have slightly different stats
    - [*] faction ship modifiers
    - blue
      - [*] faster, more maneuverability, less hull/shields
      - [*] positive modifier for paradise planets
    - green
      - [*] middle ground
      - [*] positive modifier for green plantes
    - red
      - [*] slower, less maneuverable, more hull/shields
      - [*] positive modifier for red planets
- [*] proximity to a sun recharges energy faster?

# 30 AUGUST

- [*] complete basic offline mechanics
  - [*] radar
  - [*] disable stuff when no energy
    - [*] radar 4/5
    - [*] shield 3/5
    - [*] weapons 2/5
    - [*] vision 1/5 (reduce range of vision)
  - [*] reorganize ships systems
    - [*] there's a little bit of a mambo jambo and circular dependencies there
    - [*] extract ShipsSystems object which enables/disables/makes sure you can perform a task
    - [*] extract ShipWeapon to wrap shooting, etc
    - [*]extract common functionality in ShipSystems mixin
    - [*]energy:
      - control recharge from ShipEnergy based on active systems
        instead of adding/recharging at different times with makes
        the energy bar yank back and forth without user interaction
      - share systems between Ship and ShipEnergy instead of needing to
        subscribe explicitly
      - max energy in config. Less dependencies on energy
      - UNIFY enable/disable in a single function? Why call it on update and then on a subscription? Hmm can I remove the subscriptions and just call
        it on update?

# 25 AUGUST

## BUILD - minimize assets to 13K

- Optimize build
  - [*] Kontra is included as an unminifed raw string :/ - included min.js as part of the game source code
  - [*] styles loader takes 10K minified - removed and inlined styles
  - [*] right not it seems I'm about ~8Kb only framework and stuff
  - test closure compiler
  - test removing all the parts of kontra that I don't need

## CORE GAME MECHANICS

- ship energy
  - [*] ship energy indicator
  - [*] suns slowly recharge energy
  - when you get near to a sun you get more energy faster
- move
  - [*] move affects energy
  - [*] cant move if you dont have energy enough
  - [*] move around a map of fixed size? (more or less)
  - [*] don't render stuff that is not in the visible area
    - (is canvas smart enough to do this or do I need to take it into account?)
  - [*] add particles to moving (back and front)
  - show speed indicator?
    - [*] create some speed indicator
    - parsecs? (very huge speed units)
    - make sure that it make sense (the numbers)
  - tinker with the max speed
  - [*] enabling pressing back to diminish forward speed (less strong than forward but same amount of energy)
  - [*] make canvas BIGGER! Take the whole screen! :)
  - [*] save middle points in a config file and use them in the game
- map
  - iteratively generate map boundaries!!!! CORE to gameplay
  - generate some part of the galaxy as the game starts and then iteratively generate more as the player moves (planets, suns, etc)
  - large objects should have a fixed position and the plater should be able
    to come back to them
- asteroids generation
  - [*] come from random location at random speed
  - [*] different size
  - [*] create clusters of asteroids
  - improve clusters to be x-close, or y-close, that will look cooler :D (I think, they will look more like a cluster)
  - add new clusters every so often (outside of the current camera view)
- ship life/collisions
  - [*] life and life indicator for the ship
  - [*] collisions reduces life
  - [*]BUUUUUG collisions seem not to be working 100%
    - [*] they don't work for asteroids generated when one other asteroid is broken?
    - [*] Fix, the issue was the collision algorithm which wasn't checking the collision between new asteroids and the ship (the ship was already considered collision free)
  - [*] asteroid breaks on collision (or disintegrates depending on size)
  - when you collide with something or lose life, move the canvas with css like you're shaking. Add some reddish color in the actual screen.
  - collision decreases speed
  - improve collision algorithm to take types into account instead of requiring sorting
- shoot
  - [*] shooting spends energy
  - [*] shooting at asteroids releases components -> energy, life
  - [*] energy, life is absorved by the ship when the ship approaches
  - [*] add a sprite with a number that shows how much you got
    - [*] on top of the collision
    - in addition, it would be cool to show it beside the bar
  - [*] bullets should have particles behind
  - improvement in asteroids breaking
    - instead of destroying asteroid, makes asteroids smaller
    - energy moves towards the ship, when the ship is near
- energy and life cells
  - [*] energy and life cells
  - make energy, life be attracted by the ship
  - make the little energy ball do circular transitions
- shield
  - [*] shield is available when you have max energy > 4/5
  - [*] it recharges at the same speed as energy (so when it is on, energy doesn't recharge) (the baseline for energy)
  - [*] if energy goes low or it is broken it disappears
  - [*] BUG!!! fix fix!
    - [*] there seems to be a bug with the shield not coming online!!
  - improve art and flickering animation
    - flicker when it goes off/on (perhaps we can flicker with low energy)
    - when enabled more around a little bit. Perhaps the origin can describe a circle itself
- stars
  - [*] testing sprites so far
  - [*] two different layers with different speeds and intensity
  - [*] moving as the camera moves
  - stars as tilesets or sprites?
    - sprites, very easy to create
      - perhaps harder to distribute at an "even" way around the ship
      - I think I have a working solution there
    - tiles, can create a parallax effect much easier
      - hmm I could make the camera movement affect more
        nearer background stuff as well, that should work
  - can I make stars with a tileset?
- planets
  - [*] dotted circle and planet
  - create some patterns for planets (bigger pattern? better algorithm?)
    - [*] green planet
    - [*] red planet
    - [*] blue ice planet
    - earth like planet
  - resources
    - [*] you get resources if you get near the dotted circle
    - [*] more resources
    - [*] you can recharge resources by orbiting near planets
    - improve: give resources only until you've filled up
      - if you have energy remaining, provide only energy
    - also planets have a limited number of resources that regenerate over time
      - interesting if some types of planets have more of some resource
      - food could be a third resource
  - [*] give planets names
  - planets need to be claimed by the faction before they can be used to
    gather resources! (cool xD)
    - claim orbiting an unclaimed planet for some seconds
    - claimed planets get a ring of your factions color
    - over time a defense orbiting station is built on the planet
  - some planets have moons
  - cool ideas
    - get jobs
    - fullfill quests
    - sell resources (pillaging/asteroid mining/etc) in exchange for money/equipment/goods
- boosts
  - don't need to add boosts when ship is already healed/energy maxed
- suns
  - proximity to sun hurts you
  - proximity to sun boost normal rate of energy acquisition
  - have two rings outer, inner (green/red) or something
  - it'd be cool if we could arrange planets around a sun
  - and make them orbit the sun slowly, that would be cool :D
- stars
  - stars give you energy faster
  - but if you get too near you die
- shield (implemented above)
  - [*] slowly drains energy (same speed as sun in lowest charge)
  - [*] protects ship hull
- radar
  - show interesting stuff (like a minimap)
- vision
  - diminish range of vision (player sees less space, rest becomes darker)
- enable/disable systems based on energy left
  - [*] show message when this happens
  - [*] shield
  - radar
  - vision
  - shoot
  - thrust
  - life support?
  - refinement:
    - implement so that not two overlapping texts appear at the same time (offline/online). Add some sort of message queueing system
- ways to lose
  - crushed by an asteroid
  - been too near a sun
  - black holes?
  - beasts and enemies attack you
  - too low energy? Life support disabled for a long period of time?
- smart enemies
  - reapers
  - galatic empire, etc
  - AIs
  - creatures
- a way to deliver story
- game engine
  - extract all variables so they're configurable from a single point
  - this could be altered by a UI in realtime and allow me to tweak the game
- different difficulty levels
  - higher cost for actions
- end escene
  - show explosion of your ship then move to end screen with scores and such
  - overdo the explosion
  - then move to scores scene
- scoreboard
  - saved in localstorage
- Initial screens
  - title
  - choose faction (see summary of story)
    - factions have different looks and stats for the ship

## Art

- pixel art for everything
- ship
  - [*] particle systems for ship thrust
  - [*] particle system for explosions/impacts
  - [*] animate collisions
  - [*] test creating a pixel on piksel
  - [*] make pixel moooore pixelated :) Looks better I think :)
  - show when the ship gets damage
    - tink in red
- particles
  - review particle system
  - it would be could if i could experiment with an editor and
    change the different parameters I have and see how the affect
    the particles
    - build this!
- asteroids
  - [*] test creating a texture procedurally
    - looks interesting but it doesn't work out so well with the circular shapes. I should try to create shapes that are less circular. Perhaps using paths of closing angles, with an arbitrary number of sides.
  - [*] wrote algorithm to generate polygonal shapes
  - continue improving algorithm so it matches the collision detection
    - I can write an equation so find the right location in a circle given an angle. And get the right length. (Although this will result in less egdy shapes)
  - rotate as well as translate
- planets
  - [*] test generating a texture procedurally as well
  - I could approach it as using different patterns for different layers:
    - seas
    - then landmasses
    - then clouds
    - it'd be cool if the clouds would move
  - idem
- enemy ships, etc
- Music
  - ?
- Find a name for the game :D
- Fonts
  - try using more pixelated font with generally browser supported fonts
  - or figure something out with doesn't take so much space

## BUGS

- for some reason, a broken down asteroid doesn't collide with the ship, although it does collide with bullets. #wat
