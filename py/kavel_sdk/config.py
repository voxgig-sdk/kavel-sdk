# Kavel SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Kavel",
            "slug": "kavel",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://www.kavel.ai",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "anon_query": {},
            },
        },
        "entity": {
      "anon_query": {
        "fields": [
          {
            "name": "images",
            "title": "Images",
            "type": "`$ARRAY`",
            "short": "Result image URLs, present once the task has succeeded.",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
            "short": "pending, processing, success or failed.",
          },
          {
            "name": "videos",
            "title": "Videos",
            "type": "`$ARRAY`",
            "short": "Result video URLs (always empty on the anonymous tier, which cannot run video).",
          },
          {
            "name": "watermarked",
            "title": "Watermarked",
            "type": "`$ARRAY`",
            "short": "One flag per image; anonymous output is watermarked.",
          },
        ],
        "name": "anon_query",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/ai/anon-query",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "ai",
                  },
                  {
                    "lit": "anon-query",
                  },
                ],
                "parts": [
                  "api",
                  "ai",
                  "anon-query",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "media_type",
                      "orig": "mediaType",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "image",
                    },
                    {
                      "name": "provider",
                      "orig": "provider",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "kie",
                    },
                    {
                      "name": "task_id",
                      "orig": "taskId",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "2a04f52a-0da3-4629-8a3f-ecc5a507f34f",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "media_type",
                    "provider",
                    "task_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
