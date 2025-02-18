import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
    return (
        <header className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
            <div className="md:max-w-screen-2xl mx-auto flex item-center w-full justify-between">
                <Logo />
                <div className="space-x-4 md:block md:w-auto flex items-center ">
                    <Button size="sm" variant="outline" asChild>
                        <Link href="/sign-in">
                            Login   
                        </Link>
                    </Button>
                    <Button size="sm" asChild>
                        <Link href="/sign-up">
                            Get Taskify for free
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;