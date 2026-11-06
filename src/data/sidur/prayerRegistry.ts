// @ts-nocheck
import * as sefaradiShajarit from './sefaradiShajarit';
import * as ashkenaziShajarit from './ashkenaziShajarit';
import * as chabadShajarit from './chabadShajarit';

import * as sefaradiMinja from './sefaradiMinja';
import * as ashkenaziMinja from './ashkenaziMinja';
import * as chabadMinja from './chabadMinja';

import * as sefaradiArbit from './sefaradiArbit';
import * as ashkenaziArbit from './ashkenaziArbit';
import * as chabadArbit from './chabadArbit';

export const prayerRegistry: Record<string, any> = {
  sefaradi: {
    shajarit: sefaradiShajarit.sefaradiShajarit || sefaradiShajarit.default || sefaradiShajarit,
    minja: sefaradiMinja.sefaradiMinja || sefaradiMinja.default || sefaradiMinja,
    arbit: sefaradiArbit.sefaradiArbit || sefaradiArbit.default || sefaradiArbit,
  },
  ashkenazi: {
    shajarit: ashkenaziShajarit.ashkenaziShajarit || ashkenaziShajarit.default || ashkenaziShajarit,
    minja: ashkenaziMinja.ashkenaziMinja || ashkenaziMinja.default || ashkenaziMinja,
    arbit: ashkenaziArbit.ashkenaziArbit || ashkenaziArbit.default || ashkenaziArbit,
  },
  chabad: {
    shajarit: chabadShajarit.chabadShajarit || chabadShajarit.default || chabadShajarit,
    minja: chabadMinja.chabadMinja || chabadMinja.default || chabadMinja,
    arbit: chabadArbit.chabadArbit || chabadArbit.default || chabadArbit,
  },
};