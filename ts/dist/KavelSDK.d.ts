import { AnonQueryEntity } from './entity/AnonQueryEntity';
export type * from './KavelTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { KavelEntityBase } from './KavelEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class KavelSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    AnonQuery(entopts?: Record<string, any>): AnonQueryEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): KavelSDK;
    tester(testopts?: any, sdkopts?: any): KavelSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof KavelSDK;
export { stdutil, config, BaseFeature, KavelEntityBase, KavelSDK, SDK, };
export type { DirectResult };
