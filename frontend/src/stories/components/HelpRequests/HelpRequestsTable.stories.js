import React from 'react';
import { helpRequestFixtures} from 'fixtures/helpRequestFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';
import { rest } from "msw";
import HelpRequestsTable from 'main/components/HelpRequests/HelpRequestsTable';

export default {
    title: 'components/HelpRequests/HelpRequestsTable',
    component: HelpRequestsTable
};

const Template = (args) => {
    return (
        <HelpRequestsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    requests: []
};

export const ThreeItemsOrdinaryUser = Template.bind({});

ThreeItemsOrdinaryUser.args = {
    requests: helpRequestFixtures.threeHelpRequests,
    currentUser: currentUserFixtures.userOnly,
};

export const ThreeItemsAdminUser = Template.bind({});
ThreeItemsAdminUser.args = {
    requests: helpRequestFixtures.threeHelpRequests,
    currentUser: currentUserFixtures.adminUser,
}

ThreeItemsAdminUser.parameters = {
    msw: [
        rest.delete('/api/HelpRequest', (req, res, ctx) => {
            window.alert("DELETE: " + JSON.stringify(req.url));
            return res(ctx.status(200),ctx.json({}));
        }),
    ]
};
