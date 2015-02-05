#coding: utf-8

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

  # 照度
  def illum
    255 - illuminance
  end

  # 水分の状態
  def moist_condition
    if moisture > 170
      "おぼれるぅ"
    elsif moisture > 160
      "みずおいしい"
    elsif moisture > 140
      "さいこう"
    elsif moisture > 120
      "いいかんじ"
    elsif moisture > 90
      "いいね"
    elsif moisture > 70
      "かわいてる"
    elsif moisture > 50
      "みずほしい"
    else
      "かれちゃう…"
    end
  end

  def moist_class
    if moisture > 100
      "good"
    elsif moisture > 80
      "soso"
    elsif moisture > 50
      "notice"
    else
      "attention"
    end
  end

  # 照度
  def illum_condition
    if illum > 170
      "さいこうだ"
    elsif illum > 140
      "いいてんきだ"
    elsif illum > 60
      "あかるい"
    elsif illum > 40
      "ふぁー"
    elsif illum > 20
      "うすぐらい"
    else
      "まっくら"
    end
  end

  def illum_class
    if illum > 60
      "good"
    elsif illum > 40
      "soso"
    elsif illum > 20
      "notice"
    else
      "attention"
    end
  end


  protected

  def set_measured_at
    self.measured_at = Time.now
    true
  end
end
