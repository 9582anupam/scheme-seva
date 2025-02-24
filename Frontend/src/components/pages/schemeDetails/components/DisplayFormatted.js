import React from "react";

const renderChildren = (children) => {
    if (!children) return null;
    return children.map((child, index) => {
        const style = {};
        const text = child.text || '';

        if (child.bold) style.fontWeight = 'bold';
        if (child.underline) style.textDecoration = 'underline';
        if (child.italic) style.fontStyle = 'italic';

        // Check for type "link" and handle separately
        if (child.type === "link") {
            return (
                <a
                    href={child.link}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    {renderChildren(child.children)} {/* Render children of the link if present */}
                </a>
            );
        }

        // Ensure text is handled even if empty
        return (
            <span key={index} style={style}>
                {text || ''}
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
    if (!item?.type === "list_item") return null;

    // Find any nested lists in the item's children
    const listContent = [];
    const textContent = [];

    item.children?.forEach(child => {
        if (child.type === "ol_list") {
            listContent.push(child);
        } else {
            textContent.push(child);
        }
    });

    return (
        <li className="mb-2">
            {textContent.length > 0 && renderChildren(textContent)}
            {listContent.map((list, index) => (
                <ol key={index} className="list-decimal pl-6 mt-2">
                    {list.children.map((child, childIndex) => (
                        <ListItem key={childIndex} item={child} />
                    ))}
                </ol>
            ))}
        </li>
    );
};

const processListItems = (items) => {
    return items.map((item, index) => {
        if (item.type === "ol_list") {
            return (
                <ol key={index} className="list-decimal pl-6 mt-2">
                    {processListItems(item.children)}
                </ol>
            );
        }
        if (item.type === "list_item") {
            return (
                <li key={index} className="mb-2">
                    {renderChildren(item.children.filter(child => child.type !== "ol_list"))}
                    {item.children.filter(child => child.type === "ol_list").map((sublist, subIndex) => (
                        <ol key={subIndex} className="list-decimal pl-6 mt-2">
                            {processListItems(sublist.children)}
                        </ol>
                    ))}
                </li>
            );
        }
        return null;
    });
};

const RenderList = ({ list }) => {
    if (!list?.children) return null;

    return (
        <ol className="list-decimal pl-6 my-4 space-y-2">
            {processListItems(list.children)}
        </ol>
    );
};

const AlignJustify = ({ content }) => {
    return content.map((item, index) => {
        switch (item.type) {
            case "ol_list":
                return (
                    <RenderList key={index} list={item} />
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
                    <RenderList key={index} list={item} />
                );

            case "ul_list":
                return (
                    <RenderList key={index} list={item} />
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