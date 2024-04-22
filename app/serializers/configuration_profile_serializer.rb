# frozen_string_literal: true

class ConfigurationProfileSerializer < ApplicationSerializer
  attributes :administrator_id, :description, :domain_set_id, :json_abstract_classes, :json_mapping_predicates,
             :predicate_set_id, :predicate_strongest_match, :slug, :state, :structure
  attribute :standards_organizations, if: -> { params[:with_organizations] }
  attribute :with_shared_mappings, if: -> { params[:with_shared_mappings] } do
    params[:shared_mappings] || (object.active? && object.mappings.mapped.exists?)
  end

  def standards_organizations
    ActiveModel::Serializer::CollectionSerializer.new(
      object.standards_organizations.includes(:users), each_serializer: OrganizationSerializer,
                                                       with_users: true, configuration_profile: object
    )
  end
end
