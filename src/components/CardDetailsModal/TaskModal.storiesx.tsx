// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { CardDetailsModal } from "./CardDetailsModal";
import { useState } from "react";
import { TaskStore } from "src/stores/task.store";
import { AppStore } from "src/stores/app.store";
import { ListStore } from "src/stores/list.store";
import { Button } from "@mui/material";

const meta = {
  title: "Components/TaskModal",
  component: CardDetailsModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof CardDetailsModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [task] = useState(createTask);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Toggle Modal</Button>
        <CardDetailsModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          task={task}
        />
      </div>
    );
  },
  args: {
    isOpen: true,
    onClose: fn(),
    task: {} as TaskStore,
  },
};

function createTask() {
  const app = new AppStore();
  app.addList(ListStore.fromSnapshot({ id: "todo", label: "To Do" }));
  app.addList(
    ListStore.fromSnapshot({ id: "in-progress", label: "In Progress" })
  );
  app.addList(ListStore.fromSnapshot({ id: "done", label: "Done" }));
  app.addTask(
    TaskStore.fromSnapshot({
      id: "1",
      title: "Create wireframes",
      activities: [],
      description: "",
      listId: "todo",
      position: 10,
    })
  );

  app.addTask(
    TaskStore.fromSnapshot({
      id: "2",
      title: "Implement authentication",
      activities: [],
      description: "",
      listId: "todo",
      position: 30,
    })
  );

  const task = app.addTask(
    TaskStore.fromSnapshot({
      id: "3",
      title: "Design database schema",
      listId: "todo",
      position: 20,
      description:
        "**This** task [involves]() implementing a comprehensive authentication and authorization system using Keycloak to ensure secure access to the application. It requires setting up Keycloak as an identity provider, configuring realms, clients, and roles, and integrating it with both the frontend and backend. The backend should verify tokens and enforce role-based access control (RBAC) to protect sensitive API endpoints. Additionally, the frontend should handle user sessions, token refresh mechanisms, and role-based UI rendering. Proper logging, error handling, and security best practices must be followed to prevent vulnerabilities such as token leaks or unauthorized access. Finally, thorough testing should be conducted to validate the authentication flow, session persistence, and access restrictions across different user roles.",
      activities: [
        {
          id: "1",
          type: "action",
          action: "update",
          date: "2022-01-01T00:00:00.000Z",
          field: "title",
          oldValue: "TODO: Design database schema",
          newValue: "Design database schema",
          authorId: "john-wick",
        },
        {
          id: "2",
          type: "comment",
          date: "2022-01-01T19:00:00.000Z",
          comment:
            "**This task** is a `critical` part of the project. It requires careful planning and execution to ensure that the database schema is efficient, scalable, and secure. The schema should be designed to support the application's data model, business logic, and performance requirements. It should also consider future changes, data migrations, and database maintenance tasks. The database design should be documented and reviewed by the team to ensure that it meets the project's requirements and quality standards.",
          authorId: "tony-stark",
        },
        {
          id: "3",
          type: "action",
          action: "update",
          date: "2022-01-02T10:00:00.000Z",
          field: "position",
          oldValue: 1,
          newValue: 2,
          authorId: "neo",
        },
        {
          id: "4",
          type: "action",
          action: "update",
          date: "2022-01-02T12:00:00.000Z",
          field: "description",
          oldValue: "",
          newValue: "Add database indexing for performance",
          authorId: "morpheus",
        },
        {
          id: "5",
          type: "comment",
          date: "2022-01-02T15:30:00.000Z",
          comment: "Reviewed and approved changes for the description update.",
          authorId: "trinity",
        },
        {
          id: "6",
          type: "action",
          action: "update",
          date: "2022-01-03T09:00:00.000Z",
          field: "listId",
          oldValue: "backlog",
          newValue: "in-progress",
          authorId: "agent-smith",
        },
        {
          id: "7",
          type: "comment",
          date: "2022-01-03T10:30:00.000Z",
          comment: "Task moved to in-progress list.",
          authorId: "john-wick",
        },
      ],
    })
  );

  return task;
}
