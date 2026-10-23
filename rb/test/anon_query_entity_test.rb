# AnonQuery entity test

require "minitest/autorun"
require "json"
require_relative "../Kavel_sdk"
require_relative "runner"

class AnonQueryEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = KavelSDK.test(nil, nil)
    ent = testsdk.AnonQuery(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = KavelConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = KavelSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.AnonQuery(nil).load({ "media_type" => 1, "provider" => "x", "task_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = anon_query_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "anon_query." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    anon_query_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.anon_query")))
    anon_query_ref01_data = nil
    if anon_query_ref01_data_raw.length > 0
      anon_query_ref01_data = Helpers.to_map(anon_query_ref01_data_raw[0][1])
    end

    # LOAD
    anon_query_ref01_ent = client.AnonQuery(nil)
    anon_query_ref01_match_dt0 = {}
    anon_query_ref01_data_dt0_loaded = anon_query_ref01_ent.load(anon_query_ref01_match_dt0, nil)
    assert !anon_query_ref01_data_dt0_loaded.nil?

  end
end

def anon_query_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "anon_query", "AnonQueryTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = KavelSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["anon_query01", "anon_query02", "anon_query03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["KAVEL_TEST_ANON_QUERY_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "KAVEL_TEST_ANON_QUERY_ENTID" => idmap,
    "KAVEL_TEST_LIVE" => "FALSE",
    "KAVEL_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["KAVEL_TEST_ANON_QUERY_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["KAVEL_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = KavelSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["KAVEL_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["KAVEL_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
