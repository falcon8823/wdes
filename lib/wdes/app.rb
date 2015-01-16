require 'wdes'

require 'sinatra/base'
require 'sinatra/reloader'
require 'sinatra/flash'
require 'sinatra/cross_origin'
require 'sinatra/param'

module WDES
  class App < Sinatra::Base
    helpers Sinatra::Param

    configure :development do
      Moped.logger = Logger.new($stdout)
      register Sinatra::Reloader
    end

    configure do
      set :root, File.expand_path('../../..', __FILE__)
      set public_folder: Proc.new { File.join(root, 'public') }
      set views: Proc.new { File.join(root, 'lib/wdes/views') }
      set :erb, layout: :layout
      set :method_override, true
      set :sessions, true
    end

    get '/' do
      erb :home, layout: :layout
    end
  end
end
