import { KavelEntityBase } from '../KavelEntityBase';
import type { KavelSDK } from '../KavelSDK';
import type { Control } from '../types';
import type { AnonQuery, AnonQueryLoadMatch } from '../KavelTypes';
declare class AnonQueryEntity extends KavelEntityBase<AnonQuery> {
    constructor(client: KavelSDK, entopts: any);
    make(this: AnonQueryEntity): AnonQueryEntity;
    load(this: any, reqmatch?: AnonQueryLoadMatch, ctrl?: Control): Promise<AnonQueryEntity>;
}
export { AnonQueryEntity };
