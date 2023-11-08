import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

function HelpRequestsForm({ initialContents, submitAction, buttonLabel = "Create" }) {

    
    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialContents || {}, }
    );
    // Stryker restore all
   
    const navigate = useNavigate();

    const testIdPrefix = "HelpRequestsForm";

    const isodate_regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/i;

    const email_regex = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;

    const teamid_regex = /[sfwm]\d{2}-(([1-12]am)|([1-12]pm))-[1-4]$/


    // f23-6pm-1

    return (
        <Form onSubmit={handleSubmit(submitAction)}>

            {initialContents && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="id">Id</Form.Label>
                    <Form.Control
                        data-testid={testIdPrefix + "-id"}
                        id="id"
                        type="text"
                        {...register("id")}
                        value={initialContents.id}
                        disabled
                    />
                </Form.Group>
            )}

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="requesterEmail">Requester Email</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-requesterEmail"}
                    id="requesterEmail"
                    type="text"
                    isInvalid={Boolean(errors.requesterEmail)}
                    {...register("requesterEmail", { required: true, pattern: email_regex })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.requesterEmail && 'Requester Email is required.'}
                    {errors.requesterEmail?.type === 'pattern' && 'Requester email must be a valid email.'}

                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="teamId">Team ID</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-teamId"}
                    id="teamId"
                    type="text"
                    isInvalid={Boolean(errors.teamid)}
                    {...register("teamId", {
                        required: true,
                        pattern: teamid_regex
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.teamid && 'Team ID is required. '}
                    {errors.teamid?.type === 'pattern' && 'Team ID must be a valid team id.'}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="tableOrBreakoutRoom">Table Or Breakout Room</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-tableOrBreakoutRoom"}
                    id="tableOrBreakoutRoom"
                    type="text"
                    isInvalid={Boolean(errors.tableOrBreakoutRoom)}
                    {...register("tableOrBreakoutRoom", {
                        required: "Table or Breakout Room is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.tableOrBreakoutRoom?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                        <Form.Label htmlFor="requestTime">Request Time (iso format)</Form.Label>
                        <Form.Control
                            data-testid="requestTime"
                            id="requestTime"
                            type="datetime-local"
                            isInvalid={Boolean(errors.requestTime)}
                            {...register("requestTime", { required: true, pattern: isodate_regex })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.requestTime && 'Request time is required. '}
                        </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="explanation">Explanation</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-explanation"}
                    id="explanation"
                    type="text"
                    isInvalid={Boolean(errors.explanation)}
                    {...register("explanation", {
                        required: "Explanation is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.explanation?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="solved">Solved</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-solved"}
                    id="solved"
                    type="boolean"
                    isInvalid={Boolean(errors.solved)}
                    {...register("solved", {
                        required: "Solved is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.solved?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Button
                type="submit"
                data-testid={testIdPrefix + "-submit"}
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid={testIdPrefix + "-cancel"}
            >
                Cancel
            </Button>

        </Form>

    )
}

export default HelpRequestsForm;