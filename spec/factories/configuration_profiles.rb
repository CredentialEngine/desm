# frozen_string_literal: true

# == Schema Information
#
# Table name: configuration_profiles
#
#  id                        :bigint           not null, primary key
#  description               :text
#  json_abstract_classes     :jsonb
#  json_mapping_predicates   :jsonb
#  name                      :string
#  predicate_strongest_match :string
#  slug                      :string
#  state                     :integer          default("incomplete"), not null
#  structure                 :jsonb
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#  administrator_id          :bigint
#  domain_set_id             :bigint
#  predicate_set_id          :bigint
#
# Indexes
#
#  index_configuration_profiles_on_administrator_id  (administrator_id)
#  index_configuration_profiles_on_domain_set_id     (domain_set_id)
#  index_configuration_profiles_on_predicate_set_id  (predicate_set_id)
#
# Foreign Keys
#
#  fk_rails_...  (administrator_id => users.id) ON DELETE => nullify
#  fk_rails_...  (domain_set_id => domain_sets.id)
#  fk_rails_...  (predicate_set_id => predicate_sets.id)
#
require "faker"

FactoryBot.define do
  factory :configuration_profile do
    name { Faker::Name.unique.first_name }
    description { Faker::Lorem.sentence }
    json_abstract_classes { json_fixture("desmAbstractClasses.json") }
    json_mapping_predicates { json_fixture("desmMappingPredicates.json") }

    trait :basic do
      json_abstract_classes { {} }
      json_mapping_predicates { {} }
    end
  end
end
