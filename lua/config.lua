-- Kavel SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Kavel",
      slug = "kavel",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["now"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://www.kavel.ai",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["anon_query"] = {},
      },
    },
    entity = {
      ["anon_query"] = {
        ["fields"] = {
          {
            ["name"] = "images",
            ["title"] = "Images",
            ["type"] = "`$ARRAY`",
            ["short"] = "Result image URLs, present once the task has succeeded.",
          },
          {
            ["name"] = "status",
            ["title"] = "Status",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "pending, processing, success or failed.",
          },
          {
            ["name"] = "videos",
            ["title"] = "Videos",
            ["type"] = "`$ARRAY`",
            ["short"] = "Result video URLs (always empty on the anonymous tier, which cannot run video).",
          },
          {
            ["name"] = "watermarked",
            ["title"] = "Watermarked",
            ["type"] = "`$ARRAY`",
            ["short"] = "One flag per image; anonymous output is watermarked.",
          },
        },
        ["name"] = "anon_query",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/ai/anon-query",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "ai",
                  },
                  {
                    ["lit"] = "anon-query",
                  },
                },
                ["parts"] = {
                  "api",
                  "ai",
                  "anon-query",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "media_type",
                      ["orig"] = "mediaType",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "image",
                    },
                    {
                      ["name"] = "provider",
                      ["orig"] = "provider",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "kie",
                    },
                    {
                      ["name"] = "task_id",
                      ["orig"] = "taskId",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "2a04f52a-0da3-4629-8a3f-ecc5a507f34f",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "media_type",
                    "provider",
                    "task_id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
