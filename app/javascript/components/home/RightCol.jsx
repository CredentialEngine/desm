import mappingProcess from '../../../assets/images/mapping-process.png';

const RightSideHome = () => (
  <div className="col-lg-8 p-lg-5 pt-5 bg-col-secondary">
    <h1 className="subtitle">About the DESM tool</h1>
    <p>
      The Data Ecosystem Mapping Tool (DESM) is a specialized tool for creating, editing,
      maintaining and viewing crosswalks between data standards from two or more Data Standard
      Organizations (DSOs). These crosswalks are based on the degree of semantic alignment between
      terms in the different standards or schemas, and may be useful for:
    </p>

    <ul>
      <li>supporting translation of data from one standard to another,</li>
      <li>supporting the development of data models that align to several standards</li>
      <li>showing which standards cover what terms,</li>
    </ul>

    <p>
      among other uses. These uses recognize the reality that any data ecosystem will encompass
      actors who use different data standards, different models and different schemas, because they
      have different interests, systems and requirements for the data. Data translation allows a
      degree of interoperability despite the use of data standards; however our ultimate hope is
      that semantic mapping will show that data harmonization is possible, that is that different
      data standards can share semantics and models for common elements.
    </p>

    <img src={mappingProcess} alt="mapping process" style={{ width: '100%', padding: '2rem' }} />

    <p>
      The crosswalks are based on pairwise mapping of terms from the different standards to a
      &quot;synthetic spine&quot;, a schema-neutral synthesis of terms that is created during the
      mapping. Mappings from terms in one standard to terms in another can then be inferred where
      their respective mappings to the spine are transitive.
    </p>

    <p>
      The{' '}
      <a href="https://github.com/t3-innovation-network/desm" target="_blank" rel="noreferrer">
        DESM tool
      </a>{' '}
      is available as Open Source Software under an Apache 2.0 license.
    </p>

    <p>
      <a
        href="https://github.com/t3-innovation-network/desm/blob/main/README.md"
        target="_blank"
        rel="noreferrer"
      >
        Instructions for setting up an instance
      </a>{' '}
      of the DESM tool are available from the repository.
    </p>

    <p>
      <a href="https://github.com/t3-innovation-network/desm/wiki" target="_blank" rel="noreferrer">
        Instructions for carrying out a mapping
      </a>{' '}
      are available on the DESM repository wiki.
    </p>

    <p>
      If you are interested in participating with a mapping project or have any questions, please contact us:
      {" "}
      <a href="mailto:info@credentialengine.org">info@credentialengine.org</a>.
    </p>
  </div>
);

export default RightSideHome;
