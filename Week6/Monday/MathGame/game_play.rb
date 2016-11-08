require_relative "math_handler"
require_relative "players"
class Game
  attr_reader :round

  def initialize(p1, p2)
    @round = 0
    @current_player = p1
    @p1 = p1
    @p2 = p2
  end

  def current_player_tracker
    if @current_player == @p1
      @current_player = @p2
    else
      @current_player = @p1
    end
  end

  def new_round
    mathHandler = MathHandler.new
    puts "#{@current_player.name}: #{mathHandler.question}"
    print "> "
    answer = gets.chomp.to_i
    puts mathHandler.check_answer(@current_player, answer)
    # puts math_handler.response
    puts "P1:#{@p1.score} vs P2:#{@p2.score}"
    current_player_tracker
  end
end


