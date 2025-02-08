// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react";
import { Board } from "./Board";
import { TaskStore } from "src/stores/task.store";
import { useState } from "react";
import { AppStore } from "src/stores/app.store";
import { ListStore } from "src/stores/list.store";

const meta = {
  title: "Components/Board",
  component: Board,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Board>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    app: {} as AppStore,
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [task] = useState(createApp);
    return (
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}>
        <Board app={task} />;
      </div>
    );
  },
};

function createApp() {
  const app = new AppStore();
  app.addList(ListStore.fromSnapshot({ id: "todo", label: "To Do" }));
  app.addList(
    ListStore.fromSnapshot({ id: "in-progress", label: "In Progress" })
  );
  app.addList(ListStore.fromSnapshot({ id: "done", label: "Done" }));
  mockedTasks.forEach((task) => {
    app.addTask(TaskStore.fromDto(task));
  });

  return app;
}

import { Task_DTO } from "shared/types";

export const mockedTasks: Task_DTO[] = [
  {
    _id: "231",
    title: "MARKDOWN Design database schema",
    list_id: "todo",
    position: 1,
    description:
      "**MARKDOWN** task [involves]() implementing a comprehensive authentication and authorization system using Keycloak to ensure secure access to the application. It requires setting up Keycloak as an identity provider, configuring realms, clients, and roles, and integrating it with both the frontend and backend. The backend should verify tokens and enforce role-based access control (RBAC) to protect sensitive API endpoints. Additionally, the frontend should handle user sessions, token refresh mechanisms, and role-based UI rendering. Proper logging, error handling, and security best practices must be followed to prevent vulnerabilities such as token leaks or unauthorized access. Finally, thorough testing should be conducted to validate the authentication flow, session persistence, and access restrictions across different user roles.",
    activities: [
      {
        _id: "1",
        type: "action",
        action: "update",
        date: "2022-01-01T00:00:00.000Z",
        field: "title",
        old_value: "TODO: Design database schema",
        new_value: "Design database schema",
        author_id: "john-wick",
      },
      {
        _id: "2",
        type: "comment",
        date: "2022-01-01T19:00:00.000Z",
        comment:
          "**This task** is a `critical` part of the project. It requires careful planning and execution to ensure that the database schema is efficient, scalable, and secure. The schema should be designed to support the application's data model, business logic, and performance requirements. It should also consider future changes, data migrations, and database maintenance tasks. The database design should be documented and reviewed by the team to ensure that it meets the project's requirements and quality standards.",
        author_id: "tony-stark",
      },
      {
        _id: "3",
        type: "action",
        action: "update",
        date: "2022-01-02T10:00:00.000Z",
        field: "position",
        old_value: 1,
        new_value: 2,
        author_id: "neo",
      },
      {
        _id: "4",
        type: "action",
        action: "update",
        date: "2022-01-02T12:00:00.000Z",
        field: "description",
        old_value: "",
        new_value: "Add database indexing for performance",
        author_id: "morpheus",
      },
      {
        _id: "5",
        type: "comment",
        date: "2022-01-02T15:30:00.000Z",
        comment: "Reviewed and approved changes for the description update.",
        author_id: "trinity",
      },
      {
        _id: "6",
        type: "action",
        action: "update",
        date: "2022-01-03T09:00:00.000Z",
        field: "list_id",
        old_value: "backlog",
        new_value: "in-progress",
        author_id: "agent-smith",
      },
      {
        _id: "7",
        type: "comment",
        date: "2022-01-03T10:30:00.000Z",
        comment: "Task moved to in-progress list.",
        author_id: "john-wick",
      },
    ],
    author_id: "john-wick",
  },
  {
    _id: "1",
    title: "Set up project structure",
    list_id: "todo",
    position: 1,
    activities: [],
    description:
      "Initialize the repository and set up the project folder structure.",
    author_id: "neo",
  },
  {
    _id: "2",
    title:
      "Install dependencies including React, Express, Mongoose, and other necessary packages",
    list_id: "todo",
    position: 2,
    activities: [],
    description:
      "Install necessary dependencies such as React, Express, and Mongoose.",
    author_id: "morpheus",
  },
  {
    _id: "3",
    title: "Design database schema",
    list_id: "todo",
    position: 3,
    activities: [],
    description: "Define the Mongoose schemas for tasks and lists.",
    author_id: "john-wick",
  },
  {
    _id: "4",
    title: "Implement authentication with Keycloak",
    list_id: "todo",
    position: 4,
    activities: [],
    description: "Integrate Keycloak authentication for secure user access.",
    author_id: "trinity",
  },
  {
    _id: "5",
    title: "Develop API endpoints for task management with CRUD operations",
    list_id: "todo",
    position: 5,
    activities: [],
    description: "Develop RESTful APIs for CRUD operations on tasks.",
    author_id: "agent-smith",
  },
  {
    _id: "6",
    title: "Build task list UI",
    list_id: "todo",
    position: 6,
    activities: [],
    description: "Create a React component to display task lists.",
    author_id: "morpheus",
  },
  {
    _id: "7",
    title: "Implement drag-and-drop",
    list_id: "todo",
    position: 7,
    activities: [],
    description: "Use Vanilla JS to enable drag-and-drop functionality.",
    author_id: "neo",
  },
  {
    _id: "8",
    title:
      "Connect frontend with backend and ensure real-time synchronization of task changes",
    list_id: "todo",
    position: 8,
    activities: [],
    description:
      "Ensure API calls properly fetch and update tasks in the database.",
    author_id: "trinity",
  },
  {
    _id: "9",
    title: "Optimize performance",
    list_id: "todo",
    position: 9,
    activities: [],
    description: "Improve frontend and backend performance where needed.",
    author_id: "agent-smith",
  },
  {
    _id: "10",
    title: "Write tests",
    list_id: "todo",
    position: 10,
    activities: [],
    description: "Write unit and integration tests to validate functionality.",
    author_id: "morpheus",
  },
  {
    _id: "11",
    title:
      "Deploy backend with Docker and configure a robust setup for production",
    list_id: "in-progress",
    position: 1,
    activities: [],
    description:
      "Containerize the backend using Docker and set up a Docker Compose file.",
    author_id: "neo",
  },
  {
    _id: "12",
    title: "Implement real-time updates",
    list_id: "in-progress",
    position: 2,
    activities: [],
    description: "Add real-time updates to task movement using WebSockets.",
    author_id: "trinity",
  },
  {
    _id: "13",
    title: "Configure CI/CD pipeline",
    list_id: "in-progress",
    position: 3,
    activities: [],
    description: "Set up GitHub Actions to automate testing and deployment.",
    author_id: "agent-smith",
  },
  {
    _id: "14",
    title:
      "Style UI with Material-UI components to enhance user experience and improve accessibility",
    list_id: "in-progress",
    position: 4,
    activities: [],
    description: "Enhance the frontend appearance with Material-UI components.",
    author_id: "morpheus",
  },
  {
    _id: "15",
    title: "Integrate Swagger",
    list_id: "in-progress",
    position: 5,
    activities: [],
    description: "Document API endpoints using Swagger.",
    author_id: "john-wick",
  },
  {
    _id: "16",
    title: "Fix drag-and-drop issues",
    list_id: "in-progress",
    position: 6,
    activities: [],
    description: "Resolve issues with task reordering and persistence.",
    author_id: "neo",
  },
  {
    _id: "17",
    title: "Deploy frontend",
    list_id: "done",
    position: 1,
    activities: [],
    description: "Host the frontend on Vercel or Netlify.",
    author_id: "trinity",
  },
  {
    _id: "18",
    title: "Optimize database queries",
    list_id: "done",
    position: 2,
    activities: [],
    description: "Improve MongoDB query performance by adding proper indexes.",
    author_id: "agent-smith",
  },
  {
    _id: "19",
    title: "Write end-to-end tests",
    list_id: "done",
    position: 3,
    activities: [],
    description: "Test full user flows with Cypress.",
    author_id: "morpheus",
  },
  {
    _id: "20",
    title:
      "Set up monitoring and logging with Winston for better error tracking and debugging in production",
    list_id: "done",
    position: 4,
    activities: [],
    description: "Set up logging with Winston or another tool to track errors.",
    author_id: "john-wick",
  },
];
