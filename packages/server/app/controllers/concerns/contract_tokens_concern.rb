# frozen_string_literal: true

# rubocop:disable Metrics/MethodLength
module ContractTokensConcern
  def render_token
    render  json: @contract_token,
            root: false,
            status: :ok,
            only: %i[sanitized_hash address_hash label abi name symbol decimals chart_pair website whitepaper github
                     linkedin facebook reddit twitter telegram discord],
            methods: %i[price price_1h price_1h_ratio price_1d price_1d_ratio price_1w price_1w_ratio price_1m
                        price_1m_ratio price_1y price_1y_ratio]
  end

  def render_token_with_actions
    render  json: @contract_token,
            root: false,
            status: :ok,
            only: %i[sanitized_hash address_hash label abi name symbol decimals chart_pair website whitepaper github
                     linkedin facebook reddit twitter telegram discord],
            methods: %i[price price_1h price_1h_ratio price_1d price_1d_ratio price_1w price_1w_ratio price_1m
                        price_1m_ratio price_1y price_1y_ratio],
            include: {
              from_transaction_actions: {
                only: %i[index action_type holder_address_hash
                         from_address_hash from_amount to_address_hash to_amount],
                include: {
                  block_transaction: { only: %i[transaction_hash status block_number datetime] },
                  holder_address: { only: %i[address_hash address_type label] },
                  from_address: { only: %i[address_hash address_type label name symbol decimals] },
                  to_address: { only: %i[address_hash address_type label name symbol decimals] }
                }
              },
              to_transaction_actions: {
                only: %i[index action_type holder_address_hash
                         from_address_hash from_amount to_address_hash to_amount],
                include: {
                  block_transaction: { only: %i[transaction_hash status block_number datetime] },
                  holder_address: { only: %i[address_hash address_type label] },
                  from_address: { only: %i[address_hash address_type label name symbol decimals] },
                  to_address: { only: %i[address_hash address_type label name symbol decimals] }
                }
              }
            }
  end
end
# rubocop:enable Metrics/MethodLength
