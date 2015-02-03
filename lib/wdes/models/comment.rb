class Comment
  include DataMapper::Resource

  property :id, Serial
  property :created_at, DateTime
  property :message, Text
  auto_upgrade!

  validates_presence_of :message

  before :create, :set_created_at

  protected

  def set_created_at
    self.created_at = Time.now
    true
  end
end
