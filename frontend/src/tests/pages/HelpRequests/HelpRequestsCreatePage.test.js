import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import HelpRequestsCreatePage from "main/pages/HelpRequests/HelpRequestsCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("HelpRequestsCreatePage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    beforeEach(() => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    test("renders without crashing", () => {
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HelpRequestsCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("when you fill in the form and hit submit, it makes a request to the backend", async () => {

        const queryClient = new QueryClient();
        const helpRequest = {
            id: 17,
            requesterEmail: "example@ucsb.edu",
            teamId: "f23-6pm-1",
            tableOrBreakoutRoom: "2",
            requestTime: "2022-02-02T00:00",
            explanation: "sample",
            solved: false
        };

        axiosMock.onPost("/api/HelpRequest/post").reply( 202, helpRequest );

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HelpRequestsCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId("HelpRequestsForm-requesterEmail")).toBeInTheDocument();
        });

        const requesterEmailField = screen.getByTestId("HelpRequestsForm-requesterEmail");
        const teamIdFieldField = screen.getByTestId("HelpRequestsForm-teamId");
        const tableOrBreakoutRoomField = screen.getByTestId("HelpRequestsForm-tableOrBreakoutRoom");
        const requestTimeField = screen.getByTestId("HelpRequestsForm-requestTime");
        const explanationField = screen.getByTestId("HelpRequestsForm-explanation");
        const solvedField = screen.getByTestId("HelpRequestsForm-solved");
        const submitButton = screen.getByTestId("HelpRequestsForm-submit");

        fireEvent.change(requesterEmailField, { target: { value: 'example@ucsb.edu' } });
        fireEvent.change(teamIdFieldField, { target: { value: 'f23-6pm-1' } });
        fireEvent.change(tableOrBreakoutRoomField, { target: { value: '2' } });
        fireEvent.change(requestTimeField, { target: { value: '2022-02-02T00:00' } });
        fireEvent.change(explanationField, { target: { value: 'sample' } });
        fireEvent.change(solvedField);

        expect(submitButton).toBeInTheDocument();

        fireEvent.click(submitButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual(
            {
            "requesterEmail": "example@ucsb.edu",
            "teamId": "f23-6pm-1",
            "tableOrBreakoutRoom": "2",
            "requestTime": "2022-02-02T00:00",
            "explanation": "sample",
            "solved": false
        });

        expect(mockToast).toBeCalledWith("New helprequest Created - id: 17 teamId: f23-6pm-1");
        expect(mockNavigate).toBeCalledWith({ "to": "/HelpRequest" });
    });


});


