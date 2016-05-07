/* eslint-disable */
export default {
  "data": {
    "id": "1",
    "type": "projects",
    "attributes": {
      "created-at": "2016-03-28T16:45:03.806Z",
      "updated-at": "2016-03-28T16:45:03.806Z",
      "title": "Sample Project"
    },
    "relationships": {
      "checklists": {
        "data": [
          {
            "id": "3",
            "type": "checklists"
          }
        ]
      },
      "user": {
        "data": {
          "id": "1",
          "type": "users"
        }
      }
    }
  },
  "included": [
    {
      "id": "3",
      "type": "checklists",
      "attributes": {
        "created-at": "2016-04-03T15:11:13.985Z",
        "updated-at": "2016-04-03T15:13:54.852Z",
        "title": "Everyday",
        "test-suite": [
          "Exercise 🏋",
          "Less Ecig 🚭"
        ],
        "last_version": 1,
      },
      "relationships": {
        "project": {
          "data": {
            "id": "1",
            "type": "projects"
          }
        },
        "versions": {
          "data": [
            {
              "id": "1",
              "type": "versions"
            }
          ]
        },
        "last_version": {
          "data": {
            "id": "1",
            "type": "versions"
          }
        }
      }
    },
    {
      "id": "1",
      "type": "users",
      "attributes": {
        "email": "pierre@muxumuxu.com"
      }
    }
  ]
}
