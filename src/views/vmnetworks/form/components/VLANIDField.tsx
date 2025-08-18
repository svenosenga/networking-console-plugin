import React, { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { FormGroup, Popover, TextInput } from '@patternfly/react-core';
import { HelpIcon } from '@patternfly/react-icons';
import FormGroupHelperText from '@utils/components/FormGroupHelperText/FormGroupHelperText';
import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';

import { MAX_VLAN_ID, MIN_VLAN_ID, VMNetworkForm } from '../constants';

const VLANIDField: FC = () => {
  const { t } = useNetworkingTranslation();
  const { control } = useFormContext<VMNetworkForm>();

  return (
    <FormGroup
      fieldId="vlanID"
      isRequired
      label={
        <>
          {t('VLAN ID')}{' '}
          <Popover
            bodyContent={t(
              'You physical network switch must be configured with a VLAN trunk that is permitted to carry traffic for this specific ID.',
            )}
          >
            <HelpIcon />
          </Popover>
        </>
      }
    >
      <Controller
        control={control}
        name="network.spec.network.localnet.vlan.access.id"
        render={({ field: { onChange, value } }) => (
          <TextInput
            max={MAX_VLAN_ID}
            min={MIN_VLAN_ID}
            onChange={(event) => onChange(event.currentTarget.valueAsNumber)}
            type="number"
            value={value}
          />
        )}
      />
      <FormGroupHelperText>
        {t('VLAN ID must be between {{min}}-{{max}}', { max: MAX_VLAN_ID, min: MIN_VLAN_ID })}
      </FormGroupHelperText>
    </FormGroup>
  );
};

export default VLANIDField;
