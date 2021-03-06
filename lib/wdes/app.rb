#coding: utf-8
require 'wdes'

require 'sinatra/base'
require 'sinatra/reloader'
require 'sinatra/flash'
require 'sinatra/cross_origin'
require 'sinatra/param'
require 'slim'
require 'compass'

module WDES
  class App < Sinatra::Base
    helpers Sinatra::Param

    configure :development do
      DataMapper::Logger.new($stdout, :debug)
      register Sinatra::Reloader
    end

    configure do
      set :root, File.expand_path('../../..', __FILE__)
      set public_folder: Proc.new { File.join(root, 'public') }
      set views: Proc.new { File.join(root, 'lib/wdes/views') }
      set :slim, layout: :layout
      set :method_override, true
      set :sessions, true

      Compass.configuration do |config|
        config.project_path = root
        config.sass_dir = File.join(root, 'public', 'sass')
      end
      set :sass, Compass.sass_engine_options
      set :scss, Compass.sass_engine_options
    end

    # sass
=begin
    get '/css/:name.css' do
      sass :"sass/#{params[:name]}"
    end
=end


    before do
      last = SensorData.all(order: [:measured_at.desc], limit: 1).first
      @last_update = last.measured_at.strftime('%Y年%m月%d日 %H:%M:%S') if last
    end

    get '/' do
      @list = SensorData.all(
        :measured_at.gt => 12.hour.ago,
        order: [:measured_at.desc]
      )
      @current = @list.first
      @comment = Comment.last

      slim :home
    end

    get '/today' do
      @list = SensorData.all(
        :measured_at.gt => 1.days.ago,
        order: [:measured_at.desc]
      )
      @list.select! { |r| r.measured_at.min == 0 }

      slim :today
    end

    get '/yesterday' do
      @list = SensorData.all(
        :measured_at.gt => 1.days.ago.beginning_of_day,
        :measured_at.lt => 1.days.ago.end_of_day,
        order: [:measured_at.desc]
      )
      @list.select! { |r| r.measured_at.min == 0 }

      slim :yesterday
    end

    get '/week' do
      @list = SensorData.all(
        :measured_at.gt => 6.days.ago.beginning_of_day,
        order: [:measured_at.desc]
      )
      @list.select! { |r| r.measured_at.hour % 4 == 0 && r.measured_at.min == 0 }

      slim :week
    end

    get '/comments' do
      @comments = Comment.all(order: [:created_at.desc], limit: 30)

      slim :comments
    end

    post '/comments' do
      if Comment.create(message: params[:message])
        redirect '/comments'
      else
        @comments = Comment.all(order: [:created_at.desc], limit: 30)
        slim :comments
      end
    end

    post '/sensor' do
      SensorData.create!(params[:sensor_data])
      'Success!'
    end
  end
end
