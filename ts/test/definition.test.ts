import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "anon_query",
    "accessor": "AnonQuery",
    "op": "load",
    "method": "GET",
    "path": "/api/ai/anon-query",
    "args": [],
    "select": {
      "media_type": "v1",
      "provider": "kie",
      "task_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "taskId",
      "provider",
      "mediaType"
    ],
    "queryArgs": [
      {
        "name": "media_type",
        "wire": "mediaType"
      },
      {
        "name": "provider",
        "wire": "provider"
      },
      {
        "name": "task_id",
        "wire": "taskId"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "code": 0,
      "message": "ok",
      "data": {
        "status": "success",
        "images": [
          "x"
        ],
        "watermarked": [
          true
        ],
        "videos": [
          "x"
        ]
      }
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
