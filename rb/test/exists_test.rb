# Kavel SDK exists test

require "minitest/autorun"
require_relative "../Kavel_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = KavelSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
