import React from "react";

interface SelectedTextProps {
    selectedRowIds: string[]
}

const SelectedText: React.FC<SelectedTextProps> = ({ selectedRowIds }) => {
    return (
        <span className="selected-text" role="status">
            {!selectedRowIds.length
                ? "None Selected"
                : `Selected ${selectedRowIds.length}`}
        </span>
    );
};

export default SelectedText;
