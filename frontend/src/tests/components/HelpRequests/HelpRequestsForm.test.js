import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import HelpRequestsForm from "main/components/HelpRequests/HelpRequestsForm";
import { BrowserRouter as Router } from "react-router-dom";
import { helpRequestFixtures } from "fixtures/helpRequestFixtures";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("HelpRequestsForm tests", () => {

    test("renders correctly", async () => {

        render(
            <Router  >
                <HelpRequestsForm />
            </Router>
        );
        await screen.findByText(/ID/);
        await screen.findByText(/Requester Email/);
        await screen.findByText(/TeamID/);
        await screen.findByText(/Table Or Breakout Room/);
        await screen.findByText(/Request Time ISO Format/);
        await screen.findByText(/Explanation/);
        await screen.findByText(/Solved/);
        await screen.findByText(/Create/);
    });


    test("renders correctly when passing in a HelpRequest", async () => {

        render(
            <Router  >
                <HelpRequestsForm initialContents={helpRequestFixtures.oneHelpRequest} />
            </Router>
        );
        await screen.findByTestId(/HelpRequestsForm-id/);
        expect(screen.getByText(/ID/)).toBeInTheDocument();
        expect(screen.getByTestId(/HelpRequestsForm-id/)).toHaveValue("1");
    });

    test("Correct Error messsages on bad input", async () => {

        render(
            <Router  >
                <HelpRequestsForm />
            </Router>
        );
        await screen.findByTestId("HelpRequestsForm-requesterEmail");
        const requesterEmailField = screen.getByTestId("HelpRequestsForm-requesterEmail");
        const teamIdFieldField = screen.getByTestId("HelpRequestsForm-teamId");
        const requestTimeField = screen.getByTestId("HelpRequestsForm-requestTime");
        const submitButton = screen.getByTestId("HelpRequestsForm-submit");

        fireEvent.change(requesterEmailField, { target: { value: 'bad-input' } });
        fireEvent.change(teamIdFieldField, { target: { value: 'bad-input' } });
        fireEvent.change(requestTimeField, { target: { value: 'bad-input' } });
        fireEvent.click(submitButton);

        await screen.findByText(/Requester email must be a valid email./);
        await screen.findByText(/Team ID must be a valid team id./);
        await screen.findByText(/Request time is required and must be provided in ISO format./);
    });

    test("Correct Error messsages on missing input", async () => {

        render(
            <Router  >
                <HelpRequestsForm />
            </Router>
        );
        await screen.findByTestId("HelpRequestsForm-submit");
        const submitButton = screen.getByTestId("HelpRequestsForm-submit");

        fireEvent.click(submitButton);

        await screen.findByText(/Requester Email is required./);
        expect(screen.getByText(/Team ID is required./)).toBeInTheDocument();
        expect(screen.getByText(/Table or Breakout Room is required./)).toBeInTheDocument();
        expect(screen.getByText(/Request time is required and must be provided in ISO format./)).toBeInTheDocument();
        expect(screen.getByText(/Explanation is required./)).toBeInTheDocument();
        expect(screen.getByText(/Solved is required./)).toBeInTheDocument();
    });

    test("No Error messsages on good input", async () => {

        const mockSubmitAction = jest.fn();


        render(
            <Router  >
                <HelpRequestsForm submitAction={mockSubmitAction} />
            </Router>
        );
        await screen.findByTestId("HelpRequestsForm-requesterEmail");

        const requesterEmailField = screen.getByTestId("HelpRequestsForm-requesterEmail");
        const teamIdFieldField = screen.getByTestId("HelpRequestsForm-teamId");
        const tableOrBreakoutRoomField = screen.getByTestId("HelpRequestsForm-tableOrBreakoutRoom");
        const requestTimeField = screen.getByTestId("HelpRequestsForm-requestTime");
        const explanationField = screen.getByTestId("HelpRequestsForm-explanation");
        const solvedField = screen.getByTestId("HelpRequestsForm-solved");
        const submitButton = screen.getByTestId("HelpRequestsForm-submit");

        fireEvent.change(requesterEmailField, { target: { value: 'replace@ucsb.edu' } });
        fireEvent.change(teamIdFieldField, { target: { value: 's23-1am-1' } });
        fireEvent.change(tableOrBreakoutRoomField, { target: { value: '12' } });
        fireEvent.change(requestTimeField, { target: { value: '2022-01-02T12:00' } });
        fireEvent.change(explanationField, { target: { value: 'newexplanation' } });
        fireEvent.change(solvedField, { target: { value: 'true' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

        expect(screen.queryByText(/Requester email must be a valid email./)).not.toBeInTheDocument();
        expect(screen.queryByText(/Team ID must be a valid team id./)).not.toBeInTheDocument();
        expect(screen.queryByText(/Request time is required and must be provided in ISO format./)).not.toBeInTheDocument();

    });


    test("that navigate(-1) is called when Cancel is clicked", async () => {

        render(
            <Router  >
                <HelpRequestsForm />
            </Router>
        );
        await screen.findByTestId("HelpRequestsForm-cancel");
        const cancelButton = screen.getByTestId("HelpRequestsForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

});


