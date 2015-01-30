class SensorData
  include DataMapper::Resource

  property :id, Serial
  property :measured_at, DateTime
  property :moisture, Integer
  property :temperature, Integer
  property :humidity, Integer
  property :illuminance, Integer
  auto_upgrade!

  before :create, :set_measured_at

  protected

  def set_measured_at
    self.measured_at = Time.now
    true
  end
end
