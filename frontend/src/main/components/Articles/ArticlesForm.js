import { Button, Form} from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function ArticlesForm({ initialContents, submitAction, buttonLabel = "Create" }) {

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

    const testIdPrefix = "ArticlesForm";

    // For explanation, see: https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
    // Note that even this complex regex may still need some tweaks

    // Stryker disable next-line Regex
    const isodate_regex = /\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])/i;

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
                <Form.Label htmlFor="title">Title</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-title"}
                    id="title"
                    type="text"
                    isInvalid={Boolean(errors.title)}
                    {...register("title", {
                        required: "Title is required.",
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.title?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="url">Url</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-url"}
                    id="url"
                    type="text"
                    isInvalid={Boolean(errors.url)}
                    {...register("url", {
                        required: "Url is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.url?.message}
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
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-email"}
                    id="email"
                    type="text"
                    isInvalid={Boolean(errors.email)}
                    {...register("email", {
                        required: "Email is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                    <Form.Label htmlFor="dateAdded">Date (iso format)</Form.Label>
                    <Form.Control
                        data-testid={testIdPrefix + "-dateAdded"}
                        id="dateAdded"
                        type="date"
                        isInvalid={Boolean(errors.dateAdded)}
                        {...register("dateAdded", { required: true, pattern: isodate_regex })}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.dateAdded && 'DateAdded is required. '}
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

export default ArticlesForm;
