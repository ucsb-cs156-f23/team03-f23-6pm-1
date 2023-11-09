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

    // Stryker disable next-line Regex
    const isodate_regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/i;
    // Stryker disable next-line Regex
    const email_regex = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;
    // Stryker disable next-line Regex
    const teamid_regex = /[sfwm]\d{2}-((([1-9]|1[012])am)|(([1-9]|1[012])pm))-[1-4]$/

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
                <Form.Label htmlFor="teamId">TeamID</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-teamId"}
                    id="teamId"
                    type="text"
                    isInvalid={Boolean(errors.teamId)}
                    {...register("teamId", {
                        required: true,
                        pattern: teamid_regex
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.teamId && 'Team ID is required.'}
                    {errors.teamId?.type === 'pattern' && 'Team ID must be a valid team id.'}
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
                        <Form.Label htmlFor="requestTime">Request Time ISO Format</Form.Label>
                        <Form.Control
                            data-testid={testIdPrefix + "-requestTime"}
                            id="requestTime"
                            type="datetime-local"
                            isInvalid={Boolean(errors.requestTime)}
                            {...register("requestTime", { required: true, pattern: isodate_regex })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.requestTime && 'Request time is required and must be provided in ISO format.'}
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
                        <Form.Check 
                            type="switch"
                            data-testid={testIdPrefix + "-solved"}
                            id="solved"
                            label="Solved?"
                            {...register("solved", {})}
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