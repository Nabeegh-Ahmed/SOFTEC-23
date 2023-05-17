export interface CustomDropdownProps {
    name: string;
    options: string[];
    selected?: string;
    setSelected: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    label: string;
}    