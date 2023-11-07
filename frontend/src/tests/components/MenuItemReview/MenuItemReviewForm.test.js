import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import MenuItemReviewForm from "main/components/MenuItemReview/MenuItemReviewForm";
import { menuItemReviewFixtures } from "fixtures/menuItemReviewFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("MenuItemReviewForm tests", () => {

    test("renders correctly", async () => {

        render(
            <Router  >
                <MenuItemReviewForm />
            </Router>
        );
        await screen.findByTestId(/id/);
        await screen.findByTestId(/itemid/);
        await screen.findByTestId(/email/);
        await screen.findByTestId(/stars/);
        await screen.findByTestId(/localDateTime/);
        await screen.findByTestId(/comments/);
        await screen.findByText(/Create/);
    });


    test("renders correctly when passing in a MenuItemReview", async () => {

        render(
            <Router  >
                <MenuItemReviewForm initialContents={menuItemReviewFixtures.oneDate} />
            </Router>
        );
        await screen.findByTestId(/MenuItemReviewForm-id/);
        expect(screen.getByText(/Id/)).toBeInTheDocument();
        expect(screen.getByTestId(/MenuItemReviewForm-id/)).toHaveValue("1");
    });

    
    test("Correct Error messsages on bad input", async () => {

        render(
            <Router  >
                <MenuItemReviewForm />
            </Router>
        );
        await screen.findByTestId("MenuItemReviewForm-itemid");
        const itemIdField = screen.getByTestId("MenuItemReviewForm-itemid");
        const emailField = screen.getByTestId("MenuItemReviewForm-email");
        const starsField = screen.getByTestId("MenuItemReviewForm-stars");
        const localDateTimeField = screen.getByTestId("MenuItemReviewForm-localDateTime");
        const commentsField = screen.getByTestId("MenuItemReviewForm-comments");

        const submitButton = screen.getByTestId("MenuItemReviewForm-submit");
        
        fireEvent.change(itemIdField, { target: { value: 'bad-input' } });
        fireEvent.change(emailField, { target: { value: 'bad-input' } });
        fireEvent.change(starsField, { target: { value: 'bad-input' } });
        fireEvent.change(localDateTimeField, { target: { value: 'bad-input' } });
        fireEvent.change(commentsField, { target: { value: 'bad-input' } });
        fireEvent.click(submitButton);

        await screen.findByText(/Date requested must be in ISO format/);
        expect(screen.getByText(/Date requested must be in ISO format/)).toBeInTheDocument();
        expect(screen.getByText(/Must be a valid email/)).toBeInTheDocument();
        expect(screen.getByText(/Must input a rating 0-5/)).toBeInTheDocument();
    });

    
    test("Correct Error messsages on missing input", async () => {

        render(
            <Router  >
                <MenuItemReviewForm />
            </Router>
        );
        await screen.findByTestId("MenuItemReviewForm-submit");
        const submitButton = screen.getByTestId("MenuItemReviewForm-submit");

        fireEvent.click(submitButton);

        await screen.findByText(/Date requested must be in ISO format/);
        expect(screen.getByText(/Date requested must be in ISO format/)).toBeInTheDocument();
        expect(screen.getByText(/Must be a valid email/)).toBeInTheDocument();
        expect(screen.getByText(/Must input a rating 0-5/)).toBeInTheDocument();

    });
    
    test("No Error messsages on good input", async () => {

        const mockSubmitAction = jest.fn();


        render(
            <Router  >
                <MenuItemReviewForm submitAction={mockSubmitAction} />
            </Router>
        );
        await screen.findByTestId("MenuItemReviewForm-itemid");

        const itemidField = screen.getByTestId("MenuItemReviewForm-itemid");
        const emailField = screen.getByTestId("MenuItemReviewForm-email");
        const starsField = screen.getByTestId("MenuItemReviewForm-stars");
        const localDateTimeField = screen.getByTestId("MenuItemReviewForm-localDateTime");
        const commentsField = screen.getByTestId("MenuItemReviewForm-comments");
        const submitButton = screen.getByTestId("MenuItemReviewForm-submit");

        fireEvent.change(itemidField, { target: { value: 2 } });
        fireEvent.change(emailField, { target: { value: "newEmail@fakemail.com" } });
        fireEvent.change(starsField, { target: { value: 3 } });
        fireEvent.change(localDateTimeField, { target: { value: '2022-01-02T12:00' } });
        fireEvent.change(commentsField, { target: { value: "new comment" } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

        expect(screen.queryByText(/Date requested must be in ISO format/)).not.toBeInTheDocument();
        expect(screen.queryByText(/Must be a valid email/)).not.toBeInTheDocument();
        expect(screen.queryByText(/Must input a rating 0-5/)).not.toBeInTheDocument();

    });


    test("that navigate(-1) is called when Cancel is clicked", async () => {

        render(
            <Router  >
                <MenuItemReviewForm />
            </Router>
        );
        await screen.findByTestId("MenuItemReviewForm-cancel");
        const cancelButton = screen.getByTestId("MenuItemReviewForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

});


