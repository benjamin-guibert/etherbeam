# frozen_string_literal: true

module HashHelper
  def sanitize_hash(hash)
    return hash unless hash && hash.length > 4

    hash.slice(0, 2) + hash.slice(2..-1).downcase
  end
end
