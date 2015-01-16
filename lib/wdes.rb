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

require 'mongoid'
require 'active_support'

Mongoid.load!(File.join(File.expand_path('../..', __FILE__), 'config/mongoid.yml'), WDES.env)

require 'wdes/models/sensor_data'
