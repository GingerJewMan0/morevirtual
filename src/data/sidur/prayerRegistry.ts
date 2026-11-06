import { sefaradiShajarit } from './sefaradiShajarit';
import { sefaradiMinja } from './sefaradiMinja';
import { sefaradiArbit } from './sefaradiArbit';
import { ashkenaziShajarit } from './ashkenaziShajarit';
import { ashkenaziMinja } from './ashkenaziMinja';
import { ashkenaziArbit } from './ashkenaziArbit';
import { chabadShajarit } from './chabadShajarit';
import { chabadMinja } from './chabadMinja';
import { chabadArbit } from './chabadArbit';
import type { TefilahItem } from '../../types';

export type SupportedNusach = 'sefaradi' | 'ashkenazi' | 'chabad';
export type SupportedPrayerTime = 'shajarit' | 'minja' | 'arbit';

export const prayerRegistry: Record<SupportedNusach, Record<SupportedPrayerTime, TefilahItem[]>> = {
  sefaradi: { shajarit: sefaradiShajarit, minja: sefaradiMinja, arbit: sefaradiArbit },
  ashkenazi: { shajarit: ashkenaziShajarit, minja: ashkenaziMinja, arbit: ashkenaziArbit },
  chabad: { shajarit: chabadShajarit, minja: chabadMinja, arbit: chabadArbit },
};
