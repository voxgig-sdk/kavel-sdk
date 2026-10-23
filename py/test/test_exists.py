# Kavel SDK exists test

import pytest
from kavel_sdk import KavelSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = KavelSDK.test(None, None)
        assert testsdk is not None
