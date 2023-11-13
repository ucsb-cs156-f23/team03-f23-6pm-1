import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import MenuItemReviewEditPage from "main/pages/MenuItemReview/MenuItemReviewEditPage";

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

describe("MenuItemReviewEditPage tests", () => {

    describe("when the backend doesn't return data", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/menuitemreview", { params: { id: 1 } }).timeout();
        });

        const queryClient = new QueryClient();
        test("renders header but table is not present", async () => {

            const restoreConsole = mockConsole();

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <MenuItemReviewEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
            await screen.findByText("Edit MenuItemReview");
            expect(screen.queryByTestId("MenuItemReviewForm-id")).not.toBeInTheDocument();
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
            axiosMock.onGet("/api/menuitemreview", { params: { id: 1 } }).reply(200, {
                id: 1,
                itemid: 2,
                email: "fake@gmail.com",
                stars: 3,
                localDateTime: "2022-02-02T00:00",
                comments: "myComment"
            });
            axiosMock.onPut('/api/menuitemreview').reply(200, {
                id: "1",
                itemid: '3',
                email: "faker@gmail.com",
                stars: '4',
                localDateTime: "2022-12-25T08:00",
                comments: "hisComment"
            });
        });

        const queryClient = new QueryClient();
        test("renders without crashing", () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <MenuItemReviewEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
        });
        
        test("Is populated with the data provided", async () => {

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <MenuItemReviewEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await screen.findByTestId("MenuItemReviewForm-itemid");
            
            
            const idField = screen.getByTestId("MenuItemReviewForm-id");
            const itemidField = screen.getByTestId("MenuItemReviewForm-itemid");
            const emailField = screen.getByTestId("MenuItemReviewForm-email");
            const starsField = screen.getByTestId("MenuItemReviewForm-stars");
            const localDateTimeField = screen.getByTestId("MenuItemReviewForm-localDateTime");
            const commentsField = screen.getByTestId("MenuItemReviewForm-comments");
            const submitButton = screen.getByTestId("MenuItemReviewForm-submit");

            expect(idField).toHaveValue("1");
            expect(itemidField).toHaveValue("2");
            expect(emailField).toHaveValue("fake@gmail.com");
            expect(starsField).toHaveValue("3");
            expect(localDateTimeField).toHaveValue("2022-02-02T00:00");
            expect(commentsField).toHaveValue("myComment");
            expect(submitButton).toBeInTheDocument();
        });
        
        test("Changes when you click Update", async () => {

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <MenuItemReviewEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
                
            await waitFor(() => {
                expect(screen.getByTestId("MenuItemReviewForm-itemid")).toBeInTheDocument();
            });

            const idField = screen.getByTestId("MenuItemReviewForm-id");
            const itemidField = screen.getByTestId("MenuItemReviewForm-itemid");
            const emailField = screen.getByTestId("MenuItemReviewForm-email");
            const starsField = screen.getByTestId("MenuItemReviewForm-stars");
            const localDateTimeField = screen.getByTestId("MenuItemReviewForm-localDateTime");
            const commentsField = screen.getByTestId("MenuItemReviewForm-comments");
            const submitButton = screen.getByTestId("MenuItemReviewForm-submit");

            expect(idField).toHaveValue("1");
            expect(itemidField).toHaveValue("2");
            expect(emailField).toHaveValue("fake@gmail.com");
            expect(starsField).toHaveValue("3");
            expect(localDateTimeField).toHaveValue("2022-02-02T00:00");
            expect(commentsField).toHaveValue("myComment");

            expect(submitButton).toBeInTheDocument();

            fireEvent.change(itemidField, { target: { value: "3" } })
            fireEvent.change(emailField, { target: { value: "faker@gmail.com" } })
            fireEvent.change(starsField, { target: { value: "4" } })
            fireEvent.change(localDateTimeField, { target: { value: "2022-12-25T08:00" } })
            fireEvent.change(commentsField, { target: { value: "hisComment" } })

            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toBeCalled());
            expect(mockToast).toBeCalledWith("MenuItemReview Updated - id: 1 email: faker@gmail.com, posted at: 2022-12-25T08:00");
            expect(mockNavigate).toBeCalledWith({ "to": "/menuitemreview" });

            expect(axiosMock.history.put.length).toBe(1); // times called
            expect(axiosMock.history.put[0].params).toEqual({ id: 1 });
            expect(axiosMock.history.put[0].data).toBe(JSON.stringify({
                itemId: '3',
                email: "faker@gmail.com",
                stars: '4',
                comments: "hisComment",
                timestamp: "2022-12-25T08:00"
            })); // posted object

        });
    });
});


