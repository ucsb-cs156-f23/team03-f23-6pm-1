const helpRequestFixtures = {
    oneHelpRequest:
    {
        "id": 1,
        "requesterEmail": "example@ucsb.edu",
        "teamId": "f23-6pm-1",
        "tableOrBreakoutRoom": "1",
        "requestTime": "2022-01-03T00:10:00",
        "explanation": "example",
        "solved": false      
    },
    threeHelpRequests:
    [
        {
            "id": 2,
            "requesterEmail": "example1@ucsb.edu",
            "teamId": "f23-6pm-2",
            "tableOrBreakoutRoom": "2",
            "requestTime": "2022-01-03T00:01:00",
            "explanation": "example1",
            "solved": false
          },
          {
            "id": 3,
            "requesterEmail": "example2@ucsb.edu",
            "teamId": "f23-6pm-3",
            "tableOrBreakoutRoom": "3",
            "requestTime": "2022-01-03T00:00:01",
            "explanation": "example2",
            "solved": false
          },
          {
            "id": 4,
            "requesterEmail": "example3@ucsb.edu",
            "teamId": "f23-6pm-4",
            "tableOrBreakoutRoom": "4",
            "requestTime": "2022-01-03T00:00:10",
            "explanation": "example3",
            "solved": false
          }
        
    ]
};

export { helpRequestFixtures };