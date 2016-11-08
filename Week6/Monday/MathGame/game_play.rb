require_relative "math_handler"
require_relative "players"
class Game

  def initialize(p1, p2)
    @current_player = p1
    @p1 = p1
    @p2 = p2
    @winner = nil
  end

  def current_player_tracker
    if @current_player == @p1
      @current_player = @p2
    else
      @current_player = @p1
    end
  end

  def winner
    @winner = @p1.score == 0 ? @p2 : @p1
    puts "#{@winner.name} wins with a score of #{@winner.score}/3"
  end

  def new_round
    mathHandler = MathHandler.new
    puts "#{@current_player.name}: #{mathHandler.question}"
    print "> "
    answer = gets.chomp.to_i
    puts mathHandler.check_answer(@current_player, answer)
    # puts math_handler.response
    puts "P1: #{@p1.score}/3 vs P2: #{@p2.score}/3"
    current_player_tracker
  end
end


