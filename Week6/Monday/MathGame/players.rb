class Player
  attr_reader :score, :name

  def initialize(name)
    @score = 3
    @name = name
  end

  def wrong_answer
    @score -= 1
  end
end