import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";
import HelpRequestsForm from "main/components/HelpRequests/HelpRequestsForm";

export default function HelpRequestsCreatePage({storybook=false}) {

  const objectToAxiosParams = (helpRequest) => ({
    url: "/api/HelpRequest/post",
    method: "POST",
    params: {
      requesterEmail: helpRequest.requesterEmail,
      teamId: helpRequest.teamId,
      tableOrBreakoutRoom: helpRequest.tableOrBreakoutRoom,
      requestTime: helpRequest.requestTime,
      explanation: helpRequest.explanation,
      solved: helpRequest.solved
    }
  });

  const onSuccess = (helpRequest) => {
    toast(`New helprequest Created - id: ${helpRequest.id} teamId: ${helpRequest.teamId}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosParams,
     { onSuccess }, 
     // Stryker disable next-line all : hard to set up test for caching
     ["/api/HelpRequest/all"]
     );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess && !storybook) {
    return <Navigate to="/HelpRequest" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New Help Request</h1>

        <HelpRequestsForm submitAction={onSubmit} />

      </div>
    </BasicLayout>
  )
}