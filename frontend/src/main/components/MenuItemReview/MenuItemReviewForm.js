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
    const stars_regex = /[0-5]/;
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
                        <Form.Label htmlFor="itemid">itemid</Form.Label>
                        <Form.Control
                            data-testid="MenuItemReviewForm-itemid"
                            id="itemid"
                            type="text"
                            {...register("itemid")}
                        />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="email">email</Form.Label>
                        <Form.Control
                            data-testid="MenuItemReviewForm-email"
                            id="email"
                            type="text"
                            {...register("email")}
                        />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="stars">stars</Form.Label>
                        <Form.Control
                            data-testid="MenuItemReviewForm-stars"
                            id="stars"
                            type="text"
                            {...register("stars", {required: true, pattern: stars_regex})}
                            isInvalid={Boolean(errors.stars)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.stars && 'Must input a rating 0-5'}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="localDateTime">Date (iso format)</Form.Label>
                        <Form.Control
                            data-testid="MenuItemReviewForm-localDateTime"
                            id="localDateTime"
                            //type="datetime-local"
                            type = "local date and time"
                            isInvalid={Boolean(errors.localDateTime)}
                            {...register("localDateTime", { required: true, pattern: isodate_regex })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.localDateTime && 'Date requested must be in ISO format'}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="comments">comments</Form.Label>
                        <Form.Control
                            data-testid="MenuItemReviewForm-comments"
                            id="comments"
                            type="text"
                            {...register("comments")}
                        />
                    </Form.Group>
                </Col>
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
