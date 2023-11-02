const recommendationRequestFixtures = {
    oneRequest: {
        "id": 1,
        "requesterEmail": "apchau@ucsb.edu",
        "professorEmail": "pconrad@ucsb.edu",
        "explanation": "Request explanation goes here",
        "dateRequested": "2022-03-08T12:00:00",
        "dateNeeded": "2023-01-05T12:00:00",
        "done": true
    },
    threeRequests: [
        {
            "id": 1,
            "requesterEmail": "apchau@ucsb.edu",
            "professorEmail": "pconrad@ucsb.edu",
            "explanation": "Request explanation goes here",
            "dateRequested": "2022-03-08T12:00:00",
            "dateNeeded": "2023-01-05T12:00:00",
            "done": true
        },
        {
            "id": 2,
            "requesterEmail": "random@ucsb.edu",
            "professorEmail": "otherguy@ucsb.edu",
            "explanation": "For middle school",
            "dateRequested": "2022-12-10T12:00:00",
            "dateNeeded": "2023-08-05T12:00:00",
            "done": true
        },
        {
            "id": 3,
            "requesterEmail": "cat@ucsb.edu",
            "professorEmail": "dog@ucsb.edu",
            "explanation": "cat and dog",
            "dateRequested": "2022-01-10T12:00:00",
            "dateNeeded": "2023-08-27T12:00:00",
            "done": true
        }
    ]
};


export { recommendationRequestFixtures };