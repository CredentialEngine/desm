# frozen_string_literal: true

require "faker"

# Factory for the Organization class
FactoryBot.define do
  factory :organization do
    id { (Organization.maximum(:id) || 0) + 1 }
    name { Faker::Company.name }
    email { Faker::Internet.email }
  end
end
