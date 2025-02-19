import React from "react";

const renderChildren = (children) => {
    if (!children) return null;
    return children.map((child, index) => {
        const style = {};
        const text = child.text || '';

        if (child.bold) style.fontWeight = 'bold';
        if (child.underline) style.textDecoration = 'underline';
        if (child.italic) style.fontStyle = 'italic';

        if (child.type === "link") {
            return (
                <a
                    href={child.link}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    {text}
                </a>
            );
        }

        return (
            <span key={index} style={style}>
                {text}
            </span>
        );
    });
};

const TableComponent = ({ children }) => (
    <div className="overflow-x-auto my-4">
        <table className="min-w-full border-collapse border border-gray-300">
            <tbody>
                {children.map((row, index) => (
                    <tr key={index} className="border-b border-gray-300">
                        {row.children.map((cell, cellIndex) => (
                            <td key={cellIndex} className="p-2 border-r border-gray-300">
                                {renderChildren(cell.children)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const ListItem = ({ item }) => {
    if (item.type === "list_item") {
        return <li className="mb-2">{renderChildren(item.children)}</li>;
    }
    return null;
};

const AlignJustify = ({ content }) => {
    return content.map((item, index) => {
        switch (item.type) {
            case "ol_list":
                return (
                    <ol key={index} className="list-decimal pl-6 my-4 space-y-2">
                        {item.children.map((listItem, listIndex) => (
                            <ListItem key={listIndex} item={listItem} />
                        ))}
                    </ol>
                );
            case "paragraph":
                return (
                    <p key={index} className="my-2">
                        {renderChildren(item.children)}
                    </p>
                );
            default:
                return null;
        }
    });
};

const RenderContent = ({ content }) => {
    if (!content) return null;

    return content.map((item, index) => {
        switch (item.type) {
            case "align_justify":
                return (
                    <div key={index} className="space-y-4">
                        <AlignJustify content={item.children} />
                    </div>
                );
            case "paragraph":
                return (
                    <p key={index} className="my-2">
                        {renderChildren(item.children)}
                    </p>
                );

            case "block_quote":
                return (
                    <blockquote key={index} className="border-l-4 border-gray-300 pl-4 my-4">
                        {renderChildren(item.children)}
                    </blockquote>
                );

            case "ol_list":
                return (
                    <ol key={index} className="list-decimal pl-6 my-4 space-y-2">
                        {item.children.map((listItem, listIndex) => (
                            <ListItem key={listIndex} item={listItem} />
                        ))}
                    </ol>
                );

            case "ul_list":
                return (
                    <ul key={index} className="list-disc pl-6 my-4 space-y-2">
                        {item.children.map((listItem, listIndex) => (
                            <ListItem key={listIndex} item={listItem} />
                        ))}
                    </ul>
                );

            case "table":
                return <TableComponent key={index} children={item.children} />;

            default:
                return (
                    <div key={index} className="my-2">
                        {renderChildren(item.children)}
                    </div>
                );
        }
    });
};

const DisplayFormatted = ({ benefitsData }) => {
    if (!benefitsData || benefitsData.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <div className="prose max-w-none">
            {benefitsData.map((item, index) => (
                <RenderContent key={index} content={[item]} />
            ))}
        </div>
    );
};

export default DisplayFormatted;