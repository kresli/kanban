import { Board_Schema } from "src/database/schemas/board.schema";
import { List_Schema } from "src/database/schemas/list.schema";
import { Card_Schema } from "src/database/schemas/card.schema";

export const activities: unknown[] = [];
// const activities: Activity_Schema[] = [
//   {
//     id: "activity-2",
//     activityType: "card_comment_create",
//     createdAt: "2022-01-01T19:00:00.000Z",
//     payload: {
//       comment:
//         "**This card** is a `critical` part of the project. It requires careful planning and execution to ensure that the database schema is efficient, scalable, and secure. The schema should be designed to support the application's data model, business logic, and performance requirements. It should also consider future changes, data migrations, and database maintenance cards. The database design should be documented and reviewed by the team to ensure that it meets the project's requirements and quality standards.",
//     },
//     authorId: "tony-stark",
//     cardId: "card-1",
//   },
//   {
//     id: "activity-1",
//     activityType: "card_update",
//     createdAt: "2022-01-01T00:00:00.000Z",
//     cardId: "card-1",
//     payload: {
//       title: {
//         oldValue: "TODO: Design database schema",
//         newValue: "Design database schema",
//       },
//     },
//     authorId: "john-wick",
//   },
//   {
//     id: "activity-3",
//     activityType: "card_update",
//     createdAt: "2022-01-02T10:00:00.000Z",
//     cardId: "card-1",
//     payload: {
//       position: {
//         oldValue: 1,
//         newValue: 2,
//       },
//     },
//     authorId: "neo",
//   },
//   {
//     id: "activity-5",
//     activityType: "card_comment_create",
//     createdAt: "2022-01-02T15:30:00.000Z",
//     authorId: "trinity",
//     cardId: "card-1",
//     payload: {
//       comment: "Reviewed and approved changes for the description update.",
//     },
//   },
//   {
//     id: "activity-6",
//     activityType: "card_update",
//     createdAt: "2022-01-03T09:00:00.000Z",
//     cardId: "card-1",
//     payload: {
//       listId: {
//         oldValue: "todo",
//         newValue: "in-progress",
//       },
//     },
//     authorId: "agent-smith",
//   },
//   {
//     id: "activity-7",
//     activityType: "card_comment_create",
//     createdAt: "2022-01-03T10:30:00.000Z",
//     cardId: "card-1",
//     payload: {
//       comment: "Card moved to in-progress list.",
//     },
//     authorId: "john-wick",
//   },
// ];

const cards: Card_Schema[] = [];
// [
//   {
//     id: "card-1",
//     title: "Markdown - Set up project structure",
//     listId: "todo",
//     position: 1,
//     authorId: "neo",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "card-2",
//     title:
//       "Install dependencies including React, Express, Mongoose, and other necessary packages",
//     listId: "todo",
//     position: 2,
//     authorId: "morpheus",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "card-3",
//     title: "Design database schema",
//     listId: "todo",
//     position: 3,
//     authorId: "john-wick",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "card-4",
//     title: "Implement authentication with Keycloak",
//     listId: "todo",
//     position: 4,
//     authorId: "trinity",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "card-5",
//     title: "Develop API endpoints for card management with CRUD operations",
//     listId: "todo",
//     position: 5,
//     authorId: "agent-smith",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "card-6",
//     title: "Build card list UI",
//     listId: "todo",
//     position: 6,
//     authorId: "trinity",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "card-7",
//     title: "Implement drag-and-drop",
//     listId: "todo",
//     position: 7,
//     authorId: "morpheus",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "card-8",
//     title:
//       "Connect frontend with backend and ensure real-time synchronization of card changes",
//     listId: "todo",
//     position: 8,
//     authorId: "neo",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "card-9",
//     title: "Optimize performance",
//     listId: "todo",
//     position: 9,
//     authorId: "agent-smith",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "card-10",
//     title: "Write tests",
//     listId: "todo",
//     position: 10,
//     authorId: "john-wick",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "card-11",
//     title:
//       "Deploy backend with Docker and configure a robust setup for production",
//     listId: "inprogress",
//     position: 1,
//     authorId: "trinity",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "card-12",
//     title: "Implement real-time updates",
//     listId: "inprogress",
//     position: 2,
//     authorId: "morpheus",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "card-13",
//     title: "Configure CI/CD pipeline",
//     listId: "inprogress",
//     position: 3,
//     authorId: "agent-smith",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "card-14",
//     title:
//       "Style UI with Material-UI components to enhance user experience and improve accessibility",
//     listId: "inprogress",
//     position: 4,
//     authorId: "neo",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "card-15",
//     title: "Integrate Swagger",
//     listId: "inprogress",
//     position: 5,
//     authorId: "trinity",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "card-16",
//     title: "Fix drag-and-drop issues",
//     listId: "inprogress",
//     position: 6,
//     authorId: "morpheus",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "card-17",
//     title: "Deploy frontend",
//     listId: "done",
//     position: 1,
//     authorId: "john-wick",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "card-18",
//     title: "Optimize database queries",
//     listId: "done",
//     position: 2,
//     authorId: "agent-smith",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "card-19",
//     title: "Write end-to-end tests",
//     listId: "done",
//     position: 3,
//     authorId: "neo",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "card-20",
//     title:
//       "Set up monitoring and logging with Winston for better error tracking and debugging in production",
//     listId: "done",
//     position: 4,
//     authorId: "morpheus",
//     createdAt: new Date().toISOString(),
//   },
// ];

const lists: List_Schema[] = [];
//  [
//   {
//     id: "todo",
//     title: "To Do",
//     authorId: "john-wick",
//     position: 0,
//     createdAt: new Date().toISOString(),
//     boardId: "my-board",
//   },
//   {
//     id: "inprogress",
//     title: "In Progress",
//     authorId: "john-wick",
//     position: 1,
//     createdAt: new Date().toISOString(),
//     boardId: "my-board",
//   },
//   {
//     id: "done",
//     title: "Done",
//     authorId: "john-wick",
//     position: 2,
//     createdAt: new Date().toISOString(),
//     boardId: "my-board",
//   },
// ];

const boards: Board_Schema[] = [];
// [
//   {
//     id: "my-board",
//     title: "My Board",
//     authorId: "john-wick",
//     description: "This is my board",
//     createdAt: new Date().toISOString(),
//   },
// ];

export const mockedDbData = {
  activities,
  cards,
  lists,
  boards,
};
