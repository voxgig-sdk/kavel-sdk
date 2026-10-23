
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { KavelSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = KavelSDK.test()
    equal(testsdk instanceof KavelSDK, true,
      'KavelSDK.test() must return a client synchronously')
  })

})
