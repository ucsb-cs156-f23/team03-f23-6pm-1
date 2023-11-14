import { Button, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function MenuItemReviewForm({ initialContents, submitAction, buttonLabel = "Create" }) {

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

    // For explanation, see: https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
    // Note that even this complex regex may still need some tweaks

    // Stryker disable next-line Regex
    const isodate_regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/i;

    // Stryker disable next-line Regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return (

        <Form onSubmit={handleSubmit(submitAction)}>
            <Row>

                {initialContents && (
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor="id">Id</Form.Label>
                            <Form.Control
                                data-testid="MenuItemReviewForm-id"
                                id="id"
                                type="text"
                                {...register("id")}
                                value={initialContents.id}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                )}
                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="itemId">itemId</Form.Label>
                        <Form.Control
                            data-testid="MenuItemReviewForm-itemId"
                            id="itemId"
                            type="number"
                            isInvalid={Boolean(errors.itemId)}
                            {...register("itemId", {
                                valueAsNumber: "Must be a number",
                            })}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="stars">Stars</Form.Label>
                        <Form.Control
                            data-testid="MenuItemReviewForm-stars"
                            id="stars"
                            type="number"
                            isInvalid={Boolean(errors.stars)}
                            {...register("stars", {
                                required: "Stars is required.",
                                valueAsNumber: "Must be a number",
                                max: 5,
                                min: 0
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.stars?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="email">Reviewer Email</Form.Label>
                        <Form.Control
                            data-testid="MenuItemReviewForm-email"
                            id="email"
                            type="text"
                            isInvalid={errors.email}
                            {...register("email", { required: "Reviewer Email is required", pattern: emailRegex })}
                            {...register("email")}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="timestamp">Date Reviewed</Form.Label>
                        <Form.Control
                            data-testid="MenuItemReviewForm-timestamp"
                            id="timestamp"
                            type="datetime-local"
                            isInvalid={Boolean(errors.timestamp)}
                            {...register("timestamp", { required: true, pattern: isodate_regex })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.timestamp && 'Date reviewed is required. '}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="comments">Comments</Form.Label>
                    <Form.Control
                        data-testid="MenuItemReviewForm-comments"
                        id="comments"
                        type="text"
                        isInvalid={Boolean(errors.comments)}
                        {...register("comments", {
                            required: "Comments are required."
                        })}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.comments?.message}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Col>
                    <Button
                        type="submit"
                        data-testid="MenuItemReviewForm-submit"
                    >
                        {buttonLabel}
                    </Button>
                    <Button
                        variant="Secondary"
                        onClick={() => navigate(-1)}
                        data-testid="MenuItemReviewForm-cancel"
                    >
                        Cancel
                    </Button>
                </Col>
            </Row>
        </Form>

    )
}

export default MenuItemReviewForm;