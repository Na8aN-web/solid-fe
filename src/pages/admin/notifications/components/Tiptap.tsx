import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import listleft from "../../../../assets/list-left.svg";
import numberedlist from "../../../../assets/numbered-list.svg";
import orderedlist from "../../../../assets/ordered-list.svg";
import rightIndent from "../../../../assets/right-indent.svg";
import leftIndent from "../../../../assets/left-indent.svg";
import pictureditor from "../../../../assets/content-picture.svg";
import linkeditor from "../../../../assets/linkeditor.svg";
import undo from "../../../../assets/undo.svg";
import redo from "../../../../assets/redo.svg";
import filedoc from "../../../../assets/file-doc.svg";
import videditor from "../../../../assets/videoeditor.svg";
import highlight from "../../../../assets/highlighteditor.svg";
import coloreditor from "../../../../assets/coloreditor.svg";
import paragraph from "../../../../assets/paragraph.svg";
// import heading from "../../../../assets/heading.svg";
// import Paragraph from "@tiptap/extension-paragraph";
// import Heading from "@tiptap/extension-heading";
// import Blockquote from "@tiptap/extension-blockquote";
// import CodeBlock from "@tiptap/extension-code-block";
import { Indent } from "./Indent";
import EmojiPicker from "emoji-picker-react";

const Tiptap = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [open, setOpen] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Strike,
      Highlight,
      Color,
      Link,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image,
      Indent,
    ],
    content: `
     <h1 class="message-title">Message Title!</h1>
     <hr />
  <span>Enter Text</span>
  `,
  });

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 1. Upload file to your server or a file host
    const formData = new FormData();
    formData.append("file", file);

    // Replace this with your own API endpoint
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    const fileUrl = data.url; // Example: 'https://your-cdn.com/uploads/mydoc.pdf'

    // 2. Insert link into the editor
    editor
      ?.chain()
      .focus()
      .setLink({ href: fileUrl })
      .insertContent(file.name)
      .run();
  };

  if (!editor) return null;

  return (
    <>
      <div className="p-4 border rounded-xl shadow bg-white">
        <div className="flex flex-wrap gap-2 pb-2 px-4 mb-4 w-full justify-between">
          {/* bold text */}
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className="font-bold"
          >
            B
          </button>

          {/* italic text */}
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className="italic"
          >
            i
          </button>

          {/* underline text */}
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className="underline"
          >
            U
          </button>

          {/* line through */}
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className="line-through"
          >
            S
          </button>

          {/* marker/highlighter */}
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
          >
            <img src={highlight} alt="" />
          </button>

          {/* Color picker */}
          <div>
            <input
              type="color"
              id="colorPicker"
              onInput={(e) =>
                editor.chain().focus().setColor(e.currentTarget.value).run()
              }
              className="hidden"
            />
            <label htmlFor="colorPicker" className="cursor-pointer">
              <img src={coloreditor} alt="" />
            </label>
          </div>

          {/* emoji picker */}
          <div>
            <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              🙂
            </button>
            {showEmojiPicker && (
              <div className="absolute z-50">
                <EmojiPicker
                  onEmojiClick={(emojiData) => {
                    editor.chain().focus().insertContent(emojiData.emoji).run();
                    setShowEmojiPicker(false);
                  }}
                />
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2"
            >
              <img src={paragraph} alt="Paragraph" className="w-auto" />
            </button>

            {open && (
              <div className="absolute mt-1 w-48 bg-white border rounded shadow">
                <div
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    editor.chain().focus().setParagraph().run();
                    setOpen(false);
                  }}
                >
                  <img src={paragraph} alt="" className="w-4 h-4" />
                  Paragraph
                </div>
                <div
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    editor.chain().focus().toggleHeading({ level: 1 }).run();
                    setOpen(false);
                  }}
                >
                  H1
                </div>
                <div
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    editor.chain().focus().toggleHeading({ level: 2 }).run();
                    setOpen(false);
                  }}
                >
                  H2
                </div>
                <div
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    editor.chain().focus().toggleBlockquote().run();
                    setOpen(false);
                  }}
                >
                  ❝ Blockquote
                </div>
                <div
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    editor.chain().focus().toggleCodeBlock().run();
                    setOpen(false);
                  }}
                >
                  Code
                </div>
              </div>
            )}
          </div>

          {/* Align */}
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            <img src={listleft} alt="list-left" />
          </button>
          {/* <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          Center
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          Right
        </button> */}

          {/* Lists */}
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <img src={numberedlist} alt="" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <img src={orderedlist} alt="" />
          </button>

          <button onClick={() => editor.chain().focus().increaseIndent().run()}>
            <img src={leftIndent} alt="" />
          </button>

          <button onClick={() => editor.chain().focus().decreaseIndent().run()}>
            <img src={rightIndent} alt="" />
          </button>

          {/* Image */}
          <button
            onClick={() => {
              const url = window.prompt("Image URL");
              if (url) {
                editor.chain().focus().setImage({ src: url }).run();
              }
            }}
          >
            <img src={pictureditor} alt="" />
          </button>

          {/* Link */}
          <button
            onClick={() => {
              const url = window.prompt("URL");
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              }
            }}
          >
            <img src={linkeditor} alt="" />
          </button>

          {/* file */}
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            id="fileUpload"
            onChange={handleFileUpload}
          />
          <label htmlFor="fileUpload" className="cursor-pointer">
            <img src={filedoc} alt="" />
          </label>

          {/* Video */}
          <button
            onClick={() => {
              const url = window.prompt("Video URL");
              if (url) {
                editor.chain().focus().setImage({ src: url }).run();
              }
            }}
          >
            <img src={videditor} alt="" />
          </button>

          {/* Undo / Redo */}
          <button
            onClick={() => editor.chain().focus().undo().run()}
            className="text-gray-500"
          >
            <img src={undo} alt="" />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            className="text-gray-500"
          >
            <img src={redo} alt="" />
          </button>
        </div>

        <EditorContent
          editor={editor}
          className="editor prose max-w-none p-4 min-h-[400px] [&_hr]:mt-1 [&_hr]:mb-8"
        />
      </div>
      <div className="flex gap-8 justify-end pt-6">
        <button className="text-base text-primary font-semibold">
          Save as draft
        </button>
        <button className="h-[54px] w-[266px] bg-primary rounded-lg text-customLight font-semibold text-base">
          send
        </button>
      </div>
    </>
  );
};

export default Tiptap;
