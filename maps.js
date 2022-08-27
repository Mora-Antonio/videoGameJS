/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
*/

const emojis = {
    '-': ' ',
    'O': '🚪',
    'X': '💣',
    'I': '🏆',
    'PLAYER': '💀',
    'COLLISION': '🔥',
    'GAME_OVER': '👎🏻',
    'WIN': '🥇',
    'HEART': '💙',
  };
  
  const maps = [];
  maps.push(`IXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    OXXXXXXXXX`);
  maps.push(`O--XXXXXXX
    X--XXXXXXX
    XX----XXXX
    X--XX-XXXX
    X-XXX--XXX
    X-XXXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    XXXXXXXXXX`);
  maps.push(`XI----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX`);
    maps.push(`IXX-----------X
    -X-XXXXXXXXXX-X
    -X--XXXXXXXXX-X
    -XX-XXXXXX----X
    -X---------XXXX
    -XX-XXXXXX-XXXX
    -XX-XXXXXX-XXXX
    -XX-XXXXXX-XXXX
    -XX-XXXXXX-XXXX
    -XX-XXXXXX-XXXX
    ----XXX-----XXX
    -XXXXXX-XXX--XX
    -X------XXXX--X
    -XXXXXXXXXXXXO-
    XXXXXXXXXXXXXX-
    `
    );
    maps.push(`-XX-----------X
    -X-XXXXXXXXXX-X
    -X-OXXXXXXXXX-X
    -XX-XXXXXX----X
    -X---------XXXX
    -XX-XX-XXX-XXXX
    -XX-XX-XXX-XXXX
    -XX-XX-XXX-XXXX
    -XX-XX-XXX-XXXX
    -XX-XXXXXX-XXXX
    ----XX------XXX
    -XXXXX--XXX--XX
    -X------XXXX--X
    -XXXXX-XXXXXX--
    XI-----XXXXXXXX`
    );
    maps.push(`XXX---XXXXX---XXX
    XXX-X--XXX--X-XXX
    XXX-XX--X--XX-XXX
    XX--XXX---XXX--XX
    X--XXXXX-XXXXX--X
    --XX---------XX--
    -XXX-XXXXXXX-XXX-
    --XX-X--O--X-XX--
    X--X-X-XXX-X-X--X
    XX-X---XIX---X-XX
    X--XXXX---XXXX--X
    --XXX---X---XXX--
    -XXXX--XXX--XXXX-
    --XXX--XXX--XXX--
    X--XXX--X--XXX--X
    XX--XXXX---XX--XX
    XXX-----------XXX
    `
    );