interface ListContainerProps {
    children: React.ReactNode;
};

const ListWrapper = ({
    children
}: ListContainerProps) => {
    return (
        <li className="shrink-0 h-full w-[272px] select-none">
            {children}
        </li>
    );
};

export default ListWrapper;