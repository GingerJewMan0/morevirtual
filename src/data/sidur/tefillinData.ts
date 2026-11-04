import { TefillinBlessing, TefillinStep } from './types';

export const TEFILLIN_BLESSINGS: Record<string, TefillinBlessing> = {
  lehaniach: {
    id: 'lehaniach',
    titleHebrew: 'לְהָנִיחַ תְּפִלִּין',
    titleSpanish: 'Lehaniaj Tefilín (Mano)',
    hebrew: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ לְהָנִיחַ תְּפִלִּין.',
    phonetic: {
      sefardi: 'Baruj atá Adonai, Elohenu melej haolam, asher kideshanu bemitzvotav vetzivanu lehaniaj tefilín.',
      ashkenazi: 'Boruj ato Adonoi, Eloheinu melej hoiolom, asher kideshanu bemitzvosov vetzivanu lehaniach tefillin.'
    },
    translation: {
      es: 'Bendito eres Tú, oh Eterno nuestro Dios, Rey del universo, que nos santificó con Sus mandamientos y nos ordenó colocar los Tefilín.',
      en: 'Blessed are You, Lord our God, King of the universe, Who has sanctified us with His commandments and commanded us to lay Tefillin.',
      fr: 'Béni soit Tu, Éternel notre Dieu, Roi de l\'univers, Qui nous as sanctifiés par Ses commandements et nous as ordonné de poser les Tefillines.',
      pt: 'Bendito és Tu, Senhor nosso Deus, Rei do universo, que nos santificou com Seus mandamentos e nos ordenou colocar os Tefilin.'
    }
  },
  'al-mitzvat': {
    id: 'al-mitzvat',
    titleHebrew: 'עַל מִצְוַת תְּפִלִּין',
    titleSpanish: 'Al Mitzvat Tefilín (Cabeza - Solo Ashkenazí)',
    hebrew: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ עַל מִצְוַת תְּפִלִּין.',
    phonetic: {
      sefardi: 'Baruj atá Adonai, Elohenu melej haolam, asher kideshanu bemitzvotav vetzivanu al mitzvat tefilín.',
      ashkenazi: 'Boruj ato Adonoi, Eloheinu melej hoiolom, asher kideshanu bemitzvosov vetzivanu al mitzvat tefillin.'
    },
    translation: {
      es: 'Bendito eres Tú, oh Eterno nuestro Dios, Rey del universo, que nos santificó con Sus mandamientos y nos ordenó sobre el precepto de Tefilín.',
      en: 'Blessed are You, Lord our God, King of the universe, Who has sanctified us with His commandments and commanded us concerning the mitzvah of Tefillin.',
      fr: 'Béni soit Tu, Éternel notre Dieu, Roi de l\'univers, Qui nous as sanctifiés par Ses commandements et nous as ordonné la mitzvah des Tefillines.',
      pt: 'Bendito és Tu, Senhor nosso Deus, Rei do universo, que nos santificou com Seus mandamentos e nos ordenou sobre o preceito de Tefilin.'
    },
    note: {
      es: 'Tras ajustar el Shel Rosh, la tradición Ashkenazí agrega: "Baruj shem kevod maljutó leolam vaed".',
      en: 'After tightening the Head Tefillin, Ashkenazi tradition adds: "Baruch shem kevod malchuto leolam vaed".',
      fr: 'Après avoir ajusté le Tefilline de la tête, la tradition Ashkenaze ajoute : "Baroukh chem kevod malkhouto leolam vaed".',
      pt: 'Após ajustar o Shel Rosh, a tradição Ashkenazi adiciona: "Baruch shem kevod malchuto leolam vaed".'
    }
  }
};

export const TEFILLIN_STEPS: TefillinStep[] = [
  {
    id: 1,
    title: {
      es: '1. Prepara los tefilín',
      en: '1. Prepare Tefillin',
      fr: '1. Préparer les Tefillines',
      pt: '1. Preparar os Tefilin'
    },
    description: {
      default: {
        es: 'Ten listos el shel yad (del brazo) y el shel rosh (de la cabeza).',
        en: 'Have the Shel Yad and Shel Rosh ready.',
        fr: 'Préparez le Shel Yad et le Shel Rosh.',
        pt: 'Tenha o Shel Yad e Shel Rosh prontos.'
      }
    },
    imagePlaceholder: '/assets/tefillin/step1.png',
    hasBlessing: true,
    blessingId: 'lehaniach'
  },
  {
    id: 2,
    title: {
      es: '2. Coloca el shel yad',
      en: '2. Place Shel Yad',
      fr: '2. Placer le Shel Yad',
      pt: '2. Colocar o Shel Yad'
    },
    description: {
      default: {
        es: 'Colócalo en el bíceps del brazo izquierdo, orientado hacia el corazón.',
        en: 'Place it on the bicep of the left arm, angled toward the heart.',
        fr: 'Placez-le sur le biceps du bras gauche, orienté vers le cœur.',
        pt: 'Coloque-o no bíceps do braço esquerdo, orientado para o coração.'
      },
      ashkenazi: {
        es: 'De pie, coloca el shel yad en el bíceps del brazo izquierdo, orientado hacia el corazón.',
        en: 'Standing, place the shel yad on your left bicep, angled toward the heart.',
        fr: 'Debout, placez le shel yad sur le biceps gauche, vers le cœur.',
        pt: 'De pé, coloque o shel yad no bíceps esquerdo, orientado para o coração.'
      },
      sefardi: {
        es: 'Sentado, coloca el shel yad en el bíceps del brazo izquierdo, orientado hacia el corazón.',
        en: 'Seated, place the shel yad on your left bicep, angled toward the heart.',
        fr: 'Assis, placez le shel yad sur le biceps gauche, vers le cœur.',
        pt: 'Sentado, coloque o shel yad no bíceps esquerdo, orientado para o coração.'
      },
      maguenDavid: {
        es: 'Sentado, coloca el shel yad en el bíceps del brazo izquierdo, orientado hacia el corazón.',
        en: 'Seated, place the shel yad on your left bicep, angled toward the heart.',
        fr: 'Assis, placez le shel yad sur le biceps gauche, vers le cœur.',
        pt: 'Sentado, coloque o shel yad no bíceps esquerdo, orientado para o coração.'
      },
      monteSinai: {
        es: 'Sentado, coloca el shel yad en el bíceps del brazo izquierdo, orientado hacia el corazón.',
        en: 'Seated, place the shel yad on your left bicep, angled toward the heart.',
        fr: 'Assis, placez le shel yad sur le biceps gauche, vers le cœur.',
        pt: 'Sentado, coloque o shel yad no bíceps esquerdo, orientado para o coração.'
      }
    },
    imagePlaceholder: '/assets/tefillin/step2.png'
  },
  {
    id: 3,
    title: {
      es: '3. Enrolla la correa',
      en: '3. Wrap the strap',
      fr: '3. Enrouler la lanière',
      pt: '3. Enrolar a correia'
    },
    description: {
      default: {
        es: 'Enrolla la correa 7 veces en el antebrazo.',
        en: 'Wrap the strap 7 times around the forearm.',
        fr: 'Enroulez la lanière 7 fois autour de l\'avant-bras.',
        pt: 'Enrole a correia 7 vezes no antebraço.'
      },
      ashkenazi: {
        es: 'Enrolla la correa 7 veces en el antebrazo hacia el torso (hacia adentro).',
        en: 'Wrap the strap 7 times around the forearm towards the torso (inwards).',
        fr: 'Enroulez la lanière 7 fois autour de l\'avant-bras vers le torse.',
        pt: 'Enrole a correia 7 vezes no antebraço em direção ao torso.'
      },
      sefardi: {
        es: 'Enrolla la correa 7 veces en el antebrazo hacia afuera del torso.',
        en: 'Wrap the strap 7 times around the forearm away from the torso (outwards).',
        fr: 'Enroulez la lanière 7 fois autour de l\'avant-bras vers l\'extérieur.',
        pt: 'Enrole a correia 7 vezes no antebraço para fora do torso.'
      },
      jabad: {
        es: 'Enrolla la correa 7 veces en el antebrazo hacia afuera del torso.',
        en: 'Wrap the strap 7 times around the forearm away from the torso (outwards).',
        fr: 'Enroulez la lanière 7 fois autour de l\'avant-bras vers l\'extérieur.',
        pt: 'Enrole a correia 7 vezes no antebraço para fora do torso.'
      },
      maguenDavid: {
        es: 'Enrolla la correa 7 veces en el antebrazo hacia afuera del torso.',
        en: 'Wrap the strap 7 times around the forearm away from the torso (outwards).',
        fr: 'Enroulez la lanière 7 fois autour de l\'avant-bras vers l\'extérieur.',
        pt: 'Enrole a correia 7 vezes no antebraço para fora do torso.'
      },
      monteSinai: {
        es: 'Enrolla la correa 7 veces en el antebrazo hacia afuera del torso.',
        en: 'Wrap the strap 7 times around the forearm away from the torso (outwards).',
        fr: 'Enroulez la lanière 7 fois autour de l\'avant-bras vers l\'extérieur.',
        pt: 'Enrole a correia 7 vezes no antebraço para fora do torso.'
      }
    },
    imagePlaceholder: '/assets/tefillin/step3.png'
  },
  {
    id: 4,
    title: {
      es: '4. Coloca el shel rosh y finaliza',
      en: '4. Place Shel Rosh & finish',
      fr: '4. Placer le Shel Rosh et terminer',
      pt: '4. Colocar o Shel Rosh e finalizar'
    },
    description: {
      default: {
        es: 'Coloca el tefilín de la cabeza centrado sobre la frente y completa el enrollado en la mano y en el dedo medio.',
        en: 'Place the head tefillin centered on the forehead and complete the wrapping on the hand and middle finger.',
        fr: 'Placez le tefillin de la tête centré sur le front et terminez l\'enroulement sur la main et le majeur.',
        pt: 'Coloque o tefilin da cabeça centralizado na testa e complete o enrolamento na mão e no dedo médio.'
      },
      ashkenazi: {
        es: 'De pie, coloca el tefilín de la cabeza centrado sobre la frente (por encima de la línea del cabello, entre los ojos) y completa el enrollado en la mano y el dedo medio.',
        en: 'Standing, place the head tefillin centered on the forehead and complete the wrapping on the hand and middle finger.',
        fr: 'Debout, placez le tefillin de la tête centré sur le front et terminez l\'enroulement.',
        pt: 'De pé, coloque o tefilin da cabeça centralizado na testa e complete o enrolamento.'
      },
      sefardi: {
        es: 'De pie, coloca el tefilín de la cabeza centrado sobre la frente (justo por encima de la línea del cabello) y completa el enrollado en la mano y el dedo medio.',
        en: 'Standing, place the head tefillin centered on the forehead and complete the wrapping on the hand and middle finger.',
        fr: 'Debout, placez le tefillin de la tête centré sur le front et terminez l\'enroulement.',
        pt: 'De pé, coloque o tefilin da cabeça centralizado na testa e complete o enrolamento.'
      },
      jabad: {
        es: 'Coloca el tefilín de la cabeza centrado sobre la frente y completa el enrollado en el dedo medio (una vuelta en la base, una arriba y una vez más en la base).',
        en: 'Place the head tefillin centered on the forehead and complete wrapping on the middle finger (one wrap at base, one above, one more at base).',
        fr: 'Placez le tefillin de la tête et terminez l\'enroulement sur le majeur.',
        pt: 'Coloque o tefilin da cabeça e complete o enrolamento no dedo médio.'
      },
      maguenDavid: {
        es: 'De pie, coloca el tefilín de la cabeza centrado sobre la línea del cabello, entre los ojos, y completa el enrollado en la mano y en el dedo medio.',
        en: 'Standing, place the head tefillin centered on the hairline, between the eyes, and complete the wrapping on the hand and middle finger.',
        fr: 'Debout, placez le tefillin de la tête centré sur la ligne des cheveux et terminez l\'enroulement.',
        pt: 'De pé, coloque o tefilin da cabeça centralizado na linha do cabelo e complete o enrolamento.'
      },
      monteSinai: {
        es: 'De pie, coloca el tefilín de la cabeza centrado sobre la línea del cabello, entre los ojos, y completa el enrollado en la mano y en el dedo medio.',
        en: 'Standing, place the head tefillin centered on the hairline, between the eyes, and complete the wrapping on the hand and middle finger.',
        fr: 'Debout, placez le tefillin de la tête centré sur la ligne des cheveux et terminez l\'enroulement.',
        pt: 'De pé, coloque o tefilin da cabeça centralizado na linha do cabelo e complete o enrolamento.'
      }
    },
    imagePlaceholder: '/assets/tefillin/step4.png',
    hasBlessing: true,
    blessingId: 'al-mitzvat'
  }
];