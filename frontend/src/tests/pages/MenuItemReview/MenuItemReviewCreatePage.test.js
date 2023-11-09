import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import MenuItemReviewCreatePage from "main/pages/MenuItemReview/MenuItemReviewCreatePage";
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

describe("MenuItemReviewCreatePage tests", () => {

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
                    <MenuItemReviewCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("when you fill in the form and hit submit, it makes a request to the backend", async () => {

        const queryClient = new QueryClient();
        const menuItemReview = {
            itemid: 2,
            email: "fake@gmail.com",
            stars: 3,
            localDateTime: "2022-02-02T00:00",
            comments: "myComment"
        };

        axiosMock.onPost("/api/menuitemreview/post").reply( 202, menuItemReview );

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <MenuItemReviewCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId("MenuItemReviewForm-itemid")).toBeInTheDocument();
        });

        const itemidField = screen.getByTestId("MenuItemReviewForm-itemid");
        const emailField = screen.getByTestId("MenuItemReviewForm-email");
        const starsField = screen.getByTestId("MenuItemReviewForm-stars");
        const localDateTimeField = screen.getByTestId("MenuItemReviewForm-localDateTime");
        const commentsField = screen.getByTestId("MenuItemReviewForm-comments");
        const submitButton = screen.getByTestId("MenuItemReviewForm-submit");

        fireEvent.change(itemidField, { target: { value: 2 } });
        fireEvent.change(emailField, { target: { value: "newEmail@fakemail.com" } });
        fireEvent.change(starsField, { target: { value: 3 } });
        fireEvent.change(localDateTimeField, { target: { value: '2022-02-02T00:00' } });
        fireEvent.change(commentsField, { target: { value: "new comment" } });

        expect(submitButton).toBeInTheDocument();

        fireEvent.click(submitButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));
        
        expect(axiosMock.history.post[0].params).toEqual(
            {
            "itemid": "2",
            "email": "newEmail@fakemail.com",
            "stars": "3",
            "localDateTime": "2022-02-02T00:00",
            "comments": "new comment"
        });

        expect(mockToast).toBeCalledWith("New menuItemReview Created - email: fake@gmail.com, posted at: 2022-02-02T00:00");
        expect(mockNavigate).toBeCalledWith({ "to": "/menuitemreview" });
    });


});

