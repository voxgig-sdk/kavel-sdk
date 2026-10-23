-- Kavel SDK exists test

local sdk = require("kavel_sdk")

describe("KavelSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
