# Kavel SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module KavelFeatures
  def self.make_feature(name)
    case name
    when "base"
      KavelBaseFeature.new
    when "ratelimit"
      KavelRatelimitFeature.new
    when "retry"
      KavelRetryFeature.new
    when "test"
      KavelTestFeature.new
    when "timeout"
      KavelTimeoutFeature.new
    else
      KavelBaseFeature.new
    end
  end
end
