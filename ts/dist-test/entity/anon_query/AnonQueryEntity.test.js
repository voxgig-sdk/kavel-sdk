"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('AnonQueryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when KAVEL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('KAVEL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.KavelSDK.test();
        const ent = testsdk.AnonQuery();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.KavelSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AnonQuery().load({ "media_type": 1, "provider": "x", "task_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.KAVEL_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'anon_query.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "images": { "a": true, "h": "Images", "n": "images", "r": false, "sh": "Result image URLs, present once the task has succeeded.", "t": "`$ARRAY`", "key$": "images", "index$": 0 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "sh": "pending, processing, success or failed.", "t": "`$STRING`", "key$": "status", "index$": 1 }, "videos": { "a": true, "h": "Videos", "n": "videos", "r": false, "sh": "Result video URLs (always empty on the anonymous tier, which cannot run video).", "t": "`$ARRAY`", "key$": "videos", "index$": 2 }, "watermarked": { "a": true, "h": "Watermarked", "n": "watermarked", "r": false, "sh": "One flag per image; anonymous output is watermarked.", "t": "`$ARRAY`", "key$": "watermarked", "index$": 3 } }, "name": "anon_query", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/ai/anon-query", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "image", "k": "query", "n": "media_type", "or": "mediaType", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "kie", "k": "query", "n": "provider", "or": "provider", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "2a04f52a-0da3-4629-8a3f-ecc5a507f34f", "k": "query", "n": "task_id", "or": "taskId", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/ai/anon-query", "q": { "exist": ["media_type", "provider", "task_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "ai" }, { "lit": "anon-query" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "anon_query", "name__orig": "anon_query", "Name": "AnonQuery", "name_": "anon_query", "name-": "anon-query", "NAME": "ANON_QUERY", "index$": 0 }, { "active": true, "entity": "anon_query", "key$": "BasicAnonQueryFlow", "kind": "basic", "name": "BasicAnonQueryFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "anon_query_ref01", "srcdatavar": "anon_query_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-anon_query_ref01" } }], "index$": 0 }] }, 'AnonQuery', { "GET /api/ai/anon-query": { "protocol": "http", "parameters": [{ "name": "taskId", "in": "query", "required": true, "description": "Task id returned when the job was submitted.", "schema": { "type": "string" }, "example": "2a04f52a-0da3-4629-8a3f-ecc5a507f34f", "index$": 0 }, { "name": "provider", "in": "query", "required": true, "description": "Generation provider; `kie` for every documented model.", "schema": { "type": "string", "default": "kie" }, "example": "kie", "index$": 1 }, { "name": "mediaType", "in": "query", "required": true, "description": "Media type of the task; `image` on the anonymous tier.", "schema": { "type": "string", "default": "image" }, "example": "image", "index$": 2 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let anon_query_ref01_data = Object.values(setup.data.existing.anon_query)[0];
        // LOAD
        const anon_query_ref01_ent = client.AnonQuery();
        const anon_query_ref01_match_dt0 = {};
        const anon_query_ref01_data_dt0 = (await anon_query_ref01_ent.load(anon_query_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != anon_query_ref01_data_dt0);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/anon_query/AnonQueryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.KavelSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['anon_query01', 'anon_query02', 'anon_query03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'KAVEL_TEST_ANON_QUERY_ENTID': idmap,
        'KAVEL_TEST_LIVE': 'FALSE',
        'KAVEL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['KAVEL_TEST_ANON_QUERY_ENTID'];
    const live = 'TRUE' === env.KAVEL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['KAVEL_TEST_ANON_QUERY_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.KavelSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.KAVEL_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=AnonQueryEntity.test.js.map