# Kavel SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

KavelUtility.registrar = ->(u) {
  u.clean = KavelUtilities::Clean
  u.clean_add = KavelUtilities::CleanAdd
  u.clean_explain = KavelUtilities::CleanExplain
  u.done = KavelUtilities::Done
  u.make_error = KavelUtilities::MakeError
  u.feature_add = KavelUtilities::FeatureAdd
  u.feature_hook = KavelUtilities::FeatureHook
  u.feature_init = KavelUtilities::FeatureInit
  u.fetcher = KavelUtilities::Fetcher
  u.make_fetch_def = KavelUtilities::MakeFetchDef
  u.make_context = KavelUtilities::MakeContext
  u.make_options = KavelUtilities::MakeOptions
  u.make_request = KavelUtilities::MakeRequest
  u.make_response = KavelUtilities::MakeResponse
  u.make_result = KavelUtilities::MakeResult
  u.make_point = KavelUtilities::MakePoint
  u.make_spec = KavelUtilities::MakeSpec
  u.make_url = KavelUtilities::MakeUrl
  u.param = KavelUtilities::Param
  u.prepare_auth = KavelUtilities::PrepareAuth
  u.prepare_body = KavelUtilities::PrepareBody
  u.prepare_headers = KavelUtilities::PrepareHeaders
  u.prepare_method = KavelUtilities::PrepareMethod
  u.prepare_params = KavelUtilities::PrepareParams
  u.prepare_path = KavelUtilities::PreparePath
  u.prepare_query = KavelUtilities::PrepareQuery
  u.graphql_body = KavelUtilities::GraphqlBody
  u.graphql_errors = KavelUtilities::GraphqlErrors
  u.result_basic = KavelUtilities::ResultBasic
  u.result_body = KavelUtilities::ResultBody
  u.result_headers = KavelUtilities::ResultHeaders
  u.transform_request = KavelUtilities::TransformRequest
  u.transform_response = KavelUtilities::TransformResponse
}
