

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { KavelSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('AnonQueryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when KAVEL_TEST_LIVE=TRUE.
  afterEach(liveDelay('KAVEL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = KavelSDK.test()
    const ent = testsdk.AnonQuery()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = KavelSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AnonQuery().load({"media_type":1,"provider":"x","task_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.KAVEL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'anon_query.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"images":{"a":true,"h":"Images","n":"images","r":false,"sh":"Result image URLs, present once the task has succeeded.","t":"`$ARRAY`","key$":"images","index$":0},"status":{"a":true,"h":"Status","n":"status","r":true,"sh":"pending, processing, success or failed.","t":"`$STRING`","key$":"status","index$":1},"videos":{"a":true,"h":"Videos","n":"videos","r":false,"sh":"Result video URLs (always empty on the anonymous tier, which cannot run video).","t":"`$ARRAY`","key$":"videos","index$":2},"watermarked":{"a":true,"h":"Watermarked","n":"watermarked","r":false,"sh":"One flag per image; anonymous output is watermarked.","t":"`$ARRAY`","key$":"watermarked","index$":3}},"name":"anon_query","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/ai/anon-query","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"image","k":"query","n":"media_type","or":"mediaType","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"kie","k":"query","n":"provider","or":"provider","r":true,"t":"`$STRING`","index$":1},{"a":true,"ex":"2a04f52a-0da3-4629-8a3f-ecc5a507f34f","k":"query","n":"task_id","or":"taskId","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/ai/anon-query","q":{"exist":["media_type","provider","task_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"ai"},{"lit":"anon-query"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"anon_query","name__orig":"anon_query","Name":"AnonQuery","name_":"anon_query","name-":"anon-query","NAME":"ANON_QUERY","index$":0}, {"active":true,"entity":"anon_query","key$":"BasicAnonQueryFlow","kind":"basic","name":"BasicAnonQueryFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"anon_query_ref01","srcdatavar":"anon_query_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-anon_query_ref01"}}],"index$":0}]}, 'AnonQuery', {"GET /api/ai/anon-query":{"protocol":"http","parameters":[{"name":"taskId","in":"query","required":true,"description":"Task id returned when the job was submitted.","schema":{"type":"string"},"example":"2a04f52a-0da3-4629-8a3f-ecc5a507f34f","index$":0},{"name":"provider","in":"query","required":true,"description":"Generation provider; `kie` for every documented model.","schema":{"type":"string","default":"kie"},"example":"kie","index$":1},{"name":"mediaType","in":"query","required":true,"description":"Media type of the task; `image` on the anonymous tier.","schema":{"type":"string","default":"image"},"example":"image","index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let anon_query_ref01_data = Object.values(setup.data.existing.anon_query)[0] as any

    // LOAD
    const anon_query_ref01_ent = client.AnonQuery()
    const anon_query_ref01_match_dt0: any = {}
    const anon_query_ref01_data_dt0 = (await anon_query_ref01_ent.load(anon_query_ref01_match_dt0)).data()
    assert(null != anon_query_ref01_data_dt0)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/anon_query/AnonQueryTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = KavelSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['anon_query01','anon_query02','anon_query03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'KAVEL_TEST_ANON_QUERY_ENTID': idmap,
    'KAVEL_TEST_LIVE': 'FALSE',
    'KAVEL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['KAVEL_TEST_ANON_QUERY_ENTID']

  const live = 'TRUE' === env.KAVEL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['KAVEL_TEST_ANON_QUERY_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new KavelSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
