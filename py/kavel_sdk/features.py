# Kavel SDK feature factory

from kavel_sdk.feature.base_feature import KavelBaseFeature
from kavel_sdk.feature.ratelimit_feature import KavelRatelimitFeature
from kavel_sdk.feature.retry_feature import KavelRetryFeature
from kavel_sdk.feature.test_feature import KavelTestFeature
from kavel_sdk.feature.timeout_feature import KavelTimeoutFeature


_FEATURES = {
    "base": lambda: KavelBaseFeature(),
    "ratelimit": lambda: KavelRatelimitFeature(),
    "retry": lambda: KavelRetryFeature(),
    "test": lambda: KavelTestFeature(),
    "timeout": lambda: KavelTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
