export interface CustomDatePickerProps {
    value: string;
    onChange: (value: string) => void;
    label: string;
    name: string;
    disabled?: boolean;
    className?: string;
    minDate?: string;
    maxDate?: string;
    placeholder?: string;
}