# frozen_string_literal: true

class ContractToken < Contract
  WETH_HASH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'

  # Associations

  has_many  :prices,
            -> { order(datetime: :desc) },
            class_name: 'ContractTokenPrice',
            inverse_of: :contract_token,
            dependent: :destroy

  # Validations

  validates :name, presence: true
  validates :symbol, presence: true
  validates :decimals, presence: true, numericality: { greater_than_or_equal_to: 0 }

  # Scopes

  default_scope { where(address_type: :token) }

  scope :with_prices, -> { includes :prices }
  scope :with_actions, lambda {
    includes(
      { from_transaction_actions: %i[block_transaction holder_address from_address to_address] },
      { to_transaction_actions: %i[block_transaction holder_address from_address to_address] }
    )
  }

  # Callbacks

  before_validation :set_type

  # Methods

  def price
    prices.first&.price
  end

  def price_1h
    prices.before_datetime(1.hour.ago)&.first&.price
  end

  def price_1h_ratio
    price_ratio price_1h
  end

  def price_1d
    prices.before_datetime(1.day.ago)&.first&.price
  end

  def price_1d_ratio
    price_ratio price_1d
  end

  def price_1w
    prices.before_datetime(1.week.ago)&.first&.price
  end

  def price_1w_ratio
    price_ratio price_1w
  end

  def price_1m
    prices.before_datetime(1.month.ago)&.first&.price
  end

  def price_1m_ratio
    price_ratio price_1m
  end

  def price_1y
    prices.before_datetime(1.year.ago)&.first&.price
  end

  def price_1y_ratio
    price_ratio price_1y
  end

  def price_ratio(old_price)
    return nil unless old_price

    (price / old_price).to_f
  end

  private

  def set_type
    self.address_type = :token
  end
end
