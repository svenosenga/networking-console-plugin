import React, { FC } from 'react';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom-v5-compat';

import { Alert, AlertVariant, Label } from '@patternfly/react-core';
import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';
import { PRIMARY_USER_DEFINED_LABEL } from '@views/udns/list/constants';

const NoProjectReadyForPrimaryUDNAlert: FC = () => {
  const { t } = useNetworkingTranslation();

  return (
    <Alert
      isInline
      title={t('No namespace is configured for a primary user-defined network')}
      variant={AlertVariant.danger}
    >
      <Trans t={t}>
        At creation time the namespace must be configured with{' '}
        <Label>{{ label: PRIMARY_USER_DEFINED_LABEL }}</Label> label. Go to{' '}
        <Link target="_blank" to={`/k8s/cluster/namespaces`}>
          Namespaces
        </Link>{' '}
        to create a new namespace.
      </Trans>
    </Alert>
  );
};

export default NoProjectReadyForPrimaryUDNAlert;
