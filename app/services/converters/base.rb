# frozen_string_literal: true

module Converters
  # The parent class for the converters
  # @abstract
  class Base
    CONTEXT = {
      "dct": "http://purl.org/dc/terms/",
      "desm": "http://desmsolutions.org/ns/",
      "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
      "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
      "skos": "http://www.w3.org/2004/02/skos/core#"
    }.freeze

    DESM_NAMESPACE = URI("http://desmsolutions.org/ns/")

    attr_reader :concept_scheme_cache, :domain_class_cache, :resources, :spec_id

    ##
    # @param file [#path]
    def initialize(_file)
      @concept_scheme_cache = {}
      @domain_class_cache = {}
      @resources = Set.new
      @spec_id = SecureRandom.hex
    end

    ##
    # Converts a file to the JSON-LD format.
    #
    # @param file [#path]
    # @return [Hash]
    def self.convert(file)
      {
        "@context": CONTEXT,
        "@graph": new(file).resources.to_a
      }
    end

    private

    def build_concept_scheme(*args)
      raise NotImplementedError
    end

    def build_domain_class(*args)
      raise NotImplementedError
    end

    ##
    # Builds a URI in the DESM namespace using the ID generated for the spec.
    #
    # @param value [String]
    # @return [String]
    def build_desm_uri(value)
      normalized_value = value.squish.gsub(/\W+/, "_")
      (DESM_NAMESPACE + "#{spec_id}/#{normalized_value}").to_s
    end

    ##
    # Returns the concept scheme for a given entity from the cache.
    # Builds and caches a scheme for the entity in the case of a cache miss.
    #
    # @param entity [Object]
    # @param options [Hash]
    # @return [Hash, nil]
    def fetch_concept_scheme(entity, **options)
      concept_scheme = concept_scheme_cache[entity]
      return concept_scheme if concept_scheme

      concept_scheme = build_concept_scheme(entity, **options)
      return unless concept_scheme

      resources << concept_scheme
      concept_scheme_cache[entity] = concept_scheme
    end

    ##
    # Returns the domain class for a given entity from the cache.
    # Builds and caches a class for the entity in the case of a cache miss.
    #
    # @param entity [Object]
    # @param options [Hash]
    # @return [Hash]
    def fetch_domain_class(entity, **options)
      domain_class = domain_class_cache[entity]
      return domain_class if domain_class

      domain_class = build_domain_class(entity, **options)
      resources << domain_class
      domain_class_cache[entity] = domain_class
    end
  end
end
