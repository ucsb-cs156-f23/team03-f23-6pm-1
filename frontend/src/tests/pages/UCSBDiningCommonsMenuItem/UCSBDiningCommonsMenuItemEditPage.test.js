import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import UCSBDiningCommonsMenuItemEditPage from "main/pages/UCSBDiningCommonsMenuItem/UCSBDiningCommonsMenuItemEditPage";

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
            id: 1
        }),
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("UCSBDiningCommonsMenuItemEditPage tests", () => {

    describe("when the backend doesn't return data", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/UCSBDiningCommonsMenuItem", { params: { id: 1 } }).timeout();
        });

        const queryClient = new QueryClient();
        test("renders header but table is not present", async () => {

            const restoreConsole = mockConsole();

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <UCSBDiningCommonsMenuItemEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
            await screen.findByText("Edit UCSBDiningCommonsMenuItem");
            expect(screen.queryByTestId("UCSBDiningCommonsMenuItemForm-quarterYYYYQ")).not.toBeInTheDocument();
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
            axiosMock.onGet("/api/UCSBDiningCommonsMenuItem", { params: { id: 1 } }).reply(200, {
                id: 1,
                diningCommonsCode: 'DC1',
                name: "item1",
                station: "station1"
            });
            axiosMock.onPut('/api/UCSBDiningCommonsMenuItem').reply(200, {
                id: "1",
                diningCommonsCode: 'DC2',
                name: "item1",
                station: "station2"
            });
        });

        const queryClient = new QueryClient();
        test("renders without crashing", () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <UCSBDiningCommonsMenuItemEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
        });

        test("Is populated with the data provided", async () => {

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <UCSBDiningCommonsMenuItemEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await screen.findByTestId("UCSBDiningCommonsMenuItemForm-diningCommonsCode");

            const idField = screen.getByTestId("UCSBDiningCommonsMenuItemForm-id");
            const diningCommonsCodeField = screen.getByTestId("UCSBDiningCommonsMenuItemForm-diningCommonsCode");
            const nameField = screen.getByTestId("UCSBDiningCommonsMenuItemForm-name");
            const stationField = screen.getByTestId("UCSBDiningCommonsMenuItemForm-station");
            const submitButton = screen.getByTestId("UCSBDiningCommonsMenuItemForm-submit");

            expect(idField).toHaveValue("1");
            expect(diningCommonsCodeField).toHaveValue("DC1");
            expect(nameField).toHaveValue("item1");
            expect(stationField).toHaveValue("station1");
            expect(submitButton).toBeInTheDocument();
        });

        test("Changes when you click Update", async () => {

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <UCSBDiningCommonsMenuItemEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await screen.findByTestId("UCSBDiningCommonsMenuItemForm-diningCommonsCode");

            const idField = screen.getByTestId("UCSBDiningCommonsMenuItemForm-id");
            const diningCommonsCodeField = screen.getByTestId("UCSBDiningCommonsMenuItemForm-diningCommonsCode");
            const nameField = screen.getByTestId("UCSBDiningCommonsMenuItemForm-name");
            const stationField = screen.getByTestId("UCSBDiningCommonsMenuItemForm-station");
            const submitButton = screen.getByTestId("UCSBDiningCommonsMenuItemForm-submit");

            expect(idField).toHaveValue("1");
            expect(diningCommonsCodeField).toHaveValue("DC1");
            expect(nameField).toHaveValue("item1");
            expect(stationField).toHaveValue("station1");

            expect(submitButton).toBeInTheDocument();

            fireEvent.change(diningCommonsCodeField, { target: { value: 'DC2' } })
            fireEvent.change(nameField, { target: { value: 'item1' } })
            fireEvent.change(stationField, { target: { value: "station2" } })

            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toBeCalled());
            expect(mockToast).toBeCalledWith("UCSBDiningCommonsMenuItem Updated - id: 1 name: item1");
            expect(mockNavigate).toBeCalledWith({ "to": "/UCSBDiningCommonsMenuItem" });

            expect(axiosMock.history.put.length).toBe(1); // times called
            expect(axiosMock.history.put[0].params).toEqual({ id: 1 });
            expect(axiosMock.history.put[0].data).toBe(JSON.stringify({
                diningCommonsCode: 'DC2',
                name: "item1",
                station: "station2"
            })); // posted object

        });

       
    });
});


