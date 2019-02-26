# (design) Notes


## The main pillars:

  - JRPG-style combat
    - does this have to imply a party system?
      - I think it does, yes
  - Wandering monsters
  - Shiren/Azure Dreams style anti-permadeath
  - Crystals
  - Status effects
  - World : Town : Dungeon locations


## Other features / things not to forget

  - Command>Event pattern; Player extends Entity, Entity takes care of Mixins, mixin "Actor" 
  - public website
  - public morgue files
  - I need a name for this thing, and an aesthetic (which is possibly... anime/JPGish)?
 

## game loop

  - game says it's the player's turn
  - wait for input
  - resolve input into commands
  - add commands to queue
  - process queue
  - move onto next actor
  
...is the queue per-actor or a global one?

I think it's global -- each command knows who issued it and who it's pointed at? But they should be broadcast...