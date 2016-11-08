require_relative "game_play"
require_relative "players"

p1 = Player.new("Player 1")
p2 = Player.new("Player 2")
game = Game.new(p1, p2)

while p1.score > 0 && p2.score > 0
  puts "--- NEW TURN ---"
  game.new_round

end

puts "GAME OVER, BITCHES"