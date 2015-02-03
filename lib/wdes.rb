require 'rubygems'
require 'bundler'
Bundler.require

require 'active_support/all'
require 'data_mapper'

module WDES
  class << self
    ##
    # 実行されているEnvironment
    #
    # @return [String] 'development', 'test' or 'production'
    def env
      if ENV['RACK_ENV'] == 'production'
        'production'
      elsif ENV['RACK_ENV'] == 'test'
        'test'
      else
        'development'
      end
    end

    %w(development test production).each do |name|
      define_method "#{name}?" do
        env == name
      end
    end
  end
end

DataMapper.setup(:default, "sqlite3://#{Dir.pwd}/db/db.sqlite3")

require 'wdes/models/sensor_data'
require 'wdes/models/comment'

DataMapper.finalize
