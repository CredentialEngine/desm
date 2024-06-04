import { useEffect, useContext } from 'react';
import { useLocalStore } from 'easy-peasy';
import AlertNotice from '../shared/AlertNotice';
import Loader from '../shared/Loader';
import TopNav from '../shared/TopNav';
import TopNavOptions from '../shared/TopNavOptions';
import DesmTabs from '../shared/DesmTabs';
import PropertiesList from './PropertiesList';
import PropertyMappingsFilter from './PropertyMappingsFilter';
import SearchBar from './SearchBar';
import ConfigurationProfileSelect from '../shared/ConfigurationProfileSelect';
import { AppContext } from '../../contexts/AppContext';
import { i18n } from 'utils/i18n';
import { propertyMappingListStore } from './stores/propertyMappingListStore';
import { camelizeLocationSearch, updateWithRouter } from 'helpers/queryString';
import { isEmpty } from 'lodash';

const PropertyMappingList = (props) => {
  const context = useContext(AppContext);
  const [state, actions] = useLocalStore(() => {
    const { cp, abstractClass } = camelizeLocationSearch(props);
    return propertyMappingListStore({ cp, abstractClass });
  });
  const {
    configurationProfile,
    domains,
    organizations,
    predicates,
    selectedDomain,
    hideSpineTermsWithNoAlignments,
    propertiesInputValue,
    selectedAlignmentOrderOption,
    selectedAlignmentOrganizations,
    selectedPredicates,
    selectedSpineOrderOption,
    selectedSpineOrganizations,
  } = state;
  const updateQueryString = updateWithRouter(props);

  const navCenterOptions = () => {
    return <TopNavOptions viewMappings={true} mapSpecification={true} />;
  };

  const handleSelectedData = () => {
    if (isEmpty(domains)) return;

    let selectedAbstractClass = state.abstractClass
      ? domains.find((d) => d.name.toLowerCase() == state.abstractClass.toLowerCase())
      : domains[0];
    selectedAbstractClass ||= domains[0];
    actions.setSelectedDomain(selectedAbstractClass);
    updateQueryString({ abstractClass: selectedAbstractClass?.name });
  };

  useEffect(() => loadData(), [configurationProfile]);
  useEffect(() => handleSelectedData(), [domains]);

  const updateSelectedDomain = (id) => {
    const selectedDomain = domains.find((domain) => domain.id == id);
    actions.updateSelectedDomain(selectedDomain);
    updateQueryString({ abstractClass: selectedDomain.name });
  };

  const updateSelectedConfigurationProfile = (configurationProfile) => {
    actions.updateSelectedConfigurationProfile(configurationProfile);
    if (configurationProfile) {
      updateQueryString({ cp: configurationProfile.id });
    }
  };

  const loadData = async () => {
    if (!configurationProfile) {
      return;
    }
    await actions.fetchDataFromAPI();
  };

  return (
    <div className="container-fluid">
      <TopNav centerContent={navCenterOptions} />
      {state.hasErrors ? (
        <AlertNotice message={state.errors} onClose={actions.clearErrors} />
      ) : null}

      <div className="row">
        <div className="col p-lg-5 pt-5">
          {state.withoutSharedMappings && (
            <div className="w-100">
              <AlertNotice
                withTitle={false}
                message={i18n.t('ui.view_mapping.no_mappings.current_profile')}
                cssClass="alert-warning"
              />
            </div>
          )}
          <ConfigurationProfileSelect
            onSubmit={updateSelectedConfigurationProfile}
            requestType="indexWithSharedMappings"
            selectedConfigurationProfileId={state.selectedConfigurationProfileId(null)}
            withoutUserConfigurationProfile={true}
          />
          {configurationProfile?.withSharedMappings &&
            (state.loading ? (
              <Loader />
            ) : (
              <>
                <h1>
                  <strong>{configurationProfile.name}</strong>: {i18n.t('ui.view_mapping.subtitle')}
                </h1>
                <label className="my-0">{i18n.t('ui.view_mapping.select_abstract_class')}</label>
                <DesmTabs
                  onTabClick={(id) => updateSelectedDomain(id)}
                  selectedId={selectedDomain?.id}
                  values={domains}
                />
                <SearchBar
                  onAlignmentOrderChange={actions.setSelectedAlignmentOrderOption}
                  onHideSpineTermsWithNoAlignmentsChange={actions.setHideSpineTermsWithNoAlignments}
                  onSpineOrderChange={actions.setSelectedSpineOrderOption}
                  onType={actions.setPropertiesInputValue}
                  selectedAlignmentOrderOption={selectedAlignmentOrderOption}
                  selectedSpineOrderOption={selectedSpineOrderOption}
                />

                {selectedDomain && (
                  <>
                    <PropertyMappingsFilter
                      organizations={organizations}
                      onAlignmentOrganizationSelected={actions.setSelectedAlignmentOrganizations}
                      onPredicateSelected={actions.setSelectedPredicates}
                      onSpineOrganizationSelected={actions.setSelectedSpineOrganizations}
                      predicates={predicates}
                      selectedAlignmentOrderOption={selectedAlignmentOrderOption}
                      selectedAlignmentOrganizations={selectedAlignmentOrganizations}
                      selectedDomain={selectedDomain}
                      selectedPredicates={selectedPredicates}
                      selectedSpineOrderOption={selectedSpineOrderOption}
                      selectedSpineOrganizations={selectedSpineOrganizations}
                    />

                    <PropertiesList
                      hideSpineTermsWithNoAlignments={hideSpineTermsWithNoAlignments}
                      inputValue={propertiesInputValue}
                      configurationProfile={configurationProfile}
                      domains={domains}
                      organizations={organizations}
                      predicates={predicates}
                      selectedAlignmentOrderOption={selectedAlignmentOrderOption}
                      selectedAlignmentOrganizations={selectedAlignmentOrganizations}
                      selectedDomain={selectedDomain}
                      selectedPredicates={selectedPredicates}
                      selectedSpineOrderOption={selectedSpineOrderOption}
                      selectedSpineOrganizations={selectedSpineOrganizations}
                    />
                  </>
                )}
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyMappingList;
