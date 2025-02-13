import { Board_Schema } from "src/database/schemas/board.schema";
import { List_Schema } from "src/database/schemas/list.schema";
import { Card_Schema } from "src/database/schemas/card.schema";
import { Commit_Schema } from "src/database/schemas/commit.schema";
import { RecordType } from "src/database/schemas/record-type";

const commits: Commit_Schema[] = [];

const cards: Card_Schema[] = [
  {
    id: "card-1",
    type: RecordType.CARD,
    title: "Markdown - Set up project structure",
    listId: "todo",
    position: 1,
    authorId: "neo",
    createdAt: new Date().toISOString(),
  },
  {
    id: "card-2",
    type: RecordType.CARD,
    title:
      "Install dependencies including React, Express, Mongoose, and other necessary packages",
    listId: "todo",
    position: 2,
    authorId: "morpheus",
    createdAt: new Date().toISOString(),
  },
  {
    id: "card-3",
    type: RecordType.CARD,
    title: "Design database schema",
    listId: "todo",
    position: 3,
    authorId: "john-wick",
    createdAt: new Date().toISOString(),
  },
  {
    id: "card-4",
    type: RecordType.CARD,
    title: "Implement authentication with Keycloak",
    listId: "todo",
    position: 4,
    authorId: "trinity",
    createdAt: new Date().toISOString(),
  },
  {
    id: "card-5",
    type: RecordType.CARD,
    title: "Develop API endpoints for card management with CRUD operations",
    listId: "todo",
    position: 5,
    authorId: "agent-smith",
    createdAt: new Date().toISOString(),
  },
  {
    id: "card-6",
    type: RecordType.CARD,
    title: "Build card list UI",
    listId: "todo",
    position: 6,
    authorId: "trinity",
    createdAt: new Date().toISOString(),
  },
  {
    id: "card-7",
    type: RecordType.CARD,
    title: "Implement drag-and-drop",
    listId: "todo",
    position: 7,
    authorId: "morpheus",
    createdAt: new Date().toISOString(),
  },
  {
    id: "card-8",
    type: RecordType.CARD,
    title:
      "Connect frontend with backend and ensure real-time synchronization of card changes",
    listId: "todo",
    position: 8,
    authorId: "neo",
    createdAt: new Date().toISOString(),
  },
  {
    id: "card-9",
    type: RecordType.CARD,
    title: "Optimize performance",
    listId: "todo",
    position: 9,
    authorId: "agent-smith",
    createdAt: new Date().toISOString(),
  },
  {
    id: "card-10",
    type: RecordType.CARD,
    title: "Write tests",
    listId: "todo",
    position: 10,
    authorId: "john-wick",
    createdAt: new Date().toISOString(),
  },
  {
    id: "card-11",
    type: RecordType.CARD,
    title:
      "Deploy backend with Docker and configure a robust setup for production",
    listId: "inprogress",
    position: 1,
    authorId: "trinity",
    createdAt: new Date().toISOString(),
  },
  {
    id: "card-12",
    type: RecordType.CARD,
    title: "Implement real-time updates",
    listId: "inprogress",
    position: 2,
    authorId: "morpheus",
    createdAt: new Date().toISOString(),
  },
  {
    id: "card-13",
    type: RecordType.CARD,
    title: "Configure CI/CD pipeline",
    listId: "inprogress",
    position: 3,
    authorId: "agent-smith",
    createdAt: new Date().toISOString(),
  },
  {
    id: "card-14",
    type: RecordType.CARD,
    title:
      "Style UI with Material-UI components to enhance user experience and improve accessibility",
    listId: "inprogress",
    position: 4,
    authorId: "neo",
    createdAt: new Date().toISOString(),
  },
  {
    id: "card-15",
    type: RecordType.CARD,
    title: "Integrate Swagger",
    listId: "inprogress",
    position: 5,
    authorId: "trinity",
    createdAt: new Date().toISOString(),
  },
  {
    id: "card-16",
    type: RecordType.CARD,
    title: "Fix drag-and-drop issues",
    listId: "inprogress",
    position: 6,
    authorId: "morpheus",
    createdAt: new Date().toISOString(),
  },
  {
    id: "card-17",
    type: RecordType.CARD,
    title: "Deploy frontend",
    listId: "done",
    position: 1,
    authorId: "john-wick",
    createdAt: new Date().toISOString(),
  },
  {
    id: "card-18",
    type: RecordType.CARD,
    title: "Optimize database queries",
    listId: "done",
    position: 2,
    authorId: "agent-smith",
    createdAt: new Date().toISOString(),
  },
  {
    id: "card-19",
    type: RecordType.CARD,
    title: "Write end-to-end tests",
    listId: "done",
    position: 3,
    authorId: "neo",
    createdAt: new Date().toISOString(),
  },
  {
    id: "card-20",
    type: RecordType.CARD,
    title:
      "Set up monitoring and logging with Winston for better error tracking and debugging in production",
    listId: "done",
    position: 4,
    authorId: "morpheus",
    createdAt: new Date().toISOString(),
  },
];

const lists: List_Schema[] = [
  {
    id: "todo",
    type: RecordType.LIST,
    title: "To Do",
    authorId: "john-wick",
    position: 0,
    createdAt: new Date().toISOString(),
    boardId: "my-board",
  },
  {
    id: "inprogress",
    type: RecordType.LIST,
    title: "In Progress",
    authorId: "john-wick",
    position: 1,
    createdAt: new Date().toISOString(),
    boardId: "my-board",
  },
  {
    id: "done",
    type: RecordType.LIST,
    title: "Done",
    authorId: "john-wick",
    position: 2,
    createdAt: new Date().toISOString(),
    boardId: "my-board",
  },
];

const boards: Board_Schema[] = [
  {
    id: "my-board",
    type: RecordType.BOARD,
    title: "My Board",
    authorId: "john-wick",
    description: "This is my board",
    createdAt: new Date().toISOString(),
  },
];

export const mockedDbData = {
  activities: commits,
  cards,
  lists,
  boards,
};
