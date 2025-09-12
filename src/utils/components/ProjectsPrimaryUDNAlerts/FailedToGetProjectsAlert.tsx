import React, { FC } from 'react';

import { Alert, AlertVariant } from '@patternfly/react-core';
import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';

type FailedToGetProjectsAlertProps = {
  error?: any;
};

const FailedToGetProjectsAlert: FC<FailedToGetProjectsAlertProps> = ({ error }) => {
  const { t } = useNetworkingTranslation();

  return (
    <Alert
      isInline
      title={t('Failed to retrieve the list of projects')}
      variant={AlertVariant.danger}
    >
      {error?.message ?? ''}
    </Alert>
  );
};

export default FailedToGetProjectsAlert;
