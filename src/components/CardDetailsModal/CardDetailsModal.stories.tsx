/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, waitFor, within } from "@storybook/test";
import { CardDetailsModal } from "./CardDetailsModal";
import { useEffect, useState } from "react";
import { ApiProvider } from "../ApiProvider";
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

export const Basic: Story = {
  render: () => {
    const userId = "Santa Claus";
    const databaseName = "test";
    const [cardId, setCardId] = useState<string | null>(null);
    useEffect(() => {
      const start = async () => {
        const api = new Api({
          databaseName,
          userId,
          clearDatabaseOnInit: true,
        });

        const board = await api.board.create({
          title: "Board 1",
          description: "This is a board description.",
        });

        const list = await api.list.create({
          title: "To Do",
          boardId: board.id,
        });

        await api.list.create({
          title: "Doing",
          boardId: board.id,
        });

        const card = await api.card.create({
          title: "Card 1",
          listId: list.id,
          position: 10,
        });
        if (!card) return;
        setCardId(card.id);
      };
      start();
    }, []);

    return (
      <div>
        <ApiProvider databaseName={databaseName} userId={userId}>
          {cardId && (
            <CardDetailsModal
              isOpen={true}
              onClose={() => {}}
              cardId={cardId}
            />
          )}
        </ApiProvider>
      </div>
    );
  },
  // play: async ({ canvasElement }) => {
  //   await waitFor(() => within(canvasElement).getByTestId("card-details"));
  //   const card = within(canvasElement);
  //   expect(card.getByText("Card 1")).toBeInTheDocument();
  //   // write comment
  //   const editor = card.getByTestId("editor");
  //   await userEvent.click(editor);
  //   await userEvent.type(editor, "This is a comment.");
  //   // submit comment
  //   const commentButton = card.getByRole("button", { name: "Comment" });
  //   await userEvent.click(commentButton);
  //   expect(card.getByTestId("activity-comment-create")).toHaveTextContent(
  //     "This is a comment.",
  //   );
  // },
  args: {
    isOpen: true,
    onClose: fn(),
    cardId: "",
  },
};
