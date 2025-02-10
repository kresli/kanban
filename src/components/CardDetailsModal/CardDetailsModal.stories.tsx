/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { CardDetailsModal } from "./CardDetailsModal";
import { useEffect } from "react";
import { ApiProvider } from "../ApiProvider";
import { Database } from "src/database/database";
import { Api } from "src/api";

const meta = {
  title: "Components/CardDetailsModal",
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

function useDB(callback: (db: Database) => void) {
  useEffect(() => {
    const init = async () => {
      const db = new Database("test");
      await db.delete({ disableAutoOpen: false });
      callback(db);
    };
    init();
  }, [callback]);
}

export const Basic: Story = {
  render: () => {
    useEffect(() => {
      new Database("test").delete({ disableAutoOpen: false });
      const api = new Api("test");
      api.emitActivity({
        activityType: "board_create",
        authorId: "john-doe",
        boardId: "1",
        createdAt: new Date().toISOString(),
        id: api.generateId(),
        payload: {
          title: "Board 1",
          description: "This is a board description.",
          authorId: "john-doe",
          createdAt: new Date().toISOString(),
          id: "board-1",
        },
      });
      api.emitActivity({
        activityType: "list_create",
        authorId: "john-doe",
        createdAt: new Date().toISOString(),
        id: api.generateId(),
        payload: {
          title: "To Do",
          position: 1,
          authorId: "john-doe",
          boardId: "1",
          createdAt: new Date().toISOString(),
          id: "todo",
        },
      });
      api.emitActivity({
        activityType: "card_create",
        authorId: "john-doe",
        createdAt: new Date().toISOString(),
        id: api.generateId(),
        cardId: "card-1",
        payload: {
          title: "Card 12",
          description: "This is a card description.",
          authorId: "john-doe",
          listId: "todo",
          position: 10,
          id: "card-1",
        },
      });
    }, []);

    // useDB((db) => {
    //   db.boards.add({
    //     id: "1",
    //     title: "Board 1",
    //     description: "This is a board description.",
    //     authorId: "john-doe",
    //     createdAt: new Date().toISOString(),
    //   });
    //   db.lists.add({
    //     id: "todo",
    //     title: "To Do",
    //     position: 1,
    //     authorId: "john-doe",
    //     boardId: "1",
    //     createdAt: new Date().toISOString(),
    //   });
    //   db.cards.add({
    //     id: "1",
    //     title: "Card 1",
    //     description: "This is a card description.",
    //     authorId: "john-doe",
    //     listId: "todo",
    //     position: 10,
    //   });
    // });
    return (
      <div>
        <ApiProvider databaseName="test">
          <CardDetailsModal isOpen={true} onClose={() => {}} cardId="card-1" />
        </ApiProvider>
      </div>
    );
  },
  args: {
    isOpen: true,
    onClose: fn(),
    cardId: "1",
  },
};
