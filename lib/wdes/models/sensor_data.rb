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
      "おぼれちゃうよ"
    elsif moisture > 160
      "みずおいしい"
    elsif moisture > 140
      "さいこう"
    elsif moisture > 100
      "いいかんじ"
    elsif moisture > 60
      "いいね"
    elsif moisture > 50
      "かわいてきた"
    elsif moisture > 40
      "みずちょうだい"
    else
      "かれちゃう…"
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

  protected

  def set_measured_at
    self.measured_at = Time.now
    true
  end
end
