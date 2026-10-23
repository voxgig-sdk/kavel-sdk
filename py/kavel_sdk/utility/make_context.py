# Kavel SDK utility: make_context

from kavel_sdk.core.context import KavelContext


def make_context_util(ctxmap, basectx):
    return KavelContext(ctxmap, basectx)
