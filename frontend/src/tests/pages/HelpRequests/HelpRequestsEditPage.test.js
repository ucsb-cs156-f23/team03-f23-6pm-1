import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import HelpRequestsEditPage from "main/pages/HelpRequests/HelpRequestsEditPage";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import mockConsole from "jest-mock-console";

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
        useParams: () => ({
            id: 17
        }),
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("HelpRequestsEditPage tests", () => {

    describe("when the backend doesn't return data", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/HelpRequest", { params: { id: 17 } }).timeout();
        });

        const queryClient = new QueryClient();
        test("renders header but table is not present", async () => {

            const restoreConsole = mockConsole();

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <HelpRequestsEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
            await screen.findByText("Edit Help Requests");
            expect(screen.queryByTestId("HelpRequestsForm-requesterEmail")).not.toBeInTheDocument();
            restoreConsole();
        });
    });

    describe("tests where backend is working normally", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/HelpRequest", { params: { id: 17 } }).reply(200, {
                id: 17,
                requesterEmail: "example@ucsb.edu",
                teamId: "f23-6pm-1",
                tableOrBreakoutRoom: "2",
                requestTime: "2022-02-02T00:00",
                explanation: "sample",
                solved: false
            });
            axiosMock.onPut('/api/HelpRequest').reply(200, {
                id: 17,
                requesterEmail: "example1@ucsb.edu",
                teamId: "f23-6pm-2",
                tableOrBreakoutRoom: "3",
                requestTime: "2022-02-03T00:00",
                explanation: "sample1",
                solved: true
            });
        });

        const queryClient = new QueryClient();
        test("renders without crashing", () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <HelpRequestsEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
        });

        test("Is populated with the data provided", async () => {

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <HelpRequestsEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await screen.findByTestId("HelpRequestsForm-requesterEmail");

            const idField = screen.getByTestId("HelpRequestsForm-id");
            const requesterEmailField = screen.getByTestId("HelpRequestsForm-requesterEmail");
            const teamIdFieldField = screen.getByTestId("HelpRequestsForm-teamId");
            const tableOrBreakoutRoomField = screen.getByTestId("HelpRequestsForm-tableOrBreakoutRoom");
            const requestTimeField = screen.getByTestId("HelpRequestsForm-requestTime");
            const explanationField = screen.getByTestId("HelpRequestsForm-explanation");
            const solvedField = screen.getByTestId("HelpRequestsForm-solved");
            const submitButton = screen.getByTestId("HelpRequestsForm-submit");


            expect(idField).toHaveValue("17");
            expect(requesterEmailField).toHaveValue("example@ucsb.edu");
            expect(teamIdFieldField).toHaveValue("f23-6pm-1");
            expect(tableOrBreakoutRoomField).toHaveValue("2");
            expect(requestTimeField).toHaveValue("2022-02-02T00:00");
            expect(explanationField).toHaveValue("sample");
            expect(solvedField).not.toBeChecked();
            expect(submitButton).toBeInTheDocument();
        });

        test("Changes when you click Update", async () => {

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <HelpRequestsEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await screen.findByTestId("HelpRequestsForm-requesterEmail");

            const idField = screen.getByTestId("HelpRequestsForm-id");
            const requesterEmailField = screen.getByTestId("HelpRequestsForm-requesterEmail");
            const teamIdFieldField = screen.getByTestId("HelpRequestsForm-teamId");
            const tableOrBreakoutRoomField = screen.getByTestId("HelpRequestsForm-tableOrBreakoutRoom");
            const requestTimeField = screen.getByTestId("HelpRequestsForm-requestTime");
            const explanationField = screen.getByTestId("HelpRequestsForm-explanation");
            const solvedField = screen.getByTestId("HelpRequestsForm-solved");
            const submitButton = screen.getByTestId("HelpRequestsForm-submit");


            expect(idField).toHaveValue("17");
            expect(requesterEmailField).toHaveValue("example@ucsb.edu");
            expect(teamIdFieldField).toHaveValue("f23-6pm-1");
            expect(tableOrBreakoutRoomField).toHaveValue("2");
            expect(requestTimeField).toHaveValue("2022-02-02T00:00");
            expect(explanationField).toHaveValue("sample");
            expect(solvedField).not.toBeChecked();
            expect(submitButton).toBeInTheDocument();

            fireEvent.change(requesterEmailField, { target: { value: 'example1@ucsb.edu' } });
            fireEvent.change(teamIdFieldField, { target: { value: 'f23-6pm-2' } });
            fireEvent.change(tableOrBreakoutRoomField, { target: { value: '3' } });
            fireEvent.change(requestTimeField, { target: { value: '2022-02-03T00:00' } });
            fireEvent.change(explanationField, { target: { value: 'sample1' } });
            fireEvent.click(solvedField);
            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toBeCalled());
            expect(mockToast).toBeCalledWith("HelpRequest Updated - id: 17 teamId: f23-6pm-2");
            expect(mockNavigate).toBeCalledWith({ "to": "/HelpRequest" });

            expect(axiosMock.history.put.length).toBe(1); // times called
            expect(axiosMock.history.put[0].params).toEqual({ id: 17 });
            expect(axiosMock.history.put[0].data).toBe(JSON.stringify({
                requesterEmail: "example1@ucsb.edu",
                teamId: "f23-6pm-2",
                tableOrBreakoutRoom: "3",
                requestTime: "2022-02-03T00:00",
                explanation: "sample1",
                solved: true
            })); // posted object

        });

       
    });
});


