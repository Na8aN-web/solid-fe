import { Extension } from '@tiptap/core';

export const Indent = Extension.create({
  name: 'indent',

  addCommands() {
    return {
      increaseIndent: () => ({ editor, commands }) => {
        const { state } = editor;
        const pos = state.selection.from;
        const domAtPos = editor.view.domAtPos(pos);
        const dom = domAtPos.node as HTMLElement;

        const currentIndent = parseInt(dom?.style?.marginLeft || '0', 10);
        const newIndent = currentIndent + 20;

        return commands.updateAttributes('paragraph', {
          style: `margin-left: ${newIndent}px`,
        });
      },

      decreaseIndent: () => ({ editor, commands }) => {
        const { state } = editor;
        const pos = state.selection.from;
        const domAtPos = editor.view.domAtPos(pos);
        const dom = domAtPos.node as HTMLElement;

        const currentIndent = parseInt(dom?.style?.marginLeft || '0', 10);
        const newIndent = Math.max(currentIndent - 20, 0);

        return commands.updateAttributes('paragraph', {
          style: `margin-left: ${newIndent}px`,
        });
      },
    };
  },
});