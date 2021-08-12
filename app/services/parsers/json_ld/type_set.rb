# frozen_string_literal: true

module Parsers
  module JsonLd
    ###
    # @description: Represents all the types for the node being processed
    ###
    class TypeSet
      include NodeTypes
      attr_accessor :types_list

      ###
      # @description: Initializes the TypeSet instance with an array of types
      # @param [Array] types
      ###
      def initialize types
        @types_list = types
      end

      ###
      # @description: Determines if there's an skos:ConceptScheme among the provided types
      ###
      def concept?
        @types_list.any? {|type| !type.nil? && NODE_TYPES[:SKOS_CONCEPT].include?(type.downcase) }
      end

      ###
      # @description: Determines if there's an skos:ConceptScheme among the provided types
      ###
      def concept_scheme?
        @types_list.any? {|type| !type.nil? && NODE_TYPES[:SKOS_CONCEPT_SCHEME].include?(type.downcase) }
      end

      ###
      # @description: Determines whether one or more of the types are equal to a provided one.
      # @param string_type [String]
      ###
      def eql_to? string_type
        @types_list.any? {|type| string_type.downcase.eql?(type.downcase) }
      end

      ###
      # Determines if the set of types contains a standardized type (rdfs:Class, rdf:Property, etc)
      ###
      def includes_standardized_type?
        @types_list.any? {|type|
          standardized_type?(type.downcase)
        }
      end

      ###
      # @description: Determines if there's an rdfs:Class among the provided types
      ###
      def rdfs_class?
        @types_list.any? {|type|
          !type.nil? && NODE_TYPES[:RDFS_CLASS].include?(type.downcase)
        }
      end

      def rdf_property?
        @types_list.any? {|type|
          !type.nil? && NODE_TYPES[:RDF_PROPERTY].include?(type.downcase)
        }
      end

      ###
      # @description: Determines if there's either a skos:ConceptScheme or a skos:Concept among the provided types
      ###
      def skos_type?
        @types_list.any? {|type|
          NODE_TYPES[:SKOS_CONCEPT].include?(type.downcase) ||
          NODE_TYPES[:SKOS_CONCEPT_SCHEME].include?(type.downcase)
        }
      end
    end
  end
end
