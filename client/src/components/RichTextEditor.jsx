import React from 'react'
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline"
import Image from '@tiptap/extension-image';
import Paragraph from '@tiptap/extension-paragraph'
import {
    MenuButtonBold,
    MenuButtonUnderline,
    MenuButtonItalic,
    MenuControlsContainer,
    MenuDivider,
    MenuSelectHeading,
    RichTextField,
    RichTextEditorProvider,
    MenuButtonRedo,
    MenuButtonUndo,
    MenuButtonImageUpload
} from "mui-tiptap";


  
const RichTextEditor = () => {
    const editor = useEditor({
        extensions: [StarterKit, Underline, Image, Paragraph],
        content: "",
    });

    return (
        <RichTextEditorProvider editor={editor}>
        <RichTextField
            controls={
            <MenuControlsContainer>
                <MenuSelectHeading />
                <MenuDivider />
                <MenuButtonBold />
                <MenuButtonItalic />
                <MenuButtonUnderline/>
                <MenuDivider/>
                <MenuButtonRedo/>
                <MenuButtonUndo/>
                <MenuDivider/>
                <MenuButtonImageUpload/>
                {/* Add more controls of your choosing here */}
            </MenuControlsContainer>
            }
        />
        </RichTextEditorProvider>
    )
}

export default RichTextEditor