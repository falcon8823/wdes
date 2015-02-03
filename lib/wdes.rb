require 'rubygems'
require 'bundler'
Bundler.require

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

#require 'mongoid'
require 'active_support/all'

#require 'dm-core'
#require 'dm-migrations'
require 'data_mapper'
DataMapper.setup(:default, "sqlite3://#{Dir.pwd}/db/db.sqlite3")
#Redis.current = Redis.new(:host => '127.0.0.1', :port => 6379)
#Mongoid.load!(File.join(File.expand_path('../..', __FILE__), 'config/mongoid.yml'), WDES.env)

require 'wdes/models/sensor_data'
require 'wdes/models/comment'

DataMapper.finalize