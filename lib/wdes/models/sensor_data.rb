class SensorData
  include Mongoid::Document

  field :measured_at, type: DateTime
  field :moisture, type: Integer
  field :temperature, type: Integer
  field :humidity, type: Integer
  field :illuminance, type: Integer

  before_create :set_measured_at

  protected

  def set_measured_at
    self.measured_at = Time.now
    true
  end
end
