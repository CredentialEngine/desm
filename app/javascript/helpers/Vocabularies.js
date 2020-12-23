/**
 * Generate a name for the vocabulary
 *
 * @param {Array} graph a list of nodes.
 */
export const vocabName = (graph) => {
  let schemeNode = graphMainNode(graph);

  if (!schemeNode) throw "ConceptScheme node not found!";

  /// Look for an attribute with a name for the vocabulary in the concept scheme node
  let name = "";
  for (let attr in schemeNode) {
    if (
      attr.toLowerCase().includes("title") ||
      attr.toLowerCase().includes("label")
    ) {
      name = readNodeAttribute(schemeNode, attr);

      break;
    }
  }

  return name;
};

/**
 * Return the main node from a graph of a vocabulary (Returns the node of
 * type "concept scheme").
 *
 * @param {Array} graph
 */
export const graphMainNode = (graph) => {
  return graph.find((node) => {
    return nodeTypes(node).find((type) =>
      type.toLowerCase().includes("conceptscheme")
    );
  });
};

/**
 * Validate it's a skos file with a vocabulary inside.
 * It must have:
 * - A context
 * - A graph
 * - A main node (of type skos:ConceptScheme) inside the graph
 * - At least one concept node inside the graph
 *
 * @param {String|Object} vocab
 */
export const validVocabulary = (vocab) => {
  /// Ensure we deal with a JSON (object, not string)
  if (_.isString(vocab)) vocab = JSON.parse(vocab);

  let errors = [];

  let hasContext = vocab["@context"];
  let hasGraph = vocab["@graph"];
  let hasMainNode = hasGraph && graphMainNode(vocab["@graph"]);
  let hasConcepts =
    hasGraph &&
    vocab["@graph"].some((node) =>
      nodeTypes(node).some(
        (type) =>
          type.toLowerCase().includes("concept") &&
          !type.toLowerCase().includes("conceptscheme")
      )
    );

  if (!hasContext) errors.push("Missing context.");
  if (!hasGraph) errors.push("Missing graph.");
  if (!hasMainNode) errors.push("Missing concept scheme node.");
  if (!hasConcepts) errors.push("Missing concept nodes");

  return {
    errors: errors,
    result: hasContext && hasGraph && hasMainNode && hasConcepts,
  };
};

/**
 * The number of concepts inside
 * @param {Object} vocab
 */
export const cantConcepts = (vocab) => {
  return vocab["@graph"].map((node) =>
    nodeTypes(node).some(
      (type) =>
        type.toLowerCase().includes("concept") &&
        !type.toLowerCase().includes("conceptscheme")
    )
  ).length;
};

/**
 * Safely read the skos concept attribute.
 *
 * @param {Object} node
 * @param {String} attr
 */
export const readNodeAttribute = (node, attr) => {
  let key = findNodeKey(node, attr);
  if (!key) return;

  /// Return straight if it is a String
  if (_.isString(node[key])) return node[key];

  /// We are reading an attribute that's not a String. It contains one more
  /// levels of nesting.  It can be the i18n management:
  /// "en-US": "a description", or "en-us": "a description" (lowercased). or anything
  ///
  /// So our solution is to read the its attributes by using recursion, until one gives
  /// us a string, firstly prioritizing "@value" and "@id"
  if (_.isObject(node[key])) {
    /// If we recognize the "@value" key, we can return that
    if (node[key]["@value"]) return readNodeAttribute(node[key], "@value");
    /// If we recognize the "@id" key, we can return that
    if (node[key]["@id"]) return readNodeAttribute(node[key], "@id");

    for (let a in node[key]) {
      return readNodeAttribute(node[key], a);
    }
  }

  /// If it's an array, return the first element assuming it's a string. If it
  /// is not a string, just return an empty string.
  if (_.isArray(node[key])) {
    [firstNode] = node[key];
    return _.isString(firstNode) ? firstNode : "";
  }
};

/**
 * Find the node key by approximation
 * 
 * @param {Object} node 
 * @param {String} attr 
 */
const findNodeKey = (node, attr) => {
  
  var objectKeys = Object.keys(node).filter(k => k.includes(attr));
  return !_.isEmpty(objectKeys) ? objectKeys[0] : null;
};

/**
 * Return the content of the node type attribute
 *
 * @param {Object} node
 * @returns String
 */
const nodeTypes = (node) => {
  let type = node["type"] || node["@type"];

  return _.isArray(type) ? type : [type];
};
