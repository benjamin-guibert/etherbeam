# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable, :lockable, :trackable

  include DeviseTokenAuth::Concerns::User

  # Enums

  enum user_type: {
    user: 0,
    administrator: 1,
    system: 2
  }

  # Validations

  validates :user_type, inclusion: { in: user_types.keys }
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :name, presence: true

  # Callbacks

  before_validation :set_provider
  before_validation :set_uid

  # Methods

  def set_provider
    self[:provider] = 'email' if self[:provider].blank?
  end

  def set_uid
    self[:uid] = self[:email] if self[:uid].blank? && self[:email].present?
  end
end
