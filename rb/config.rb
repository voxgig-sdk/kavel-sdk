# Kavel SDK configuration

module KavelConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Kavel",
        "slug" => "kavel",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "now" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://www.kavel.ai",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "anon_query" => {},
        },
      },
      "entity" => {
        "anon_query" => {
          "fields" => [
            {
              "name" => "images",
              "title" => "Images",
              "type" => "`$ARRAY`",
              "short" => "Result image URLs, present once the task has succeeded.",
            },
            {
              "name" => "status",
              "title" => "Status",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "pending, processing, success or failed.",
            },
            {
              "name" => "videos",
              "title" => "Videos",
              "type" => "`$ARRAY`",
              "short" => "Result video URLs (always empty on the anonymous tier, which cannot run video).",
            },
            {
              "name" => "watermarked",
              "title" => "Watermarked",
              "type" => "`$ARRAY`",
              "short" => "One flag per image; anonymous output is watermarked.",
            },
          ],
          "name" => "anon_query",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/ai/anon-query",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "ai",
                    },
                    {
                      "lit" => "anon-query",
                    },
                  ],
                  "parts" => [
                    "api",
                    "ai",
                    "anon-query",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "media_type",
                        "orig" => "mediaType",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => "image",
                      },
                      {
                        "name" => "provider",
                        "orig" => "provider",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => "kie",
                      },
                      {
                        "name" => "task_id",
                        "orig" => "taskId",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => "2a04f52a-0da3-4629-8a3f-ecc5a507f34f",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "media_type",
                      "provider",
                      "task_id",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    KavelFeatures.make_feature(name)
  end
end
