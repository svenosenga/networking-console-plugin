import { K8sResourceCommon } from '@openshift-console/dynamic-plugin-sdk';
import useProjectsWithPrimaryUserDefinedLabel from '@utils/hooks/useProjectsWithPrimaryUserDefinedLabel';
import { ClusterUserDefinedNetworkKind } from '@utils/resources/udns/types';
import { getVMNetworkProjects } from '@utils/resources/vmnetworks/utils';

const useVMNetworkMatchedProjects = (
  vmNetwork: ClusterUserDefinedNetworkKind,
): [matchingProjects: K8sResourceCommon[], loaded: boolean] => {
  const [projects, loaded] = useProjectsWithPrimaryUserDefinedLabel();

  const matchingProjects = getVMNetworkProjects(vmNetwork, projects);

  return [matchingProjects, loaded];
};

export default useVMNetworkMatchedProjects;
