import type { JSX } from "react";

type ButtonProps = {
    className?: string;
    title: string;
    onClick: () => void;
};

export function Button({ className, title, onClick }: ButtonProps): JSX.Element {
    return <button className={"btn " + className} onClick={onClick}>{title ?? "Default Text"}</button>;
}