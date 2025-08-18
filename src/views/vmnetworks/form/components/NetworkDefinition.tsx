import React, { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  Checkbox,
  Form,
  FormGroup,
  PageSection,
  Popover,
  Split,
  SplitItem,
  TextInput,
  Title,
} from '@patternfly/react-core';
import { HelpIcon } from '@patternfly/react-icons';
import PopoverHelpIcon from '@utils/components/PopoverHelpIcon/PopoverHelpIcon';
import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';
import { VLAN_MODE_ACCESS } from '@utils/resources/udns/types';
import { isEmpty } from '@utils/utils';

import { DEFAULT_VLAN_ID, VMNetworkForm } from '../constants';

import BridgeMappingPopover from './BridgeMappingPopover';
import VLANIDField from './VLANIDField';

const NetworkDefinition: FC = () => {
  const { t } = useNetworkingTranslation();
  const { control, register } = useFormContext<VMNetworkForm>();

  return (
    <PageSection>
      <Form>
        <Title headingLevel="h2">{t('Network definition')}</Title>
        <p>{t('This section is not editable once the network is created.')}</p>

        <FormGroup fieldId="name" isRequired label={t('Name')}>
          <TextInput {...register('network.metadata.name', { required: true })} />
        </FormGroup>
        <FormGroup fieldId="description" label={t('Description')}>
          <TextInput
            {...register('network.metadata.annotations.description', { required: false })}
          />
        </FormGroup>
        <FormGroup
          fieldId="bridge-mapping"
          isRequired
          label={t('Bridge mapping')}
          labelHelp={<PopoverHelpIcon bodyContent={<BridgeMappingPopover />} />}
        >
          <TextInput
            {...register('network.spec.network.localnet.physicalNetworkName', { required: true })}
          />
        </FormGroup>
        <FormGroup fieldId="mtu" isRequired label={t('MTU')}>
          <Controller
            control={control}
            name="network.spec.network.localnet.mtu"
            render={({ field: { onChange, value } }) => (
              <TextInput
                min={0}
                onChange={(event) => onChange(event.currentTarget.valueAsNumber)}
                type="number"
                value={value}
              />
            )}
          />
        </FormGroup>
        <Controller
          control={control}
          name="network.spec.network.localnet.vlan"
          render={({ field: { onChange, value: vlan } }) => (
            <>
              <Split hasGutter>
                <Checkbox
                  id="vlan-enabled"
                  isChecked={!isEmpty(vlan?.mode)}
                  label={t('VLAN tagging')}
                  onChange={(_, checked) =>
                    onChange(
                      checked ? { access: { id: DEFAULT_VLAN_ID }, mode: VLAN_MODE_ACCESS } : null,
                    )
                  }
                />
                <SplitItem>
                  <Popover
                    bodyContent={t(
                      "Enable this option to tag the VirtualMachine's network traffic with a specific VLAN ID (IEEE 802.1Q), isolating it within a designed virtual network on the physical LAN",
                    )}
                  >
                    <HelpIcon />
                  </Popover>
                </SplitItem>
              </Split>

              {!isEmpty(vlan?.access) && <VLANIDField />}
            </>
          )}
        />
      </Form>
    </PageSection>
  );
};

export default NetworkDefinition;
