import React, { FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom-v5-compat';

import { k8sCreate } from '@openshift-console/dynamic-plugin-sdk';
import {
  Alert,
  Button,
  ButtonVariant,
  Form,
  FormGroup,
  Wizard,
  WizardHeader,
  WizardStep,
} from '@patternfly/react-core';
import ErrorAlert from '@utils/components/ErrorAlert';
import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';
import { ClusterUserDefinedNetworkModel } from '@utils/models';
import { isEmpty } from '@utils/utils';

import NetworkDefinition from './components/NetworkDefinition';
import ProjectMapping from './components/ProjectMapping';
import { defaultFormValue, VMNetworkForm } from './constants';

const VMNetworkNewForm: FC = () => {
  const navigate = useNavigate();
  const { t } = useNetworkingTranslation();
  const [apiError, setError] = useState<Error>(null);

  const methods = useForm<VMNetworkForm>({
    defaultValues: defaultFormValue,
  });

  const {
    formState: { isSubmitSuccessful, isSubmitting },
    handleSubmit,
    watch,
  } = methods;

  const name = watch('network.metadata.name');
  const bridgeMapping = watch('network.spec.network.localnet.physicalNetworkName');
  const namespaceSelector = watch('network.spec.namespaceSelector');
  const showProjectList = watch('showProjectList');
  const matchLabelCheck = watch('matchLabelCheck');

  const emptyProjectList = showProjectList
    ? isEmpty(namespaceSelector.matchExpressions)
    : !matchLabelCheck && isEmpty(namespaceSelector.matchLabels);

  const onSubmit = async (data: VMNetworkForm) => {
    try {
      await k8sCreate({
        data: data.network,
        model: ClusterUserDefinedNetworkModel,
      });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <Wizard
        header={
          <WizardHeader
            description={t(
              'Define a VirtualMachine network providing access to the physical underlay for VirtualMachines.',
            )}
            isCloseHidden
            title={t('VirtualMachine network')}
          />
        }
        onSave={handleSubmit(onSubmit)}
      >
        <WizardStep
          footer={{
            isNextDisabled: isEmpty(name) || isEmpty(bridgeMapping),
          }}
          id="wizard-network-definition"
          name={t('Network definition')}
        >
          <NetworkDefinition />
        </WizardStep>
        <WizardStep
          footer={{
            isNextDisabled: isSubmitting || emptyProjectList,
            nextButtonProps: { isLoading: isSubmitting },
            nextButtonText: t('Create'),
          }}
          id="wizard-project-mapping"
          name={t('Project mapping')}
        >
          <Form>
            <ProjectMapping />
            {apiError && (
              <FormGroup>
                <ErrorAlert error={apiError} />
              </FormGroup>
            )}
            {isSubmitSuccessful && isEmpty(apiError) && (
              <FormGroup>
                <Alert
                  title={t("Network '{{name}}' has been created successfully.", { name })}
                  variant="success"
                >
                  <Button
                    onClick={() => {
                      navigate(`/k8s/cluster/virtualmachine-networks/${name}`);
                      close();
                    }}
                    variant={ButtonVariant.link}
                  >
                    {t('View network')}
                  </Button>
                </Alert>
              </FormGroup>
            )}
          </Form>
        </WizardStep>
      </Wizard>
    </FormProvider>
  );
};

export default VMNetworkNewForm;
