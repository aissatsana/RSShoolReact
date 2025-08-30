export interface Option<T extends string> {
  value: T;
  label: string;
}

export interface ColumnsModalProps<T extends string> {
  selected: T[];
  options: Option<T>[];
  onApply: (next: T[]) => void;
  onClose: () => void;
}
