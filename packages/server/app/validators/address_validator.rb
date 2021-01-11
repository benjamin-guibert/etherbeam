# frozen_string_literal: true

class AddressValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    return unless value

    if value !~ /^0x\h+$/
      error_message = 'is not hexadecimal'
    elsif value.length - 2 != 40
      error_message = 'length is not valid'
    end

    return record.errors.add attribute, (options[:message] || error_message) if error_message
  end
end
