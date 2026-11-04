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
      es: '1. Preparación y Posición',
      en: '1. Preparation & Position',
      fr: '1. Préparation et Position',
      pt: '1. Preparação e Posição'
    },
    description: {
      default: {
        es: 'Ten listos el shel yad (del brazo) y el shel rosh (de la cabeza). Descubre el brazo no dominante. Coloca la caja en el bíceps, orientada hacia el corazón.',
        en: 'Have the Shel Yad and Shel Rosh ready. Expose your non-dominant arm. Place the box on the bicep, angled toward the heart.',
        fr: 'Préparez le Shel Yad et le Shel Rosh. Découvrez le bras non dominant. Placez le boîtier sur le biceps vers le cœur.',
        pt: 'Tenha o Shel Yad e Shel Rosh prontos. Descubra o braço não dominante. Coloque a caixa no bíceps virada para o coração.'
      },
      ashkenazi: {
        es: 'Ten listos el shel yad y el shel rosh. De pie, descubre el brazo no dominante y coloca la caja en el bíceps izquierdo, orientado hacia el corazón.',
        en: 'Have Shel Yad and Shel Rosh ready. Standing, expose your non-dominant arm and place the box on your left bicep angled toward the heart.',
        fr: 'Préparez le Shel Yad et le Shel Rosh. Debout, découvrez le bras non dominant et placez le boîtier sur le biceps vers le cœur.',
        pt: 'Tenha o Shel Yad e Shel Rosh prontos. De pé, descubra o braço não dominante e coloque a caixa no bíceps virado para o coração.'
      },
      sefardi: {
        es: 'Ten listos el shel yad y el shel rosh. Siéntate, descubre el brazo no dominante y coloca la caja en el bíceps, orientado hacia el corazón.',
        en: 'Have Shel Yad and Shel Rosh ready. Sit down, expose your non-dominant arm and place the box on the bicep angled toward the heart.',
        fr: 'Préparez le Shel Yad et le Shel Rosh. Asseyez-vous, découvrez le bras non dominant et placez le boîtier sur le biceps.',
        pt: 'Tenha o Shel Yad e Shel Rosh prontos. Sente-se, descubra o braço não dominante e coloque a caixa no bíceps.'
      },
      jabad: {
        es: 'Ten listos el shel yad y el shel rosh. Descubre el brazo no dominante y coloca la caja en el bíceps, orientado hacia el corazón.',
        en: 'Have Shel Yad and Shel Rosh ready. Expose your non-dominant arm and place the box on the bicep angled toward the heart.',
        fr: 'Préparez le Shel Yad et le Shel Rosh. Découvrez le bras non dominant et placez le boîtier sur le biceps.',
        pt: 'Tenha o Shel Yad e Shel Rosh prontos. Descubra o braço não dominante e coloque a caixa no bíceps.'
      },
      maguenDavid: {
        es: 'Ten listos el shel yad y el shel rosh. El shel yad se coloca sentado y el shel rosh de pie. Coloca la caja en el bíceps, orientado hacia el corazón.',
        en: 'Have Shel Yad and Shel Rosh ready. Shel Yad seated and Shel Rosh standing. Place the box on the bicep angled toward the heart.',
        fr: 'Préparez le Shel Yad et le Shel Rosh. Shel Yad assis et Shel Rosh debout.',
        pt: 'Tenha o Shel Yad e Shel Rosh prontos. Shel Yad sentado e Shel Rosh de pé.'
      },
      monteSinai: {
        es: 'Ten listos el shel yad y el shel rosh. El shel yad se coloca sentado y el shel rosh de pie. Coloca la caja en el bíceps, orientado hacia el corazón.',
        en: 'Have Shel Yad and Shel Rosh ready. Shel Yad seated and Shel Rosh standing. Place the box on the bicep angled toward the heart.',
        fr: 'Préparez le Shel Yad et le Shel Rosh. Shel Yad assis et Shel Rosh debout.',
        pt: 'Tenha o Shel Yad e Shel Rosh prontos. Shel Yad sentado e Shel Rosh de pé.'
      }
    },
    imagePlaceholder: '/assets/tefillin/step1.png',
    hasBlessing: true,
    blessingId: 'lehaniach'
  },
  {
    id: 2,
    title: {
      es: '2. Coloca el Shel Yad',
      en: '2. Place Shel Yad',
      fr: '2. Placer le Shel Yad',
      pt: '2. Colocar o Shel Yad'
    },
    description: {
      default: {
        es: 'Colócalo en el bíceps del brazo izquierdo (o brazo no dominante), orientado hacia el corazón.',
        en: 'Place it on the bicep of your left arm (or non-dominant arm), angled toward the heart.',
        fr: 'Placez-le sur le biceps du bras gauche, orienté vers le cœur.',
        pt: 'Coloque-o no bíceps do braço esquerdo, orientado para o coração.'
      },
      ashkenazi: {
        es: 'Colócalo en el bíceps del brazo izquierdo, orientado hacia el corazón.',
        en: 'Place it on the bicep of your left arm, angled toward the heart.',
        fr: 'Placez-le sur le biceps du bras gauche, orienté vers le cœur.',
        pt: 'Coloque-o no bíceps do braço esquerdo, orientado para o coração.'
      },
      sefardi: {
        es: 'Colócalo en el bíceps del brazo izquierdo, orientado hacia el corazón (en posición sentada).',
        en: 'Place it on the bicep of your left arm, angled toward the heart (seated).',
        fr: 'Placez-le sur le biceps du bras gauche, orienté vers le cœur (assis).',
        pt: 'Coloque-o no bíceps do braço esquerdo, orientado para o coração (sentado).'
      },
      jabad: {
        es: 'Colócalo en el bíceps del brazo izquierdo, orientado hacia el corazón.',
        en: 'Place it on the bicep of your left arm, angled toward the heart.',
        fr: 'Placez-le sur le biceps du bras gauche, orienté vers le cœur.',
        pt: 'Coloque-o no bíceps do braço esquerdo, orientado para o coração.'
      },
      maguenDavid: {
        es: 'Colócalo en el bíceps del brazo izquierdo, orientado hacia el corazón.',
        en: 'Place it on the bicep of your left arm, angled toward the heart.',
        fr: 'Placez-le sur le biceps du bras gauche, orienté vers le cœur.',
        pt: 'Coloque-o no bíceps do braço esquerdo, orientado para o coração.'
      },
      monteSinai: {
        es: 'Colócalo en el bíceps del brazo izquierdo, orientado hacia el corazón.',
        en: 'Place it on the bicep of your left arm, angled toward the heart.',
        fr: 'Placez-le sur le biceps du bras gauche, orienté vers le cœur.',
        pt: 'Coloque-o no bíceps do braço esquerdo, orientado para o coração.'
      }
    },
    imagePlaceholder: '/assets/tefillin/step2.png'
  },
  {
    id: 3,
    title: {
      es: '3. Enrolla la Correa',
      en: '3. Wrap the Strap',
      fr: '3. Enrouler la Lanière',
      pt: '3. Enrolar a Correia'
    },
    description: {
      default: {
        es: 'Enrolla la correa 7 veces en el antebrazo.',
        en: 'Wrap the strap 7 times around the forearm.',
        fr: 'Enroulez la lanière 7 fois autour de l\'avant-bras.',
        pt: 'Enrole a correia 7 vezes no antebraço.'
      },
      ashkenazi: {
        es: 'Enrolla la correa 7 veces en el antebrazo, hacia el torso (hacia adentro).',
        en: 'Wrap the strap 7 times around the forearm, towards the torso (inwards).',
        fr: 'Enroulez la lanière 7 fois autour de l\'avant-bras, vers le torse.',
        pt: 'Enrole a correia 7 vezes no antebraço, em direção ao torso.'
      },
      sefardi: {
        es: 'Enrolla la correa 7 veces en el antebrazo, hacia afuera del torso.',
        en: 'Wrap the strap 7 times around the forearm, away from the torso (outwards).',
        fr: 'Enroulez la lanière 7 fois autour de l\'avant-bras, vers l\'extérieur.',
        pt: 'Enrole a correia 7 vezes no antebraço, para fora do torso.'
      },
      jabad: {
        es: 'Enrolla la correa 7 veces en el antebrazo, hacia afuera del torso.',
        en: 'Wrap the strap 7 times around the forearm, away from the torso (outwards).',
        fr: 'Enroulez la lanière 7 fois autour de l\'avant-bras, vers l\'extérieur.',
        pt: 'Enrole a correia 7 vezes no antebraço, para fora do torso.'
      },
      maguenDavid: {
        es: 'Enrolla la correa 7 veces en el antebrazo, hacia afuera del torso.',
        en: 'Wrap the strap 7 times around the forearm, away from the torso (outwards).',
        fr: 'Enroulez la lanière 7 fois autour de l\'avant-bras, vers l\'extérieur.',
        pt: 'Enrole a correia 7 vezes no antebraço, para fora do torso.'
      },
      monteSinai: {
        es: 'Enrolla la correa 7 veces en el antebrazo, hacia afuera del torso.',
        en: 'Wrap the strap 7 times around the forearm, away from the torso (outwards).',
        fr: 'Enroulez la lanière 7 fois autour de l\'avant-bras, vers l\'extérieur.',
        pt: 'Enrole a correia 7 vezes no antebraço, para fora do torso.'
      }
    },
    imagePlaceholder: '/assets/tefillin/step3.png'
  },
  {
    id: 4,
    title: {
      es: '4. Coloca el Shel Rosh y Finaliza',
      en: '4. Place Shel Rosh & Finish',
      fr: '4. Placer Shel Rosh & Terminer',
      pt: '4. Colocar Shel Rosh & Finalizar'
    },
    description: {
      default: {
        es: 'Coloca el tefilín de la cabeza centrado sobre la frente y completa el enrollado en la mano y en el dedo medio.',
        en: 'Place the head tefillin centered on the forehead and complete the wrapping on the hand and middle finger.',
        fr: 'Placez le tefillin de la tête centré sur le front et terminez l\'enroulement sur la main et le majeur.',
        pt: 'Coloque o tefilin da cabeça centralizado na testa e complete o enrolamento na mão e no dedo médio.'
      },
      ashkenazi: {
        es: 'Coloca el tefilín de la cabeza centrado sobre la frente (por encima de la línea del cabello, entre los ojos) y completa el enrollado en la mano y dedo medio.',
        en: 'Place the head tefillin centered on the forehead (above the hairline, between the eyes) and complete the wrapping on the hand and middle finger.',
        fr: 'Placez le tefillin de la tête centré sur le front et terminez l\'enroulement.',
        pt: 'Coloque o tefilin da cabeça centralizado na testa e complete o enrolamento.'
      },
      sefardi: {
        es: 'Coloca el tefilín de la cabeza centrado sobre la frente (justo por encima de la línea del cabello) y completa el enrollado en la mano y dedo medio.',
        en: 'Place the head tefillin centered on the forehead (just above the hairline) and complete the wrapping on the hand and middle finger.',
        fr: 'Placez le tefillin de la tête centré sur le front et terminez l\'enroulement.',
        pt: 'Coloque o tefilin da cabeça centralizado na testa e complete o enrolamento.'
      },
      jabad: {
        es: 'Coloca el tefilín de la cabeza centrado sobre la frente y completa el enrollado en el dedo medio (una vuelta en la base, una arriba y una vez más en la base).',
        en: 'Place the head tefillin centered on the forehead and complete wrapping on the middle finger (one wrap at base, one above, one more at base).',
        fr: 'Placez le tefillin de la tête et terminez l\'enroulement sur le majeur.',
        pt: 'Coloque o tefilin da cabeça e complete o enrolamento no dedo médio.'
      },
      maguenDavid: {
        es: 'Coloca el tefilín de la cabeza centrado sobre la línea del cabello, entre los ojos, y completa el enrollado en la mano y en el dedo medio.',
        en: 'Place the head tefillin centered on the hairline, between the eyes, and complete the wrapping on the hand and middle finger.',
        fr: 'Placez le tefillin de la tête centré sur la ligne des cheveux et terminez l\'enroulement.',
        pt: 'Coloque o tefilin da cabeça centralizado na linha do cabelo e complete o enrolamento.'
      },
      monteSinai: {
        es: 'Coloca el tefilín de la cabeza centrado sobre la línea del cabello, entre los ojos, y completa el enrollado en la mano y en el dedo medio.',
        en: 'Place the head tefillin centered on the hairline, between the eyes, and complete the wrapping on the hand and middle finger.',
        fr: 'Placez le tefillin de la tête centré sur la ligne des cheveux et terminez l\'enroulement.',
        pt: 'Coloque o tefilin da cabeça centralizado na linha do cabelo e complete o enrolamento.'
      }
    },
    imagePlaceholder: '/assets/tefillin/step4.png',
    hasBlessing: true,
    blessingId: 'al-mitzvat'
  }
];