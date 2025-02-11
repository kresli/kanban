// @ts-nocheck
/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";

import { Editor } from "./Editor";
import { useState } from "react";

const meta = {
  title: "Components/Editor",
  component: Editor,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Editor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {
    const [value, setValue] = useState<string>(
      "# Markdown Document Title\n\nThis is a sample markdown document. It demonstrates various markdown features such as headings, lists, code blocks, images, links, and blockquotes.\n\n## Table of Contents\n1. [Introduction](#introduction)\n2. [Features](#features)\n3. [Code Example](#code-example)\n4. [Lists and Links](#lists-and-links)\n5. [Images](#images)\n6. [Blockquotes](#blockquotes)\n7. [Conclusion](#conclusion)\n\n## Introduction\nMarkdown is a lightweight markup language that allows you to format text easily. It is widely used for creating documentation, README files, blogs, and more.\n\n## Features\n- **Bold** text\n- *Italic* text\n- `Inline code`\n- [Links](https://www.example.com)\n- Images and code blocks\n.",
    );
    return (
      <div style={{ width: "70vw", height: "50vw" }}>
        <Editor value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    onChange: () => {},
    value: "",
  },
};
