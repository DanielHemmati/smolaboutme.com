import { Editor } from '@tiptap/react';
import { useState } from 'react';

const ColorDropdown = ({ editor }: { editor: Editor }) => {
    const [isOpen, setIsOpen] = useState(false);

    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

    const applyColor = (color: string) => {
        editor.chain().focus().setColor(color).run();
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded bg-gray-200 p-2"
            >
                Colors
            </button>
            {isOpen && (
                <div className="absolute mt-2 w-32 rounded bg-white shadow-lg">
                    {colors.map((color) => (
                        <button
                            key={color}
                            onClick={() => applyColor(color)}
                            className="w-full p-2"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ColorDropdown;
