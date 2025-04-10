import Editor from "@/components/editor";
import { useCurrentEditor } from "@tiptap/react";


function Test() {
    const {editor} = useCurrentEditor();
    return (
        <div className="max-w-[600px] mx-auto mt-10">
            <Editor />
            <pre>{JSON.stringify(editor?.getJSON(), null, 2)}</pre>
        </div>
    );
}
export default Test;
