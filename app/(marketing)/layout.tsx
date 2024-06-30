import Footer from "./_components/footer";
import Header from "./_components/header";

const MarketingLayout = ({ 
    children
}: { 
    children: React.ReactNode
}) => {
    return (
        <div className="h-full bg-slate-100">
            <Header />
            <main className="pt-40 pb-20 bg-slate-100">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MarketingLayout;