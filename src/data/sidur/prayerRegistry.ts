import { sefaradiShajarit } from './sefaradiShajarit';
import { ashkenaziShajarit } from './ashkenaziShajarit';
import { chabadShajarit } from './chabadShajarit';

import { sefaradiMinja } from './sefaradiMinja';
import { ashkenaziMinja } from './ashkenaziMinja';
import { chabadMinja } from './chabadMinja';

import { sefaradiArbit } from './sefaradiArbit';
import { ashkenaziArbit } from './ashkenaziArbit';
import { chabadArbit } from './chabadArbit';

export const prayerRegistry = {
  sefaradi: {
    shajarit: sefaradiShajarit,
    minja: sefaradiMinja,
    arbit: sefaradiArbit,
  },
  ashkenazi: {
    shajarit: ashkenaziShajarit,
    minja: ashkenaziMinja,
    arbit: ashkenaziArbit,
  },
  chabad: {
    shajarit: chabadShajarit,
    minja: chabadMinja,
    arbit: chabadArbit,
  },
};