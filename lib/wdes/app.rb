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
    get '/css/:name.css' do
      sass :"sass/#{params[:name]}"
    end


    before do
      last = SensorData.all(order: [:measured_at.desc], limit: 1).first
      @last_update = last.measured_at.strftime('%Y年%m月%d日 %H:%M:%S')
    end

    get '/' do
      @list = SensorData.all(order: [:measured_at.desc], limit: 7)
      @current = @list.first

      slim :home, layout: :layout
    end

    get '/today' do
      @list = SensorData.all(
        :measured_at.gt => 1.days.ago,
        order: [:measured_at.desc]
      )
      @list.select! { |r| r.measured_at.min == 0 }

      slim :today, layout: :layout
    end

    get '/yesterday' do
      @list = SensorData.all(
        :measured_at.gt => 2.days.ago.beginning_of_day,
        :measured_at.lt => 2.days.ago.end_of_day,
        order: [:measured_at.desc]
      )
      @list.select! { |r| r.measured_at.min == 0 }

      slim :yesterday, layout: :layout
    end

    get '/week' do
      @list = SensorData.all(
        :measured_at.gt => 4.days.ago.beginning_of_day,
        order: [:measured_at.desc]
      )
      @list.select! { |r| r.measured_at.hour % 4 == 0 && r.measured_at.min == 0 }

      slim :week, layout: :layout
    end

    get '/comments' do
      slim :comments, layout: :layout
    end

    post '/sensor' do
      #p SensorData.new(params[:sensor_data])
      #SensorData.create(params[:sensor_data])
      SensorData.create!(params[:sensor_data])
      'Success!'
    end
  end
end
