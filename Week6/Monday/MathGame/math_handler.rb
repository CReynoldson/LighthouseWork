require_relative "players"

class MathHandler

    def initialize
      @a = 0
      @b = 0
    end

    def question
      random
      "What does #{@a} + #{@b} equal?"
    end

    def check_answer(current_player, player_answer)
      if player_answer == @a + @b
        response("right")
      else
        current_player.wrong_answer
        response("wrong")
      end
    end

    def response(response_type)
      if response_type == "right"
        "Good job! You don't suck at math!"
      else
        "Are you serious right now? Really? Actually? Shame."
      end
    end

    private
      def random
        @a = 1 + rand(20)
        @b = 1 + rand(20)
      end
end

