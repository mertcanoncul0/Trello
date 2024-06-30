import Header from "./_components/header";

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-full">
            <Header />
            {children}
        </div>
    );
};

export default DashboardLayout;